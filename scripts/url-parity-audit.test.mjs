import assert from "node:assert/strict";
import test from "node:test";

import { compareUrlSets, buildUrlParityMarkdown } from "./url-parity-audit.mjs";

test("compareUrlSets reports removed, added, and shared URLs", () => {
  const result = compareUrlSets({
    liveUrls: new Set([
      "https://knittoolsapp.com/",
      "https://knittoolsapp.com/about/",
      "https://knittoolsapp.com/old/",
    ]),
    localUrls: new Set([
      "https://knittoolsapp.com/",
      "https://knittoolsapp.com/about/",
      "https://knittoolsapp.com/new/",
    ]),
  });

  assert.deepEqual(result.removedFromLocal, ["https://knittoolsapp.com/old/"]);
  assert.deepEqual(result.addedLocally, ["https://knittoolsapp.com/new/"]);
  assert.equal(result.shared, 2);
  assert.equal(result.errors, 1);
  assert.equal(result.warnings, 0);
});

test("buildUrlParityMarkdown highlights URL removals before deploy", () => {
  const markdown = buildUrlParityMarkdown({
    addedLocally: ["https://knittoolsapp.com/new/"],
    errors: 1,
    generatedAt: "2026-05-31T12:00:00.000Z",
    liveCount: 3,
    localCount: 3,
    removedFromLocal: ["https://knittoolsapp.com/old/"],
    shared: 2,
    siteUrl: "https://knittoolsapp.com",
    warnings: 0,
  });

  assert.match(markdown, /Removed from local build/);
  assert.match(markdown, /https:\/\/knittoolsapp\.com\/old\//);
  assert.match(markdown, /Added locally/);
});
