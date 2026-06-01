# KnitTools Website — CLAUDE.md

## Project

Astro 6 -staattinen sivusto. Neulontasovelluksen (Android) landing page + kuusi ilmaista selainpohjaista työkalua (2 laskuria + 4 referenssitaulukkoa) + artikkeliosio.

## Commands

```bash
npm run dev      # Dev-serveri (localhost:4321)
npm run build    # Staattinen build → dist/
npm run preview  # Preview buildattu versio
```

## Design System

### Colors

- Nykyinen editorial-paletti: `--paper` (#F4EAD9), `--paper-2` (#EADFC9), `--ink` (#2A1E17), `--ink-soft` (#4A382C), `--terracotta` (#A05038), `--sage` (#5B8072), `--walnut` (#6B4332), `--amber` (#C2703E), `--wheat` (#C4A661).
- Stripe-derived card palette on yhä käytössä korttien väreissä: `--stripe-terracotta`, `--stripe-rust`, `--stripe-sand`, `--stripe-brown`, `--stripe-teal`.
- Legacy-tokenit `--dark`, `--cream`, `--accent`, `--avocado`, `--mustard`, `--dusty-rose` ja `--bebas-*` ovat vielä olemassa vanhempien shared-tyylien takia. Älä tulkitse niitä merkiksi vanhasta Geist/Bebas-designista.
- Ei koskaan #000000 tai #FFFFFF.

### Fonts (self-hosted woff2, `/public/fonts/`)

| Fontti | Rooli | Muuttuja |
|--------|-------|----------|
| Lalezar | Display-otsikot, editorial H1/H2 | `--font-display`, `--serif` |
| General Sans 400/500/600 | Body, nav, labels, napit, metadata | `--font-body`, `--body-ed`, `--mono` |
| Teko 400/500 subset | KnitTools-wordmark/logo | `--font-logo` |

`BaseLayout` preloadittaa Lalezar, General Sans 400/500 ja Teko 500 -fontit.

### Typography

- Landingin ja tools-indexien isot otsikot käyttävät Lalezar-pohjaista `--serif`/`--font-display`-linjaa.
- Body, napit, labelit ja metadata käyttävät General Sans -linjaa (`--font-body`, `--body-ed`, `--mono`).
- `<em>` ja `.accent` käyttävät terracotta/burnt orange -korostusta.
- `--bebas-*`-nimiset tokenit ovat legacy-nimiä ja toimivat enää jaettuina koko-/tracking-tokenina.

### Buttons

- Primary (`.btn-primary`): suorakulmio (border-radius: 0), General Sans, uppercase, vahva tracking.
- ClosingCTA käyttää tummaa solid-nappia ja hoverissa terracotta-taustaa.
- Calculate/Estimate-napit ovat sivukohtaisesti scoped-tyyleissä.

### Removed visual systems

- `StripeRibbon.astro`, `showStripe`, `PhoneMockup.astro`, Three.js hero phone ja vanhat diagonaaliset feature-osiot eivät ole nykyisessä `src/components/`-rakenteessa.
- Stripe-nimiset värit ovat yhä korttipaletin tokeneita, eivät renderöity oikean reunan stripe-nauha.

## Routes

| Polku | Sivu |
|-------|------|
| `/` | Landing page |
| `/tools/` | Tools listing page (bento grid) |
| `/tools/cast-on-calculator` | Cast On Calculator |
| `/tools/yarn-estimator` | Yarn Estimator |
| `/tools/needle-size-chart` | Needle Size Chart |
| `/tools/yarn-weight-chart` | Yarn Weight Chart |
| `/tools/knitting-abbreviations` | Knitting Abbreviations |
| `/tools/knitting-size-charts` | Knitting Size Charts |
| `/articles` | Artikkelilista |
| `/articles/[slug]` | Artikkeli |

## Tools Listing Page (`/tools/`)

Bento grid -layout. Ylärivi: Cast On Calculator + Yarn Estimator (50/50). Alarivi 1: Yarn Weight Chart + Needle Size Chart. Alarivi 2: Knitting Size Charts + Knitting Abbreviations. CSS-luokat: `card-top-left`, `card-top-right`, `card-bl1`, `card-br1`, `card-bl2`, `card-br2`.

Kortit: stripe-paletin väritaustat (terracotta, rust, teal, sand, brown), terävät kulmat (border-radius: 0), Lalezar-otsikot ja General Sans -kuvaukset. Ei watermarkia, ei kategorialabeleita.

Tablet (≤1024px): 2-sarakkeinen. Mobiililla (≤768px): yksisarakkeinen. JSON-LD CollectionPage schema (6 työkalua). SEO-metatiedot.

`ToolsIndexPage.astro` renderöi tools-listaussivut kaikille 8 kielelle. Englannin index käyttää `reveal`-varianttia, lokalisoidut indexit säilyttävät oman mobiilikorkeutensa.

## Landing Page -rakenne (nykyinen)

Hero (editorial two-column, Teko KnitTools wordmark, signup card) → Marquee → NineTools (5 free + 3 Pro -korttia) → FreeToolsCallout → TrustSection → PullQuote → PricingCards → ClosingCTA → Footer

Landing käyttää nykyistä paper/ink-editorial-palettia. Oikean reunan stripe-nauhaa ei renderöidä nykyisessä koodissa.

**Huom (poistetut/ei nykyisessä komponenttipuussa):** FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave, FeatureLearn, FreeToolsMention, PhoneInset, ToolClosingCTA, StitchSeam, PhoneMockup, StripeRibbon ja ToolCard eivät ole nykyisiä `src/components/`-komponentteja. `Marquee` on käytössä etusivulla.

## Tool-sivujen rakenne

Hero (Lalezar H1, intro, back-link → tools index) → laskuri/taulukko-osio → SEO-sisältö → FAQ (`<details>/<summary>`) → Waitlist CTA (`data-waitlist-signup`) → Footer. Lokalisoidut tools-sivut käyttävät `LocalizedToolPage.astro`-pohjaa; englanninkieliset tool-sivut ovat edelleen omia `.astro`-sivujaan.

`src/scripts/waitlistSignup.ts` omistaa waitlist-submit-logiikan. Footerin työkalulinkit tulevat `src/i18n/tools.ts`-helperistä ja artikkelikategoriat `src/i18n/articles.ts`-helperistä.

## Gotchas

- JS-luodut DOM-elementit eivät saa Astron scoped data-attribuutteja → `:global()` CSS:ssä
- Globaali `a { color: var(--accent) }` voi yliajaa komponenttilinkkien värejä
- `global.css` sisältää vielä legacy stripe/safe-padding-tokenit, mutta nykyinen layout ei renderöi stripe-nauhaa.
- TrustSection näyttää hinnan €5.99 — tarkista ennen launchia
