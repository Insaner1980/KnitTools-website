import type { Lang } from './config';

export const routes = {
  toolsIndex: {
    en: '/tools/',
    fi: '/fi/tyokalut/',
    de: '/de/werkzeuge/',
  },
  articlesIndex: {
    en: '/articles/',
    fi: '/fi/artikkelit/',
    de: '/de/artikel/',
  },
  tool: {
    castOnCalculator: {
      en: '/tools/cast-on-calculator/',
      fi: '/fi/tyokalut/silmukkalaskuri/',
      de: '/de/werkzeuge/maschenanschlag-rechner/',
    },
    yarnEstimator: {
      en: '/tools/yarn-estimator/',
      fi: '/fi/tyokalut/lankamuunnin/',
      de: '/de/werkzeuge/garnbedarfsrechner/',
    },
    needleSizeChart: {
      en: '/tools/needle-size-chart/',
      fi: '/fi/tyokalut/puikkokoot/',
      de: '/de/werkzeuge/nadelstaerken-tabelle/',
    },
    yarnWeightChart: {
      en: '/tools/yarn-weight-chart/',
      fi: '/fi/tyokalut/lankavahvuudet/',
      de: '/de/werkzeuge/garnstaerken-tabelle/',
    },
    knittingAbbreviations: {
      en: '/tools/knitting-abbreviations/',
      fi: '/fi/tyokalut/neulelyhenteet/',
      de: '/de/werkzeuge/strickabkuerzungen/',
    },
    knittingSizeCharts: {
      en: '/tools/knitting-size-charts/',
      fi: '/fi/tyokalut/neulekokotaulukot/',
      de: '/de/werkzeuge/groessentabellen-stricken/',
    },
  },
  category: {
    'gauge-calculations': {
      en: '/articles/category/gauge-calculations/',
      fi: '/fi/artikkelit/kategoria/neuletiheys-ja-laskurit/',
      de: '/de/artikel/kategorie/maschenprobe-und-rechner/',
    },
    yarn: {
      en: '/articles/category/yarn/',
      fi: '/fi/artikkelit/kategoria/langat/',
      de: '/de/artikel/kategorie/garn/',
    },
    needles: {
      en: '/articles/category/needles/',
      fi: '/fi/artikkelit/kategoria/puikot/',
      de: '/de/artikel/kategorie/nadeln/',
    },
    techniques: {
      en: '/articles/category/techniques/',
      fi: '/fi/artikkelit/kategoria/tekniikat/',
      de: '/de/artikel/kategorie/techniken/',
    },
    'app-tools': {
      en: '/articles/category/app-tools/',
      fi: '/fi/artikkelit/kategoria/sovellus-ja-tyokalut/',
      de: '/de/artikel/kategorie/app-und-tools/',
    },
  },
} as const;

export type LocalizedPath = Partial<Record<Lang, string>> & Record<'en', string>;

export function pathFor(path: LocalizedPath, lang: Lang): string {
  return path[lang] ?? path.en;
}
