export type CategorySlug =
  | 'gauge-calculations'
  | 'yarn'
  | 'needles'
  | 'techniques'
  | 'app-tools';

export const CATEGORY_ORDER: CategorySlug[] = [
  'gauge-calculations',
  'yarn',
  'needles',
  'techniques',
  'app-tools',
];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  'gauge-calculations': 'Gauge & Calculations',
  'yarn': 'Yarn',
  'needles': 'Needles',
  'techniques': 'Techniques',
  'app-tools': 'App & Tools',
};

export const CATEGORY_COLORS: Record<CategorySlug, string> = {
  'gauge-calculations': 'card-terracotta',
  'yarn': 'card-rust',
  'needles': 'card-teal',
  'techniques': 'card-sand',
  'app-tools': 'card-brown',
};

export const CATEGORY_DESCRIPTIONS: Record<CategorySlug, string> = {
  'gauge-calculations':
    'Gauge math, swatches, and stitch counts. The calculations that decide whether your finished piece comes out the size you wanted.',
  'yarn':
    'Choosing yarn, substituting it, reading labels, and figuring out how much a project will actually need.',
  'needles':
    'Materials, sizes, and types of knitting needles. What to buy and when each one is the right tool.',
  'techniques':
    'Step-by-step technique guides. Fixing mistakes, finishing details, and project walk-throughs from cast on to bind off.',
  'app-tools':
    'Apps, calculators, and physical tools that make tracking, planning, and organizing knitting projects easier.',
};
