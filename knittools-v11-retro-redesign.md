# KnitTools Website — v11 Retro Direction Redesign

## Context

The KnitTools landing page has been iterated through several visual directions. The current version uses an editorial magazine aesthetic with DM Serif Display, Bebas Neue, and Geist fonts, plus magazine-style metadata (VOL/EST/FIG/Nº/§). The decision has been made to pivot away from this editorial direction toward a **warm retro aesthetic** that better matches the KnitTools Android app's visual personality (cream + dark olive + terracotta + wooden button).

**This is not a rebuild.** The page structure, color palette, section rhythm, colored cards, AI section, free tools area, marquee, and italic emphasis pattern all stay. The changes are targeted: typography swap, removal of magazine vocabulary, hero copy update, phone frame replacement, and a documentation correction.

## Goals

- Replace editorial typography with retro display typography (Caprasimo) paired with a warm humanist body sans (General Sans)
- Remove magazine vocabulary signals (VOL/EST/FIG/Nº/§ markers, hero horizontal rules, "Knitter's Journal" tagline)
- Update hero headline copy
- Replace the wooden phone frame with a modern Android frame (already used at finnvek.com)

## Non-goals

- Do NOT redesign sections, cards, layouts, or color usage
- Do NOT change the AI section, free tools section, marquee, or footer structure
- Do NOT touch tool pages (`/tools/*`) or the articles section
- Do NOT remove italic emphasis on words like "One app", "talking to each other", "knows knitting", "count on", "Own it", "your language" — keep this pattern, it works
- Do NOT change the cream background, the colored card palette, or the section rhythm
- Do NOT change the logo (KT badge + "KnitTools" Teko text). Logo stays as-is for now.

## Required changes

### 1. Typography swap

**Display font (replaces Bebas Neue + DM Serif Display):**
- **Caprasimo** — Google Fonts, OFL license, single weight (400)
- Self-host as `caprasimo.woff2` in `public/fonts/`
- Latin Extended subset required (covers Ä, Ö, Å, Ü for Finnish/Swedish/German)
- CSS variable: `--font-display`
- Used for: H1, H2, hero headline, section headings, card titles, tool listing card titles, free tools button labels (currently Bebas Neue), tool page H1s

**Body font (replaces Geist variable):**
- **General Sans** — Fontshare, free for commercial use
- Download from https://www.fontshare.com/fonts/general-sans
- Self-host weights: 400, 500, 600 as `.woff2` in `public/fonts/`
- CSS variable: `--font-body`
- Used for: body text, navigation, buttons, meta text, card descriptions, FAQ, form inputs

**Logo font (no change):**
- Teko stays for the "KnitTools" text in `PageBrandMark.astro`
- CSS variable: `--font-logo` unchanged

**Section/label tags (currently Bebas Neue):**
- These are now Caprasimo as well, since Bebas Neue is being removed entirely
- This applies to nav links, button labels, section eyebrows ("FEATURES", "PRINCIPLES", "PRICING")

**Files to update:**
- `public/fonts/` — add Caprasimo + General Sans woff2 files, remove Bebas Neue and Geist variable woff2 files
- `src/styles/global.css` — update `@font-face` rules and CSS custom properties
- `src/layouts/BaseLayout.astro` — update font preload tags

**Cleanup:**
- Remove the legacy DMSerifDisplay-Regular.woff2 and DMSerifDisplay-Italic.woff2 files from `public/fonts/` (they were already unused)
- Remove Bebas Neue woff2 file
- Remove Geist variable woff2 file
- Remove Teko 400/500 ttf files only if no longer referenced (Teko stays for logo, so keep these)

**CSS variable mapping:**

```css
:root {
  --font-display: 'Caprasimo', Georgia, serif;
  --font-body: 'General Sans', -apple-system, sans-serif;
  --font-logo: 'Teko', sans-serif; /* unchanged */
  --font-label: 'Caprasimo', Georgia, serif; /* was Bebas Neue, now consolidated with display */
}
```

**Heading sizes:**
Caprasimo is heavier than DM Serif Display. The current H1 `clamp(3rem, 6.5vw, 6.875rem)` and H2 `clamp(2.5rem, 5vw, 5rem)` may need slight reduction to avoid feeling overwhelming. Test visually and adjust to taste, but a reasonable starting point is:
- H1: `clamp(2.75rem, 6vw, 6.25rem)`, line-height `1.05`, letter-spacing `-0.01em` (Caprasimo is already wide, less negative tracking needed)
- H2: `clamp(2.25rem, 4.5vw, 4.5rem)`, line-height `1.1`, letter-spacing `-0.005em`

Italic emphasis for Caprasimo: Caprasimo only has one weight (regular). For italic emphasis (e.g. "*One app.*", "*talking to each other*"), apply `font-style: italic` and the browser will synthesize italic, OR if a true italic Caprasimo is not available, use a graceful fallback by transforming the emphasis style — for example, wrap emphasis in a class that uses a complementary cursive or italic serif. **Preferred approach**: try synthesized italic first and check render quality; if it looks bad, propose the alternative for review before changing the emphasis treatment.

### 2. Remove editorial vocabulary

**Hero section (`Hero.astro`):**
- Remove the horizontal rule lines above and below "VOL. 01. PRE-LAUNCH" / "EST. 2026" row
- Remove "VOL. 01. PRE-LAUNCH" entirely
- Remove "EST. 2026" entirely
- Remove "The Knitter's Journal of Craft & Computation" tagline entirely
- The hero now opens directly with the brand block and headline, no magazine framing

**Phone caption:**
- Remove "Fig. 01. The counter, where most knitting happens." entirely
- The phone image stands alone with no caption, OR if a caption is desired, use plain wording without "Fig. NN" prefix (e.g. just "The counter, where most knitting happens." in italic, smaller text). Default: remove the caption entirely.

**Section eyebrows:**
- "Nº 01 FEATURES" → "FEATURES"
- "Nº 02 PRINCIPLES" → "PRINCIPLES"
- "Nº 03 PRICING" → "PRICING"
- Remove all "Nº NN" prefixes from section labels throughout the page

**Card category labels:**
- Currently: "§ COUNTER", "§ PATTERN", "§ CALC", "§ RAVELRY", "§ REFERENCE", "§ STASH", "§ PHOTOS", "§ INSIGHTS", "§ WIDGET", "§ AI"
- Remove the "§" prefix from all card labels
- Result: "COUNTER", "PATTERN", "CALC", "RAVELRY", "REFERENCE", "STASH", "PHOTOS", "INSIGHTS", "WIDGET", "AI"

**Tier label:**
- "PRO €8.99 4 TOOLS + AI" — keep as-is, this is informational and doesn't read as magazine vocabulary
- "FREE FOREVER 5 TOOLS" — keep as-is

**Pull quote:**
- The pull quote section ("One tool for every row. One price for every needle. One app for every project.") — keep this, it works without magazine vocabulary. The horizontal rules above and below the pull quote can stay; they read as quote framing, not magazine framing.

### 3. Hero headline update

**Current:**
```
Every knitting tool.
One app.
```

**New:**
```
All your knitting tools.
In one app.
```

- "In one app." stays in italic (Caprasimo synthesized italic, or fallback per typography guidance above)
- "All your knitting tools." in regular Caprasimo
- Both are full sentences with periods; this gives the hero rhythm and weight

### 4. Phone frame replacement

The current hero phone uses a **wooden frame** with the row counter screenshot inside. This wooden frame was chosen for the editorial/newspaper direction. It does not match the retro direction.

Replace it with the **modern Android frame** already used on finnvek.com.

- Source: same row counter screenshot
- Frame: modern Android (dark bezel, punch-hole camera, gesture nav bar — the same style as the existing `PhoneMockup.astro` component, but without any wooden styling)
- The CSS PhoneMockup component (`src/components/PhoneMockup.astro`) appears to already be a modern Android frame. If the wooden frame is being applied via 3D Three.js rendering for desktop, that 3D model needs to be either replaced with a non-wooden version OR the 3D phone should be removed entirely and the CSS PhoneMockup used on both desktop and mobile.

**Recommended approach**: Use the CSS PhoneMockup on all viewport sizes. Drop the Three.js 3D phone for now. This simplifies the hero and removes a heavy dependency (Three.js is large). If the 3D phone is desired later, a non-wooden version can be added back.

**If the Three.js 3D phone is kept**: replace the wooden material with a dark bezel material matching the CSS PhoneMockup style.

### 5. Update `PROJECT.md`

The project documentation contains outdated information that needs correction:

- **Pricing**: Search for "€5.99" and "5.99". Replace with "€8.99". The current pricing is €8.99 at launch, rising to €11.99 after two months.
- **Trial length**: If any reference to "7-day trial" or "7 days" exists in the trial context, update to "14-day trial" / "14 days".
- **Dot grid backgrounds**: If `PROJECT.md` references `dot-grid-cream` or `dot-grid-dark` in places where they are no longer used, verify against actual code and update.
- **Font references**: The "Visuaalinen ilme (v8)" and typography sections describe Geist, Bebas Neue, and Teko. Update this section to describe the new typography:
  - Caprasimo as `--font-display` and `--font-label`
  - General Sans as `--font-body`
  - Teko remains as `--font-logo`
  - Remove Bebas Neue and Geist references
- **Version note**: Add a brief v11 entry to the "Kehityshistoria" section describing the retro pivot:
  > v11: Pivot away from editorial magazine aesthetic. Caprasimo replaces Bebas Neue and DM Serif Display as the display font. General Sans replaces Geist as the body font. Magazine vocabulary (VOL/EST/FIG/Nº/§ markers, "Knitter's Journal" tagline, hero horizontal rules) removed. Hero headline updated to "All your knitting tools. In one app." Wooden phone frame replaced with modern Android frame.

### 6. Files to NOT touch

- `src/pages/tools/*` — tool pages stay as they are
- `src/pages/articles/*` — articles stay as they are
- `src/components/StripeRibbon.astro` — keep
- `src/components/Footer.astro` — keep (font references will update via CSS variable change automatically)
- `src/components/Navbar.astro` — keep structure, font will update via CSS variable change
- `src/components/PageBrandMark.astro` — keep, Teko logo unchanged
- All colored card components — keep
- All section component structure — keep
- AI section component — keep entirely as-is, this is the strongest section on the page

## Verification

After implementation, verify by visual inspection:

1. **Hero**: Opens with brand block + headline + email signup, no VOL/EST/FIG markers, no horizontal rules above the brand block, no "Knitter's Journal" tagline. Headline reads "All your knitting tools. *In one app.*"
2. **Phone**: Modern Android frame, no wood. Same row counter screenshot inside.
3. **Section eyebrows**: "FEATURES", "PRINCIPLES", "PRICING" with no "Nº NN" prefix
4. **Card labels**: "COUNTER", "PATTERN", "CALC", etc. with no "§" prefix
5. **Typography**: Caprasimo on all display/heading text, General Sans on all body/UI text, Teko only in the logo
6. **Italic emphasis**: "In one app.", "talking to each other", "knows knitting", "count on", "Own it", "your language" still render in italic with sufficient visual contrast against the regular weight
7. **No console warnings** about missing fonts or unused font files
8. **Lighthouse / Core Web Vitals**: Page weight should drop slightly because Bebas Neue + Geist variable + DMSerifDisplay files are removed and Three.js is potentially dropped

## Build commands to run after implementation

```bash
npm run build
npm run preview
```

Visually inspect the build output at `localhost:4321` (or the preview port). Compare against the screenshots provided. If anything looks off, do not push to production — flag the issue for review.

## Open question for the developer

Caprasimo is a single-weight font (regular only) without a true italic. The current page uses italic emphasis heavily and effectively. Three options for handling italic in Caprasimo:

a) **Synthesized italic** (browser-generated slant): simplest, may look acceptable since Caprasimo is already a soft, character-rich face. Try this first.

b) **Pair italic emphasis with a complementary cursive serif** like Caprasimo's parent font Fraunces (also Google Fonts, OFL): use Fraunces Italic only for the italicized words. Slight typographic mix but stays in the same family lineage.

c) **Drop italic emphasis** in favor of color or weight contrast: e.g. emphasized words appear in terracotta or in a slightly different style. Reduces typographic richness.

**Recommendation**: try (a) first. If synthesized italic looks bad in the build, fall back to (b). Do not implement (c) without explicit approval.

## Summary of decisions locked in

- Display font: Caprasimo (Google Fonts)
- Body font: General Sans (Fontshare)
- Logo font: Teko (unchanged)
- Magazine vocabulary: removed (VOL/EST/FIG/Nº/§ markers, "Knitter's Journal" tagline, hero horizontal rules, Fig. 01 caption)
- Hero headline: "All your knitting tools. *In one app.*"
- Phone frame: modern Android (no wood)
- Everything else (colors, sections, cards, AI panel, free tools, marquee, italic emphasis pattern): unchanged
