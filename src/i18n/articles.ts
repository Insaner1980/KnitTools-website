import type { CollectionEntry } from 'astro:content';
import type { Lang } from './config';

export const articleTranslations = {
  'what-is-gauge-in-knitting': {
    en: '/articles/what-is-gauge-in-knitting/',
    fi: '/fi/artikkelit/mita-neuletiheys-tarkoittaa/',
  },
  'how-to-measure-knitting-gauge': {
    en: '/articles/how-to-measure-knitting-gauge/',
    fi: '/fi/artikkelit/neuletiheyden-mittaaminen/',
  },
  'gauge-doesnt-match': {
    en: '/articles/gauge-doesnt-match/',
    fi: '/fi/artikkelit/kun-neuletiheys-ei-tasmaa/',
  },
  'how-many-stitches-to-cast-on': {
    en: '/articles/how-many-stitches-to-cast-on/',
    fi: '/fi/artikkelit/montako-silmukkaa-luodaan/',
  },
  'how-much-yarn-do-i-need': {
    en: '/articles/how-much-yarn-do-i-need/',
    fi: '/fi/artikkelit/paljonko-lankaa-tarvitaan/',
  },
  'how-to-read-yarn-label': {
    en: '/articles/how-to-read-yarn-label/',
    fi: '/fi/artikkelit/lankavyotteen-lukeminen/',
  },
  'how-to-substitute-yarn': {
    en: '/articles/how-to-substitute-yarn/',
    fi: '/fi/artikkelit/langan-korvaaminen-neuleohjeessa/',
  },
  'best-yarn-for-beginners': {
    en: '/articles/best-yarn-for-beginners/',
    fi: '/fi/artikkelit/paras-lanka-aloittelijalle/',
  },
  'needle-size-for-beginners': {
    en: '/articles/needle-size-for-beginners/',
    fi: '/fi/artikkelit/puikkokoko-aloittelijalle/',
  },
  'circular-vs-straight-vs-dpn': {
    en: '/articles/circular-vs-straight-vs-dpn/',
    fi: '/fi/artikkelit/pyoropuikot-suorat-puikot-sukkapuikot/',
  },
  'how-to-read-knitting-pattern': {
    en: '/articles/how-to-read-knitting-pattern/',
    fi: '/fi/artikkelit/neuleohjeen-lukeminen/',
  },
  'free-knitting-calculators': {
    en: '/articles/free-knitting-calculators/',
    fi: '/fi/artikkelit/ilmaiset-neulelaskurit/',
  },
} as const;

export type TranslationKey = keyof typeof articleTranslations;

export function isTranslatedArticle(key: string): key is TranslationKey {
  return key in articleTranslations;
}

export function isEnglishArticle(article: CollectionEntry<'articles'>): boolean {
  return (article.data.lang ?? 'en') === 'en';
}

export function isFinnishArticle(article: CollectionEntry<'articles'>): boolean {
  return article.data.lang === 'fi';
}

export function getArticleSlug(id: string): string {
  return id.split('/').pop() ?? id;
}

export function getArticlePath(article: CollectionEntry<'articles'>, lang: Lang = (article.data.lang ?? 'en')): string {
  const key = article.data.translationKey ?? getArticleSlug(article.id);
  if (isTranslatedArticle(key)) {
    return articleTranslations[key][lang];
  }
  return lang === 'fi' ? `/fi/artikkelit/${getArticleSlug(article.id)}/` : `/articles/${getArticleSlug(article.id)}/`;
}

export function getArticleAlternates(article: CollectionEntry<'articles'>) {
  const key = article.data.translationKey ?? getArticleSlug(article.id);
  return isTranslatedArticle(key) ? articleTranslations[key] : undefined;
}

export function getFinnishArticleRouteSlug(key: TranslationKey): string {
  return articleTranslations[key].fi.replace('/fi/artikkelit/', '').replace(/\/$/, '');
}
