export const SITE_URL = 'https://knittoolsapp.com';

export const languages = {
  en: 'English',
  fi: 'Suomi',
  de: 'Deutsch',
  sv: 'Svenska',
  no: 'Norsk',
  fr: 'Français',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'fi' || value === 'de' || value === 'sv' || value === 'no' || value === 'fr';
}

export function getLangFromUrl(url: URL): Lang {
  const [, firstSegment] = url.pathname.split('/');
  return isLang(firstSegment) ? firstSegment : defaultLang;
}

export function getLocale(lang: Lang): string {
  if (lang === 'de') return 'de_DE';
  if (lang === 'sv') return 'sv_SE';
  if (lang === 'no') return 'nb_NO';
  if (lang === 'fr') return 'fr_FR';
  return lang === 'fi' ? 'fi_FI' : 'en_US';
}

export function getHtmlLang(lang: Lang): string {
  return lang === 'no' ? 'nb' : lang;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
