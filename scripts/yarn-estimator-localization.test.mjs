import assert from "node:assert/strict";
import test from "node:test";
import {
  yarnReferences,
  referenceQuantity,
} from "../src/lib/yarnReferences.ts";
import { yarnReferenceCopy } from "../src/i18n/yarnReference.ts";

// Independently transcribed from source materials/size sections, not generated
// from production data. Full provenance: yarn-estimator-data.md.
test("Novice Sweater Kos supply matches all nine original size columns", () => {
  const expected = [
    ["XS", 250, 91, 54, 750],
    ["S", 300, 98, 55, 900],
    ["M", 350, 103, 57, 1050],
    ["L", 350, 109, 60, 1050],
    ["XL", 400, 116, 62, 1200],
    ["2XL", 400, 128, 64, 1200],
    ["3XL", 450, 138, 65, 1350],
    ["4XL", 500, 149, 66, 1500],
    ["5XL", 550, 161, 68, 1650],
  ];
  for (const [size, grams, bust, length, meters] of expected) {
    const result = referenceQuantity("sweater", `novice-${size}`, "m");
    assert.equal(result.quantity, meters);
    assert.equal(result.reference.materials, `${grams} g`);
    assert.deepEqual(result.reference.dimensionsCm, [bust, length]);
    assert.deepEqual(result.reference.gauge, [16, 21, 10]);
    assert.equal(result.reference.basis, "supply");
  }
});

test("Purl Soho required lengths remain distinct from whole-ball supply", () => {
  // Garter Ridge: 120+110 / 315+290 yd; purchasing is 438 / 876 yd.
  // Meadow Breeze: 385 / 910 yd; purchasing is 410 / 1025 yd.
  // Piece Of Cake: sum A-G 540 / 940 yd; purchasing is 715 / 1040 yd.
  for (const [project, id, yards, meters, supply] of [
    ["cowl", "cowl-0", 230, 210.312, 438],
    ["cowl", "cowl-1", 605, 553.212, 876],
    ["scarf", "meadow-0", 385, 352.044, 410],
    ["shawl", "meadow-1", 910, 832.104, 1025],
    ["baby-blanket", "blanket-0", 540, 493.776, 715],
    ["throw-blanket", "blanket-1", 940, 859.536, 1040],
  ]) {
    const result = referenceQuantity(project, id, "yd");
    assert.equal(result.quantity, yards);
    assert.notEqual(result.quantity, supply);
    assert.equal(result.reference.basis, "requirement");
    assert.ok(
      Math.abs(referenceQuantity(project, id, "m").quantity - meters) < 1e-9,
    );
    assert.equal(referenceQuantity(project, id, "yd").quantity, yards);
  }
});

test("conversion uses the original quantity and exact international yard", () => {
  assert.equal(
    referenceQuantity("sweater", "novice-XS", "yd").quantity,
    750 / 0.9144,
  );
  assert.equal(
    Math.round(referenceQuantity("sweater", "novice-4XL", "yd").quantity),
    1640,
  );
  assert.notEqual(
    referenceQuantity("cowl", "cowl-0", "yd").quantity,
    Math.round(210.312) / 0.9144,
  );
});

test("unsupported projects, sizes, legacy factors and mismatched cases return no estimate", () => {
  for (const args of [
    ["cardigan", "M", "m"],
    ["sweater", "M", "m"],
    ["sweater", "cowl-0", "m"],
    ["cowl", "cowl-0", "fingering"],
    ["__proto__", "constructor", "m"],
    ["", "", ""],
  ])
    assert.equal(referenceQuantity(...args), null);
  assert.equal(yarnReferences.length, 133);
  assert.equal(new Set(yarnReferences.map((r) => r.id)).size, 133);
});

for (const lang of ["en", "fi", "de", "sv", "no", "da", "fr", "nl"]) {
  test(`${lang}: every method, limitation, quantity basis and construction has localized text`, () => {
    const copy = yarnReferenceCopy[lang];
    assert.deepEqual(
      Object.keys(copy).sort(),
      Object.keys(yarnReferenceCopy.en).sort(),
    );
    for (const value of Object.values(copy))
      assert.ok(typeof value === "string" && value.trim());
    assert.ok(copy.limitations.includes("133"));
    assert.ok(
      copy.coverage.includes("2XL") &&
        copy.coverage.includes("XXL") &&
        copy.coverage.includes("5XL"),
    );
    assert.ok(copy.method.includes(lang === "en" ? "0.9144" : "0,9144"));
    if (lang !== "en")
      for (const key of [
        "intro",
        "limitations",
        "method",
        "advice",
        "unavailable",
        "supply",
        "requirement",
      ])
        assert.notEqual(copy[key], yarnReferenceCopy.en[key]);
  });
}

// Independent source fixtures: current PDF sizing tables (Flax c2/b3 and
// Harvest pp. 2–3), PetiteKnit materials tables, TCK Bracken size viewer.
// Values below are source units, not read back from the production model.
const sourceRows = {
  flax: {
    sizes: [
      "0-6 mo",
      "6-12 mo",
      "1-2 yrs",
      "2-4 yrs",
      "4-6 yrs",
      "6-8 yrs",
      "8-10 yrs",
      "XS",
      "S",
      "SM",
      "M",
      "ML",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL",
      "5XL",
      "6XL",
    ],
    chest: [
      18, 20.5, 22, 24, 26, 28.5, 30, 32, 34, 36.5, 38, 40, 42, 46, 50, 55.5,
      60.5, 65, 70,
    ],
    length: [
      6, 6.5, 7, 8, 10, 13, 15, 15, 15, 16, 16, 17, 18, 18.5, 19, 20, 20, 20,
      20,
    ],
    amounts: [
      240, 280, 340, 420, 540, 660, 800, 920, 980, 1080, 1160, 1260, 1380, 1520,
      1700, 1880, 2080, 2200, 2340,
    ],
    gauge: [18, 24, 10.16],
    unit: "yd",
    basis: "pattern",
    dimensionFactor: 2.54,
  },
  harvest: {
    sizes: [
      "0-6 mo",
      "6-12 mo",
      "1-2 yrs",
      "2-4 yrs",
      "4-6 yrs",
      "6-8 yrs",
      "8-10 yrs",
      "XS",
      "S",
      "SM",
      "M",
      "ML",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL",
      "5XL",
      "6XL",
    ],
    chest: [
      18.5, 20.5, 22, 24, 25.5, 28.5, 30.5, 31.5, 33.5, 37, 38, 40, 42, 46.5,
      49.5, 55, 60, 65, 70.5,
    ],
    length: [
      6, 7, 8, 9, 11, 14, 16, 18, 19, 19, 20, 20, 21, 21, 21, 21, 21, 21, 21,
    ],
    amounts: [
      250, 350, 450, 500, 600, 700, 850, 1000, 1100, 1200, 1300, 1400, 1500,
      1600, 1700, 1800, 1900, 2100, 2300,
    ],
    gauge: [18, 24, 10.16],
    unit: "yd",
    basis: "pattern",
    dimensionFactor: 2.54,
  },
  eva: {
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    chest: [106, 112, 116, 120, 126, 132, 134, 140, 150, 156],
    length: [53, 55, 59, 61, 63, 64, 67, 68, 71, 72],
    amounts: [1001, 1092, 1092, 1183, 1183, 1274, 1365, 1456, 1547, 1638],
    gauge: [20, 30, 10],
    unit: "m",
    basis: "supply",
    dimensionFactor: 1,
  },
  weekend: {
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    chest: [107, 112, 117, 123, 131, 141, 151, 160, 171],
    length: [58, 59, 60, 61, 62, 63, 64, 65, 66],
    amounts: [1436, 1436, 1436, 1436, 1648, 1648, 2060, 2060, 2060],
    gauge: [15, 20, 10],
    unit: "m",
    basis: "combinedSupply",
    dimensionFactor: 1,
  },
  bracken: {
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
    chest: [27, 30.5, 33.5, 37.5, 40.5, 45.5, 49.5, 53.5, 57.5, 61.5],
    length: [17, 17, 19, 20.5, 21.5, 22, 23.5, 24.5, 26, 27],
    amounts: [450, 500, 650, 750, 900, 1050, 1150, 1200, 1400, 1500],
    gauge: [30, 28, 10.16],
    unit: "yd",
    basis: "pattern",
    dimensionFactor: 2.54,
  },
};
for (const [family, fixture] of Object.entries(sourceRows)) {
  test(`${family}: every original size, dimension, gauge and quantity matches the source`, () => {
    const actual = yarnReferences.filter((r) => r.family === family);
    assert.deepEqual(
      actual.map((r) => r.size),
      fixture.sizes,
    );
    actual.forEach((r, i) => {
      assert.deepEqual(r.dimensionsCm, [
        fixture.chest[i] * fixture.dimensionFactor,
        fixture.length[i] * fixture.dimensionFactor,
      ]);
      assert.deepEqual(r.gauge, fixture.gauge);
      assert.equal(r.unit, fixture.unit);
      assert.equal(r.basis, fixture.basis);
      assert.equal(r.quantity, fixture.amounts[i]);
      const meters =
        fixture.unit === "m" ? fixture.amounts[i] : fixture.amounts[i] * 0.9144;
      assert.ok(
        Math.abs(referenceQuantity(r.project, r.id, "m").quantity - meters) <
          1e-9,
      );
      assert.ok(
        Math.abs(
          referenceQuantity(r.project, r.id, "yd").quantity - meters / 0.9144,
        ) < 1e-9,
      );
    });
  });
}

test("each adult garment has two independently named designs for every 2XL–5XL size", () => {
  for (const project of ["sweater", "cardigan", "vest"])
    for (const size of ["2XL", "3XL", "4XL", "5XL"]) {
      const references = yarnReferences.filter(
        (r) =>
          r.project === project &&
          (r.size === size || (size === "2XL" && r.size === "XXL")),
      );
      assert.equal(
        new Set(references.map((r) => r.family)).size,
        2,
        `${project} ${size}`,
      );
      for (const r of references) {
        assert.ok(r.dimensionsCm[0] > 100);
        assert.ok(
          yarnReferences.some(
            (other) => other.family === r.family && other.size === "XS",
          ),
        );
      }
    }
  // No relabeling of designer XXL, nor equivalence of physical chest sizes.
  assert.equal(yarnReferences.find((r) => r.id === "bracken-XXL").size, "XXL");
  assert.notEqual(
    yarnReferences.find((r) => r.id === "bracken-XXL").dimensionsCm[0],
    yarnReferences.find((r) => r.id === "weekend-2XL").dimensionsCm[0],
  );
});

test("ranges and held-together supplies retain their distinct meaning and exact conversion", () => {
  const range = referenceQuantity("cardigan", "eva-XXS", "yd");
  assert.equal(range.quantity, 1001 / 0.9144);
  assert.equal(range.quantityMax, 1092 / 0.9144);
  assert.equal(
    referenceQuantity("cardigan", "eva-XS", "m").quantityMax,
    undefined,
  );
  const held = referenceQuantity("vest", "weekend-5XL", "m");
  assert.equal(held.quantity, 2060);
  assert.equal(
    held.reference.materials,
    "Håndværksgarn: 500 g = 1000 m; Silk Mohair: 125 g = 1060 m",
  );
  assert.equal(held.reference.basis, "combinedSupply");
});

test("accessory source quantities, dimensions and per-color sums are preserved", () => {
  const fixtures = [
    [
      "barley",
      [60, 70, 80, 90, 110, 150, 170],
      [14, 16, 17.5, 19, 21, 22.5, 23.5],
      null,
    ],
    [
      "maize",
      [70, 80, 120, 150, 200, 50, 60, 80, 100, 140],
      [6, 6.5, 7, 7.75, 8.5, 6, 6.5, 7, 7.75, 8.5],
      [7, 7.5, 9.25, 9.75, 11.25, 4.5, 4.5, 5.75, 6.5, 7.75],
    ],
    [
      "rye",
      [70, 90, 120, 180, 220, 280, 340],
      [4.25, 5, 5.75, 6.5, 7.25, 8, 8.75],
      [3.25, 4, 5.25, 7.25, 8.25, 9.75, 11.5],
    ],
    [
      "slippers",
      [85, 115, 140, 175, 210, 260, 305, 365, 419],
      [2, 2.25, 2.75, 3.25, 3.75, 4.25, 4.75, 5.25, 5.75],
      [3.75, 4.75, 5.75, 6.5, 7.5, 8.5, 9.5, 10.25, 11.25],
    ],
    ["washcloth", [55], [6.5], [6.5]],
    ["headband", [100], [19], [4]],
    [
      "gloves",
      [270, 310, 380, 160, 215, 250, 305],
      [6.75, 7.25, 8.25, 6, 6.75, 7.25, 8.25],
      [11.5, 12.5, 13.5, 8.5, 9.5, 10.5, 11.25],
    ],
    ["poncho", [680, 935, 1275], [17, 20, 23], [46, 54, 64]],
    [
      "seedBlanket",
      [522, 1479, 1914, 3132, 4524],
      [28, 45, 60, 66, 90],
      [30, 60, 60, 90, 95],
    ],
    ["lapBlanket", [280], [26], [56]],
  ];
  for (const [family, quantities, widths, lengths] of fixtures) {
    const actual = yarnReferences.filter((r) => r.family === family);
    assert.equal(actual.length, quantities.length);
    actual.forEach((r, i) => {
      assert.equal(r.quantity, quantities[i]);
      assert.equal(r.unit, "yd");
      assert.deepEqual(
        r.dimensionsCm,
        lengths ? [widths[i] * 2.54, lengths[i] * 2.54] : [widths[i] * 2.54],
      );
      assert.ok(
        Math.abs(
          referenceQuantity(r.project, r.id, "m").quantity -
            quantities[i] * 0.9144,
        ) < 1e-9,
      );
      if (["slippers", "washcloth"].includes(family)) {
        const parts = [...r.materials.matchAll(/(\d+) yd/g)].map((m) =>
          Number(m[1]),
        );
        assert.equal(
          parts.reduce((a, b) => a + b, 0),
          r.quantity,
        );
      }
    });
  }
});

test("accessory gauges and coverage remain source-specific, including unstated row gauges", () => {
  const gauges = {
    barley: [18, 24, 10.16],
    maize: [20, 28, 10.16],
    rye: [22, 30, 10.16],
    slippers: [24, 48, 10.16],
    washcloth: [20, 35, 10.16],
    gloves: [34, 40, 10.16],
    poncho: [20, 29, 10.16],
    seedBlanket: [11, null, 10.16],
    lapBlanket: [1, null, 2.54],
    headband: [21, 18, 10.16],
  };
  for (const r of yarnReferences)
    if (gauges[r.family]) assert.deepEqual(r.gauge, gauges[r.family]);
  assert.equal(new Set(yarnReferences.map((r) => r.family)).size, 19);
  assert.equal(new Set(yarnReferences.map((r) => r.project)).size, 28);
  for (const project of ["wrap", "pillow-cover"])
    assert.ok(!yarnReferences.some((r) => r.project === project));
  assert.deepEqual(
    yarnReferences.filter((r) => r.family === "poncho").map((r) => r.size),
    ["46", "54", "64"],
  );
  assert.deepEqual(
    yarnReferences.filter((r) => r.family === "eva").map((r) => r.bodyCm),
    [
      [75, 80],
      [80, 85],
      [85, 90],
      [90, 95],
      [95, 100],
      [100, 110],
      [110, 120],
      [120, 130],
      [130, 140],
      [140, 150],
    ],
  );
});
