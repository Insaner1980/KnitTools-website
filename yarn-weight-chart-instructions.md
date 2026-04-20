# Task: Create Yarn Weight Chart Tool Page

## Overview

Create a new interactive reference page at `/tools/yarn-weight-chart`. This page has two interactive elements: 8 expandable yarn weight category cards (one per CYC category 0-7) and a WPI (wraps per inch) identifier tool. The visual style must match the existing tool pages.

## Visual reference

**Look at these existing pages for design direction:**
- `/tools/cast-on-calculator`
- `/tools/needle-size-chart`
- `/tools/knitting-abbreviations`

Match their layout structure, typography, spacing, and overall feel exactly.

## File to create

`src/pages/tools/yarn-weight-chart.astro`

## Layout

Use `PageLayout` with `showStripe={true}`.

## SEO metadata

- **Title tag:** `Yarn Weight Chart — All 8 Categories with Gauge, Needle Size & WPI`
- **Meta description:** `Complete yarn weight chart from lace to jumbo. Find gauge ranges, recommended needles, WPI values, and typical projects for each yarn weight category.`
- **Canonical URL:** `https://knittoolsapp.com/tools/yarn-weight-chart`

Add JSON-LD schema:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Yarn Weight Chart",
  "description": "Complete yarn weight reference chart with gauge ranges, recommended needles, WPI values, and project types for all 8 CYC categories.",
  "url": "https://knittoolsapp.com/tools/yarn-weight-chart",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

Also add `FAQPage` schema for the FAQ section.

## Page structure (top to bottom)

### 1. Tool section (top of page)

**Breadcrumb:** "← All tools" linking to `/tools/`

**H1:** "YARN WEIGHT CHART" — Bebas Neue, same size and style as other tool pages.

**Intro line:** "Eight categories, every gauge range, needle size, and WPI value. Tap any category to expand." — Geist 400, same style as other tool page intros.

#### Expandable category cards (primary interactive element)

8 rows/cards in a vertical stack, one per CYC category. Each card has:

**Collapsed state:**
- CYC number + name on the left (e.g. "0 — Lace" or "4 — Medium")
- Primary regional names on the right (e.g. "Worsted / Aran / Afghan")
- A subtle expand indicator (+ / chevron / similar — dark color)

**Expanded state** (when clicked):
- All of the above
- Plus expanded content below showing:
  - **Gauge range:** sts per 4 in / 10 cm on recommended needles
  - **Recommended needles:** US sizes and metric (mm)
  - **WPI range**
  - **Common uses:** typical project types
  - **Regional names:** all alternative terms used in different regions

**Styling:**
- Rows separated by subtle divider lines (same as FAQ dividers on other tool pages)
- Square corners — no rounded corners anywhere
- Dark text on cream background
- Clicking the row toggles its expanded state
- Multiple cards can be open simultaneously
- Smooth expand/collapse animation (height transition, ~200ms). Respect `prefers-reduced-motion`.

**Data for all 8 categories:**

```
0 — Lace
  Regional names: Lace, Cobweb, Light fingering, 2-ply (UK)
  Gauge: 33–40+ sts per 4 in on recommended needles
  Needles: US 000–1 (1.5–2.25 mm)
  WPI: 30–40+
  Common uses: Lace shawls, doilies, delicate openwork

1 — Super Fine
  Regional names: Sock, Fingering, Baby, 4-ply (UK/AUS)
  Gauge: 27–32 sts per 4 in
  Needles: US 1–3 (2.25–3.25 mm)
  WPI: 14–30
  Common uses: Socks, baby items, fine shawls, lightweight garments

2 — Fine
  Regional names: Sport, Baby, 5-ply (UK/AUS)
  Gauge: 23–26 sts per 4 in
  Needles: US 3–5 (3.25–3.75 mm)
  WPI: 12–18
  Common uses: Light garments, baby clothes, accessories

3 — Light
  Regional names: DK (Double Knitting), Light Worsted, 8-ply (UK/AUS)
  Gauge: 21–24 sts per 4 in
  Needles: US 5–7 (3.75–4.5 mm)
  WPI: 11–15
  Common uses: Sweaters, hats, scarves, baby blankets, year-round garments

4 — Medium
  Regional names: Worsted, Aran, Afghan, 10-ply (AUS)
  Gauge: 16–20 sts per 4 in
  Needles: US 7–9 (4.5–5.5 mm)
  WPI: 9–12
  Common uses: Sweaters, hats, mittens, blankets, most everyday knits

5 — Bulky
  Regional names: Chunky, Craft, Rug, 12-ply (AUS)
  Gauge: 12–15 sts per 4 in
  Needles: US 9–11 (5.5–8 mm)
  WPI: 6–9
  Common uses: Thick sweaters, scarves, blankets, quick projects

6 — Super Bulky
  Regional names: Super Chunky, Bulky, Roving
  Gauge: 7–11 sts per 4 in
  Needles: US 11–17 (8–12.75 mm)
  WPI: 5–6
  Common uses: Heavy blankets, cowls, quick accessories

7 — Jumbo
  Regional names: Jumbo, Roving
  Gauge: 0–6 sts per 4 in
  Needles: US 17+ (12.75+ mm)
  WPI: 1–4
  Common uses: Arm knitting, dramatic texture, oversized blankets
```

#### WPI identifier (secondary interactive element)

Below the expandable cards, a small tool section:

**Heading:** "Don't know your weight? Try WPI" — Geist 700, smaller than H1

**Brief intro:** "Wrap your yarn around a pencil or ruler, count how many wraps fit in one inch, then enter that number." — Geist 400

**Input + result:**
- Number input field with placeholder "e.g. 10"
- Same input styling as Cast On Calculator and Needle Size Chart search field (border, cream tones)
- Below the input, a live result shows as the user types. Example output: "10 WPI suggests Medium (CYC 4) — Worsted/Aran weight"
- Result text: Geist 500, dark color
- If no match: "Enter a WPI value between 1 and 40"

**WPI ranges for matching** (use the ranges from the category data above):
- 30–40+ → Lace (0)
- 14–30 → Super Fine (1)
- 12–18 → Fine (2)
- 11–15 → Light (3)
- 9–12 → Medium (4)
- 6–9 → Bulky (5)
- 5–6 → Super Bulky (6)
- 1–4 → Jumbo (7)

Note: ranges overlap on purpose (this matches the CYC standard). When a WPI value falls in multiple ranges, show all matching categories:
- Example: "11 WPI matches Fine (CYC 2), Light (CYC 3), or Medium (CYC 4) — your gauge swatch decides"

### 2. SEO content section (cream background)

Use the content from the provided article file (02-yarn-weight-chart.md). Sections:

- **H2: The name confusion problem** — includes subheadings for ply terminology, worsted vs aran, DK vs Light Worsted vs 8-ply, regional name collisions
- **H2: How yarn weight categories work** — CYC 0–7 overview
- **H2: How to identify yarn weight without a label** — WPI measurement, tricky yarns
- **H2: Choosing yarn weight for your project** — drape, density, substitution
- **H2: Yarn weight and needle size relationship** — recommended starting points, gauge takes over

**Internal links in the content** — update to correct paths:
- `/identify-mystery-yarn` → `/articles/identify-mystery-yarn`
- `/how-to-substitute-yarn` → `/articles/how-to-substitute-yarn`
- `/tools/cast-on-calculator` → keep as is
- `/tools/yarn-estimator` → keep as is
- `/needle-size-chart` → `/tools/needle-size-chart`

Match typography and spacing of other tool pages' content sections.

### 3. FAQ section

Same styling as other tool pages' FAQ sections. Use the FAQ content directly from the article (it already has a good FAQ section):

**Q: What's the most common yarn weight?**
A: Worsted is still the default in many North American patterns. DK shows up constantly in UK and European knitting. Between those two categories, you can cover the vast majority of garment, accessory, and home decor projects. If you're building a stash around versatility, they're the place to start.

**Q: Can you substitute one yarn weight for another?**
A: Yes, but it changes more than size. Fabric drape, yardage requirements, and needle size all shift. Some swaps are forgiving (DK for a light worsted, for example). Others turn into a fundamentally different project. Always swatch before committing, and recalculate yardage using the original pattern's total stitch count as your reference.

**Q: What does "held double" mean?**
A: It means knitting two strands together as if they were one thicker yarn. Holding two fingering-weight strands together roughly approximates DK-weight fabric, though fiber content, twist, and loft all push the result lighter or heavier. It's useful when you can't find the right weight in the color or fiber you want. Swatch it, because the results aren't perfectly predictable.

**Q: Why does my yarn look thinner or thicker than its label says?**
A: Because yarn weight categories are ranges, not fixed points. One DK yarn sits near the lighter edge of its category, another near the heavier edge. Fiber content changes the visual impression too. Cotton tends to look flatter and thinner than wool at the same WPI, while alpaca can bloom and look thicker after washing. The category on the label is a ballpark, and gauge confirms where your specific yarn actually lands.

### 4. Waitlist CTA section

Same as on the other tool pages — identical content, styling, and structure.

### 5. Footer

Existing footer, no changes.

## Important constraints

- All CSS scoped in the page's `<style>` block
- Use existing CSS custom properties — no new variables
- Vanilla JS for accordion toggle and WPI matching, same approach as other tool pages
- No external dependencies
- **SEO-critical: all category data must be present in the server-rendered HTML.** The 8 categories with their gauge, needles, WPI, uses, and regional names must be visible to search engine crawlers and readable without JavaScript. This is non-negotiable — this page's SEO value depends on Google being able to index the yarn weight data directly.
  - Preferred approach: use `<details>` / `<summary>` elements for the accordion. Content is always in the DOM, browsers handle expand/collapse natively without JS, and JS is only needed for custom animations or styling enhancements.
  - Alternative approach: all content rendered visibly by default, JS adds `aria-expanded` state and animation behavior on top. If JS fails, everything stays visible.
  - Do NOT fetch or inject category data via JavaScript at runtime — the data must be baked into the Astro page at build time.
- WPI tool: if JS is disabled, the input can be non-functional, but the page should not break. Keep a visible note or fallback guidance that links to the chart above.
- Respect `prefers-reduced-motion` for accordion animations
- Multiple accordion cards can be open at the same time (do NOT restrict to one open at a time)
- Keep the page lightweight — no heavy JavaScript for simple toggle behavior
- All text content (category names, regional names, body text, FAQ) must be plain HTML text, not rendered from JS variables, for SEO purposes

## Verification

1. `npm run build` completes without errors
2. Page loads at `/tools/yarn-weight-chart`
3. All 8 category cards expand and collapse independently
4. All category data is correctly displayed (gauge, needles, WPI, uses, regional names)
5. WPI identifier shows correct category matches, including multi-category matches for overlapping values
6. SEO content sections present with correct headings
7. Internal links point to correct paths
8. FAQ expand/collapse works
9. Waitlist CTA present
10. Stripe visible on right edge
11. Visual style matches other tool pages
12. JSON-LD schema (WebApplication + FAQPage) present in page source
13. **SEO check: view page source (Ctrl+U or View Source) and confirm all 8 category names, gauge ranges, needle sizes, WPI values, and regional names appear as plain HTML text.** If any of this data is loaded dynamically via JS or hidden from crawlers, the SEO value is lost.
14. Disable JavaScript in the browser (DevTools → Settings → Debugger → Disable JavaScript) and reload the page. All 8 categories must still be accessible — either expanded by default or via native `<details>` toggle.
