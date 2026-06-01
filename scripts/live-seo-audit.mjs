#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  auditPages,
  extractPageData,
  normalizeInternalTarget,
  normalizeSiteUrl,
} from "./seo-audit.mjs";

const DEFAULT_SITE_URL = "https://knittoolsapp.com";
const DEFAULT_JSON_REPORT = "reports/live-seo-audit.json";
const DEFAULT_MARKDOWN_REPORT = "reports/live-seo-audit.md";
const DEFAULT_CONCURRENCY = 8;
const REQUEST_TIMEOUT_MS = 20000;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const EN_ROUTE_PROBES = ["/en/", "/en/tools/", "/en/articles/"];
const CLOUDFLARE_EMAIL_PROTECTION_ROUTE = "/cdn-cgi/l/email-protection/";
const HTML_ENTITY_MAP = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["#39", "'"],
]);

export function parseSitemapXml(xml) {
  const type = /<sitemapindex\b/i.test(xml)
    ? "index"
    : /<urlset\b/i.test(xml)
      ? "urlset"
      : "unknown";
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    decodeEntities(match[1].trim()),
  );

  return { type, urls };
}

export function routeFromUrl(rawUrl, siteUrl = DEFAULT_SITE_URL) {
  const target = normalizeInternalTarget(rawUrl, siteUrl);
  if (target) return target.route;

  const url = new URL(rawUrl);
  return url.pathname.endsWith("/") || path.posix.extname(url.pathname)
    ? url.pathname
    : `${url.pathname}/`;
}

export function parseRobotsTxt(text) {
  const sitemapUrls = [];
  let appliesToAll = false;
  let disallowsAll = false;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) continue;

    const [rawKey, ...rawValueParts] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rawValueParts.join(":").trim();

    if (key === "sitemap" && value) {
      sitemapUrls.push(value);
    }
    if (key === "user-agent") {
      appliesToAll = value === "*";
    }
    if (appliesToAll && key === "disallow" && value === "/") {
      disallowsAll = true;
    }
    if (key === "user-agent" && value !== "*") {
      appliesToAll = false;
    }
  }

  return { disallowsAll, sitemapUrls };
}

export function buildLiveRouteSet(pageUrls, siteUrl = DEFAULT_SITE_URL) {
  const routes = new Set(pageUrls.map((url) => routeFromUrl(url, siteUrl)));
  routes.add(CLOUDFLARE_EMAIL_PROTECTION_ROUTE);
  return routes;
}

export async function runLiveAudit({
  siteUrl = DEFAULT_SITE_URL,
  concurrency = DEFAULT_CONCURRENCY,
  jsonReport = DEFAULT_JSON_REPORT,
  markdownReport = DEFAULT_MARKDOWN_REPORT,
  strict = false,
} = {}) {
  const normalizedSite = normalizeSiteUrl(siteUrl);
  const issues = [];

  const sitemapResult = await fetchSitemapTree({
    issues,
    siteUrl: normalizedSite,
  });
  const pageUrls = [...sitemapResult.pageUrls].sort();
  const pageRoutes = buildLiveRouteSet(pageUrls, siteUrl);

  const pageResult = await fetchLivePages({
    concurrency,
    issues,
    pageUrls,
    siteUrl: normalizedSite,
  });
  const assetResult = await collectLiveAssets({
    concurrency,
    issues,
    pages: pageResult.pages,
    siteUrl: normalizedSite,
  });

  const buildAudit = auditPages({
    existingAssetPaths: assetResult.availableAssetRoutes,
    existingRoutes: pageRoutes,
    pages: pageResult.pages,
    siteUrl: normalizedSite,
    sitemapUrls: new Set(pageUrls),
  });
  issues.push(...buildAudit.issues);

  await auditRobots({ issues, siteUrl: normalizedSite });
  await auditUnexpectedEnRoutes({ issues, siteUrl: normalizedSite });
  const trailingSlashResult = await auditTrailingSlashBehavior({
    concurrency,
    issues,
    pageUrls,
    siteUrl: normalizedSite,
  });
  auditIndexability(pageResult.pages, issues);

  issues.sort((a, b) =>
    severityRank(a.severity) === severityRank(b.severity)
      ? a.route.localeCompare(b.route)
      : severityRank(a.severity) - severityRank(b.severity),
  );

  const result = {
    generatedAt: new Date().toISOString(),
    issues,
    live: {
      assetUrlsChecked: assetResult.checked,
      pageFetchErrors: pageResult.fetchErrors,
      pagesFetched: pageResult.pages.length,
      sitemapFiles: sitemapResult.sitemapFiles,
      siteUrl: normalizedSite,
      trailingSlashUrlsChecked: trailingSlashResult.checked,
    },
    summary: summarizeIssues(issues, {
      pagesScanned: pageResult.pages.length,
      sitemapUrls: pageUrls.length,
    }),
  };

  writeReport(jsonReport, `${JSON.stringify(result, null, 2)}\n`);
  writeReport(markdownReport, buildLiveMarkdownReport(result));

  if (strict && result.summary.errors > 0) {
    process.exitCode = 1;
  }

  return result;
}

async function fetchSitemapTree({ siteUrl, issues }) {
  const sitemapIndexUrl = `${siteUrl}/sitemap-index.xml`;
  const pageUrls = new Set();
  const sitemapFiles = [];
  const visited = new Set();
  const queue = [sitemapIndexUrl];

  while (queue.length > 0) {
    const sitemapUrl = queue.shift();
    if (visited.has(sitemapUrl)) continue;
    visited.add(sitemapUrl);

    const response = await fetchText(sitemapUrl);
    sitemapFiles.push({
      status: response.status,
      url: sitemapUrl,
    });

    if (response.status !== 200 || !response.text) {
      issues.push({
        code: "sitemap-fetch-failed",
        message: `Sitemap returned HTTP ${response.status}.`,
        route: "(sitemap)",
        severity: "error",
        target: sitemapUrl,
      });
      continue;
    }

    const parsed = parseSitemapXml(response.text);
    if (parsed.type === "index") {
      for (const childUrl of parsed.urls) {
        queue.push(childUrl);
      }
      continue;
    }
    if (parsed.type !== "urlset") {
      issues.push({
        code: "sitemap-type-unknown",
        message: "Sitemap XML is neither sitemapindex nor urlset.",
        route: "(sitemap)",
        severity: "error",
        target: sitemapUrl,
      });
      continue;
    }

    for (const pageUrl of parsed.urls) {
      if (new URL(pageUrl).origin !== new URL(siteUrl).origin) {
        issues.push({
          code: "sitemap-external-url",
          message: "Sitemap contains a URL outside the audited origin.",
          route: "(sitemap)",
          severity: "error",
          target: pageUrl,
        });
        continue;
      }
      pageUrls.add(pageUrl);
    }
  }

  return { pageUrls, sitemapFiles };
}

async function fetchLivePages({ concurrency, issues, pageUrls, siteUrl }) {
  let fetchErrors = 0;
  const pages = [];

  await mapLimit(pageUrls, concurrency, async (pageUrl) => {
    const route = routeFromUrl(pageUrl, siteUrl);
    const response = await fetchText(pageUrl, { redirect: "manual" });
    const contentType = response.headers.get("content-type") ?? "";

    if (response.status !== 200) {
      fetchErrors += 1;
      issues.push({
        code: REDIRECT_STATUSES.has(response.status)
          ? "sitemap-url-redirect"
          : "sitemap-url-non-200",
        message: `Sitemap URL returned HTTP ${response.status}.`,
        route,
        severity: "error",
        target: response.headers.get("location") ?? pageUrl,
      });
      return;
    }

    if (!contentType.includes("text/html")) {
      issues.push({
        code: "sitemap-url-not-html",
        message: `Sitemap URL returned non-HTML content-type: ${contentType || "(missing)"}.`,
        route,
        severity: "error",
        target: pageUrl,
      });
      return;
    }

    const page = extractPageData({
      html: response.text,
      htmlPath: pageUrl,
      route,
      siteUrl,
    });
    page.robotsMeta = extractRobotsMeta(response.text);
    pages.push(page);
  });

  return {
    fetchErrors,
    pages: pages.sort((a, b) => a.route.localeCompare(b.route)),
  };
}

async function collectLiveAssets({ concurrency, issues, pages, siteUrl }) {
  const assetUrls = new Map();
  const availableAssetRoutes = new Set();

  for (const page of pages) {
    for (const source of [
      ...page.sources,
      { attr: "og:image", raw: page.meta.ogImage },
      { attr: "twitter:image", raw: page.meta.twitterImage },
    ]) {
      const target = normalizeInternalTarget(source.raw, siteUrl);
      if (!target || !path.posix.extname(target.route)) continue;
      assetUrls.set(target.absoluteUrl, {
        route: target.route,
        source,
      });
    }
  }

  await mapLimit(
    [...assetUrls.entries()],
    concurrency,
    async ([assetUrl, meta]) => {
      const response = await fetchStatus(assetUrl, { method: "HEAD" });
      if (response.status === 405) {
        const getResponse = await fetchStatus(assetUrl, { method: "GET" });
        if (getResponse.status === 200) {
          availableAssetRoutes.add(meta.route);
        } else {
          addAssetIssue(issues, assetUrl, getResponse.status);
        }
        return;
      }

      if (response.status === 200) {
        availableAssetRoutes.add(meta.route);
        return;
      }

      addAssetIssue(issues, assetUrl, response.status);
    },
  );

  return {
    availableAssetRoutes,
    checked: assetUrls.size,
  };
}

async function auditRobots({ issues, siteUrl }) {
  const robotsUrl = `${siteUrl}/robots.txt`;
  const response = await fetchText(robotsUrl);

  if (response.status !== 200) {
    issues.push({
      code: "robots-fetch-failed",
      message: `robots.txt returned HTTP ${response.status}.`,
      route: "(robots)",
      severity: "warning",
      target: robotsUrl,
    });
    return;
  }

  const robots = parseRobotsTxt(response.text);
  if (robots.disallowsAll) {
    issues.push({
      code: "robots-disallow-all",
      message: "robots.txt blocks all crawlers from the whole site.",
      route: "(robots)",
      severity: "error",
      target: robotsUrl,
    });
  }
  if (robots.sitemapUrls.length === 0) {
    issues.push({
      code: "robots-sitemap-missing",
      message: "robots.txt does not advertise a sitemap URL.",
      route: "(robots)",
      severity: "warning",
      target: robotsUrl,
    });
  }
}

async function auditUnexpectedEnRoutes({ issues, siteUrl }) {
  await mapLimit(EN_ROUTE_PROBES, EN_ROUTE_PROBES.length, async (route) => {
    const probeUrl = `${siteUrl}${route}`;
    const response = await fetchStatus(probeUrl, { redirect: "manual" });
    if (response.status === 200) {
      issues.push({
        code: "unexpected-en-route-live",
        message: "Unexpected /en/ URL is publicly reachable.",
        route,
        severity: "error",
        target: probeUrl,
      });
    }
  });
}

async function auditTrailingSlashBehavior({
  concurrency,
  issues,
  pageUrls,
  siteUrl,
}) {
  const slashUrls = pageUrls.filter((pageUrl) => {
    const pathname = new URL(pageUrl).pathname;
    return pathname !== "/" && pathname.endsWith("/");
  });

  await mapLimit(slashUrls, concurrency, async (pageUrl) => {
    const noSlashUrl = pageUrl.slice(0, -1);
    const response = await fetchStatus(noSlashUrl, { redirect: "manual" });
    const route = routeFromUrl(pageUrl, siteUrl);

    if (response.status === 200) {
      issues.push({
        code: "trailing-slash-duplicate-live",
        message:
          "Non-trailing-slash variant returns 200 instead of redirecting.",
        route,
        severity: "error",
        target: noSlashUrl,
      });
      return;
    }

    if (!REDIRECT_STATUSES.has(response.status)) {
      issues.push({
        code: "trailing-slash-no-redirect",
        message: `Non-trailing-slash variant returned HTTP ${response.status}.`,
        route,
        severity: "warning",
        target: noSlashUrl,
      });
      return;
    }

    const location = response.headers.get("location");
    const resolvedLocation = location
      ? new URL(location, noSlashUrl).toString()
      : "";
    if (resolvedLocation !== pageUrl) {
      issues.push({
        code: "trailing-slash-wrong-redirect",
        message: "Non-trailing-slash variant redirects to the wrong target.",
        route,
        severity: "error",
        target: `${noSlashUrl} -> ${resolvedLocation || "(missing location)"}`,
      });
    }
  });

  return { checked: slashUrls.length };
}

function auditIndexability(pages, issues) {
  for (const page of pages) {
    for (const robotsMeta of page.robotsMeta ?? []) {
      if (/\bnoindex\b/i.test(robotsMeta.content)) {
        issues.push({
          code: "live-page-noindex",
          message: `${robotsMeta.name} meta tag contains noindex.`,
          route: page.route,
          severity: "error",
          target: robotsMeta.content,
        });
      }
    }
  }
}

function extractRobotsMeta(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => parseTagAttributes(match[0]))
    .filter((attrs) => /^(robots|googlebot)$/i.test(attrs.name ?? ""))
    .map((attrs) => ({
      content: attrs.content ?? "",
      name: attrs.name,
    }));
}

function addAssetIssue(issues, assetUrl, status) {
  issues.push({
    code: "live-asset-non-200",
    message: `Internal asset returned HTTP ${status}.`,
    route: "(asset)",
    severity: "error",
    target: assetUrl,
  });
}

async function fetchText(url, init = {}) {
  const response = await fetchWithTimeout(url, init);
  const text = response ? await response.text().catch(() => "") : "";
  return {
    headers: response?.headers ?? new Headers(),
    status: response?.status ?? 0,
    text,
  };
}

async function fetchStatus(url, init = {}) {
  const response = await fetchWithTimeout(url, init);
  return {
    headers: response?.headers ?? new Headers(),
    status: response?.status ?? 0,
  };
}

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      headers: {
        "user-agent": "KnitTools live SEO audit (+https://knittoolsapp.com)",
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function mapLimit(items, limit, mapper) {
  let index = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (index < items.length) {
        const currentIndex = index;
        index += 1;
        await mapper(items[currentIndex], currentIndex);
      }
    },
  );
  await Promise.all(workers);
}

function parseTagAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(
    /([:@\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
  )) {
    const [, name, doubleQuoted, singleQuoted, bare] = match;
    if (!name || name === "meta") continue;
    attrs[name.toLowerCase()] = decodeEntities(
      doubleQuoted ?? singleQuoted ?? bare ?? "",
    );
  }
  return attrs;
}

function buildLiveMarkdownReport(result) {
  const { live, summary, issues } = result;
  const lines = [
    "# Live SEO Audit Report",
    "",
    `Generated: ${result.generatedAt}`,
    `Site: ${live.siteUrl}`,
    "",
    "## Summary",
    "",
    `- Pages scanned: ${summary.pagesScanned}`,
    `- Pages fetched: ${live.pagesFetched}`,
    `- Sitemap URLs: ${summary.sitemapUrls}`,
    `- Sitemap files checked: ${live.sitemapFiles.length}`,
    `- Internal assets checked: ${live.assetUrlsChecked}`,
    `- Trailing-slash variants checked: ${live.trailingSlashUrlsChecked}`,
    `- Errors: ${summary.errors}`,
    `- Warnings: ${summary.warnings}`,
    `- Info: ${summary.info}`,
    "",
    "## Issue Counts",
    "",
    "| Severity | Code | Count |",
    "|---|---:|---:|",
    ...summary.byCode.map(
      (entry) => `| ${entry.severity} | \`${entry.code}\` | ${entry.count} |`,
    ),
    "",
    "## Issues",
    "",
  ];

  if (issues.length === 0) {
    lines.push("No issues found.");
  } else {
    for (const issue of issues) {
      lines.push(
        `- **${issue.severity.toUpperCase()}** \`${issue.code}\` ${issue.route}: ${issue.message}`,
      );
      if (issue.target) {
        lines.push(`  - Target: ${issue.target}`);
      }
    }
  }

  lines.push("");
  return `${lines.join("\n")}\n`;
}

function summarizeIssues(issues, { pagesScanned, sitemapUrls }) {
  const byCodeMap = new Map();
  for (const issue of issues) {
    const key = `${issue.severity}:${issue.code}`;
    const entry = byCodeMap.get(key) ?? {
      code: issue.code,
      count: 0,
      severity: issue.severity,
    };
    entry.count += 1;
    byCodeMap.set(key, entry);
  }

  return {
    byCode: [...byCodeMap.values()].sort((a, b) =>
      severityRank(a.severity) === severityRank(b.severity)
        ? b.count - a.count
        : severityRank(a.severity) - severityRank(b.severity),
    ),
    errors: issues.filter((issue) => issue.severity === "error").length,
    info: issues.filter((issue) => issue.severity === "info").length,
    pagesScanned,
    sitemapUrls,
    warnings: issues.filter((issue) => issue.severity === "warning").length,
  };
}

function severityRank(severity) {
  return { error: 0, warning: 1, info: 2 }[severity] ?? 3;
}

function writeReport(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function decodeEntities(value) {
  return value.replace(/&([^;]+);/g, (match, entity) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return HTML_ENTITY_MAP.get(entity) ?? match;
  });
}

function parseArgs(argv) {
  const args = {
    concurrency: DEFAULT_CONCURRENCY,
    jsonReport: DEFAULT_JSON_REPORT,
    markdownReport: DEFAULT_MARKDOWN_REPORT,
    siteUrl: DEFAULT_SITE_URL,
    strict: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--strict") {
      args.strict = true;
    } else if (arg === "--site") {
      args.siteUrl = argv[++i];
    } else if (arg === "--concurrency") {
      args.concurrency = Number.parseInt(argv[++i], 10);
    } else if (arg === "--json") {
      args.jsonReport = argv[++i];
    } else if (arg === "--markdown") {
      args.markdownReport = argv[++i];
    }
  }

  return args;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await runLiveAudit(parseArgs(process.argv.slice(2)));
  console.log(
    `Live SEO audit scanned ${result.summary.pagesScanned} pages: ${result.summary.errors} errors, ${result.summary.warnings} warnings.`,
  );
  console.log(`Reports: ${DEFAULT_JSON_REPORT}, ${DEFAULT_MARKDOWN_REPORT}`);
}
