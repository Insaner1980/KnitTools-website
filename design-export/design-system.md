# KnitTools — Landing Page Design System

Verified against the live code on branch `v2-editorial` (2026-04-22). The single-file `index.html` export in this folder reflects the section order and styles below. The landing uses **only the editorial palette and serif/mono families** — the older "tools page" burnt-orange / Bebas / Geist system is not applied on the homepage.

---

## 1. Brand feel

- An editorial broadsheet — *The Knitter's Journal of Craft & Computation*.
- Warm paper background, deep ink type, thin hairlines, mono meta labels, serif headlines with a single italic accent word per title (always terracotta).
- Editorial markers: `Nº 01`, `Nº 02`, `Nº 03` (section numbers), `§ Counter`, `§ Pattern`, … (card tags), roman numerals `i / ii / iii / iv` (ordered sub-items).
- Motif: a small stitch chart (knit/purl) that animates row-by-row next to the hero headline.

---

## 2. Color tokens

All landing-page colors resolve from CSS custom properties declared in `src/styles/global.css` and scoped to `body.landing`.

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#F4EAD9` | Page background. Every section inherits this. |
| `--paper-2` | `#EADFC9` | Default card fill, input fill. |
| `--ink` | `#2A1E17` | Headlines, body text, borders. Never pure black. |
| `--ink-soft` | `#4A382C` | Meta, bylines, captions, footer links secondary. |
| `--terracotta` | `#A05038` | Primary accent — italic headline words, eyebrows, hover, Pro card, quote marks. |
| `--sage` | `#5B8072` | Secondary accent — "Privacy" trust column (filled), Ravelry-equivalent card accents. |
| `--walnut` | `#6B4332` | Earth accent — Ravelry card fill, `§` tag color on light cards, Free label. |
| `--amber` | `#C2703E` | Amber tool pill. |
| `--amber-hover` | `#A05F32` | CTA hover (tokens exist; not used directly on landing). |
| `--wheat` | `#C4A661` | AI vignette background, wheat tool pill, AI accent numerals. |

Background texture: `body.landing` applies two very soft radial tints (terracotta top-left 5%, sage top-right 5%) plus a 24 × 24 px ink dot grid on `.dot-grid-paper` sections (hero + closing CTA).

Rules:
- Never pure `#000000` or `#FFFFFF`.
- The **entire page is paper**, including the footer. There is no dark hero, no dark footer, no stripe ribbon.

---

## 3. Typography

### Font families

| CSS variable | Family | Weights loaded | Role |
|--------------|--------|----------------|------|
| `--serif` | DM Serif Display | 400 regular, 400 italic | All display type — masthead, H1, H2, H3, pull quote, captions, italic microcopy. |
| `--body-ed` | Lora (variable 400–700, ital variant) | 400–700 + italic | Body copy, dek, card descriptions, bullets, footer links. |
| `--mono` | JetBrains Mono (variable 400–700) | 400–700 | Meta labels, eyebrows, nav links, section numbers, button labels, tags, pills. |

Exported HTML uses Google Fonts for these three (site build uses self-hosted woff2 in `/public/fonts/`).

### Landing page type scale

All sizes are taken verbatim from the components.

**Hero masthead / meta strip (`Hero.astro`)**

| Element | Family | Size | Line-height | Tracking | Weight / style |
|---------|--------|------|-------------|----------|----------------|
| Masthead wordmark "KnitTools" | serif | `clamp(4rem, 13vw, 10.5rem)` | 0.95 | `-0.035em` | 400 regular |
| Masthead tagline (italic) | serif italic | `clamp(13px, 1.1vw, 15px)` | — | `0.01em` | italic |
| Meta row (Vol / date) | mono | 11px | — | `0.14em` uppercase | 400 |
| Meta row center (italic tagline) | serif italic | 14px | — | 0 | italic |
| Seal logo | image 72–210px, rotated `-6deg` | — | — | — | — |

**Hero headline + dek**

| Element | Family | Size | Line-height | Tracking | Notes |
|---------|--------|------|-------------|----------|-------|
| H1 line 1 ("Pick up where you") | serif | `clamp(2.5rem, 5.6vw, 4.75rem)` | 0.95 | `-0.02em` | 400 |
| H1 line 2 ("*left off.*") | serif italic | `clamp(3.75rem, 8.5vw, 7.5rem)` | 0.9 | `-0.02em` | italic, `--terracotta` |
| Byline | serif italic | 15px (mobile 14px) | — | — | `--ink-soft` |
| Dek paragraph | Lora | `clamp(17px, 1.5vw, 20px)` | 1.55 | — | `--ink`, drop-cap 4.6em terracotta on `::first-letter` |
| Figure caption | serif italic | 14px | 1.4 | — | centered |

**Signup form (hero + closing CTA)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Email input | Lora | 16px | padding 14 × 20, 1.5px ink border, `--paper-2` fill, border-radius 0, focus outline 2px terracotta |
| Submit button | mono | 12px | tracking `0.18em` uppercase, padding 14 × 22, `--ink` fill, `--paper` text, border 1.5px ink, hover fills terracotta |
| Success message | serif italic | 24px (28px on closing CTA) | `--terracotta` |
| Signup meta line | Lora | 14px | `--ink-soft`, `<strong>` in terracotta |

**Section headers (shared pattern in NineTools, TrustSection, PricingCards, ArticlesTeaser)**

| Element | Family | Size | Tracking | Notes |
|---------|--------|------|----------|-------|
| Section label "Nº 01 · Features" | mono | 11px uppercase | `0.24em` | num in `--ink-soft`, text in `--terracotta`, 20px baseline gap |
| Section title H2 | serif | `clamp(2rem, 4vw, 3.75rem)` | `-0.02em` | 400, line-height 0.95, italic `<em>` colored terracotta (sage in TrustSection) |
| Rule | 1px solid `--ink`, 18px below label, 48px gap to body | — | — | `border-top` on each section |

**Feature cards (`.tool-card` in NineTools)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| `§` tag | mono | 10px | tracking `0.18em` uppercase, `--walnut` on light cards, `--paper` on tinted cards |
| `PRO` / `FREE` pill | mono | 10px | tracking `0.14em`, padding 3 × 10, border-radius 999px. FREE: paper fill + ink text + ink border. PRO: terracotta fill + paper text. |
| Card title H3 | serif | `clamp(1.5rem, 1.9vw, 1.9rem)` | 400, line-height 1.05, `-0.01em` |
| Card body | Lora | 15px | 1.55 line-height |
| Language chip | Lora | 11px | padding 3 × 10, paper fill, ink border, border-radius 999px |

Card tints (optional):
- `.tint-sage` → sage fill, paper text, p at 90% paper.
- `.tint-walnut` → walnut fill, paper text, p at 88% paper.
- `.tint-ink` → ink fill, paper text, p at 85% paper. Used only by the wide AI card.

**AI wide card (bottom of NineTools)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| "AI that *knows knitting.*" H3 | serif | `clamp(2rem, 2.8vw, 2.75rem)` | `<em>` colored `--wheat` |
| Intro body | Lora | 15px | 60% width, `rgba(244,234,217,0.85)` |
| "🎙 Listening…" label | mono | 10px | `0.14em`, `--wheat` |
| Numbered list numeral "i / ii / iii" | serif italic | 22px | `--wheat` |
| List item title | serif | 17px | 1.2 line-height |
| List item body | Lora | 13px | 1.5, `rgba(244,234,217,0.75)` |
| Vignette header "Transcript. Live / Row 85" | mono | 10px | `0.18em` uppercase |
| Vignette avatar (`You` / `AI`) | mono | 10px | `You` terracotta, `AI` walnut |
| Vignette message | serif | 15px | you → italic; AI italic inline `<em>` terracotta |

Vignette background: `--wheat` fill, 1.5px ink border, 20px padding. Waveform: 9 bars, 4px wide, terracotta, 1.2s ease-in-out loop, staggered 80ms.

**TrustSection (`.trust-col`)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Eyebrow | mono | 11px | `0.14em`, `--sage` (or paper on sage-filled col) |
| H3 lead + italic | serif | `clamp(2rem, 3vw, 2.75rem)` | 400, line-height 1, `<em>` in `--sage` |
| Body | Lora | 15px | 1.6, `--ink-soft` |
| Column padding | — | 36 × 32 | paper-2 fill + 1px ink border; middle col `.tint-sage` → sage fill + paper text |

**PullQuote**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Quote | serif | `clamp(1.75rem, 3.5vw, 2.75rem)` | 1.15 line-height, `-0.01em`, centered, terracotta “ ” smart quotes |
| Attribution | serif italic | 14px | `--ink-soft` |
| Rules | 72px × 1px ink 60% opacity above and below | — | centered |

**PricingCards (Free / Pro)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| `§ Free` / `§ Pro` label | mono | 11px | `0.18em` uppercase. Free: walnut, Pro: wheat. |
| Price H3 ("Forever" / "€8.99") | serif | `clamp(2.5rem, 4vw, 3.5rem)` | 400, -0.02em |
| "one-time" suffix | mono | 13px | `0.14em`, 70% opacity |
| "Everything in Free, plus:" | mono | 11px | `0.14em`, wheat |
| Bullet list item numeral | serif italic | 22px | Free: terracotta. Pro: wheat. |
| Bullet list item text | Lora | 15px | 1.5 |
| Footnote | Lora | 13px | 1.5 |
| Free card | paper-2 fill, ink border, 40px padding | — | — |
| Pro card | terracotta fill, paper text, terracotta border, 40px padding | — | — |

**EditorsNote**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Eyebrow "From the Editor" | mono | 11px | `0.24em` terracotta |
| Body copy | Lora | 16px | 1.65 line-height |
| Sign-off | serif | 15px italic | `--ink-soft`, right-aligned |
| Frame | 720px max, 3px double ink top border + 1px ink bottom border, 28 × 0 padding | — | — |

**ArticlesTeaser**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| "Further reading" label | mono | 11px | `0.24em` terracotta |
| Title "From the *Journal.*" | serif | `clamp(2rem, 4vw, 3.75rem)` | — |
| Card "Nº 01" | mono | 10px | `0.22em`, `--ink-soft` |
| Card category tag | mono | 10px | `0.22em`, terracotta |
| Card title | serif | `clamp(1.5rem, 1.8vw, 1.85rem)` | 1.15 line-height, hover terracotta + underline |
| Card description | Lora | 15px | 1.55 |
| "Continue reading →" | mono | 11px | `0.18em`, ink with ink underline, hover terracotta |
| Grid | 3-column, 48px gap, hairline dividers between cards | — | — |

**ClosingCTA**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Eyebrow "Be there at launch" | mono | 11px | `0.14em` terracotta |
| Headline "Where every stitch *counts.*" | serif | `clamp(3rem, 6vw, 6rem)` | 0.95 line-height, `-0.02em` |
| Signup row | gap 10px (stacks on mobile) | — | Same input + button styles as hero form. Button label: "Reserve my price". |
| Meta | Lora | 14px | `--ink-soft` |
| Background | paper + dot grid | 160px vertical padding (100px mobile) | — |

**Marquee (between Hero and NineTools)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Items | mono | 14px | `0.18em` uppercase, `--ink` |
| Dot separator | mono | 14px | `--terracotta`, 14px side padding |
| Track | 40s linear infinite translateX 0 → -50% | — | paused by `prefers-reduced-motion` |
| Frame | 22px vertical padding, 1px ink top and bottom borders | — | — |

**Navbar (`Navbar.astro`)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Brand mark (hidden until scroll) | serif | 18px | `-0.01em`, fades in when `window.scrollY > 80` |
| Nav links | mono | 11px | `0.18em` uppercase, ink, hover terracotta |
| "Join the list" chip | mono | 11px | padding 8 × 16, 1.5px ink border, no radius, hover inverts to ink fill + paper text |
| Container | fixed, transparent, 18 × 40 padding. On scroll adds paper background + 1px ink bottom border. | — | — |

**Footer (`Footer.astro`)**

| Element | Family | Size | Notes |
|---------|--------|------|-------|
| Column heading "Tools" / "Articles" / "App" | mono | 11px | `0.18em` terracotta |
| Link | Lora | 14px | ink, hover terracotta |
| Muted item "Launching soon" | Lora | 14px italic | `--ink-soft` |
| Copyright "© MMXXVI KnitTools. Finnvek." | mono | 11px | `0.08em`, centered, `--ink-soft`, 1px top hairline |
| Background | paper (same as page) with 1px ink top border | padding 80 / 40 top / bottom (60 / 32 mobile) | — |

---

## 4. Layout

### Page container widths (per component, taken from code)

| Section | Max width |
|---------|-----------|
| Hero meta strip | 1280px |
| Hero inner grid | 1280px — columns `1.4fr 1fr`, 64px gap |
| Hero text column | 640px |
| NineTools inner | 1280px — 3-col grid, 20px gap |
| TrustSection inner | 1280px — 3-col grid, 20px gap |
| PricingCards inner | 1080px — 2-col grid, 24px gap |
| PullQuote inner | 900px |
| EditorsNote inner | 720px |
| ArticlesTeaser inner | 1200px — 3-col, 48px gap |
| ClosingCTA inner | 720px |
| Footer inner | 1280px — 3-col, 48px gap |

### Vertical rhythm (section padding)

| Section | Desktop | Mobile (≤640–767px) |
|---------|---------|---------------------|
| Hero | 12 / 40 / 80 | 32 / 20 / 48 |
| Marquee | 22 vertical | same |
| NineTools | 120 / 40 | 80 / 20 |
| FreeToolsCallout | 120 / 40 | 80 / 20 |
| TrustSection | 120 / 40 | 80 / 20 |
| PullQuote | 72 / 40 | 48 / 20 |
| PricingCards | 120 / 40 | 80 / 20 |
| EditorsNote | 80 / 40 | 56 / 20 |
| ArticlesTeaser | 100 / 40 | 72 / 20 |
| ClosingCTA | 160 / 40 | 100 / 20 |
| Footer | 80 / 40 / 40 | 60 / 20 / 32 |

Each major section carries a 1px solid `--ink` top border (a print-style rule) except Hero, Marquee (it has both), PullQuote and EditorsNote.

### Section-head pattern (reused)

```
[Nº 0x · SECTION NAME]   ← 11px mono, tracking 0.24em, terracotta
H2 title                 ← serif clamp(2rem, 4vw, 3.75rem), <em> terracotta
────────────────────     ← 1px ink rule, 18px below H2, 48px to content
```

Used in NineTools, TrustSection, PricingCards, ArticlesTeaser.

---

## 5. Buttons & interactive elements

### Hero / ClosingCTA submit button

- Font: JetBrains Mono 12px, tracking `0.18em`, uppercase.
- Padding: 14 × 22.
- Fill: `--ink`; text: `--paper`; border: 1.5px `--ink`; border-radius: 0.
- Hover: background + border → `--terracotta`.
- Focus-visible: 2px terracotta outline, 3px offset.

### Email input

- Lora 16px.
- Padding: 14 × 20.
- 1.5px ink border, flush to button (no gap in hero — `border-right: 0` on input).
- Fill: `--paper-2`.
- Focus: 2px terracotta outline, 2px offset.

### Nav "Join the list" chip

- JetBrains Mono 11px, tracking `0.18em`, uppercase.
- Padding: 8 × 16, 1.5px ink border, border-radius 0.
- Hover: inverts to `--ink` fill + `--paper` text.

### Free-tool pills (FreeToolsCallout)

- JetBrains Mono 12px, tracking `0.18em`, uppercase, `--paper` text (ink text on `fill-wheat`).
- Padding: 9 × 16, 1.5px ink border, border-radius 0.
- Fills: `--terracotta`, `--amber`, `--wheat`, `--sage`, `--walnut`, `--ink`.
- Hover: `filter: brightness(0.88)`.

### "See all tools →"

- Lora 15px italic, `--ink-soft`, hover terracotta.

---

## 6. Decorative motifs

- **Dot grid** (`.dot-grid-paper`): 24 × 24 px radial dots at `rgba(42,30,23,0.03)` on paper — very faint halftone. Applied to Hero and ClosingCTA.
- **Hairline rule**: 1px solid `--ink` at 60% opacity — used as masthead dividers, pull-quote rules (72px short centered version), and bottom card separators at 20% opacity.
- **Double rule**: 6px band, 1px ink top + 1px ink bottom (in `.rule-double` utility); used as a section edge in EditorsNote (3px double top).
- **Editorial markers**: `Nº 01–03` (mono, ink-soft), `§ Counter / § Pattern / …` (mono, walnut or paper), roman numerals `i–iv` (serif italic in wheat or terracotta).
- **Seal logo** in hero: `/logo.webp` shown at 72–210px, rotated `-6deg`, hover `-2deg scale(1.04)`.

---

## 7. Animation

| Element | Spec |
|---------|------|
| Stitch chart (hero) | `StitchChart.astro` — 8 × 8 grid, patterns: 2×2 ribbing → basketweave → seed → KT monogram. 70ms per cell, 120ms per row, 2400ms hold, 500ms fade-out between patterns. Paused by `prefers-reduced-motion`. |
| Marquee | 40s linear infinite translate 0 → -50%. Paused by reduced motion. |
| AI vignette waveform | 9 bars, `scaleY(0.5 → 1.15)` 1.2s ease-in-out infinite, staggered 80ms per bar. Frozen by reduced motion. |
| Navbar scroll | Adds `.scrolled` at `scrollY > 80`: fades brand mark in, adds paper background, adds 1px ink bottom border over 200ms. |
| Signup form submit | Content div hidden, success message shown inline (no network call yet — placeholder handler in-file). |
| Seal logo hover | `rotate(-2deg) scale(1.04)` over 250ms. |
| Button / link color transitions | 150–200ms ease. |
| Reduced motion | global `*` durations clamped to 0.01ms; marquee and waveform explicitly frozen. |

---

## 8. Breakpoints

| Width | Behaviour |
|-------|-----------|
| ≥1024px | Full 3-column grids (NineTools, Trust, ArticlesTeaser); hero stays 2-column. |
| ≤1024px (NineTools) | 2-column feature grid; AI card vignette spans full width. |
| ≤1023px (Hero, Trust) | Hero stacks to 1 column with 48px gap; Trust collapses to 1 column. |
| ≤960px (ArticlesTeaser) | Teaser becomes 1 column with hairline dividers between cards. |
| ≤767px | NineTools reduces to 1 column; Pricing stacks with Pro card re-ordered to top. Section padding drops to 80px. |
| ≤640px | All hero compaction: seal smaller, meta row stacks, signup stacks to column, dek drop-cap 4em. |

---

## 9. Accessibility

- Skip link (`.skip-link`) top-left, appears on focus, ink-on-paper.
- Focus ring: 2px solid `--terracotta` (forms) or 2px solid `--accent` (global fallback), 2–3px offset.
- `::selection`: accent background, cream text (global).
- All icon-only and decorative elements carry `aria-hidden` or `aria-label` (seal logo, glow, waveform, vignette).
- Headings use a single `h1` in the hero; each section has one `h2` with an `aria-labelledby` hook.
- Email inputs pair with `visually-hidden` labels.
- `prefers-reduced-motion: reduce` disables marquee, stitch chart transitions, waveform.

---

## 10. Section order (as rendered by `src/pages/index.astro`)

1. **Navbar** — fixed, transparent, reveals on scroll.
2. **Hero** — masthead block (seal logo, wordmark, italic tagline, rule, meta row vol/center/est), headline stack, byline, dek with drop-cap, signup form, stitch chart figure.
3. **Marquee** — scrolling list of nine feature names separated by terracotta dots.
4. **NineTools** — "Nº 01 · Features" header, 3-column card grid of 9 feature cards (some tinted sage / walnut), ending with a full-width ink-filled AI card containing intro copy, a numbered i/ii/iii/iv list, and a wheat transcript vignette with animated waveform.
5. **FreeToolsCallout** — centered block linking the six free browser tools as solid pills.
6. **TrustSection** — "Nº 02 · Principles", 3-column Price / Privacy / Languages with sage-filled middle column.
7. **PullQuote** — single centered italic serif line with smart quotes.
8. **PricingCards** — "Nº 03 · Pricing", Free paper-2 card + Pro terracotta card, both with roman-numeral bullet lists.
9. **EditorsNote** — narrow framed aside with eyebrow, body copy, italic sign-off.
10. **ArticlesTeaser** — "Further reading · From the Journal.", 3-column teaser cards, placeholder note if collection is empty.
11. **ClosingCTA** — paper + dot grid, big headline + second signup form with "Reserve my price".
12. **Footer** — paper 3-column (Tools / Articles / App) + centered mono copyright line "© MMXXVI KnitTools. Finnvek."

---

## 11. Notes for redesign iterations

- The page is intentionally **one paper surface end-to-end** (no dark sections). Section rhythm is created by 1px ink top borders, not by color.
- Every H2 that appears on the landing follows the `<plain>...</plain><em>accent word</em>` pattern, where `<em>` is always italic and colored `--terracotta` (or `--sage` only in TrustSection, `--wheat` only in the AI intro).
- `§` is used exclusively as a card tag prefix. `Nº 0x` is used exclusively for section numbers and article teaser cards.
- Only the AI card and the Pro pricing card are filled with strong color (ink / terracotta). Everything else sits on paper or paper-2.
- Borders are always 1–1.5px solid `--ink`, square-cornered. The only rounded-corner usage is on pills (999px).
- Preserve the stitch-chart + drop-cap + italic headline triad in the hero — these are the three defining details.
- Avoid generic SaaS tropes: no gradient glass cards, no neon gradients, no illustrated mascots, no emoji in UI (the lone 🎙 in the AI intro is the only exception).
