import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

import {
  YARN_WEIGHT_BASE_ROWS,
  getEnglishYarnWeightCategories,
  getLocalizedYarnWeightRows,
  getWpiCategories,
} from "../src/lib/toolReferenceData.ts";

const pages = {
  en: "src/pages/tools/yarn-weight-chart.astro",
  fi: "src/pages/fi/tyokalut/lankavahvuudet.astro",
  sv: "src/pages/sv/verktyg/garntjocklekar.astro",
  no: "src/pages/no/verktoy/garntykkelser.astro",
  da: "src/components/danish-tools/DanishYarnWeightChartPage.astro",
  de: "src/pages/de/werkzeuge/garnstaerken-tabelle.astro",
  fr: "src/pages/fr/outils/epaisseurs-de-fil.astro",
  nl: "src/components/dutch-tools/DutchYarnWeightChartPage.astro",
};
const source = readFileSync("src/components/WpiIdentifier.astro", "utf8");
const script = source.match(/<script[\s\S]*?>\s*([\s\S]*?)<\/script>/)[1];
const declarations = source.match(/const copy: Copy =[\s\S]*?(?=\n---)/)[0];

function evaluate(code, context = {}) {
  return vm.runInNewContext(
    ts.transpileModule(code, {
      compilerOptions: { target: ts.ScriptTarget.ES2023 },
    }).outputText,
    context,
  );
}

function mount(lang) {
  const { copy, categories } = evaluate(
    `${declarations}\n({copy, categories});`,
    { lang, getWpiCategories },
  );
  let update;
  const attributes = new Map();
  const input = {
    value: "",
    addEventListener: (event, callback) => {
      assert.equal(event, "input");
      update = callback;
    },
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: (key) => attributes.delete(key),
  };
  const result = { textContent: copy.prompt };
  const tool = {
    matches: () => true,
    querySelector: (selector) =>
      selector === "[data-wpi-input]" ? input : result,
  };
  vm.runInNewContext(script, {
    document: { currentScript: { previousElementSibling: tool } },
    wpiCopy: copy,
    wpiCategories: categories,
    wpiLocale: lang === "no" ? "nb" : lang,
    Intl,
  });
  return {
    copy,
    categories,
    attributes,
    enter(value) {
      input.value = value;
      update();
      return result.textContent;
    },
  };
}

test("all eight reference rows follow CYC's stockinette and WPI guides", () => {
  // Independently transcribed from the publisher, accessed 2026-10-17:
  // https://www.craftyarncouncil.com/standards/yarn-weight-system
  // https://www.craftyarncouncil.com/standards/how-measure-wraps-inch-wpi
  // These are guidelines, not exact conversions; lace-pattern gauge can differ.
  assert.deepEqual(
    YARN_WEIGHT_BASE_ROWS.map((row) => [
      row.symbol,
      row.gaugeStitches,
      row.needleRangeMm,
      row.needleRangeUs,
      row.wpi,
    ]),
    [
      ["0", "33-40", "1.5-2.25", "000-1", "30-40+"],
      ["1", "27-32", "2.25-3.25", "1-3", "14-30"],
      ["2", "23-26", "3.25-3.75", "3-5", "12-18"],
      ["3", "21-24", "3.75-4.5", "5-7", "11-15"],
      ["4", "16-20", "4.5-5.5", "7-9", "9-12"],
      ["5", "12-15", "5.5-8", "9-11", "6-9"],
      ["6", "7-11", "8-12.75", "11-17", "5-6"],
      ["7", "≤6", "12.75+", "17+", "1-4"],
    ],
  );
});

// CYC's published intervals intentionally overlap. Decimal 4 < WPI < 5 has
// no listed interval: report that gap instead of rounding into a category.
const boundaries = [
  [1, [7]],
  [1.1, [7]],
  [2.5, [7]],
  [3.9, [7]],
  [4, [7]],
  [4.1, []],
  [4.5, []],
  [4.9, []],
  [5, [6]],
  [5.1, [6]],
  [5.9, [6]],
  [6, [5, 6]],
  [6.1, [5]],
  [7.5, [5]],
  [8.9, [5]],
  [9, [4, 5]],
  [9.1, [4]],
  [10, [4]],
  [10.9, [4]],
  [11, [3, 4]],
  [11.1, [3, 4]],
  [11.9, [3, 4]],
  [12, [2, 3, 4]],
  [12.1, [2, 3]],
  [13, [2, 3]],
  [13.9, [2, 3]],
  [14, [1, 2, 3]],
  [14.1, [1, 2, 3]],
  [14.9, [1, 2, 3]],
  [15, [1, 2, 3]],
  [15.1, [1, 2]],
  [17.9, [1, 2]],
  [18, [1, 2]],
  [18.1, [1]],
  [24, [1]],
  [29.9, [1]],
  [30, [0, 1]],
  [30.1, [0]],
  [35, [0]],
  [39.9, [0]],
  [40, [0]],
];

for (const [lang, path] of Object.entries(pages)) {
  test(`${lang}: every WPI boundary, overlap and gap in the actual input handler`, () => {
    const tool = mount(lang);
    for (const [value, expected] of boundaries) {
      const text = tool.enter(String(value));
      assert.deepEqual(
        [...text.matchAll(/CYC (\d)/g)].map((match) => Number(match[1])),
        expected,
        `${lang}: ${value} WPI: ${text}`,
      );
      assert.ok(
        text.includes(expected.length ? tool.copy.swatch : tool.copy.between),
      );
      assert.equal(tool.attributes.has("aria-invalid"), false);
    }
    assert.ok(tool.enter("4.5").startsWith(lang === "en" ? "4.5" : "4,5"));
  });

  test(`${lang}: comma and dot decimals keep the same numeric value`, () => {
    const tool = mount(lang);
    for (const value of ["1.5", "4.5", "12.5", "39.9"]) {
      const expected = tool.enter(value);
      assert.equal(tool.enter(value.replace(".", ",")), expected);
      assert.equal(tool.attributes.has("aria-invalid"), false);
    }
    assert.match(tool.enter("1,5"), /CYC 7/);
    assert.equal(tool.enter("40,1"), tool.copy.invalid);
  });

  test(`${lang}: invalid input clears previous results and can recover`, () => {
    const tool = mount(lang);
    for (const invalid of [
      "0",
      "-1",
      "0.99",
      "40.01",
      "41",
      "Infinity",
      "abc",
      "-",
      "1e",
      "1,2,3",
      "1.2,3",
      "0x10",
      "1 5",
    ]) {
      tool.enter("12");
      assert.equal(tool.enter(invalid), tool.copy.invalid);
      assert.equal(tool.attributes.get("aria-invalid"), "true");
      assert.match(tool.enter("10"), /CYC 4/);
      assert.equal(tool.attributes.has("aria-invalid"), false);
    }
    assert.equal(tool.enter(""), tool.copy.prompt);
    assert.equal(tool.attributes.has("aria-invalid"), false);
    assert.match(tool.enter("1e1"), /CYC 4/);
  });

  test(`${lang}: page rows and WPI feedback use consistent category names and units`, () => {
    const page = readFileSync(path, "utf8");
    const pageDeclarations = page.match(
      /const yarnWeightCopy =[\s\S]*?(?=\nconst faqs =)/,
    )[0];
    const rows = evaluate(
      `${pageDeclarations}\n${lang === "en" ? "categories" : "rows"};`,
      { getEnglishYarnWeightCategories, getLocalizedYarnWeightRows },
    );
    const tool = mount(lang);
    assert.equal(rows.length, 8);
    for (let index = 0; index < 8; index++) {
      assert.equal(
        lang === "en" ? rows[index].name : rows[index][1],
        tool.categories[index].name,
      );
    }
    assert.match(page, /craftyarncouncil\.com\/standards\/yarn-weight-system/);
    assert.match(
      page,
      /craftyarncouncil\.com\/standards\/how-measure-wraps-inch-wpi/,
    );
    if (lang !== "en") {
      assert.match(rows[0][4], /1,5-2,25 mm/);
      assert.ok(!/\d\.\d/.test(rows.map((row) => row[4]).join(" ")));
      assert.match(rows[0][3], /4 (in|tum|tommer|Zoll|pouces|inch)/);
    }
  });
}

test("decimal input preserves comma characters for the handler", () => {
  assert.match(source, /type="text"/);
  assert.match(source, /inputmode="decimal"/);
});
