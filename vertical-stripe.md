# Landing Page — Vertical Stripe Decoration

## What

Add a decorative vertical stripe pattern to the right edge of the page. It runs the full length of the page, from top to bottom, across all sections regardless of background color.

## Implementation

Use a fixed or absolute-positioned SVG element on the right edge of the page body. It sits on top of all sections but behind interactive content (low z-index).

```css
.page-stripe {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 24px;
  z-index: 1;
  pointer-events: none; /* don't block clicks */
}
```

### SVG stripes

```html
<svg class="page-stripe" width="24" height="100%" preserveAspectRatio="none" aria-hidden="true">
  <rect x="0" y="0" width="3" height="100%" fill="var(--burnt-orange)" opacity="0.25"/>
  <rect x="5" y="0" width="1.5" height="100%" fill="var(--cream)" opacity="0.15"/>
  <rect x="8" y="0" width="5" height="100%" fill="var(--burnt-orange)" opacity="0.5"/>
  <rect x="15" y="0" width="2" height="100%" fill="var(--cream)" opacity="0.3"/>
  <rect x="19" y="0" width="3" height="100%" fill="var(--burnt-orange)" opacity="0.9"/>
</svg>
```

The outermost (rightmost) stripe is the most opaque, fading inward. This creates depth — the edge feels solid and the stripes dissolve into the page.

### Color adaptation

The stripes use the same burnt orange and cream as the rest of the site. On dark sections the cream stripes are subtly visible; on cream sections the burnt orange stripes are visible. Both work because the opacities are low enough on the inner stripes.

### Mobile

Hide the stripe on mobile — it takes valuable screen width:

```css
@media (max-width: 768px) {
  .page-stripe {
    display: none;
  }
}
```

### Placement in HTML

Add the SVG element once, directly inside `<body>` or the main layout wrapper, before or after the page content. It is purely decorative — `aria-hidden="true"` and `pointer-events: none`.

## Notes

- Stripe widths and opacities may need visual tuning in the browser
- The outermost stripe should be clearly visible; inner stripes should be subtle
- Total width ~24px — adjust if it feels too thick or thin
- Make sure it doesn't overlap scrollbar on Windows browsers — test with `right: 0` vs a small offset if needed
