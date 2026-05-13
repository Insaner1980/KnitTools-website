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

export const CATEGORY_LABELS_SV: Record<CategorySlug, string> = {
  'gauge-calculations': 'Stickfasthet och beräkningar',
  yarn: 'Garn',
  needles: 'Stickor',
  techniques: 'Tekniker',
  'app-tools': 'App och verktyg',
};

export const CATEGORY_LABELS_NO: Record<CategorySlug, string> = {
  'gauge-calculations': 'Strikkefasthet og beregninger',
  yarn: 'Garn',
  needles: 'Pinner',
  techniques: 'Teknikker',
  'app-tools': 'App og verktøy',
};

export const CATEGORY_LABELS_FR: Record<CategorySlug, string> = {
  'gauge-calculations': 'Échantillon et calculs',
  yarn: 'Fils et laine',
  needles: 'Aiguilles',
  techniques: 'Techniques',
  'app-tools': 'Application et outils',
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

export const CATEGORY_DESCRIPTIONS_SV: Record<CategorySlug, string> = {
  'gauge-calculations':
    'Stickfasthet, provlappar och maskantal. Beräkningarna som avgör om det färdiga arbetet får den storlek du tänkte dig.',
  yarn:
    'Att välja garn, byta garn, läsa banderoller och räkna ut hur mycket garn ett projekt faktiskt behöver.',
  needles:
    'Stickstorlekar, material och typer av stickor. Vad som är värt att köpa och när varje sort passar bäst.',
  techniques:
    'Praktiska teknikguider steg för steg. Fixa misstag, avsluta snyggt och ta dig genom projekt från uppläggning till avmaskning.',
  'app-tools':
    'Appar, kalkylatorer och hjälpmedel som gör det lättare att följa, planera och hålla ordning på stickprojekt.',
};

export const CATEGORY_DESCRIPTIONS_NO: Record<CategorySlug, string> = {
  'gauge-calculations':
    'Strikkefasthet, prøvelapper og maskeantall. Beregningene som avgjør om det ferdige arbeidet får størrelsen du hadde tenkt.',
  yarn:
    'Valg av garn, garnbytte, garnetiketter og beregning av hvor mye garn et prosjekt faktisk trenger.',
  needles:
    'Pinnestørrelser, materialer og typer strikkepinner. Hva som er verdt å kjøpe, og når hver type passer best.',
  techniques:
    'Praktiske teknikkguider steg for steg. Rette opp feil, avslutte pent og lese oppskrifter fra opplegg til avfelling.',
  'app-tools':
    'Apper, kalkulatorer og hjelpemidler som gjør det enklere å planlegge, følge og holde orden på strikkeprosjekter.',
};

export const CATEGORY_DESCRIPTIONS_FR: Record<CategorySlug, string> = {
  'gauge-calculations':
    "Échantillon, mailles et calculs. Les chiffres qui décident si ton ouvrage fini aura la taille prévue.",
  yarn:
    "Choisir un fil, le remplacer, lire une étiquette et estimer la quantité nécessaire pour un projet.",
  needles:
    "Tailles, matières et types d'aiguilles à tricoter. Quoi acheter et quand chaque aiguille est utile.",
  techniques:
    "Guides pratiques pas à pas. Corriger les erreurs, finir proprement et suivre un modèle du montage au rabattage.",
  'app-tools':
    "Applications, calculateurs et outils physiques pour planifier, suivre et organiser tes projets tricot.",
};

export function getCategoryLabel(slug: CategorySlug, lang: 'en' | 'fi' | 'de' | 'sv' | 'no' | 'fr' = 'en') {
  if (lang === 'fi') return CATEGORY_LABELS_FI[slug];
  if (lang === 'de') return CATEGORY_LABELS_DE[slug];
  if (lang === 'sv') return CATEGORY_LABELS_SV[slug];
  if (lang === 'no') return CATEGORY_LABELS_NO[slug];
  if (lang === 'fr') return CATEGORY_LABELS_FR[slug];
  return CATEGORY_LABELS[slug];
}

export function getCategoryDescription(slug: CategorySlug, lang: 'en' | 'fi' | 'de' | 'sv' | 'no' | 'fr' = 'en') {
  if (lang === 'fi') return CATEGORY_DESCRIPTIONS_FI[slug];
  if (lang === 'de') return CATEGORY_DESCRIPTIONS_DE[slug];
  if (lang === 'sv') return CATEGORY_DESCRIPTIONS_SV[slug];
  if (lang === 'no') return CATEGORY_DESCRIPTIONS_NO[slug];
  if (lang === 'fr') return CATEGORY_DESCRIPTIONS_FR[slug];
  return CATEGORY_DESCRIPTIONS[slug];
}
