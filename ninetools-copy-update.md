# NineTools Section Copy Update

<context>
The NineTools section on the landing page (`src/components/NineTools.astro`, rendered in `src/pages/index.astro`) needs a full copy rewrite. Current content uses an older feature list with generic chip tags and partially inaccurate claims. The new copy is story driven, reflects the actual app capabilities verified against `PROJECT.md`, and expands from nine entries to ten, with entry 10 serving as a closing synthesis that delivers on the H2 promise.
</context>

<scope>
This instruction covers copy and structural changes only. The planned visual replacement of numeric indices with the wooden button graphic (from `public/images/button.webp` or `src/assets/images/button.webp`, whichever is used elsewhere on the site) is a separate instruction and must not be touched here.
</scope>

<file_to_modify>
`src/components/NineTools.astro`
</file_to_modify>

---

## Changes required

<change id="1" priority="high">
<summary>Replace H2 heading</summary>

The current H2 reads: `Nine tools that actually *talk to each other.*`

Replace with: `Every tool, talking to each other.`

Preserve the existing `<em class="accent-italic">` treatment on the italic portion. The italic portion is `talking to each other.`
</change>

<change id="2" priority="high">
<summary>Keep eyebrow label unchanged</summary>

The eyebrow `WHAT'S INSIDE` stays as it is. No edit needed, this is for verification only.
</change>

<change id="3" priority="high">
<summary>Remove all chip pills from every tool entry</summary>

Every tool entry currently ends with a row of chip pills (e.g. `VOICE · UNDO · TIMER` on entry 01). Remove the chip container element and its data from the component entirely. The chips are not replaced with anything. Every entry now consists only of the index, the title with italic continuation, and the body paragraph.

If chips are defined as a data array in the component's frontmatter, remove the `chips` field from each entry and the markup that renders it. If chips are hardcoded per entry in the template, remove the chip `<div>` or `<ul>` from every entry.
</change>

<change id="4" priority="high">
<summary>Expand the tool list from nine entries to ten</summary>

Add a tenth entry at the end of the list. The tenth entry follows the same structural pattern as entries 01 through 09 (index + title with italic continuation + body paragraph), so the existing markup template does not need structural changes, only the addition of one more data entry or template block.

If the grid layout is `grid-template-columns: repeat(2, 1fr)` on desktop, the tenth entry will land on the left column of a new row, leaving the right cell empty. This is acceptable for this update. A future layout pass can address visual balance for the closing entry if needed.
</change>

<change id="5" priority="high">
<summary>Replace body copy for every entry</summary>

Replace the content of all ten entries with the copy below. Preserve the existing index styling (e.g. `01`, `02`) and the title structure where the first part is plain and the italic continuation uses `<em class="accent-italic">`.

Title format legend: `[Plain part] *[italic accent part]`

<entry index="01">
<title>Row counter with <em>memory.</em></title>
<body>
A big round button where your thumb already is. Tap it without looking. Miscount? Undo. Session timer and a pattern repeat counter run in the background. Hands tangled in yarn, no spare fingers? Say *"add three"* or *"next row"* and quick commands work in English and Finnish, no signal needed. Want more than that? Have a real conversation with the app in your own language. Ask what row you're on, tell it to start the timer, let it read the next instruction out loud so your eyes can stay on the needles.
</body>
<footnote>
Available in: English, Finnish, Danish, Dutch, French, German, Italian, Norwegian, Portuguese, Spanish, Swedish.
</footnote>
</entry>

<entry index="02">
<title>Pattern viewer that <em>follows along.</em></title>
<body>
Bring in a PDF, or pull a pattern straight from Ravelry. The row you're knitting highlights itself and stays put while you scroll. Tap any abbreviation like *sl1, k2tog, psso* and the AI explains what it actually does, step by step. When two sections overlap on the same row, press Combine and AI stitches them into one clean instruction instead of three. For the Ravelry patterns that come with a ten page intro, tap once for an AI summary of the parts that matter.
</body>
</entry>

<entry index="03">
<title>Yarn scanner for the <em>label graveyard.</em></title>
<body>
Point the camera at the ball band. The AI reads everything off the label: fiber, weight, meters, needle size, gauge, color number, dye lot. All of it filed in your stash with a photo of the band itself. Link a skein to a project and the app knows what you're making with it. That mystery ball at the bottom of the drawer finally has a name.
</body>
</entry>

<entry index="04">
<title>Four calculators, <em>quietly working.</em></title>
<body>
Cast on math, so you start with the right number of stitches. Gauge conversion, because your swatch never matches the pattern. Increases and decreases evenly spaced, no more counting on your fingers. Yardage estimates for the project you just dreamed up, before you buy the yarn.
</body>
</entry>

<entry index="05">
<title>Ravelry, <em>the way it should feel.</em></title>
<body>
Search the database, save patterns you like, start a project in one tap. You log in once, through Ravelry's own page, so your password never touches this app. Your queue, your favorites, your projects, all here when you need them.
</body>
</entry>

<entry index="06">
<title>Reference, <em>one tap away.</em></title>
<body>
Needle conversions across every system. Size charts from baby to adult. Chart symbols and every abbreviation you'll forget mid row. Not buried three menus deep. It's right there in your library, ready before you remember you needed it.
</body>
</entry>

<entry index="07">
<title>Progress photos, <em>just for you.</em></title>
<body>
One folder per project. The shawl at row twenty, at fifty, at a hundred. Full resolution, stored on your device, nothing uploaded anywhere. Scroll back on a quiet evening and watch the whole thing grow from the beginning.
</body>
</entry>

<entry index="08">
<title>Insights <em>without the pressure.</em></title>
<body>
Hours at the needles. Rows per hour. Streaks. Just numbers, no leaderboards, no nudges, no comparing yourself to anyone else. The stats are yours. Nobody else sees them.
</body>
</entry>

<entry index="09">
<title>A widget <em>on your home screen.</em></title>
<body>
Tap to count. No app launch, no loading screen. The exact amount of friction a row counter should have, which is zero.
</body>
</entry>

<entry index="10">
<title>And they all <em>remember each other.</em></title>
<body>
The skein you scanned yesterday shows up when you start a new project. The counter already knows what yarn you're using. The pattern knows what row you're on. The widget stays in sync. Nothing to re enter, nothing to reconnect. Pick up the needles and keep going.
</body>
</entry>
</change>

<change id="6" priority="high">
<summary>Add language footnote to entry 01 only</summary>

Entry 01 has a language availability footnote directly below its body paragraph. No other entry has a footnote.

Style specification:
- Element: `<p class="tool-languages">` or equivalent scoped class
- Font style: italic
- Font size: approximately `0.85rem` (match the smallest body text token used elsewhere if one exists, e.g. `--type-body-sm` minus one step)
- Color: `var(--text-on-dark-muted)`
- Margin top from body paragraph: `12px` to `16px`
- Same horizontal padding and max-width as the body paragraph

The text wraps naturally on narrow viewports. No special mobile treatment needed.

Exact text content:

```
Available in: English, Finnish, Danish, Dutch, French, German, Italian, Norwegian, Portuguese, Spanish, Swedish.
```
</change>

---

## Formatting constraints

<constraint>
Use commas, periods, colons, question marks, and parentheses only. Do not use em dashes (—) or en dashes (–) anywhere in the new copy. Hyphens in compound words are also avoided in this update: write `ten page intro`, `mid row`, `re enter`, `re connect`, `cast on math` without hyphens. Hyphens in code or CSS identifiers (e.g. `--text-on-dark-muted`) are unaffected.
</constraint>

<constraint>
The italic emphasis inside titles and inside the body (e.g. *"add three"*, *sl1, k2tog, psso*) uses the existing italic markup pattern in the component. Do not introduce a new italic class. If the component uses plain `<em>` inside bodies, continue with `<em>`. If it uses markdown-style asterisks that are processed into italics, continue with that.
</constraint>

<constraint>
Do not add any PRO badges, free/paid indicators, or feature tier markers to any entry. The pro rakenne is intentionally not surfaced on this page. Users discover it inside the app.
</constraint>

---

## Out of scope for this instruction

<out_of_scope>
1. Replacing numeric indices (01 through 10) with the wooden button graphic. Separate instruction will follow after Emma has tested size and opacity live.
2. Any changes to TrustSection, Hero, FreeToolsCallout, ClosingCTA, Footer, Navbar, or any tool page.
3. Layout adjustments for the orphaned tenth entry in the two column grid. Address this in a follow up after reviewing live.
4. Any changes to the marquee component that will sit between Hero and NineTools. That is a separate instruction.
</out_of_scope>

---

## Verification steps after implementation

<verification>
1. Run `npm run dev` and navigate to the homepage.
2. Scroll to the NineTools section. Confirm the eyebrow reads `WHAT'S INSIDE` and the H2 reads `Every tool, talking to each other.` with `talking to each other.` rendered in italic accent style.
3. Scroll through entries 01 to 10. Confirm all ten entries are present, in order, with the exact body copy above.
4. Confirm no chip pills appear on any entry.
5. Confirm entry 01 has the language availability line directly beneath its body, in italic, in the muted on dark text color.
6. Confirm no em dashes (—) exist anywhere in the rendered NineTools section. A quick find in the source file for the character `—` should return zero results inside this component.
7. Check mobile viewport (≤ 768px). All ten entries stack single column. Entry 01 footnote wraps across multiple lines cleanly.
8. Run `npm run build` to confirm no build errors.
</verification>
