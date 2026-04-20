# Landing Page Fix — Spacing & Typography Sizing

## Problem

Text is too small relative to the viewport width, and elements are too close together throughout the page. The page feels cramped and text lacks visual hierarchy.

## Typography Size Increases

### H1 (Hero headline)
- Current: too small
- Fix: `font-size: clamp(3rem, 6vw, 6rem)` — this scales fluidly with viewport
- The hero headline should feel massive and dominant on desktop

### H2 (Section headings like "Your hands knit. The app counts.")
- Current: too small, looks almost like body text
- Fix: `font-size: clamp(2.2rem, 4.5vw, 4rem)`
- Must be clearly larger than body text — these are the section anchors

### Body text
- Current size is ok but feels large relative to headings because headings are too small
- Keep at `font-size: clamp(1rem, 1.2vw, 1.2rem)`

### Section tags (Bebas Neue — "STAY ON TRACK", "CALCULATORS" etc.)
- Current size is ok
- Keep at ~0.9rem with wide letter-spacing

## Spacing Fixes

### Between screenshot and text (horizontal gap in feature rows)
- Current: too tight
- Fix: `gap: 4rem` minimum, preferably `gap: 6rem`

### Between section tag and H2
- Current: too close
- Fix: `margin-bottom: 0.75rem` on section tag

### Between H2 and body text
- Current: nearly touching
- Fix: `margin-top: 1.5rem` on the body paragraph after H2

### Between body text and feature list (Bebas Neue tags)
- Current: no breathing room
- Fix: `margin-top: 2rem` on the feature list

### Between sections (vertical padding)
- Current: sections feel stacked on top of each other
- Fix: Each section should have `padding: 8rem 0` minimum on desktop, `padding: 5rem 0` on mobile
- Sections with color changes need even more — `padding: 10rem 0`

### Hero section
- Current: text starts too low and feels cramped
- Fix: Hero should have generous top padding (accounting for navbar height) — `padding: 12rem 0 8rem` on desktop
- Screenshot should be vertically centered relative to text block

## Summary of CSS changes

```css
/* Hero */
.hero {
  padding: 12rem 0 8rem;
}

.hero h1 {
  font-size: clamp(3rem, 6vw, 6rem);
  line-height: 1.05;
  margin-bottom: 2rem;
}

/* Section headings */
h2 {
  font-size: clamp(2.2rem, 4.5vw, 4rem);
  line-height: 1.1;
}

/* Feature sections */
.feature-section {
  padding: 8rem 0;
}

.feature-row {
  gap: 6rem;
  align-items: center;
}

/* Section tag to H2 */
.section-tag {
  margin-bottom: 0.75rem;
}

/* H2 to body */
.feature-text p {
  margin-top: 1.5rem;
}

/* Body to feature list */
.feature-list {
  margin-top: 2rem;
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    padding: 8rem 0 4rem;
  }
  .feature-section {
    padding: 5rem 0;
  }
  .feature-row {
    gap: 3rem;
  }
}
```

Apply these changes globally — every section has the same spacing problem.
