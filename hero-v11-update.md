# Hero v11 update — targeted diff for Claude Code

This document describes a set of targeted edits to the Hero component on the KnitTools landing page. The scope of this pass is **only the hero**. Other sections (NineTools, TrustSection, PricingCards, Footer, etc.) are intentionally out of scope and must not be touched in this pass.

<task>
Apply the eight changes listed below to the Hero component. Keep the stitch chart animation and its JavaScript untouched. Do not rename any CSS classes. Do not add new animations or visual elements.
</task>

<scope>
File to modify: `src/components/Hero.astro`
Files to leave alone in this pass: everything else in the repository, including `src/pages/index.astro`, any other component in `src/components/`, and `src/styles/global.css`.
</scope>

---

## Changes

<change id="1" summary="Shrink the masthead wordmark">
In the `.masthead` rule, change `font-size` from `clamp(4rem, 13vw, 10.5rem)` to `clamp(2.25rem, 5.5vw, 4rem)`.

Keep all other `.masthead` properties exactly as they are (letter-spacing `-0.035em`, line-height `0.95`, font-family `var(--serif)`, font-weight `400`).

Reason: the wordmark currently dominates the hero visually, competing with the H1. Shrinking it re-establishes correct editorial hierarchy (masthead smaller than cover headline).
</change>

<change id="2" summary="Empty the meta-row center">
Inside the `.meta-row` flex container, delete the entire center span:

```html
<span class="meta-center">One app for every tool a knitter needs</span>
```

Keep the left span (`Vol. 01. Pre-launch`) and the right span (`Est. 2026`). They will now sit at opposite ends of the flex row thanks to `justify-content: space-between`.

If the `.meta-center` CSS rule is not used elsewhere in the component, delete it. If it might be reused in a future pass, comment it out with a note saying `/* reserved for future masthead middle text */`.
</change>

<change id="3" summary="Add an eyebrow above the H1">
Inside `.hero-text`, immediately before the `<h1 id="hero-heading" class="hero-head">` element, insert:

```html
<p class="eyebrow">An Android app for knitters</p>
```

Add the matching CSS to the component's scoped styles:

```css
.eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin: 0 0 20px;
}
```

Reason: the eyebrow gives immediate product context ("an Android app for knitters") before the visitor reads the display headline. It is the clarity anchor for the section.
</change>

<change id="4" summary="Rewrite the H1">
Replace the H1 content.

Before:
```html
<h1 id="hero-heading" class="hero-head">
  <span class="head-line head-1">Pick up where you</span>
  <span class="head-line head-2"><em>left off.</em></span>
</h1>
```

After:
```html
<h1 id="hero-heading" class="hero-head">
  <span class="head-line head-1">Every knitting tool.</span>
  <span class="head-line head-2"><em>One app.</em></span>
</h1>
```

Do not change any CSS for `.head-line`, `.head-1`, `.head-2`, or the `<em>` inside them. The italic terracotta styling on line 2 is preserved by the existing rules.
</change>

<change id="5" summary="Remove the byline">
Delete this element in its entirety:

```html
<p class="byline"><em>Filed by the KnitTools Editorial Desk.</em></p>
```

If the `.byline` CSS rule is only used by this element, delete the rule as well. If it is referenced somewhere else in the component or imported from global styles, leave the rule in place and only remove the markup.
</change>

<change id="6" summary="Rewrite the dek paragraph">
Replace the entire `<p class="dek">` content with the exact text below. Use one and only one `<strong>` wrap, placed as shown:

```html
<p class="dek">The row you were on, the yarn you forgot, the pattern that made no sense at midnight. <strong>KnitTools remembers it all</strong>, so the only thing you do is keep knitting.</p>
```

Do not change any `.dek` CSS. The first-letter drop-cap (4.6em, terracotta) will render correctly because the new text still begins with the letter "T".

Reason: the old version used two `<strong>` emphases in one short paragraph, which diluted the emphasis. The new version keeps a single emphasis on the product claim ("KnitTools remembers it all"), and the final clause is phrased as a comma clause rather than a separate sentence for a tighter rhythm.
</change>

<change id="7" summary="Rewrite the submit button label">
In the hero signup form, change the button label.

Before: `<button type="submit" class="btn-primary">Join the list</button>`
After: `<button type="submit" class="btn-primary">Notify me at launch</button>`

Do not change the button styling or any other form element.
</change>

<change id="8" summary="Rewrite the signup meta">
Replace the content of `<p class="signup-meta">` with two short lines separated by a `<br>`:

Before:
```html
<p class="signup-meta">
  Lock in the launch price: <strong>€8.99</strong>, then €11.99 two months after launch.
</p>
```

After:
```html
<p class="signup-meta">
  Coming 2026 to Google Play. 14-day free trial.<br>
  Launch price <strong>€8.99</strong>, rises to €11.99 after two months.
</p>
```

Do not change any `.signup-meta` CSS. The `<strong>` will continue to render in the existing terracotta color via the existing rule.
</change>

---

## Constraints

<constraints>
- Do not touch the stitch chart component, its markup, its CSS, or its JavaScript.
- Do not touch any file other than `src/components/Hero.astro`.
- Do not update the `<meta name="description">`, `<title>`, Open Graph, or Twitter Card tags in this pass. They live in another file and belong to a separate pass.
- Do not introduce any middle-dot (`·`) separator in any copy. The only permitted use of `·` in the codebase is inside existing section-label patterns like `Nº 01 · Features` elsewhere on the site.
- Do not introduce any em-dash (`—`) in any copy.
- Do not add emoji to any copy.
- Do not rename any existing CSS class, variable, or ID.
- Do not add new external dependencies, fonts, or scripts.
- Do not "improve" anything not listed in the eight changes above. Resist the urge to refactor adjacent code that looks messy.
- If you discover that the `.byline` or `.meta-center` CSS rule is imported from a shared file, stop and report it instead of deleting it blindly.
- If any of the eight changes appears to conflict with something already in the code that these instructions did not anticipate, stop and ask the user before improvising.
</constraints>

---

## Verification steps

<verification>
After editing, confirm the following manually:

1. `src/components/Hero.astro` compiles without Astro template errors.
2. Load the homepage in dev mode and check, at a desktop width of ~1280px:
   - The wordmark "KnitTools" is visibly smaller than before, roughly four rem tall.
   - A small uppercase terracotta line reading **AN ANDROID APP FOR KNITTERS** appears above the H1, with about 20px space below it.
   - The H1 reads on two lines: "Every knitting tool." (regular ink) and "One app." (italic, terracotta).
   - There is no byline paragraph ("Filed by the KnitTools Editorial Desk.") anywhere on the page.
   - The dek paragraph begins with a large terracotta drop-cap "T" and contains exactly one bolded phrase ("KnitTools remembers it all").
   - The primary submit button reads "Notify me at launch".
   - Below the form, the meta text spans two lines and the string "€8.99" is rendered in terracotta via the existing `<strong>` rule.
   - The meta-row at the top of the hero shows "Vol. 01. Pre-launch" on the left and "Est. 2026" on the right with nothing in between.
3. Resize the browser to a width of about 375px and confirm nothing overflows horizontally, the H1 wraps cleanly, and the signup form stacks vertically.
4. Tab through the hero with the keyboard and confirm focus outlines are visible on the email input, submit button, seal logo, and any nav links.
</verification>

---

## Notes for the next pass

These items are deliberately **not** part of this pass and should be handled separately later:

- Meta description currently contains "no cloud" which is factually inaccurate given the app uses Gemini API calls. This needs rewriting in `src/pages/index.astro`.
- TrustSection "Privacy" column may repeat similar language and should be reviewed for factual accuracy in a later pass.
- The closing CTA section ("Where every stitch counts.") is out of scope for this pass but will want alignment with the new hero copy eventually.
