import assert from "node:assert/strict";
import test from "node:test";

import {
  buildReleaseGate,
  buildReleaseGateMarkdown,
} from "./seo-release-gate.mjs";

test("buildReleaseGate passes when local SEO and URL parity are clean while live warnings are deploy-pending", () => {
  const result = buildReleaseGate({
    liveSeo: {
      issues: [
        {
          code: "missing-og-image-alt",
          route: "/",
          severity: "warning",
          message: "Missing ogImageAlt.",
        },
      ],
      summary: { errors: 0, pagesScanned: 410, warnings: 1 },
    },
    localSeo: {
      issues: [],
      summary: { errors: 0, pagesScanned: 411, warnings: 0 },
    },
    urlParity: {
      addedLocally: [],
      errors: 0,
      liveCount: 410,
      localCount: 410,
      removedFromLocal: [],
      shared: 410,
      warnings: 0,
    },
  });

  assert.equal(result.status, "pass");
  assert.equal(result.readyForBatchDeploy, true);
  assert.equal(result.blockers.length, 0);
  assert.equal(result.deployPendingLiveIssues.length, 1);
  assert.equal(result.stillBrokenLocally.length, 0);
});

test("buildReleaseGate blocks local SEO regressions and URL identity changes", () => {
  const result = buildReleaseGate({
    liveSeo: {
      issues: [
        {
          code: "missing-canonical",
          route: "/tools/test/",
          severity: "error",
          message: "Missing canonical link.",
        },
      ],
      summary: { errors: 1, pagesScanned: 410, warnings: 0 },
    },
    localSeo: {
      issues: [
        {
          code: "missing-canonical",
          route: "/tools/test/",
          severity: "error",
          message: "Missing canonical link.",
        },
      ],
      summary: { errors: 1, pagesScanned: 411, warnings: 0 },
    },
    urlParity: {
      addedLocally: ["https://knittoolsapp.com/new/"],
      errors: 1,
      liveCount: 410,
      localCount: 410,
      removedFromLocal: ["https://knittoolsapp.com/old/"],
      sharedCount: 409,
      warnings: 1,
    },
  });

  assert.equal(result.status, "block");
  assert.equal(result.readyForBatchDeploy, false);
  assert.deepEqual(
    result.blockers.map((blocker) => blocker.code),
    [
      "local-seo-errors",
      "live-seo-errors",
      "live-issue-still-local",
      "url-parity-removals",
      "url-parity-additions",
    ],
  );
  assert.equal(result.stillBrokenLocally.length, 1);
});

test("buildReleaseGateMarkdown summarizes pass state and pending live warnings", () => {
  const result = buildReleaseGate({
    liveSeo: {
      issues: [
        {
          code: "missing-twitter-image-alt",
          route: "/about/",
          severity: "warning",
          message: "Missing twitterImageAlt.",
        },
      ],
      summary: { errors: 0, pagesScanned: 410, warnings: 1 },
    },
    localSeo: {
      issues: [],
      summary: { errors: 0, pagesScanned: 411, warnings: 0 },
    },
    urlParity: {
      addedLocally: [],
      errors: 0,
      liveCount: 410,
      localCount: 410,
      removedFromLocal: [],
      shared: 410,
      warnings: 0,
    },
  });

  const markdown = buildReleaseGateMarkdown(result);

  assert.match(markdown, /Status: pass/);
  assert.match(markdown, /Ready for batch deploy: yes/);
  assert.match(markdown, /Deploy-pending live issues: 1/);
});
