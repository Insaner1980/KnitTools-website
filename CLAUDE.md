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

- Dark: `--dark` (#2E2A26), `--dark-deep` (#262320)
- Cream: `--cream` (#E8E4D0), `--cream-muted` (#D4D0BD)
- Accent: `--accent` (#C45100) — burnt orange, pääkorostusväri
- Avocado: `--avocado` (#8BA44A) — Projects-osio, sekundäärinen aksentti
- Mustard: `--mustard` (#C9A435) — Calculators-osio, tertiäärinen aksentti
- Dusty Rose: `--dusty-rose` (#B8908F) — Yarn Scanner -osio, kvartäärinen aksentti
- Ei koskaan #000000 tai #FFFFFF
- Sivun tausta aina cream — ei tummia osiotaustoja (paitsi ref-kortit, footer)

### Fonts (self-hosted woff2, `/public/fonts/`)

| Fontti | Rooli | Muuttuja |
|--------|-------|----------|
| Geist (variable, 100-900) | H1, H2 (800-900), body (400-700) | `--font-display`, `--font-body` |
| Bebas Neue | Tags, labels, nav-linkit, napit, H3, tool-sivujen H1:t, tools-kortit | `--font-label` |
| Teko (500) | PageBrandMark "KnitTools" -logo | `--font-logo` |

Yksi variable woff2 (`geist-variable.woff2`) kattaa kaikki Geist-painot.

### Typography

- H1: `clamp(3rem, 6.5vw, 6.875rem)` — Geist 900. Massiivinen, hallitseva.
- H2: `clamp(2.5rem, 5vw, 5rem)` — Geist 900. Jokaisen osion dominantti elementti.
- `<em>` ja `.accent` → burnt orange korostus
- H3: Bebas Neue, uppercase
- Section tags: Bebas Neue, osiokohtaiset värit (accent/avocado/mustard/dusty-rose)

### Buttons

- Primary (`.btn-primary`): outline, suorakulmio (border-radius: 0), burnt orange reunus, transparent bg, Bebas Neue -fontti
- Calculate/Estimate -napit: solid burnt orange, square corners (scoped overridet sivuilla)

### Stripe Ribbon

`StripeRibbon.astro` — viisi pystysuoraa raitaa **oikeassa reunassa** kiinteänä (`position: fixed`). Värit oikealta vasemmalle: terracotta (#A05038), brown (#6B4332), sand (#C4A661), rust (#C2703E), teal (#5B8072). Leveys: 275px (5×55px), mobiililla 135px (5×27px). `z-index: 0`, osiot `z-index: 1`. Käytössä landing pagella ja kaikilla tools-sivuilla (`showStripe={true}` PageLayoutissa).

### Diagonal Sections (viistot taustaosiot)

Feature-osioissa (Your Projects, Calculators, Yarn Scanner) on viistoreunainen väritausta `::before` pseudo-elementillä. `clip-path: polygon()` luo diagonaalin kulman. Puhelimet istuvat diagonaalin PÄÄLLÄ (z-index: 2), teksti on cream-puolella.

| Osio | Suunta | Väri | Layout |
|------|--------|------|--------|
| Your Projects | Oikealta | Terracotta (#A05038) | Teksti vasemmalla, puhelimet oikealla |
| Calculators | Vasemmalta | Teal (#5B8072) | Puhelimet vasemmalla, teksti oikealla |
| Yarn Scanner | Oikealta | Terracotta (#A05038) | Teksti vasemmalla, puhelin oikealla |

- Oikealta tulevien diagonaalien `right: 275px` jättää tilan stripe-nauhalle
- Vasemmalta tulevat (teal) ulottuvat täysleveäksi
- Korkeus: 45% osion korkeudesta, mobiililla 40%

### Phone Mockups (realistiset Android-laitteet)

`PhoneMockup.astro` — realistinen Android-puhelin CSS:llä: tumma bezel (36px border-radius), **punch-hole -kamera** (piste, ei notch), Android status bar (aika + ikonit), gesture navigation bar. Sivuprofiilin syvyys CSS `transform-style: preserve-3d` + pseudo-elementit.

Hero-osiossa työpöydällä (≥769px) käytetään **Three.js** 3D-mallia, joka latautuu dynaamisesti. Puhelin keinuu kevyesti (sin-aalto rotaatiolla). Mobile/fallback: CSS PhoneMockup perspektiivikäännöksellä.

### Dot grid -taustakuvio

`dot-grid-cream` ja `dot-grid-dark` global-luokat — `::before` pseudo-elementti SVG-pisteillä. Käytössä: Hero, ClosingCTA (cream), ToolClosingCTA (dark). **Huom:** scoped CSS:ssä täytyy käyttää `background-color` (ei `background` shorthand) tai pseudo-elementti ei näy.

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

Kortit: stripe-paletin väritaustat (terracotta, rust, teal, sand, brown) rgba 0.88 opacityllä, terävät kulmat (border-radius: 0), Bebas Neue -otsikot (uppercase), Geist-kuvaukset `var(--dark)` -värillä. Hover: opacity 0.88→0.94. Ei watermarkia, ei kategorialabeleita.

Tablet (≤1024px): 2-sarakkeinen. Mobiililla (≤768px): yksisarakkeinen. JSON-LD CollectionPage schema (6 työkalua). SEO-metatiedot.

## Landing Page -rakenne (nykyinen)

Hero (cream, dot grid, email signup, "ONE APP." caps burnt orange, Three.js 3D puhelin / CSS fallback) → NineTools (9 app-ominaisuutta numeroituna listana, 2-sarakkeinen desktop) → FreeToolsCallout (yksinkertainen aside, linkit 6 ilmaistyökaluun) → TrustSection (heading + 3 itemiä) → ClosingCTA (cream, dot grid) → Footer (dark, kompakti, 3-sarakkeinen)

Kaikki osiot läpinäkyvällä taustalla — stripe-nauha näkyy oikeassa reunassa. Body cream -tausta.

**Huom (käyttämättömät komponentit):** FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave, FeatureLearn, Marquee, FreeToolsMention, PhoneInset, ToolClosingCTA, StitchSeam ovat olemassa mutta **eivät käytössä**.

## Tool-sivujen rakenne

Cream hero (H1 Bebas Neue, intro, back-link → /tools/) → Cream laskuri/taulukko-osio (ToolCard dark-overridella, cast-on ja yarn-estimator -sivuilla) → Cream SEO-sisältö → Cream FAQ (`<details>/<summary>`) → Waitlist CTA (cream, email-lomake, loading + success state) → Footer

## Gotchas

- `background` shorthand resetoi `background-image` → käytä `background-color` dot grid -osioissa
- JS-luodut DOM-elementit eivät saa Astron scoped data-attribuutteja → `:global()` CSS:ssä
- Globaali `a { color: var(--accent) }` voi yliajaa komponenttilinkkien värejä
- Osioilla EI saa olla `background: var(--cream)` — se peittää stripe-nauhan. Body hoitaa taustavärin.
- PhoneMockup-komponentissa scoped CSS viittaa sisäisiin elementteihin → käytä `:global()` wrapperia
- Stripe-nauhan safe padding: `--safe-pr-desktop` ja `--safe-pr-mobile` custom propertyt sisältöosioissa
- TrustSection näyttää hinnan €5.99 — tarkista ennen launchia
- Footerissa Needle Size Chart, Yarn Weight Chart ja Abbreviations linkkaavat `href="#"` — pitäisi osoittaa oikeisiin URL:eihin
