# Font Setup — DM Serif Display + Bebas Neue + Creato Display

## Task

Replace the current heading font (Playfair Display) with DM Serif Display from Google Fonts. Add Bebas Neue for labels/tags and Creato Display for body text. Remove Playfair Display and Source Sans 3 entirely.

## Font Stack

| Font | Role | Source |
|------|------|--------|
| **DM Serif Display** | H1, H2 — display headings | Google Fonts (Regular 400 + Italic 400) |
| **Bebas Neue** | Section tags, labels, nav links, marquee text, H3 | Google Fonts (Regular 400) |
| **Creato Display** | Body text, buttons, descriptions, nav "KnitTools" text | dafont.com (Regular, Medium, Bold — self-hosted woff2) |

## Font Files

### Download & convert to woff2

1. **DM Serif Display:** https://fonts.google.com/specimen/DM+Serif+Display → Download → Regular + Italic. Convert ttf to woff2.
2. **Bebas Neue:** https://fonts.google.com/specimen/Bebas+Neue → Download → Regular only. Convert ttf to woff2.
3. **Creato Display:** https://www.dafont.com/creato-display.font → Download → Regular, Medium, Bold weights needed. Convert otf/ttf to woff2.

Use `fonttools` (`pyftsubset` with `--flavor=woff2`) or similar to convert. Place all woff2 files in `public/fonts/`.

### @font-face declarations

```css
/* DM Serif Display */
@font-face {
  font-family: 'DM Serif Display';
  src: url('/fonts/DMSerifDisplay-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Serif Display';
  src: url('/fonts/DMSerifDisplay-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

/* Bebas Neue */
@font-face {
  font-family: 'Bebas Neue';
  src: url('/fonts/BebasNeue-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Creato Display */
@font-face {
  font-family: 'Creato Display';
  src: url('/fonts/CreatoDisplay-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Creato Display';
  src: url('/fonts/CreatoDisplay-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Creato Display';
  src: url('/fonts/CreatoDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## CSS Custom Properties

```css
:root {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-label: 'Bebas Neue', 'Arial Narrow', sans-serif;
  --font-body: 'Creato Display', 'Helvetica Neue', sans-serif;
}
```

## Typography Hierarchy

```css
/* H1 — Hero headline */
h1 {
  font-family: var(--font-display);
  font-weight: 400;
  font-style: normal;
  font-size: 5rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

/* H1 accent — "One app." in hero uses italic + burnt orange */
h1 em,
h1 .accent {
  font-style: italic;
  color: var(--burnt-orange); /* ~#C45100 */
}

/* H2 — Section headings */
h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-style: normal;
  font-size: 3rem;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

/* H3 — Card/subsection headings */
h3 {
  font-family: var(--font-label);
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Section tags (e.g. "STAY ON TRACK", "CALCULATORS") */
.section-tag {
  font-family: var(--font-label);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* Body text */
body {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1.15rem;
  line-height: 1.6;
}

/* Nav links */
nav a {
  font-family: var(--font-label);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Navbar brand "KnitTools" */
.nav-brand {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
}

/* Buttons */
button, .btn {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* Marquee */
.marquee-text {
  font-family: var(--font-label);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Mobile overrides */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.2rem;
  }
  body {
    font-size: 1rem;
  }
}
```

## Hero H1 Markup Example

```html
<h1>
  Every tool a knitter needs.<br>
  <em>One app.</em>
</h1>
```

The `<em>` tag triggers italic style + burnt orange color via the `h1 em` CSS rule.

## Files to Modify

- `src/styles/global.css` — Replace all font-face declarations and typography rules
- `public/fonts/` — Add new woff2 files, remove old Playfair Display and Source Sans 3 files
- All components referencing `font-family: 'Playfair Display'` or `font-family: 'Source Sans 3'` — update to new CSS variables

## What to Remove

- All Playfair Display font files from `public/fonts/`
- All Source Sans 3 font files from `public/fonts/`
- All CSS references to 'Playfair Display' and 'Source Sans 3'
