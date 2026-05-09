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

export const CATEGORY_LABELS_FI: Record<CategorySlug, string> = {
  'gauge-calculations': 'Neuletiheys ja laskurit',
  'yarn': 'Langat',
  'needles': 'Puikot',
  'techniques': 'Tekniikat',
  'app-tools': 'Sovellus ja työkalut',
};

export const CATEGORY_LABELS_DE: Record<CategorySlug, string> = {
  'gauge-calculations': 'Maschenprobe und Rechner',
  yarn: 'Garn',
  needles: 'Nadeln',
  techniques: 'Techniken',
  'app-tools': 'App und Tools',
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

export const CATEGORY_DESCRIPTIONS_FI: Record<CategorySlug, string> = {
  'gauge-calculations':
    'Neuletiheys, mallitilkut ja silmukkamäärät. Ne laskut, joista valmiin neuleen koko lopulta riippuu.',
  'yarn':
    'Langan valinta, korvaaminen, vyötteen lukeminen ja menekin arviointi silloin kun ohjeen numerot eivät yksin riitä.',
  'needles':
    'Puikkokoot, materiaalit ja puikkotyypit. Mitä kannattaa ostaa ja milloin mikäkin puikko tuntuu oikealta työssä.',
  'techniques':
    'Käytännön tekniikkaohjeita. Virheiden korjaamista, viimeistelyä ja ohjeiden lukemista luomisesta päättelyyn.',
  'app-tools':
    'Sovellukset, laskurit ja apuvälineet, joilla neuleprojektien seuraaminen ja suunnittelu pysyy helpompana.',
};

export const CATEGORY_DESCRIPTIONS_DE: Record<CategorySlug, string> = {
  'gauge-calculations':
    'Maschenprobe, Probestücke und Maschenzahlen. Die Rechnungen, die entscheiden, ob dein Strickstück am Ende die geplante Größe hat.',
  yarn:
    'Garn auswählen, ersetzen, Banderolen lesen und einschätzen, wie viel Garn ein Projekt wirklich braucht.',
  needles:
    'Nadelstärken, Materialien und Nadeltypen. Was sinnvoll ist und wann welche Nadel zum Projekt passt.',
  techniques:
    'Praktische Technik-Anleitungen. Fehler beheben, sauber fertigstellen und Strickanleitungen von Anschlag bis Abketten lesen.',
  'app-tools':
    'Apps, Rechner und Hilfsmittel, mit denen sich Strickprojekte leichter planen, verfolgen und organisieren lassen.',
};

export function getCategoryLabel(slug: CategorySlug, lang: 'en' | 'fi' | 'de' = 'en') {
  if (lang === 'fi') return CATEGORY_LABELS_FI[slug];
  if (lang === 'de') return CATEGORY_LABELS_DE[slug];
  return CATEGORY_LABELS[slug];
}

export function getCategoryDescription(slug: CategorySlug, lang: 'en' | 'fi' | 'de' = 'en') {
  if (lang === 'fi') return CATEGORY_DESCRIPTIONS_FI[slug];
  if (lang === 'de') return CATEGORY_DESCRIPTIONS_DE[slug];
  return CATEGORY_DESCRIPTIONS[slug];
}
