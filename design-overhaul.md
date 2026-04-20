# Landing Page Update — Design Overhaul

## 1. Dot Grid Background Pattern

Add a subtle dot grid pattern to three "statement" sections — sections with big text and no screenshots:

1. **Hero** (dark background)
2. **Trust statement** (cream background)
3. **Closing CTA** (dark background)

### CSS implementation

```css
.dot-grid-dark {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1' fill='%23E8E4D0' opacity='0.1'/%3E%3C/svg%3E");
}

.dot-grid-cream {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1' fill='%232E2A26' opacity='0.08'/%3E%3C/svg%3E");
}
```

Apply `.dot-grid-dark` to Hero and Closing CTA.
Apply `.dot-grid-cream` to Trust statement.

No other sections get the pattern — they stay as solid colors.

---

## 2. Screenshot Alternating Layout

All screenshots are currently on the right. Fix by alternating left/right:

| Section | Screenshot | Text |
|---------|-----------|------|
| Hero | Right | Left |
| "Knit" (Stay on Track) | **Left** | **Right** |
| "Organize" (Your Projects) | Right | Left |
| "Calculate" (Five Calculators) | **Left** | **Right** |
| "Scan & Save" (Yarn Scanner) | Right | Left |

```css
.feature-row {
  display: flex;
  align-items: center;
  gap: 6rem;
}

.feature-row--reversed {
  flex-direction: row-reverse;
}
```

Apply `.feature-row--reversed` to the "Knit" and "Calculate" sections.

On mobile, all rows stack to single column (screenshot above text) regardless of desktop order.

---

## 3. Screenshot Overflow at Color Boundaries

Screenshots must extend across section color transitions using negative margin. Currently they are NOT doing this.

Apply `margin-top: -120px` (adjust as needed) to screenshots in sections where the background color changes from the previous section:

- **"Knit" section** (cream): screenshot extends UP into dark hero above
- **"Calculate" section** (dark): screenshot extends UP into cream section above

The screenshot's own app UI background makes it readable on both colors. Only the screenshot crosses — text stays in its own section.

```css
.feature-screenshot--overlap {
  margin-top: -120px;
  position: relative;
  z-index: 2;
}
```

Sections where background color does NOT change from the previous section don't need overlap.

---

## 4. Background Color Rhythm

Current problem: too much cream in a row, sections blur together. New color assignments:

| Section | Background | Dot grid? | Text color | Screenshot theme |
|---------|-----------|-----------|------------|-----------------|
| Hero | **Dark** | YES | Cream | Light theme |
| "Knit" | **Cream** | no | Deep gray | Dark theme |
| "Organize" | **Cream** (continues) | no | Deep gray | Dark theme |
| "Calculate" | **Dark** | no | Cream | Light theme |
| "Scan & Save" | **Dark** (continues) | no | Cream | Light theme |
| "Reference" | **Cream** | no | Deep gray | (no screenshot) |
| Trust statement | **Cream** | YES | Deep gray | (no screenshot) |
| Free tools | **Cream** (continues) | no | Deep gray | (no screenshot) |
| Closing CTA | **Dark** | YES | Cream | (no screenshot) |
| Marquee | **Burnt orange** | no | Cream | — |
| Footer | **Dark** (continues) | no | Cream | — |

Pattern: dark → cream cream → dark dark → cream cream cream → dark → orange → dark

This is intentionally NOT a strict alternation. The rhythm is asymmetric.

**Free tools and Closing CTA are now SEPARATE sections with different backgrounds.** Free tools stays on cream (it's a lightweight mention, not a big moment). Closing CTA moves to dark with dot grid — this creates a clear visual break between them.

### Text colors per background:
- **Dark background:** headings in cream (`--cream`), body text in cream muted (`--cream-muted`), section tags in burnt orange (`--burnt-orange`)
- **Cream background:** headings in deep gray (`--deep-gray`), body text in deep gray muted, section tags in burnt orange

---

## 5. Typography Sizing

### H1 (Hero) — BIGGER
```css
h1 {
  font-size: clamp(3rem, 6vw, 6rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
```

### H1 line breaks
The hero headline must break into THREE lines, not four:
```
Every tool a
knitter needs.
One app.
```
"knitter needs." stays on one line. If necessary, increase the text column width (e.g. 55% instead of 50%) to make room.

### H2 (Section headings) — BIGGER
```css
h2 {
  font-size: clamp(2.2rem, 4.5vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
}
```

### Feature list tags (Bebas Neue) — BIGGER
The ROW COUNTER · STITCH TRACKING etc. tags are too small to read:
```css
.feature-list {
  font-family: var(--font-label);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}
```

---

## 6. Spacing Fixes

### Problem: too much space BETWEEN sections, too little WITHIN

### Section padding (reduce)
```css
.feature-section {
  padding: 6rem 0;
}
```

### Gap between screenshot and text (increase)
```css
.feature-row {
  gap: 6rem;
}
```

### Within sections (increase)
```css
/* Section tag → H2 */
.section-tag {
  margin-bottom: 1rem;
}

/* H2 → body text */
.feature-text h2 {
  margin-bottom: 1.5rem;
}

/* Body text → feature list */
.feature-text p:last-of-type {
  margin-bottom: 2.5rem;
}
```

### Hero section
```css
.hero {
  padding: 12rem 0 8rem;
}

.hero h1 {
  margin-bottom: 2rem;
}
```

### Mobile
```css
@media (max-width: 768px) {
  .hero {
    padding: 8rem 0 4rem;
  }
  .feature-section {
    padding: 4rem 0;
  }
  .feature-row {
    gap: 3rem;
  }
}
```

---

## 7. Pricing Fix

Replace all instances of `€1.99` with:

**Closing CTA text:** `Android · Launch price €4.99 · No ads · No tracking`

---

## Summary — order of implementation

1. Fix screenshot alternation (left/right)
2. Fix background color assignments per section (and text colors)
3. Add dot grid pattern to Hero and Closing CTA
4. Add screenshot overflow at color boundaries
5. Fix H1 and H2 sizes
6. Fix feature list tag sizes
7. Fix spacing (reduce between sections, increase within)
8. Fix hero H1 to three lines
9. Fix pricing text
