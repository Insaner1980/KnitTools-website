import type { CollectionEntry } from "astro:content";
import {
  CATEGORY_ORDER,
  getCategoryDescription,
  getCategoryLabel,
  type CategorySlug,
} from "../lib/categories";
import type { Lang } from "./config";
import { pathFor, routes } from "./routes";

export type ArticleEntry = CollectionEntry<"articles">;
export type ArticleAlternates = Partial<Record<Lang, string>>;

export interface ArticleCategorySection {
  slug: CategorySlug;
  label: string;
  description: string;
  articles: ArticleEntry[];
  remainingCount: number;
}

export type LocalizedArticleRouteProps =
  | {
      view: "index";
      sections: ArticleCategorySection[];
    }
  | {
      view: "category";
      category: CategorySlug;
      articles: ArticleEntry[];
    }
  | {
      view: "article";
      article: ArticleEntry;
      alternates?: ArticleAlternates;
    };

export const dutchArticleRoutes = {
  articlesIndex: routes.articlesIndex.nl,
  category: {
    "gauge-calculations": routes.category["gauge-calculations"].nl,
    yarn: routes.category.yarn.nl,
    needles: routes.category.needles.nl,
    techniques: routes.category.techniques.nl,
    "app-tools": routes.category["app-tools"].nl,
  } satisfies Record<CategorySlug, string>,
} as const;

export const danishArticleRoutes = {
  articlesIndex: routes.articlesIndex.da,
  category: {
    "gauge-calculations": routes.category["gauge-calculations"].da,
    yarn: routes.category.yarn.da,
    needles: routes.category.needles.da,
    techniques: routes.category.techniques.da,
    "app-tools": routes.category["app-tools"].da,
  } satisfies Record<CategorySlug, string>,
} as const;

export function getArticlesIndexPath(lang: Lang): string {
  if (lang === "da") return danishArticleRoutes.articlesIndex;
  return pathFor(routes.articlesIndex, lang);
}

export function getArticleCategoryLinks(lang: Lang) {
  return CATEGORY_ORDER.map((category) => ({
    label: getCategoryLabel(category, lang),
    href: routes.category[category][lang],
  }));
}

export const articleTranslations = {
  "at-the-same-time-knitting": {
    en: "/articles/at-the-same-time-knitting/",
    fi: "/fi/artikkelit/samaan-aikaan-neuleohjeessa/",
    de: "/de/artikel/gleichzeitig-in-strickanleitungen/",
    sv: "/sv/artiklar/samtidigt-i-stickmonster/",
    no: "/no/artikler/samtidig-i-strikkeoppskrifter/",
    fr: "/fr/articles/au-meme-temps-dans-un-modele-tricot/",
    nl: "/nl/artikelen/tegelijkertijd-in-breipatronen/",
    da: "/da/artikler/samtidig-i-strikkeopskrifter/",
  },
  "best-knitting-apps": {
    en: "/articles/best-knitting-apps/",
    fi: "/fi/artikkelit/parhaat-neulesovellukset/",
    de: "/de/artikel/die-besten-strick-apps-worauf-es-ankommt/",
    sv: "/sv/artiklar/basta-stickappar-vad-du-ska-titta-efter/",
    no: "/no/artikler/beste-strikkeapper-hva-du-bor-se-etter/",
    fr: "/fr/articles/meilleures-applications-tricot/",
    nl: "/nl/artikelen/beste-breiapps-waar-let-je-op/",
    da: "/da/artikler/bedste-strikkeapps/",
  },
  "best-yarn-for-beginners": {
    en: "/articles/best-yarn-for-beginners/",
    fi: "/fi/artikkelit/paras-lanka-aloittelijalle/",
    de: "/de/artikel/das-beste-garn-fuer-den-einstieg-ins-stricken/",
    sv: "/sv/artiklar/basta-garnet-for-nyborjare-praktisk-guide/",
    no: "/no/artikler/beste-garn-for-nybegynnere/",
    fr: "/fr/articles/meilleur-fil-pour-debuter-le-tricot/",
    nl: "/nl/artikelen/beste-garen-voor-beginners/",
    da: "/da/artikler/bedste-garn-til-begyndere/",
  },
  "circular-vs-straight-vs-dpn": {
    en: "/articles/circular-vs-straight-vs-dpn/",
    fi: "/fi/artikkelit/pyoropuikot-suorat-puikot-sukkapuikot/",
    de: "/de/artikel/rundstricknadel-gerade-nadeln-oder-nadelspiel/",
    sv: "/sv/artiklar/rundsticka-raka-stickor-strumpstickor/",
    no: "/no/artikler/rundpinne-rette-pinner-strompepinner/",
    fr: "/fr/articles/aiguilles-circulaires-droites-doubles-pointes/",
    nl: "/nl/artikelen/rondbreinaalden-rechte-naalden-sokkennaalden/",
    da: "/da/artikler/rundpinde-jumperpinde-stroempepinde/",
  },
  "digital-vs-physical-row-counters": {
    en: "/articles/digital-vs-physical-row-counters/",
    fi: "/fi/artikkelit/digitaalinen-vs-mekaaninen-kerroslaskuri/",
    de: "/de/artikel/digitaler-oder-mechanischer-reihenzaehler/",
    sv: "/sv/artiklar/digital-eller-mekanisk-varvraknare/",
    no: "/no/artikler/digital-eller-mekanisk-omgangsteller/",
    fr: "/fr/articles/compteur-rangs-numerique-ou-mecanique/",
    nl: "/nl/artikelen/digitale-of-mechanische-toerenteller/",
    da: "/da/artikler/digital-eller-fysisk-omgangstaeller/",
  },
  "essential-knitting-tools": {
    en: "/articles/essential-knitting-tools/",
    fi: "/fi/artikkelit/valttamattomat-neuletarvikkeet/",
    de: "/de/artikel/strickzubehoer-ausser-nadeln-und-garn/",
    sv: "/sv/artiklar/viktiga-stickverktyg-utover-stickor-och-garn/",
    no: "/no/artikler/viktig-strikketilbehor-utover-pinner-og-garn/",
    fr: "/fr/articles/accessoires-tricot-indispensables/",
    nl: "/nl/artikelen/essentiele-breihulpmiddelen/",
    da: "/da/artikler/vigtigt-strikketilbehoer/",
  },
  "fix-dropped-stitches": {
    en: "/articles/fix-dropped-stitches/",
    fi: "/fi/artikkelit/pudonneen-silmukan-korjaaminen/",
    de: "/de/artikel/fallengelassene-maschen-retten-ohne-aufzuribbeln/",
    sv: "/sv/artiklar/fixa-tappade-maskor-utan-att-repa-upp/",
    no: "/no/artikler/redde-mistede-masker-uten-a-rekke-opp/",
    fr: "/fr/articles/rattraper-maille-tombee/",
    nl: "/nl/artikelen/gevallen-steek-ophalen-zonder-uithalen/",
    da: "/da/artikler/saml-tabt-maske-op/",
  },
  "free-knitting-calculators": {
    en: "/articles/free-knitting-calculators/",
    fi: "/fi/artikkelit/ilmaiset-neulelaskurit/",
    de: "/de/artikel/kostenlose-strickrechner/",
    sv: "/sv/artiklar/gratis-stickkalkylatorer/",
    no: "/no/artikler/gratis-strikkekalkulatorer/",
    fr: "/fr/articles/calculateurs-tricot-gratuits/",
    nl: "/nl/artikelen/gratis-breirekentools/",
    da: "/da/artikler/gratis-strikkeberegnere/",
  },
  "what-is-gauge-in-knitting": {
    en: "/articles/what-is-gauge-in-knitting/",
    fi: "/fi/artikkelit/mita-neuletiheys-tarkoittaa/",
    de: "/de/artikel/was-sagt-die-maschenprobe-beim-stricken-aus/",
    sv: "/sv/artiklar/vad-ar-stickfasthet/",
    no: "/no/artikler/hva-er-strikkefasthet/",
    fr: "/fr/articles/comprendre-l-echantillon-au-tricot/",
    nl: "/nl/artikelen/wat-is-stekenverhouding-bij-breien/",
    da: "/da/artikler/hvad-er-strikkefasthed/",
  },
  "how-to-measure-knitting-gauge": {
    en: "/articles/how-to-measure-knitting-gauge/",
    fi: "/fi/artikkelit/neuletiheyden-mittaaminen/",
    de: "/de/artikel/maschenprobe-messen/",
    sv: "/sv/artiklar/sa-mater-du-stickfasthet/",
    no: "/no/artikler/male-strikkefasthet/",
    fr: "/fr/articles/mesurer-un-echantillon-tricot/",
    nl: "/nl/artikelen/stekenverhouding-meten/",
    da: "/da/artikler/maal-strikkefasthed/",
  },
  "gauge-doesnt-match": {
    en: "/articles/gauge-doesnt-match/",
    fi: "/fi/artikkelit/kun-neuletiheys-ei-tasmaa/",
    de: "/de/artikel/wenn-die-maschenprobe-nicht-zur-anleitung-passt/",
    sv: "/sv/artiklar/nar-stickfastheten-inte-stammer/",
    no: "/no/artikler/nar-strikkefastheten-ikke-stemmer/",
    fr: "/fr/articles/quand-echantillon-ne-correspond-pas/",
    nl: "/nl/artikelen/als-je-stekenverhouding-niet-klopt/",
    da: "/da/artikler/naar-strikkefastheden-ikke-passer/",
  },
  "gauge-swatch-step-by-step": {
    en: "/articles/gauge-swatch-step-by-step/",
    fi: "/fi/artikkelit/mallitilkun-neulominen-vaiheittain/",
    de: "/de/artikel/maschenprobe-stricken-schritt-fuer-schritt/",
    sv: "/sv/artiklar/sticka-provlapp-steg-for-steg/",
    no: "/no/artikler/strikke-provelapp-steg-for-steg/",
    fr: "/fr/articles/tricoter-un-echantillon-etape-par-etape/",
    nl: "/nl/artikelen/proeflapje-breien-stap-voor-stap/",
    da: "/da/artikler/strikkeproeve-trin-for-trin/",
  },
  "how-many-stitches-to-cast-on": {
    en: "/articles/how-many-stitches-to-cast-on/",
    fi: "/fi/artikkelit/montako-silmukkaa-luodaan/",
    de: "/de/artikel/wie-viele-maschen-anschlagen/",
    sv: "/sv/artiklar/hur-manga-maskor-ska-laggas-upp/",
    no: "/no/artikler/hvor-mange-masker-skal-du-legge-opp/",
    fr: "/fr/articles/combien-de-mailles-monter/",
    nl: "/nl/artikelen/hoeveel-steken-opzetten/",
    da: "/da/artikler/hvor-mange-masker-skal-du-slaa-op/",
  },
  "how-much-yarn-do-i-need": {
    en: "/articles/how-much-yarn-do-i-need/",
    fi: "/fi/artikkelit/paljonko-lankaa-tarvitaan/",
    de: "/de/artikel/wie-viel-garn-brauche-ich/",
    sv: "/sv/artiklar/hur-mycket-garn-behover-jag/",
    no: "/no/artikler/hvor-mye-garn-trenger-jeg/",
    fr: "/fr/articles/combien-de-fil-faut-il/",
    nl: "/nl/artikelen/hoeveel-garen-heb-je-nodig/",
    da: "/da/artikler/hvor-meget-garn-skal-du-bruge/",
  },
  "how-to-block-knitting": {
    en: "/articles/how-to-block-knitting/",
    fi: "/fi/artikkelit/neuleen-pingotus/",
    de: "/de/artikel/strickstuecke-spannen-nass-mit-dampf-oder-spruehflasche/",
    sv: "/sv/artiklar/blocka-stickning-vat-anga-spray/",
    no: "/no/artikler/blokke-strikk-vatt-damp-spray/",
    fr: "/fr/articles/bloquer-un-tricot/",
    nl: "/nl/artikelen/breiwerk-blocken-nat-stoom-spray/",
    da: "/da/artikler/blokke-strik-vaadt-damp-spray/",
  },
  "how-to-knit-hat": {
    en: "/articles/how-to-knit-hat/",
    fi: "/fi/artikkelit/pipon-neulominen/",
    de: "/de/artikel/muetze-stricken-methoden-fuer-jedes-niveau/",
    sv: "/sv/artiklar/sticka-mossa-metoder-for-alla-nivaer/",
    no: "/no/artikler/strikke-lue-metoder-for-alle-nivaer/",
    fr: "/fr/articles/tricoter-un-bonnet/",
    nl: "/nl/artikelen/een-muts-breien-verschillende-methodes/",
    da: "/da/artikler/strik-hue-metoder/",
  },
  "how-to-knit-socks": {
    en: "/articles/how-to-knit-socks/",
    fi: "/fi/artikkelit/sukkien-neulominen/",
    de: "/de/artikel/socken-stricken-aufbau-einer-sockenanleitung/",
    sv: "/sv/artiklar/sticka-sockor-sockmonstrets-delar/",
    no: "/no/artikler/strikke-sokker-sokkeoppskriftens-deler/",
    fr: "/fr/articles/tricoter-des-chaussettes/",
    nl: "/nl/artikelen/sokken-breien-opbouw-sokpatroon/",
    da: "/da/artikler/strik-stroemper-stroempeopskrift/",
  },
  "how-to-read-yarn-label": {
    en: "/articles/how-to-read-yarn-label/",
    fi: "/fi/artikkelit/lankavyotteen-lukeminen/",
    de: "/de/artikel/garnbanderole-lesen/",
    sv: "/sv/artiklar/lasa-garnbanderoll-symboler/",
    no: "/no/artikler/lese-garnetikett-symboler/",
    fr: "/fr/articles/lire-une-etiquette-de-pelote/",
    nl: "/nl/artikelen/een-garenlabel-lezen-symbolen-uitgelegd/",
    da: "/da/artikler/laes-banderole-symboler/",
  },
  "how-to-substitute-yarn": {
    en: "/articles/how-to-substitute-yarn/",
    fi: "/fi/artikkelit/langan-korvaaminen-neuleohjeessa/",
    de: "/de/artikel/garn-in-einer-strickanleitung-ersetzen/",
    sv: "/sv/artiklar/byta-garn-i-stickmonster/",
    no: "/no/artikler/bytte-garn-i-strikkeoppskrift/",
    fr: "/fr/articles/remplacer-un-fil-dans-un-modele/",
    nl: "/nl/artikelen/garen-vervangen-in-een-breipatroon/",
    da: "/da/artikler/skift-garn-i-strikkeopskrift/",
  },
  "identify-mystery-yarn": {
    en: "/articles/identify-mystery-yarn/",
    fi: "/fi/artikkelit/tuntemattoman-langan-tunnistaminen/",
    de: "/de/artikel/unbekanntes-garn-ohne-banderole-bestimmen/",
    sv: "/sv/artiklar/identifiera-okant-garn-utan-banderoll/",
    no: "/no/artikler/ukjent-garn-uten-garnetikett/",
    fr: "/fr/articles/identifier-un-fil-sans-etiquette/",
    nl: "/nl/artikelen/onbekend-garen-herkennen-zonder-label/",
    da: "/da/artikler/ukendt-garn-uden-banderole/",
  },
  "increase-decrease-evenly": {
    en: "/articles/increase-decrease-evenly/",
    fi: "/fi/artikkelit/lisaysten-ja-kavennusten-jakaminen/",
    de: "/de/artikel/zunahmen-und-abnahmen-gleichmaessig-verteilen/",
    sv: "/sv/artiklar/oka-eller-minska-jamnt-over-ett-varv/",
    no: "/no/artikler/fordele-okninger-og-fellinger-jevnt/",
    fr: "/fr/articles/repartir-augmentations-diminutions-regulierement/",
    nl: "/nl/artikelen/gelijkmatig-meerderen-of-minderen-over-een-toer/",
    da: "/da/artikler/fordel-udtagninger-indtagninger-jaevnt/",
  },
  "join-new-ball-of-yarn": {
    en: "/articles/join-new-ball-of-yarn/",
    fi: "/fi/artikkelit/uuden-lankakeran-liittaminen/",
    de: "/de/artikel/ein-neues-knaeuel-mitten-in-der-reihe-ansetzen/",
    sv: "/sv/artiklar/skarva-nytt-nystan-mitt-i-varvet/",
    no: "/no/artikler/nytt-noste-midt-pa-pinnen/",
    fr: "/fr/articles/changer-de-pelote-au-milieu-du-rang/",
    nl: "/nl/artikelen/nieuw-garen-aanhechten-midden-in-een-toer/",
    da: "/da/artikler/nyt-noegle-midt-paa-pinden/",
  },
  "knit-first-scarf": {
    en: "/articles/knit-first-scarf/",
    fi: "/fi/artikkelit/ensimmaisen-huivin-neulominen/",
    de: "/de/artikel/den-ersten-schal-stricken/",
    sv: "/sv/artiklar/sticka-forsta-halsduken/",
    no: "/no/artikler/strikke-forste-skjerf/",
    fr: "/fr/articles/tricoter-sa-premiere-echarpe/",
    nl: "/nl/artikelen/je-eerste-sjaal-breien/",
    da: "/da/artikler/strik-foerste-toerklaede/",
  },
  "knitting-needle-materials": {
    en: "/articles/knitting-needle-materials/",
    fi: "/fi/artikkelit/puikkomateriaalit-metalli-puu-bambu/",
    de: "/de/artikel/stricknadeln-metall-holz-bambus/",
    sv: "/sv/artiklar/stickmaterial-metall-tra-bambu/",
    no: "/no/artikler/strikkepinner-metall-tre-bambus/",
    fr: "/fr/articles/aiguilles-a-tricoter-metal-bois-bambou/",
    nl: "/nl/artikelen/breinaalden-van-metaal-hout-en-bamboe/",
    da: "/da/artikler/strikkepinde-metal-trae-bambus/",
  },
  "knitting-pattern-repeats": {
    en: "/articles/knitting-pattern-repeats/",
    fi: "/fi/artikkelit/neuleohjeen-toistot/",
    de: "/de/artikel/rapporte-in-strickanleitungen-sterne-und-klammern/",
    sv: "/sv/artiklar/rapporter-i-stickmonster-asterisker-och-hakparenteser/",
    no: "/no/artikler/rapporter-i-strikkeoppskrifter/",
    fr: "/fr/articles/repetitions-dans-les-modeles-de-tricot/",
    nl: "/nl/artikelen/herhalingen-in-breipatronen/",
    da: "/da/artikler/gentagelser-i-strikkeopskrifter/",
  },
  "knitting-pattern-sizes-and-fit": {
    en: "/articles/knitting-pattern-sizes-and-fit/",
    fi: "/fi/artikkelit/neuleohjeen-koot-ja-istuvuus/",
    de: "/de/artikel/groessen-in-strickanleitungen-mehrweite-und-masse/",
    sv: "/sv/artiklar/storlekar-i-stickmonster-rorelsevidd-och-matt/",
    no: "/no/artikler/storrelser-i-strikkeoppskrifter/",
    fr: "/fr/articles/tailles-dans-les-modeles-de-tricot/",
    nl: "/nl/artikelen/maten-en-pasvorm-in-breipatronen/",
    da: "/da/artikler/stoerrelser-i-strikkeopskrifter/",
  },
  "needle-size-for-beginners": {
    en: "/articles/needle-size-for-beginners/",
    fi: "/fi/artikkelit/puikkokoko-aloittelijalle/",
    de: "/de/artikel/welche-nadelstaerke-fuer-den-einstieg/",
    sv: "/sv/artiklar/vilken-stickstorlek-for-nyborjare/",
    no: "/no/artikler/pinnestorrelse-for-nybegynnere/",
    fr: "/fr/articles/taille-aiguilles-pour-debuter/",
    nl: "/nl/artikelen/welke-naalddikte-voor-beginners/",
    da: "/da/artikler/pindestoerrelse-for-begyndere/",
  },
  "organize-knitting-projects": {
    en: "/articles/organize-knitting-projects/",
    fi: "/fi/artikkelit/neuleprojektien-jarjestaminen/",
    de: "/de/artikel/mehrere-strickprojekte-organisieren/",
    sv: "/sv/artiklar/organisera-flera-stickprojekt/",
    no: "/no/artikler/holde-orden-pa-strikkeprosjekter/",
    fr: "/fr/articles/organiser-ses-projets-tricot/",
    nl: "/nl/artikelen/meerdere-breiprojecten-organiseren/",
    da: "/da/artikler/hold-styr-paa-strikkeprojekter/",
  },
  "how-to-read-knitting-pattern": {
    en: "/articles/how-to-read-knitting-pattern/",
    fi: "/fi/artikkelit/neuleohjeen-lukeminen/",
    de: "/de/artikel/strickanleitung-lesen/",
    sv: "/sv/artiklar/lasa-stickmonster-nyborjarguide/",
    no: "/no/artikler/lese-strikkeoppskrift-nybegynnerguide/",
    fr: "/fr/articles/lire-un-modele-de-tricot/",
    nl: "/nl/artikelen/een-breipatroon-lezen/",
    da: "/da/artikler/laes-strikkeopskrift/",
  },
  "pick-up-stitches": {
    en: "/articles/pick-up-stitches/",
    fi: "/fi/artikkelit/silmukoiden-poimiminen/",
    de: "/de/artikel/maschen-an-einer-strickkante-aufnehmen/",
    sv: "/sv/artiklar/plocka-upp-maskor-langs-stickad-kant/",
    no: "/no/artikler/plukke-opp-masker-langs-strikket-kant/",
    fr: "/fr/articles/relever-des-mailles/",
    nl: "/nl/artikelen/steken-opnemen-langs-een-gebreide-rand/",
    da: "/da/artikler/saml-masker-op-langs-kant/",
  },
  "seam-knitted-pieces": {
    en: "/articles/seam-knitted-pieces/",
    fi: "/fi/artikkelit/neulekappaleiden-yhdistaminen/",
    de: "/de/artikel/strickteile-zusammennaehen-matratzenstich/",
    sv: "/sv/artiklar/sy-ihop-stickade-delar-madrassom/",
    no: "/no/artikler/sy-sammen-strikkede-deler-madrassting/",
    fr: "/fr/articles/assembler-des-pieces-tricotees/",
    nl: "/nl/artikelen/breidelen-aan-elkaar-naaien/",
    da: "/da/artikler/sy-strikkede-dele-sammen-madrassting/",
  },
  "track-knitting-time": {
    en: "/articles/track-knitting-time/",
    fi: "/fi/artikkelit/neulonta-ajan-seuraaminen/",
    de: "/de/artikel/strickzeit-und-tempo-verfolgen/",
    sv: "/sv/artiklar/folja-sticktid-och-hastighet/",
    no: "/no/artikler/folge-med-pa-strikketid-og-tempo/",
    fr: "/fr/articles/suivre-son-temps-et-sa-vitesse-de-tricot/",
    nl: "/nl/artikelen/breitijd-en-tempo-bijhouden/",
    da: "/da/artikler/strikketid-og-tempo/",
  },
  "track-rows-knitting": {
    en: "/articles/track-rows-knitting/",
    fi: "/fi/artikkelit/kerrosten-seuraaminen-neuloessa/",
    de: "/de/artikel/reihen-beim-stricken-zaehlen/",
    sv: "/sv/artiklar/halla-koll-pa-varv-nar-du-stickar/",
    no: "/no/artikler/holde-styr-pa-pinner-og-omganger/",
    fr: "/fr/articles/suivre-les-rangs-au-tricot/",
    nl: "/nl/artikelen/toeren-bijhouden-tijdens-het-breien/",
    da: "/da/artikler/hold-styr-paa-pinde-og-omgange/",
  },
  "why-knitting-curls": {
    en: "/articles/why-knitting-curls/",
    fi: "/fi/artikkelit/miksi-neule-kaartuu/",
    de: "/de/artikel/warum-rollt-sich-mein-strickstueck-ein/",
    sv: "/sv/artiklar/varfor-rullar-stickningen-sig/",
    no: "/no/artikler/hvorfor-ruller-strikketoyet-seg/",
    fr: "/fr/articles/pourquoi-le-tricot-roule/",
    nl: "/nl/artikelen/waarom-krult-breiwerk/",
    da: "/da/artikler/hvorfor-ruller-strik/",
  },
  "yarn-fibers-compared": {
    en: "/articles/yarn-fibers-compared/",
    fi: "/fi/artikkelit/lankakuidut-vertailussa/",
    de: "/de/artikel/garnfasern-im-vergleich/",
    sv: "/sv/artiklar/garnfibrer-jamforda-ull-bomull-akryl/",
    no: "/no/artikler/garnfibre-sammenlignet/",
    fr: "/fr/articles/fibres-de-fil-laine-coton-acrylique/",
    nl: "/nl/artikelen/garenvezels-vergeleken/",
    da: "/da/artikler/garnfibre-sammenlignet/",
  },
  "yarn-for-blanket": {
    en: "/articles/yarn-for-blanket/",
    fi: "/fi/artikkelit/paljonko-lankaa-peittoon/",
    de: "/de/artikel/wie-viel-garn-fuer-eine-decke/",
    sv: "/sv/artiklar/hur-mycket-garn-till-filt/",
    no: "/no/artikler/hvor-mye-garn-til-teppe/",
    fr: "/fr/articles/combien-de-fil-pour-une-couverture/",
    nl: "/nl/artikelen/hoeveel-garen-voor-een-deken/",
    da: "/da/artikler/hvor-meget-garn-til-taeppe/",
  },
  "yarn-for-sweater": {
    en: "/articles/yarn-for-sweater/",
    fi: "/fi/artikkelit/paljonko-lankaa-villapaitaan/",
    de: "/de/artikel/wie-viel-garn-fuer-einen-pullover/",
    sv: "/sv/artiklar/hur-mycket-garn-till-troja/",
    no: "/no/artikler/hvor-mye-garn-til-genser/",
    fr: "/fr/articles/combien-de-fil-pour-un-pull/",
    nl: "/nl/artikelen/hoeveel-garen-voor-een-trui/",
    da: "/da/artikler/hvor-meget-garn-til-sweater/",
  },
  "yarn-weight-substitution": {
    en: "/articles/yarn-weight-substitution/",
    fi: "/fi/artikkelit/langan-korvaaminen-eri-vahvuudella/",
    de: "/de/artikel/garnstaerke-ersetzen/",
    sv: "/sv/artiklar/byta-garntjocklek-i-stickmonster/",
    no: "/no/artikler/bytte-garntykkelse-i-strikkeoppskrift/",
    fr: "/fr/articles/remplacer-par-une-autre-epaisseur-de-fil/",
    nl: "/nl/artikelen/een-andere-garendikte-gebruiken/",
    da: "/da/artikler/skift-garntykkelse-i-strikkeopskrift/",
  },
} as const;

export type TranslationKey = keyof typeof articleTranslations;

export function isTranslatedArticle(key: string): key is TranslationKey {
  return key in articleTranslations;
}

export function isEnglishArticle(
  article: CollectionEntry<"articles">,
): boolean {
  return (article.data.lang ?? "en") === "en";
}

export function isFinnishArticle(
  article: CollectionEntry<"articles">,
): boolean {
  return article.data.lang === "fi";
}

export function isGermanArticle(article: CollectionEntry<"articles">): boolean {
  return article.data.lang === "de";
}

export function isSwedishArticle(
  article: CollectionEntry<"articles">,
): boolean {
  return article.data.lang === "sv";
}

export function isNorwegianArticle(
  article: CollectionEntry<"articles">,
): boolean {
  return article.data.lang === "no";
}

export function isFrenchArticle(article: CollectionEntry<"articles">): boolean {
  return article.data.lang === "fr";
}

export function isDutchArticle(article: CollectionEntry<"articles">): boolean {
  return article.data.lang === "nl";
}

export function isDanishArticle(article: CollectionEntry<"articles">): boolean {
  return article.data.lang === "da";
}

export function getArticleSlug(id: string): string {
  return id.split("/").pop() ?? id;
}

export function getArticleTranslationKey(article: ArticleEntry): string {
  return article.data.translationKey ?? getArticleSlug(article.id);
}

export function isArticleInLang(article: ArticleEntry, lang: Lang): boolean {
  return (article.data.lang ?? "en") === lang;
}

export function isArticleVisibleInCurrentBuild(article: ArticleEntry): boolean {
  return import.meta.env.DEV || !article.data.draft;
}

export function isArticleVisibleForLang(
  article: ArticleEntry,
  lang: Lang,
): boolean {
  return (
    isArticleInLang(article, lang) && isArticleVisibleInCurrentBuild(article)
  );
}

export function byCategoryOrder(a: ArticleEntry, b: ArticleEntry): number {
  return (a.data.categoryOrder ?? 999) - (b.data.categoryOrder ?? 999);
}

function sortByCategoryOrder(items: ArticleEntry[]): ArticleEntry[] {
  return [...items].sort(byCategoryOrder);
}

export function buildArticleCategorySections(
  items: ArticleEntry[],
  lang: Lang,
): ArticleCategorySection[] {
  return CATEGORY_ORDER.map((slug) => {
    const categoryArticles = sortByCategoryOrder(
      items.filter((item) => item.data.category === slug),
    );
    const previewArticles = categoryArticles.slice(0, 3);

    return {
      slug,
      label: getCategoryLabel(slug, lang),
      description: getCategoryDescription(slug, lang),
      articles: previewArticles,
      remainingCount: Math.max(
        categoryArticles.length - previewArticles.length,
        0,
      ),
    };
  }).filter((section) => section.articles.length > 0);
}

function fallbackArticlePath(lang: Lang, slug: string): string {
  if (lang === "fi") return `/fi/artikkelit/${slug}/`;
  if (lang === "de") return `/de/artikel/${slug}/`;
  if (lang === "sv") return `/sv/artiklar/${slug}/`;
  if (lang === "no") return `/no/artikler/${slug}/`;
  if (lang === "fr") return `/fr/articles/${slug}/`;
  if (lang === "nl") return `/nl/artikelen/${slug}/`;
  if (lang === "da") return `/da/artikler/${slug}/`;
  return `/articles/${slug}/`;
}

export function getArticlePath(
  article: ArticleEntry,
  lang: Lang = article.data.lang ?? "en",
): string {
  const key = getArticleTranslationKey(article);
  if (isTranslatedArticle(key)) {
    const translatedPath = (
      articleTranslations[key] as Partial<Record<Lang, string>>
    )[lang];
    if (translatedPath) return translatedPath;
  }
  return fallbackArticlePath(lang, getArticleSlug(article.id));
}

export function getArticleAlternates(
  article: ArticleEntry,
  visibleArticles?: ArticleEntry[],
): ArticleAlternates | undefined {
  const key = getArticleTranslationKey(article);
  if (!isTranslatedArticle(key)) return undefined;

  const translations = articleTranslations[key] as ArticleAlternates;
  if (!visibleArticles) return translations;

  const visibleLanguages = new Set(
    visibleArticles
      .filter((candidate) => getArticleTranslationKey(candidate) === key)
      .map((candidate) => candidate.data.lang ?? "en"),
  );
  const alternates = Object.fromEntries(
    Object.entries(translations).filter(([lang]) =>
      visibleLanguages.has(lang as Lang),
    ),
  ) as ArticleAlternates;

  return Object.keys(alternates).length > 0 ? alternates : undefined;
}

export function getLocalizedArticleRouteSlug(
  lang: Lang,
  key: string,
  fallbackSlug = key,
): string {
  if (isTranslatedArticle(key)) {
    const localizedPath = (
      articleTranslations[key] as Partial<Record<Lang, string>>
    )[lang];
    if (localizedPath) {
      return localizedPath
        .replace(getArticlesIndexPath(lang), "")
        .replace(/\/$/, "");
    }
  }

  return fallbackSlug;
}

export function getCategoryRouteRelativePath(
  lang: Lang,
  category: CategorySlug,
): string {
  return routes.category[category][lang]
    .replace(getArticlesIndexPath(lang), "")
    .replace(/\/$/, "");
}

export function buildLocalizedArticleStaticPaths({
  articles,
  lang,
}: {
  articles: ArticleEntry[];
  lang: Lang;
}): Array<{
  params: { slug: string | undefined };
  props: LocalizedArticleRouteProps;
}> {
  const visibleArticles = articles.filter(isArticleVisibleInCurrentBuild);
  const localizedArticles = sortByCategoryOrder(
    visibleArticles.filter((article) => isArticleVisibleForLang(article, lang)),
  );

  const categoryPaths = CATEGORY_ORDER.map((category) => ({
    params: { slug: getCategoryRouteRelativePath(lang, category) },
    props: {
      view: "category" as const,
      category,
      articles: sortByCategoryOrder(
        localizedArticles.filter(
          (article) => article.data.category === category,
        ),
      ),
    },
  }));

  const articlePaths = localizedArticles.map((article) => ({
    params: {
      slug: getLocalizedArticleRouteSlug(
        lang,
        getArticleTranslationKey(article),
        getArticleSlug(article.id),
      ),
    },
    props: {
      view: "article" as const,
      article,
      alternates: getArticleAlternates(article, visibleArticles),
    },
  }));

  return [
    {
      params: { slug: undefined },
      props: {
        view: "index",
        sections: buildArticleCategorySections(localizedArticles, lang),
      },
    },
    ...categoryPaths,
    ...articlePaths,
  ];
}

export function getFinnishArticleRouteSlug(
  key: string,
  fallbackSlug = key,
): string {
  return getLocalizedArticleRouteSlug("fi", key, fallbackSlug);
}

export function getGermanArticleRouteSlug(
  key: string,
  fallbackSlug = key,
): string {
  return getLocalizedArticleRouteSlug("de", key, fallbackSlug);
}

export function getSwedishArticleRouteSlug(
  key: string,
  fallbackSlug = key,
): string {
  return getLocalizedArticleRouteSlug("sv", key, fallbackSlug);
}

export function getNorwegianArticleRouteSlug(
  key: string,
  fallbackSlug = key,
): string {
  return getLocalizedArticleRouteSlug("no", key, fallbackSlug);
}

export function getFrenchArticleRouteSlug(
  key: string,
  fallbackSlug = key,
): string {
  return getLocalizedArticleRouteSlug("fr", key, fallbackSlug);
}

export function getDutchArticleRouteSlug(
  key: string,
  fallbackSlug = key,
): string {
  return getLocalizedArticleRouteSlug("nl", key, fallbackSlug);
}

export function getDanishArticleRouteSlug(
  key: string,
  fallbackSlug = key,
): string {
  return getLocalizedArticleRouteSlug("da", key, fallbackSlug);
}

export function getNorwegianCategoryRouteSlug(category: CategorySlug): string {
  return getCategoryRouteRelativePath("no", category).replace("kategori/", "");
}

export function getFrenchCategoryRouteSlug(category: CategorySlug): string {
  return getCategoryRouteRelativePath("fr", category).replace("categorie/", "");
}

export function getDutchCategoryRouteSlug(category: CategorySlug): string {
  return getCategoryRouteRelativePath("nl", category).replace("categorie/", "");
}

export function getDanishCategoryRouteSlug(category: CategorySlug): string {
  return getCategoryRouteRelativePath("da", category).replace("kategori/", "");
}
