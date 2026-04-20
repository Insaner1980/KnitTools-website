# Task: Site-Wide Font Update + Tools Listing Card Redesign

## Overview

Two changes in one task:
1. Replace Satoshi, Creato Display, and Outfit fonts with Geist across the entire site
2. Redesign the `/tools/` listing page cards with colored backgrounds from the stripe palette

---

## Part 1: Font Replacement — Geist

### What changes

| Old font | Old role | New font | New weight |
|----------|----------|----------|------------|
| Satoshi 900 | H1, H2 (display headings) | Geist | 800 or 900 |
| Creato Display 400/500/700 | Body text, descriptions, meta | Geist | 400 (body), 500 (medium), 700 (bold) |
| Outfit 700 | Navbar logo "KnitTools" | Geist | 700 |
| Bebas Neue 400 | Labels, tags, nav links, buttons, marquee | **No change** | **No change** |

### Download Geist

Download the Geist Sans variable font woff2 from https://github.com/vercel/geist-font (OFL 1.1 license). The variable font file covers all weights (100-900) in a single file.

Place it in `/public/fonts/` as `geist-variable.woff2` (or similar naming).

### Update @font-face in global.css

Remove the existing @font-face declarations for Satoshi, Creato Display, and Outfit. Replace with a single Geist variable font declaration:

```css
@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
```

If the variable font file is not available or causes issues, download individual static weights (400, 500, 700, 800, 900) as separate woff2 files and declare each one.

### Update CSS custom properties in global.css

```css
/* BEFORE */
--font-display: 'Satoshi', sans-serif;
--font-body: 'Creato Display', sans-serif;
--font-logo: 'Outfit', sans-serif;

/* AFTER */
--font-display: 'Geist', sans-serif;
--font-body: 'Geist', sans-serif;
--font-logo: 'Geist', sans-serif;
```

`--font-label` (`'Bebas Neue'`) stays unchanged.

### Update font preloads in BaseLayout.astro

Remove preload links for satoshi, creato-display, and outfit font files. Add preload for the Geist variable font:

```html
<link rel="preload" href="/fonts/geist-variable.woff2" as="font" type="font/woff2" crossorigin />
```

### Remove old font files

After confirming everything works, delete the old font files from `/public/fonts/`:
- All satoshi-* files
- All creato-display-* files  
- All outfit-* files

Keep all bebas-neue files.

### Typography adjustments

Geist has different metrics than Satoshi and Creato. After the swap, check and adjust if needed:

**H1:** Currently `clamp(3rem, 6.5vw, 6.875rem)`, weight 900, letter-spacing -0.03em. Geist 900 is slightly lighter than Satoshi 900. Try Geist at weight 800 first — if it looks too light, use 900. Letter-spacing may need adjustment (Geist tracks slightly tighter naturally, try -0.02em).

**H2:** Currently `clamp(2.5rem, 5vw, 5rem)`, weight 900. Same consideration — try 800 first.

**Body text:** Currently Creato Display 400. Geist 400 should work directly. Line-height may need slight adjustment — Geist has a taller x-height than Creato, so the same line-height might feel tighter. If body text feels cramped, increase line-height from current value by ~0.05.

**Navbar logo "KnitTools":** Currently Outfit 700. Change to Geist 700. The visual weight will be similar.

### Verify typography everywhere

After the font swap, visually check these pages/components:
- Landing page hero (H1)
- All feature section headings (H2)
- Navbar logo text
- Trust section
- Footer
- Cast On Calculator page (headings + body text in dark section)
- Yarn Estimator page
- Tools listing page
- Any body text paragraphs

---

## Part 2: Tools Listing Card Redesign

### Changes to `/tools/` listing page cards

File: `src/pages/tools/index.astro`

#### Remove category labels

Delete the category label text above each tool name. Remove the "CALCULATOR" and "REFERENCE" labels entirely — both the HTML elements and their CSS. The tool name and description are sufficient.

#### New card background colors

Replace the single `var(--dark)` background with individual colors per card, using rgba with ~0.88 opacity so the cream page background shows through slightly:

```
1. Cast On Calculator    → rgba(160, 80, 56, 0.88)     /* Terracotta */
2. Yarn Estimator        → rgba(194, 112, 62, 0.88)    /* Rust */
3. Needle Size Chart     → rgba(91, 128, 114, 0.88)    /* Teal */
4. Yarn Weight Chart     → rgba(196, 166, 97, 0.88)    /* Sand */
5. Knitting Abbreviations → rgba(107, 67, 50, 0.88)    /* Brown */
6. Knitting Size Charts  → rgba(160, 80, 56, 0.88)     /* Terracotta */
```

Each card gets its own color. Use a `data-color` attribute or individual classes — whichever is cleaner.

#### Hover state update

On hover, increase opacity from 0.88 to 0.94 (card becomes more solid). Keep the transition at 200ms ease. Do NOT change background color on hover — only opacity changes.

Do NOT add translateY, scale, or box-shadow on hover.

#### Watermark text

Keep the existing watermark text (CAST ON, YARN ESTIMATOR, NEEDLE SIZE, etc.) but adjust its color since the backgrounds are now different:

- Change watermark color from `rgba(232, 228, 208, 0.06)` to `rgba(255, 255, 255, 0.08)`
- On hover, increase to `rgba(255, 255, 255, 0.14)`

The watermark should remain subtle but slightly more visible against the colored backgrounds than it was against the dark brown.

#### Card text colors

Tool name and description text stay `var(--cream)` and `var(--cream-muted)` — these should have good contrast against all 6 background colors. Verify readability especially against the Sand (#C4A661) card since it's the lightest color. If contrast is insufficient on the Sand card, use `var(--dark)` for text on that card only.

#### Focus state

Change focus outline from `var(--accent)` to `var(--cream)` — burnt orange outline may clash with terracotta/rust card backgrounds. Cream is a neutral that works against all 6 colors.

---

## Important constraints

- Do not change Bebas Neue usage anywhere
- Do not change any content text (headings, descriptions, body copy) — only fonts and card styling
- All CSS changes in global.css for font declarations, scoped styles for card changes
- Ensure the site still respects `prefers-reduced-motion`
- The Geist font is licensed under SIL Open Font License 1.1 — free for commercial use

## Verification

After implementation:
1. `npm run build` must complete without errors
2. Visually check landing page — all headings should be Geist, body text Geist, labels Bebas Neue
3. Check navbar logo text renders in Geist 700
4. Check tools listing page — 6 cards with different colored backgrounds, no category labels, watermark visible
5. Check cast-on-calculator and yarn-estimator pages — headings and body text should be Geist
6. Verify no Satoshi, Creato Display, or Outfit references remain in CSS or HTML (except possibly in comments)
7. Verify old font files are removed from `/public/fonts/`
8. Check contrast on all 6 card colors — especially Sand card text readability
9. Test on mobile widths
