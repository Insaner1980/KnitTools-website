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

test("Japanese numbered sizes follow Clover's shaft diameters, not crochet sizes", () => {
  // Clover Takumi specification, page 1, accessed 2026-10-17:
  // https://www.clover.co.jp/recipe/takumikikakus.pdf
  const diameters = [
    "2.1",
    "2.4",
    "2.7",
    "3.0",
    "3.3",
    "3.6",
    "3.9",
    "4.2",
    "4.5",
    "4.8",
    "5.1",
    "5.4",
    "5.7",
    "6.0",
    "6.3",
    "6.6",
  ];
  assert.deepEqual(
    NEEDLE_SIZE_BASE_ROWS.filter((row) => row[3] !== "-").map(
      ([mm, , , jp]) => [mm, jp],
    ),
    diameters.map((mm, jp) => [mm, String(jp)]),
  );
  assert.equal(NEEDLE_SIZE_BASE_ROWS.find(([mm]) => mm === "2.0")?.[3], "-");
});

test("US variants preserve the distinct metric diameters documented by manufacturers", () => {
  // KnitPro conversion chart plus ChiaoGoo's knitting-needle catalogue (not hooks).
  // https://www.knitpro.eu/en/blog/knitting-needle-sizes
  // https://www.chiaogoo.com/wp-content/uploads/2021/09/CG_PriceListOrderForm_21SEPT.pdf
  // Accessed 2026-10-17. US 17 and 19 are deliberately not universal one-to-one mappings.
  for (const [us, expected] of [
    ["000", ["1.5"]],
    ["00", ["1.75"]],
    ["1.5", ["2.5"]],
    ["2.5", ["3.0"]],
    ["10.5", ["6.5"]],
    ["17", ["12.0", "12.75"]],
    ["19", ["15.0", "16.0"]],
  ]) {
    assert.deepEqual(
      NEEDLE_SIZE_BASE_ROWS.filter((row) => row[1] === us).map((row) => row[0]),
      expected,
    );
  }
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
  assert.equal(rowsByMetricSize.get("2,1")?.[4], "Lace");
  assert.equal(rowsByMetricSize.get("2,25")?.[4], "Lace / Fingering");
  assert.equal(rowsByMetricSize.get("12,75")?.[4], "Super Bulky / Jumbo");
  assert.equal(rowsByMetricSize.get("25,0")?.[4], "Jumbo");
});

test("traditional UK/Canadian numbers preserve zeros and the small size 15", () => {
  // Mary Maxim's knitting (not crochet) table and Vogue Knitting, accessed 2026-10-17:
  // https://www.marymaxim.ca/pages/needle-hook-size-charts
  // https://www.vogueknitting.com/pattern-help/how-to/techniques-abbreviations/knitting-needles/
  const expected = [
    ["1.75", "15"],
    ["2.0", "14"],
    ["2.25", "13"],
    ["2.75", "12"],
    ["3.0", "11"],
    ["3.25", "10"],
    ["3.75", "9"],
    ["4.0", "8"],
    ["4.5", "7"],
    ["5.0", "6"],
    ["5.5", "5"],
    ["6.0", "4"],
    ["6.5", "3"],
    ["7.0", "2"],
    ["8.0", "0"],
    ["9.0", "00"],
    ["10.0", "000"],
  ];
  assert.deepEqual(
    NEEDLE_SIZE_BASE_ROWS.filter((row) => row[2] !== "-").map(([mm, , uk]) => [
      mm,
      uk,
    ]),
    expected,
  );
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
