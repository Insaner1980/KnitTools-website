# Task: Redesign Cast On Calculator as Tool Page Template

## Overview

Redesign `/tools/cast-on-calculator` to establish the visual template for all 6 tool pages. The design must follow the same visual language as the `/tools/` bento grid: no rounded corners, stripe palette colors, Bebas Neue headings, dark text, Geist body text.

This is the template page. Once approved, the same structure will be applied to the other 5 tool pages.

## File to modify

`src/pages/tools/cast-on-calculator.astro`

## Layout

Use `PageLayout` with `showStripe={true}`.

## SEO metadata

Keep existing title tag, meta description, and canonical URL unchanged. Keep any existing JSON-LD schema.

## Page structure (top to bottom)

### 1. Tool hero section (colored background)

This is the main visual element — a full-width section with the tool's color from the bento grid.

**Background:** Terracotta `rgba(160, 80, 56, 0.88)` — same as the Cast On Calculator card on `/tools/`. The slight transparency lets the cream page background show through, matching the bento cards.

**No rounded corners anywhere.** Sharp edges only — consistent with the bento grid.

**Layout:**
- Full viewport width (edge to edge, ignoring content max-width for the background color)
- Content inside respects the same max-width and padding as other page sections
- `padding-top: 120px` (navbar clearance)
- `padding-bottom: 60px`
- Apply `padding-right: var(--safe-pr-desktop)` / `var(--safe-pr-mobile)` to keep content clear of the stripe

**Content inside the hero:**

**H1:** The tool name — "CAST ON CALCULATOR"
- `font-family: var(--font-label)` (Bebas Neue)
- `font-size: clamp(2rem, 4vw, 3rem)`
- `color: var(--dark)` (#2E2A26)
- `letter-spacing: 0.04em`
- All caps (natural for Bebas Neue)
- `margin-bottom: 12px`

**Intro line:** "Calculate how many stitches to cast on for any width and gauge."
- `font-family: var(--font-body)` (Geist)
- `font-weight: 400`
- `font-size: 1.05rem`
- `color: var(--dark)` with slight opacity, e.g. `rgba(46, 42, 38, 0.8)`
- `margin-bottom: 40px`
- `max-width: 500px`

**The calculator itself:**
- Move the existing calculator form into this colored section
- Input fields: white or cream background (`var(--cream)` or `#fff`), dark text, dark border
- The +/- spin buttons: dark background or dark outline, to contrast with the colored section
- Unit toggle (CM / INCHES): dark style — dark background with cream text for active, outline for inactive
- CALCULATE button: `var(--dark)` background, `var(--cream)` text, Bebas Neue, square corners. NOT burnt orange — the button should contrast with the terracotta background. Dark button on colored background is more striking.
- Result display: if currently shown inside the calculator, keep it there. Style it with dark text, larger font size for the stitch count number.
- "For a more precise estimate, try KnitTools for Android" nudge line: keep it, dark text with link in `var(--dark)`.

**Important:** The calculator functionality must remain identical. Do not change any JavaScript logic, calculation formulas, or input behavior. Only restyle the visual presentation.

### 2. SEO content section (cream background)

Everything below the tool hero switches to cream background (`var(--cream)`).

**Transition:** Sharp, clean edge. The colored hero section ends, cream begins. No gradient, no divider, no decorative element.

**Content:** This is the existing educational content (H2 sections like "What is cast on in knitting?", "Why gauge matters", "How to use this calculator", etc.)

**Typography:**
- H2: `font-family: var(--font-display)` (Geist), `font-weight: 800`, `color: var(--dark)`, `font-size: clamp(2rem, 4vw, 3rem)`
- Body text: `font-family: var(--font-body)` (Geist), `font-weight: 400`, `color: var(--dark)`, `font-size: 1rem`, `line-height: 1.7`
- Max-width for text content: ~720px, centered or left-aligned (match existing layout)
- `padding-top: 64px`, `padding-bottom: 64px`
- Generous spacing between H2 sections (`margin-top: 48px` between sections)

**Important:** Do not change any of the existing text content. Only restyle its presentation from dark-background to cream-background.

### 3. FAQ section (cream background)

Keep existing FAQ content and `<details>/<summary>` structure.

**Restyle for cream background:**
- Summary text (questions): `font-family: var(--font-body)` (Geist), `font-weight: 600`, `color: var(--dark)`, `font-size: 1.05rem`
- Answer text: Geist 400, dark, same as body text
- Divider lines between questions: `var(--cream-muted)` (#D4D0BD)
- The expand/collapse icon: keep the existing yarn ball icon (faq-button.webp) if it's currently used, or use a simple + / – in dark color
- `padding-top: 48px`, `padding-bottom: 64px`
- Section heading "Frequently asked questions": Geist 800 same as other H2s, OR Bebas Neue to match the tool name style. Try Geist 800 first.

### 4. Waitlist CTA section (cream background)

New section added after FAQ, before footer.

**Content:**
- Heading: "There's more in the app" — Geist 800, `color: var(--dark)`, same size as H2
- Body: "Row counter, project management, yarn scanner, and all four calculators — in one app. Join the waitlist to get notified at launch." — Geist 400
- Email input + button: 
  - Input: white/cream background, dark border, dark placeholder text, square corners
  - Button: "JOIN WAITLIST" — Bebas Neue, `var(--dark)` background, `var(--cream)` text, square corners
  - Layout: input and button side by side on desktop, stacked on mobile
- Centered, max-width ~500px
- `padding-top: 48px`, `padding-bottom: 80px`

**Note:** This email form does not need to be functional yet. Just create the HTML structure and styling. Backend integration comes later.

### 5. Footer

Existing footer, no changes.

## What to remove

- The dark background content section (the entire dark-themed area below the calculator that contains H2s and body text)
- Any ToolClosingCTA component at the bottom (the "Get the full toolkit" dark section) — replaced by the waitlist CTA
- Dark themed FAQ styling — replaced by cream-themed

## What to keep unchanged

- All calculator JavaScript/logic
- All text content (headings, body text, FAQ questions and answers)
- All SEO metadata
- The stripe ribbon
- The footer

## CSS approach

- All new styles scoped in the page's `<style>` block
- Override/replace the existing scoped styles
- Do not modify global.css for this task
- Use existing CSS custom properties only

## Verification

After implementation:
1. `npm run build` completes without errors
2. Calculator works exactly as before (input, calculate, results)
3. Tool hero section has terracotta background with sharp edges
4. Content below is cream background with dark text
5. No rounded corners anywhere on the page
6. Text is readable against all backgrounds
7. Stripe visible on right edge, content doesn't overlap it
8. FAQ expand/collapse works
9. Page looks correct at both desktop and mobile widths
10. Waitlist email form is visible (doesn't need to submit yet)
