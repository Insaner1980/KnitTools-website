# KnitTools — Hero Phone Size Revert and Anchoring Fix

## Context

The previous fix increased the phone mockup `max-width` to `480px`. This is too large for the visual style of a modern app-landing page. Well-designed mobile app sites (Things, Bear, Halide, Reeder, etc.) keep the phone mockup at a smaller, supportive size — it shows the product, but does not compete with the headline for visual weight.

The actual problem in earlier iterations was not the phone's size, but its **anchoring**: when the phone column had room to spare, the phone ended up centered in its column instead of sitting close to the text column. That made it read as floating in the middle of the page.

This instruction reverts the phone to a smaller size and ensures it is anchored to the LEFT edge of its grid/flex column so it sits close to the text without being centered.

## Goal

- Restore the phone to a more modest size (around 300–340px)
- Anchor the phone to the LEFT edge of its column (close to the text), not centered
- Keep the hero feeling like a balanced two-column composition: the headline is the visual lead, the phone is a supporting product showcase

## Files to update

- `src/components/Hero.astro`

## Required changes

### 1. Reduce phone max-width

```css
.hero__phone {
  max-width: 320px;          /* was 480px — back to a supportive size */
  width: 100%;
}
```

If `320px` still looks slightly off, the right range is `300px` to `340px`.

### 2. Anchor phone to LEFT of its column (critical)

This is the key fix. The phone column should not let the phone drift to the center.

**If using Grid:**

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 52ch) minmax(0, 1fr);
  gap: 4rem;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero__phone {
  justify-self: start;       /* CRITICAL: phone anchored to LEFT of its grid cell */
  max-width: 320px;
  width: 100%;
}
```

**If using Flex:**

```css
.hero {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero__text {
  flex: 0 1 52ch;
}

.hero__phone {
  flex: 0 0 320px;           /* fixed phone column width */
  /* DO NOT use margin-left: auto or justify-content: space-between */
}
```

The point is: the phone should sit immediately to the right of the text column, with `gap` controlling the breathing space. It should not be centered in remaining space, and it should not be pushed to the far right of the viewport.

### 3. On wide viewports

On very wide monitors (>1280px), the `max-width: 1280px` on `.hero` keeps the entire hero centered as a unit. Because the phone column is now narrower (320px) and not stretching, both columns sit close to the center of the viewport with comfortable margins on either side.

This is the correct behavior. The hero is a balanced unit, not edge-to-edge content.

### 4. Mobile

On viewports below the desktop breakpoint (<= 768px), the hero stacks vertically. The phone:

- Centered horizontally on mobile
- `max-width: 280px` or so — slightly smaller on small screens
- Below the text content

```css
@media (max-width: 768px) {
  .hero {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  
  .hero__phone {
    max-width: 280px;
    margin: 0 auto;
  }
}
```

## What NOT to change

- Do NOT change the headline copy or sizes
- Do NOT change the text column max-width (`52ch`)
- Do NOT change the gap value unless the phone genuinely crowds the text after this fix
- Do NOT touch any section below the hero

## Verification

After the change:

1. The phone is back to a modest, supportive size (around 300–340px wide)
2. The phone is anchored to the LEFT of its column, sitting close to the text column with the gap as the only separation
3. The phone is NOT centered in its column (no excess space on the phone's left side)
4. On wide monitors, the entire hero is centered as a unit with margins on both sides — the phone is not pushed to the right edge of the viewport
5. The headline is still the visual lead; the phone supports it without competing
6. On mobile, the phone is centered and sized appropriately

## Reference comparison

If the result needs visual reference: look at the hero sections of Things, Bear, Halide, or Reeder. The phone in those examples is consistently smaller than the headline and sits close to the text column, not stretched or centered in empty space. The KnitTools hero should feel similar in proportion.
