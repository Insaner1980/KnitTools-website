#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parseSitemapXml } from "./live-seo-audit.mjs";
import { normalizeSiteUrl, readSitemapUrls } from "./seo-audit.mjs";

const DEFAULT_SITE_URL = "https://knittoolsapp.com";
const DEFAULT_DIST_DIR = "dist";
const DEFAULT_JSON_REPORT = "reports/url-parity-audit.json";
const DEFAULT_MARKDOWN_REPORT = "reports/url-parity-audit.md";

export function compareUrlSets({ liveUrls, localUrls }) {
  const removedFromLocal = [...liveUrls]
    .filter((url) => !localUrls.has(url))
    .sort();
  const addedLocally = [...localUrls]
    .filter((url) => !liveUrls.has(url))
    .sort();
  const shared = [...localUrls].filter((url) => liveUrls.has(url)).length;

  return {
    addedLocally,
    errors: removedFromLocal.length,
    removedFromLocal,
    shared,
    warnings: 0,
  };
}

export function buildUrlParityMarkdown(result) {
  const lines = [
    "# URL Parity Audit Report",
    "",
    `Generated: ${result.generatedAt}`,
    `Site: ${result.siteUrl}`,
    "",
    "## Summary",
    "",
    `- Live sitemap URLs: ${result.liveCount}`,
    `- Local sitemap URLs: ${result.localCount}`,
    `- Shared URLs: ${result.shared}`,
    `- Removed from local build: ${result.removedFromLocal.length}`,
    `- Added locally: ${result.addedLocally.length}`,
    `- Errors: ${result.errors}`,
    `- Warnings: ${result.warnings}`,
    "",
    "## Removed from local build",
    "",
  ];

  if (result.removedFromLocal.length === 0) {
    lines.push("No live URLs would be removed by the local build.");
  } else {
    for (const url of result.removedFromLocal) {
      lines.push(`- ${url}`);
    }
  }

  lines.push("", "## Added locally", "");

  if (result.addedLocally.length === 0) {
    lines.push("No new local URLs compared with production.");
  } else {
    for (const url of result.addedLocally) {
      lines.push(`- ${url}`);
    }
  }

  lines.push("");
  return `${lines.join("\n")}\n`;
}

export async function runUrlParityAudit({
  distDir = DEFAULT_DIST_DIR,
  siteUrl = DEFAULT_SITE_URL,
  jsonReport = DEFAULT_JSON_REPORT,
  markdownReport = DEFAULT_MARKDOWN_REPORT,
  strict = false,
} = {}) {
  const normalizedSite = normalizeSiteUrl(siteUrl);
  const liveUrls = await readLiveSitemapUrls(normalizedSite);
  const localUrls = readSitemapUrls(distDir, normalizedSite);
  const comparison = compareUrlSets({ liveUrls, localUrls });
  const result = {
    ...comparison,
    generatedAt: new Date().toISOString(),
    liveCount: liveUrls.size,
    localCount: localUrls.size,
    siteUrl: normalizedSite,
  };

  writeReport(jsonReport, `${JSON.stringify(result, null, 2)}\n`);
  writeReport(markdownReport, buildUrlParityMarkdown(result));

  if (strict && result.errors > 0) {
    process.exitCode = 1;
  }

  return result;
}

export async function readLiveSitemapUrls(siteUrl = DEFAULT_SITE_URL) {
  const normalizedSite = normalizeSiteUrl(siteUrl);
  const sitemapIndexUrl = `${normalizedSite}/sitemap-index.xml`;
  const pageUrls = new Set();
  const visited = new Set();
  const queue = [sitemapIndexUrl];

  while (queue.length > 0) {
    const sitemapUrl = queue.shift();
    if (!sitemapUrl || visited.has(sitemapUrl)) continue;
    visited.add(sitemapUrl);

    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      throw new Error(
        `Sitemap fetch failed (${response.status}): ${sitemapUrl}`,
      );
    }

    const parsed = parseSitemapXml(await response.text());
    if (parsed.type === "index") {
      queue.push(...parsed.urls);
      continue;
    }
    if (parsed.type !== "urlset") {
      throw new Error(`Unsupported sitemap XML type at ${sitemapUrl}`);
    }

    for (const url of parsed.urls) {
      if (new URL(url).origin === new URL(normalizedSite).origin) {
        pageUrls.add(url);
      }
    }
  }

  return pageUrls;
}

function writeReport(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function parseArgs(argv) {
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
    }
  }
  return options;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await runUrlParityAudit(parseArgs(process.argv.slice(2)));
  console.log(
    `URL parity compared ${result.localCount} local URLs with ${result.liveCount} live URLs: ${result.errors} removals, ${result.addedLocally.length} additions.`,
  );
  console.log(`Reports: ${DEFAULT_JSON_REPORT}, ${DEFAULT_MARKDOWN_REPORT}`);
}
