# KnitTools Website — Project Documentation

> Tämä dokumentti kuvaa koodin todellisen tilan (2026-04-18). Kaikki copy, luokat, tiedostopolut ja tokenit on varmistettu lähdekoodista.

## Overview

KnitTools on Android-neulontasovelluksen (pre-launch) markkinointisivusto + kuusi ilmaista selainpohjaista työkalua + (valmis, mutta tyhjä) artikkeliosio. Staattinen Astro 6 -sivusto, `@astrojs/sitemap`.

- **URL:** https://knittoolsapp.com (määritelty `astro.config.mjs` → `site`)
- **Tekijä:** Finnvek
- **Tila:** Pre-launch — hero ja CTA:t ohjaavat waitlist-lomakkeeseen, ei kauppalinkkejä
- **Hinta sivulla:** €8.99 launch price → €11.99 kaksi kuukautta launchin jälkeen (näkyy Hero-metassa, TrustSectionissa ja ClosingCTA:ssa)
- **Riippuvuudet (`package.json`):** `astro ^6.1.3`, `@astrojs/sitemap ^3.7.2`, `sharp ^0.33.5`, `three ^0.183.2`, `@types/three ^0.183.1`, `gsap ^3.15.0`, `@img/sharp-linux-x64 ^0.34.5`
- **Skriptit:** `npm run dev` (astro dev, :4321) · `npm run build` (astro build → `dist/`) · `npm run preview`

---

## Reitit ja layout-hierarkia

| Polku | Sivu | Tiedosto |
|-------|------|----------|
| `/` | Landing page | `src/pages/index.astro` |
| `/tools/` | Bento-listaussivu (6 korttia) | `src/pages/tools/index.astro` |
| `/tools/cast-on-calculator` | Cast On Calculator | `src/pages/tools/cast-on-calculator.astro` |
| `/tools/yarn-estimator` | Yarn Estimator | `src/pages/tools/yarn-estimator.astro` |
| `/tools/needle-size-chart` | Needle Size Chart | `src/pages/tools/needle-size-chart.astro` |
| `/tools/yarn-weight-chart` | Yarn Weight Chart | `src/pages/tools/yarn-weight-chart.astro` |
| `/tools/knitting-abbreviations` | Knitting Abbreviations | `src/pages/tools/knitting-abbreviations.astro` |
| `/tools/knitting-size-charts` | Knitting Size Charts | `src/pages/tools/knitting-size-charts.astro` |
| `/articles` | Artikkelilista | `src/pages/articles/index.astro` |
| `/articles/[...slug]` | Yksittäinen artikkeli | `src/pages/articles/[...slug].astro` |

Kaikki sivut käyttävät `PageLayout`ia `showStripe={true}` -propilla (artikkelisivut sisältyvät — tarkistettu lähteestä). Layout-hierarkia:

```
BaseLayout.astro
 └─ meta, OG, Twitter, favicon (.ico + .webp), font preload (geist-variable.woff2,
    bebas-neue.woff2, teko-500.ttf), IntersectionObserver (.reveal → .visible,
    threshold 0, rootMargin '0px 0px -20% 0px'), prefers-reduced-motion fallback,
    skip-link (#main-content)
    └─ PageLayout.astro
        ├─ StripeRibbon (jos showStripe)
        ├─ Navbar
        ├─ PageBrandMark
        ├─ <main id="main-content">  → <slot/>
        └─ Footer
            └─ ArticleLayout.astro (artikkeleille)
```

---

## Landing page (`/`, `src/pages/index.astro`)

Tiedostossa importoidaan **vain viisi komponenttia** (järjestys = sivun järjestys):

1. `Hero`
2. `NineTools`
3. `FreeToolsCallout`
4. `TrustSection`
5. `ClosingCTA`

Navbar, PageBrandMark, StripeRibbon ja Footer tulevat PageLayoutista.

### 1. Navbar (`src/components/Navbar.astro`)

- Fixed, `height: 80px`, `z-index: 100`, default transparent
- Scrollatessa (`window.scrollY > 10`) `.navbar--scrolled` → cream (`rgba(232, 228, 208, 0.85)`) + `backdrop-filter: blur(12px)`
- Linkit (kolme dark-pilleriä, Bebas Neue): `TOOLS` → `/tools/`, `ARTICLES` → `/articles`, **`JOIN THE WAITLIST`** → `#final-cta`
- Default: dark bg (`var(--dark)`), cream-teksti. Hover: ::before scaleX burnt-orange fill
- Scrolled-tila: outline-tyyli (transparent bg, dark border, dark teksti). Hamburger mobiililla (≤768px) → pudotusvalikko

### 2. PageBrandMark (`src/components/PageBrandMark.astro`)

- `position: fixed; top: 8px; left: 24px; z-index: 110`
- `<Image src={logoBadge} widths={[64,96,128,160]} sizes="(max-width: 768px) 64px, 132px"` → `src/assets/images/logo-badge.webp`
- Vieressä span "KnitTools" — Teko 500, `2.35rem`, uppercase, `color: var(--accent)`
- Mobiililla (≤768px): vain badge (64px), teksti `display: none`

### 3. StripeRibbon (`src/components/StripeRibbon.astro`)

Fixed oikean reunan nauha. Viisi pystyraitaa `.stripe-v`, idx 0 = oikeanpuoleisin. **Värit oikealta vasemmalle (idx 0→4):** teal, rust, sand, brown, terracotta.

```js
const colors = [
  { v: 'var(--stripe-teal)' },       // idx 0, oikean reunan raita
  { v: 'var(--stripe-rust)' },       // idx 1
  { v: 'var(--stripe-sand)' },       // idx 2
  { v: 'var(--stripe-brown)' },      // idx 3
  { v: 'var(--stripe-terracotta)' }, // idx 4, vasemman reunan raita
];
```

- Desktop: `--stripe-width-desktop: 275px`, `--stripe-column-width-desktop: 55px`
- Mobile (≤768px): `--stripe-width-mobile: 135px`, `--stripe-column-width-mobile: 27px`
- `z-index: 0`, `pointer-events: none`, `aria-hidden="true"`

### 4. Hero (`src/components/Hero.astro`)

- Taustaluokka: `.hero.dot-grid-cream`, min-height `calc(100vh - 80px)`
- Section-tag: `"A knitting toolkit for Android · launching soon"`
- H1: `Pick up where you <em class="accent-italic">left off.</em>`
- Kuvaus: *"The row you were on, the yarn you forgot, the pattern that made no sense at midnight. KnitTools remembers it all, so the only thing you need to do is keep knitting."*
- Waitlist-lomake (`#hero-signup-form`, `.waitlist-form`): email input + nappi **"Join the list"**
- Hero-meta: `"Lock in the launch price: €8.99 → €11.99 two months after launch"`
- Success-tila (`#hero-success`, `hidden`): *"You're in. We'll email you the moment it's ready."*
- Submit → `preventDefault`, piilota lomake, näytä success-viesti (client-side vain)
- Oikealla puolella puhelin:
  - **Desktop (≥769px):** `<canvas class="hero-phone-canvas">` → Three.js dynaaminen import. ExtrudeGeometry-runko (2.0×4.2×0.15), `MeshStandardMaterial(#111, metalness 0.7)`, screen-tekstuuri `counter-light.png`, CapsuleGeometry-punchhole. Kevyt animaatio: `rotation.x = 0.08 + sin(t*0.3)*0.03`, `rotation.y = -0.25 + sin(t*0.5)*0.1`. `astro:page-load` -kuuntelija uudelleenalustaa. Fallback catch-lohkossa → CSS PhoneMockup
  - **Mobile/reduced-motion:** `.hero-phone-fallback` → `<PhoneMockup>` CSS-toteutuksella perspektiivillä `rotateY(-8deg) rotateX(3deg)`

**Ei floating labels -komponenttia. Ei Google Play- tai Amazon Appstore -badgeja.** (Aiemmin oli, nyt poistettu.)

### 5. NineTools (`src/components/NineTools.astro`)

Numeroitu lista 01–09. Eyebrow "What's inside" + H2 "Nine tools that actually *talk to each other.*" Desktop: 2-sarakkeinen gridi. Jokaisella tool-entrylla: numero (stripe-paletin väri kiertäen), nimi + kursiivinen jatkolause, kuvaus, chip-pillit.

| # | Nimi + jatko | Chips |
|---|--------------|-------|
| 01 | Row counter *with memory.* | Voice · Undo · Timer |
| 02 | Pattern viewer *that follows along.* | PDF · AI HELP |
| 03 | Yarn scanner *for the label graveyard.* | SCAN · AI PARSE |
| 04 | Four calculators. | Cast-on · Gauge · Inc/dec · Yardage |
| 05 | Ravelry *properly integrated.* | RAVELRY · SECURE LOGIN |
| 06 | Reference *where you'd expect it.* | SEARCH · CHARTS |
| 07 | Progress photos. | GALLERY · FULL-RES |
| 08 | Insights *without the guilt.* | STREAKS · PACE |
| 09 | A widget *on your home screen.* | TAP · COUNT |

### 6. FreeToolsCallout (`src/components/FreeToolsCallout.astro`)

Yksinkertainen `<aside>`, yksi kappale: *"Not ready for the app? Try our free knitting tools right here:"* + inline-linkit **kaikkiin 6 työkaluun** (cast-on, yarn estimator, needle size, yarn weight, knitting size charts, knitting abbreviations). Keskittetty teksti, burnt-orange underline-linkit.

### 7. TrustSection (`src/components/TrustSection.astro`) — **NELJÄ itemiä**

Grid `grid-template-columns: repeat(4, 1fr)` ≥1024px, `repeat(2,1fr)` 768–1023px, `1fr` <768px. Jokainen item: label + headline (Geist 800, `<em class="accent-italic">` korostus) + body.

| Label | Headline | Body |
|-------|----------|------|
| `PRICE` | Pay once. *Own it.* | "€8.99 for the whole toolkit. After launch the price rises to €11.99, so if you're going to buy it, buy it early. No subscription, ever." |
| `PRIVACY` | No tracking. *No ads.* | "Your stash, your patterns, your pace. All on your device, none of it sold to anyone." |
| `OFFLINE` | Works *on the sofa.* | "Full row counter, pattern viewer, and stash, offline. WiFi drops mid-row? You won't notice." |
| `LANGUAGES` | Speaks *your language.* | "Six languages at launch, more on the way. Because knitting instructions shouldn't need a translator." |

### 8. ClosingCTA (`src/components/ClosingCTA.astro`)

- `id="final-cta"` (Navbarin "JOIN THE WAITLIST" linkittää tähän)
- `.closing-cta.dot-grid-cream`
- Section-tag: "Be there at launch"
- H2: `Where every stitch <em class="accent-italic">counts.</em>` (Geist 900, `clamp(3rem, 6.5vw, 6.875rem)`)
- Waitlist-lomake (`#cta-signup-form`): email + nappi **"Reserve my price"**
- Success: *"You're in. We'll email you the moment it's ready."*
- Meta-rivit alla (kolme kappaletta):
  - **€8.99 launch price** · rises to €11.99 two months after launch
  - **14-day free trial** · no credit card required
  - **Android 10 or newer** · no spam, one email at launch

**Ei `GET THE APP` -nappia, ei kauppabadgeja.**

### 9. Footer (`src/components/Footer.astro`)

Kolme saraketta + bottom-rivi.

| TOOLS | ARTICLES | APP |
|-------|----------|-----|
| Cast On Calculator | Gauge & Calculations (`?category=gauge`) | Launching soon (plain span) |
| Yarn Estimator | Yarn (`?category=yarn`) | Privacy (→ `https://finnvek.com/privacy`, ulkoinen) |
| Needle Size Chart | Needles (`?category=needles`) | |
| | Techniques (`?category=techniques`) | |
| | App & Tools (`?category=app`) | |

Bottom: `Finnvek · contact@finnvek.com · © 2026`. Mobile ja desktop varaavat oikean reunan (290px/145px) stripe-nauhalle marginaalina.

**Huom (puutteet footerissa):** TOOLS-sarake listaa vain 3/6 työkalusta. Yarn Weight Chart, Knitting Abbreviations ja Knitting Size Charts puuttuvat footerista. Artikkelikategoriat osoittavat reittiin joka ei suodata toistaiseksi mitään (kategoriaparametria ei käytetä `articles/index.astro`:ssa).

---

## Tool-sivut

### Yhteinen rakenne

Kaikki kuusi tool-sivua käyttävät samaa rakennetta:

1. **Cream hero** — Bebas Neue H1 uppercase, intro-teksti, back-link → `/tools/`
2. **Interaktiivinen osio** — laskuri / taulukko / haettava lista (per sivu)
3. **SEO-sisältö** — 3–5 H2-osiota
4. **FAQ** — `<details>/<summary>`, `faq-button.webp` nuoli-ikoni
5. **Waitlist-CTA** — "There's more in the app", email-lomake "Join Waitlist" -napilla, loading + success state
6. **Footer**

Komponentti `ToolClosingCTA.astro` on olemassa, **muttei käytössä millään sivulla** (korvattu waitlist-lomakkeella).

### Animaatiojärjestelmät

**Kaksi epäyhdenmukaista järjestelmää:**

- **GSAP + ScrollTrigger** — `cast-on-calculator`, `needle-size-chart`, `yarn-weight-chart`, `knitting-abbreviations`, `knitting-size-charts`. Luokat:
  - `.gs-h1` → per-character x-slide reveal
  - `.gs-hero`, `.gs-form` → opacity + y fade timeline
  - `.gs-clip-reveal` → `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`
  - `.gs-fade-up` → opacity 0 + y 24 → normaali
  - `.gs-faq-item` → staggered fade, accordion height-animaatio
- **IntersectionObserver (.reveal / .visible)** — `yarn-estimator` (sama kuin landing page)

### Cast On Calculator (`/tools/cast-on-calculator`)

- Syötteet: gauge (stitches / 10cm tai 4in, +/- spin-napit), desired width (+/- spin-napit), yksikkökytkin cm/inches
- Kaava: `(gauge / 10) × width` cm / `(gauge / 4) × width` inches, pyöristys lähimpään parilliseen
- SEO: 3 osiota (cast on -selitys, gauge, käyttöohjeet)
- FAQ: 5 kysymystä

### Yarn Estimator (`/tools/yarn-estimator`)

- Syötteet: project type (30+ vaihtoehtoa `<optgroup>`-kategorioissa: ADULT GARMENTS, CHILD GARMENTS, BABY GARMENTS, HATS, HANDS, FEET, NECK & SHOULDERS, BLANKETS, HOME), koko, yarn weight
- IntersectionObserver-animaatio (ei GSAP:ia)

### Needle Size Chart (`/tools/needle-size-chart`)

- 26 puikkokokoa. Sarakkeet: Metric (mm), US, UK/Canadian, Japanese, Yarn Weight
- Hakukenttä tunnistaa prefiksit "US 7", "UK 6", "JP 8" tai hakee kaikista sarakkeista
- SEO: 5 osiota (miksi 4 järjestelmää, metric-suositus, konversiovirheet, puikkokoko-lanka-pariutus, merkkittömien puikkojen mittaus)
- FAQ: 4 kysymystä
- JSON-LD: WebApplication + FAQPage

### Yarn Weight Chart (`/tools/yarn-weight-chart`)

- 8 CYC-kategoriaa (0 Lace – 7 Jumbo) laajennettavina kortteina. Jokaisessa: cyc-numero, nimi, regional-nimet (US/UK/AUS), gauge-vaihteluväli, neulasuositus (US + mm), WPI-vaihteluväli (merkkijono + min/max-numero), käyttötarkoitukset
- **WPI-työkalu** (`interface` mukaan): käyttäjä syöttää WPI-luvun → näyttää matchaavat kategoriat (käyttää `wpiMin/wpiMax`)
- SEO: H3-tason alasisältöjä nimikonfuusiosta (ply, worsted vs aran, DK vs 8-ply, regional clashes), kategoriasysteemin toiminta
- FAQ: 4 kysymystä
- JSON-LD: WebApplication + FAQPage

### Knitting Abbreviations (`/tools/knitting-abbreviations`)

- **54 lyhennettä** (varmennettu grepillä)
- Kategoriat: All, Cast On/Bind Off, Increases, Decreases, Cables, Lace, General, Stitch Patterns
- Haku toimii lyhenteellä tai tekniikan nimellä; yhdellä lyhenteellä voi olla useita kategorioita
- SEO: 4 H2-osiota (miten lyhenteet toimivat, US vs UK erot, pattern-specific, kaavioiden symbolit)
- FAQ: 4 kysymystä
- JSON-LD: WebApplication + FAQPage

### Knitting Size Charts (`/tools/knitting-size-charts`)

- Kuusi paneelia (tab-navigaatio): Baby (3kk–24kk), Child (koot 2–10), Youth (12–16), Women (XS–XL + 2X–5X kahdessa taulukossa), Men (S–XL + 2X–5X), Accessories (pään ympärys, jalan pituus, käden pituus ikäryhmittäin)
- Yhdeksän mittausriviä per paneeli (Chest, Back Waist Length, Cross Back, Arm Length to Underarm, Upper Arm, Armhole Depth, Waist, Hips, Center Back Neck-to-Wrist)
- **CM/INCHES-kytkin** vaihtaa kaikkien taulukoiden yksiköt CSS-luokilla `show-cm` / `show-inches`
- FAQ + JSON-LD: WebApplication + FAQPage

### Tools-listing (`/tools/`, `src/pages/tools/index.astro`)

Bento grid, 6 korttia:

| Rivi | Vasen | Oikea |
|------|-------|-------|
| 1 (iso) | `card-top-left` Cast On Calculator | `card-top-right` Yarn Estimator |
| 2 | `card-bl1` Yarn Weight Chart | `card-br1` Needle Size Chart |
| 3 | `card-bl2` Knitting Size Charts | `card-br2` Knitting Abbreviations |

- Taustat stripe-paletin väreistä `rgba(…, 0.88)` opacityllä, terävät kulmat (border-radius 0)
- Bebas Neue uppercase -otsikot, Geist-kuvaukset `var(--dark)`
- Hover: opacity 0.88 → 0.94
- Tablet ≤1024px: 2-sarakkeinen · Mobile ≤768px: 1-sarakkeinen
- JSON-LD: CollectionPage (6 työkalua)

---

## Artikkelit

- Content collection: `src/content.config.ts`, `glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' })`
- **Zod-skeema:** `title: string`, `description: string`, `publishDate: coerce.date`, `updatedDate?: coerce.date`, `tags: string[] default []`, `draft: boolean default false`
- `src/content/articles/` — tyhjä, ei artikkeleita
- `/articles` listaa artikkelit tai näyttää "coming soon" empty-staten jos lista tyhjä
- Yksittäinen artikkeli: `ArticleLayout.astro` → header (title, date, updated, tags) → `.prose`-wrapper → app CTA-kortti
- Footerin `/articles?category=xxx` -linkit johtavat listaan mutta `?category`-parametri **ei suodata mitään** toistaiseksi

---

## Design system

### Väripaletti (`src/styles/global.css`)

| Token | Hex / arvo | Käyttö |
|-------|------------|--------|
| `--dark` | `#2E2A26` | Footer-reuna, waitlist-napit, dark-tekstit |
| `--dark-deep` | `#262320` | (määritelty, ei aktiivista käyttöä cream-sivulla) |
| `--dark-surface` | `#3A3531` | (määritelty, ei käyttöä tällä hetkellä) |
| `--cream` | `#E8E4D0` | Sivun body-tausta, navbar-scrolled |
| `--cream-muted` | `#D4D0BD` | Pillit, reunat, placeholder |
| `--accent` | `#C45100` | Burnt orange — pääkorostus, linkit, labelit |
| `--accent-hover` | `#A84500` | Hover-tila |
| `--accent-soft` | `rgba(196,81,0,0.15)` | Focus-glow, tulosten tausta |
| `--stripe-terracotta` | `#A05038` | Stripe (idx 4), diagonaalitaustat |
| `--stripe-rust` | `#C2703E` | Stripe (idx 1) |
| `--stripe-sand` | `#C4A661` | Stripe (idx 2), `--label-on-dark`, `--accent-on-dark` |
| `--stripe-brown` | `#6B4332` | Stripe (idx 3) |
| `--stripe-teal` | `#5B8072` | Stripe (idx 0), `--accent-cool`, diagonaali vasemmalta |
| `--accent-warm` | `var(--stripe-rust)` | Alias |
| `--accent-cool` | `var(--stripe-teal)` | Hero/CTA success-viesti |
| `--accent-earth` | `var(--stripe-sand)` | Alias |
| `--avocado` | `#8BA44A` | Sekundääriaksentti |
| `--mustard` | `#C9A435` | Tertiääriaksentti |
| `--dusty-rose` | `#B8908F` | Kvartaariaksentti |
| `--text-on-dark` | `#E8E4D0` | |
| `--text-on-dark-muted` | `#B8B4A4` | |
| `--text-on-light` | `#2E2A26` | |
| `--text-on-light-muted` | `#5C5750` | Body-teksti cream-taustalla, footer-linkit |
| `--label-on-light` | `var(--accent)` | Trust/section labelit |
| `--label-on-dark` | `var(--stripe-sand)` | |
| `--accent-on-light` | `var(--accent)` | |
| `--accent-on-dark` | `var(--stripe-sand)` | |

**Ei koskaan `#000000` tai `#FFFFFF`.** Sivun tausta on aina cream — osiot eivät aseta omaa taustaa (paitsi footer ja dark-korostukset).

### Typografia

Fontit self-hosted, `/public/fonts/`:

| Tiedosto | Fontti | Muuttuja | Rooli |
|----------|--------|----------|-------|
| `geist-variable.woff2` | Geist (variable 100–900) | `--font-display`, `--font-body` | H1, H2 (800–900), body (400/500/700) |
| `bebas-neue.woff2` | Bebas Neue | `--font-label` | H3, section-tagit, nav-napit, napit, tool-sivujen H1, tools-korttien otsikot |
| `teko-400.ttf`, `teko-500.ttf` | Teko | `--font-logo` | PageBrandMark "KnitTools" -teksti |

Preloadataan `BaseLayoutissa`: geist-variable, bebas-neue, teko-500. **Ei DMSerifDisplay-jäämiä enää** (poistettu hakemistosta).

Tyyppiasteet (CSS custom propertit):

- H1 runko-sivuilla: `clamp(3rem, 6.5vw, 6.875rem)`, line-height 1.0, letter-spacing -0.03em
- H2: `clamp(2.5rem, 5vw, 5rem)`, line-height 1.05, letter-spacing -0.02em
- `--bebas-ui-size: 1.05rem`, `--bebas-ui-weight: 400`, `--bebas-ui-tracking: 2.5px`
- `--type-body-lg: clamp(1.12rem, 1.6vw, 1.32rem)` · `--type-body-md: 1rem` · `--type-body-sm: 0.98rem`
- `<em>` ja `.accent` → burnt orange korostus; `.accent-italic` → kursivoitu burnt orange

### Layout-tokenit

```css
--container-page-max: 1200px;
--container-content-max: 1100px;
--container-compact-max: 900px;
--container-narrow-max: 800px;
--container-text-max: 720px;
--container-copy-max: 620px;
--container-form-max: 420px;

--section-padding-y-mobile: 100px;
--section-padding-y-desktop: 140px;
--section-padding-x-mobile: 20px;
--section-padding-x-desktop: 48px;
--section-padding-y-compact: 48px;

--safe-pr-desktop: clamp(48px, calc(320px - (100vw - 1400px) / 2), 320px);
--safe-pr-mobile:  clamp(20px, calc(155px - (100vw - 1400px) / 2), 155px);
```

Safe-pr-tokenit käytetään sisällön oikeareunaan, jotta stripe-nauha ei peitä tekstiä.

### Napit

- `.btn-primary` — outline, burnt-orange reunus, transparent bg, border-radius 0, Bebas Neue. Hover: solid burnt-orange fill
- `.signup-btn` — solid burnt orange, square corners (hero)
- `.waitlist-btn` — dark bg, dark border, cream-teksti, Bebas Neue (kaikki waitlist-lomakkeet)

### Breakpointit

- `≤768px` = mobile
- `≥769px` = desktop
- Tools-listing ja TrustSection lisäksi `≥1024px` = full desktop (4-kolumn vs 2-kolumn)

---

## Komponenttihakemisto (`src/components/`)

| Komponentti | Käyttö |
|-------------|--------|
| `PageBrandMark.astro` | Kiinteä logo — PageLayout |
| `Navbar.astro` | Kiinteä navigaatio — PageLayout |
| `Footer.astro` | PageLayout |
| `StripeRibbon.astro` | Kiinteä oikean reunan nauha — PageLayout (jos `showStripe`) |
| `Hero.astro` | index.astro |
| `NineTools.astro` | index.astro |
| `FreeToolsCallout.astro` | index.astro |
| `TrustSection.astro` | index.astro |
| `ClosingCTA.astro` | index.astro |
| `PhoneMockup.astro` | Hero (fallback), CastOnCalculator, YarnEstimator |
| `ToolCard.astro` | cast-on-calculator, yarn-estimator (laskuriosio) |
| `CastOnCalculator.astro` | cast-on-calculator.astro |
| `YarnEstimator.astro` | yarn-estimator.astro |
| **Käyttämättömät** | FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave, FeatureLearn, Marquee, FreeToolsMention, PhoneInset, StitchSeam, ToolClosingCTA — kaikki olemassa, ei importtia millään sivulla |

### Dot grid -taustakuvio

Global-luokat `.dot-grid-cream` ja `.dot-grid-dark` (`global.css`). `::before` pseudo-elementti SVG-pisteillä. Käytössä: Hero (.hero.dot-grid-cream), ClosingCTA (.closing-cta.dot-grid-cream). Dark-variantti tällä hetkellä ei aktiivista käyttöä (ToolClosingCTA käyttämätön).

**Gotcha:** scoped CSS:ssä täytyy käyttää `background-color` (ei `background` shorthand) tai pseudo-elementti ei näy.

### Scroll reveal (IntersectionObserver)

`BaseLayoutissa`: `.reveal` → `.visible`, threshold 0, rootMargin `0px 0px -20% 0px`. Variantteja: `.reveal-left`, `.reveal-right`, viiveet `.reveal-delay-1…4` (80–320ms). Kunnioittaa `prefers-reduced-motion: reduce` (kaikki näkyvät heti).

### GSAP + ScrollTrigger

Importataan per-sivu (`cast-on-calculator`, `needle-size-chart`, `yarn-weight-chart`, `knitting-abbreviations`, `knitting-size-charts`). Luokat yllä kohdassa *Animaatiojärjestelmät*. FAQ-accordion: toggle `gsap.to`/`gsap.set` height + opacity.

---

## Kuvat ja assetit

### `src/assets/images/` (Astron prosessoimat)

```
articles-banner.png      (artikkelilistan header)
counter-light.png        (hero Three.js screen-tekstuuri)
craft-table-flatlay.webp
faq-button.png / .webp   (FAQ-summary-ikoni)
hero-yarn-pattern.webp
logo-badge.webp          (PageBrandMark)
logo-simple.png
tools-dark.png
yarn-card-light.png
yarn-shelf.png
```

### `public/images/illustrations/` (11 SVG-kuvitusta)

`abbreviations.svg`, `cast-on-needles.svg`, `chart-symbols.svg`, `gauge-converter.svg`, `increase-decrease.svg`, `needle-reference.svg`, `row-counter.svg`, `size-charts.svg`, `yarn-card.svg`, `yarn-measuring.svg`, `yarn-scanner.svg`

### `public/`

`favicon.ico`, `favicon.svg`, `favicon.webp` (vain `.ico` ja `.webp` linkataan BaseLayoutissa), `robots.txt`, `knit-texture.png`, `craft-table-flatlay.webp`

---

## Tiedostorakenne

```
src/
├── assets/images/           (Astron prosessoimat, 11 tiedostoa)
├── components/              (23 .astro-tiedostoa, 11 käytössä)
├── content/
│   └── articles/            (tyhjä)
├── content.config.ts        (Zod-skeema)
├── layouts/
│   ├── ArticleLayout.astro
│   ├── BaseLayout.astro
│   └── PageLayout.astro
├── pages/
│   ├── index.astro
│   ├── articles/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── tools/
│       ├── index.astro
│       ├── cast-on-calculator.astro
│       ├── yarn-estimator.astro
│       ├── needle-size-chart.astro
│       ├── yarn-weight-chart.astro
│       ├── knitting-abbreviations.astro
│       └── knitting-size-charts.astro
└── styles/global.css

public/
├── fonts/                   (geist-variable.woff2, bebas-neue.woff2, teko-400.ttf, teko-500.ttf)
├── images/illustrations/    (11 SVG)
├── images/                  (muita)
├── favicon.ico / .svg / .webp
└── robots.txt
```

Juurihakemisto sisältää lisäksi lukuisia markdown-spec-tiedostoja (01-content-and-copy.md, design-overhaul.md, knittools-landing-v6-*.md jne) — nämä ovat aiempia suunnitteluohjeita, ei koodin osia.

---

## SEO ja accessibility

- Canonical URL, OG (og-image `public/images/og-image.png` — varmista että tiedosto on olemassa), Twitter summary_large_image
- Sitemap.xml automaattisesti `@astrojs/sitemap`-integraatiolla
- JSON-LD: CollectionPage (tools listing), WebApplication + FAQPage (kaikki 5 reference-sivua — cast-on poislukien)
- Skip-to-content-linkki (`.skip-link` → `#main-content`)
- `aria-label` / `aria-live` / `aria-hidden` / `aria-expanded` tarvittaessa
- `prefers-reduced-motion: reduce` → .reveal-elementit saavat `.visible` heti, Three.js ei alusta

---

## Tunnetut puutteet (koodissa on, tarkista ennen launchia)

1. **Footer-työkalulinkit epätäydelliset** — vain Cast On, Yarn Estimator, Needle Size Chart. Puuttuvat: Yarn Weight Chart, Knitting Abbreviations, Knitting Size Charts
2. **Artikkelikategoriasuodatus ei toimi** — `/articles?category=xxx` ohjaa listaan mutta parametria ei lueta
3. **OG-kuva** — `/images/og-image.png` viitataan BaseLayoutissa; varmista että polku on olemassa `public/images/og-image.png`
4. **Animaatioepäyhdenmukaisuus** — Yarn Estimator käyttää IntersectionObserveria, muut 5 tool-sivua GSAP:ia. Kevyt koodipaino
5. **10 käyttämätöntä komponenttia** `src/components/`-hakemistossa (FeatureX×5, Marquee, FreeToolsMention, PhoneInset, StitchSeam, ToolClosingCTA) — voisi siivota
6. **Landing pagella ei ole kauppabadgeja** (aiempi dokumentti mainitsi ne) — tämä on tarkoituksellista pre-launch-tilassa, mutta varmista että `Navbar` ja `ClosingCTA` saavat Google Play -linkit oikeaan aikaan
7. **Hinta `€8.99 → €11.99`** esiintyy 3 paikassa (Hero-meta, TrustSection PRICE, ClosingCTA meta) — yksi totuuslähde puuttuu, muutokset on tehtävä kaikkiin kolmeen

---

## Kehityshistoria (lyhyt)

- v1–v3: varhaiset tyylikokeilut (Lora, Playfair, wine/gold glassmorphism)
- v4: DM Serif Display + Bebas Neue + Creato Display, dark/cream/burnt orange, PhoneMockup feature layout
- v5: Satoshi + Outfit, stripe ribbon oikeaan reunaan, diagonal sections
- v6: Cream-pohjainen layout, email signup hero:ssa, Three.js 3D-puhelin, osiokohtaiset aksenttivärit, suora pystynauha (ei L-muotoa)
- v7: Geist korvasi Fraunces/Figtree/Outfit, /tools/ bento grid
- v8: Teko korvasi Geistin logofonttina. PageBrandMark oma fixed-komponentti. Needle Size Chart lisätty. ToolClosingCTA korvattu waitlist-lomakkeella. GSAP + ScrollTrigger cast-on & needle
- v9: Yarn Weight Chart, Knitting Abbreviations, Knitting Size Charts lisätty. Tools-listing 6 korttiin
- v10: Landing uudelleenrakennettu. FeatureX + Marquee korvattu NineTools-komponentilla. FreeToolsCallout aside. 4-osainen TrustSection. ClosingCTA:sta poistettu kauppanapit, korvattu waitlist-lomakkeella + meta-tiedoilla
