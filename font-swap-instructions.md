# Font Swap: Satoshi → Fraunces, Creato Display → Figtree

## Context

KnitTools website is switching two of its four fonts. The goal is typographic contrast between heavy upright headings (Fraunces 900) and light italic accent words (Fraunces 300 Italic) within the same font family.

**What changes:**
- Satoshi (headings) → Fraunces (variable font, all axes)
- Creato Display (body) → Figtree

**What stays:**
- Bebas Neue (labels, tags, buttons, nav links, marquee)
- Outfit (navbar logo "KnitTools")

## Step 1: Download fonts

Download Fraunces variable woff2 files to `/public/fonts/`:
- `fraunces-variable.woff2` (upright, weight 100-900, all axes)
- `fraunces-variable-italic.woff2` (italic, weight 100-900, all axes)

Source: https://fonts.google.com/specimen/Fraunces — download the variable woff2 files. Alternatively use fontsource: `https://cdn.jsdelivr.net/fontsource/fonts/fraunces:vf@latest/latin-full-normal.woff2` and the italic equivalent.

Download Figtree woff2 files to `/public/fonts/`:
- `figtree-variable.woff2` (weight 300-700)

Source: https://fonts.google.com/specimen/Figtree or fontsource equivalent.

## Step 2: Update @font-face in global.css

Remove the existing `@font-face` rules for Satoshi (all weights) and Creato Display (all weights).

Add these new `@font-face` rules:

```css
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/fraunces-variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/fraunces-variable-italic.woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Figtree';
  src: url('/fonts/figtree-variable.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
```

## Step 3: Update CSS custom properties

Find the existing font custom properties (likely `--font-display`, `--font-body` or similar) and update:

```css
--font-display: 'Fraunces', serif;    /* was Satoshi */
--font-body: 'Figtree', sans-serif;   /* was Creato Display */
--font-label: 'Bebas Neue', sans-serif; /* unchanged */
--font-logo: 'Outfit', sans-serif;      /* unchanged */
```

## Step 4: Set Fraunces variable axes defaults

Add base settings for headings that use `--font-display`:

```css
h1, h2 {
  font-family: var(--font-display);
  font-variation-settings: 'SOFT' 80, 'WONK' 1;
}
```

Specific heading styles (keep existing sizes, line-heights, letter-spacing — only change font-family and add font-variation-settings):

**H1** (Hero, ClosingCTA):
- `font-weight: 900`
- `font-variation-settings: 'SOFT' 80, 'WONK' 1`

**H2** (feature sections, TrustSection):
- `font-weight: 900`
- `font-variation-settings: 'SOFT' 80, 'WONK' 1`

## Step 5: Create `.accent-word` class

This is the key new element. Add a new global class:

```css
.accent-word {
  font-family: var(--font-display);
  font-weight: 300;
  font-style: italic;
  font-variation-settings: 'SOFT' 80, 'WONK' 1;
  color: var(--accent);
}
```

This replaces the current approach where `<em>` and `.accent` only change color to burnt orange. Now accent words also change weight and style.

## Step 6: Update HTML — replace `<em>` with `.accent-word` in headings

In these components, find the accent/emphasized words in headings and wrap them in `<span class="accent-word">` instead of `<em>` or whatever is currently used:

**Hero.astro** — H1:
```
Every tool a knitter needs. <span class="accent-word">One App.</span>
```

**FeatureCalculate.astro** — H2:
```
Four calculators for every <span class="accent-word">knitting math</span>
```

**TrustSection.astro** — H2:
```
No ads. No subscription. Yours <span class="accent-word">forever.</span>
```

**ClosingCTA.astro** — H2:
```
Where <span class="accent-word">every stitch</span> counts.
```

Check all other feature section H2s for any `<em>` or `.accent` usage in headings and convert them to `.accent-word` the same way.

**Important:** Do NOT convert `<em>` tags in body/paragraph text to `.accent-word`. Regular `<em>` in body text should just be normal Figtree italic. The `.accent-word` class is only for heading-level accent words.

## Step 7: Update font preload in BaseLayout.astro

Find the existing `<link rel="preload">` tags for Satoshi and Creato Display fonts. Replace them with:

```html
<link rel="preload" href="/fonts/fraunces-variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/figtree-variable.woff2" as="font" type="font/woff2" crossorigin>
```

Keep the existing Bebas Neue preload. Remove preloads for Satoshi and Creato Display files.

Do NOT preload the Fraunces italic file — it's used less frequently and can load on demand.

## Step 8: Clean up old font files

Delete the old Satoshi and Creato Display woff2 files from `/public/fonts/`. Keep Bebas Neue and Outfit files.

## Step 9: Update TrustSection number styling

The trust numbers (€5.99, 100%, Zero) should use Fraunces 700:

```css
font-family: var(--font-display);
font-weight: 700;
font-variation-settings: 'SOFT' 80, 'WONK' 1;
```

## Verification

After all changes, check:
1. `npm run build` succeeds
2. Landing page renders with Fraunces headings (thick serif) and Figtree body text
3. Accent words in headings appear in thin italic Fraunces with burnt orange color
4. Bebas Neue still appears in labels, tags, nav links, buttons, marquee
5. Outfit still appears in navbar logo
6. No remaining references to Satoshi or Creato Display in CSS or preload tags
7. No FOUT (flash of unstyled text) — preloaded fonts load first

## Do NOT change

- Any font sizes, line-heights, letter-spacing, or clamp() values — keep existing responsive sizing
- Bebas Neue usage anywhere
- Outfit usage in navbar
- The marquee, footer, or calculator page typography beyond the font-family swap
- Article page layout (articles don't exist yet, so no changes needed there now)
