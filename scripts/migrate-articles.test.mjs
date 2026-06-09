import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const migrationScriptSource = readFileSync(
  new URL("./migrate-articles.mjs", import.meta.url),
  "utf8",
);

test("category header parsing does not use a backtracking-prone regex", () => {
  assert.doesNotMatch(
    migrationScriptSource,
    /CATEGORY_HEADER_PATTERN\s*=/,
    "category headers should be parsed without the Sonar S5852 regex hotspot",
  );
});

test("category headers are parsed without running the migration script", async () => {
  const { parseCategoryHeader } = await import("./migrate-articles.mjs");

  assert.equal(
    parseCategoryHeader("Gauge & Calculations"),
    "gauge-calculations",
  );
  assert.equal(
    parseCategoryHeader("Gauge & Calculations (6)"),
    "gauge-calculations",
  );
  assert.equal(parseCategoryHeader("  Yarn (8)  "), "yarn");
  assert.equal(parseCategoryHeader("- 05 - article title"), null);
  assert.equal(parseCategoryHeader("Unknown Category (3)"), null);
  assert.equal(parseCategoryHeader("Yarn (not-a-count)"), null);
});
