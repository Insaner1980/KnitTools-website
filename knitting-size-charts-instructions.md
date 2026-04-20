# Task: Create Knitting Size Charts Tool Page

## Overview

Create a new interactive reference page at `/tools/knitting-size-charts`. This is a tabbed interface with body measurement charts for 6 categories (Baby, Child, Youth, Women, Men, Accessories), plus a cm/inches unit toggle. The data is CYC standard. The visual style must match the other tool pages.

## Why SEO implementation matters on this page

This page holds an unusually large amount of high-value searchable data: every CYC standard measurement for baby through adult sizes, in both cm and inches. Google can rank this page for many different search queries — "knitting size chart women", "baby knitting measurements", "cardigan size chart cm", "size 8 child chest measurement inches", and many more.

**If the measurement data is not present in the server-rendered HTML, all of that SEO potential is lost.** Every measurement value for every size in every category in both units must exist in the page source as plain text, accessible to search engine crawlers without JavaScript. This is the most important constraint on this page — more important than visual polish or interaction smoothness.

## Visual reference

**Look at these existing pages for design direction:**
- `/tools/cast-on-calculator`
- `/tools/needle-size-chart`
- `/tools/knitting-abbreviations`
- `/tools/yarn-weight-chart`

Match their layout structure, typography, spacing, and overall feel exactly.

## File to create

`src/pages/tools/knitting-size-charts.astro`

## Layout

Use `PageLayout` with `showStripe={true}`.

## SEO metadata

- **Title tag:** `Knitting Size Charts — Body Measurements for Baby, Child, Women & Men`
- **Meta description:** `Standard body measurement charts for knitting. Baby through adult sizes with chest, waist, hips, arm length, and more — in cm and inches.`
- **Canonical URL:** `https://knittoolsapp.com/tools/knitting-size-charts`

Add JSON-LD schema:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Knitting Size Charts",
  "description": "Standard body measurement reference charts for knitting, from baby through adult sizes.",
  "url": "https://knittoolsapp.com/tools/knitting-size-charts",
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

**H1:** "KNITTING SIZE CHARTS" — Bebas Neue, same size and style as other tool pages.

**Intro line:** "Standard body measurements for every knitting project. Pick a category and unit to see the chart." — Geist 400, same style as other tool page intros.

**Important note below intro** (smaller text, Geist 400, slightly muted):
"These are body measurements, not finished garment measurements. Add ease for the fit you want."

#### Category tabs (primary interactive element)

Horizontal row of 6 tabs:
- BABY
- CHILD
- YOUTH
- WOMEN
- MEN
- ACCESSORIES

**Tab styling:**
- Bebas Neue, uppercase
- Active tab: `var(--accent)` (burnt orange) background, cream text (same logic as CM/INCHES toggle on Cast On Calculator)
- Inactive tabs: outline style, dark text
- Square corners
- On mobile: tabs scroll horizontally if they don't fit, OR wrap to two rows. Horizontal scroll is preferred.
- Default active tab: WOMEN (the most commonly needed category)

#### Unit toggle

Positioned near the tabs (above or right of them):
- Two buttons: CM and INCHES
- Same visual style as the CM/INCHES toggle on Cast On Calculator
- Default: CM
- Switching the toggle re-renders the active table with the selected unit

#### Measurement tables

Each category shows a table. Column headers are size labels, rows are measurements.

**Table styling:**
- Match the Needle Size Chart table style exactly
- Sticky first column (measurement name) on horizontal scroll — important for wide tables like Women and Men
- Horizontal scroll on mobile
- Header row: Bebas Neue
- Data rows: Geist 400, subtle alternating row background

**SEO-critical: ALL 6 tables must be present in the server-rendered HTML, with BOTH cm and inches values.** Only one is visible at a time (via CSS or JS), but both must exist in the DOM for crawlers to index.

#### Data for each category

##### Baby

Sizes: 3 mo, 6 mo, 12 mo, 18 mo, 24 mo

```
Measurement              | 3 mo              | 6 mo              | 12 mo             | 18 mo             | 24 mo
Chest                    | 40.5 cm / 16"     | 43 cm / 17"       | 45.5 cm / 18"     | 48 cm / 19"       | 50.5 cm / 20"
Back Waist Length        | 15.5 cm / 6"      | 17.5 cm / 7"      | 19 cm / 7.5"      | 20.5 cm / 8"      | 21.5 cm / 8.5"
Cross Back               | 18.5 cm / 7.25"   | 19.5 cm / 7.75"   | 21 cm / 8.25"     | 21.5 cm / 8.5"    | 22 cm / 8.75"
Arm Length to Underarm   | 15.5 cm / 6"      | 16.5 cm / 6.5"    | 19 cm / 7.5"      | 20.5 cm / 8"      | 21.5 cm / 8.5"
Upper Arm                | 14 cm / 5.5"      | 15.5 cm / 6"      | 16.5 cm / 6.5"    | 17.5 cm / 7"      | 19 cm / 7.5"
Armhole Depth            | 8.5 cm / 3.25"    | 9 cm / 3.5"       | 9.5 cm / 3.75"    | 10 cm / 4"        | 10.5 cm / 4.25"
Waist                    | 45.5 cm / 18"     | 48 cm / 19"       | 50.5 cm / 20"     | 52 cm / 20.5"     | 53.5 cm / 21"
Hips                     | 48 cm / 19"       | 50.5 cm / 20"     | 50.5 cm / 20"     | 53.5 cm / 21"     | 56 cm / 22"
Center Back Neck-to-Wrist| 26.5 cm / 10.5"   | 29 cm / 11.5"     | 31.5 cm / 12.5"   | 35.5 cm / 14"     | 45.5 cm / 18"
```

##### Child

Sizes: 2, 4, 6, 8, 10

```
Measurement              | Size 2            | Size 4            | Size 6            | Size 8            | Size 10
Chest                    | 53 cm / 21"       | 58.5 cm / 23"     | 63.5 cm / 25"     | 67 cm / 26.5"     | 71 cm / 28"
Back Waist Length        | 21.5 cm / 8.5"    | 24 cm / 9.5"      | 26.5 cm / 10.5"   | 31.5 cm / 12.5"   | 35.5 cm / 14"
Cross Back               | 23.5 cm / 9.25"   | 25 cm / 9.75"     | 26 cm / 10.25"    | 27 cm / 10.75"    | 28.5 cm / 11.25"
Arm Length to Underarm   | 21.5 cm / 8.5"    | 26.5 cm / 10.5"   | 29 cm / 11.5"     | 31.5 cm / 12.5"   | 34.5 cm / 13.5"
Upper Arm                | 17.5 cm / 7"      | 19 cm / 7.5"      | 20.5 cm / 8"      | 21.5 cm / 8.5"    | 22 cm / 8.75"
Armhole Depth            | 10.5 cm / 4.25"   | 12 cm / 4.75"     | 12.5 cm / 5"      | 14 cm / 5.5"      | 15.5 cm / 6"
Waist                    | 53.5 cm / 21"     | 54.5 cm / 21.5"   | 57 cm / 22.5"     | 59.5 cm / 23.5"   | 62 cm / 24.5"
Hips                     | 56 cm / 22"       | 59.5 cm / 23.5"   | 63.5 cm / 25"     | 71 cm / 28"       | 75 cm / 29.5"
Center Back Neck-to-Wrist| 45.5 cm / 18"     | 49.5 cm / 19.5"   | 52 cm / 20.5"     | 56 cm / 22"       | 61 cm / 24"
```

##### Youth

Sizes: 12, 14, 16

```
Measurement              | Size 12           | Size 14           | Size 16
Chest                    | 76 cm / 30"       | 80 cm / 31.5"     | 82.5 cm / 32.5"
Back Waist Length        | 38 cm / 15"       | 39.5 cm / 15.5"   | 40.5 cm / 16"
Cross Back               | 30.5 cm / 12"     | 31 cm / 12.25"    | 33 cm / 13"
Arm Length to Underarm   | 38 cm / 15"       | 40.5 cm / 16"     | 42 cm / 16.5"
Upper Arm                | 23 cm / 9"        | 23.5 cm / 9.25"   | 24 cm / 9.5"
Armhole Depth            | 16.5 cm / 6.5"    | 17.5 cm / 7"      | 19 cm / 7.5"
Waist                    | 63.5 cm / 25"     | 67.5 cm / 26.5"   | 69.5 cm / 27.5"
Hips                     | 80 cm / 31.5"     | 83.5 cm / 33"     | 90 cm / 35.5"
Center Back Neck-to-Wrist| 66 cm / 26"       | 68.5 cm / 27"     | 71 cm / 28"
```

##### Women

Women's category has two tables due to the range size. Show them stacked (XS–XL first, then 2X–5X below).

**Women XS–XL:**

```
Measurement              | XS                       | S                          | M                           | L                            | XL
Chest                    | 71–76 cm / 28–30"        | 81–86 cm / 32–34"          | 91.5–96.5 cm / 36–38"       | 101.5–106.5 cm / 40–42"      | 111.5–117 cm / 44–46"
Back Waist Length        | 42 cm / 16.5"            | 43 cm / 17"                | 43.5 cm / 17.25"            | 44.5 cm / 17.5"              | 45 cm / 17.75"
Cross Back               | 35.5–37 cm / 14–14.5"    | 37–38 cm / 14.5–15"        | 39.5–40.5 cm / 15.5–16"     | 42–43 cm / 16.5–17"          | 44.5 cm / 17.5"
Arm Length to Underarm   | 42 cm / 16.5"            | 43 cm / 17"                | 43 cm / 17"                 | 44.5 cm / 17.5"              | 44.5 cm / 17.5"
Upper Arm                | 25 cm / 9.75"            | 26 cm / 10.25"             | 28 cm / 11"                 | 30.5 cm / 12"                | 34.5 cm / 13.5"
Armhole Depth            | 15.5–16.5 cm / 6–6.5"    | 16.5–17.5 cm / 6.5–7"      | 17.5–19 cm / 7–7.5"         | 19–20.5 cm / 7.5–8"          | 20.5–21.5 cm / 8–8.5"
Waist                    | 58.5–61 cm / 23–24"      | 63.5–67.5 cm / 25–26.5"    | 71–76 cm / 28–30"           | 81.5–86.5 cm / 32–34"        | 91.5–96.5 cm / 36–38"
Hips                     | 83.5–86 cm / 33–34"      | 89–91.5 cm / 35–36"        | 96.5–101.5 cm / 38–40"      | 106.5–111.5 cm / 42–44"      | 116.5–122 cm / 46–48"
Center Back Neck-to-Wrist| 66–68.5 cm / 26–26.5"    | 68.5–70 cm / 27–27.5"      | 71–72.5 cm / 28–28.5"       | 73.5–75 cm / 29–29.5"        | 73.5–75 cm / 29–29.5"
```

**Women 2X–5X:**

```
Measurement              | 2X                       | 3X                         | 4X                          | 5X
Chest                    | 122–127 cm / 48–50"      | 132–137 cm / 52–54"        | 142–147 cm / 56–58"         | 152–158 cm / 60–62"
Back Waist Length        | 45.5 cm / 18"            | 45.5 cm / 18"              | 47 cm / 18.5"               | 47 cm / 18.5"
Cross Back               | 45.5 cm / 18"            | 45.5 cm / 18"              | 47 cm / 18.5"               | 47 cm / 18.5"
Arm Length to Underarm   | 45.5 cm / 18"            | 45.5 cm / 18"              | 47 cm / 18.5"               | 47 cm / 18.5"
Upper Arm                | 39.5 cm / 15.5"          | 43 cm / 17"                | 47 cm / 18.5"               | 49.5 cm / 18.5"
Armhole Depth            | 21.5–23 cm / 8.5–9"      | 23–24 cm / 9–9.5"          | 24–25.5 cm / 9.5–10"        | 25.5–26.5 cm / 10–10.5"
Waist                    | 101.5–106.5 cm / 40–42"  | 111.5–114 cm / 44–45"      | 116.5–119 cm / 46–47"       | 124–127 cm / 49–50"
Hips                     | 132–134.5 cm / 52–53"    | 137–139.5 cm / 54–55"      | 142–144.5 cm / 56–57"       | 155–157 cm / 61–62"
Center Back Neck-to-Wrist| 76.5–77.5 cm / 30–30.5"  | 77.5–79 cm / 30.5–31"      | 80–81.5 cm / 31.5–32"       | 80–81.5 cm / 31.5–32"
```

##### Men

Same pattern — two stacked tables.

**Men S–XL:**

```
Measurement              | S                        | M                          | L                           | XL
Chest                    | 86–91.5 cm / 34–36"      | 96.5–101.5 cm / 38–40"     | 106.5–111.5 cm / 42–44"     | 116.5–122 cm / 46–48"
Back Waist Length        | 58.5–61 cm / 23–24"      | 63.5–66 cm / 25–26"        | 66–68.5 cm / 26–27"         | 71 cm / 28"
Cross Back               | 39.5–40.5 cm / 15.5–16"  | 42–43 cm / 16.5–17"        | 44.5–45.5 cm / 17.5–18"     | 45.5–47 cm / 18–18.5"
Arm Length to Underarm   | 45.5 cm / 18"            | 47 cm / 18.5"              | 49.5 cm / 19.5"             | 50.5 cm / 20"
Upper Arm                | 30.5 cm / 12"            | 33 cm / 13"                | 38 cm / 15"                 | 39.5 cm / 15.5"
Armhole Depth            | 21.5–23 cm / 8.5–9"      | 23–24 cm / 9–9.5"          | 24–25.5 cm / 9.5–10"        | 25.5–26 cm / 10–10.5"
Waist                    | 71–76 cm / 28–30"        | 81.5–86.5 cm / 32–34"      | 91.5–96.5 cm / 36–38"       | 106.5–112 cm / 42–44"
Hips                     | 89–94 cm / 35–37"        | 99–104 cm / 39–41"         | 109–114 cm / 43–45"         | 119–124.5 cm / 47–49"
Center Back Neck-to-Wrist| 81–82.5 cm / 32–32.5"    | 83.5–85 cm / 33–33.5"      | 86.5–87.5 cm / 34–34.5"     | 89–90 cm / 35–35.5"
```

**Men 2X–5X:**

```
Measurement              | 2X                       | 3X                         | 4X                          | 5X
Chest                    | 127–132 cm / 50–52"      | 137–142 cm / 54–56"        | 147.5–152 cm / 58–60"       | 157.5–162.5 cm / 62–64"
Back Waist Length        | 73.5 cm / 29"            | 76 cm / 30"                | 76 cm / 30"                 | 79 cm / 31"
Cross Back               | 48–51 cm / 19–20"        | 48–51 cm / 20–21"          | 51–54.5 cm / 21–21.5"       | 56–57 cm / 22–22.5"
Arm Length to Underarm   | 52 cm / 20.5"            | 52 cm / 20.5"              | 49.5 cm / 21"               | 53.5–54.5 cm / 21.5"
Upper Arm                | 42 cm / 16.5"            | 44.5 cm / 17.5"            | 47 cm / 18.5"               | 48 cm / 20"
Armhole Depth            | 28 cm / 11"              | 29 cm / 11.5"              | 30.5 cm / 12"               | 32 cm / 12.5"
Waist                    | 117–122 cm / 46–48"      | 127–132 cm / 50–52"        | 137–142 cm / 54–56"         | 147.5–152.5 cm / 58–60"
Hips                     | 129–134 cm / 51–53"      | 137–142 cm / 54–56"        | 142–147.5 cm / 56–58"       | 147.5–152.5 cm / 58–60"
Center Back Neck-to-Wrist| 91.5–92.5 cm / 36–36.5"  | 94–95 cm / 37–37.5"        | 96.5–97.5 cm / 38–38.5"     | 99–100.5 cm / 39–39.5"
```

##### Accessories

Three sub-tables under this tab: Head Circumference, Foot Size, Hand Size.

**Head circumference:**

```
Category   | Circumference
Preemie    | 23–30.5 cm / 9–12"
Baby       | 35.5–40.5 cm / 14–16"
Toddler    | 40.5–46 cm / 16–18"
Child      | 45.5–51 cm / 18–20"
Tween      | 51–56 cm / 20–22"
Woman      | 53–58.5 cm / 21–23"
Man        | 56–61 cm / 22–24"
```

**Foot size** (length in cm / inches):

```
Size         | Length
Baby (0–6mo) | 9 cm / 3.5"
Baby (6–12mo)| 10–11 cm / 4–4.5"
Toddler (1–2)| 12–13 cm / 4.75–5"
Child (3–6)  | 14–18 cm / 5.5–7"
Child (7–10) | 19–21 cm / 7.5–8.25"
Youth        | 22–24 cm / 8.5–9.5"
Women        | 23–26 cm / 9–10.25"
Men          | 25–29 cm / 10–11.5"
```

**Hand size** (palm circumference):

```
Size      | Circumference
Baby      | 10–13 cm / 4–5"
Toddler   | 13–15 cm / 5–6"
Child     | 15–18 cm / 6–7"
Youth     | 18–20 cm / 7–8"
Women     | 18–20 cm / 7–8"
Men       | 20–23 cm / 8–9"
```

Under this tab, a brief note above the sub-tables: "Head, foot, and hand measurements for hats, socks, mittens, and gloves." Then each sub-table has its own H3 heading (Head Circumference, Foot Size, Hand Size) in Geist 700.

### 2. SEO content section (cream background)

Use the content from the provided article file (42-knitting-size-charts.md). Sections:

- **H2: How to take body measurements** — where and how to measure each point on the body
- **H2: Body measurements vs finished garment measurements** — ease types (negative, zero, positive, oversized)
- **H2: Choosing between sizes** — when your measurements fall between two sizes

**Internal links in the content** — update to correct paths:
- `/tools/yarn-estimator` → keep as is
- `/articles/how-much-yarn-for-a-sweater` → keep as is
- `/articles/gauge-swatch-guide` → `/articles/gauge-swatch-step-by-step`
- `/articles/how-to-calculate-knitting-gauge` → `/articles/how-to-measure-knitting-gauge`

Match typography and spacing of other tool pages' content sections.

### 3. FAQ section

Same styling as other tool pages' FAQ sections. Use the FAQ content directly from the article:

**Q: Are these measurements the same across all knitting patterns?**
A: Most major publishers and independent designers follow Craft Yarn Council standards, but there's no universal enforcement. Some designers use their own sizing, particularly those focused on size-inclusive design with more granular options. Always check the specific pattern's size chart if one is provided.

**Q: How do I choose a size if the pattern uses numbered sizes instead of XS/S/M/L?**
A: Compare the chest measurement listed for each numbered size with the charts above. The chest measurement is what matters — ignore the label.

**Q: Should I measure over clothing or on bare skin?**
A: Over lightweight clothing — a fitted t-shirt or thin layer. A bulky sweater adds inches that don't reflect your body. Bare skin can read slightly smaller than the garment actually needs to accommodate.

**Q: What if my measurements don't fit neatly into one size?**
A: Normal. Most people aren't a single size across all measurements. Prioritize the measurement most important for the garment: chest for a sweater, hips for a skirt, head circumference for a hat. Many patterns include instructions for lengthening or shortening specific sections.

### 4. Waitlist CTA section

Same as on the other tool pages — identical content, styling, and structure.

### 5. Footer

Existing footer, no changes.

## Important constraints

- All CSS scoped in the page's `<style>` block
- Use existing CSS custom properties — no new variables
- Vanilla JS for tab switching and unit toggle, same approach as other tool pages
- No external dependencies
- **SEO-critical: ALL table data for all 6 categories must be present in the server-rendered HTML, with BOTH cm and inches values in the DOM.** Tab switching and unit toggling should show/hide via CSS classes, not remove data from the DOM. This is non-negotiable — the page's SEO value depends on Google being able to index every measurement value.
  - Do NOT fetch or inject table data via JavaScript at runtime — all data must be baked into the Astro page at build time.
  - The unit toggle can work by toggling a CSS class on a parent element (e.g. `.show-cm` vs `.show-inches`) that uses CSS to hide the unit not selected, OR by showing both values joined ("40.5 cm / 16\"") with CSS selectively hiding one half. Either approach keeps all data in the DOM.
- Tab switching: default active tab is WOMEN, but all 6 tab panels must be in the DOM. Inactive tabs hidden via CSS (`display: none` or similar), not removed.
- Respect `prefers-reduced-motion`
- Tables must scroll horizontally on mobile with sticky first column (measurement name)
- All text content (size labels, measurement names, body text, FAQ) must be plain HTML text, not rendered from JS variables

## Verification

1. `npm run build` completes without errors
2. Page loads at `/tools/knitting-size-charts`
3. All 6 category tabs render and switch correctly
4. Unit toggle switches all visible values between cm and inches
5. All measurement data is correctly displayed for every category
6. Tables scroll horizontally on mobile with the measurement name column remaining visible
7. SEO content sections present with correct headings
8. Internal links point to correct paths
9. FAQ expand/collapse works
10. Waitlist CTA present
11. Stripe visible on right edge
12. Visual style matches other tool pages
13. JSON-LD schema (WebApplication + FAQPage) present in page source
14. **SEO check: view page source (Ctrl+U) and confirm ALL measurement values for ALL 6 categories in BOTH cm and inches are present as plain HTML text.** If any data is loaded dynamically via JS, SEO value is lost.
15. Disable JavaScript in the browser and reload. All 6 categories and both units must remain accessible (even if tab switching stops working, the data should still be readable — e.g. all tables visible, or first tab shown with others below).
