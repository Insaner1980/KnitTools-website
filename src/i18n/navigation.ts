import {
  SITE_URL,
  getHtmlLang,
  isLang,
  languages,
  type Lang,
} from "./config.ts";

export interface LanguageOption {
  lang: Lang;
  htmlLang: string;
  name: string;
  href: string;
  current: boolean;
}

type AlternatePaths = Readonly<Record<string, string | undefined>>;

function internalLang(value: string): Lang | undefined {
  const normalized = value.toLowerCase().replace("_", "-");
  if (normalized === "nb" || normalized === "nb-no" || normalized === "no-no") {
    return "no";
  }
  return isLang(normalized) ? normalized : undefined;
}

function localHref(href: string): string {
  const url = new URL(href, SITE_URL);
  if (url.origin !== new URL(SITE_URL).origin) return href;
  return `${url.pathname}${url.search}${url.hash}`;
}

export function buildLanguageOptions(
  alternates: AlternatePaths | undefined,
  currentLang: Lang,
): LanguageOption[] {
  if (!alternates) return [];

  const candidates = new Map<Lang, { href: string; exact: boolean }>();
  for (const [alternateLang, href] of Object.entries(alternates)) {
    if (!href || alternateLang.toLowerCase() === "x-default") continue;
    const lang = internalLang(alternateLang);
    if (!lang) continue;

    const exact = alternateLang.toLowerCase() === lang;
    const existing = candidates.get(lang);
    if (!existing || (exact && !existing.exact)) {
      candidates.set(lang, { href: localHref(href), exact });
    }
  }

  const options = (Object.keys(languages) as Lang[]).flatMap((lang) => {
    const candidate = candidates.get(lang);
    if (!candidate) return [];
    return [
      {
        lang,
        htmlLang: getHtmlLang(lang),
        name: languages[lang],
        href: candidate.href,
        current: lang === currentLang,
      },
    ];
  });

  return options.length > 1 && options.some(({ current }) => current)
    ? options
    : [];
}
