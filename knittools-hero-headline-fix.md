# KnitTools — Hero Headline Balance Fix

## Context

The hero headline currently reads:

```
All your knitting tools.
In one app.
```

On desktop, two visual problems are present:

1. **First line "All your knitting tools." is too long** — it extends almost into the phone mockup area on the right side, creating a cramped feel
2. **Second line "*In one app.*" starts too far from the left edge** — it appears to be either center-aligned or pushed right by some inherited style, breaking the visual relationship with the first line

Both lines should sit in the same left-aligned column, with the same left edge, contained within roughly the left half of the viewport so they do not crowd the phone mockup on the right.

## Goal

Fix the hero headline so:

- Both lines are left-aligned with the same left edge
- The headline column has a max-width that keeps it clearly to the left of the phone mockup on desktop
- The font size is reduced slightly to avoid the headline feeling overwhelming
- Mobile behavior remains correct (single column, full width)

## Files to update

- `src/components/Hero.astro` — primary file containing the headline markup and styles
- Possibly `src/styles/global.css` if heading sizes are defined globally

## Required CSS changes

### Headline column width

The hero is a two-column layout on desktop (text left, phone right). The text column should have a clear max-width so the headline does not crowd the phone.

Apply or verify this on the headline container (the parent element that wraps both lines):

```css
.hero-headline {
  max-width: 52ch;            /* roughly half-width on large viewports */
  /* or alternatively: max-width: 600px; — pick whichever the existing layout uses */
  text-align: left;            /* not center, not right */
}
```

If the headline is `<h1>` directly without a wrapping container, apply the max-width to the `<h1>` itself.

### Both lines left-aligned

Ensure both `<span>` (or whatever wraps each line) inside the headline use:

```css
display: block;     /* each line on its own row */
text-align: left;
margin-left: 0;     /* no inherited indentation */
```

If the second line ("In one app.") is currently using `text-align: center` or `margin-left: auto` or any indent, remove those styles.

### Reduce font size

Caprasimo is heavier than DM Serif Display. The current size is too large on wide viewports. Update the H1 size:

```css
h1, .hero-headline {
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  line-height: 1.05;
  letter-spacing: -0.005em;
}
```

This is a meaningful reduction from the current `clamp(2.75rem, 6vw, 6.25rem)`. Adjust slightly up or down if the result still feels too large or too small after rendering.

### Mobile behavior

On viewports below the desktop breakpoint (<= 768px), the hero stacks vertically (text above phone, or text and phone in a single column). The headline should:

- Use the full available width (no max-width constraint, or a generous one like `max-width: 100%`)
- Stay left-aligned
- Use a smaller font size from the `clamp()` minimum value

The `clamp()` formula above already handles this — the `2.5rem` minimum applies on small viewports. Verify no media-query override is forcing a different alignment or width on mobile.

## Verification

After the change, on desktop (>= 1024px):

1. Both lines start at the same left edge
2. The first line "All your knitting tools." ends well before the phone mockup begins (no crowding)
3. The second line "*In one app.*" sits directly below the first line, same left edge, indented only by italic letterform shape (not by margin)
4. The headline feels balanced relative to the phone — text column on left, phone column on right, neither crowding the other
5. The vertical rhythm (eyebrow → headline → body paragraph → email form → meta line) reads cleanly

On mobile (<= 768px):

1. Both lines remain left-aligned
2. The headline is comfortably readable, not too large
3. The phone appears below the text section, full width
4. No horizontal overflow

## What NOT to change

- Do NOT change the headline copy itself ("All your knitting tools. *In one app.*")
- Do NOT change the italic emphasis on "In one app." — it stays italic
- Do NOT change the eyebrow "AN ANDROID APP FOR KNITTERS" or any other hero element
- Do NOT change the phone mockup or its position
- Do NOT change the body paragraph below the headline
- Do NOT touch any other section of the page — this is hero-only

## If something looks off after the change

If after applying these styles the result still does not look balanced — for example, the headline is now too small, or the column is too narrow and forces awkward line breaks — flag the issue with a screenshot rather than making further size adjustments. Size and width are subjective at this stage and benefit from a second look before further tweaking.
