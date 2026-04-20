# Task: Create Needle Size Chart Tool Page

## Overview

Create a new interactive reference page at `/tools/needle-size-chart`. This is a searchable needle size conversion table with SEO content below it. The visual style must match the existing Cast On Calculator and Yarn Estimator pages — study those pages carefully before building this one.

## Visual reference

**Look at these existing pages for design direction:**
- `/tools/cast-on-calculator`
- `/tools/yarn-estimator`

Match their layout structure, typography, spacing, color usage, component styling, and overall feel. This page should look like it belongs to the same family.

## File to create

`src/pages/tools/needle-size-chart.astro`

## Layout

Use `PageLayout` with `showStripe={true}`.

## SEO metadata

- **Title tag:** `Knitting Needle Size Chart — US, UK, Metric & Japanese Conversion`
- **Meta description:** `Convert knitting needle sizes between US, UK, metric (mm), and Japanese systems. Searchable chart with recommended yarn weights per needle size.`
- **Canonical URL:** `https://knittoolsapp.com/tools/needle-size-chart`

Add JSON-LD schema:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Knitting Needle Size Chart",
  "description": "Convert knitting needle sizes between US, UK, metric (mm), and Japanese systems.",
  "url": "https://knittoolsapp.com/tools/needle-size-chart",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

Also add `FAQPage` schema for the FAQ section (see FAQ content below).

## Page structure (top to bottom)

Follow the same section order as Cast On Calculator and Yarn Estimator.

### 1. Tool section (top of page)

Same styling approach as the calculator pages — match their background treatment, padding, and spacing.

**H1:** "NEEDLE SIZE CHART" — same font, size, and style as the H1 on the calculator pages.

**Intro line:** "Convert between US, UK, metric, and Japanese needle sizes. Type any size to find its match." — same font and style as the intro text on calculator pages.

**Search field:**
- Single text input field
- Placeholder: `Search any size (e.g. "4.5", "US 7", "UK 7")`
- Style the input to match the calculator pages' input fields
- Square corners, consistent with the rest of the site
- The search should filter the table in real time as the user types (no submit button needed)

**Conversion table:**

5 columns: Metric (mm) | US | UK/Canadian | Japanese | Recommended Yarn Weight

The table data (all standard sizes):

```
1.5mm    | 000    | —      | —    | Lace
1.75mm   | 00     | —      | —    | Lace
2.0mm    | 0      | 14     | 0    | Lace
2.25mm   | 1      | 13     | —    | Super Fine
2.5mm    | 1.5    | —      | —    | Super Fine
2.75mm   | 2      | 12     | 2    | Super Fine
3.0mm    | 2.5    | 11     | 3    | Fine
3.25mm   | 3      | 10     | —    | Fine
3.5mm    | 4      | —      | 5    | Fine
3.75mm   | 5      | 9      | —    | Light
4.0mm    | 6      | 8      | 6    | Light
4.5mm    | 7      | 7      | 8    | Medium
5.0mm    | 8      | 6      | 10   | Medium
5.5mm    | 9      | 5      | —    | Medium
6.0mm    | 10     | 4      | 13   | Bulky
6.5mm    | 10.5   | 3      | —    | Bulky
7.0mm    | —      | 2      | —    | Bulky
8.0mm    | 11     | 0      | —    | Super Bulky
9.0mm    | 13     | 00     | —    | Super Bulky
10.0mm   | 15     | 000    | —    | Super Bulky
12.0mm   | 17     | —      | —    | Jumbo
12.75mm  | —      | —      | —    | Jumbo
15.0mm   | 19     | —      | —    | Jumbo
16.0mm   | 19     | —      | —    | Jumbo
19.0mm   | 35     | —      | —    | Jumbo
25.0mm   | 50     | —      | —    | Jumbo
```

Use "—" for sizes that don't have an equivalent in that system.

**Table styling:**
- Match the visual style of the calculator pages' UI elements
- Square corners on the table container
- Header row: Bebas Neue, same styling approach as labels on calculator pages
- Data rows: Geist 400, alternating row backgrounds for readability (use a very subtle contrast difference)
- Row hover: slight background change
- Metric column should be visually emphasized (slightly bolder or different treatment) since it's the primary reference column
- On mobile: table scrolls horizontally if needed, or columns stack in a card-like layout per row. Horizontal scroll is simpler and preferred.

**Search behavior:**
- User types "4.5" → shows the 4.5mm row
- User types "US 7" or just "7" → shows rows where US column matches 7 (4.5mm row)
- User types "UK 7" → shows rows where UK column matches 7 (4.5mm row)
- Matching should be case-insensitive and work with or without the system prefix
- If no match: show a "No matching needle size found" message
- If search is empty: show all rows
- Filter happens on every keystroke, no delay needed for this data size

### 2. SEO content section

Same styling as the content sections on Cast On Calculator and Yarn Estimator — cream background, dark text.

Use the article content provided in the markdown file (01-knitting-needle-size-chart.md). The content includes these sections:

- **H2: Why there are four different systems** — explains metric, US, UK, Japanese
- **H2: When metric is the safe bet** — recommends mm as primary reference
- **H2: Common conversion pitfalls** — UK reversal, missing matches, Japanese near-misses, half sizes, old patterns
- **H2: Needle size and yarn weight pairing** — CYC weight system ranges
- **H2: How to measure unmarked needles** — needle gauge tools, measuring technique

**Internal links in the content** — update these to correct paths:
- `/yarn-weight-chart` → `/tools/yarn-weight-chart`
- `/how-to-measure-knitting-gauge` → `/articles/how-to-measure-knitting-gauge`
- `/knitting-needle-materials` → `/articles/knitting-needle-materials`

Match the typography, spacing, and heading styles of the calculator pages' content sections exactly.

### 3. FAQ section

Same styling as Cast On Calculator and Yarn Estimator FAQ sections.

4 questions from the article:

**Q: Can I substitute a close needle size if I don't have the exact one?**
A: You can, but a 0.5 mm jump often shifts gauge enough to matter. Swatch again for anything fitted.

**Q: Are needle sizes the same across all brands?**
A: They should be. In practice there are slight differences, especially on cheaper sets or older needles. If your gauge is persistently off, measure the needle.

**Q: What about circular needle sizes?**
A: Same sizing as straights. The size describes tip diameter, not cable length. A 4.5 mm circular is a 4.5 mm needle whether the cable is short for a hat or long for magic loop.

**Q: Do I need every needle size?**
A: No. Most knitters live in a handful of sizes matching the yarns they use most. If you're working with Medium and Light yarns, you'll reach for 3.75 to 5.5 mm constantly.

### 4. Waitlist CTA section

Same component/section as on Cast On Calculator — identical content, styling, and structure. Reuse the same HTML or extract it into a shared component if the calculator pages already use one.

### 5. Footer

Existing footer, no changes.

## Important constraints

- All CSS scoped in the page's `<style>` block
- Use existing CSS custom properties only — do not define new variables
- JavaScript for search filtering should be vanilla JS in a `<script>` tag (no framework), same approach as the calculator pages' JS
- Do not add any external dependencies
- Respect `prefers-reduced-motion`
- The page must work without JavaScript (table should be fully visible with all rows, search is a progressive enhancement)

## Verification

1. `npm run build` completes without errors
2. Page loads at `/tools/needle-size-chart`
3. Search field filters the table correctly for mm values, US sizes, UK sizes, and Japanese sizes
4. Table is readable on mobile (horizontal scroll works)
5. All SEO content sections are present with correct headings
6. Internal links point to correct paths
7. FAQ expand/collapse works
8. Waitlist CTA is present
9. Stripe visible on right edge
10. Visual style matches Cast On Calculator and Yarn Estimator pages
11. JSON-LD schema is present in page source
