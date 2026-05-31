#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_SITE_URL = "https://knittoolsapp.com";
const DEFAULT_DIST_DIR = "dist";
const DEFAULT_JSON_REPORT = "reports/seo-audit.json";
const DEFAULT_MARKDOWN_REPORT = "reports/seo-audit.md";
const HTML_ENTITY_MAP = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["#39", "'"],
]);
const SKIPPED_SCHEMES = /^(mailto:|tel:|sms:|javascript:|data:|blob:)/i;
const GENERIC_LINK_TEXT = new Set([
  "click here",
  "here",
  "learn more",
  "read more",
  "more",
]);
const OPTIONAL_META_FIELDS = new Set([
  "googlebot",
  "robots",
  "twitterDescription",
  "twitterTitle",
]);
const ARTICLE_SCHEMA_TYPES = new Set(["Article", "BlogPosting", "NewsArticle"]);
const PAGE_SCHEMA_TYPES = new Set(["AboutPage", "CollectionPage", "WebPage"]);

export function routeFromHtmlPath(htmlPath, distDir = DEFAULT_DIST_DIR) {
  const relativePath = path.relative(distDir, htmlPath).replace(/\\/g, "/");
  if (relativePath === "index.html") {
    return "/";
  }
  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(0, -"index.html".length)}`;
  }
  return `/${relativePath}`;
}

export function normalizeSiteUrl(siteUrl = DEFAULT_SITE_URL) {
  return siteUrl.replace(/\/+$/, "");
}

export function normalizeInternalTarget(rawUrl, siteUrl = DEFAULT_SITE_URL) {
  if (!rawUrl || SKIPPED_SCHEMES.test(rawUrl)) {
    return null;
  }

  const normalizedSite = normalizeSiteUrl(siteUrl);
  let url;
  try {
    url =
      rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
        ? new URL(rawUrl)
        : new URL(rawUrl, `${normalizedSite}/`);
  } catch {
    return null;
  }

  if (url.origin !== new URL(normalizedSite).origin) {
    return null;
  }

  const decodedPath = decodeURIComponent(url.pathname);
  const route =
    decodedPath.endsWith("/") || path.posix.extname(decodedPath)
      ? decodedPath
      : `${decodedPath}/`;

  return {
    absoluteUrl: `${normalizedSite}${route}`,
    hash: url.hash,
    query: url.search,
    route,
  };
}

export function extractPageData({ htmlPath, route, siteUrl, html }) {
  const normalizedSite = normalizeSiteUrl(siteUrl);
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) =>
    parseAttributes(match[0]),
  );
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) =>
    parseAttributes(match[0]),
  );
  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map(
    (match) => cleanText(match[1]),
  );
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
    cleanText(match[1]),
  );
  const lang =
    html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1]?.trim() ?? "";
  const description =
    findMetaContent(metaTags, "name", "description") ??
    findMetaContent(metaTags, "property", "description") ??
    "";
  const canonical =
    linkTags.find((attrs) => hasRel(attrs.rel, "canonical"))?.href ?? "";
  const hreflangs = linkTags
    .filter((attrs) => hasRel(attrs.rel, "alternate") && attrs.hreflang)
    .map((attrs) => ({
      hreflang: attrs.hreflang,
      href: attrs.href ?? "",
    }));
  const jsonLd = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => decodeEntities(match[1].trim()));
  const anchors = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map(
    (match) => {
      const attrs = parseAttributes(match[0]);
      return {
        attrs,
        raw: attrs.href ?? "",
        text: getAccessibleLinkText(match[1], attrs),
      };
    },
  );
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => {
    const attrs = parseAttributes(match[0]);
    return {
      alt: attrs.alt,
      attrs,
      raw: attrs.src ?? "",
    };
  });
  const sources = [
    ...[
      ...html.matchAll(/<(?:img|script|source|iframe|video|audio)\b[^>]*>/gi),
    ].flatMap((match) => {
      const attrs = parseAttributes(match[0]);
      const refs = [];
      if (attrs.src) refs.push({ raw: attrs.src, attr: "src" });
      if (attrs.srcset) {
        for (const entry of attrs.srcset.split(",")) {
          const candidate = entry.trim().split(/\s+/)[0];
          if (candidate) refs.push({ raw: candidate, attr: "srcset" });
        }
      }
      return refs;
    }),
  ];

  return {
    canonical,
    description,
    h1,
    hreflangs,
    htmlPath,
    images,
    jsonLd,
    lang,
    links: anchors,
    meta: {
      ogDescription: findMetaContent(metaTags, "property", "og:description"),
      ogImage: findMetaContent(metaTags, "property", "og:image"),
      ogImageAlt: findMetaContent(metaTags, "property", "og:image:alt"),
      ogTitle: findMetaContent(metaTags, "property", "og:title"),
      ogType: findMetaContent(metaTags, "property", "og:type"),
      ogUrl: findMetaContent(metaTags, "property", "og:url"),
      googlebot: findMetaContent(metaTags, "name", "googlebot"),
      robots: findMetaContent(metaTags, "name", "robots"),
      twitterCard: findMetaContent(metaTags, "name", "twitter:card"),
      twitterDescription: findMetaContent(
        metaTags,
        "name",
        "twitter:description",
      ),
      twitterImage: findMetaContent(metaTags, "name", "twitter:image"),
      twitterImageAlt: findMetaContent(metaTags, "name", "twitter:image:alt"),
      twitterTitle: findMetaContent(metaTags, "name", "twitter:title"),
    },
    route,
    sources,
    titles,
    url: `${normalizedSite}${route}`,
  };
}

export function auditPages({
  pages,
  siteUrl = DEFAULT_SITE_URL,
  existingRoutes,
  existingAssetPaths,
  sitemapUrls,
}) {
  const normalizedSite = normalizeSiteUrl(siteUrl);
  const pageByUrl = new Map(pages.map((page) => [page.url, page]));
  const pageByRoute = new Map(pages.map((page) => [page.route, page]));
  const issues = [];

  for (const page of pages) {
    auditCoreSeo(
      page,
      normalizedSite,
      existingRoutes,
      existingAssetPaths,
      issues,
    );
    auditLinks(
      page,
      normalizedSite,
      existingRoutes,
      existingAssetPaths,
      issues,
    );
  }

  auditDuplicates(pages, issues);
  auditHreflangs(pages, pageByUrl, normalizedSite, issues);
  auditSitemap({ pages, pageByRoute, sitemapUrls, normalizedSite, issues });

  issues.sort((a, b) =>
    severityRank(a.severity) === severityRank(b.severity)
      ? a.route.localeCompare(b.route)
      : severityRank(a.severity) - severityRank(b.severity),
  );

  return {
    generatedAt: new Date().toISOString(),
    issues,
    summary: summarizeIssues(issues, pages),
  };
}

export function buildMarkdownReport(result) {
  const { summary, issues } = result;
  const lines = [
    "# SEO Audit Report",
    "",
    `Generated: ${result.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Pages scanned: ${summary.pagesScanned}`,
    `- Errors: ${summary.errors}`,
    `- Warnings: ${summary.warnings}`,
    `- Info: ${summary.info}`,
    `- Sitemap URLs: ${summary.sitemapUrls}`,
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

export function readSitemapUrls(distDir, siteUrl = DEFAULT_SITE_URL) {
  const urls = new Set();
  const sitemapFiles = findFiles(distDir, (filePath) =>
    /sitemap.*\.xml$/i.test(path.basename(filePath)),
  );
  const normalizedSite = normalizeSiteUrl(siteUrl);

  for (const sitemapFile of sitemapFiles) {
    const xml = fs.readFileSync(sitemapFile, "utf8");
    if (/<sitemapindex\b/i.test(xml)) {
      continue;
    }

    for (const match of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)) {
      const loc = decodeEntities(match[1].trim());
      if (loc.startsWith(normalizedSite)) {
        urls.add(loc);
      }
    }
  }

  return urls;
}

export function auditRobotsText({
  robotsText,
  siteUrl = DEFAULT_SITE_URL,
  route = "(robots)",
}) {
  const normalizedSite = normalizeSiteUrl(siteUrl);
  const sitemapUrls = [];
  const issues = [];
  let appliesToAll = false;

  for (const rawLine of robotsText.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) continue;

    const [rawKey, ...rawValueParts] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rawValueParts.join(":").trim();

    if (key === "sitemap" && value) {
      sitemapUrls.push(value);
      continue;
    }
    if (key === "user-agent") {
      appliesToAll = value === "*";
      continue;
    }
    if (appliesToAll && key === "disallow" && value === "/") {
      issues.push({
        code: "robots-disallow-all",
        message: "robots.txt blocks all crawlers from the whole site.",
        route,
        severity: "error",
        target: value,
      });
    }
  }

  if (sitemapUrls.length === 0) {
    issues.push({
      code: "robots-sitemap-missing",
      message: "robots.txt does not advertise a sitemap URL.",
      route,
      severity: "warning",
      target: "",
    });
  } else if (!sitemapUrls.includes(`${normalizedSite}/sitemap-index.xml`)) {
    issues.push({
      code: "robots-sitemap-unexpected",
      message: "robots.txt sitemap URL does not match the configured site.",
      route,
      severity: "warning",
      target: sitemapUrls.join(", "),
    });
  }

  return issues;
}

export function collectBuiltTargets(distDir) {
  const htmlFiles = findFiles(distDir, (filePath) =>
    filePath.endsWith(".html"),
  );
  const routes = new Set(
    htmlFiles.map((htmlPath) => routeFromHtmlPath(htmlPath, distDir)),
  );
  const assets = new Set();

  for (const filePath of findFiles(distDir, () => true)) {
    if (!filePath.endsWith(".html")) {
      assets.add(`/${path.relative(distDir, filePath).replace(/\\/g, "/")}`);
    }
  }

  return { assets, htmlFiles, routes };
}

export function runAudit({
  distDir = DEFAULT_DIST_DIR,
  siteUrl = DEFAULT_SITE_URL,
  jsonReport = DEFAULT_JSON_REPORT,
  markdownReport = DEFAULT_MARKDOWN_REPORT,
  strict = false,
} = {}) {
  const { assets, htmlFiles, routes } = collectBuiltTargets(distDir);
  const sitemapUrls = readSitemapUrls(distDir, siteUrl);
  const pages = htmlFiles.map((htmlPath) =>
    extractPageData({
      html: fs.readFileSync(htmlPath, "utf8"),
      htmlPath,
      route: routeFromHtmlPath(htmlPath, distDir),
      siteUrl,
    }),
  );
  const result = auditPages({
    existingAssetPaths: assets,
    existingRoutes: routes,
    pages,
    siteUrl,
    sitemapUrls,
  });
  result.issues.push(...auditRobotsFile({ distDir, siteUrl }));
  sortIssues(result.issues);
  result.summary = summarizeIssues(result.issues, pages);

  result.summary.sitemapUrls = sitemapUrls.size;
  writeReport(jsonReport, `${JSON.stringify(result, null, 2)}\n`);
  writeReport(markdownReport, buildMarkdownReport(result));

  if (strict && result.summary.errors > 0) {
    process.exitCode = 1;
  }

  return result;
}

function auditCoreSeo(
  page,
  normalizedSite,
  existingRoutes,
  existingAssetPaths,
  issues,
) {
  const isNotFound = page.route === "/404.html";
  if (!page.lang)
    addIssue(
      issues,
      page,
      "error",
      "missing-html-lang",
      "Missing html lang attribute.",
    );
  if (page.titles.length !== 1) {
    addIssue(
      issues,
      page,
      "error",
      "invalid-title-count",
      `Expected exactly one title, found ${page.titles.length}.`,
    );
  } else {
    const title = page.titles[0];
    if (!title)
      addIssue(issues, page, "error", "empty-title", "Title is empty.");
    if (title.length < 20) {
      addIssue(
        issues,
        page,
        "warning",
        "short-title",
        `Title is short (${title.length} characters).`,
      );
    }
    if (title.length > 65) {
      addIssue(
        issues,
        page,
        "warning",
        "long-title",
        `Title is long (${title.length} characters).`,
      );
    }
  }

  if (!page.description) {
    addIssue(
      issues,
      page,
      "error",
      "missing-description",
      "Missing meta description.",
    );
  } else {
    if (page.description.length < 50) {
      addIssue(
        issues,
        page,
        "warning",
        "short-description",
        `Meta description is short (${page.description.length} characters).`,
      );
    }
    if (page.description.length > 165) {
      addIssue(
        issues,
        page,
        "warning",
        "long-description",
        `Meta description is long (${page.description.length} characters).`,
      );
    }
  }

  if (!isNotFound) {
    if (!page.canonical) {
      addIssue(
        issues,
        page,
        "error",
        "missing-canonical",
        "Missing canonical link.",
      );
    } else if (!page.canonical.startsWith(`${normalizedSite}/`)) {
      addIssue(
        issues,
        page,
        "error",
        "canonical-wrong-origin",
        "Canonical does not use the configured production site origin.",
        page.canonical,
      );
    } else if (page.canonical !== page.url) {
      addIssue(
        issues,
        page,
        "error",
        "canonical-not-self",
        "Canonical does not match the built route.",
        page.canonical,
      );
    }
  }

  if (page.h1.length !== 1) {
    addIssue(
      issues,
      page,
      "warning",
      "invalid-h1-count",
      `Expected one H1, found ${page.h1.length}.`,
    );
  }

  auditIndexability(page, issues);
  auditSocialMetadata(page, normalizedSite, existingAssetPaths, issues);

  for (const [key, value] of Object.entries(page.meta)) {
    if (!value && !OPTIONAL_META_FIELDS.has(key)) {
      addIssue(
        issues,
        page,
        "warning",
        `missing-${dashCase(key)}`,
        `Missing ${key}.`,
      );
    }
  }

  for (const json of page.jsonLd) {
    try {
      const parsed = JSON.parse(json);
      if (!jsonLdHasContext(parsed)) {
        addIssue(
          issues,
          page,
          "warning",
          "json-ld-missing-context",
          "JSON-LD does not include an @context value.",
        );
      }
      if (!jsonLdHasType(parsed)) {
        addIssue(
          issues,
          page,
          "error",
          "json-ld-missing-type",
          "JSON-LD does not include an @type value.",
        );
      }
      auditStructuredData(
        parsed,
        page,
        normalizedSite,
        existingRoutes,
        existingAssetPaths,
        issues,
      );
    } catch (error) {
      addIssue(
        issues,
        page,
        "error",
        "invalid-json-ld",
        `JSON-LD is not parseable: ${error.message}`,
      );
    }
  }

  if (page.route.includes("/en/")) {
    addIssue(
      issues,
      page,
      "error",
      "unexpected-en-route",
      "Public /en/ route found.",
    );
  }
}

function auditIndexability(page, issues) {
  for (const key of ["robots", "googlebot"]) {
    const value = page.meta[key];
    if (value && /\bnoindex\b/i.test(value)) {
      addIssue(
        issues,
        page,
        "error",
        "meta-noindex",
        `${key} meta tag contains noindex.`,
        value,
      );
    }
  }
}

function auditSocialMetadata(page, normalizedSite, existingAssetPaths, issues) {
  if (page.meta.ogUrl && page.canonical && page.meta.ogUrl !== page.canonical) {
    addIssue(
      issues,
      page,
      "error",
      "og-url-not-canonical",
      "og:url does not match the canonical URL.",
      page.meta.ogUrl,
    );
  }

  if (
    page.meta.twitterCard &&
    page.meta.twitterCard !== "summary_large_image"
  ) {
    addIssue(
      issues,
      page,
      "warning",
      "twitter-card-not-large-image",
      "twitter:card is not summary_large_image.",
      page.meta.twitterCard,
    );
  }

  auditSocialImage({
    code: "broken-og-image",
    existingAssetPaths,
    imageUrl: page.meta.ogImage,
    issues,
    normalizedSite,
    page,
  });
  auditSocialImage({
    code: "broken-twitter-image",
    existingAssetPaths,
    imageUrl: page.meta.twitterImage,
    issues,
    normalizedSite,
    page,
  });
}

function auditSocialImage({
  code,
  existingAssetPaths,
  imageUrl,
  issues,
  normalizedSite,
  page,
}) {
  const target = normalizeInternalTarget(imageUrl, normalizedSite);
  if (!target || !path.posix.extname(target.route)) return;
  if (!existingAssetPaths.has(target.route)) {
    addIssue(
      issues,
      page,
      "error",
      code,
      "Social image target is missing from build output.",
      imageUrl,
    );
  }
}

function auditLinks(
  page,
  normalizedSite,
  existingRoutes,
  existingAssetPaths,
  issues,
) {
  for (const link of page.links) {
    const raw = link.raw;
    if (!raw) continue;
    const linkText = link.text.trim();
    if (!linkText) {
      addIssue(
        issues,
        page,
        "warning",
        "empty-link-text",
        "Anchor has no readable link text.",
        raw,
      );
    } else if (GENERIC_LINK_TEXT.has(linkText.toLowerCase())) {
      addIssue(
        issues,
        page,
        "info",
        "generic-link-text",
        "Anchor text is generic; descriptive text is better for users and search engines.",
        `${raw} (${linkText})`,
      );
    }
    if (raw === "#") {
      addIssue(
        issues,
        page,
        "error",
        "placeholder-link",
        "Anchor href is '#'.",
      );
      continue;
    }
    const target = normalizeInternalTarget(raw, normalizedSite);
    if (!target) continue;
    const isHtmlRoute = !path.posix.extname(target.route);
    if (isHtmlRoute && !existingRoutes.has(target.route)) {
      addIssue(
        issues,
        page,
        "error",
        "broken-internal-link",
        `Internal link target is missing from build output.`,
        raw,
      );
    }
    if (
      isHtmlRoute &&
      !raw.includes("#") &&
      raw.startsWith("/") &&
      !raw.endsWith("/")
    ) {
      addIssue(
        issues,
        page,
        "warning",
        "non-trailing-slash-link",
        "Internal page link omits trailing slash.",
        raw,
      );
    }
  }

  for (const source of page.sources) {
    const target = normalizeInternalTarget(source.raw, normalizedSite);
    if (!target || !path.posix.extname(target.route)) continue;
    if (!existingAssetPaths.has(target.route)) {
      addIssue(
        issues,
        page,
        "error",
        "broken-internal-asset",
        `Internal ${source.attr} target is missing from build output.`,
        source.raw,
      );
    }
  }

  for (const image of page.images) {
    if (
      image.alt === undefined &&
      image.attrs["aria-hidden"] !== "true" &&
      image.attrs.role !== "presentation"
    ) {
      addIssue(
        issues,
        page,
        "warning",
        "missing-image-alt",
        "Image is missing an alt attribute.",
        image.raw,
      );
    }
  }
}

function auditDuplicates(pages, issues) {
  addDuplicateIssues(
    pages,
    issues,
    "duplicate-title",
    (page) => page.titles[0] ?? "",
  );
  addDuplicateIssues(
    pages,
    issues,
    "duplicate-description",
    (page) => page.description,
  );
}

function addDuplicateIssues(pages, issues, code, selectValue) {
  const groups = new Map();
  for (const page of pages) {
    const value = selectValue(page).trim();
    if (!value) continue;
    const group = groups.get(value) ?? [];
    group.push(page);
    groups.set(value, group);
  }

  for (const [value, group] of groups.entries()) {
    if (group.length < 2) continue;
    for (const page of group) {
      addIssue(
        issues,
        page,
        "warning",
        code,
        `Value is shared by ${group.length} pages: "${value}".`,
      );
    }
  }
}

function auditHreflangs(pages, pageByUrl, normalizedSite, issues) {
  for (const page of pages) {
    if (page.route === "/404.html" || page.hreflangs.length === 0) continue;
    const seenLanguages = new Map();
    const englishAlternate = page.hreflangs.find(
      (alternate) => alternate.hreflang.toLowerCase() === "en",
    );
    const xDefaultAlternates = page.hreflangs.filter(
      (alternate) => alternate.hreflang.toLowerCase() === "x-default",
    );
    const selfAlternate = page.hreflangs.some(
      (alternate) => alternate.href === page.url,
    );
    if (!selfAlternate) {
      addIssue(
        issues,
        page,
        "error",
        "hreflang-self-missing",
        "Hreflang alternates do not include the page itself.",
      );
    }
    const htmlLangSelfAlternate = page.hreflangs.some(
      (alternate) =>
        alternate.hreflang.toLowerCase() === page.lang.toLowerCase() &&
        alternate.href === page.url,
    );
    if (!htmlLangSelfAlternate) {
      addIssue(
        issues,
        page,
        "error",
        "hreflang-html-lang-self-missing",
        "Hreflang alternates do not include a self-reference matching html lang.",
      );
    }

    if (
      xDefaultAlternates.length > 0 &&
      englishAlternate &&
      xDefaultAlternates[0].href !== englishAlternate.href
    ) {
      addIssue(
        issues,
        page,
        "warning",
        "hreflang-x-default-not-english",
        "x-default hreflang does not point to the English fallback URL.",
        xDefaultAlternates[0].href,
      );
    }

    for (const alternate of page.hreflangs) {
      const hreflang = alternate.hreflang.toLowerCase();
      if (seenLanguages.has(hreflang)) {
        addIssue(
          issues,
          page,
          "error",
          "duplicate-hreflang",
          "Page has more than one hreflang entry for the same language.",
          alternate.hreflang,
        );
      }
      seenLanguages.set(hreflang, alternate.href);

      if (!/^(?:x-default|[a-z]{2,3}(?:-[a-z]{2})?)$/i.test(hreflang)) {
        addIssue(
          issues,
          page,
          "error",
          "invalid-hreflang-code",
          "Hreflang value is not a supported language or language-region format.",
          alternate.hreflang,
        );
      }

      if (!alternate.href) {
        addIssue(
          issues,
          page,
          "error",
          "hreflang-empty-href",
          "Hreflang alternate is missing href.",
          alternate.hreflang,
        );
        continue;
      }

      const target = normalizeInternalTarget(alternate.href, normalizedSite);
      if (!target) {
        addIssue(
          issues,
          page,
          "error",
          "hreflang-wrong-origin",
          "Hreflang target does not use the configured production site origin.",
          alternate.href,
        );
        continue;
      }

      if (target.query || target.hash) {
        addIssue(
          issues,
          page,
          "warning",
          "hreflang-url-fragment-or-query",
          "Hreflang target includes a query string or fragment.",
          alternate.href,
        );
      }

      const targetPage = pageByUrl.get(alternate.href);
      if (!targetPage) {
        addIssue(
          issues,
          page,
          "error",
          hreflang === "x-default"
            ? "hreflang-x-default-target-missing"
            : "hreflang-target-missing",
          "Hreflang target is not a built page.",
          alternate.href,
        );
        continue;
      }
      if (targetPage.canonical && targetPage.canonical !== alternate.href) {
        addIssue(
          issues,
          page,
          "error",
          "hreflang-target-not-canonical",
          "Hreflang target URL does not match the target page canonical.",
          alternate.href,
        );
      }
      if (hreflang === "x-default") continue;

      const reciprocal = targetPage.hreflangs.some(
        (targetAlternate) => targetAlternate.href === page.url,
      );
      if (!reciprocal) {
        addIssue(
          issues,
          page,
          "error",
          "hreflang-reciprocity-missing",
          "Hreflang target does not link back to this page.",
          alternate.href,
        );
      }
    }
  }
}

function auditSitemap({
  pages,
  pageByRoute,
  sitemapUrls,
  normalizedSite,
  issues,
}) {
  for (const sitemapUrl of sitemapUrls) {
    const target = normalizeInternalTarget(sitemapUrl, normalizedSite);
    if (!target || !pageByRoute.has(target.route)) {
      issues.push({
        code: "sitemap-target-missing",
        message: "Sitemap URL is not present in build output.",
        route: "(sitemap)",
        severity: "error",
        target: sitemapUrl,
      });
    }
  }

  for (const page of pages) {
    if (page.route === "/404.html") continue;
    if (!sitemapUrls.has(page.url)) {
      addIssue(
        issues,
        page,
        "warning",
        "page-missing-from-sitemap",
        "Built page is missing from sitemap.",
      );
    }
  }
}

function auditRobotsFile({ distDir, siteUrl }) {
  const robotsPath = path.join(distDir, "robots.txt");
  if (!fs.existsSync(robotsPath)) {
    return [
      {
        code: "robots-file-missing",
        message: "robots.txt is missing from build output.",
        route: "(robots)",
        severity: "warning",
        target: robotsPath,
      },
    ];
  }

  return auditRobotsText({
    robotsText: fs.readFileSync(robotsPath, "utf8"),
    siteUrl,
  });
}

function auditStructuredData(
  parsed,
  page,
  normalizedSite,
  existingRoutes,
  existingAssetPaths,
  issues,
) {
  for (const { entity, label } of collectJsonLdEntities(parsed)) {
    if (!entity || typeof entity !== "object") continue;

    const types = getSchemaTypes(entity);
    if (types.length === 0) {
      addIssue(
        issues,
        page,
        "error",
        "json-ld-entity-missing-type",
        "JSON-LD entity does not include an @type value.",
        schemaEntityTarget(entity, label),
      );
      continue;
    }

    auditSchemaInternalUrl({
      code: "json-ld-internal-url-target-missing",
      existingAssetPaths,
      existingRoutes,
      issues,
      normalizedSite,
      page,
      propertyName: "url",
      url: schemaUrl(entity.url),
    });

    if (hasSchemaType(entity, ARTICLE_SCHEMA_TYPES)) {
      auditArticleSchema({
        entity,
        existingAssetPaths,
        issues,
        normalizedSite,
        page,
      });
    }
    if (hasSchemaType(entity, new Set(["WebApplication"]))) {
      auditWebApplicationSchema(entity, page, issues);
    }
    if (hasSchemaType(entity, new Set(["FAQPage"]))) {
      auditFaqSchema(entity, page, issues);
    }
    if (hasSchemaType(entity, PAGE_SCHEMA_TYPES)) {
      auditPageSchema(entity, page, issues);
    }
    if (hasSchemaType(entity, new Set(["BreadcrumbList"]))) {
      auditBreadcrumbSchema({
        entity,
        existingRoutes,
        issues,
        normalizedSite,
        page,
      });
    }
  }
}

function auditArticleSchema({
  entity,
  existingAssetPaths,
  issues,
  normalizedSite,
  page,
}) {
  const canonical = page.canonical || page.url;
  const schemaUrlValue = schemaUrl(entity.url);
  if (!schemaUrlValue) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-missing-url",
      "Article structured data is missing a url value.",
    );
  } else if (schemaUrlValue !== canonical) {
    addIssue(
      issues,
      page,
      "error",
      "article-schema-url-not-canonical",
      "Article structured data url does not match the page canonical.",
      schemaUrlValue,
    );
  }

  const mainEntityUrl = schemaUrl(entity.mainEntityOfPage);
  if (!mainEntityUrl) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-missing-main-entity",
      "Article structured data is missing mainEntityOfPage.",
    );
  } else if (mainEntityUrl !== canonical) {
    addIssue(
      issues,
      page,
      "error",
      "article-schema-main-entity-not-canonical",
      "Article mainEntityOfPage does not match the page canonical.",
      mainEntityUrl,
    );
  }

  if (entity["@id"]) {
    const id = String(entity["@id"]);
    if (id !== canonical && !id.startsWith(`${canonical}#`)) {
      addIssue(
        issues,
        page,
        "warning",
        "article-schema-id-not-canonical",
        "Article @id is not anchored to the page canonical.",
        id,
      );
    }
  }

  if (!isNonEmptyString(entity.headline)) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-missing-headline",
      "Article structured data is missing headline.",
    );
  } else if (page.h1[0] && normalizeText(entity.headline) !== page.h1[0]) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-headline-mismatch",
      "Article structured data headline does not match the page H1.",
      entity.headline,
    );
  }

  if (!isNonEmptyString(entity.description)) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-missing-description",
      "Article structured data is missing description.",
    );
  } else if (
    page.description &&
    normalizeText(entity.description) !== page.description
  ) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-description-mismatch",
      "Article structured data description does not match the meta description.",
      entity.description,
    );
  }

  const imageUrls = schemaUrlList(entity.image);
  if (imageUrls.length === 0) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-missing-image",
      "Article structured data is missing image.",
    );
  } else {
    for (const imageUrl of imageUrls) {
      auditSchemaInternalUrl({
        code: "article-schema-image-target-missing",
        existingAssetPaths,
        existingRoutes: new Set(),
        issues,
        normalizedSite,
        page,
        propertyName: "image",
        url: imageUrl,
      });
    }
  }

  auditSchemaDate(entity.datePublished, "datePublished", page, issues);
  auditSchemaDate(entity.dateModified, "dateModified", page, issues);
  auditSchemaNamedParty(entity.author, "author", page, issues);
  auditSchemaNamedParty(entity.publisher, "publisher", page, issues);

  if (!isNonEmptyString(entity.inLanguage)) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-missing-language",
      "Article structured data is missing inLanguage.",
    );
  } else if (entity.inLanguage.toLowerCase() !== page.lang.toLowerCase()) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-language-mismatch",
      "Article structured data inLanguage does not match html lang.",
      entity.inLanguage,
    );
  }
}

function auditWebApplicationSchema(entity, page, issues) {
  const schemaUrlValue = schemaUrl(entity.url);
  if (!schemaUrlValue) {
    addIssue(
      issues,
      page,
      "error",
      "web-application-schema-missing-url",
      "WebApplication structured data is missing url.",
    );
  } else if (schemaUrlValue !== (page.canonical || page.url)) {
    addIssue(
      issues,
      page,
      "error",
      "web-application-schema-url-not-canonical",
      "WebApplication structured data url does not match the page canonical.",
      schemaUrlValue,
    );
  }

  if (!isNonEmptyString(entity.name)) {
    addIssue(
      issues,
      page,
      "error",
      "web-application-schema-missing-name",
      "WebApplication structured data is missing name.",
    );
  }
  if (!isNonEmptyString(entity.description)) {
    addIssue(
      issues,
      page,
      "warning",
      "web-application-schema-missing-description",
      "WebApplication structured data is missing description.",
    );
  }
  if (!isNonEmptyString(entity.applicationCategory)) {
    addIssue(
      issues,
      page,
      "warning",
      "web-application-schema-missing-category",
      "WebApplication structured data is missing applicationCategory.",
    );
  }
  if (!isNonEmptyString(entity.operatingSystem)) {
    addIssue(
      issues,
      page,
      "warning",
      "web-application-schema-missing-operating-system",
      "WebApplication structured data is missing operatingSystem.",
    );
  }

  const offer = firstSchemaObject(entity.offers);
  const price = offer?.price;
  if (price === undefined || price === null || price === "") {
    addIssue(
      issues,
      page,
      "error",
      "web-application-schema-missing-offers-price",
      "WebApplication structured data is missing offers.price.",
    );
  } else if (Number(price) > 0 && !isNonEmptyString(offer.priceCurrency)) {
    addIssue(
      issues,
      page,
      "warning",
      "web-application-schema-missing-price-currency",
      "Paid WebApplication structured data is missing offers.priceCurrency.",
      String(price),
    );
  }
}

function auditFaqSchema(entity, page, issues) {
  const questions = Array.isArray(entity.mainEntity)
    ? entity.mainEntity
    : entity.mainEntity
      ? [entity.mainEntity]
      : [];

  if (questions.length === 0) {
    addIssue(
      issues,
      page,
      "warning",
      "faq-schema-empty",
      "FAQPage structured data has no questions.",
    );
    return;
  }

  questions.forEach((question, index) => {
    if (!hasSchemaType(question, new Set(["Question"]))) {
      addIssue(
        issues,
        page,
        "warning",
        "faq-schema-question-missing-type",
        "FAQPage question is missing @type Question.",
        `mainEntity[${index}]`,
      );
    }
    if (!isNonEmptyString(question?.name)) {
      addIssue(
        issues,
        page,
        "warning",
        "faq-schema-question-missing-name",
        "FAQPage question is missing name.",
        `mainEntity[${index}]`,
      );
    }
    const answer = firstSchemaObject(question?.acceptedAnswer);
    if (!answer || !isNonEmptyString(answer.text)) {
      addIssue(
        issues,
        page,
        "warning",
        "faq-schema-answer-missing-text",
        "FAQPage answer is missing text.",
        `mainEntity[${index}]`,
      );
    }
  });
}

function auditPageSchema(entity, page, issues) {
  const schemaUrlValue = schemaUrl(entity.url);
  if (schemaUrlValue && schemaUrlValue !== (page.canonical || page.url)) {
    addIssue(
      issues,
      page,
      "error",
      "page-schema-url-not-canonical",
      "Page structured data url does not match the page canonical.",
      schemaUrlValue,
    );
  }
}

function auditBreadcrumbSchema({
  entity,
  existingRoutes,
  issues,
  normalizedSite,
  page,
}) {
  const items = Array.isArray(entity.itemListElement)
    ? entity.itemListElement
    : [];
  if (items.length === 0) {
    addIssue(
      issues,
      page,
      "warning",
      "breadcrumb-schema-empty",
      "BreadcrumbList structured data has no items.",
    );
    return;
  }

  items.forEach((item, index) => {
    if (!isNonEmptyString(item?.name)) {
      addIssue(
        issues,
        page,
        "warning",
        "breadcrumb-schema-item-missing-name",
        "Breadcrumb item is missing name.",
        `itemListElement[${index}]`,
      );
    }
    if (!Number.isInteger(Number(item?.position))) {
      addIssue(
        issues,
        page,
        "warning",
        "breadcrumb-schema-item-missing-position",
        "Breadcrumb item is missing numeric position.",
        `itemListElement[${index}]`,
      );
    }
    auditSchemaInternalUrl({
      code: "breadcrumb-schema-item-target-missing",
      existingAssetPaths: new Set(),
      existingRoutes,
      issues,
      normalizedSite,
      page,
      propertyName: "item",
      url: schemaUrl(item?.item),
    });
  });
}

function jsonLdHasContext(value) {
  if (Array.isArray(value)) return value.some(jsonLdHasContext);
  if (!value || typeof value !== "object") return false;
  if (Object.hasOwn(value, "@context")) return true;
  if (Array.isArray(value["@graph"]))
    return value["@graph"].some(jsonLdHasContext);
  return false;
}

function jsonLdHasType(value) {
  if (Array.isArray(value)) return value.some(jsonLdHasType);
  if (!value || typeof value !== "object") return false;
  if (Object.hasOwn(value, "@type")) return true;
  if (Array.isArray(value["@graph"]))
    return value["@graph"].some(jsonLdHasType);
  return false;
}

function collectJsonLdEntities(value) {
  const entities = [];

  const collect = (node, label = "root") => {
    if (Array.isArray(node)) {
      node.forEach((entry, index) => collect(entry, `${label}[${index}]`));
      return;
    }
    if (!node || typeof node !== "object") return;

    if (Object.hasOwn(node, "@type")) {
      entities.push({ entity: node, label });
    }
    if (Array.isArray(node["@graph"])) {
      node["@graph"].forEach((entry, index) =>
        entities.push({ entity: entry, label: `${label}.@graph[${index}]` }),
      );
    } else if (!Object.hasOwn(node, "@type")) {
      entities.push({ entity: node, label });
    }
  };

  collect(value);
  return entities;
}

function getSchemaTypes(entity) {
  const type = entity?.["@type"];
  if (Array.isArray(type)) {
    return type.filter(isNonEmptyString);
  }
  return isNonEmptyString(type) ? [type] : [];
}

function hasSchemaType(entity, expectedTypes) {
  return getSchemaTypes(entity).some((type) => expectedTypes.has(type));
}

function schemaUrl(value) {
  if (isNonEmptyString(value)) return value;
  if (Array.isArray(value)) return schemaUrl(value[0]);
  if (!value || typeof value !== "object") return "";
  return value["@id"] ?? value.url ?? value.href ?? value.item ?? "";
}

function schemaUrlList(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map(schemaUrl).filter(Boolean);
  }
  const url = schemaUrl(value);
  return url ? [url] : [];
}

function schemaEntityTarget(entity, label) {
  return entity?.["@id"] ?? entity?.name ?? label;
}

function auditSchemaInternalUrl({
  code,
  existingAssetPaths,
  existingRoutes,
  issues,
  normalizedSite,
  page,
  propertyName,
  url,
}) {
  if (!url) return;
  const target = normalizeInternalTarget(url, normalizedSite);
  if (!target) return;

  const isAsset = Boolean(path.posix.extname(target.route));
  if (isAsset) {
    if (!existingAssetPaths.has(target.route)) {
      addIssue(
        issues,
        page,
        "error",
        code,
        `Structured data ${propertyName} target is missing from build output.`,
        url,
      );
    }
    return;
  }

  if (existingRoutes.size > 0 && !existingRoutes.has(target.route)) {
    addIssue(
      issues,
      page,
      "error",
      code,
      `Structured data ${propertyName} target is missing from build output.`,
      url,
    );
  }
}

function auditSchemaDate(value, propertyName, page, issues) {
  if (!isNonEmptyString(value)) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-missing-date",
      `Article structured data is missing ${propertyName}.`,
      propertyName,
    );
    return;
  }

  if (Number.isNaN(Date.parse(value))) {
    addIssue(
      issues,
      page,
      "warning",
      "article-schema-invalid-date",
      `Article structured data ${propertyName} is not a valid date.`,
      value,
    );
  }
}

function auditSchemaNamedParty(value, propertyName, page, issues) {
  const parties = Array.isArray(value) ? value : value ? [value] : [];
  if (parties.length === 0) {
    addIssue(
      issues,
      page,
      "warning",
      `article-schema-missing-${propertyName}`,
      `Article structured data is missing ${propertyName}.`,
    );
    return;
  }

  if (
    !parties.some((party) =>
      isNonEmptyString(
        typeof party === "object" && party ? party.name : String(party),
      ),
    )
  ) {
    addIssue(
      issues,
      page,
      "warning",
      `article-schema-${propertyName}-missing-name`,
      `Article structured data ${propertyName} is missing name.`,
    );
  }
}

function firstSchemaObject(value) {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && typeof candidate === "object" ? candidate : undefined;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeText(value) {
  return cleanText(String(value));
}

function summarizeIssues(issues, pages) {
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
    pagesScanned: pages.length,
    sitemapUrls: 0,
    warnings: issues.filter((issue) => issue.severity === "warning").length,
  };
}

function sortIssues(issues) {
  issues.sort((a, b) =>
    severityRank(a.severity) === severityRank(b.severity)
      ? a.route.localeCompare(b.route)
      : severityRank(a.severity) - severityRank(b.severity),
  );
}

function findFiles(rootDir, predicate) {
  if (!fs.existsSync(rootDir)) return [];
  const found = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
      } else if (predicate(entryPath)) {
        found.push(entryPath);
      }
    }
  }
  return found.sort();
}

function findMetaContent(metaTags, attrName, attrValue) {
  const tag = metaTags.find(
    (attrs) => attrs[attrName]?.toLowerCase() === attrValue.toLowerCase(),
  );
  return tag?.content ?? "";
}

function parseAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(
    /([:@\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
  )) {
    const [, name, doubleQuoted, singleQuoted, unquoted] = match;
    if (name === tag.replace(/[<>\s].*$/g, "")) continue;
    attrs[name.toLowerCase()] = decodeEntities(
      doubleQuoted ?? singleQuoted ?? unquoted ?? "",
    );
  }
  return attrs;
}

function hasRel(relValue, relName) {
  return relValue?.toLowerCase().split(/\s+/).includes(relName.toLowerCase());
}

function cleanText(text) {
  return decodeEntities(text.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function getAccessibleLinkText(innerHtml, attrs) {
  const imageAltText = [...innerHtml.matchAll(/<img\b[^>]*>/gi)]
    .map((match) => parseAttributes(match[0]).alt ?? "")
    .filter(Boolean)
    .join(" ");
  const text = cleanText(`${innerHtml} ${imageAltText}`);
  return text || attrs["aria-label"] || attrs.title || "";
}

function decodeEntities(value) {
  return value.replace(/&([a-zA-Z0-9#]+);/g, (full, entity) => {
    if (HTML_ENTITY_MAP.has(entity)) return HTML_ENTITY_MAP.get(entity);
    if (entity.startsWith("#x"))
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#"))
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return full;
  });
}

function addIssue(issues, page, severity, code, message, target = "") {
  issues.push({
    code,
    message,
    route: page.route,
    severity,
    target,
  });
}

function writeReport(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function dashCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function severityRank(severity) {
  return { error: 0, warning: 1, info: 2 }[severity] ?? 3;
}

function parseCliArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--strict") {
      options.strict = true;
    } else if (arg === "--dist") {
      options.distDir = argv[++index];
    } else if (arg === "--site") {
      options.siteUrl = argv[++index];
    } else if (arg === "--json") {
      options.jsonReport = argv[++index];
    } else if (arg === "--markdown") {
      options.markdownReport = argv[++index];
    } else if (arg === "--help") {
      options.help = true;
    }
  }
  return options;
}

function printHelp() {
  console.log(`Usage: node scripts/seo-audit.mjs [options]

Options:
  --dist <path>       Build output directory (default: dist)
  --site <url>        Production site origin (default: ${DEFAULT_SITE_URL})
  --json <path>       JSON report path (default: ${DEFAULT_JSON_REPORT})
  --markdown <path>   Markdown report path (default: ${DEFAULT_MARKDOWN_REPORT})
  --strict            Exit non-zero when error-level issues are found
`);
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const options = parseCliArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
  } else {
    const result = runAudit(options);
    console.log(
      `SEO audit scanned ${result.summary.pagesScanned} pages: ${result.summary.errors} errors, ${result.summary.warnings} warnings.`,
    );
    console.log(
      `Reports: ${options.jsonReport ?? DEFAULT_JSON_REPORT}, ${options.markdownReport ?? DEFAULT_MARKDOWN_REPORT}`,
    );
  }
}
