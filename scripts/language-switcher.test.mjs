import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { routes } from "../src/i18n/routes.ts";

const EXPECTED_LANGS = ["en", "fi", "de", "sv", "no", "fr", "nl", "da"];

async function getLanguageOptionBuilder() {
  try {
    const navigation = await import("../src/i18n/navigation.ts");
    assert.equal(
      typeof navigation.buildLanguageOptions,
      "function",
      "the production language-option builder must exist",
    );
    return navigation.buildLanguageOptions;
  } catch (error) {
    assert.fail(`the production language-option builder must load: ${error}`);
  }
}

function readBuiltPage(route) {
  const relativePath = route === "/" ? "index.html" : `${route}index.html`;
  return fs.readFileSync(path.join("dist", relativePath), "utf8");
}

function primaryNavigation(html) {
  const match = html.match(
    /<nav class="nav-links" id="primary-navigation"[^>]*>([\s\S]*?)<\/nav>/,
  );
  assert.ok(match, "built page must contain the primary navigation");
  return match[1];
}

function languageLinks(markup) {
  return [...markup.matchAll(/<a\b[^>]*data-language-option="([^"]+)"[^>]*>/g)];
}

test("article and tool mappings produce all eight same-content destinations", async () => {
  const buildLanguageOptions = await getLanguageOptionBuilder();
  const articleOptions = buildLanguageOptions(
    {
      en: "/articles/gauge-swatch-step-by-step/",
      fi: "/fi/artikkelit/mallitilkun-neulominen-vaiheittain/",
      de: "/de/artikel/maschenprobe-stricken-schritt-fuer-schritt/",
      sv: "/sv/artiklar/sticka-provlapp-steg-for-steg/",
      no: "/no/artikler/strikke-provelapp-steg-for-steg/",
      fr: "/fr/articles/tricoter-un-echantillon-etape-par-etape/",
      nl: "/nl/artikelen/proeflapje-breien-stap-voor-stap/",
      da: "/da/artikler/strikkeproeve-trin-for-trin/",
    },
    "fi",
  );
  const toolOptions = buildLanguageOptions(routes.tool.castOnCalculator, "de");

  assert.deepEqual(
    articleOptions.map(({ lang, href, current }) => ({ lang, href, current })),
    [
      {
        lang: "en",
        href: "/articles/gauge-swatch-step-by-step/",
        current: false,
      },
      {
        lang: "fi",
        href: "/fi/artikkelit/mallitilkun-neulominen-vaiheittain/",
        current: true,
      },
      {
        lang: "de",
        href: "/de/artikel/maschenprobe-stricken-schritt-fuer-schritt/",
        current: false,
      },
      {
        lang: "sv",
        href: "/sv/artiklar/sticka-provlapp-steg-for-steg/",
        current: false,
      },
      {
        lang: "no",
        href: "/no/artikler/strikke-provelapp-steg-for-steg/",
        current: false,
      },
      {
        lang: "fr",
        href: "/fr/articles/tricoter-un-echantillon-etape-par-etape/",
        current: false,
      },
      {
        lang: "nl",
        href: "/nl/artikelen/proeflapje-breien-stap-voor-stap/",
        current: false,
      },
      {
        lang: "da",
        href: "/da/artikler/strikkeproeve-trin-for-trin/",
        current: false,
      },
    ],
  );
  assert.equal(
    articleOptions.find(({ lang }) => lang === "de")?.href,
    "/de/artikel/maschenprobe-stricken-schritt-fuer-schritt/",
    "Finnish must switch directly to the German equivalent",
  );
  assert.deepEqual(
    toolOptions.map(({ lang }) => lang),
    EXPECTED_LANGS,
  );
  assert.equal(
    toolOptions.find(({ lang }) => lang === "fi")?.href,
    "/fi/tyokalut/silmukkalaskuri/",
  );
  assert.equal(toolOptions.filter(({ current }) => current).length, 1);
});

test("aliases, x-default, absolute same-site URLs, and unavailable options are normalized", async () => {
  const buildLanguageOptions = await getLanguageOptionBuilder();
  const options = buildLanguageOptions(
    {
      en: "https://knittoolsapp.com/articles/example/",
      no: "https://knittoolsapp.com/no/artikler/eksempel/",
      nb: "https://knittoolsapp.com/no/artikler/duplicate/",
      "x-default": "https://knittoolsapp.com/articles/example/",
    },
    "no",
  );

  assert.deepEqual(
    options.map(({ lang, htmlLang, href, current }) => ({
      lang,
      htmlLang,
      href,
      current,
    })),
    [
      {
        lang: "en",
        htmlLang: "en",
        href: "/articles/example/",
        current: false,
      },
      {
        lang: "no",
        htmlLang: "nb",
        href: "/no/artikler/eksempel/",
        current: true,
      },
    ],
  );
  assert.deepEqual(buildLanguageOptions(undefined, "en"), []);
  assert.deepEqual(
    buildLanguageOptions({ en: "/articles/example/" }, "en"),
    [],
  );
  assert.deepEqual(
    buildLanguageOptions(
      { en: "/articles/example/", fi: "/fi/artikkelit/esimerkki/" },
      "de",
    ),
    [],
    "a switcher without the rendered page's language cannot identify current state",
  );
});

test("built article navigation contains visible language links separate from head alternates", () => {
  const html = readBuiltPage("/articles/gauge-swatch-step-by-step/");
  const head = html.slice(0, html.indexOf("</head>"));
  const nav = primaryNavigation(html);
  const links = languageLinks(nav);

  assert.match(head, /<link rel="alternate" hreflang="fi"/);
  assert.match(nav, /data-language-switcher/);
  assert.equal(links.length, 8);
  assert.deepEqual(
    links.map((match) => match[1]),
    EXPECTED_LANGS,
  );
  assert.match(
    nav,
    /href="\/fi\/artikkelit\/mallitilkun-neulominen-vaiheittain\/"/,
  );
  assert.equal((nav.match(/aria-current="page"/g) ?? []).length, 1);
  assert.match(nav, /data-language-option="en"[^>]*aria-current="page"/);
});

test("built tool, index, and category pages expose their mapped equivalents", () => {
  const toolNav = primaryNavigation(
    readBuiltPage("/fi/tyokalut/silmukkalaskuri/"),
  );
  const indexNav = primaryNavigation(readBuiltPage("/de/werkzeuge/"));
  const categoryNav = primaryNavigation(
    readBuiltPage("/sv/artiklar/kategori/stickfasthet-och-berakningar/"),
  );

  assert.equal(languageLinks(toolNav).length, 8);
  assert.match(toolNav, /href="\/de\/werkzeuge\/maschenanschlag-rechner\/"/);
  assert.match(indexNav, /href="\/nl\/breitools\/"/);
  assert.match(
    categoryNav,
    /href="\/da\/artikler\/kategori\/strikkefasthed-og-beregninger\/"/,
  );
});

test("Norwegian markup uses the internal no option and Bokmal HTML semantics", () => {
  const html = readBuiltPage("/no/verktoy/oppleggskalkulator/");
  const nav = primaryNavigation(html);

  assert.match(html, /<html lang="nb">/);
  assert.equal(languageLinks(nav).length, 8);
  assert.match(
    nav,
    /data-language-option="no"[^>]*lang="nb"[^>]*hreflang="nb"[^>]*aria-current="page"/,
  );
  assert.doesNotMatch(nav, /data-language-option="nb"/);
  assert.doesNotMatch(nav, /data-language-option="x-default"/);
});

test("home and About stay English-only without an interactive switcher", () => {
  for (const route of ["/", "/about/"]) {
    const nav = primaryNavigation(readBuiltPage(route));
    assert.doesNotMatch(nav, /data-language-switcher/, route);
    assert.equal(languageLinks(nav).length, 0, route);
  }
});
