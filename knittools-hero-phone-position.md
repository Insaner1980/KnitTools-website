# KnitTools — Hero Phone Position Fix

## Context

After the recent hero changes (max-width on the headline column, larger "One app." line), the phone mockup now sits too far to the right on desktop. There is a large empty gap between the right edge of the text column and the left edge of the phone mockup, breaking the visual relationship between text and phone.

The phone should sit closer to the text column — not crowded against it, but close enough that the two columns read as a related pair, not as two disconnected elements at opposite edges of the viewport.

## Goal

Move the phone mockup closer to the text column so the hero feels balanced as a two-column composition. Maintain comfortable breathing space between the columns, but eliminate the excessive empty gap.

## Files to update

- `src/components/Hero.astro` — primary file containing the hero layout

## Likely cause

One of these is causing the phone to push to the far right:

1. **Grid layout** with `justify-self: end` on the phone column, OR a `grid-template-columns` definition that allocates too much space to the phone column (e.g. `1fr 1fr` when the text column is now constrained to `max-width: 52ch` but the phone column still claims half the viewport)
2. **Flex layout** with `justify-content: space-between` and no max-width on the phone column
3. **Margin-left: auto** on the phone container

## Recommended fix

The hero is conceptually a two-column layout. With the text column now having `max-width: 52ch`, the phone column should:

- Sit immediately to the right of the text column with a comfortable gap (not glued to the right viewport edge)
- Have its own reasonable max-width so it does not stretch on very wide viewports
- Be vertically centered relative to the text column (or aligned to whatever vertical anchor reads best)

### Approach A: Grid with explicit columns

If the hero uses CSS Grid:

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 52ch) minmax(0, 1fr);
  gap: 4rem;                    /* breathing space between text and phone */
  align-items: center;          /* vertical center */
  max-width: 1280px;            /* keep the whole hero from stretching too wide on huge screens */
  margin: 0 auto;               /* center the hero in the viewport */
  padding: 0 2rem;
}

.hero__text {
  /* no extra positioning needed — grid handles it */
}

.hero__phone {
  justify-self: start;          /* sit at the LEFT of its grid cell, close to the text */
  max-width: 320px;             /* phone has a sensible cap */
}
```

The key change is `justify-self: start` on the phone — this brings it close to the text column instead of pushing it to the right edge of its grid cell.

### Approach B: Flex with gap

If the hero uses Flexbox:

```css
.hero {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  /* remove any justify-content: space-between */
}

.hero__text {
  flex: 0 1 52ch;               /* text column up to 52ch wide */
}

.hero__phone {
  flex: 0 1 320px;              /* phone column up to 320px wide */
  /* remove any margin-left: auto */
}
```

Pick whichever approach matches the existing layout. **Don't restructure the layout** — just adjust the positioning rules so the phone moves leftward.

### Numbers to tune

The exact values will depend on what looks right visually:

- **Gap between columns**: start at `4rem`. If too tight, try `5rem` or `6rem`. If too loose, try `3rem`.
- **Phone max-width**: start at `320px`. If the phone looks too small relative to the text, try `360px` or `400px`. If too large, try `280px`.
- **Hero max-width**: start at `1280px`. If the hero feels too narrow on huge monitors, try `1440px`. If sections below the hero use a different max-width, match that for consistency.

## Mobile behavior

On viewports below the desktop breakpoint (<= 768px), the hero stacks vertically. Verify:

- Text column above, phone below (or whatever the existing mobile order is)
- Both columns full width on mobile
- No horizontal overflow
- The phone is centered horizontally on mobile, not pushed to one side

## What NOT to change

- Do NOT change the text content (headline, eyebrow, body, email form, meta line)
- Do NOT change the phone mockup itself (the screenshot inside the Android frame)
- Do NOT change the headline sizes set in the previous fix
- Do NOT touch any section below the hero

## Verification

After the change:

1. The hero reads as a balanced two-column composition on desktop
2. There is a clear, comfortable gap between the text column and the phone — neither crowded nor disconnected
3. The phone is no longer flush with the right edge of the viewport
4. The headline still does not crowd the phone
5. On mobile, the layout stacks correctly with no overflow
6. On very wide viewports (>1440px), the hero stays centered with `max-width` rather than stretching infinitely

## If something still looks off

If after the change the phone is now too close to the text, or still too far, take a screenshot at desktop width and flag it. Spacing values are a visual judgment that benefits from review.
