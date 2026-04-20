# NineTools.astro — bento feature section specification

<context>
Target file: `src/components/NineTools.astro`
Used in: `src/pages/index.astro` (existing import; placement unchanged)
Scope: complete rewrite of the component's internal layout, typography, and content. The component's position on the landing page does not change. The section background does not change.

This document describes the target state. There is no reference to the previous numbered-list layout — just build the component as described below.
</context>

<section-background>
The section keeps the existing dark brown background (`--dark` / `#2E2A26`). Do not modify the section's outer background color or its position on the page. Only the internal layout and content are rebuilt.
</section-background>

<section-structure>
The section contains three parts, stacked vertically, all left-aligned and sharing the same left horizontal edge as the leftmost bento card:

1. Eyebrow label: "What's inside"
2. H2 heading: "Every tool, talking to each other."
3. Bento grid: 9 feature cards in a 3-column CSS grid, with three hero cards spanning 2 columns

There is no closer section, manifesto block, or tenth card after the grid. The section ends on the last bento card and transitions to the next section in the page flow (FreeToolsCallout).
</section-structure>

<section-intro>

<eyebrow>
Text: `What's inside`
Font: Bebas Neue, uppercase, bold. Use the same Bebas Neue size convention already used for eyebrow labels elsewhere on the site. If a shared font-size token exists in `src/styles/global.css` for eyebrow/tag text, use it. If no shared token exists, match visually to existing eyebrow labels on other landing sections. Do not invent a new size.
Letter-spacing: 0.25em
Color: mustard accent (see colors section)
Text-align: left
Margin below: ~20px
</eyebrow>

<h2>
Text: `Every tool, talking to each other.`
Font: Geist, weight 800
Size: match the existing H2 clamp value in `global.css` (currently `clamp(2.5rem, 5vw, 5rem)` per site documentation). Use the site-wide H2 token.
Letter-spacing: -0.03em
Line-height: 1.0
Text-align: left
Margin below: ~3rem (room to breathe before the grid starts)

Color split:
- `Every tool, ` in cream (`--cream`)
- `talking to each other.` in mustard italic, weight 800

Implement with two inline spans inside the H2:
```html
<h2><span class="h2-base">Every tool, </span><span class="h2-accent">talking to each other.</span></h2>
```
</h2>

</section-intro>

<bento-grid>

<desktop-layout breakpoint="≥769px">
CSS Grid, 3 equal columns, gap ~10–12px.

Row arrangement:
- Row 1: [Card 1 span 2] [Card 2 span 1]
- Row 2: [Card 3 span 2] [Card 4 span 1]
- Row 3: [Card 5 span 1] [Card 6 span 1] [Card 7 span 1]
- Row 4: [Card 8 span 2] [Card 9 span 1]

Hero cards (1, 3, 8) span 2 columns. Medium cards (2, 4, 5, 6, 7, 9) span 1 column. All cards auto-size vertically to their content.
</desktop-layout>

<tablet-layout breakpoint="≤1024px, ≥769px">
Collapse to 2-column grid. Hero cards span full width (2 of 2). Medium cards stay 1 col. Row grouping no longer strict — cards flow naturally.
</tablet-layout>

<mobile-layout breakpoint="≤768px">
Single column. All 9 cards stack at full width. The hero vs medium distinction is lost on mobile — this is acceptable and expected.
</mobile-layout>

</bento-grid>

<card-design>

Every card is visually identical in styling. Hierarchy between hero and medium comes ONLY from grid column span (2 vs 1), never from styling.

- Background: cream (`--cream` / `#E8E4D0`)
- Border-radius: 4px (sharp-cornered, matches site convention — no rounded pills)
- Padding: 20px on all sides
- No border
- No box-shadow
- No hover state color change (cards are not interactive)
- No icons, no numbered labels, no decorative marks, no + buttons

Every card contains exactly:
1. An H3 heading
2. A body paragraph
3. (Card 1 only) a language chip row after the paragraph

</card-design>

<card-heading-h3>

Font: Bebas Neue, uppercase, bold. Use the same Bebas Neue size convention already used for card H3 headings elsewhere on the site, specifically the medium-card headings on the `/tools/` listing page (e.g. "NEEDLE SIZE CHART", "YARN WEIGHT CHART"). If a shared H3 token exists in `global.css`, use it. If no shared token exists, match visually to those tools-page card headings. Do not invent a new size.

Letter-spacing: 0.04em
Line-height: 1.15
Margin: 0 0 10px

The heading is composed of two inline spans with different colors:

```html
<h3><span class="card-feature">Row counter</span><span class="card-descriptor"> with memory</span></h3>
```

- `.card-feature` span: mustard accent color (see colors section)
- `.card-descriptor` span: dark text color (`--text-on-light` / `#2E2A26`)

Note: the heading size is identical on hero cards and medium cards. Do not scale H3 up for heroes.

</card-heading-h3>

<card-body>

Font: Geist, weight 400
Size: match existing body-small convention on the site. If no token, ~13.5px.
Color: `--text-on-light` (`#2E2A26`)
Line-height: 1.55
Margin: 0 (or `0 0 12px` if language chips follow)

</card-body>

<colors>

<mustard-accent>
Use the mustard/gold color from the StripeRibbon palette to create visual continuity with the ribbon on the right edge of the page.

Per site documentation the stripe palette includes a sand/mustard tone. Use that existing token. The CSS palette also defines `--mustard: #C9A435`. Pick whichever of these already reads as "mustard on stripe" — goal is color-match continuity with the ribbon.

Do NOT create a new color token from scratch. Use the existing palette value first.

If the chosen mustard fails WCAG AA contrast against cream (#E8E4D0) for heading text (minimum 4.5:1 for normal-size Bebas Neue, 3:1 for large), flag this to Emma — she will decide whether to deepen the color and introduce a deeper variant for this section. Do not auto-generate a new variant; surface the contrast test result first.
</mustard-accent>

<other-colors>
All other colors come from existing tokens:

- Section background: `--dark` (#2E2A26)
- Card background: `--cream` (#E8E4D0)
- Card body text: `--text-on-light` (#2E2A26)
- Card descriptor text: `--text-on-light` (#2E2A26)
- H2 base text: `--cream` (#E8E4D0)
- H2 accent text: mustard
- Eyebrow text: mustard
- Language chip background: mustard at ~0.2 opacity (rgba)
- Language chip text: `--text-on-light`
</other-colors>

</colors>

<language-chips>

Only Card 1 (Row counter) contains language chips. They sit below the body paragraph.

Eleven chips, in this exact order:
`English, Finnish, Danish, Dutch, French, German, Italian, Norwegian, Portuguese, Spanish, Swedish`

Chip styling:
- Background: rgba(mustard, 0.2) — convert the chosen mustard to rgba with 0.2 alpha
- Text color: `--text-on-light`
- Font: Geist, weight 500
- Font-size: ~10.5px
- Padding: 2px 7px
- Border-radius: 2px
- Gap between chips: 3px

Chips wrap naturally to additional lines within the card width.

</language-chips>

<card-content>

All nine cards follow the same markup pattern:

```html
<article class="bento-card" data-span="2 or 1">
  <h3>
    <span class="card-feature">{feature-name}</span><span class="card-descriptor">{descriptor}</span>
  </h3>
  <p>{body}</p>
  <!-- chips only on card 1 -->
</article>
```

<card id="1" span="2">
feature-name: `Row counter`
descriptor: ` with memory`
body: `A big round button where your thumb already is. Tap without looking. Miscount? Undo. Say "add three" or "next row" and voice commands work with no signal needed.`
chips: yes (see language-chips section)
</card>

<card id="2" span="1">
feature-name: `Pattern viewer`
descriptor: ` that follows along`
body: `PDF or Ravelry pull-in. The row you're on highlights itself. Tap sl1, k2tog, psso. AI explains what it does, step by step.`
</card>

<card id="3" span="2">
feature-name: `Yarn scanner`
descriptor: ` for the label graveyard`
body: `Point the camera at the ball band. The AI reads fiber, weight, meters, needle size, gauge, dye lot. Filed in your stash with a photo of the band itself. That mystery skein finally has a name.`
</card>

<card id="4" span="1">
feature-name: `Four calculators`
descriptor: `, quietly working`
body: `Cast on, gauge, increases, yardage. The math your knitting already asked you to do.`
</card>

<card id="5" span="1">
feature-name: `Ravelry`
descriptor: `, the way it should feel`
body: `Search, save, start a project in one tap. Log in through Ravelry itself. Your password never touches this app.`
</card>

<card id="6" span="1">
feature-name: `Reference`
descriptor: `, one tap away`
body: `Needles, sizes, chart symbols, abbreviations. Right there in your library, before you remember you needed it.`
</card>

<card id="7" span="1">
feature-name: `Progress photos`
descriptor: `, just for you`
body: `One folder per project. Full resolution, on your device, nothing uploaded anywhere.`
</card>

<card id="8" span="2">
feature-name: `Insights`
descriptor: ` without the pressure`
body: `Hours at the needles. Rows per hour. Streaks. No leaderboards, no nudges, no comparing yourself to anyone else. The stats are yours.`
</card>

<card id="9" span="1">
feature-name: `A widget`
descriptor: ` on your home screen`
body: `Tap to count. No app launch, no loading. The exact amount of friction a row counter should have, which is zero.`
</card>

</card-content>

<accessibility>

- Wrap the section in a semantic `<section>` element. The H2 gets an id; the section uses `aria-labelledby` pointing to it.
- Each card is an `<article>` or `<div>` with an H3 as its first content element. Heading hierarchy: page H1 → section H2 → card H3.
- The language chip row is a list: `<ul role="list">` with `<li>` per language. Style `list-style: none` and remove default padding.
- Verify WCAG AA contrast for mustard feature-name text on cream card background before shipping. If contrast fails, flag to Emma rather than auto-changing the color.
- The existing `.reveal` IntersectionObserver scroll-reveal system (from `BaseLayout.astro`) applies to this section. Apply `.reveal` to the section or cards as appropriate, matching the site's existing pattern. Do NOT introduce GSAP here — this section uses the lighter IntersectionObserver system.
- All text colors must pass WCAG AA. The mustard descriptor accent is decorative; the feature name carries semantic weight, so it must meet contrast standards.

</accessibility>

<do-not>

- Do not add numbered labels (01–09) to any card.
- Do not add icons, emoji, SVG ornaments, or any decorative marks to cards.
- Do not include the + button image (`button.webp` or similar) on any card. No single card gets a visual element that other cards don't have.
- Do not use em dashes (—) in any heading, body, or microcopy. Use periods or commas. The body text in this spec has already been written without em dashes — do not reintroduce them during implementation.
- Do not add a closer card, manifesto block, "finally" section, or any content after the 9-card grid. The H2 makes the claim; the grid is the proof.
- Do not vary card heading font size between hero and medium cards. Hierarchy comes from grid column span only.
- Do not add accent borders (e.g. mustard top border) to any card to "highlight" it. All cards are visually equal.
- Do not center the eyebrow or H2. Both are left-aligned, starting at the same horizontal position as the leftmost bento card.
- Do not give cards different background colors. All 9 cards share the same cream background.
- Do not create a new color token before first attempting the existing stripe sand/mustard value.
- Do not carry over or reuse any of the unused FeatureX components (FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave, FeatureLearn) or Marquee. This component stands alone.
- Do not introduce new Bebas Neue font sizes. All Bebas Neue text on the site (eyebrow, H3) must use existing size tokens or match existing visual conventions.

</do-not>

<verification>

After implementation, check the following before marking complete:

1. The eyebrow "What's inside" and H2 "Every tool, talking to each other." both sit at the same left horizontal position as the leftmost bento card.
2. All 9 card headings use the same Bebas Neue size — no scaling for heroes.
3. The eyebrow text uses the same Bebas Neue size as other eyebrow labels on the site (Emma will spot-check this).
4. The H3 card headings use the same Bebas Neue size as medium card headings on `/tools/` listing page.
5. Mustard accent color matches the sand/mustard tone in the StripeRibbon on the right edge of the page (visual inspection against the ribbon).
6. No em dashes anywhere in card headings, body text, or microcopy.
7. No numbers, no icons, no decorative marks on any card.
8. No closer/manifesto section after the grid — the last bento card is the last content in the section.
9. Section background is unchanged (`--dark` / `#2E2A26`).
10. Row counter card shows all 11 language chips.
11. Mobile view (≤768px): all 9 cards stack as single column. Desktop view (≥769px): bento grid renders with the row arrangement specified.
12. Mustard-on-cream heading contrast passes WCAG AA at the chosen size. If not, flag to Emma.

</verification>
