#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_LOCAL_SEO_REPORT = "reports/seo-audit.json";
const DEFAULT_LIVE_SEO_REPORT = "reports/live-seo-audit.json";
const DEFAULT_URL_PARITY_REPORT = "reports/url-parity-audit.json";
const DEFAULT_JSON_REPORT = "reports/seo-release-gate.json";
const DEFAULT_MARKDOWN_REPORT = "reports/seo-release-gate.md";

export function buildReleaseGate({ liveSeo, localSeo, urlParity }) {
  const blockers = [];
  const localIssues = localSeo.issues ?? [];
  const liveIssues = liveSeo.issues ?? [];
  const localIssueKeys = new Set(localIssues.map(issueKey));
  const stillBrokenLocally = liveIssues.filter((issue) =>
    localIssueKeys.has(issueKey(issue)),
  );
  const deployPendingLiveIssues = liveIssues.filter(
    (issue) => !localIssueKeys.has(issueKey(issue)),
  );

  if ((localSeo.summary?.errors ?? 0) > 0) {
    blockers.push({
      code: "local-seo-errors",
      count: localSeo.summary.errors,
      message: "Local SEO audit has error-level issues.",
    });
  }

  if ((localSeo.summary?.warnings ?? 0) > 0) {
    blockers.push({
      code: "local-seo-warnings",
      count: localSeo.summary.warnings,
      message: "Local SEO audit has warning-level issues.",
    });
  }

  if ((liveSeo.summary?.errors ?? 0) > 0) {
    blockers.push({
      code: "live-seo-errors",
      count: liveSeo.summary.errors,
      message: "Production SEO audit has error-level issues.",
    });
  }

  if (stillBrokenLocally.length > 0) {
    blockers.push({
      code: "live-issue-still-local",
      count: stillBrokenLocally.length,
      message: "At least one production SEO issue is still present locally.",
    });
  }

  if ((urlParity.errors ?? 0) > 0 || urlParity.removedFromLocal?.length > 0) {
    blockers.push({
      code: "url-parity-removals",
      count: urlParity.removedFromLocal?.length ?? urlParity.errors,
      message: "Local build would remove one or more live URLs.",
    });
  }

  if ((urlParity.warnings ?? 0) > 0 || urlParity.addedLocally?.length > 0) {
    blockers.push({
      code: "url-parity-additions",
      count: urlParity.addedLocally?.length ?? urlParity.warnings,
      message:
        "Local build would add one or more URLs compared with production.",
    });
  }

  const status = blockers.length === 0 ? "pass" : "block";

  return {
    blockers,
    deployPendingLiveIssues,
    generatedAt: new Date().toISOString(),
    readyForBatchDeploy: status === "pass",
    status,
    stillBrokenLocally,
    summary: {
      liveSeo: {
        errors: liveSeo.summary?.errors ?? 0,
        pagesScanned: liveSeo.summary?.pagesScanned ?? 0,
        warnings: liveSeo.summary?.warnings ?? 0,
      },
      localSeo: {
        errors: localSeo.summary?.errors ?? 0,
        pagesScanned: localSeo.summary?.pagesScanned ?? 0,
        warnings: localSeo.summary?.warnings ?? 0,
      },
      urlParity: {
        addedLocally: urlParity.addedLocally?.length ?? 0,
        liveCount: urlParity.liveCount ?? 0,
        localCount: urlParity.localCount ?? 0,
        removedFromLocal: urlParity.removedFromLocal?.length ?? 0,
        sharedCount: urlParity.shared ?? urlParity.sharedCount ?? 0,
      },
    },
  };
}

export function buildReleaseGateMarkdown(result) {
  const lines = [
    "# SEO Release Gate",
    "",
    `Generated: ${result.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Status: ${result.status}`,
    `- Ready for batch deploy: ${result.readyForBatchDeploy ? "yes" : "no"}`,
    `- Local SEO: ${result.summary.localSeo.errors} errors, ${result.summary.localSeo.warnings} warnings, ${result.summary.localSeo.pagesScanned} pages`,
    `- Live SEO: ${result.summary.liveSeo.errors} errors, ${result.summary.liveSeo.warnings} warnings, ${result.summary.liveSeo.pagesScanned} pages`,
    `- URL parity: ${result.summary.urlParity.localCount} local / ${result.summary.urlParity.liveCount} live / ${result.summary.urlParity.sharedCount} shared`,
    `- URL removals: ${result.summary.urlParity.removedFromLocal}`,
    `- URL additions: ${result.summary.urlParity.addedLocally}`,
    `- Still broken locally: ${result.stillBrokenLocally.length}`,
    `- Deploy-pending live issues: ${result.deployPendingLiveIssues.length}`,
    "",
    "## Blockers",
    "",
  ];

  if (result.blockers.length === 0) {
    lines.push("No blockers found.");
  } else {
    for (const blocker of result.blockers) {
      lines.push(`- ${blocker.code}: ${blocker.message} (${blocker.count})`);
    }
  }

  lines.push("", "## Deploy-Pending Live Issues", "");
  if (result.deployPendingLiveIssues.length === 0) {
    lines.push("No deploy-pending live issues.");
  } else {
    for (const [code, count] of countIssuesByCode(
      result.deployPendingLiveIssues,
    )) {
      lines.push(`- ${code}: ${count}`);
    }
  }

  lines.push("", "## Still Broken Locally", "");
  if (result.stillBrokenLocally.length === 0) {
    lines.push("No live issues are still present in the local build.");
  } else {
    for (const issue of result.stillBrokenLocally) {
      lines.push(
        `- ${issue.severity.toUpperCase()} ${issue.code} ${issue.route}: ${issue.message}`,
      );
    }
  }

  lines.push("");
  return `${lines.join("\n")}\n`;
}

export function runReleaseGate({
  jsonReport = DEFAULT_JSON_REPORT,
  liveSeoReport = DEFAULT_LIVE_SEO_REPORT,
  localSeoReport = DEFAULT_LOCAL_SEO_REPORT,
  markdownReport = DEFAULT_MARKDOWN_REPORT,
  strict = false,
  urlParityReport = DEFAULT_URL_PARITY_REPORT,
} = {}) {
  const result = buildReleaseGate({
    liveSeo: readJson(liveSeoReport),
    localSeo: readJson(localSeoReport),
    urlParity: readJson(urlParityReport),
  });

  writeReport(jsonReport, `${JSON.stringify(result, null, 2)}\n`);
  writeReport(markdownReport, buildReleaseGateMarkdown(result));

  if (strict && result.status !== "pass") {
    process.exitCode = 1;
  }

  return result;
}

function issueKey(issue) {
  return [
    issue.severity ?? "",
    issue.code ?? "",
    issue.route ?? "",
    issue.target ?? "",
  ].join("|");
}

function countIssuesByCode(issues) {
  const counts = new Map();
  for (const issue of issues) {
    counts.set(issue.code, (counts.get(issue.code) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) =>
    a[0] === b[0] ? 0 : a[0].localeCompare(b[0]),
  );
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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
    } else if (arg === "--local-seo") {
      options.localSeoReport = argv[++index];
    } else if (arg === "--live-seo") {
      options.liveSeoReport = argv[++index];
    } else if (arg === "--url-parity") {
      options.urlParityReport = argv[++index];
    } else if (arg === "--json") {
      options.jsonReport = argv[++index];
    } else if (arg === "--markdown") {
      options.markdownReport = argv[++index];
    }
  }
  return options;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = runReleaseGate(parseArgs(process.argv.slice(2)));
  console.log(
    `SEO release gate ${result.status}: ${result.blockers.length} blockers, ${result.deployPendingLiveIssues.length} deploy-pending live issues.`,
  );
  console.log(`Reports: ${DEFAULT_JSON_REPORT}, ${DEFAULT_MARKDOWN_REPORT}`);
}
