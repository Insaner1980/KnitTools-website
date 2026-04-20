# KnitTools Landing Page — Rebuild Spec

## Design Foundation

### Color Palette

| Role | Description | Approx Value |
|------|-------------|-------------|
| **Deep warm gray** | Hero, dark sections, navbar, footer | ~#2E2A26 (warm brown undertone, NOT cool/blue gray) |
| **Cream / parchment** | Light sections, text on dark | ~#E8E4D0 (match app light theme background) |
| **Burnt orange** | All accents, CTAs, interactive elements | ~#C45100 (match app Primary) |
| **Cream muted** | Secondary text on dark backgrounds | Lighter/desaturated version of cream |
| **Deep gray text** | Text on light backgrounds | Dark version of warm gray |

**Rules:**
- No pure black (#000000) or pure white (#FFFFFF)
- Burnt orange is the ONLY accent color — no gold, no wine, no green
- Match app palette as closely as possible for cream and burnt orange; deep warm gray is the website's own color that creates contrast with app screenshots

### Typography

| Font | Role | Sizes |
|------|------|-------|
| **Sandome** | H1, H2 — display headlines | H1: ~5rem desktop / ~2.5rem mobile. H2: ~3rem / ~1.8rem |
| **Bebas Neue** | Section tags, labels, nav links, marquee | ~0.85-1rem, uppercase, wide letter-spacing |
| **Creato Display** | Body text, buttons, descriptions | Body: ~1.1rem / ~1rem. Buttons: ~0.95rem |

**Hosting:** Sandome self-hosted (woff2). Bebas Neue + Creato Display from Google Fonts or self-hosted.

### Buttons

- **Primary CTA:** Burnt orange solid, rounded corners (8px), Creato Display or Bebas Neue text, dark text on orange
- **Secondary/text links:** Burnt orange text with arrow icon, no background
- No pill shapes (border-radius: 9999px) on buttons

### Section Transitions

- No divider lines, no zigzag borders, no decorative separators
- Color transitions between sections: dark → light or light → dark
- **Overlapping elements:** Feature rows in glassmorphism cards sit across the color boundary (half on dark, half on light) using negative margin or translateY
- Not every section boundary needs an overlapping element — some can be clean cuts

### Glassmorphism (overlapping cards)

```
background: rgba(255, 255, 255, 0.08-0.12)
backdrop-filter: blur(12px)
border: 1px solid rgba(255, 255, 255, 0.15)
border-radius: 16px
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2)
```

Adjust opacity based on whether card sits on dark or light area.

---

## Page Structure

### 1. Navbar

- **Background:** Transparent over hero, transitions to solid deep warm gray with backdrop blur on scroll
- **Left:** "KnitTools" text (Creato Display, cream). Logo placement TBD.
- **Right:** Navigation links in Bebas Neue (cream, small caps): TOOLS / ARTICLES / GET THE APP
- **GET THE APP** is a small burnt orange solid button
- **Mobile:** Hamburger menu or simplified nav

---

### 2. Hero

- **Background:** Deep warm gray, solid, no background image
- **Layout:** Two columns — text left, app screenshot right
- **Screenshot:** Light theme (cream background app screenshot contrasts against dark website background)

**Content (left column):**

```
[Sandome, cream, large — H1]
Every tool a knitter needs.
One app.

[Creato Display, cream muted]
Row counter, calculators, yarn scanner, and reference
guides — beautifully crafted into one app.

[CTA Button — burnt orange solid]
Get the App

[Creato Display, cream muted, small]
Coming soon on Android
```

---

### 3. Feature Group 1 — "Knit"

*The core knitting experience: what you use while actively knitting.*

- **Background transition:** Hero dark → cream starts here
- **Layout:** Feature row — screenshot + text side by side in glassmorphism card
- **Screenshot:** Dark theme (contrasts against cream background)
- **Overlapping:** This row's glassmorphism card sits across the dark→cream boundary

**Content:**

```
[Bebas Neue, burnt orange]
STAY ON TRACK

[Sandome, deep gray]
Your hands knit.
The app counts.

[Creato Display, deep gray]
The row counter tracks every stitch with haptic feedback and
an always-on screen. Add pattern repeats, shaping counters,
and row reminders. Use voice commands to count hands-free.

[Creato Display, deep gray muted, smaller — feature list]
Row Counter · Stitch Tracking · Pattern Repeats · Shaping Counters ·
Row Reminders · Voice Commands · Session Timer · PDF Pattern Viewer
```

---

### 4. Feature Group 2 — "Organize"

*Managing projects, yarn stash, patterns, photos, and progress.*

- **Background:** Cream continues
- **Layout:** Feature row — text left, screenshot right (alternating from previous)
- **Screenshot:** Dark theme (still on cream)

**Content:**

```
[Bebas Neue, burnt orange]
YOUR PROJECTS

[Sandome, deep gray]
Everything in one place.

[Creato Display, deep gray]
Manage all your knitting projects with linked yarns, notes,
progress photos, and session history. Browse Ravelry patterns
and save them to your Library. Track your stats in Insights.

[Feature list]
Project Management · Library · My Yarn Stash · Saved Patterns ·
Progress Photos · Session History · Insights & Stats · Ravelry Integration
```

---

### 5. Feature Group 3 — "Calculate"

*All calculator tools.*

- **Background transition:** Cream → deep warm gray starts here
- **Layout:** Feature row — screenshot + text in glassmorphism card
- **Screenshot:** Light theme (contrasts against dark background)
- **Overlapping:** Glassmorphism card sits across the cream→dark boundary

**Content:**

```
[Bebas Neue, burnt orange]
CALCULATORS

[Sandome, cream]
Five calculators for every
knitting math.

[Creato Display, cream muted]
From gauge conversion to yarn estimation, every calculator
a knitter needs. Paste your pattern instructions and let AI
fill in the numbers automatically.

[Feature list]
Gauge Converter · Gauge Swatch · Cast On Calculator ·
Increase & Decrease · Yarn Estimator · AI Instruction Parser
```

---

### 6. Feature Group 4 — "Scan & Save"

*Yarn label scanning, OCR, yarn cards.*

- **Background:** Deep warm gray continues
- **Layout:** Feature row — text left, screenshot right (alternating)
- **Screenshot:** Light theme (on dark)

**Content:**

```
[Bebas Neue, burnt orange]
YARN SCANNER

[Sandome, cream]
Scan. Save.
Never lose a yarn label again.

[Creato Display, cream muted]
Point your camera at any yarn label. AI reads the details —
fiber content, weight, gauge, care symbols — and saves it
as a digital yarn card. Track your stash and link yarns
directly to your projects.

[Feature list]
Yarn Label OCR · AI Label Parsing · Yarn Cards · Stash Management ·
Care Symbols · Project Linking
```

---

### 7. Feature Group 5 — "Learn"

*Reference materials.*

- **Background transition:** Deep warm gray → cream
- **Layout:** Simpler, compact — no full feature row needed. Could be a small centered block or single-column.
- **Screenshot:** Optional — reference screens are less visually striking

**Content:**

```
[Bebas Neue, burnt orange]
REFERENCE

[Sandome, deep gray]
Look it up in seconds.

[Creato Display, deep gray]
Needle size conversions, garment size charts, knitting
abbreviations, and chart symbols — all searchable, all offline.

[Feature list]
Needle Sizes (Metric/US/UK/JP) · Size Charts (6 categories) ·
76 Abbreviations · Chart Symbols
```

---

### 8. Trust Statement

*Standalone section — gives the message its own weight and breathing room.*

- **Background:** Cream continues or clean cut to deep warm gray — test both
- **Layout:** Centered text, generous vertical padding, nothing else competing

**Content:**

```
[Sandome, large, centered]
No ads.
No subscription.
Yours forever.

[Bebas Neue, muted, spaced]
ONE-TIME PURCHASE. FULLY OFFLINE. ZERO DATA COLLECTION.
```

---

### 9. Free Tools + Closing CTA

*Combined into one section. Free tools as a compact one-liner, closing CTA below with space.*

- **Background:** Deep warm gray

**Free tools (top of section, compact):**

```
[Sandome, cream, medium]
Try our free knitting calculators

[Text links — burnt orange with arrow, inline]
Cast On Calculator →    Yarn Estimator →
```

**Closing CTA (below, generous spacing):**

```
[Sandome, cream, large]
Where every stitch counts.

[CTA Button — burnt orange solid]
Get the App

[Creato Display, cream muted, small]
Android · One-time purchase €1.99 · No ads · No tracking
```

---

### 10. Marquee

- **Background:** Burnt orange (the only section using orange as background)
- **Text:** Bebas Neue, cream/light color
- **Content:** All features scrolling horizontally, infinite loop
- **Separators:** Small cream circles between features (matching logo motif)

**Marquee text items:**

```
ROW COUNTER · YARN SCANNER · AI PARSER · GAUGE CONVERTER ·
CAST ON CALCULATOR · YARN ESTIMATOR · INCREASE & DECREASE ·
PROJECT MANAGEMENT · PATTERN VIEWER · VOICE COMMANDS ·
STITCH TRACKING · SHAPING COUNTERS · ROW REMINDERS ·
PROGRESS PHOTOS · SESSION HISTORY · INSIGHTS · RAVELRY ·
LIBRARY · MY YARN · NEEDLE SIZES · SIZE CHARTS ·
ABBREVIATIONS · CHART SYMBOLS · OFFLINE · PRIVATE
```

---

### 11. Footer

- **Background:** Deep warm gray
- **Layout:** Centered, minimal

```
[KnitTools badge logo — cream/orange version, ~80-100px]

[Creato Display, cream, small]
Finnvek (link to finnvek.com)

[Creato Display, cream muted, tiny]
Privacy Policy · © 2026
```

---

## Screenshot Plan

### Light theme screenshots (used on DARK backgrounds)
- Hero: Row Counter or Projects list
- Calculate section: One of the calculator screens
- Scan & Save section: Yarn Card or Yarn Estimator with camera icon

### Dark theme screenshots (used on LIGHT/CREAM backgrounds)
- Knit section: Row Counter (dark theme)
- Organize section: Projects list or Library (dark theme)

### Current placeholders available
Using existing v1 screenshots until v2/v3 features are implemented:
- Row Counter (dark + light theme) ✓
- Projects list (dark + light theme) ✓
- Ravelry Saved Patterns (dark theme) ✓
- Yarn Estimator (light theme) ✓

### Screenshots needed later (v2/v3)
- Library screen
- Insights screen
- Pattern Viewer
- My Yarn stash
- Shaping counter in action
- Voice command indicator

---

## Responsive Behavior

- **Desktop:** Two-column feature rows (text + screenshot side by side)
- **Mobile:** Single column, screenshot above or below text
- **Overlapping glassmorphism cards:** On mobile, reduce the overlap amount or switch to simple stacked layout
- **Marquee:** Runs on all screen sizes, adjusts speed
- **Navbar:** Collapses to hamburger on mobile

---

## Animations (intentional, minimal)

| Animation | Location | Type |
|-----------|----------|------|
| Scroll reveal | Section tags, headings, feature rows | Intersection Observer, fade + slide up |
| Navbar background | Navbar | Transparent → solid on scroll |
| Marquee | Marquee section | CSS infinite scroll |
| CTA hover | Buttons | Subtle lift + shadow |

All animations respect `prefers-reduced-motion`.

---

## SEO Elements

- **Title:** "KnitTools — Every Tool a Knitter Needs. One App."
- **Meta description:** "Row counter, calculators, yarn scanner, and reference materials in one beautiful offline app. One-time purchase, no subscription, no ads."
- **H1:** "Every tool a knitter needs. One app."
- **Schema:** WebApplication + SoftwareApplication markup
- **OG image:** Updated to match new design

---

## Open Questions

1. **Navbar logo:** KT circle logo next to text, or text only? To be decided after seeing it in context.
2. **Hero background image:** Currently none. May revisit if page feels too flat.
3. **Closing CTA background image:** Reserved for possible Nano Banana illustration later.
4. **Exact hex values:** To be finalized by matching app's actual color tokens.
5. **Screenshots for v2/v3 features:** Placeholder current screenshots until app updates are complete.
6. **Feature copy:** All body text is placeholder direction — final copywriting pass needed.
7. **Trust section background:** Cream or dark? Test both in context.
