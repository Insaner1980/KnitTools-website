import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync("src/components/YarnEstimator.astro", "utf8");

// Read the existing literal data without moving production code for a test.
function readLiteral(name) {
  const match = source.match(
    new RegExp(`const ${name}[^=]*= (\\{[\\s\\S]*?\\n\\s*\\});`),
  );
  assert.ok(match, `Missing production literal: ${name}`);
  return JSON.parse(
    JSON.stringify(runInNewContext(`(${match[1]})`, {}, { timeout: 1000 })),
  );
}

const projects = readLiteral("PROJECTS");
const labels = readLiteral("sizeLabelsByLang");
const keys = [...new Set(Object.values(projects).flatMap(Object.keys))];

test("project values, size ordering and yarn factors retain their contract", () => {
  assert.equal(
    createHash("sha256")
      .update(JSON.stringify([projects, readLiteral("MULTIPLIERS")]))
      .digest("hex"),
    "b11a6ecf73fd7ddf99de2b05b2d0f606bf03e1c894207a5244e7f75e12f75f0b",
  );
});

test("EN/DE/SV/NO size mappings remain unchanged", () => {
  assert.equal(
    createHash("sha256")
      .update(
        JSON.stringify(
          ["en", "de", "sv", "no"].map((lang) => labels[lang] ?? {}),
        ),
      )
      .digest("hex"),
    "f5450710fb13b409ff63c22ddf3f6d0c0287b522c7c8dee43d875eb0395e58bb",
  );
});

// International garment sizes and EU shoe ranges are intentionally unchanged.
// Age suffixes M/Y are not neutral notation, unlike the standalone garment M.
const neutral = new Set([
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "S/M",
  "L/XL",
  "2XL+",
  "S (EU 36-38)",
  "M (EU 39-41)",
  "L (EU 42-44)",
  "XL (EU 45-47)",
]);

// These international bed categories are valid identical terms in all four locales.
const sharedNames = new Set(["Queen (230×250cm)", "King (270×250cm)"]);

function missingLabels(sizeKeys, mapping) {
  return sizeKeys.filter(
    (key) =>
      !neutral.has(key) &&
      !sharedNames.has(key) &&
      (typeof mapping?.[key] !== "string" || !mapping[key].trim()),
  );
}

for (const lang of ["fi", "fr", "nl", "da"]) {
  test(`${lang}: every descriptive production size has a translation`, () => {
    assert.deepEqual(missingLabels(keys, labels[lang]), []);
  });

  test(`${lang}: neutral notation and numeric measurements are preserved`, () => {
    for (const key of keys) {
      if (neutral.has(key)) {
        assert.equal(labels[lang]?.[key] ?? key, key);
      } else if (labels[lang]?.[key]) {
        assert.deepEqual(
          labels[lang][key].match(/\d+|\+/g),
          key.match(/\d+|\+/g),
          key,
        );
      }
    }
  });
}

test("new descriptive keys cannot silently use the English fallback", () => {
  assert.deepEqual(missingLabels([...keys, "Extra Tall"], labels.de), [
    "Extra Tall",
  ]);
});

test("Finnish scarf labels preserve the four original lengths", () => {
  assert.deepEqual(
    Object.keys(projects.scarf).map((key) => labels.fi?.[key]),
    [
      "Lyhyt (120 cm)",
      "Keskipitkä (150 cm)",
      "Pitkä (180 cm)",
      "Erittäin pitkä (200 cm+)",
    ],
  );
});

for (const [lang, expected] of Object.entries({
  fi: ["Matala", "Korkea"],
  fr: ["Bas", "Haut"],
  nl: ["Laag", "Hoog"],
  da: ["Lav", "Høj"],
})) {
  test(`${lang}: cowl sizes describe height`, () => {
    assert.deepEqual(Object.keys(projects.cowl), ["Short", "Tall"]);
    assert.deepEqual(
      Object.keys(projects.cowl).map((key) => labels[lang]?.[key]),
      expected,
    );
  });
}

test("shared bed-size names and valid identical words remain legitimate", () => {
  // Queen/King name the original bed categories; do not invent local dimensions.
  // French Long and French/Danish Standard are also correct target-language words.
  for (const lang of ["fi", "fr", "nl", "da"]) {
    for (const key of sharedNames) {
      assert.equal(
        (labels[lang]?.[key] ?? key).replaceAll(" ", "").replaceAll("×", "x"),
        key.replaceAll(" ", "").replaceAll("×", "x"),
      );
    }
  }
  assert.equal(labels.fr["Long (180cm)"], "Long (180 cm)");
  for (const lang of ["fr", "da"]) {
    assert.equal(labels[lang]["Standard (75×100cm)"], "Standard (75 x 100 cm)");
  }
});
