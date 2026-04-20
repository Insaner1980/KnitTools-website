# KnitTools Landing Page v6 — Diagonal Section Changes

**Scope:** Replace colored cards behind screenshots with diagonal-edged sections. Update hero text. Refine typography.

---

## 1. Hero Text Update

Change the hero heading structure:

```
Every tool
a knitter needs.
ONE APP.
```

- "Every tool a knitter needs." — normal style (Satoshi 900, dark)
- "ONE APP." — ALL CAPS, burnt orange (#C45100), same size or slightly larger

The Three.js phone mockup should start lower to give text more breathing room.

---

## 2. Remove Colored Cards Behind Screenshots

Remove the rectangular colored background cards from all feature sections (Your Projects, Calculators, Yarn Scanner).

Replace with diagonal-edged sections as described below.

---

## 3. Diagonal-Edged Sections

### Concept

Full-width colored sections with one diagonal edge. The diagonal edge creates a slanted transition rather than a straight horizontal line.

### Colors

- **From right:** Terracotta/rust (the innermost stripe color, closest to content)
- **From left:** Teal (#5B8072)

### Which sections get diagonals

| Section | Direction | Color | Content layout |
|---------|-----------|-------|----------------|
| Your Projects | From right | Terracotta | Text left, screenshot right |
| Calculators | From left | Teal | Screenshot left, text right |
| Yarn Scanner | From right | Terracotta | Text left, screenshot right |

### Size

- **Height:** Approximately 60–70% of the screenshot height
- The diagonal section should feel substantial, not a thin stripe
- Screenshots overflow above and below the diagonal area

### Layout rules

1. **Content follows diagonal direction:**
   - Diagonal from right → text on left side, screenshot(s) on right side (on top of diagonal)
   - Diagonal from left → screenshot(s) on left side (on top of diagonal), text on right side

2. **Text stays OFF the diagonal section** — text is on the plain cream background side

3. **Screenshots sit ON TOP of the diagonal** — they can overflow above and below the diagonal section boundaries

4. **Diagonal angle:** Approximately 5–8 degrees (subtle but visible)

5. **Diagonal edge:** Only one edge is diagonal (the edge closest to the text). The other edges are straight or extend off-screen.

### Interaction with stripes

- Diagonal sections from the RIGHT should meet/blend with the stripe column naturally (same terracotta color continues into the innermost stripe)
- Diagonal sections from the LEFT (teal) end before reaching the stripes, leaving a gap of cream background
- Screenshots can overlap onto the stripes — that's fine
- The diagonal colored area itself should NOT overlap the stripes awkwardly

---

## 4. Section Typography

### Headings with emphasis

| Section | Heading | Styling |
|---------|---------|---------|
| Hero | Every tool a knitter needs. ONE APP. | "ONE APP." = caps + burnt orange |
| Stay on Track | Stay on Track | No emphasis |
| Your Projects | Your Projects | No emphasis |
| Calculators | Four calculators for every *knitting math* | "knitting math" = italic + burnt orange |
| Yarn Scanner | **Scan.** Save. *Never* lose a yarn label again. | "Scan" = burnt orange, "Never" = italic |
| Reference | Reference | No emphasis |

### General rules

- Only some headings have emphasis — this creates variety without chaos
- Never more than one or two emphasized words per heading
- Keep unemphasized headings simple for visual rest

---

## 5. Sections WITHOUT Diagonal Backgrounds

These sections remain as they are (no diagonal, no colored background card):

- **Hero** — has its own layout with Three.js phone
- **Stay on Track** — centered text-only layout
- **Reference** — centered text with 4 dark cards

---

## 6. Footer

Reduce excessive whitespace below footer text. The footer should be compact.

---

## 7. Visual Summary

```
┌─────────────────────────────────────┬───┐
│ HERO                                │ S │
│ Text left, 3D phone right           │ T │
├─────────────────────────────────────┤ R │
│ STAY ON TRACK (centered text only)  │ I │
├─────────────────────────────────────┤ P │
│ YOUR PROJECTS          ┌───────┐    │ E │
│ Text      ████████████ │phone  │    │ S │
│           ████DIAGONAL█│mockup │    │   │
│           ████████████ └───────┘    │   │
├─────────────────────────────────────┤   │
│ CALCULATORS                         │   │
│    ┌───────┐ ████████████████  Text │   │
│    │phone  │ █████DIAGONAL████      │   │
│    │mockup │ ████████████████       │   │
│    └───────┘                        │   │
├─────────────────────────────────────┤   │
│ YARN SCANNER           ┌───────┐    │   │
│ Text      ████████████ │phone  │    │   │
│           ████DIAGONAL█│mockup │    │   │
│           ████████████ └───────┘    │   │
├─────────────────────────────────────┤   │
│ REFERENCE (centered, 4 dark cards)  │   │
├─────────────────────────────────────┤   │
│ TRUST SECTION                       │   │
├─────────────────────────────────────┤   │
│ CLOSING CTA                         │   │
├─────────────────────────────────────┴───┤
│ ═══════════ MARQUEE ═══════════════════ │
├─────────────────────────────────────────┤
│ FOOTER (compact)                        │
└─────────────────────────────────────────┘
```

---

## 8. Implementation Notes

### CSS approach for diagonals

Use `clip-path` with `polygon()` or a pseudo-element with `transform: skewY()`.

Example for diagonal from right:
```css
.diagonal-right {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
  /* or adjust percentages for desired angle */
}
```

Example for diagonal from left:
```css
.diagonal-left {
  clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 100%);
}
```

### Z-index

- Stripes: z-index 0 (behind everything)
- Diagonal sections: z-index 1
- Screenshots/phones: z-index 2 (on top of diagonals)
- Text: z-index 2
