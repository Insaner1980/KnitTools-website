export type CategorySlug =
  "gauge-calculations" | "yarn" | "needles" | "techniques" | "app-tools";

export const CATEGORY_ORDER: CategorySlug[] = [
  "gauge-calculations",
  "yarn",
  "needles",
  "techniques",
  "app-tools",
];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  "gauge-calculations": "Gauge & Calculations",
  yarn: "Yarn",
  needles: "Needles",
  techniques: "Techniques",
  "app-tools": "App & Tools",
};

export const CATEGORY_LABELS_FI: Record<CategorySlug, string> = {
  "gauge-calculations": "Neuletiheys ja laskurit",
  yarn: "Langat",
  needles: "Puikot",
  techniques: "Tekniikat",
  "app-tools": "Sovellus ja työkalut",
};

export const CATEGORY_LABELS_DE: Record<CategorySlug, string> = {
  "gauge-calculations": "Maschenprobe und Rechner",
  yarn: "Garn",
  needles: "Nadeln",
  techniques: "Techniken",
  "app-tools": "App und Tools",
};

export const CATEGORY_LABELS_SV: Record<CategorySlug, string> = {
  "gauge-calculations": "Stickfasthet och beräkningar",
  yarn: "Garn",
  needles: "Stickor",
  techniques: "Tekniker",
  "app-tools": "App och verktyg",
};

export const CATEGORY_LABELS_NO: Record<CategorySlug, string> = {
  "gauge-calculations": "Strikkefasthet og beregninger",
  yarn: "Garn",
  needles: "Pinner",
  techniques: "Teknikker",
  "app-tools": "App og verktøy",
};

export const CATEGORY_LABELS_FR: Record<CategorySlug, string> = {
  "gauge-calculations": "Échantillon et calculs",
  yarn: "Fils et laine",
  needles: "Aiguilles",
  techniques: "Techniques",
  "app-tools": "Application et outils",
};

export const CATEGORY_LABELS_NL: Record<CategorySlug, string> = {
  "gauge-calculations": "Stekenverhouding en berekeningen",
  yarn: "Garen",
  needles: "Breinaalden",
  techniques: "Technieken",
  "app-tools": "App en tools",
};

export const CATEGORY_LABELS_DA: Record<CategorySlug, string> = {
  "gauge-calculations": "Strikkefasthed og beregninger",
  yarn: "Garn",
  needles: "Strikkepinde",
  techniques: "Teknikker",
  "app-tools": "App og værktøjer",
};

export const CATEGORY_COLORS: Record<CategorySlug, string> = {
  "gauge-calculations": "card-terracotta",
  yarn: "card-rust",
  needles: "card-teal",
  techniques: "card-sand",
  "app-tools": "card-brown",
};

export const CATEGORY_DESCRIPTIONS: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Guides to measuring stitch and row gauge, knitting swatches, calculating cast-on counts, and spacing increases and decreases, with worked examples.",
  yarn: "Choosing yarn, substituting it, reading labels, and estimating how much a project may need.",
  needles:
    "Materials, sizes, and types of knitting needles. What to buy and when each one is the right tool.",
  techniques:
    "Step-by-step technique guides. Fixing mistakes, finishing details, and project walk-throughs from cast on to bind off.",
  "app-tools":
    "Apps, calculators, and physical tools that make tracking, planning, and organizing knitting projects easier.",
};

export const CATEGORY_DESCRIPTIONS_FI: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Artikkelit neuletiheydestä, mallitilkuista ja silmukkamäärien laskemisesta. Opettele mittaamaan tiheys ja jakamaan lisäykset ja kavennukset.",
  yarn: "Langan valinta, korvaaminen, vyötteen lukeminen ja menekin arviointi silloin kun ohjeen numerot eivät yksin riitä.",
  needles:
    "Puikkokoot, materiaalit ja puikkotyypit. Mitä kannattaa ostaa ja milloin mikäkin puikko tuntuu oikealta työssä.",
  techniques:
    "Käytännön tekniikkaohjeita. Virheiden korjaamista, viimeistelyä ja ohjeiden lukemista luomisesta päättelyyn.",
  "app-tools":
    "Sovellukset, laskurit ja apuvälineet, joilla neuleprojekteja on helpompi seurata ja suunnitella.",
};

export const CATEGORY_DESCRIPTIONS_DE: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Anleitungen zum Stricken und Messen der Maschenprobe, Berechnen der Anschlagszahl und Verteilen von Zu- und Abnahmen, mit Rechenbeispielen.",
  yarn: "Garn auswählen, ersetzen, Banderolen lesen und einschätzen, wie viel Garn ein Projekt wirklich braucht.",
  needles:
    "Nadelstärken, Materialien und Nadeltypen. Was sinnvoll ist und wann welche Nadel zum Projekt passt.",
  techniques:
    "Praktische Technik-Anleitungen. Fehler beheben, sauber fertigstellen und Strickanleitungen von Anschlag bis Abketten lesen.",
  "app-tools":
    "Apps, Rechner und Hilfsmittel, mit denen sich Strickprojekte leichter planen, verfolgen und organisieren lassen.",
};

export const CATEGORY_DESCRIPTIONS_SV: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Guider till stickfasthet, provlappar och maskantal. Lär dig mäta, beräkna uppläggningen och fördela ökningar och minskningar med räkneexempel.",
  yarn: "Att välja garn, byta garn, läsa banderoller och uppskatta garnåtgången till ett projekt.",
  needles:
    "Stickstorlekar, material och typer av stickor. Vad som är värt att köpa och när varje sort passar bäst.",
  techniques:
    "Praktiska teknikguider steg för steg. Fixa misstag, avsluta snyggt och ta dig genom projekt från uppläggning till avmaskning.",
  "app-tools":
    "Appar, kalkylatorer och hjälpmedel som gör det lättare att följa, planera och hålla ordning på stickprojekt.",
};

export const CATEGORY_DESCRIPTIONS_NO: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Guider om strikkefasthet, prøvelapper og maskeantall. Lær å måle, beregne oppleggstall og fordele økninger og fellinger med regneeksempler.",
  yarn: "Valg av garn, garnbytte, garnetiketter og anslag på garnmengden til et prosjekt.",
  needles:
    "Pinnestørrelser, materialer og typer strikkepinner. Hva som er verdt å kjøpe, og når hver type passer best.",
  techniques:
    "Praktiske teknikkguider steg for steg. Rette opp feil, avslutte pent og lese oppskrifter fra opplegg til avfelling.",
  "app-tools":
    "Apper, kalkulatorer og hjelpemidler som gjør det enklere å planlegge, følge og holde orden på strikkeprosjekter.",
};

export const CATEGORY_DESCRIPTIONS_FR: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Guides pour tricoter et mesurer un échantillon, calculer les mailles à monter et répartir augmentations et diminutions, avec des exemples de calcul.",
  yarn: "Choisir un fil, le remplacer, lire une étiquette et estimer la quantité nécessaire pour un projet.",
  needles:
    "Tailles, matières et types d'aiguilles à tricoter. Quoi acheter et quand chaque aiguille est utile.",
  techniques:
    "Guides pratiques pas à pas. Corriger les erreurs, finir proprement et suivre un modèle du montage au rabattage.",
  "app-tools":
    "Applications, calculateurs et outils physiques pour planifier, suivre et organiser tes projets tricot.",
};

export const CATEGORY_DESCRIPTIONS_NL: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Artikelen over stekenverhouding, proeflapjes en stekenaantallen. Leer meten, opzetsteken berekenen en meerderingen en minderingen verdelen met rekenvoorbeelden.",
  yarn: "Garen kiezen, vervangen, labels lezen en garenverbruik inschatten voor truien, dekens en andere breiprojecten.",
  needles:
    "Naalddiktes, materialen en soorten breinaalden. Kies de juiste maat en het juiste type voor sokken, truien, mutsen en meer.",
  techniques:
    "Praktische techniekgidsen stap voor stap. Fouten herstellen, netjes afwerken en projecten volgen van opzetten tot afkanten.",
  "app-tools":
    "Apps, rekentools en hulpmiddelen waarmee je breiprojecten makkelijker plant, toeren bijhoudt en garen, tijd en voortgang organiseert.",
};

export const CATEGORY_DESCRIPTIONS_DA: Record<CategorySlug, string> = {
  "gauge-calculations":
    "Artikler om strikkefasthed, strikkeprøver og maskeantal. Lær at måle, beregne opslagsmasker og fordele udtagninger og indtagninger med regneeksempler.",
  yarn: "Valg af garn, garnalternativer, banderoler og vurdering af garnforbruget, før du køber garn.",
  needles:
    "Pindestørrelser, materialer og typer strikkepinde. Hvad der er værd at købe, og hvornår hver type passer bedst til projektet.",
  techniques:
    "Praktiske teknikguides trin for trin. Ret fejl, afslut pænt og læs strikkeopskrifter fra opslag til aflukning undervejs.",
  "app-tools":
    "Apps, beregnere og hjælpemidler, der gør det lettere at planlægge, følge og holde styr på strikkeprojekter.",
};

export function getCategoryLabel(
  slug: CategorySlug,
  lang: "en" | "fi" | "de" | "sv" | "no" | "fr" | "nl" | "da" = "en",
) {
  if (lang === "fi") return CATEGORY_LABELS_FI[slug];
  if (lang === "de") return CATEGORY_LABELS_DE[slug];
  if (lang === "sv") return CATEGORY_LABELS_SV[slug];
  if (lang === "no") return CATEGORY_LABELS_NO[slug];
  if (lang === "fr") return CATEGORY_LABELS_FR[slug];
  if (lang === "nl") return CATEGORY_LABELS_NL[slug];
  if (lang === "da") return CATEGORY_LABELS_DA[slug];
  return CATEGORY_LABELS[slug];
}

export function getCategoryDescription(
  slug: CategorySlug,
  lang: "en" | "fi" | "de" | "sv" | "no" | "fr" | "nl" | "da" = "en",
) {
  if (lang === "fi") return CATEGORY_DESCRIPTIONS_FI[slug];
  if (lang === "de") return CATEGORY_DESCRIPTIONS_DE[slug];
  if (lang === "sv") return CATEGORY_DESCRIPTIONS_SV[slug];
  if (lang === "no") return CATEGORY_DESCRIPTIONS_NO[slug];
  if (lang === "fr") return CATEGORY_DESCRIPTIONS_FR[slug];
  if (lang === "nl") return CATEGORY_DESCRIPTIONS_NL[slug];
  if (lang === "da") return CATEGORY_DESCRIPTIONS_DA[slug];
  return CATEGORY_DESCRIPTIONS[slug];
}
