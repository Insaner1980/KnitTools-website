// Source quantities, not a fitted consumption model. See yarn-estimator-data.md.
export interface YarnReference {
  id: string;
  project: string;
  family:
    | "novice"
    | "cowl"
    | "meadow"
    | "blanket"
    | "flax"
    | "harvest"
    | "eva"
    | "weekend"
    | "bracken"
    | "barley"
    | "maize"
    | "rye"
    | "washcloth"
    | "slippers"
    | "gloves"
    | "poncho"
    | "seedBlanket"
    | "lapBlanket"
    | "headband";
  name: string;
  size: string;
  dimensionsCm: number[];
  dimensionLabel?:
    | "sweaterDimensions"
    | "underarmDimensions"
    | "backDimensions"
    | "headDimensions"
    | "handDimensions"
    | "footDimensions"
    | "palmDimensions"
    | "cowlDimensions";
  bodyCm?: [number, number];
  fit?: "relaxedFit" | "evaFit" | "weekendFit" | "brackenFit" | "slipperFit";
  rounds?: boolean;
  gauge: [number, number | null, number];
  yarn: string;
  quantity: number;
  quantityMax?: number;
  unit: "m" | "yd";
  basis: "supply" | "requirement" | "pattern" | "combinedSupply";
  materials: string;
  source: string;
}

export const yarnReferences: YarnReference[] = [
  ...["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"].map(
    (size, index): YarnReference => ({
      id: `novice-${size}`,
      project: "sweater",
      family: "novice",
      name: "PetiteKnit — Novice Sweater",
      size,
      dimensionLabel: "sweaterDimensions",
      dimensionsCm: [
        [91, 98, 103, 109, 116, 128, 138, 149, 161][index],
        [54, 55, 57, 60, 62, 64, 65, 66, 68][index],
      ],
      gauge: [16, 21, 10],
      yarn: "Sandnes Garn Kos — 150 m / 50 g",
      quantity: [250, 300, 350, 350, 400, 400, 450, 500, 550][index] * 3,
      unit: "m",
      basis: "supply",
      materials: `${[250, 300, 350, 350, 400, 400, 450, 500, 550][index]} g`,
      source: "https://www.petiteknit.com/en/products/novice-sweater",
    }),
  ),
  ...[0, 1].map((index): YarnReference => ({
    id: `cowl-${index}`,
    project: "cowl",
    family: "cowl",
    name: "Purl Soho / Hiromi Glover — Garter Ridge Cowl",
    size: ["22¼ × 10¼ in", "58 × 10¼ in"][index],
    dimensionsCm: [[56.515, 147.32][index], 26.035],
    gauge: [18, 37, 10.16],
    yarn: "Purl Soho Knitting Yarn DK — 219 yd / 100 g",
    quantity: [230, 605][index],
    unit: "yd",
    basis: "requirement",
    materials: ["A: 120 yd; B: 110 yd", "A: 315 yd; B: 290 yd"][index],
    source: "https://www.purlsoho.com/create/2023/09/27/garter-ridge-cowl/",
  })),
  ...[0, 1].map((index): YarnReference => ({
    id: `meadow-${index}`,
    project: ["scarf", "shawl"][index],
    family: "meadow",
    name: "Purl Soho / Hiromi Glover — Meadow Breeze Scarf + Shawl",
    size: ["5½ × 59¼ in", "27 × 27¼ in"][index],
    dimensionsCm: [[13.97, 68.58][index], [150.495, 69.215][index]],
    gauge: [30, 39, 10.16],
    yarn: "Purl Soho Oleander — 205 yd / 50 g",
    quantity: [385, 910][index],
    unit: "yd",
    basis: "requirement",
    materials: ["385 yd", "910 yd"][index],
    source:
      "https://www.purlsoho.com/create/2024/06/22/meadow-breeze-scarf-shawl/",
  })),
  ...[0, 1].map((index): YarnReference => ({
    id: `blanket-${index}`,
    project: ["baby-blanket", "throw-blanket"][index],
    family: "blanket",
    name: "Purl Soho / Hiromi Glover — Piece Of Cake Blanket",
    size: ["30 × 44 in", "40 × 58 in"][index],
    dimensionsCm: [[76.2, 101.6][index], [111.76, 147.32][index]],
    gauge: [9, 18, 10.16],
    yarn: "Purl Soho Fiddlehead — 65 yd / 100 g",
    quantity: [540, 940][index],
    unit: "yd",
    basis: "requirement",
    materials: [
      "A: 120; B: 60; C: 40; D: 80; E: 60; F: 100; G: 80 yd",
      "A: 250; B: 100; C: 65; D: 130; E: 100; F: 165; G: 130 yd",
    ][index],
    source: "https://www.purlsoho.com/create/2023/03/26/piece-of-cake-blanket/",
  })),
];

// Current designer PDFs/pages, accessed 2026-10-19. These are source rows,
// never interpolated size steps. Inch dimensions use the exact 2.54 conversion.
const tckSizes = [
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
];
const adultSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
const bodyBust: [number, number][] = [
  [80, 85],
  [85, 90],
  [90, 95],
  [95, 100],
  [100, 110],
  [110, 120],
  [120, 130],
  [130, 140],
  [140, 150],
];

yarnReferences.push(
  ...tckSizes.map((size, i): YarnReference => ({
    id: `flax-${i}`,
    project: i < 2 ? "baby-sweater" : i < 7 ? "child-sweater" : "sweater",
    family: "flax",
    name: "Tin Can Knits — Flax (Worsted / Aran)",
    size,
    dimensionsCm: [
      [
        18, 20.5, 22, 24, 26, 28.5, 30, 32, 34, 36.5, 38, 40, 42, 46, 50, 55.5,
        60.5, 65, 70,
      ][i] * 2.54,
      [
        6, 6.5, 7, 8, 10, 13, 15, 15, 15, 16, 16, 17, 18, 18.5, 19, 20, 20, 20,
        20,
      ][i] * 2.54,
    ],
    dimensionLabel: "underarmDimensions",
    fit: "relaxedFit",
    rounds: true,
    gauge: [18, 24, 10.16],
    yarn: "Worsted / Aran — De Rerum Natura Gilliatt; SweetGeorgia Superwash Worsted",
    quantity: [
      240, 280, 340, 420, 540, 660, 800, 920, 980, 1080, 1160, 1260, 1380, 1520,
      1700, 1880, 2080, 2200, 2340,
    ][i],
    unit: "yd",
    basis: "pattern",
    materials: `${[240, 280, 340, 420, 540, 660, 800, 920, 980, 1080, 1160, 1260, 1380, 1520, 1700, 1880, 2080, 2200, 2340][i]} yd`,
    source: "https://tincanknits.com/pattern/flax-worsted",
  })),
  ...tckSizes.map((size, i): YarnReference => ({
    id: `harvest-${i}`,
    project: i < 2 ? "baby-cardigan" : i < 7 ? "child-cardigan" : "cardigan",
    family: "harvest",
    name: "Tin Can Knits — Harvest",
    size,
    dimensionsCm: [
      [
        18.5, 20.5, 22, 24, 25.5, 28.5, 30.5, 31.5, 33.5, 37, 38, 40, 42, 46.5,
        49.5, 55, 60, 65, 70.5,
      ][i] * 2.54,
      [6, 7, 8, 9, 11, 14, 16, 18, 19, 19, 20, 20, 21, 21, 21, 21, 21, 21, 21][
        i
      ] * 2.54,
    ],
    dimensionLabel: "underarmDimensions",
    fit: "relaxedFit",
    gauge: [18, 24, 10.16],
    yarn: "Worsted / Aran — Madelinetosh Vintage",
    quantity: [
      250, 350, 450, 500, 600, 700, 850, 1000, 1100, 1200, 1300, 1400, 1500,
      1600, 1700, 1800, 1900, 2100, 2300,
    ][i],
    unit: "yd",
    basis: "pattern",
    materials: `${[250, 350, 450, 500, 600, 700, 850, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2100, 2300][i]} yd`,
    source: "https://tincanknits.com/pattern/harvest",
  })),
  ...["XXS", ...adultSizes].map((size, i): YarnReference => ({
    id: `eva-${size}`,
    project: "cardigan",
    family: "eva",
    name: "PetiteKnit — Eva Cardigan",
    size,
    dimensionsCm: [
      [106, 112, 116, 120, 126, 132, 134, 140, 150, 156][i],
      [53, 55, 59, 61, 63, 64, 67, 68, 71, 72][i],
    ],
    dimensionLabel: "sweaterDimensions",
    bodyCm: i === 0 ? [75, 80] : bodyBust[i - 1],
    fit: "evaFit",
    gauge: [20, 30, 10],
    yarn: "Sandnes Garn Peer Gynt — 91 m / 50 g",
    quantity: ([550, 600, 600, 650, 650, 700, 750, 800, 850, 900][i] * 91) / 50,
    ...(i === 0 ? { quantityMax: 1092 } : {}),
    unit: "m",
    basis: "supply",
    materials: `${["550–600", 600, 600, 650, 650, 700, 750, 800, 850, 900][i]} g`,
    source: "https://www.petiteknit.com/en/products/eva-cardigan",
  })),
  ...adultSizes.map((size, i): YarnReference => ({
    id: `weekend-${size}`,
    project: "vest",
    family: "weekend",
    name: "PetiteKnit — Weekend Slipover",
    size,
    dimensionsCm: [
      [107, 112, 117, 123, 131, 141, 151, 160, 171][i],
      [58, 59, 60, 61, 62, 63, 64, 65, 66][i],
    ],
    dimensionLabel: "sweaterDimensions",
    bodyCm: bodyBust[i],
    fit: "weekendFit",
    gauge: [15, 20, 10],
    yarn: "Hjelholt Håndværksgarn — 200 m / 100 g; Isager Silk Mohair — 212 m / 25 g",
    quantity:
      [800, 800, 800, 800, 800, 800, 1000, 1000, 1000][i] +
      [636, 636, 636, 636, 848, 848, 1060, 1060, 1060][i],
    unit: "m",
    basis: "combinedSupply",
    materials: `Håndværksgarn: ${[400, 400, 400, 400, 400, 400, 500, 500, 500][i]} g = ${[800, 800, 800, 800, 800, 800, 1000, 1000, 1000][i]} m; Silk Mohair: ${[75, 75, 75, 75, 100, 100, 125, 125, 125][i]} g = ${[636, 636, 636, 636, 848, 848, 1060, 1060, 1060][i]} m`,
    source: "https://www.petiteknit.com/en/products/weekend-slipover",
  })),
  ...["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"].map(
    (size, i): YarnReference => ({
      id: `bracken-${size}`,
      project: "vest",
      family: "bracken",
      name: "Tin Can Knits — Bracken",
      size,
      dimensionsCm: [
        [27, 30.5, 33.5, 37.5, 40.5, 45.5, 49.5, 53.5, 57.5, 61.5][i] * 2.54,
        [17, 17, 19, 20.5, 21.5, 22, 23.5, 24.5, 26, 27][i] * 2.54,
      ],
      dimensionLabel: "backDimensions",
      fit: "brackenFit",
      gauge: [30, 28, 10.16],
      rounds: true,
      yarn: "Worsted — De Rerum Natura Gilliatt",
      quantity: [450, 500, 650, 750, 900, 1050, 1150, 1200, 1400, 1500][i],
      unit: "yd",
      basis: "pattern",
      materials: `${[450, 500, 650, 750, 900, 1050, 1150, 1200, 1400, 1500][i]} yd`,
      source: "https://tincanknits.com/pattern/bracken",
    }),
  ),
  ...["Newborn", "Baby", "Toddler", "Child", "Adult S", "M", "L"].map(
    (size, i): YarnReference => ({
      id: `barley-${i}`,
      project: i < 2 ? "baby-hat" : i < 4 ? "child-hat" : "adult-hat",
      family: "barley",
      name: "Tin Can Knits — Barley (Worsted / Aran)",
      size,
      dimensionsCm: [[14, 16, 17.5, 19, 21, 22.5, 23.5][i] * 2.54],
      dimensionLabel: "headDimensions",
      gauge: [18, 24, 10.16],
      rounds: true,
      yarn: "Worsted / Aran — Brooklyn Tweed Shelter",
      quantity: [60, 70, 80, 90, 110, 150, 170][i],
      unit: "yd",
      basis: "pattern",
      materials: `${[60, 70, 80, 90, 110, 150, 170][i]} yd`,
      source: "https://tincanknits.com/pattern/barley-worsted",
    }),
  ),
  ...[false, true].flatMap((fingerless) =>
    ["Toddler", "Child", "Adult S", "M", "L"].map((size, i): YarnReference => ({
      id: `maize-${fingerless ? "mitts" : "mittens"}-${i}`,
      project: fingerless
        ? "fingerless-mitts"
        : i < 2
          ? "child-mittens"
          : "adult-mittens",
      family: "maize",
      name: "Tin Can Knits — Maize",
      size,
      dimensionsCm: [
        [6, 6.5, 7, 7.75, 8.5][i] * 2.54,
        (fingerless
          ? [4.5, 4.5, 5.75, 6.5, 7.75]
          : [7, 7.5, 9.25, 9.75, 11.25])[i] * 2.54,
      ],
      dimensionLabel: "handDimensions",
      gauge: [20, 28, 10.16],
      rounds: true,
      yarn: "Worsted / Aran — SweetGeorgia Superwash Worsted",
      quantity: (fingerless ? [50, 60, 80, 100, 140] : [70, 80, 120, 150, 200])[
        i
      ],
      unit: "yd",
      basis: "pattern",
      materials: `${(fingerless ? [50, 60, 80, 100, 140] : [70, 80, 120, 150, 200])[i]} yd`,
      source: "https://tincanknits.com/pattern/maize",
    })),
  ),
  ...["Newborn", "Baby", "Toddler", "Child", "Adult S", "M", "L"].map(
    (size, i): YarnReference => ({
      id: `rye-${i}`,
      project: i < 4 ? "child-socks" : "adult-socks",
      family: "rye",
      name: "Tin Can Knits — Rye (Worsted / Aran)",
      size,
      dimensionsCm: [
        [4.25, 5, 5.75, 6.5, 7.25, 8, 8.75][i] * 2.54,
        [3.25, 4, 5.25, 7.25, 8.25, 9.75, 11.5][i] * 2.54,
      ],
      dimensionLabel: "footDimensions",
      gauge: [22, 30, 10.16],
      rounds: true,
      yarn: "Worsted / Aran — Plucky Sweater",
      quantity: [70, 90, 120, 180, 220, 280, 340][i],
      unit: "yd",
      basis: "pattern",
      materials: `${[70, 90, 120, 180, 220, 280, 340][i]} yd`,
      source: "https://tincanknits.com/pattern/rye-worsted",
    }),
  ),
  {
    id: "washcloth-0",
    project: "dishcloth",
    family: "washcloth",
    name: "Purl Soho / Keith Foster — Knit + Purl Washcloth",
    size: "6½ × 6½ in",
    dimensionsCm: [16.51, 16.51],
    gauge: [20, 35, 10.16],
    yarn: "Purl Soho Cotton Chirp DK Minis — 58 yd / 25 g",
    quantity: 55,
    unit: "yd",
    basis: "requirement",
    materials: "MC: 40 yd; CC: 15 yd",
    source: "https://www.purlsoho.com/create/2024/07/22/knit-purl-washcloth/",
  },
  ...[
    "Baby",
    "Toddler Small",
    "Toddler Large",
    "Little Kid",
    "Big Kid",
    "Adult Small",
    "Adult Medium",
    "Adult Large",
    "Adult Extra Large",
  ].map((size, i): YarnReference => ({
    id: `slippers-${i}`,
    project: i === 0 ? "baby-booties" : "slippers",
    family: "slippers",
    name: "Purl Soho / Hiromi Glover — Knit + Fold Slippers",
    size,
    dimensionsCm: [
      [2, 2.25, 2.75, 3.25, 3.75, 4.25, 4.75, 5.25, 5.75][i] * 2.54,
      [3.75, 4.75, 5.75, 6.5, 7.5, 8.5, 9.5, 10.25, 11.25][i] * 2.54,
    ],
    fit: "slipperFit",
    gauge: [24, 48, 10.16],
    yarn: "Purl Soho Knitting Yarn DK — 219 yd / 100 g",
    quantity: [85, 115, 140, 175, 210, 260, 305, 365, 419][i],
    unit: "yd",
    basis: "requirement",
    materials: `A: ${[25, 40, 55, 70, 90, 115, 140, 170, 200][i]} yd; B: ${[60, 75, 85, 105, 120, 145, 165, 195, 219][i]} yd`,
    source: "https://www.purlsoho.com/create/2025/02/01/knit-fold-slippers/",
  })),
);

// Additional retained project categories. Null means no row gauge is published.
yarnReferences.push(
  {
    id: "headband-0",
    project: "headband",
    family: "headband",
    name: "Shaina Bilow — Link Headband",
    size: "19 × 4 in",
    dimensionsCm: [48.26, 10.16],
    dimensionLabel: "cowlDimensions",
    gauge: [21, 18, 10.16],
    yarn: "Chunky — CYCA #5",
    quantity: 100,
    unit: "yd",
    basis: "pattern",
    materials: "100 yd",
    source:
      "https://www.shainabilow.com/_files/ugd/1a5a98_f901f21ffb4a4e7595858b7ded116a79.pdf",
  },
  ...[false, true].flatMap((fingerless) =>
    ["Kid/Junior", "Adult Small", "Adult Medium", "Adult Large"].flatMap(
      (size, i): YarnReference[] =>
        !fingerless && i === 0
          ? []
          : [
              {
                id: `gloves-${fingerless ? "fingerless" : "full"}-${i}`,
                project: fingerless ? "fingerless-mitts" : "adult-gloves",
                family: "gloves",
                name: "Purl Soho — Very Classic Gloves",
                size,
                dimensionsCm: [
                  [6, 6.75, 7.25, 8.25][i] * 2.54,
                  (fingerless
                    ? [8.5, 9.5, 10.5, 11.25]
                    : [10.5, 11.5, 12.5, 13.5])[i] * 2.54,
                ],
                dimensionLabel: "palmDimensions",
                gauge: [34, 40, 10.16],
                rounds: true,
                yarn: "Purl Soho Cygnet — 164 yd / 50 g",
                quantity: (fingerless
                  ? [160, 215, 250, 305]
                  : [210, 270, 310, 380])[i],
                unit: "yd",
                basis: "requirement",
                materials: `${(fingerless ? [160, 215, 250, 305] : [210, 270, 310, 380])[i]} yd`,
                source:
                  "https://www.purlsoho.com/create/2023/09/25/very-classic-gloves/",
              },
            ],
    ),
  ),
  ...["46", "54", "64"].map((size, i): YarnReference => ({
    id: `poncho-${size}`,
    project: "poncho",
    family: "poncho",
    name: "Purl Soho / Hiromi Glover — Poetic Poncho",
    size,
    dimensionsCm: [[17, 20, 23][i] * 2.54, [46, 54, 64][i] * 2.54],
    bodyCm: [
      [76.2, 101.6],
      [101.6, 127],
      [127, 152.4],
    ][i] as [number, number],
    gauge: [20, 29, 10.16],
    yarn: "Purl Soho Vinter Wool — 120 yd / 50 g",
    quantity: [680, 935, 1275][i],
    unit: "yd",
    basis: "requirement",
    materials: `${[680, 935, 1275][i]} yd`,
    source: "https://www.purlsoho.com/create/2025/02/21/poetic-poncho/",
  })),
  ...["Baby", "Crib", "Throw", "Twin", "Queen"].map(
    (size, i): YarnReference => ({
      id: `seed-blanket-${size}`,
      project: i < 2 ? "baby-blanket" : i === 2 ? "throw-blanket" : "afghan",
      family: "seedBlanket",
      name: "Purl Soho — Double Seed Stitch Blanket",
      size,
      dimensionsCm: [
        [28, 45, 60, 66, 90][i] * 2.54,
        [30, 60, 60, 90, 95][i] * 2.54,
      ],
      gauge: [11, null, 10.16],
      yarn: "Purl Soho Super Soft Merino — 87 yd / 100 g",
      quantity: [522, 1479, 1914, 3132, 4524][i],
      unit: "yd",
      basis: "requirement",
      materials: `${[522, 1479, 1914, 3132, 4524][i]} yd`,
      source:
        "https://www.purlsoho.com/create/2013/01/27/double-seed-stitch-blanket/",
    }),
  ),
  {
    id: "lap-blanket-0",
    project: "lap-blanket",
    family: "lapBlanket",
    name: "Purl Soho / Whitney Van Nes — Pixie Dust Lap Blanket",
    size: "26 × 56 in",
    dimensionsCm: [66.04, 142.24],
    gauge: [1, null, 2.54],
    yarn: "Knit Collage Pixie Dust — 40 yd / 145 g",
    quantity: 280,
    unit: "yd",
    basis: "requirement",
    materials: "280 yd",
    source:
      "https://www.purlsoho.com/create/2012/10/18/pixie-dust-lap-blanket-in-cool-white/",
  },
);

export function referenceQuantity(project: string, id: string, unit: string) {
  const reference = yarnReferences.find(
    (item) => item.project === project && item.id === id,
  );
  if (!reference || (unit !== "m" && unit !== "yd")) return null;
  // Convert from the original quantity; never convert a rounded display value.
  const quantity =
    reference.unit === unit
      ? reference.quantity
      : unit === "m"
        ? reference.quantity * 0.9144
        : reference.quantity / 0.9144;
  const quantityMax =
    reference.quantityMax === undefined
      ? undefined
      : reference.unit === unit
        ? reference.quantityMax
        : unit === "m"
          ? reference.quantityMax * 0.9144
          : reference.quantityMax / 0.9144;
  return { reference, quantity, quantityMax };
}
