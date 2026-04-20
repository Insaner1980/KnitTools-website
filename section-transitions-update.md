# Landing Page Update — Section Transitions

## Remove Glassmorphism

Remove all glassmorphism cards from feature sections. No `backdrop-filter: blur()`, no semi-transparent card backgrounds at section boundaries. The glassmorphism approach doesn't work because text needs to be light on dark backgrounds and dark on light backgrounds — a card spanning both creates unreadable text on one side.

## Screenshot Overflow at Section Boundaries

Instead of cards, app screenshots bridge section color transitions by extending into the previous section using negative margin.

### How it works

- Section backgrounds change cleanly (e.g. dark → cream or cream → dark)
- The screenshot in the new section pulls upward into the previous section's background using negative margin
- Only the screenshot crosses the boundary — all text, section tags, and feature lists stay fully within their own section
- Screenshots have their own background (the app UI) so they are readable on any website background color

### CSS approach

```css
.feature-row {
  display: flex;
  align-items: flex-start;
  gap: 3rem;
}

.feature-screenshot {
  margin-top: -100px; /* adjust per section, ~80-120px */
  position: relative;
  z-index: 2;
}
```

On mobile (single column layout), reduce or remove the negative margin since sections stack vertically and the effect doesn't work the same way.

### Which sections use this

Feature sections that sit at a color transition:
- **"Knit" section** (cream background) — dark theme screenshot overflows up into the dark hero
- **"Calculate" section** (dark background) — light theme screenshot overflows up into the cream section above

Sections that DON'T need overflow (same background continues from previous section):
- "Organize" (cream continues from "Knit")
- "Scan & Save" (dark continues from "Calculate")

## Fix Pricing

Replace all instances of `€1.99` with the correct pricing:

- Launch price: **€4.99**
- Price after 2 months: **€7.99**

In the closing CTA, use: `Android · Launch price €4.99 · No ads · No tracking`
