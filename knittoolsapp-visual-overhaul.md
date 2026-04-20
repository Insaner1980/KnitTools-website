# KnitTools Website — Visual Overhaul & Image Integration

## Context

The initial build follows the spec structurally but looks generic and flat. This document contains specific changes to make the site look premium and professional. The user has generated 6 high-quality AI photographs that need to be integrated as part of the layout — not just placed in boxes.

**Core principle: Images must feel woven into the page, not dropped onto it.**

---

## Image Files

Place all images in `src/assets/images/` so Astro's built-in image optimization (`astro:assets`) handles WebP conversion, resizing, and lazy loading automatically.

```
src/assets/images/
├── hero-knitting.png          # 16:9 — needles in yarn, shallow DOF
├── tools-flatlay.png          # 3:2 — overhead yarn supplies on linen
├── card-simple.png            # 1:1 — single needles on linen
├── card-private.png           # 1:1 — knit texture macro
├── card-subscription.png      # 1:1 — yarn skeins in basket
└── articles-banner.png        # 21:9 — notebook with yarn, ultrawide
```

Use Astro's `<Image />` component from `astro:assets` for all images. This auto-optimizes format, size, and generates responsive srcsets.

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero-knitting.png';
---
<Image src={heroImage} alt="..." loading="eager" />  <!-- hero only: eager -->
<Image src={otherImage} alt="..." loading="lazy" />   <!-- everything else: lazy -->
```

---

## Section-by-Section Changes

### Navigation Bar — Minor Polish

Current state: Functional but flat.

Changes:
- Add `backdrop-filter: blur(8px)` with semi-transparent background `rgba(250, 248, 245, 0.85)` so content scrolls behind it with a frosted effect
- The navbar should feel like it floats over the page, not sit on top of it
- "Get the App" button: slightly smaller, use `var(--radius-full)` for pill shape
- Add a thin bottom border `1px solid rgba(0,0,0,0.04)` that is always present (not just on scroll)

### Hero Section — Complete Redesign

Current state: Centered text with an ugly SVG yarn ball on the right. Looks like a template.

New layout — split hero with image bleeding into the design:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                                                              │
│     Your knitting              ┌─────────────────────┐       │
│     toolkit,                   │                     │       │
│     simplified.                │    hero-knitting     │       │
│                                │    image             │       │
│     Essential knitting         │    (fades to bg      │       │
│     calculators and            │     at left edge)    │       │
│     tools — free in            │                     │       │
│     your browser.              └─────────────────────┘       │
│                                   (bleeds to right edge)     │
│     [Try Free Tools]                                         │
│     [Coming Soon — Android App]                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Implementation details:
- Use CSS Grid: two columns, `1fr 1fr` on desktop
- Left column: text, left-aligned (NOT centered), vertically centered
- Right column: hero image that **bleeds to the right edge** of the viewport (not contained in max-width)
- The image fades into the background on its left edge using a CSS mask gradient:

```css
.hero-image-wrapper {
  position: relative;
  overflow: hidden;
  /* Image extends beyond the container to the right viewport edge */
  margin-right: calc(-1 * var(--space-6)); /* negate container padding */
}

.hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Fade the left edge into the background */
  mask-image: linear-gradient(to right, transparent 0%, black 25%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 25%);
}
```

- Hero background: `var(--bg-hero)` — the image's warm tones blend naturally with this
- Hero min-height: `min(85vh, 600px)` — generous but not full viewport
- Remove the SVG yarn ball entirely
- Headline: left-aligned, `var(--text-5xl)` on desktop
- Subheadline: left-aligned, max-width 480px
- CTAs: stacked vertically or side by side, left-aligned
- Mobile: stack vertically — image on top (full width, 200px tall, object-fit cover), text below centered

### Tools Section — Refined Cards

Current state: Two white boxes with basic form inputs on a beige background. Looks like a contact form.

Changes to the section background:
- Instead of flat `var(--bg-accent-soft)`, use the `tools-flatlay.png` image as a subtle background:

```css
.tools-section {
  position: relative;
  overflow: hidden;
}

.tools-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/path/to/tools-flatlay-optimized.webp');
  background-size: cover;
  background-position: center;
  opacity: 0.08;  /* very subtle — just a hint of texture */
  filter: blur(2px);
  z-index: 0;
}

.tools-section > * {
  position: relative;
  z-index: 1;
}
```

- Layer a solid color with slight transparency on top: `background-color: rgba(240, 234, 226, 0.92);`
- The photo barely shows through — it adds warmth and texture without being distracting

Changes to the tool cards:
- Add a subtle top border accent: `border-top: 3px solid var(--accent-primary)` — gives visual weight and color
- Increase card padding to `var(--space-8)` horizontal, `var(--space-8)` vertical
- Card background: pure white `#FFFFFF` with slightly stronger shadow: `var(--shadow-md)`
- Round the cards more: `var(--radius-xl)` (24px) instead of 16px

Changes to form inputs:
- Inputs should have a warm tinted background instead of pure white: `background: var(--bg-hero)` or `#F7F3EE`
- Border: `1.5px solid var(--border-subtle)` — slightly thicker than 1px
- Border radius on inputs: `var(--radius-md)` (12px) — soft and organic
- Input height: 48px with 16px horizontal padding
- Input focus state: `border-color: var(--accent-primary)` + `box-shadow: 0 0 0 3px var(--accent-primary-light)`
- Font size in inputs: `var(--text-base)` (16px) — prevents iOS zoom on mobile

Changes to buttons:
- Calculate/Estimate buttons: NOT full-width — make them auto-width with generous horizontal padding (`var(--space-8)` left/right)
- Button height: 48px
- Button border-radius: `var(--radius-full)` — pill shaped, feels more modern than rounded rectangle
- Add subtle hover animation: slight scale `transform: scale(1.02)` + shadow increase

Changes to the unit toggle (cm/inches):
- Style as a segmented control with rounded pill shape
- Active segment: `var(--accent-primary)` background, white text
- Inactive segment: transparent, `var(--text-secondary)` text
- Wrap in a container with `var(--bg-accent-soft)` background and `var(--radius-full)` radius

### App Showcase — Simplified Until Real Screenshots Exist

Current state: Ugly colored-block phone mockup that looks unfinished.

Change: **Remove the phone mockup entirely for now.** Replace with a different layout:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                 More tools in the app                         │
│                                                              │
│    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐           │
│    │ Row    │  │ Yarn   │  │ Works  │  │ No     │           │
│    │Counter │  │ Stash  │  │Offline │  │ Subs   │           │
│    │        │  │        │  │        │  │        │           │
│    │ icon + │  │ icon + │  │ icon + │  │ icon + │           │
│    │ short  │  │ short  │  │ short  │  │ short  │           │
│    │ desc   │  │ desc   │  │ desc   │  │ desc   │           │
│    └────────┘  └────────┘  └────────┘  └────────┘           │
│                                                              │
│               [Coming Soon — Android App]                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- Horizontal card grid instead of left-image-right-text layout
- Each feature is a small card with an icon and 1-line description
- Cards: `var(--bg-surface)`, `var(--radius-lg)`, subtle shadow
- Icons: simple line icons in `var(--accent-primary)` — OR small custom SVGs
- The section title is centered, Lora serif
- This looks intentionally clean and designed, not "we don't have screenshots yet"
- Section background: clean `var(--bg-base)`, no texture
- When the app is ready: replace this entire section with the phone mockup + lifestyle photo layout

### "Why Knitters Love KnitTools" — Image Cards

Current state: Three plain white boxes with thin borders and tiny icons. Boring.

New design — cards with photos:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│               Why knitters love KnitTools                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ ░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░ │      │
│  │ ░ card-      ░ │  │ ░ card-      ░ │  │ ░ card-sub-  ░ │  │
│  │ ░ simple.png ░ │  │ ░ private    ░ │  │ ░ scription  ░ │  │
│  │ ░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░ │  │ ░░░░░░░░░░░░ │      │
│  │              │  │              │  │              │       │
│  │  Simple      │  │  Private     │  │  No Subs     │      │
│  │  desc text   │  │  desc text   │  │  desc text   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Implementation:
- Each card has the photograph as its top half, text as its bottom half
- Image fills the top portion of the card with `object-fit: cover`, height ~180px
- Image corners match the card: `border-radius: var(--radius-xl) var(--radius-xl) 0 0`
- Card background: `var(--bg-surface)`
- Card shadow: `var(--shadow-md)` — more depth than before
- Card border: none (remove the thin border, let shadows do the work)
- Card border-radius: `var(--radius-xl)` (24px)
- Card hover: `transform: translateY(-4px)` + `var(--shadow-lg)` — more pronounced lift
- Title below image: Lora, `var(--text-xl)`, `var(--text-primary)`
- Description: `var(--text-secondary)`, 1-2 lines
- Text padding inside card: `var(--space-6)` all sides
- Remove the line icons entirely — the photos replace them
- Section background: `var(--bg-accent-soft)` with the subtle dot texture pattern

### Articles Section — Banner Image

The listing page uses `articles-banner.png` as a page header:

```css
.articles-header {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  margin-bottom: var(--space-12);
}

.articles-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

- Title "Knitting Guides & Tips" overlaid on the image with a dark gradient overlay at the bottom:

```css
.articles-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(44, 36, 32, 0.7), transparent);
}

.articles-header h1 {
  position: absolute;
  bottom: var(--space-8);
  left: var(--space-8);
  color: white;
  z-index: 1;
}
```

### Footer — Warmer

Current state: Dark background with light text. Functional but cold.

Changes:
- Background: `var(--text-primary)` (#2C2420) — keep the dark color
- Add a very subtle texture or noise overlay for warmth
- Add a decorative top border: a thin line in `var(--accent-primary)` (2px) as a visual separator
- "KnitTools" wordmark in Lora, cream-colored
- Links in `var(--text-muted)` equivalent on dark (something like `#B8ADA4`)
- Link hover: lighten to near-white
- Increase footer padding to `var(--space-16)` top, `var(--space-12)` bottom
- Layout: center-aligned on all screen sizes

---

## Global Visual Improvements

### Add a page-level vertical rhythm
Every section should have consistent vertical spacing:
```css
section {
  padding: var(--space-20) 0; /* 80px top and bottom */
}

@media (min-width: 1024px) {
  section {
    padding: var(--space-24) 0; /* 96px on desktop */
  }
}
```

### Improve section transitions
Sections should not have hard edges between them. Where one colored section meets another, add overlap or gradient transitions:
```css
/* Example: hero into tools section */
.hero-section {
  padding-bottom: var(--space-24);
  /* The bottom of hero overlaps with tools via margin */
}

.tools-section {
  margin-top: calc(-1 * var(--space-8));
  padding-top: var(--space-16);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  /* Rounded top corners create a soft transition */
}
```

### Typography hierarchy improvements
- Hero headline: add a subtle text-shadow for depth: `text-shadow: 0 2px 4px rgba(44, 36, 32, 0.04)`
- Section headings ("Free Knitting Tools", "Why knitters love..."): add a small decorative element above — a short horizontal line or a tiny diamond shape in `var(--accent-primary)`:

```css
.section-heading::before {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  margin: 0 auto var(--space-4);
}
```

### Button refinements globally
All buttons should have:
```css
.btn {
  border-radius: var(--radius-full); /* pill shape */
  padding: 12px 32px;
  font-weight: 600;
  font-size: var(--text-base);
  letter-spacing: 0.01em;
  transition: all var(--transition-normal);
}

.btn-primary {
  background: var(--accent-primary);
  color: var(--text-on-accent);
  border: none;
  box-shadow: 0 2px 8px rgba(196, 114, 90, 0.25);
}

.btn-primary:hover {
  background: var(--accent-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(196, 114, 90, 0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1.5px solid var(--border-medium);
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
```

---

## Mobile-Specific Image Handling

### Hero on mobile (< 640px):
- Image goes above the text, full viewport width
- Height: 240px, `object-fit: cover`
- Apply bottom fade gradient into background:
```css
@media (max-width: 639px) {
  .hero-image-wrapper {
    width: 100vw;
    height: 240px;
    margin-left: calc(-1 * var(--space-6));
    margin-right: calc(-1 * var(--space-6));
  }

  .hero-image-wrapper img {
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }
}
```

- Text below image: centered on mobile
- CTAs: full width, stacked

### Value prop cards on mobile:
- Single column, cards stack vertically
- Images maintain aspect ratio, height: 160px
- Cards get full width with side margins: `var(--space-4)`

### Tools on mobile:
- Cards stack vertically, full width
- Maintain generous padding inside cards

---

## Performance Notes

- Use Astro's `<Image />` component for ALL images — it handles:
  - Automatic WebP conversion
  - Responsive srcset generation
  - Proper width/height attributes (prevents layout shift)
  - Lazy loading (set `loading="eager"` only for the hero image)
- The tools-flatlay background image at 8% opacity: use a heavily compressed version (quality 30-40) since detail is not visible anyway
- Card images: generate at max 600px wide (they never display larger)
- Hero image: generate at max 1200px wide
- Articles banner: generate at max 1400px wide

---

## Implementation Order

1. Add image files to `src/assets/images/`
2. Redesign the hero section (biggest visual impact)
3. Update the "Why knitters love" cards with photos
4. Refine the tools section (background, card styling, form inputs)
5. Replace app showcase with feature card grid (remove phone mockup)
6. Add articles banner
7. Polish footer
8. Apply global improvements (section spacing, button styles, heading decorations, section transitions)
9. Test responsive layouts at 375px (phone), 768px (tablet), 1280px (desktop)
10. Verify Lighthouse score remains 90+
