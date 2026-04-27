# KnitTools — Hero Headline Copy and Size Update

## Context

The hero headline currently reads:

```
All your knitting tools.
In one app.
```

Two changes:

1. **Copy**: Shorten the second line from "In one app." to "One app." — sharper, more poster-like, better suited to the Caprasimo display face
2. **Size hierarchy**: Make "One app." significantly larger than the first line, creating a deliberate visual punchline. The first line stays at its current size; only the second line grows.

The visual effect should feel like a 70s-style poster headline where the closing phrase carries the most weight.

## Files to update

- `src/components/Hero.astro` — primary file containing the headline markup and styles

## Required changes

### 1. Copy change

Find the headline markup. The second line currently reads "In one app." — change it to "One app." (drop the word "In").

The italic emphasis stays: "One app." renders in italic, just like "In one app." did.

### 2. Size hierarchy

The two lines should have different font sizes. Current state has both lines at the same `clamp()` size. Update so:

- **First line** ("All your knitting tools."): keep at the current size, or adjust to roughly `clamp(2.5rem, 5.5vw, 5.5rem)` if the first-line size is currently smaller
- **Second line** ("One app." in italic): **larger than the first line**, around `clamp(3.25rem, 7.5vw, 7.5rem)`

The exact relationship to aim for: second line is roughly 30–40% larger than the first line at desktop widths. On mobile, the second line is still larger but the gap may compress to keep both lines readable on small screens.

### Implementation approach

If the headline is structured as two `<span>` elements inside one `<h1>`, give each span its own class and size:

```html
<h1 class="hero-headline">
  <span class="hero-headline__line-1">All your knitting tools.</span>
  <span class="hero-headline__line-2"><em>One app.</em></span>
</h1>
```

```css
.hero-headline {
  max-width: 52ch;          /* keep existing max-width from previous fix */
  text-align: left;
  line-height: 1.0;
}

.hero-headline__line-1 {
  display: block;
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  letter-spacing: -0.005em;
}

.hero-headline__line-2 {
  display: block;
  font-size: clamp(3.25rem, 7.5vw, 7.5rem);
  letter-spacing: -0.01em;   /* slightly tighter at large size */
  line-height: 0.95;          /* tighter line height for the larger line */
  margin-top: 0.05em;         /* small visual gap between the lines */
}
```

If the structure is different (e.g. a single `<h1>` with `<br>` separating the lines), restructure to two spans as shown above so each line can have its own font size.

### 3. Container width — verify

The previous hero headline fix set `max-width: 52ch` on the headline column to prevent crowding the phone. Verify this is still applied. The larger second line ("One app.") is shorter in word count (2 words vs the previous 3) so it should fit comfortably even at the larger size.

If "One app." at the larger size somehow extends past the phone, narrow the max-width slightly (e.g. `48ch`). But this is unlikely — "One app." is short.

### 4. Both lines stay left-aligned

Same left edge for both lines. No center alignment, no indentation on the second line.

## What NOT to change

- Do NOT change the eyebrow "AN ANDROID APP FOR KNITTERS"
- Do NOT change the body paragraph "The row you were on, the yarn you forgot..."
- Do NOT change the email signup form
- Do NOT change the meta line "Coming 2026 to Google Play..."
- Do NOT change the phone mockup
- Do NOT touch any other section of the page

## Verification

After the change:

1. The first line reads "All your knitting tools." at its current size
2. The second line reads "*One app.*" (in italic) at a noticeably larger size — clearly larger, not subtle
3. Both lines start at the same left edge
4. Neither line crowds the phone mockup
5. The size jump feels deliberate and poster-like, not accidental or like a layout bug
6. On mobile, both lines remain readable; the second line is still larger than the first but the gap may be less dramatic

## If the result needs adjustment

If after applying these sizes the second line feels too large (overwhelms the page) or not large enough (the hierarchy doesn't read as intentional), flag the issue with a screenshot. The values above are starting points; the right size is a visual judgment that benefits from review.
