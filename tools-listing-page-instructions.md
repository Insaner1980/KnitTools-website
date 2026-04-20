# Task: Create /tools/ Listing Page

## Overview

This task has three parts:
1. Create a new listing page at `/tools/` that displays all 6 free browser tools as a card grid
2. Enable the StripeRibbon on all tools pages (new listing page + existing calculator pages)
3. Update the navbar TOOLS link

## Files to create

`src/pages/tools/index.astro`

## Files to modify

- `src/pages/tools/cast-on-calculator.astro` — add `showStripe={true}` to PageLayout
- `src/pages/tools/yarn-estimator.astro` — add `showStripe={true}` to PageLayout
- `src/components/Navbar.astro` — update TOOLS link href

## StripeRibbon

The landing page (`index.astro`) already uses `PageLayout` with `showStripe={true}`, which renders the StripeRibbon component on the right edge. Enable the same stripe on all tools pages by passing `showStripe={true}` to PageLayout. This includes:
- The new `/tools/` listing page
- The existing `cast-on-calculator.astro`
- The existing `yarn-estimator.astro`

The existing calculator pages already use the `--safe-pr-desktop` / `--safe-pr-mobile` CSS custom properties for content padding, so the stripe should not overlap content. Verify this after enabling.

## Layout for the new listing page

Use `PageLayout` with `showStripe={true}`.

## SEO metadata

Pass these to the layout:

- **Title tag:** `Free Knitting Tools — Calculators & Reference Charts | KnitTools`
- **Meta description:** `Free online knitting calculators and reference charts. Cast on calculator, yarn estimator, needle size chart, yarn weight guide, abbreviations glossary, and body size charts.`
- **Canonical URL:** `https://knittoolsapp.com/tools/`

Add `CollectionPage` JSON-LD schema markup in a `<script type="application/ld+json">` block:

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Free Knitting Tools",
  "description": "Free online knitting calculators and reference charts.",
  "url": "https://knittoolsapp.com/tools/",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://knittoolsapp.com/tools/cast-on-calculator"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://knittoolsapp.com/tools/yarn-estimator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://knittoolsapp.com/tools/needle-size-chart"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "url": "https://knittoolsapp.com/tools/yarn-weight-chart"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "url": "https://knittoolsapp.com/tools/knitting-abbreviations"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "url": "https://knittoolsapp.com/tools/knitting-size-charts"
      }
    ]
  }
}
```

## Page structure

### 1. Header section

Simple, no hero banner, no dot grid, no decorative elements.

- Cream background (same as page body, `var(--cream)`)
- `padding-top: 120px` (accounts for fixed navbar 80px + breathing room)
- `padding-bottom: 48px`
- Content centered, max-width consistent with other page sections
- Apply `padding-right: var(--safe-pr-desktop)` on desktop and `var(--safe-pr-mobile)` on mobile to keep content clear of the stripe

Content:
- H1: `"Free knitting tools"` — `font-family: var(--font-display)` (Satoshi), `font-weight: 900`, size `clamp(2.5rem, 5vw, 4rem)`
- Intro paragraph below H1: `"Calculators and reference charts for your knitting projects. No signup, no app required."` — `font-family: var(--font-body)` (Creato Display), `font-weight: 400`, color `var(--dark)`, max-width ~600px

### 2. Tools grid section

- `padding-bottom: 80px`
- Same horizontal padding and safe-pr offsets as header
- **Desktop (≥769px):** 3-column grid, `gap: 24px`
- **Tablet/small desktop:** 2-column grid
- **Mobile (≤768px):** 1-column, `gap: 20px`

### 3. Card design

Each card is an `<a>` element wrapping the entire card (the whole card is clickable).

**Visual properties:**
- `background: var(--dark)` (#2E2A26)
- `border-radius: 16px`
- `padding: 32px 28px`
- `min-height: 180px` (desktop), auto on mobile
- `position: relative`
- `overflow: hidden`
- `text-decoration: none`
- `display: flex; flex-direction: column; justify-content: flex-end`
- No border, no box-shadow

**Watermark text (the distinguishing visual element):**
- Use a `::after` pseudo-element on each card
- Content is the category word: `"CALCULATOR"` or `"REFERENCE"` depending on the tool
- `font-family: var(--font-label)` (Bebas Neue)
- `font-size: clamp(4rem, 8vw, 5.5rem)`
- `color: rgba(232, 228, 208, 0.06)` — cream at very low opacity
- `position: absolute`
- `right: -8px; top: 50%; transform: translateY(-50%)`
- `white-space: nowrap`
- `pointer-events: none`
- `user-select: none`
- `letter-spacing: 0.05em`
- `transition: opacity 0.2s ease`

**Card text content (positioned above the watermark via z-index):**
- Category label: `font-family: var(--font-label)` (Bebas Neue), `font-size: 0.8rem`, `letter-spacing: 0.08em`, color is the tool's accent color (see list below), `margin-bottom: 8px`
- Tool name: `font-family: var(--font-display)` (Satoshi), `font-weight: 900`, `font-size: clamp(1.25rem, 2.5vw, 1.5rem)`, `color: var(--cream)`, `margin-bottom: 8px`, `line-height: 1.15`
- Description: `font-family: var(--font-body)` (Creato Display), `font-weight: 400`, `font-size: 0.95rem`, `color: var(--cream-muted)` (#D4D0BD), `line-height: 1.5`

**Hover state:**
- Card background transitions to `var(--dark-surface)` (#3A3531)
- Watermark opacity increases from 0.06 to 0.12
- `transition: background-color 0.2s ease`
- Do NOT add translateY, scale, or box-shadow on hover

**Focus state:**
- `outline: 2px solid var(--accent)` with `outline-offset: 2px`
- Same background change as hover

### 4. The 6 tools — data

```
1. Cast On Calculator
   - Category: CALCULATOR
   - Accent color: var(--accent) (#C45100)
   - Description: "Calculate how many stitches to cast on for any width and gauge."
   - URL: /tools/cast-on-calculator
   - Watermark: CALCULATOR

2. Yarn Estimator
   - Category: CALCULATOR
   - Accent color: var(--accent) (#C45100)
   - Description: "Estimate yarn requirements by project type, size, and yarn weight."
   - URL: /tools/yarn-estimator
   - Watermark: CALCULATOR

3. Needle Size Chart
   - Category: REFERENCE
   - Accent color: var(--avocado) (#8BA44A)
   - Description: "Convert between US, UK, metric, and Japanese needle sizes."
   - URL: /tools/needle-size-chart
   - Watermark: REFERENCE

4. Yarn Weight Chart
   - Category: REFERENCE
   - Accent color: var(--mustard) (#C9A435)
   - Description: "All 8 yarn weight categories with gauge ranges, needles, and WPI."
   - URL: /tools/yarn-weight-chart
   - Watermark: REFERENCE

5. Knitting Abbreviations
   - Category: REFERENCE
   - Accent color: var(--dusty-rose) (#B8908F)
   - Description: "Search any abbreviation or find terms by technique."
   - URL: /tools/knitting-abbreviations
   - Watermark: REFERENCE

6. Knitting Size Charts
   - Category: REFERENCE
   - Accent color: var(--avocado) (#8BA44A)
   - Description: "Body measurements for baby through adult — in cm and inches."
   - URL: /tools/knitting-size-charts
   - Watermark: REFERENCE
```

### 5. Scroll reveal

Add the `reveal` class to each card. Use staggered delays for the 6 cards:
- Row 1 (cards 1-3): `reveal-delay-1`, `reveal-delay-2`, `reveal-delay-3`
- Row 2 (cards 4-6): `reveal-delay-1`, `reveal-delay-2`, `reveal-delay-3`

On mobile (single column), use `reveal-delay-1` for all cards (no stagger — staggering a long list feels slow).

The scroll reveal system already exists in BaseLayout.astro via IntersectionObserver. Just add the CSS classes.

## Navbar update

The Navbar currently links TOOLS to `/#free-tools`. Update this:

- Change the TOOLS nav link `href` from `/#free-tools` to `/tools/`
- This applies to both the desktop nav links and the mobile hamburger menu

## Important constraints

- All CSS must be scoped inside `<style>` in the Astro component, not added to global.css
- Use only existing CSS custom properties — do not define new color variables
- Do not create a separate component file for the card. Keep everything in `tools/index.astro` since this is a single-use layout
- The page must respect `prefers-reduced-motion` — if reduced motion is preferred, remove transitions
- Do not add any images, icons, or SVG illustrations to the cards
- The only change to existing tool pages (cast-on-calculator, yarn-estimator) is adding `showStripe={true}` to their PageLayout. Do not change anything else on these pages — no content, styling, or structural changes
- The 4 new tool page URLs (needle-size-chart, yarn-weight-chart, knitting-abbreviations, knitting-size-charts) do not exist yet. The cards should still link to them — they will be created in a future task. This is fine because the site is pre-launch

## Verification

After implementation:
1. `npm run build` must complete without errors
2. Check `/tools/` in the browser at desktop and mobile widths
3. Verify the stripe ribbon appears on `/tools/`, `/tools/cast-on-calculator`, and `/tools/yarn-estimator`
4. Verify content on existing calculator pages does not overlap with or extend under the stripe
5. Verify cards on the listing page don't overlap with the stripe
6. Verify hover states work on listing page cards
7. Verify the navbar TOOLS link goes to `/tools/`
8. Check that JSON-LD schema is present in `/tools/` page source
