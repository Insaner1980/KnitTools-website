# Task: Create Knitting Abbreviations Tool Page

## Overview

Create a new interactive reference page at `/tools/knitting-abbreviations`. This is a searchable and filterable glossary of knitting abbreviations. The visual style must match the existing tool pages — study Cast On Calculator, Yarn Estimator, and Needle Size Chart carefully before building.

## Visual reference

**Look at these existing pages for design direction:**
- `/tools/cast-on-calculator`
- `/tools/needle-size-chart`

Match their layout structure, typography, spacing, and overall feel exactly. This page should look like it belongs to the same family.

## File to create

`src/pages/tools/knitting-abbreviations.astro`

## Layout

Use `PageLayout` with `showStripe={true}`.

## SEO metadata

- **Title tag:** `Knitting Abbreviations — Searchable List of Pattern Terms & Symbols`
- **Meta description:** `Look up any knitting abbreviation or search by technique name. Full glossary of pattern terms from k2tog to psso, organized by category.`
- **Canonical URL:** `https://knittoolsapp.com/tools/knitting-abbreviations`

Add JSON-LD schema:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Knitting Abbreviations Glossary",
  "description": "Search any knitting abbreviation or find terms by technique name.",
  "url": "https://knittoolsapp.com/tools/knitting-abbreviations",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

Also add `FAQPage` schema for the FAQ section at the bottom.

## Page structure (top to bottom)

Follow the same section order as the other tool pages.

### 1. Tool section (top of page)

Same layout pattern as Needle Size Chart and Cast On Calculator — breadcrumb, H1, intro, then the interactive element.

**Breadcrumb:** "← All tools" linking to `/tools/`

**H1:** "KNITTING ABBREVIATIONS" — Bebas Neue, same size and style as other tool pages.

**Intro line:** "Search an abbreviation to see what it means, or search a technique to find its abbreviations." — Geist 400, same style as other tool page intros.

**Search field:**
- Single text input
- Placeholder: `Search abbreviation or technique (e.g. "ssk", "decrease")`
- Same styling as the Needle Size Chart search field (including the border fix if applied)
- Filters results in real time on every keystroke

**Category filter buttons:**
- Horizontal row below the search field
- Categories: All, Cast On/Bind Off, Increases, Decreases, Cables, Lace, General, Stitch Patterns
- Style: Bebas Neue text, square corners. "All" is active by default. Active state uses a dark background with cream text. Inactive state uses outline style (border only, no fill). Same visual logic as the CM/INCHES toggle on Cast On Calculator.
- Clicking a category filters the list to show only terms in that category
- Category filter and search work together — if user selects "Decreases" and types "slip", only decrease abbreviations containing "slip" appear

**Abbreviations list:**

Display as rows, not a table (since each entry has a term + definition of varying length). Each row shows:
- **Abbreviation** — Geist 700 or 600, dark color
- **Full term / definition** — Geist 400, slightly muted or same dark

Rows separated by subtle divider lines (same as FAQ dividers on other tool pages).

The data — here are the abbreviations organized by category:

**Cast On/Bind Off:**
- CO — Cast on
- BO — Bind off (US) / Cast off (UK)

**General:**
- k — Knit
- p — Purl
- st(s) — Stitch(es)
- RS — Right side
- WS — Wrong side
- rep — Repeat
- beg — Beginning
- rem — Remaining
- cont — Continue
- alt — Alternate
- approx — Approximately
- tbl — Through back loop
- wyif — With yarn in front
- wyib — With yarn in back
- sl — Slip
- sl st — Slip stitch
- pm — Place marker
- sm — Slip marker
- MC — Main color
- CC — Contrast color
- dpn(s) — Double-pointed needle(s)
- cn — Cable needle
- rnd(s) — Round(s)

**Increases:**
- M1 — Make one (generic)
- M1L — Make one left
- M1R — Make one right
- kfb — Knit front and back
- pfb — Purl front and back
- yo — Yarn over
- inc — Increase

**Decreases:**
- k2tog — Knit two together
- p2tog — Purl two together
- ssk — Slip, slip, knit (left-leaning decrease)
- skp — Slip, knit, pass slipped stitch over
- sk2p — Slip 1, knit 2 together, pass slipped stitch over
- s2kp — Slip 2, knit 1, pass 2 slipped stitches over (centered double decrease)
- CDD — Centered double decrease
- psso — Pass slipped stitch over
- dec — Decrease

**Cables:**
- C4F — Cable 4 front
- C4B — Cable 4 back
- C6F — Cable 6 front
- C6B — Cable 6 back
- T2F — Twist 2 front
- T2B — Twist 2 back

**Lace:**
- yo — Yarn over (also in Increases)
- k2tog — Knit two together (also in Decreases)
- ssk — Slip, slip, knit (also in Decreases)
- sk2p — Slip 1, k2tog, pass slipped stitch over (also in Decreases)

**Stitch Patterns:**
- St st — Stockinette stitch / Stocking stitch (UK)
- g st — Garter stitch
- rev St st — Reverse stockinette stitch
- rib — Ribbing
- moss st — Moss stitch
- seed st — Seed stitch
- MB — Make bobble (pattern-specific)

Note: Some abbreviations appear in multiple categories (yo, k2tog, ssk). When displayed, show them in all relevant categories. When the "All" filter is active, show each abbreviation only once.

**Search behavior:**
- User types "ssk" → shows the ssk entry
- User types "decrease" → shows all entries whose definition contains "decrease", plus all entries in the Decreases category
- User types "slip" → shows all entries where abbreviation or definition contains "slip" (sl, sl st, ssk, skp, sk2p, s2kp, psso)
- Empty search + "All" category → show everything
- No results → show "No matching abbreviations found"

### 2. SEO content section (cream background)

Use the content from the provided article file (03-knitting-abbreviations.md). Sections:

- **H2: How abbreviations read in context** — basic stitches, combined actions, directional markers, shaping, structure terms, punctuation
- **H2: US vs UK differences** — bind off/cast off, gauge/tension, stockinette/stocking stitch, seed/moss stitch
- **H2: Pattern-specific abbreviations** — cables, lace, colorwork, designer shortcuts
- **H2: What the symbols on knitting charts mean** — chart symbols, reading direction, RS/WS
- **H2: A few abbreviations worth knowing early** — ssk vs skp, psso

**Internal links in content** — update to correct paths:
- `/how-to-measure-knitting-gauge` → `/articles/how-to-measure-knitting-gauge`
- `/how-to-read-knitting-pattern` → `/articles/how-to-read-knitting-pattern`
- `/` (KnitTools app link) → keep as `/`

Match typography and spacing of the content sections on the other tool pages exactly.

### 3. FAQ section

Same styling as other tool pages' FAQ sections.

Use these questions for the FAQPage schema as well.

**Q: Are knitting abbreviations the same in US and UK patterns?**
A: Most are identical. `k`, `p`, `yo`, and `k2tog` mean the same thing on both sides of the Atlantic. The differences cluster around a handful of terms: US "bind off" is UK "cast off," US "gauge" is UK "tension," and US "stockinette" is UK "stocking stitch." And "seed stitch" and "moss stitch" can swap meanings depending on the source, so trust the stitch definition over the name. When a pattern doesn't specify which system it uses, the designer's location is usually the best clue.

**Q: What does the asterisk mean in a knitting pattern?**
A: It marks a repeat. Everything between the asterisk and the next matching instruction (usually "rep from *") gets worked over and over across the row. Brackets and parentheses do the same job, grouping a set of actions that repeat a specified number of times. Missing a repeat marker is one of the fastest ways to end up with the wrong stitch count.

**Q: What if I can't find an abbreviation in a standard list?**
A: It's almost certainly pattern-specific shorthand defined by the designer. Scroll to the top of the pattern and look for an abbreviations or stitch definitions section. Cable and lace patterns are the biggest source of custom shortcuts, since designers often invent compact notation for techniques that only apply to that particular design. If it isn't listed there, the pattern notes or a chart key are the next place to check.

**Q: What's the difference between ssk and skp?**
A: Both are left-leaning decreases, and they produce nearly identical results in finished fabric. `ssk` is the modern standard and shows up in most current patterns. `skp` appears more often in older patterns. The execution differs slightly, so follow whichever the pattern specifies rather than substituting on the fly.

### 4. Waitlist CTA section

Same as on the other tool pages — identical content, styling, and structure.

### 5. Footer

Existing footer, no changes.

## Important constraints

- All CSS scoped in the page's `<style>` block
- Use existing CSS custom properties — no new variables
- Vanilla JS for search and filter logic, same approach as Needle Size Chart
- No external dependencies
- Page works without JavaScript (full list visible, search/filter is progressive enhancement)
- Respect `prefers-reduced-motion`
- Category filter + search must work together (combined filtering)

## Verification

1. `npm run build` completes without errors
2. Page loads at `/tools/knitting-abbreviations`
3. Search filters abbreviations by both abbreviation and definition text
4. Category filter buttons work and combine with search
5. All abbreviation data is present and accurate
6. SEO content sections present with correct headings
7. Internal links point to correct paths
8. FAQ expand/collapse works
9. Waitlist CTA present
10. Stripe visible on right edge
11. Visual style matches other tool pages
12. JSON-LD schema (WebApplication + FAQPage) present in page source
