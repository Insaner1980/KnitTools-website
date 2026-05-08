import type { Lang } from './config';

export const routes = {
  toolsIndex: {
    en: '/tools/',
    fi: '/fi/tyokalut/',
  },
  articlesIndex: {
    en: '/articles/',
    fi: '/fi/artikkelit/',
  },
  tool: {
    castOnCalculator: {
      en: '/tools/cast-on-calculator/',
      fi: '/fi/tyokalut/silmukkalaskuri/',
    },
    yarnEstimator: {
      en: '/tools/yarn-estimator/',
      fi: '/fi/tyokalut/lankamuunnin/',
    },
    needleSizeChart: {
      en: '/tools/needle-size-chart/',
      fi: '/fi/tyokalut/puikkokoot/',
    },
    yarnWeightChart: {
      en: '/tools/yarn-weight-chart/',
      fi: '/fi/tyokalut/lankavahvuudet/',
    },
    knittingAbbreviations: {
      en: '/tools/knitting-abbreviations/',
      fi: '/fi/tyokalut/neulelyhenteet/',
    },
    knittingSizeCharts: {
      en: '/tools/knitting-size-charts/',
      fi: '/fi/tyokalut/neulekokotaulukot/',
    },
  },
  category: {
    'gauge-calculations': {
      en: '/articles/category/gauge-calculations/',
      fi: '/fi/artikkelit/kategoria/neuletiheys-ja-laskurit/',
    },
    yarn: {
      en: '/articles/category/yarn/',
      fi: '/fi/artikkelit/kategoria/langat/',
    },
    needles: {
      en: '/articles/category/needles/',
      fi: '/fi/artikkelit/kategoria/puikot/',
    },
    techniques: {
      en: '/articles/category/techniques/',
      fi: '/fi/artikkelit/kategoria/tekniikat/',
    },
    'app-tools': {
      en: '/articles/category/app-tools/',
      fi: '/fi/artikkelit/kategoria/sovellus-ja-tyokalut/',
    },
  },
} as const;

export type LocalizedPath = Record<Lang, string>;

export function pathFor(path: LocalizedPath, lang: Lang): string {
  return path[lang];
}
