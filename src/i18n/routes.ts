import type { Lang } from './config';

export const routes = {
  toolsIndex: {
    en: '/tools/',
    fi: '/fi/tyokalut/',
    de: '/de/werkzeuge/',
    sv: '/sv/verktyg/',
    no: '/no/verktoy/',
    fr: '/fr/outils/',
  },
  articlesIndex: {
    en: '/articles/',
    fi: '/fi/artikkelit/',
    de: '/de/artikel/',
    sv: '/sv/artiklar/',
    no: '/no/artikler/',
    fr: '/fr/articles/',
  },
  tool: {
    castOnCalculator: {
      en: '/tools/cast-on-calculator/',
      fi: '/fi/tyokalut/silmukkalaskuri/',
      de: '/de/werkzeuge/maschenanschlag-rechner/',
      sv: '/sv/verktyg/upplaggningskalkylator/',
      no: '/no/verktoy/oppleggskalkulator/',
      fr: '/fr/outils/calculateur-mailles-a-monter/',
    },
    yarnEstimator: {
      en: '/tools/yarn-estimator/',
      fi: '/fi/tyokalut/lankamuunnin/',
      de: '/de/werkzeuge/garnbedarfsrechner/',
      sv: '/sv/verktyg/garnatgangskalkylator/',
      no: '/no/verktoy/garnberegner/',
      fr: '/fr/outils/estimateur-quantite-laine/',
    },
    needleSizeChart: {
      en: '/tools/needle-size-chart/',
      fi: '/fi/tyokalut/puikkokoot/',
      de: '/de/werkzeuge/nadelstaerken-tabelle/',
      sv: '/sv/verktyg/stickstorlekar/',
      no: '/no/verktoy/pinnestorrelser/',
      fr: '/fr/outils/tailles-aiguilles/',
    },
    yarnWeightChart: {
      en: '/tools/yarn-weight-chart/',
      fi: '/fi/tyokalut/lankavahvuudet/',
      de: '/de/werkzeuge/garnstaerken-tabelle/',
      sv: '/sv/verktyg/garntjocklekar/',
      no: '/no/verktoy/garntykkelser/',
      fr: '/fr/outils/epaisseurs-de-fil/',
    },
    knittingAbbreviations: {
      en: '/tools/knitting-abbreviations/',
      fi: '/fi/tyokalut/neulelyhenteet/',
      de: '/de/werkzeuge/strickabkuerzungen/',
      sv: '/sv/verktyg/stickforkortningar/',
      no: '/no/verktoy/strikkeforkortelser/',
      fr: '/fr/outils/abreviations-tricot/',
    },
    knittingSizeCharts: {
      en: '/tools/knitting-size-charts/',
      fi: '/fi/tyokalut/neulekokotaulukot/',
      de: '/de/werkzeuge/groessentabellen-stricken/',
      sv: '/sv/verktyg/storlekstabeller-stickning/',
      no: '/no/verktoy/storrelsestabeller-strikking/',
      fr: '/fr/outils/tableaux-tailles-tricot/',
    },
  },
  category: {
    'gauge-calculations': {
      en: '/articles/category/gauge-calculations/',
      fi: '/fi/artikkelit/kategoria/neuletiheys-ja-laskurit/',
      de: '/de/artikel/kategorie/maschenprobe-und-rechner/',
      sv: '/sv/artiklar/kategori/stickfasthet-och-berakningar/',
      no: '/no/artikler/kategori/strikkefasthet-og-beregninger/',
      fr: '/fr/articles/categorie/echantillon-et-calculs/',
    },
    yarn: {
      en: '/articles/category/yarn/',
      fi: '/fi/artikkelit/kategoria/langat/',
      de: '/de/artikel/kategorie/garn/',
      sv: '/sv/artiklar/kategori/garn/',
      no: '/no/artikler/kategori/garn/',
      fr: '/fr/articles/categorie/fils-et-laine/',
    },
    needles: {
      en: '/articles/category/needles/',
      fi: '/fi/artikkelit/kategoria/puikot/',
      de: '/de/artikel/kategorie/nadeln/',
      sv: '/sv/artiklar/kategori/stickor/',
      no: '/no/artikler/kategori/pinner/',
      fr: '/fr/articles/categorie/aiguilles/',
    },
    techniques: {
      en: '/articles/category/techniques/',
      fi: '/fi/artikkelit/kategoria/tekniikat/',
      de: '/de/artikel/kategorie/techniken/',
      sv: '/sv/artiklar/kategori/tekniker/',
      no: '/no/artikler/kategori/teknikker/',
      fr: '/fr/articles/categorie/techniques/',
    },
    'app-tools': {
      en: '/articles/category/app-tools/',
      fi: '/fi/artikkelit/kategoria/sovellus-ja-tyokalut/',
      de: '/de/artikel/kategorie/app-und-tools/',
      sv: '/sv/artiklar/kategori/app-och-verktyg/',
      no: '/no/artikler/kategori/app-og-verktoy/',
      fr: '/fr/articles/categorie/application-et-outils/',
    },
  },
} as const;

export type LocalizedPath = Partial<Record<Lang, string>> & Record<'en', string>;

export function pathFor(path: LocalizedPath, lang: Lang): string {
  return path[lang] ?? path.en;
}
