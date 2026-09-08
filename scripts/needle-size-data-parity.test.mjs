import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

import {
  NEEDLE_SIZE_BASE_ROWS,
  getNeedleSizeRows,
} from "../src/lib/toolReferenceData.ts";

const germanPageSource = readFileSync(
  "src/pages/de/werkzeuge/nadelstaerken-tabelle.astro",
  "utf8",
);
const norwegianPageSource = readFileSync(
  "src/pages/no/verktoy/pinnestorrelser.astro",
  "utf8",
);

function getGermanNeedleSizeRows() {
  const declarations = germanPageSource.match(
    /const needleYarnWeightLabels =[\s\S]*?(?=\nconst faqs =)/,
  );
  assert.ok(declarations, "German Needle Size row declarations are missing");

  const javascript = ts.transpileModule(declarations[0], {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2023,
    },
  }).outputText;

  return vm.runInNewContext(`${javascript}\nrows;`, { getNeedleSizeRows });
}

function getNorwegianNeedleSizeRows() {
  const declarations = norwegianPageSource.match(
    /const rows =[^;]+;(?=\n\nconst formatMm)/,
  );
  assert.ok(declarations, "Norwegian Needle Size row declaration is missing");

  const javascript = ts.transpileModule(declarations[0], {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2023,
    },
  }).outputText;

  return vm.runInNewContext(`${javascript}\nrows;`, { getNeedleSizeRows });
}

test("shared Needle Size data maps JP 6 only to 3.9 mm", () => {
  const row39 = NEEDLE_SIZE_BASE_ROWS.find(([mm]) => mm === "3.9");
  const row40 = NEEDLE_SIZE_BASE_ROWS.find(([mm]) => mm === "4.0");

  assert.equal(row39?.[3], "6");
  assert.equal(row40?.[3], "-");
});

test("German Needle Size rows preserve every shared numeric conversion", () => {
  const rows = getGermanNeedleSizeRows();
  const numericColumns = rows.map((row) => row.slice(0, 4));
  const expectedNumericColumns = getNeedleSizeRows("comma").map((row) =>
    row.slice(0, 4),
  );

  assert.deepEqual(numericColumns, expectedNumericColumns);

  const rowsByMetricSize = new Map(rows.map((row) => [row[0], row]));
  assert.equal(rowsByMetricSize.get("3,9")?.[3], "6");
  assert.equal(rowsByMetricSize.get("4,0")?.[3], "-");
});

test("Norwegian 3.0 mm keeps the shared Super Fine category", () => {
  const sharedRowsByMetricSize = new Map(
    getNeedleSizeRows().map((row) => [row[0], row]),
  );
  const norwegianRowsByMetricSize = new Map(
    getNorwegianNeedleSizeRows().map((row) => [row[0], row]),
  );

  const sharedTarget = sharedRowsByMetricSize.get("3.0");
  const norwegianTarget = norwegianRowsByMetricSize.get("3.0");

  assert.equal(sharedTarget?.[4], "Super Fine");
  assert.equal(norwegianTarget?.[4], sharedTarget?.[4]);
  assert.equal(
    norwegianTarget?.[4],
    norwegianRowsByMetricSize.get("2.75")?.[4],
  );
  assert.equal(sharedRowsByMetricSize.get("3.3")?.[4], "Fine");
  assert.equal(
    norwegianRowsByMetricSize.get("3.3")?.[4],
    sharedRowsByMetricSize.get("3.3")?.[4],
  );
});
