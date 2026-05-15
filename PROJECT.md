# KnitTools Website — Project Documentation

> Tila 2026-05-14. Landing page on v11 retro-tyyliin (Lalezar display + General Sans body + Teko logo). Tool-sivut perivät samat fontit jaettujen CSS-muuttujien kautta. 38 SEO-artikkelia 5 kategoriassa julkaistu myös hollanniksi, regionaalinen hinnoittelu (US/EU/UK + maakohtaiset tierit) käytössä, MailerLite-signup integroitu.

## Overview

KnitTools on Android-neulontasovelluksen (pre-launch) markkinointisivusto + kuusi ilmaista selainpohjaista työkalua + 38 julkaistua SEO-artikkelia. Staattinen Astro 6 -sivusto.

- **URL:** https://knittoolsapp.com (Cloudflare Pages, manuaalinen `wrangler pages deploy ./dist`)
- **Tekijä:** Finnvek
- **Tila:** Pre-launch — hero ja CTA:t ohjaavat waitlist-lomakkeeseen, ei kauppalinkkejä
- **Pro-hinta (default/US):** $9.99 launch → $12.99 kaksi kuukautta launchin jälkeen
- **Pro-hinta (EU):** €8.99 → €11.99
- **Pro-hinta (UK):** £7.99 → £10.99
- **Pro-hinnat (maakohtaiset tierit):** NO, SE, DK, IS, CH, CA, AU, NZ, JP, BR, IN, MX, ZA
- **Trial:** 14 päivää, ei luottokorttia
- **Launch-kuukausi (UI-merkkijono):** "May 2026"
- **Riippuvuudet (`package.json`):** `astro ^6.1.3`, `@astrojs/sitemap ^3.7.2`, `sharp ^0.33.5`, `gsap ^3.15.0`
- **Skriptit:** `npm run dev` (:4321) · `npm run build` → `dist/` · `npm run preview`
- **Astro-config:** `site: 'https://knittoolsapp.com'`, `output: 'static'`, `build.assets: '_assets'`, `@astrojs/sitemap` integraatio

---

## Reitit

| Polku | Sivu |
|-------|------|
| `/` | Landing page (v11 retro) |
| `/tools/` | Tools bento (6 kortin grid) |
| `/tools/cast-on-calculator` | Cast On Calculator |
| `/tools/yarn-estimator` | Yarn Estimator |
| `/tools/needle-size-chart` | Needle Size Chart |
| `/tools/yarn-weight-chart` | Yarn Weight Chart |
| `/tools/knitting-abbreviations` | Knitting Abbreviations |
| `/tools/knitting-size-charts` | Knitting Size Charts |
| `/articles` | Artikkelilista (5 kategoriasectionia) |
| `/articles/[...slug]` | Yksittäinen artikkeli |
| `/articles/category/[slug]` | Kategorian arkistosivu (5 kategoriaa) |
| `/nl/breitools/` | Hollanninkielinen tools bento |
| `/nl/breitools/[slug]` | Hollanninkieliset työkalusivut (6) |
| `/nl/artikelen/` | Hollanninkielinen artikkelilista |
| `/nl/artikelen/[...slug]` | Hollanninkielinen artikkeli |
| `/nl/artikelen/categorie/[slug]` | Hollanninkielinen kategoria |

---

## Layout-hierarkia

```
BaseLayout.astro
 ├─ <head>: title/desc/canonical, OG, Twitter, favicons (.ico/.webp),
 │  fonttien preload (lalezar.woff2, general-sans-400/500.woff2, teko-500-subset.woff2)
 ├─ <body class={bodyClass}>: skip-link, .page-wrapper, IntersectionObserver
 │  .reveal-luokille, regionaalisen hinnan client-script (Cloudflare /cdn-cgi/trace
 │  → tier-resoluutio → RegionalPrice-komponentin data-{tier}-attribuutteihin)
 └─ PageLayout.astro (Navbar + <main id="main-content"> + Footer)
     └─ index.astro            → Hero, Marquee, NineTools, FreeToolsCallout,
     │                           TrustSection, PullQuote, PricingCards, ClosingCTA
     └─ tools/index.astro      → Tools bento + ClosingCTA(variant="page")
     └─ tools/<slug>.astro     → Tool-sivu (cream hero, calc/chart, SEO, FAQ, CTA)
     └─ articles/index.astro   → Kategoria-sectionit + ClosingCTA
     └─ articles/category/[slug].astro → ArticleCard-grid
     └─ nl/breitools/[...slug].astro → NL tools index + 6 tool pages
     └─ nl/artikelen/[...slug].astro → NL article index/category/detail
     └─ ArticleLayout.astro    → yksittäinen artikkeli (.prose-typografia)
```

`PageLayout`-prop `showStripe` on yhä rajapinnassa (vanhojen tool-sivujen vuoksi) mutta **no-op** — StripeRibbon ja PageBrandMark on poistettu käytöstä.

---

## Landing page (v11 retro)

`src/pages/index.astro` importoi 7 osiokomponenttia + Hero, lisää SoftwareApplication JSON-LD:n (offers.price US-hinnasta, availability `https://schema.org/PreOrder`, inLanguage 11 kieltä) ja kääri sisällön `PageLayout`-elementillä.

### Osioiden järjestys

1. `Hero`
2. `Marquee`
3. `NineTools`
4. `FreeToolsCallout`
5. `TrustSection`
6. `PullQuote` (lainaus: *"One tool for every row. One price for every needle. One app for every project."*)
7. `PricingCards`
8. `ClosingCTA` (variant `"hero"`)

(Navbar + Footer tulevat PageLayoutista.)

> Huom: `index.astro` **ei** aseta `bodyClass="landing"`, joten landing renderöityy oletuspaletilla (paper-tausta + ink-teksti). `body.landing`-skooppi (käännetty paletti, ink-tausta) on `global.css`:ssä määriteltynä mutta ei tällä hetkellä käytössä.

---

## Design-järjestelmä

### Värit (`src/styles/global.css :root`)

**v11 editorial -paletti (landing + uudet tool-sivut käyttävät näitä):**

```css
--paper:       #F4EAD9;   --paper-2:     #EADFC9;
--ink:         #2A1E17;   --ink-soft:    #4A382C;
--terracotta:  #A05038;   --sage:        #5B8072;
--walnut:      #6B4332;   --amber:       #C2703E;
--amber-hover: #A05F32;   --wheat:       #C4A661;
```

**Stripe-johdannainen paletti (käytössä jaettuna kaikille korttivariantteille):**

```css
--stripe-terracotta: #A05038;  --stripe-rust:  #C2703E;
--stripe-sand:       #C4A661;  --stripe-brown: #6B4332;
--stripe-teal:       #5B8072;
```

**Vanha v10-paletti (`--dark`, `--cream`, `--accent` #C45100, `--avocado`, `--mustard`, `--dusty-rose`) on yhä määritelty taustaa varten — tool-sivujen vanhat scoped-tyylit tarvitsevat osan näistä.**

### Typografia

| Muuttuja | Fontti | Käyttö |
|----------|--------|--------|
| `--font-display` / `--serif` | **Lalezar** 400 | H1, H2, H3, kortit, drop caps |
| `--font-body` / `--body-ed` / `--mono` | **General Sans** 400/500/600 | Body, eyebrow-labelit, napit, microcopy |
| `--font-logo` | **Teko** 400/500 | Hero-wordmark, navbar-brand |

Lalezar-display on yksipainoinen — italic-emfaasi (`<em>`) renderöityy selaimen synthesoidulla kursiivilla. `--mono`-alias osoittaa General Sansiin (ei oikeaa monospacea), koska "mono"-roolissa käytetään small-caps-tracking-otsikoita.

`<style>`-typografian rinnalla `src/styles/typography.css` määrittelee semanttiset tokenit (`--ts-h1-tool-size`, `--ts-h2-size`, `--ts-faq-summary-weight` jne.) joita tool-sivut yhä hyödyntävät.

### Fontit (`public/fonts/`)

| Tiedosto | Käyttö |
|----------|--------|
| `lalezar.woff2` | Display 400 (preloaded) |
| `general-sans-400.woff2` | Body 400 (preloaded) |
| `general-sans-500.woff2` | Body 500 (preloaded) |
| `general-sans-600.woff2` | Body 600 |
| `teko-400-subset.woff2` | Logo 400, KnitTools-sanamerkin subset |
| `teko-500-subset.woff2` | Logo 500, KnitTools-sanamerkin subset (preloaded) |

### Pisteruudukko-utility

`.dot-grid-paper` lisää 3% opaciteetilla radial dot patternin — utility on määritelty komponenttitasolla (Hero, ClosingCTA), ei globaalisti.

---

## Komponentit

### Navbar (`src/components/Navbar.astro`)
- Fixed top, `z-index: 50`, transparent default. Scrolli (`window.scrollY > 80`) → `paper`-tausta + `ink`-bottom-border
- Vasen: `<a class="brand-mark">KnitTools</a>` Teko-fontilla, fontti-koko 28px (mob 22px)
- Oikea: Tools / Articles / **Join the list** (outline-pill `1.5px ink`-reunuksella, hover → ink-fill cream-tekstillä)

### Hero (`src/components/Hero.astro`) — ei puhelinmockia
Editorial-tyylinen 2-palstainen layout (1.5fr / 1fr, mob: 1 sarake):

- **Vasen (`.hero-text`):**
  - Eyebrow "An Android app for knitters" (terracotta, General Sans 600 small-caps)
  - **Wordmark** "Knit / Tools" kahdessa rivissä, Teko 500, `clamp(64px, 12vw, 180px)`, line-height 0.75 — hallitseva visuaalinen ankkuri
  - Tagline italic: *"Every knitting tool. **One app.**"* (terracotta korostus)
- **Oikea (`<aside class="signup-card">`):** paper-2-tausta, 1.5px ink reunus
  - Card-head "Coming May 2026" (terracotta small-caps)
  - Card-copy "Be first to know when KnitTools launches on Google Play."
  - Email-form (action `#`, JS-handler postaa `https://api.finnvek.com/subscribe` JSON-bodylla `{ email, source: 'knittools', website }`, `website` on honeypot)
  - Submit-nappi "Notify me at launch" (ink solid -nappi, hover → terracotta)
  - Card-caption: hinta launch-tier + permanent-tier `RegionalPrice`-komponentilla, 14-day trial, `RegionalPricingNote`
  - Success: "You're in. We'll email you at launch."
  - Error: "Something went wrong. Please try again." / "Network error. Please check your connection."

### Marquee (`src/components/Marquee.astro`)
- **Terracotta-tausta** `#A05038`, cream-teksti `#F4EAD9`
- 20 termiä duplikoituna (Projects, Row counter, Pattern viewer, Saved patterns, Yarn label scanner, My Yarn, Gauge calculator, Cast on calculator, Yarn estimator, Increase / decrease, Needle sizes, Size charts, Abbreviations, Chart symbols, Ravelry search, Progress photos, Session history, Insights, Row counter widget, Voice commands)
- General Sans 500 small-caps 13px, cream-pisteet erottimina
- 40 s `@keyframes scroll`, pausee `prefers-reduced-motion`-tilassa

### NineTools (`src/components/NineTools.astro`)
Section-eyebrow "Features", H2 *"Every tool, talking to each other."*, manifesto-paragraph alla.

Sisäinen rakenne kahdessa tieressä **tier-headerillä** (`.tier-head`: tier-label terracotta + tier-count + ohut `ink`-viiva loppuun):

- **Free forever (5 korttia):**
  - Counter (span 2, chip-rivi 11 kielellä: English, Suomi, Svenska, Dansk, Norsk, Nederlands, Deutsch, Français, Italiano, Português, Español)
  - Pattern (amber-tint)
  - Calc
  - Ravelry (walnut-tint)
  - Reference
- **Pro `<RegionalPrice phase="launch" />` (5 korttia):**
  - Stash (sage-tint, span 2)
  - Photos
  - Insights
  - Widget (terracotta-tint)
  - **AI-kortti** `<article class="tool-card tint-sage wide ai-card">` koko leveys (`grid-column: 1 / -1`):
    - Vasen (`.ai-intro`): H3 *"AI that knows knitting"*, intro-paragraph, mic-area (sonar-renkaat + mic-ikoni + "Listening"-status)
    - Oikea: 4-rivinen `.ai-list` ilman numerointia (Live voice on the counter / Pattern intelligence / Stash and project memory / Voice or text journal)
    - Alaosa (`.ai-broadcast`): JS-piirretty 44-bar `big-wave` -aaltografiikka (4 random-keyframe-varianttia, pausee reduced-motion) + transcript-paneeli ("Transcript · Live", "Row 85", typing-loop YOU/AI dialogissa kolmen lauseparin yli)

Kortit: oletus `wheat`-tausta + ink-teksti, tint-variantit `tint-sage`, `tint-walnut`, `tint-amber`, `tint-terracotta`, `tint-ink` muuttavat värin paper-tekstiksi. Lalezar H3 (`clamp(1.5rem, 1.9vw, 1.9rem)`), General Sans 11px tag-label.

### FreeToolsCallout (`src/components/FreeToolsCallout.astro`)
Keskitetty 1120px max-width:
- Eyebrow "Free tools"
- H2 "Use them right here, no install."
- 6 pill-linkkiä stripe-väreillä: Cast On (terracotta), Yarn Estimator (amber), Yarn Weights (wheat — ink-teksti), Needle Sizes (sage), Size Charts (walnut), Abbreviations (paper-fill, ink-teksti)
- "See all tools →" italic-linkki `/tools/`:iin

### TrustSection (`src/components/TrustSection.astro`)
3-saraketta (mob 1), section-eyebrow "Principles", H2 *"What you can count on."*

| # | Eyebrow | Otsikko | Tint |
|---|---------|---------|------|
| 1 | Price | "Pay once. *Own it.*" | wheat-default |
| 2 | Privacy | "No tracking. *No ads.*" | sage |
| 3 | Languages | "Speaks *your language.*" | wheat-default |

Price-kortti renderöi `RegionalPrice phase="launch"` ja `phase="permanent"` + `RegionalPricingNote`.

### PullQuote (`src/components/PullQuote.astro`)
Aside-elementti, paper-tausta, 72px ylä-/alaviivat, 900px max-width. Lalezar `clamp(1.75rem, 3.5vw, 2.75rem)` italic, terracotta-typograafiset lainausmerkit. Props: `quote: string`, `attribution?: string`.

### PricingCards (`src/components/PricingCards.astro`)
2-saraketta (mob: 1, **Pro ensin** `order: -1`), `border-top: 1px solid ink`.

Section-eyebrow "Pricing", H2 *"Pay once. Own it."*

- **Free-kortti (`.card.free`, wheat-tausta):**
  - Label "Free", H3 "$0 forever"
  - 7 bulletia (`<ol>` ilman numerointia, border-top -erottimet): Row counter + session history · Pattern viewer (PDF or Ravelry) · Four calculators (gauge, cast-on, increases, yardage) · Ravelry sign-in · Reference library (needles, sizes, symbols, abbreviations) · Three projects · Eleven languages
  - Footnote "No account. No trial expiry. No card."
- **Pro-kortti (`.card.pro`, sage-tausta + cream-teksti, 2px cream-reunus):**
  - "Editor's Pick" -badge (paper-tausta, ink-reunus, oikea ylälaita)
  - Label "Pro", H3 `<RegionalPrice phase="launch" /> one-time`
  - Trial "14-day free trial. No credit card required."
  - "Everything in Free, plus:" -otsikko
  - 8 bulletia: Unlimited projects · Yarn OCR scanner. Unlimited stash · Progress photos, row-tagged · Insights, streaks, pace-over-time · Home-screen counter widget · Live AI voice on the counter (all eleven languages) · AI pattern help: read rows aloud, explain stitches, parse instructions · AI project summaries + voice journal
  - Footnote "Rises to `<RegionalPrice phase="permanent" />` 2 months after launch. Permanently. No subscription, ever. `<RegionalPricingNote />`"

### ClosingCTA (`src/components/ClosingCTA.astro`)
Props: `variant?: 'hero' | 'page'` (oletus `hero` = isompi typografia 6rem, `page` = pienempi 3.25rem ja 96px-padding käytössä `/tools/`, `/articles`, kategoriasivut, ArticleLayout).

- Eyebrow "Be there at launch" (terracotta)
- H2 *"Where every stitch counts."* (italic em terracotta)
- Form `id="join"` (Navbarin "Join the list" osoittaa tähän) — sama `https://api.finnvek.com/subscribe` -endpoint, honeypot, success: "Reserved. See you at launch.", meta "Free tier from day one. No card required."
- Submit-nappi "Reserve my price" (ink solid, hover terracotta)

### Footer (`src/components/Footer.astro`)
Paper-tausta, 1px ink top-border, 80px-padding desktop, kompakti mob.
- 3 saraketta + sealing-logo (`/logo.webp` 220×220, mob 140×140) flex-alignilla
  - **Tools** — kaikki 6 työkalua linkkeinä
  - **Articles** — 5 kategorialinkkiä (`/articles/category/{slug}`): Gauge & Calculations, Yarn, Needles, Techniques, App & Tools
  - **App** — "Launching soon" (italic ink-soft) + Privacy Policy → `https://finnvek.com/privacy#knittools`
- Footer-bottom: ohut viiva + copyright "© MMXXVI KnitTools. Finnvek." (Finnvek-linkki finnvek.com)
- `languages`-array (11 kieltä) on koodissa mutta ei renderöidy

### RegionalPrice + RegionalPricingNote
- `RegionalPrice.astro` renderöi `<span data-regional-price={phase} data-{tier}=...>`-elementin oletuksena US-hinnalla. `BaseLayout`-skripti hakee Cloudflare `/cdn-cgi/trace` -loc-koodin (1.2 s timeout, fallback `navigator.languages` -region), mappaa countryn tieriin (`COUNTRY_TO_TIER`-taulukko `pricing.ts`:ssa), ja päivittää `textContent`-arvon.
- `RegionalPricingNote.astro`: `<span data-regional-pricing-note hidden>Pricing on Google Play in your local currency.</span>` — näkyväksi kun tier === `default` (eli maa tunnistuu mutta sille ei ole omaa tieriä).

### PhoneMockup ja muut käyttämättömät
**Käytössä:** `Hero`, `Marquee`, `PullQuote`, `NineTools`, `FreeToolsCallout`, `TrustSection`, `PricingCards`, `ClosingCTA`, `RegionalPrice`, `RegionalPricingNote`, `Navbar`, `Footer`, `ArticleCard`, `ToolCard`, `CastOnCalculator`, `YarnEstimator`.

**Ei käytössä — vanha v10-koodi diskillä:** `PhoneMockup.astro`, `FeatureKnit`, `FeatureOrganize`, `FeatureCalculate`, `FeatureScanSave`, `FeatureLearn`, `FreeToolsMention`, `PhoneInset`, `ToolClosingCTA`, `StitchSeam`, `StripeRibbon`, `PageBrandMark`.

---

## Hinnoittelu (`src/config/pricing.ts`)

```ts
PRICING_TIERS = {
  US:      { launch: '$9.99', permanent: '$12.99' },
  EU:      { launch: '€8.99', permanent: '€11.99' },
  UK:      { launch: '£7.99', permanent: '£10.99' },
  NO:      { launch: 'NOK 99', permanent: 'NOK 129' },
  SE:      { launch: 'SEK 99', permanent: 'SEK 129' },
  DK:      { launch: 'DKK 69', permanent: 'DKK 89' },
  IS:      { launch: 'ISK 1290', permanent: 'ISK 1690' },
  CH:      { launch: 'CHF 9.90', permanent: 'CHF 12.90' },
  CA:      { launch: 'CAD 13.99', permanent: 'CAD 17.99' },
  AU:      { launch: 'AUD 14.99', permanent: 'AUD 18.99' },
  NZ:      { launch: 'NZD 16.99', permanent: 'NZD 21.99' },
  JP:      { launch: 'JPY 1500', permanent: 'JPY 1980' },
  BR:      { launch: 'BRL 24.90', permanent: 'BRL 32.90' },
  IN:      { launch: 'INR 299', permanent: 'INR 399' },
  MX:      { launch: 'MXN 99', permanent: 'MXN 139' },
  ZA:      { launch: 'ZAR 99', permanent: 'ZAR 139' },
  default: { launch: '$9.99', permanent: '$12.99' },
}
DEFAULT_PRICING_TIER  = 'US'      // SSR-renderöinnin lähtöarvo
FALLBACK_PRICING_TIER = 'default' // jos country tunnistuu mutta sille ei ole omaa tieriä
PRICING.trialDays = 14
PRICING.permanentPriceStartsAfterMonths = 2
PRICING.launchMonthLabel = 'May 2026'
LOCAL_CURRENCY_NOTE = 'Pricing on Google Play in your local currency.'
```

**EU-tieriin mappaavat maat:** AT, BE, HR, CY, EE, FI, FR, DE, GR, IE, IT, LV, LT, LU, MT, NL, PT, SK, SI, ES.
**UK:** GB. **US:** US. **Maakohtaiset tierit:** NO, SE, DK, IS, CH, CA, AU, NZ, JP, BR, IN, MX, ZA.
**Muut:** `default`-tier (US-hinnoittelu + näkyvä `RegionalPricingNote`).

`getStructuredPrice()` palauttaa aina USD-arvon JSON-LD:n `offers.price`-kenttään, irti UI-tieristä.

---

## Artikkelit (`src/content/articles/`)

- **38 julkaistua artikkelia** Markdown-tiedostoina, kaikki `draft: false` (`.gitkeep` mukana). Schema (`src/content.config.ts`) Zod-validoitu: `title`, `description`, `category` (enum 5 kategoriaa), `publishDate` (date), `updatedDate?`, `categoryOrder?` (1+ int), `tags[]`, `draft` default false, `readTime?`.
- **Loader:** `glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' })`
- **Kategoriat (`src/lib/categories.ts`):**
  - `gauge-calculations` → "Gauge & Calculations" → `card-terracotta`
  - `yarn` → "Yarn" → `card-rust`
  - `needles` → "Needles" → `card-teal`
  - `techniques` → "Techniques" → `card-sand`
  - `app-tools` → "App & Tools" → `card-brown`
- **Järjestys:** Listalla ja kategoriasivulla `categoryOrder` (asc, default 999).
- **Artikkelilista (`/articles`):** Otsikko + intro + kategoriapainikkeet (suorat linkit `/articles/category/{slug}`-sivuille), 5 kategoriasectionia á 3 ensimmäistä artikkelia + "View N more →" -linkki kategoriasivulle. Tyhjälle datalle empty-state ("Coming May 2026 / Articles are being written / Browse free tools →").
- **Kategoriasivu (`/articles/category/[slug]`):** `getStaticPaths` viidelle slugille, ArticleCard-grid 12-col responsive (1024px → 2col, 768px → 1col).
- **Yksittäinen artikkeli (`/articles/[...slug]`):** ArticleLayout, prose-typografia (Lalezar H2/H3, terracotta-linkit, list-markerit, italic blockquote-vasen-reunus, code paper-2-taustalla).
- **ArticleCard:** kategoriavärinen kortti (rgba 0.92), Lalezar otsikko, GS-runko, paper-fill rounded tag, julkaisupäivämäärä `<time>`-elementtinä.

---

## Tools-sivut

### `/tools/` — bento listing
- 12-col grid, ylärivi 50/50 isot kortit (Cast On terracotta + Yarn Estimator rust, min-height 220px)
- Alarivi 4 referenssikorttia 3-col-leveyksinä (Yarn Weight Chart sand, Needle Size Chart teal, Knitting Size Charts terracotta, Knitting Abbreviations brown)
- 1024px → 2-sarakkeinen, 768px → 1-sarakkeinen
- CollectionPage-JSON-LD mainEntity ItemList
- `ClosingCTA variant="page"` lopussa

### Yksittäinen tool-sivu (kaikki 6)
Rakenne yhtenäinen:
1. Tool-hero: eyebrow "← All tools" -linkki, H1 (Lalezar), intro
2. `<div class="form-card variant-{terracotta|rust|sand|teal|brown}">` jonka sisällä laskuri-/taulukkokomponentti (`CastOnCalculator`, `YarnEstimator`, tai sivun oma sisältö). Variantti määrittelee `--paper`/`--ink`/`--terracotta` -tokenit lapsille.
3. `.seo-content` H2/p-block (kolme aihealuetta)
4. `.tool-faq` `<details>/<summary>`-rakenteella, "+/–"-icon
5. `ClosingCTA variant="page"` lopussa (Waitlist-CTA)

Tool-sivut käyttävät yhä `PageLayout`-propia `showStripe={false}` (no-op).

---

## Layout & SEO

- **BaseLayout:** kanonisessa URL `https://knittoolsapp.com{canonicalPath}`, OG/Twitter-metat, og-image `/images/og-image.png`, favicon (.ico + .webp), Skip-link "Skip to content".
- **Sitemap:** `@astrojs/sitemap` generoi `/sitemap-index.xml` ja `/sitemap-0.xml` (52 URL:a). `public/_redirects`-tiedosto sisältää `/sitemap.xml /sitemap-index.xml 301` jotta Google Search Console löytää sitemapin standardi-URL:sta.
- **Robots.txt:** `public/robots.txt` (perustaso).
- **Security disclosure:** `public/security.txt` (RFC 9116).
- **Reveal-animaatio:** `.reveal`-luokat saavat IntersectionObserver-pohjaisen fade-in:n (rootMargin -20% bottom). `prefers-reduced-motion: reduce` -tilassa kaikki näytetään heti.

---

## Cloudflare Pages -deployment

- **Branch:** Cloudflare Pages on konfiguroitu deployaamaan `main`-haarasta direct upload -tilassa (ei Git-integraatiota). Ei custom env-vareja.
- **Workflow:** `npm run build` → `wrangler pages deploy ./dist --project-name knittoolsapp --branch main`
- `_redirects`-tiedosto kopioituu `public/` → `dist/` buildissa, Cloudflare käsittelee säännöt edge-tasolla.

---

## Git

- Aktiivinen kehityshaara: `v2-editorial`
- Production: `main` (mergetään PR:ien kautta v2-editorialista)
- Remote: `origin` → `https://github.com/Insaner1980/KnitTools-website`
- `.gitignore` jättää ulkopuolelle: `node_modules/`, `dist/`, `.astro/`, `.DS_Store`, `.remember/`, `.claude/`, `.codex`

---

## Tunnettuja puutteita

- Vanhat tool-sivujen scoped-CSS:t käyttävät yhä v10-tokeneita (`--accent`, `--cream`, `--bebas-*`) jaetun `typography.css`:n kautta. Visuaalinen yhtenäistys v11 retro -tyyliin tehdään palautteen perusteella per sivu.
- `PhoneMockup.astro` ja muut v10-feature-komponentit jäävät diskille — cleanup myöhemmin kun varmistetaan että mitään ei tarvita.
- `body.landing`-skooppi (kevyt dark-mode -inversio paletille) on `global.css`:ssä määritelty mutta `index.astro` ei aseta `bodyClass="landing"` — palette pysyy paper/ink-default-tilassa.
- `Footer.astro`:n `languages`-array on koodissa muttei renderöidy (mahdollisesti tulossa myöhemmin).
- `/articles`-sivulla `cat-nav-link`-painikkeet linkkaavat suoraan kategoriasivuihin (commit `72f21db`); aiempi anchor-versio poistettu.

---

## Kehityshistoria (uusin ensin)

- **2026-05-02 — `v2-editorial`** Linkitys: artikkelilistan kategoriapainikkeet osoittavat suoraan kategoriasivuihin (commit `72f21db`).
- **2026-05-02** Security disclosure (`public/security.txt`) lisätty.
- **2026-05-01** Marquee-leikkautuminen ensi-taitteen alarajalla korjattu kahdessa erässä.
- **2026-05-01** **38 artikkelin julkaisu:** `draft: true` poistettu kaikista artikkeleista (`4f55c7c`). `categoryRank` → `categoryOrder` -uudelleennimentä (`a78d067`) artikkelien järjestyksen yhtenäistämiseksi.
- **2026-05-01** Sitemap-redirect `_redirects`-tiedoston kautta `/sitemap.xml` → `/sitemap-index.xml` (Google Search Console -korjaus).
- **2026-04-25** **Display-fontti vaihdettu Caprasimosta Lalezariin** (`f354b5e`). Caprasimo poistettu fonteista; Lalezar 21 kB woff2 self-hosted, käytössä `--font-display`/`--serif`-tokenien kautta.
- **2026-04-25** **38 SEO-artikkelin lisäys** content collectioniin + 5 kategoriasivua (`db9d31a`).
- **2026-04-25** Komponenttien hienosäätö v11-editorial-tyyliin (`09ac2a2`).
- **2026-04-24** MailerLite-signup integraatio kaikkiin lomakkeisiin (`api.finnvek.com/subscribe`, honeypot-suoja, `1ca3e34`).
- **2026-04-24** Editoriaalisia hienosäätöjä — NineTools-manifesto + "Coming May 2026" (`19ab9a6`).
- **2026-04-24** v11-fonttipakkauksen siivous: `@img/sharp-linux-x64` poistettu, käyttämättömät fontti-source-hakemistot pois.
- **2026-04-23** **v11 retro redesign** (`49dacba`): Caprasimo + General Sans, hero/landing-uudistus, magazine-sanasto poistettu, modern Android PhoneMockup hetkeksi käyttöön (poistettu sittemmin Hero:sta).
- **v10 (pre-2026-04-20)** Geist + Bebas Neue + Teko -stack. Tool-sivujen baseline; tyypografia päivittyy CSS-muuttujien kautta automaattisesti.
