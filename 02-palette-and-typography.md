# Instruction 02: Palette Alignment and Typography Accents

## Context

This is the second of three instructions updating the KnitTools landing page. Instruction 01 handled copy. This instruction aligns the color palette so the right-edge stripe ribbon is no longer a standalone decorative element but is visibly the source of all colors on the page. It also introduces Geist's native italic as the accent-font for emphasized words, replacing any use of Instrument Serif or other accent fonts.

**Scope:** color variables, italic accent styling, and brand-voice consistency. No layout changes and no new components in this instruction.

## Task 1: Extend the palette with stripe-derived colors

In `src/styles/global.css`, ensure the `:root` block has these CSS custom properties (add any that are missing, update any that exist with different values):

```css
:root {
  /* Existing core — keep as-is */
  --dark: #2E2A26;
  --dark-deep: #262320;
  --dark-surface: #3A3531;
  --cream: #E8E4D0;
  --cream-muted: #D4D0BD;
  --accent: #C45100;        /* burnt orange, primary CTA */
  --accent-hover: #A84500;
  --accent-soft: rgba(196, 81, 0, 0.15);

  /* Stripe-derived palette — used site-wide, not only in the stripe */
  --stripe-terracotta: #A05038;
  --stripe-rust: #C2703E;
  --stripe-sand: #C4A661;
  --stripe-brown: #6B4332;
  --stripe-teal: #5B8072;

  /* Semantic aliases — use these in components */
  --accent-warm: var(--stripe-rust);       /* secondary warm accent */
  --accent-cool: var(--stripe-teal);       /* success messages, cool moments */
  --accent-earth: var(--stripe-sand);      /* tertiary accent */
  --surface-deep: var(--stripe-brown);     /* optional deep-warm surface */

  /* Text on dark/light — keep existing */
  --text-on-dark: #E8E4D0;
  --text-on-dark-muted: #B8B4A4;
  --text-on-light: #2E2A26;
  --text-on-light-muted: #5C5750;
}
```

## Task 2: Use stripe palette in component backgrounds

Review these components and update their background colors to pull from the stripe palette where they currently use one-off values:

**`src/components/FeatureOrganize.astro`** (diagonal section)
- The terracotta `::before` pseudo-element should use `var(--stripe-terracotta)` instead of a hardcoded hex value.

**`src/components/FeatureCalculate.astro`** (diagonal section)
- The teal `::before` pseudo-element should use `var(--stripe-teal)`.

**`src/components/FeatureScanSave.astro`** (diagonal section)
- The terracotta `::before` pseudo-element should use `var(--stripe-terracotta)`.

**`src/components/StripeRibbon.astro`**
- Update the five stripe colors to reference the CSS variables: `var(--stripe-terracotta)`, `var(--stripe-brown)`, `var(--stripe-sand)`, `var(--stripe-rust)`, `var(--stripe-teal)`.
- Visual output should be identical to before — this is a refactor, not a redesign.

**Tools listing page (`src/pages/tools/index.astro`)**
- Card backgrounds in the bento grid should use stripe palette variables (rgba at 0.88 opacity) instead of hardcoded hex values.

The point: any visitor who notices the stripe should subconsciously recognize those same colors reappearing throughout the page.

## Task 3: Establish Geist italic as the accent-font for emphasized words

The current brand voice uses italic burnt-orange emphasis on key phrases (`Own it.`, `No ads.`, `counts.` etc.). This is already set up for certain elements, but should be formalized into a reusable class.

In `src/styles/global.css`, add this utility class:

```css
.accent-italic {
  font-style: italic;
  font-weight: 500;
  color: var(--accent);
  font-family: var(--font-display); /* Geist Variable; italic axis engaged by font-style: italic */
  font-variation-settings: "wght" 500, "slnt" -10;
}
```

(Adjust `slnt` value if Geist Variable uses a different axis name in your setup — some variable Geist builds use `italic` axis, others use `slnt`. Test in the browser; if neither works, fall back to standard `font-style: italic`.)

Ensure these components use `<span class="accent-italic">` wrapping for the accent parts of headings:

**Hero H1**: `Keep knitting.` (this is already styled as accent, just make sure it uses the new class)

**TrustSection headlines** (from Instruction 01):
- `Pay once. <span class="accent-italic">Own it.</span>`
- `No tracking. <span class="accent-italic">No ads.</span>`
- `Works <span class="accent-italic">on the sofa.</span>`

**ClosingCTA H1**: `Where every stitch <span class="accent-italic">counts.</span>`

**Feature section tags and headlines** where italic + accent is already used should migrate to this class.

**Nine Tools section headlines** (these come in Instruction 03 — if you're running instructions in order, ignore for now; if running out of order, apply the class to each tool item's accented phrase).

## Task 4: Remove any "Instrument Serif", "Fraunces", or other non-system accent fonts

Search the codebase for any font-family reference to `Instrument Serif`, `Fraunces`, `DM Serif Display`, or other accent serifs that aren't part of the current system (Geist variable, Bebas Neue, Teko).

Replace all such references with `var(--font-display)` (Geist) and ensure the accent styling relies on `font-style: italic` + accent color instead of a distinct font family.

Also check `public/fonts/` for legacy font files that are no longer referenced:
- `DMSerifDisplay-Regular.woff2`
- `DMSerifDisplay-Italic.woff2`
- Any `Fraunces*` or `InstrumentSerif*` files if they exist

These can be deleted to reduce the shipped asset size. Verify no `@font-face` rule references them before deleting.

## Task 5: Verify success-message coloring

In both waitlist forms (Hero and ClosingCTA from Instruction 01), the success message after signup should use `var(--accent-cool)` (the stripe teal) rather than burnt orange. This differentiates success/confirmation states from call-to-action states. Burnt orange = "do this"; teal = "you did this".

Also in the footer, if there are any small accent-colored signs of life (e.g. a heart icon or contact link hover state), use `var(--accent-warm)` (stripe rust) rather than pure `--accent`. This adds subtle palette variation without changing CTA visual hierarchy.

## Verification checklist

After completing this instruction, verify:

- [ ] Stripe ribbon visible output is unchanged
- [ ] The three diagonal feature sections still render with their existing colors
- [ ] `var(--stripe-*)` variables are used throughout the codebase where those specific colors appear
- [ ] `.accent-italic` class exists and is used for all accented phrases in headings
- [ ] No references to Instrument Serif, Fraunces, or other non-system fonts remain
- [ ] Legacy font files in `public/fonts/` that are unused have been deleted
- [ ] Waitlist success messages use teal (`var(--accent-cool)`) not burnt orange
- [ ] Site builds without errors
- [ ] Visual check on mobile: the stripe colors now visibly appear elsewhere on the page (diagonal sections, tools grid)

Do not modify layout or add new components in this instruction. Layout work comes in Instruction 03.
