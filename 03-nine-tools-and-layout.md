# Instruction 03: Nine Tools Section, Languages Promise, Desktop Layout, and Hero Screenshot

## Context

This is the third and final instruction updating the KnitTools landing page. Instructions 01 and 02 handled copy and palette. This instruction introduces the main new content: an editorial-style "Nine Tools" section replacing the existing feature-section-per-feature pattern, plus a fourth promise about languages, and a real row-counter screenshot in the hero.

**Scope:** new component (NineTools), hero screenshot integration, fourth promise pillar, and desktop grid layout for the tools list. Mobile layout for Nine Tools remains editorial (single-column).

## Task 1: Add a real row-counter screenshot to the Hero

The hero currently uses a CSS PhoneMockup component with a placeholder screen. Replace the placeholder content with the actual row counter screenshot from the project assets.

**Screenshot source:** `Screenshot_20260408213244.png` (the dark-theme row counter with orange wooden + button, project name "Classic Ribbed Hat", current row "1").

**Steps:**
1. Copy `Screenshot_20260408213244.png` from the project root to `src/assets/images/hero-row-counter-dark.png`.
2. In `src/components/Hero.astro`, import the screenshot:
   ```astro
   import heroRowCounter from '../assets/images/hero-row-counter-dark.png';
   ```
3. Pass it into the existing `<PhoneMockup />` component as the `screenshot` prop (the prop already exists per PhoneMockup.astro's interface).
4. Set `theme="dark"` on the PhoneMockup.
5. Add descriptive alt text: `KnitTools row counter on Android, showing the Classic Ribbed Hat project with a large orange button to add rows.`
6. Keep the Three.js yarn-ball animation as-is if currently present, but it should transition to or coexist with this static screenshot. If the current Three.js implementation is complex, prioritize the static screenshot and defer animation work.

The phone should still appear slightly tilted (approx -2deg rotation) to feel more editorial than a flat product shot. This tilt is already in the existing mockup CSS.

## Task 2: Create NineTools.astro component

Create a new file: `src/components/NineTools.astro`.

This component replaces the current `FeatureKnit`, `FeatureOrganize`, `FeatureCalculate`, `FeatureScanSave`, and `FeatureLearn` components as the primary feature listing on the landing page. Those five components can remain in the codebase for now but will no longer be imported in `index.astro`.

**Mobile layout:** Single column. Each tool entry is a horizontal row containing a small zero-padded index number, the tool name (with accent-italic on the subtitle phrase), a short description, and optional chip tags.

**Desktop layout (≥ 768px):** Two columns, alternating reading flow. Same content, arranged in a CSS grid: `grid-template-columns: 1fr 1fr; gap: 48px 64px;`. On desktop, the section should feel like an editorial spread, not a product-card grid.

**Structure per tool entry:**

```astro
<article class="tool-entry">
  <div class="tool-top">
    <span class="tool-num">01</span>
    <h3 class="tool-name">
      Row counter
      <span class="accent-italic">with memory.</span>
    </h3>
  </div>
  <p class="tool-desc">{description}</p>
  <div class="tool-meta">
    {chips.map(chip => <span class="tool-chip">{chip}</span>)}
  </div>
</article>
```

**The nine tools, in order:**

01. **Row counter** — `with memory.`
    Desc: A giant tactile button you can tap without looking. Undo if you miscounted. Session timer. Voice commands if your hands are busy: say "add three" and it listens.
    Chips: Voice, Undo, Timer

02. **Pattern viewer** — `that follows along.`
    Desc: Load a PDF and link it to the current row. The instruction for your row shows at the bottom. Tap it and AI explains what "sl1, k2tog, psso" actually does.
    Chips: PDF, AI explain

03. **Yarn scanner** — `for the label graveyard.`
    Desc: Point the camera at the ball band. Fiber, weight, meters, care. All in your stash. No more guessing what that leftover skein was.
    Chips: OCR, Offline

04. **Four calculators.**
    Desc: Cast-on math. Gauge conversion. Increases and decreases, evenly spaced. Yarn estimates for the project you just dreamed up.
    Chips: Cast-on, Gauge, Inc/dec, Yardage

05. **Ravelry** — `properly integrated.`
    Desc: Search, save, start a project. OAuth login, encrypted tokens. Your Ravelry account, on your terms.
    Chips: OAuth 2.0

06. **Reference** — `where you'd expect it.`
    Desc: Needle conversions, size charts, 76 abbreviations, chart symbols. Not buried in a menu. One tap away in your library.
    (No chips)

07. **Progress photos.**
    Desc: One folder per project. Watch the shawl happen, row by row. No compression, no cloud upload you didn't ask for.
    (No chips)

08. **Insights** — `without the guilt.`
    Desc: Hours spent. Rows per hour. Streaks if you want them. Hide them if you don't. Your stats, your business.
    (No chips)

09. **A widget** — `on your home screen.`
    Desc: Tap to count. No app launch, no loading screen. Exactly the friction a row counter should have: zero.
    (No chips)

**Styling notes:**
- Section background: use `var(--dark)` (existing token). The section is visually a "dark chapter" between the hero and lighter sections.
- Text color: `var(--text-on-dark)`.
- `.tool-num` uses Bebas Neue, small (11px), `var(--stripe-sand)` color, letter-spacing 0.15em.
- `.tool-name` uses display font (Geist variable, weight 500), size clamp(24px, 5vw, 28px), line-height 1.1.
- The `.accent-italic` span inside `.tool-name` pulls color from `var(--stripe-sand)` for variety (override the default `var(--accent)` from the utility class here, so the tools section accents are sand rather than burnt orange).
- `.tool-desc`: body text, `rgba(232, 228, 208, 0.72)` color (muted cream).
- `.tool-meta` flex-wrap with 8px gap. `.tool-chip` is a small Bebas Neue pill with 1px border `rgba(232, 228, 208, 0.2)`, 4px 8px padding, border-radius 100px.
- Each `.tool-entry` has a 1px top border `rgba(232, 228, 208, 0.12)`. Last entry has no bottom border in desktop grid layout; in mobile single-column, every entry has a top border.
- No hover card effects or shadows. This is editorial, not a product grid.

**Section intro** (above the tools list):
- Eyebrow: `What's inside`
- Heading: `Nine tools, one quiet app.`
  (Style "one quiet app." with `.accent-italic` using `var(--stripe-sand)`.)

## Task 3: Add the stitch seam transitions

Between sections on the landing page, replace any current diagonal `clip-path` transitions with running-stitch seams.

Create a new component: `src/components/StitchSeam.astro`.

```astro
---
interface Props {
  variant: 'onLight' | 'onDark' | 'onAccent';
}
const { variant } = Astro.props;

const strokeColor = {
  onLight: 'var(--dark)',
  onDark: 'var(--cream)',
  onAccent: 'var(--accent)',
}[variant];

const bgColor = {
  onLight: 'var(--cream)',
  onDark: 'var(--dark)',
  onAccent: 'var(--cream)',
}[variant];

const opacity = variant === 'onDark' ? 0.65 : 1;
---

<div class={`stitch-seam stitch-seam--${variant}`} aria-hidden="true" style={`background: ${bgColor};`}>
  <svg viewBox="0 0 400 42" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <g stroke={strokeColor} stroke-width="1.6" stroke-linecap="round" fill="none" opacity={opacity}>
      <line x1="8" y1="21" x2="22" y2="21"/>
      <line x1="34" y1="22" x2="50" y2="22"/>
      <line x1="62" y1="20" x2="74" y2="20"/>
      <line x1="86" y1="22" x2="102" y2="22"/>
      <line x1="114" y1="21" x2="126" y2="21"/>
      <line x1="138" y1="22" x2="154" y2="22"/>
      <line x1="166" y1="20" x2="178" y2="20"/>
      <line x1="190" y1="21" x2="206" y2="21"/>
      <line x1="218" y1="22" x2="230" y2="22"/>
      <line x1="242" y1="20" x2="258" y2="20"/>
      <line x1="270" y1="21" x2="282" y2="21"/>
      <line x1="294" y1="22" x2="310" y2="22"/>
      <line x1="322" y1="20" x2="334" y2="20"/>
      <line x1="346" y1="21" x2="362" y2="21"/>
      <line x1="374" y1="22" x2="390" y2="22"/>
    </g>
  </svg>
</div>

<style>
.stitch-seam {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.stitch-seam svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
```

Place `<StitchSeam variant="onLight" />` between the belief/trust section and the Nine Tools section (cream background transitioning into dark).

Place `<StitchSeam variant="onDark" />` between the Nine Tools section and the next section below it (dark transitioning back to cream).

Place `<StitchSeam variant="onLight" />` just above the final CTA (cream transitioning into the burnt-orange CTA section).

The y-coordinate variance in the SVG (20, 21, 22) is intentional — it makes the stitches feel hand-sewn rather than CSS-perfect. Do not regularize it.

## Task 4: Add a fourth language promise to TrustSection

In `src/components/TrustSection.astro`, add a fourth item to the existing three promise items. Keep the same visual pattern. The section should now display as four items in a row on desktop and stacked on mobile.

**Item 4**
- Label: `LANGUAGES`
- Headline: `Speaks your language.`
  (Style "Speaks your language." plain; add accent-italic on `your language.`)
- Body: `Six languages at launch, more on the way. Because knitting instructions shouldn't need a translator.`

If the desktop layout needs adjustment to fit four items (currently three-column grid), update to `grid-template-columns: repeat(4, 1fr)` on ≥1024px, `repeat(2, 1fr)` on tablet, and `1fr` on mobile.

## Task 5: Add a "free tools" mini-callout after the Nine Tools section

This is a small text-only callout, not a new section. Insert it between the Nine Tools section and the TrustSection.

Content:
```
Not ready for the app? Try our free knitting tools right here: Cast On Calculator, Yarn Estimator, Needle Size Chart.
```

Each tool name is a link to its respective `/tools/...` page. Wrap in a small centered container with `padding: 48px 20px`, muted cream background (`var(--cream-muted)` at low opacity or just plain `var(--cream)` depending on sibling sections), and body text size. No heading. This is a quiet "by the way" moment, not a pitch.

## Task 6: Update index.astro component order

In `src/pages/index.astro`, the final landing page composition should be:

```astro
<PageLayout showStripe={true}>
  <Hero />
  <Belief />   {/* The current FeatureKnit / intro can be renamed or repurposed as a "belief" section if one exists; otherwise skip */}
  <StitchSeam variant="onLight" />
  <NineTools />
  <StitchSeam variant="onDark" />
  <FreeToolsCallout />   {/* The mini-callout from Task 5; inline or small component */}
  <TrustSection />   {/* Now with four promises including languages */}
  <StitchSeam variant="onLight" />
  <ClosingCTA />
</PageLayout>
```

**Remove from the landing page** (do not import):
- `<FeatureOrganize />`
- `<FeatureCalculate />`
- `<FeatureScanSave />`
- `<FeatureLearn />`
- `<Marquee />`

Keep the components in `src/components/` for now — just unimport them from `index.astro`. They can be deleted in a later cleanup pass once we're sure none of the content is worth reviving.

## Task 7: Ensure desktop layout adjustments are responsive

**Nine Tools section:**
- Mobile (< 768px): single column, full-width entries.
- Desktop (≥ 768px): two-column grid.
- Each entry in the desktop grid has equal visual weight. Number positioning and chip alignment stays the same as mobile.

**TrustSection:**
- Mobile (< 768px): single column stacked.
- Tablet (768px–1024px): two columns × two rows.
- Desktop (≥ 1024px): four columns.

**Hero:**
- Mobile: phone mockup below the text/form.
- Desktop (≥ 768px): phone mockup to the right of text/form. Existing layout probably handles this; verify.

## Verification checklist

After completing this instruction, verify:

- [ ] Hero phone mockup displays the real row-counter screenshot (dark theme)
- [ ] Nine Tools section renders correctly on both mobile (single column) and desktop (two columns)
- [ ] All nine tools appear in the correct order with chips where specified
- [ ] Stitch seams appear at the three transition points, hand-sewn appearance preserved
- [ ] TrustSection has four promises including the Languages one
- [ ] Four-column layout on desktop (≥1024px), two-column tablet, one-column mobile for TrustSection
- [ ] Free tools callout is visible between Nine Tools and TrustSection
- [ ] `FeatureOrganize`, `FeatureCalculate`, `FeatureScanSave`, `FeatureLearn`, `Marquee` no longer render
- [ ] Site builds without errors
- [ ] Mobile layout is unchanged for Nine Tools (editorial single-column)
- [ ] Desktop overall feels shorter than before (less repetition)

## Notes for future passes (not part of this instruction)

- Hero animation (yarn ball → phone transition via Three.js or Veo 3.1) is deferred. The static row-counter screenshot is sufficient for launch.
- Email endpoint for waitlist forms will be added once Emma confirms the email service provider.
- App v2/v3 screenshot updates will be a future find-and-replace once new renders are ready.
