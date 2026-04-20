# Instructions: Rebuild landing page to match v11 wireframe (editorial style)

## Goal

Replace the current v10 landing page (`src/pages/index.astro`) with an editorial-style layout confirmed in the wireframe `KnitTools___Landing_Wireframe.html`. This is a **complete visual identity shift** for the landing page only — new fonts, new palette, new button shape. The old v10 identity (Geist + Bebas Neue + Teko, cream/burnt-orange, square-cornered buttons, stripe ribbon, fixed logo badge, diagonal sections) is being replaced, not preserved.

Tool pages (`/tools/*`) and article pages keep their existing visual system for now — they are out of scope. Design system unification across the site is separate future work.

## Source of truth

The wireframe HTML is authoritative for:
- Section order (8 sections, top to bottom)
- Exact copy (headings, eyebrows, body paragraphs, microcopy, button labels)
- Card content and hierarchy (9 tool cards, 3 trust columns, 2 pricing cards)
- Section backgrounds (paper / terracotta band / walnut band / paper / sage band / paper / paper with dot-grid / walnut band)

If anything here conflicts with the wireframe, the wireframe wins.

## Scope

Files to modify:
- `src/pages/index.astro` — full rebuild of section composition, page-level meta, JSON-LD
- `src/layouts/PageLayout.astro` — remove `StripeRibbon` and `PageBrandMark` usage; `showStripe` prop becomes a no-op, default to `false`
- `src/styles/global.css` — add new editorial design tokens alongside existing ones; add new font declarations
- `public/fonts/` — add self-hosted woff2 files for DM Serif Display, Lora, JetBrains Mono
- Components (rewrite contents in place; do not create parallel files):
  - `src/components/Hero.astro`
  - `src/components/Marquee.astro`
  - `src/components/NineTools.astro`
  - `src/components/FreeToolsCallout.astro`
  - `src/components/TrustSection.astro`
  - `src/components/ClosingCTA.astro`
  - `src/components/Footer.astro`
  - `src/components/Navbar.astro`
- New component:
  - `src/components/PricingCards.astro` (Free vs Pro info cards)

Files to leave alone:
- All tool pages under `src/pages/tools/` — continue using existing v10 palette and fonts
- All article infrastructure
- Legacy unused components (`FeatureKnit`, `FeatureOrganize`, `FeatureCalculate`, `FeatureScanSave`, `FeatureLearn`, `FreeToolsMention`, `PhoneInset`, `ToolClosingCTA`, `StitchSeam`) — remain on disk, cleanup separate

## Pre-work: removals

1. **Remove `StripeRibbon` from `PageLayout.astro`.** Right-edge stripe ribbon is dropped from v11. The component file can stay on disk (unused on landing; still referenced by `showStripe` prop call sites on tool pages — leave those call sites alone for now).
2. **Remove `PageBrandMark` from `PageLayout.astro`.** Fixed top-left logo badge is dropped. The component file can stay.
3. **Any `--safe-pr-desktop` / `--safe-pr-mobile` offsets that exist solely for the stripe ribbon**: set to `0` in the landing page context. Do not delete the variables globally — tool pages may still rely on them.

## Typography: fonts

Three new self-hosted fonts. Download woff2 files and place in `public/fonts/` following the existing project convention:

- **DM Serif Display** — regular + italic (two files)
- **Lora** — variable (one file covering 400–700 weights, regular + italic)
- **JetBrains Mono** — 400, 500, 700 weights (three files, or one variable file if available)

Sources: Google Fonts Helper (`gwfh.mranftl.com`) for self-hostable woff2 packages. Prefer `font-display: swap`.

Add `@font-face` declarations in `global.css`. Preload the three primary files in `BaseLayout.astro`:

```astro
<link rel="preload" href="/fonts/dm-serif-display.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/lora-variable.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/jetbrains-mono-500.woff2" as="font" type="font/woff2" crossorigin />
```

Do not import these fonts via Google Fonts CDN in production. Self-host matches existing project convention and keeps Core Web Vitals intact.

## Design tokens (global.css additions)

Add these alongside the existing v10 tokens. Do not delete the old tokens — tool pages still use them.

```css
:root {
  /* v11 editorial palette — used on the landing page */
  --paper:        #F4EAD9;   /* primary page background */
  --paper-2:      #EADFC9;   /* card fill on paper, subtle separation */
  --ink:          #2A1E17;   /* body text on paper */
  --ink-soft:     #4A382C;   /* muted text on paper */

  --terracotta:   #A05038;   /* marquee band + accent italics on paper */
  --sage:         #5B8072;   /* trust triad band */
  --walnut:       #6B4332;   /* nine-tools band + footer band */
  --amber:        #C2703E;   /* primary CTA buttons */
  --amber-hover:  #A05F32;   /* CTA hover */
  --wheat:        #C4A661;   /* eyebrow accent on dark bands, accent italics on walnut */

  /* Font stacks */
  --serif:   "DM Serif Display", "Times New Roman", serif;
  --body:    "Lora", Georgia, serif;
  --mono:    "JetBrains Mono", ui-monospace, monospace;
}
```

Landing-specific body defaults (scope to `index.astro` or apply a `.landing` class on the body inside the page):

```css
body.landing {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--body);
  font-size: 17px;
  line-height: 1.55;
  background-image:
    radial-gradient(circle at 12% 8%, rgba(160,80,56,.05) 0 20%, transparent 21%),
    radial-gradient(circle at 88% 20%, rgba(91,128,114,.05) 0 18%, transparent 19%);
}
```

## Typography conventions

- **H1 (hero only)** — `var(--serif)`, weight 400, `font-size: clamp(4rem, 10vw, 8.5rem)`, `line-height: 0.9`, `letter-spacing: -0.02em`. Italic `<em>` spans in `var(--terracotta)`.
- **H2** — `var(--serif)`, `font-size: clamp(2.5rem, 5vw, 5rem)`, `line-height: 0.95`, `letter-spacing: -0.02em`. `<em>` italic in accent color (terracotta on paper, wheat on walnut, paper on sage).
- **H3** — `var(--serif)`, `font-size: clamp(1.75rem, 2.5vw, 2.5rem)`, `line-height: 1`, normal weight.
- **Eyebrows** — `var(--mono)`, `font-size: 11px`, `letter-spacing: 0.14em`, `text-transform: uppercase`. Color: terracotta on paper, wheat on walnut, paper on sage.
- **Button labels** — `var(--mono)`, `font-size: 12px`, `letter-spacing: 0.18em`, uppercase.
- **Body text** — `var(--body)` (Lora), 17–18 px, `line-height: 1.6`, max ~65 character measure.
- **Microcopy** — `var(--body)`, 14 px, muted (`var(--ink-soft)` on paper).
- **Hero subhead drop cap** — first letter: `var(--serif)`, 64 px, `float: left`, `line-height: 0.85`, `padding: 6px 10px 0 0`, `color: var(--terracotta)`.

## Shared visual rules

- **Buttons — pill shape.** `border-radius: 999px`. Primary: solid `var(--amber)` fill, `var(--paper)` text, 2 px ink border. Hover: `transform: scale(1.02)` + `background: var(--amber-hover)`.
- **Cards — sharp corners.** `border-radius: 0`, 1 px `var(--ink)` border, or a 2 px ink top rule to evoke editorial framing.
- **Horizontal rules at major section transitions** — 1 px or 2 px `var(--ink)` lines. Use sparingly; the hero and masthead area can use a doubled rule (two 1 px lines, 6 px apart) for editorial effect.
- **Section padding**: desktop 120–160 px top/bottom, mobile 80–100 px.
- **Card padding**: 32–40 px.
- **Grid gap**: 20–24 px.
- **Dot-grid overlay on hero and closing CTA only.** Create `.dot-grid-paper` utility:

```css
.dot-grid-paper::before {
  content: "";
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(42,30,23,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
```

- **No section shadows.** Soft radial glow (terracotta, ~8% opacity, large blur) is acceptable behind the hero phone only.

## Section-by-section implementation

### Section 1 — Hero

Component: `Hero.astro`

Full-width `var(--paper)` background with dot-grid overlay. Two-column grid, 58/42 split on desktop, stacks on mobile.

Above the hero, an editorial meta strip:
- Full-width doubled horizontal rule (two 1 px `var(--ink)` lines, 6 px apart) at the top
- Left side: `Vol. 01 · Pre-launch` (mono 11 px)
- Right side: `EST. 2026` (mono 11 px)
- Same doubled rule closing the meta strip below

Hero left column:
- Eyebrow: `A KNITTING TOOLKIT FOR ANDROID · LAUNCHING SOON` (mono caps, terracotta)
- H1: `Pick up where<br>you <em>left off.</em>`
- Subhead with drop cap on first letter: `The row you were on, the yarn you forgot, the pattern that made no sense at midnight. KnitTools remembers it all — so the only thing you need to do is keep knitting.`
- Email form (pill-shaped): input `your@email.com` + button `Join the list`
  - Input: paper-2 fill, 1.5 px ink border, pill shape, 16 px horizontal padding
  - Button: amber fill, paper text, pill shape, mono caps
  - Success state replaces form: `You're in. We'll email you at launch.`
- Microcopy: `Lock in the launch price: €8.99 → €11.99 two months after launch.` (bold on `€8.99`)

Hero right column:
- Android phone mockup via existing `PhoneMockup.astro`, `theme="dark"`, slight `rotate(-2deg)` tilt. Use a dark-theme row-counter screenshot from project assets.
- Soft warm radial glow behind phone (terracotta ~8% opacity, large blur).

### Section 2 — Feature marquee

Component: `Marquee.astro`

Full-width `var(--terracotta)` band, ~80 px tall. Single line of `var(--paper)` text, mono caps, infinite left-to-right scroll via CSS `@keyframes translateX`. No JS.

Content (duplicated in two spans for seamless loop):
```
ROW COUNTER · VOICE COMMANDS · YARN SCANNER · AI JOURNALING · PATTERN VIEWER · RAVELRY · INSIGHTS · PROGRESS PHOTOS · WIDGET ·
```

- `aria-hidden="true"`
- `@media (prefers-reduced-motion: reduce) { animation-play-state: paused; }`
- Duration ~40 s
- Bracket with 1 px `var(--ink)` rules top and bottom

### Section 3 — Nine tools grid

Component: `NineTools.astro`

Full-width `var(--walnut)` band. Inner `max-width: 1280px`. `var(--paper)` text.

Top:
- Eyebrow: `WHAT'S INSIDE` (mono caps, `var(--wheat)`)
- H2: `Every tool,<br><em>talking to each other.</em>` (`<em>` italic + `var(--wheat)`)

Grid: `repeat(3, 1fr)` desktop, `repeat(2, 1fr)` tablet (≤1024 px), `1fr` mobile (≤768 px). Gap 20–24 px.

Nine cards. Each: `var(--paper)` fill, sharp corners, 1 px `var(--ink)` border, 32–40 px padding. Card:
- H3 title, `var(--serif)`, lead phrase in `var(--wheat)` inline, rest in `var(--ink)`
- Body in `var(--body)` (Lora), `var(--ink)`, 2–4 lines

**Card 1** — H3: `Row counter with memory`; body: `A big round button where your thumb already is. Tap without looking. Miscount? Undo. Say "add three" or "next row" — works with no signal.`
Chip row: 11 chips, wrap allowed. Each chip: Lora regular 11–12 px, `var(--paper-2)` fill, 1 px ink border, pill shape, 4 px / 8 px padding. Chips: `English`, `Finnish`, `Danish`, `Dutch`, `French`, `German`, `Italian`, `Norwegian`, `Portuguese`, `Spanish`, `Swedish`.

**Card 2** — H3: `Pattern viewer that follows along`; body: `PDF or Ravelry pull-in. The row you're on highlights itself. Tap sl1, k2tog, psso. AI explains what it does, step by step.`

**Card 3** — H3: `Yarn scanner for the label graveyard`; body: `Point the camera at the ball band. AI reads fiber, weight, meters, needle size, gauge, dye lot. Filed in your stash with a photo. That mystery skein finally has a name.`

**Card 4** — H3: `Four calculators, quietly working`; body: `Cast on, gauge, increases, yardage. The math your knitting already asked you to do.`

**Card 5** — H3: `Ravelry, the way it should feel`; body: `Search, save, start a project in one tap. Log in through Ravelry itself. Your password never touches this app.`

**Card 6** — H3: `Reference, one tap away`; body: `Needles, sizes, chart symbols, abbreviations. Right there in your library, before you remember you needed it.`

**Card 7** — H3: `Progress photos, just for you`; body: `One folder per project. Full resolution, on your device, nothing uploaded anywhere.`

**Card 8** — H3: `Insights without the pressure`; body: `Hours at the needles. Rows per hour. Streaks. No leaderboards, no nudges, no comparing. The stats are yours.`

**Card 9** — H3: `A widget on your home screen`; body: `Tap to count. No app launch, no loading. The exact amount of friction a row counter should have, which is zero.`

No CTA buttons, no "learn more" links, no card numbers in production output. All 9 cards equal visual weight.

### Section 4 — Free tools callout

Component: `FreeToolsCallout.astro`

`var(--paper)` background. Centered, `max-width: 900px`.

- Eyebrow: `FREE TOOLS` (mono caps, terracotta)
- H2: `Not ready for the app?<br><em>Try one in your browser.</em>` — smaller than page H2s, `clamp(26px, 3vw, 38px)`
- Row of 6 pill tags, pill shape, 28–32 px tall, 14–18 px horizontal padding, mono caps, paper text:
  - `Cast On` → `/tools/cast-on-calculator` — `var(--terracotta)` fill
  - `Yarn Estimator` → `/tools/yarn-estimator` — `var(--amber)` fill
  - `Yarn Weights` → `/tools/yarn-weight-chart` — `var(--wheat)` fill, ink text for contrast
  - `Needle Sizes` → `/tools/needle-size-chart` — `var(--sage)` fill
  - `Size Charts` → `/tools/knitting-size-charts` — `var(--walnut)` fill
  - `Abbreviations` → `/tools/knitting-abbreviations` — `var(--ink)` fill
- Below pills: `See all tools →` link to `/tools/` (Lora italic, `var(--ink-soft)`, centered)

### Section 5 — Trust triad

Component: `TrustSection.astro` (rewrite existing)

Full-width `var(--sage)` band. Three equal columns desktop, stacks mobile.

Each column:
- Eyebrow (mono caps, `var(--paper)` / cream)
- H3 two-line (serif, `var(--paper)`, `<em>` italic in `var(--paper)` — keep cream on sage for contrast)
- Body (Lora, `var(--paper)` at ~0.85 opacity)

**Column 1:**
- `PRICE`
- `Pay once.<br><em>Own it.</em>`
- `€8.99 for the whole toolkit. After launch the price rises to €11.99, so if you're going to buy it, buy it early. No subscription, ever.`

**Column 2:**
- `PRIVACY`
- `No tracking.<br><em>No ads.</em>`
- `Your stash, your patterns, your pace. All on your device, none of it sold to anyone.`

**Column 3:**
- `LANGUAGES`
- `Speaks<br><em>your language.</em>`
- `Eleven languages at launch. Because knitting instructions shouldn't need a translator.`

No CTA buttons.

### Section 6 — Free vs Pro pricing detail

Component: `PricingCards.astro` (new file)

`var(--paper)` background. Inner `max-width: 1080px`. Two cards side by side desktop, stack mobile (Pro first via `order: -1`).

**Card A — Free:**
- Background: `var(--paper-2)`
- 1 px `var(--ink)` border, 40 px padding
- Label: `FREE` (mono caps, terracotta)
- H3: `Forever` (serif, ~3 rem, ink)
- Bullets (Lora body):
  - `Row counter + session history`
  - `Ravelry sign-in`
  - `Four calculators (gauge, cast-on, increase, yardage)`
  - `Reference library (needles, sizes, abbreviations)`
  - `Three projects`
  - `Eleven languages`
- Footnote (small, `var(--ink-soft)`): `No account. No trial expiry. No card.`

**Card B — Pro:**
- Background: `var(--ink)` (darkest)
- Text: `var(--paper)`, footnote at ~0.75 opacity
- 40 px padding
- Label: `PRO` (mono caps, wheat)
- H3: `€8.99` (serif, ~3 rem, paper) + inline or just below: `one-time` (mono 13 px, paper at 0.6 opacity)
- Bullets:
  - `Unlimited projects`
  - `Voice commands (EN · FI)`
  - `Live AI assistant`
  - `Pattern viewer with AI stitch explanations`
  - `Yarn OCR scanner · unlimited stash`
  - `Insights, streaks, pace-over-time`
  - `Progress photos, row-tagged`
  - `Home-screen counter widget`
- Footnote: `14-day free trial. No credit card. Rises to €11.99 two months after launch — permanently. No subscription, ever.`

No CTA buttons inside either card.

### Section 7 — Closing CTA

Component: `ClosingCTA.astro` (rewrite existing)

`var(--paper)` background with dot-grid overlay. Centered, single column, min 160 px top/bottom padding.

- Eyebrow: `BE THERE AT LAUNCH` (mono caps, terracotta)
- H2: `Where every<br>stitch <em>counts.</em>` (serif oversized, `clamp(3rem, 6vw, 6rem)`, `<em>` italic + terracotta)
- Email form (same pill styling as hero), `max-width: 520px`, centered, `id="join"`:
  - Input: placeholder `your@email.com`
  - Button: `Reserve my price`
  - Success state: `Reserved. See you at launch.`
- Microcopy: `Free at launch · Pro €8.99 → €11.99 after two months · No card required`

### Section 8 — Footer

Component: `Footer.astro` (rewrite existing)

Full-width `var(--walnut)` band. `var(--paper)` text. Three columns desktop, stacks mobile.

**Column 1 — Tools** (header mono caps, `var(--wheat)`):
- `Cast On Calculator` → `/tools/cast-on-calculator`
- `Yarn Estimator` → `/tools/yarn-estimator`
- `Needle Size Chart` → `/tools/needle-size-chart`
- `Yarn Weight Chart` → `/tools/yarn-weight-chart`
- `Knitting Abbreviations` → `/tools/knitting-abbreviations`
- `Knitting Size Charts` → `/tools/knitting-size-charts`

**Column 2 — Articles:**
- `Gauge & Calculations` → `/articles`
- `Yarn` → `/articles`
- `Needles` → `/articles`
- `Techniques` → `/articles`
- `App & Tools` → `/articles`

**Column 3 — App:**
- `Launching soon` (text, no link)
- `Privacy Policy` → `/privacy` if route exists, else `#`

**Bottom bar** (1 px paper hairline at 0.2 opacity, 20–24 px padding top):
- Left: `A quiet companion for the long row ahead. Built for Android, priced once, yours forever.` (Lora italic, 14 px)
- Right: `English · Suomi · Svenska · Dansk · Norsk · Nederlands · Deutsch · Français · Italiano · Português · Español` (mono 11 px)

**Copyright** (centered, ~12 px):
`© MMXXVI KnitTools · Finnvek · Vol. 01 · Pre-launch · Made with two needles and a soldering iron`

### Navbar update

Component: `Navbar.astro`

Nav items:
- `TOOLS` → `/tools/`
- `ARTICLES` → `/articles`
- `JOIN THE WAITLIST` → `#join`

Mono caps, `var(--ink)` text on transparent background over hero. Left side: small `KnitTools` wordmark in `var(--serif)` italic, `var(--terracotta)`, ~20 px, linking to `/` (Emma will revisit logo placement later; keep minimal for now).

On scroll past hero, navbar picks up `var(--paper)` solid background with 1 px `var(--ink)` bottom border. Keep existing scroll-state JS if present.

## Meta, SEO, schema

`index.astro` meta:
- `<title>`: `KnitTools — Every Tool a Knitter Needs. One App.`
- `<meta name="description">`: `A private, on-device knitting toolkit for Android. Row counter, pattern viewer, yarn scanner, calculators. Pay once, €8.99. No subscription, no ads, no cloud.`
- Canonical: `https://knittoolsapp.com/`
- OG and Twitter: same title + description, `og:type=website`, `og:url=https://knittoolsapp.com/`

JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "KnitTools",
  "operatingSystem": "Android",
  "applicationCategory": "LifestyleApplication",
  "description": "A private, on-device knitting toolkit for Android. Row counter, pattern viewer, yarn scanner, calculators, Ravelry integration.",
  "offers": {
    "@type": "Offer",
    "price": "8.99",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/PreOrder"
  },
  "inLanguage": ["en", "fi", "sv", "da", "nb", "nl", "de", "fr", "it", "pt", "es"]
}
```

## Heading hierarchy

One `<h1>`: hero.

`<h2>`: section 3 `Every tool, talking to each other.`, section 4 `Not ready for the app? Try one in your browser.`, section 7 `Where every stitch counts.`

`<h3>`: 9 tool card titles, 3 trust columns, 2 pricing labels (`Forever`, `€8.99`).

## Responsive

- **Desktop (≥1024 px)**: hero 2 columns, nine-tools 3×3, trust 3 columns, pricing side-by-side, footer 3 columns.
- **Tablet (768–1023 px)**: nine-tools 2 columns, trust 3 or stacks, hero may stack, footer 3 columns.
- **Mobile (≤767 px)**: all stacks. Pro pricing first. Navbar hamburgers if items don't fit.

## Accessibility

- Preserve skip-to-content link in `BaseLayout`
- Email forms: hidden `<label>` on input
- Marquee: `aria-hidden="true"`, pauses on reduced motion
- Focus: `outline: 2px solid var(--amber); outline-offset: 2px`
- Contrast check: paper on walnut passes AA for body text. Wheat on walnut for eyebrows is borderline at 11 px — if it fails, use `var(--paper)` at 0.7 opacity for eyebrows on walnut.

## Explicit non-goals

- Do not preserve the old v10 identity (Geist, Bebas Neue, Teko, cream `#E8E4D0` baseline, burnt orange `#C45100` CTAs, square-cornered buttons, stripe ribbon, fixed logo badge, diagonal sections). The landing moves to editorial. Tool pages retain their system as separate work.
- Do not create feature spreads, `Nº 02`-style detail sections, or FIG. vignettes for any single feature. All 9 tools live as equal-weight cards.
- Do not add a belief or manifesto block.
- Do not add a product demo video section.
- Do not add Three.js or 3D phone animation.
- Do not add GSAP ScrollTrigger. The existing `IntersectionObserver` reveal system is enough; use sparingly.
- Do not add CTA buttons inside pricing cards or trust triad columns.
- Do not rename or move existing component files — rewrite in place.
- Do not refactor tool pages, article pages, or unused legacy components.
- Do not over-engineer. If a simple flex/grid solves it, use that — avoid introducing extra abstractions or utility classes the page doesn't need.

## Verification

```bash
pnpm astro check
pnpm build
pnpm dev
```

Visual check:
- 8 sections correct order: hero (paper + dot grid) → marquee (terracotta) → nine tools (walnut) → free tools callout (paper) → trust triad (sage) → pricing (paper) → closing CTA (paper + dot grid) → footer (walnut)
- Fonts: DM Serif Display on H1/H2/H3, Lora on body, JetBrains Mono on eyebrows/nav/button labels
- Buttons are pill-shaped, not square
- Resize to 768 px and 375 px; Pro card renders first on mobile
- `JOIN THE WAITLIST` nav item scrolls to closing CTA form
- Marquee animates, pauses on reduced motion
- No stripe ribbon, no fixed logo badge
- Self-hosted fonts load (no Google Fonts CDN requests in network tab)

## Deliverable

Single PR that:
1. Updates `index.astro` with new section composition, meta, JSON-LD
2. Rewrites 8 component files, adds `PricingCards.astro`
3. Removes `StripeRibbon` and `PageBrandMark` from `PageLayout.astro`
4. Adds v11 tokens and `@font-face` in `global.css`
5. Adds woff2 files to `public/fonts/`
6. Preloads the three new fonts in `BaseLayout.astro`
7. Passes `astro check` and `build`

If the wireframe is ambiguous and this doc doesn't clarify it, default to the simpler implementation and flag in the PR description.
