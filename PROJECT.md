# KnitTools Website — Project Documentation

> Tila 2026-06-01. Tämä dokumentti kuvaa nykyistä checkoutia, ei tavoitetilaa.
> Tarkastetut lähteet: `package.json`, `package-lock.json`,
> `astro.config.mjs`, `src/pages/`, `src/components/`, `src/i18n/`,
> `src/content.config.ts`, `src/content/articles/`, `src/config/`,
> `src/styles/`, `public/`, `scripts/` ja `sonar-project.properties`.

## Overview

KnitTools Website on Astro 6 -staattinen sivusto Android-neulontasovelluksen
pre-launch-markkinointiin, ilmaisille selainpohjaisille neuletyökaluille ja
monikieliselle artikkelisisällölle.

- **URL:** `https://knittoolsapp.com`
- **Tekijä:** Finnvek
- **Tila:** pre-launch. Hero ja CTA:t keräävät waitlist-sähköposteja, eikä
  sivustolla ole Google Play -kauppalinkkiä.
- **Pääsisältö:** landing page, `/about/`, 6 ilmaista työkalua, 38 artikkelia
  per kieli, 8 julkista sivustokieltä.
- **Sisältömäärä checkoutissa:** 304 artikkelitiedostoa:
  `en`, `fi`, `de`, `sv`, `no`, `fr`, `nl`, `da` = 38 kpl/kieli. Kaikissa
  kahdeksassa kielessä `draft: false` = 38 ja `draft: true` = 0.
- **Tuotantobuildin odotettu sivumäärä:** 411 HTML-sivua, kun kaikki nykyiset
  julkaistut kieliversiot generoidaan.
- **Hinnoittelu UI:ssa:** launch-hinta + regular-hinta alueellisen tierin
  mukaan, 14 päivän trial, launch-label `Summer 2026`.
- **Signup-endpoint:** `https://api.finnvek.com/subscribe`, käytössä Herossa ja
  `ClosingCTA`-komponentissa. Lomakkeissa on honeypot-kenttä `website`.

## Dependencies

`package.json` määrittelee version ranget, ja `package-lock.json` kertoo
nykyisen asennetun/resolvoidun version.

| Paketti            | `package.json` | `package-lock.json` |
| ------------------ | -------------- | ------------------- |
| `astro`            | `^6.1.3`       | `6.2.1`             |
| `@astrojs/sitemap` | `^3.7.2`       | `3.7.2`             |
| `sharp`            | `^0.33.5`      | `0.33.5`            |
| `gsap`             | `^3.15.0`      | `3.15.0`            |
| `@astrojs/check`   | `0.9.9`        | `0.9.9`             |
| `eslint`           | `10.3.0`       | `10.3.0`            |
| `prettier`         | `3.8.3`        | `3.8.3`             |
| `typescript`       | `6.0.3`        | `6.0.3`             |

Ennen dependency-päivityksiä tarkista npm registry ja virallinen dokumentaatio
uudelleen. Tämä dokumentti ei ole "latest version" -lähde.

## Commands

```bash
npm run dev            # Astro dev-serveri, oletus localhost:4321
npm run check          # astro check
npm run lint           # ESLint src/**/*.{astro,js,ts} + Astro/ESLint configit
npm run format         # Prettier write src, scripts ja root js/mjs/json
npm run format:check   # Prettier check samoille kohteille
npm run build          # Staattinen build dist/-kansioon
npm run preview        # Astro preview buildatulle versiolle
npm run verify         # check + lint + format:check + build
npm run test:seo       # Node-testit SEO-auditskripteille
npm run seo:audit      # Paikallisen dist/-buildin SEO- ja linkkiaudit
npm run seo:urls       # Paikallisen sitemapin vertailu live-sitemapiin
npm run seo:live       # Tuotannon live SEO-, sitemap-, robots- ja linkkiaudit
npm run seo:gate       # Lukee reports/-SEO-raportit strict release gateen
npm run verify:seo     # build + local SEO + URL-pariteetti + live SEO + gate
npm run verify:release # check + lint + format:check + test:seo + verify:seo
npm run astro          # alias: npm run verify
sonar                  # SonarCloud-skannaus, raportit reports/sonar*.*
```

`reports/`, `dist/`, `.astro/`, `.sonar/`, `.scannerwork/`, `.wrangler/` ja
`node_modules/` ovat gitignoressa. `AGENTS.md` on myös gitignoressa tässä
checkoutissa.

## Astro & Deployment

- `astro.config.mjs`: `site: "https://knittoolsapp.com"`, `output: "static"`,
  `trailingSlash: "always"`, `build.assets: "_assets"`,
  `markdown.shikiConfig.theme: "github-light"` ja `@astrojs/sitemap`.
- `public/_redirects`: `/sitemap.xml /sitemap-index.xml 301`.
- `public/robots.txt`: sallii kaiken ja osoittaa
  `https://knittoolsapp.com/sitemap-index.xml`.
- `public/security.txt`: security disclosure -tiedosto.
- Tuotantodeploy tehdään Cloudflare Pages Direct Uploadina:
  `npx wrangler pages deploy ./dist --project-name knittoolsapp --branch main`.
- Ennen deployta projektiohjeen mukaan commitoidaan ja pushataan GitHubiin,
  varmistetaan `git rev-list --left-right --count HEAD...@{u}` = `0 0`, ja
  deployataan sama paikallinen commit.

## Layout Architecture

```text
BaseLayout.astro
  - global.css import
  - canonical, hreflang, OG, Twitter, favicons, font preloadit
  - Cloudflare Web Analytics script
  - reveal IntersectionObserver
  - alueellisen hinnoittelun client-script (/cdn-cgi/trace + navigator fallback)

PageLayout.astro
  - välittää metadata-propit BaseLayoutille
  - renderöi Navbar, <main id="main-content"> ja Footer
  - showStripe-prop on rajapinnassa, mutta sitä ei käytetä

ArticleLayout.astro
  - PageLayout + Article JSON-LD
  - lokalisoitu byline/päivämäärä/kategorianimi
  - ClosingCTA variant="page"
```

`BaseLayout`in `lang` käyttää sisäistä `Lang`-tyyppiä. Norja on sisäisesti
`no`, mutta `getHtmlLang("no")` palauttaa `nb` ja locale on `nb_NO`.

## Routing & i18n

Englanti on oletuskieli ilman `/en/`-prefiksiä. Älä lisää julkisia `/en/`
-reittejä, koska nykyiset englanninkieliset URLit ovat indeksoituja. Reittien
pääasiallinen lähde on `src/i18n/routes.ts`.

| Lang | Tools index               | Articles index    | Category prefix             | Article prefix    |
| ---- | ------------------------- | ----------------- | --------------------------- | ----------------- |
| `en` | `/tools/`                 | `/articles/`      | `/articles/category/`       | `/articles/`      |
| `fi` | `/fi/tyokalut/`           | `/fi/artikkelit/` | `/fi/artikkelit/kategoria/` | `/fi/artikkelit/` |
| `de` | `/de/werkzeuge/`          | `/de/artikel/`    | `/de/artikel/kategorie/`    | `/de/artikel/`    |
| `sv` | `/sv/verktyg/`            | `/sv/artiklar/`   | `/sv/artiklar/kategori/`    | `/sv/artiklar/`   |
| `no` | `/no/verktoy/`            | `/no/artikler/`   | `/no/artikler/kategori/`    | `/no/artikler/`   |
| `fr` | `/fr/outils/`             | `/fr/articles/`   | `/fr/articles/categorie/`   | `/fr/articles/`   |
| `nl` | `/nl/breitools/`          | `/nl/artikelen/`  | `/nl/artikelen/categorie/`  | `/nl/artikelen/`  |
| `da` | `/da/strikkevaerktoejer/` | `/da/artikler/`   | `/da/artikler/kategori/`    | `/da/artikler/`   |

### Tool Routes

| Työkalu        | `en`                             | `fi`                              | `de`                                       | `sv`                                      | `no`                                        | `fr`                                       | `nl`                                 | `da`                                                |
| -------------- | -------------------------------- | --------------------------------- | ------------------------------------------ | ----------------------------------------- | ------------------------------------------- | ------------------------------------------ | ------------------------------------ | --------------------------------------------------- |
| Cast On        | `/tools/cast-on-calculator/`     | `/fi/tyokalut/silmukkalaskuri/`   | `/de/werkzeuge/maschenanschlag-rechner/`   | `/sv/verktyg/upplaggningskalkylator/`     | `/no/verktoy/oppleggskalkulator/`           | `/fr/outils/calculateur-mailles-a-monter/` | `/nl/breitools/opzetcalculator/`     | `/da/strikkevaerktoejer/opslagsberegner/`           |
| Yarn Estimator | `/tools/yarn-estimator/`         | `/fi/tyokalut/lankamuunnin/`      | `/de/werkzeuge/garnbedarfsrechner/`        | `/sv/verktyg/garnatgangskalkylator/`      | `/no/verktoy/garnberegner/`                 | `/fr/outils/estimateur-quantite-laine/`    | `/nl/breitools/garenberekenaar/`     | `/da/strikkevaerktoejer/garnberegner/`              |
| Needle Sizes   | `/tools/needle-size-chart/`      | `/fi/tyokalut/puikkokoot/`        | `/de/werkzeuge/nadelstaerken-tabelle/`     | `/sv/verktyg/stickstorlekar/`             | `/no/verktoy/pinnestorrelser/`              | `/fr/outils/tailles-aiguilles/`            | `/nl/breitools/naalddiktes/`         | `/da/strikkevaerktoejer/pindestoerrelser/`          |
| Yarn Weights   | `/tools/yarn-weight-chart/`      | `/fi/tyokalut/lankavahvuudet/`    | `/de/werkzeuge/garnstaerken-tabelle/`      | `/sv/verktyg/garntjocklekar/`             | `/no/verktoy/garntykkelser/`                | `/fr/outils/epaisseurs-de-fil/`            | `/nl/breitools/garendiktes/`         | `/da/strikkevaerktoejer/garntykkelser/`             |
| Abbreviations  | `/tools/knitting-abbreviations/` | `/fi/tyokalut/neulelyhenteet/`    | `/de/werkzeuge/strickabkuerzungen/`        | `/sv/verktyg/stickforkortningar/`         | `/no/verktoy/strikkeforkortelser/`          | `/fr/outils/abreviations-tricot/`          | `/nl/breitools/breiafkortingen/`     | `/da/strikkevaerktoejer/strikkeforkortelser/`       |
| Size Charts    | `/tools/knitting-size-charts/`   | `/fi/tyokalut/neulekokotaulukot/` | `/de/werkzeuge/groessentabellen-stricken/` | `/sv/verktyg/storlekstabeller-stickning/` | `/no/verktoy/storrelsestabeller-strikking/` | `/fr/outils/tableaux-tailles-tricot/`      | `/nl/breitools/maattabellen-breien/` | `/da/strikkevaerktoejer/stoerrelsestabeller-strik/` |

### Route File Patterns

- English tools and articles use static `src/pages/tools/*.astro`,
  `src/pages/articles/index.astro`, `src/pages/articles/category/[slug].astro`
  and `src/pages/articles/[...slug].astro`.
- FI, DE and SV article index/category/detail routes are split into separate
  page files.
- NO, FR, NL and DA article index/category/detail routes are combined in one
  catch-all file per language: `src/pages/{lang}/.../[...slug].astro`.
- NL and DA tool routes are generated through catch-all tool page files and
  component maps. Other localized tool routes use separate `.astro` files.

## Content Collection

`src/content.config.ts` defines one collection: `articles`.

Required frontmatter fields:

- `title`
- `description`
- `category`
- `publishDate`

Optional/defaulted frontmatter fields:

- `browserTitle`
- `updatedDate`
- `categoryOrder`
- `tags` default `[]`
- `draft` default `false`
- `lang` default `en`
- `translationKey`
- `readTime`

Valid categories are:

| Slug                 | English label        | Current count per language |
| -------------------- | -------------------- | -------------------------- |
| `gauge-calculations` | Gauge & Calculations | 6                          |
| `yarn`               | Yarn                 | 9                          |
| `needles`            | Needles              | 3                          |
| `techniques`         | Techniques           | 13                         |
| `app-tools`          | App & Tools          | 7                          |

`src/i18n/articles.ts` contains 38 `articleTranslations` entries. Each entry
has paths for all 8 published languages. English root articles do not need
`translationKey` in frontmatter; localized articles currently have it.

Draft policy still exists in route files: localized article routes include
drafts in dev (`import.meta.env.DEV`) and filter drafts out in production.
Current checkout has no draft article in any language.

## Localization

Shared i18n modules:

- `src/i18n/config.ts`: languages, `Lang`, locales, `getHtmlLang`, `SITE_URL`.
- `src/i18n/routes.ts`: public route source of truth.
- `src/i18n/articles.ts`: article translation map, localized fallback paths and
  route slug helpers.
- `src/i18n/ui.ts`: shared UI strings for nav/footer/article chrome/CTA.
- `src/i18n/tools.ts`: generic tools index helper.
- `src/i18n/dutchTools.ts`: NL tool routes and labels.
- `src/i18n/danishTools.ts`: DA tool routes, labels and tool alternates.

Term guides at repository root:

- `FINNISH_TRANSLATION_GUIDE.md`
- `GERMAN_TRANSLATION_STYLE_GUIDE.md`
- `SWEDISH_TRANSLATION_GUIDE.md`
- `NORWEGIAN_TRANSLATION_GUIDE.md`
- `FRENCH_TRANSLATION_GUIDE.md`
- `DUTCH_TRANSLATION_GUIDE.md`
- `DANISH_TRANSLATION_GUIDE.md`

## Landing Page

`src/pages/index.astro` renders:

1. `Hero`
2. `Marquee`
3. `NineTools`
4. `FreeToolsCallout`
5. `TrustSection`
6. `PullQuote`
7. `PricingCards`
8. `ClosingCTA`

Navbar and Footer come from `PageLayout`.

Current landing JSON-LD is an `@graph` with:

- `Organization`: Finnvek, `contact@finnvek.com`, social `sameAs` URLs.
- `SoftwareApplication`: KnitTools Android app, `publisher` Finnvek,
  `offers.price` from `getStructuredPrice()` and `priceCurrency: "USD"`.

`offers.availability` is not present in current code.

### Current Landing Components

- `Hero`: editorial two-column layout. Left side is a large Teko `KnitTools`
  wordmark and tagline. Right side is signup card. There is no phone mockup or
  Three.js hero phone in current `Hero.astro`.
- `Marquee`: terracotta strip with duplicated feature terms and 40s scroll
  animation.
- `NineTools`: 5 free cards and 3 Pro cards:
  - Free: Saved row counter, Pattern viewer with row notes, Four knitting
    calculators, Ravelry, Reference library.
  - Pro: Progress photos, Project stats, Home-screen counter widget.
  - The language chip row lists 11 app languages, but the website UI/content is
    currently public in 8 languages.
- `FreeToolsCallout`: links to the 6 public free tools.
- `TrustSection`: 3 principle cards: Price, Privacy, Languages.
- `PricingCards`: Free card has 7 bullets, Pro card has 4 bullets in current
  code. The visible copy includes "No subscription, ever.".
- `ClosingCTA`: localized waitlist CTA with the same Finnvek API endpoint.

## Design System

### Fonts

Self-hosted files in `public/fonts/`:

| File                     | Role                                      |
| ------------------------ | ----------------------------------------- |
| `lalezar.woff2`          | display font, `--font-display`, `--serif` |
| `general-sans-400.woff2` | body 400                                  |
| `general-sans-500.woff2` | body 500                                  |
| `general-sans-600.woff2` | body 600                                  |
| `teko-400-subset.woff2`  | logo 400 subset                           |
| `teko-500-subset.woff2`  | logo 500 subset                           |

`BaseLayout` preloads Lalezar, General Sans 400/500 and Teko 500.

### Colors and Tokens

Current editorial palette in `src/styles/global.css`:

```css
--paper: #f4ead9;
--paper-2: #eadfc9;
--ink: #2a1e17;
--ink-soft: #4a382c;
--terracotta: #a05038;
--sage: #5b8072;
--walnut: #6b4332;
--amber: #c2703e;
--amber-hover: #a05f32;
--wheat: #c4a661;
```

Stripe-derived card palette is still used by tool/article cards:

```css
--stripe-terracotta: #a05038;
--stripe-rust: #c2703e;
--stripe-sand: #c4a661;
--stripe-brown: #6b4332;
--stripe-teal: #5b8072;
```

Legacy variables still exist in `global.css` (`--dark`, `--cream`, `--accent`,
`--avocado`, `--mustard`, `--dusty-rose`, `--bebas-*`) because older shared
tool styles and token names still reference them. The actual font aliases now
point to Lalezar / General Sans / Teko, not Geist or Bebas Neue.

`body.landing` defines an inverted dark palette, but `src/pages/index.astro`
does not pass `bodyClass="landing"`, so the landing currently renders with the
default paper/ink palette.

## Tool Pages

Public tools:

1. Cast On Calculator
2. Yarn Estimator
3. Needle Size Chart
4. Yarn Weight Chart
5. Knitting Abbreviations
6. Knitting Size Charts

`/tools/` uses a 12-column bento grid:

- Top row: Cast On + Yarn Estimator, each 6 columns.
- Bottom row: four reference cards, each 3 columns.
- <=1024px: 2 columns.
- <=768px: 1 column.
- JSON-LD `CollectionPage` with 6 `ItemList` entries.

Shared implementation notes:

- `CastOnCalculator.astro` and `YarnEstimator.astro` are shared calculator
  components.
- `ToolStructuredData.astro` emits `WebApplication` JSON-LD and optional
  `FAQPage` JSON-LD.
- `LocalizedToolPage.astro` is the shared localized tool page wrapper. It adds
  localized metadata, back link, tool slot, SEO content slot, FAQ and
  `ClosingCTA`.
- `FinnishToolPage.astro` is a legacy wrapper around `LocalizedToolPage` with
  `lang="fi"`.
- `WpiIdentifier.astro` is shared by all yarn-weight pages in all 8 languages.

## Articles

Article listing behavior:

- Index pages group articles by `CATEGORY_ORDER`.
- Each category preview shows the first 3 articles by `categoryOrder`.
- Category pages show all articles in that category.
- `ArticleCard` uses category color classes from `CATEGORY_COLORS`.

Article detail behavior:

- `ArticleLayout` emits Article JSON-LD.
- Canonical path comes from `getArticlePath()`.
- `alternates` comes from `getArticleAlternates()` when `translationKey` has a
  mapping.
- Date locale is language-specific (`fi-FI`, `de-DE`, `sv-SE`, `nb-NO`,
  `fr-FR`, `nl-NL`, `da-DK`, fallback `en-US`).

## Brand, Footer and Structured Data

`src/config/brand.ts` is the shared brand source for:

- `SITE_URL`
- Finnvek URL
- `contact@finnvek.com`
- `Organization` and `SoftwareApplication` IDs
- Instagram, TikTok, YouTube and X profile URLs

Footer behavior:

- Tools links are localized for all 8 languages.
- Article category links are localized for all 8 languages.
- App section contains "Launching soon", `/about/` and Finnvek privacy policy.
- Footer bottom shows Finnvek link and `contact@finnvek.com`.
- Footer seal image is `/logo.webp`.

`/about/` is an English About/Finnvek trust page with `Organization`,
`SoftwareApplication`, `AboutPage` and `BreadcrumbList` JSON-LD.

## SEO & Release Tooling

Scripts in `scripts/`:

- `seo-audit.mjs`
- `live-seo-audit.mjs`
- `url-parity-audit.mjs`
- `seo-release-gate.mjs`
- matching `node --test` files for those scripts
- `migrate-articles.mjs`
- `fix-em-dashes.py`

`sonar-project.properties`:

- project key `Insaner1980_KnitTools-website`
- organization `insaner1980`
- sources: `src`, `scripts`, `astro.config.mjs`, `eslint.config.mjs`
- source/content/build/cache/report exclusions are configured, including
  `src/content/articles/**`, `dist`, `.astro`, `.sonar`, `.scannerwork`,
  `reports` and `output`.

## Current Code Gotchas

- `PageLayout.showStripe` is still accepted but not used. There is no
  `StripeRibbon.astro` component in `src/components/` in this checkout.
- There is no `PhoneMockup.astro`, `FeatureKnit`, `FeatureOrganize`,
  `FeatureCalculate`, `FeatureScanSave`, `FeatureLearn`, `PhoneInset`,
  `ToolClosingCTA`, `FreeToolsMention` or `StitchSeam` component in current
  `src/components/`.
- `src/styles/typography.css` comments still mention old Geist/Bebas roles.
  Treat the variable values in `global.css` as truth.
- `global.css` still contains old safe stripe spacing variables, but current
  layout does not render a stripe ribbon.
- JavaScript-created DOM and slotted calculator/table content still need
  `:global()` selectors inside Astro scoped CSS.
- Visible product claims such as "No ads", "No tracking", "No subscription" and
  "nothing uploaded anywhere" are current marketing copy in code, not evidence
  of a released app implementation.
- Keep English root routes unprefixed and keep translated article hreflang
  mappings out of `articleTranslations` until a future draft is approved.

## Git State Notes

- Current checked branch during this audit: `codex/fi-localization-review`.
- Remote: `origin` -> `https://github.com/Insaner1980/KnitTools-website.git`.
- `.gitignore` excludes local reports, caches, generated builds, logs,
  `.claude/`, `.codex`, `.playwright-mcp/`, local asset dump folders and
  `AGENTS.md`.

## Recent Current-State History

- 2026-06-01: `PROJECT.md` resynced to current checkout after multilingual
  localization expansion. The project now has 8 public website languages and
  304 published article files.
- 2026-05-31: Dutch articles completed; Danish tools completed; Danish article
  parity work continued in the checkout history/memory. Current source now has
  all 38 DA articles as published files.
- 2026-05-28 to 2026-05-31: English root article audit and FI/SV/NO/FR/DE/NL/DA
  localization parity work expanded the article and route surface.
- 2026-05-06 to 2026-05-08: SEO title/description and tool copy updates, plus
  manual Cloudflare Pages deploys.
- 2026-04-24 to 2026-05-02: v11 editorial redesign, Lalezar/General Sans/Teko
  font stack, SEO article system, sitemap redirect and security disclosure.
