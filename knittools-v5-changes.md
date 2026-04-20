# KnitTools Landing Page v5 — Changes & Corrections

**Applies to:** knittools-landing-page-v5-spec.md
**Reason:** Feedback from first Claude Code implementation attempt + additional design decisions.

---

## 1. Typography — Much Bigger

**H1 (hero):** Increase to **90–110px desktop, 48–56px mobile**. Must dominate the viewport like Pure Audio's "pure audio" heading. If it doesn't feel uncomfortably large at first glance, it's too small.

**H2 (section headings):** Increase to **64–80px desktop, 40–48px mobile**. Each section heading should be the dominant visual element. Reference: Pure Audio's "who we are" and "our product" scale.

All other typography sizes remain as specified.

---

## 2. Stripe Ribbon — Wider, Actually 3D

### Width
Change from 150–175px to **250–300px total width**. Each of the 5 stripes should be ~50–60px wide. This must be a bold, dominant visual element — not a thin decorative line.

### 3D Effect — CRITICAL
The current implementation is flat colored stripes. This is wrong. Study the Bennett Feely reference image:
- At the top where the ribbon enters the page and at each curve, the ribbon must show a **3D fold/twist** — one face of the ribbon is lit, the other face is in shadow.
- Use **gradients within each stripe** to simulate light and shadow on different faces of the fold. Darker shade on one face, lighter on the other.
- Between folds, the ribbon can be flat, but at curve points it must feel like a **physical ribbon turning in 3D space**.
- If true 3D is too complex to execute well, a properly wide flat ribbon (250–300px) is better than a bad 3D attempt.

### Path
- Starts top-left, enters from above the viewport diagonally — exactly like the Bennett Feely image.
- **Must NOT overlap text or interactive elements.** Plan the path so it flows through visual gaps between content blocks. The current implementation has the ribbon crossing through text — this is wrong and creates visual noise.
- 2–3 graceful curves across the page length.

### Mobile
Narrower (~150–180px) but still visible with 3D effect preserved at folds.

---

## 3. Phone Mockups — Realistic 3D Devices

### The Problem
Current implementation uses flat rectangles with rounded corners. They don't look like real phones. When rotated in 3D, they look like spinning cards — no thickness, no side profile.

### The Fix
Every phone mockup must be a **realistic 3D smartphone**:
- Proper device bezel/frame (dark edge around the screen)
- Notch or dynamic island at top
- **Side profile visible when tilted** — the phone has physical thickness (~8–10px apparent depth). When the phone is rotated in 3D perspective, you should see the edge/side of the device, not just a flat plane spinning. This can be done with CSS `transform-style: preserve-3d` and pseudo-elements for the side faces, or with a proper 3D CSS box approach.
- Realistic shadow that matches the 3D angle

### Hero Phone Specifically
- Size: **320–360px wide** on desktop (much bigger than current)
- Dramatic 3D tilt: `perspective(800px) rotateY(-15deg) rotateX(5deg)` or more
- The side/edge of the phone must be visible due to the rotation
- **NO dark background area behind it** — floats directly on cream page with shadow

### Feature Section Phones
- Main/center phone: **280–320px wide**
- Side phones: **200–220px wide minimum** — if they can't be this size and still fit, use fewer phones. Never sacrifice readability.
- All phones realistic 3D with visible device frames

---

## 4. Feature Section Backgrounds — Colorful Cards

### Remove
~~Dark brown inset areas behind phone mockups~~ — remove from all feature sections.

### Replace With
Large, full-color background cards behind each feature section's phone area. Inspired by the Géraldine chocolate site — bold colored rectangles with generous rounded corners (~24–32px radius).

**Colors per section (full saturation, no opacity):**
- Stay on Track (Row Counter): **Burnt orange (#C45100)**
- Your Projects: **Avocado (#8BA44A)**
- Calculators: **Mustard (#C9A435)**
- Yarn Scanner: **Dusty rose (#B8908F)**

**How phones interact with the card:**
- Phones sit ON TOP of the colored card, overlapping its edges — not trapped inside it.
- The card is a background element; the phones are foreground elements that break its boundaries.
- Phones have strong shadows so they pop off the colored surface.
- The card should be large and generous, not a tight wrapper around the phones.

**Reference section** keeps the 4 dark brown cards — no change there.

---

## 5. Hero Phone — No Dark Background

Remove the dark brown inset area from behind the hero phone. The phone floats directly on the cream page background. The realistic device frame + shadow + 3D tilt provide all the contrast needed.

---

## 6. Feature Section Phone Counts — Quality Over Quantity

If showing 3 phones in a section results in any phone being too small to read:
- Use **2 large phones** instead
- Or **1 large phone + floating text labels** (like Yarn Scanner section)

Never show tiny unreadable phones. Every phone on the page must be large enough that a visitor can read the screen content.

---

## 7. Stripe Must Not Interfere With Content

The stripe ribbon path must be planned so it:
- Does NOT cross through text blocks
- Does NOT cross through phone mockups
- Is visible in the **open spaces** between sections and in the margins
- Passes BEHIND colored feature cards and all other content

If the ribbon crosses behind a colored card, it will be hidden — that's fine. It reappears on the other side.

---

## 8. Summary of What Was Removed

- ~~Dark brown inset areas~~ behind phone mockups in ALL feature sections and hero
- ~~Opacity/transparency on stripe~~ — full vivid colors
- ~~Small phone sizes~~ (140–150px) — minimum 200px for any phone on desktop

## 9. Summary of What Was Added

- Colorful background cards (burnt orange, avocado, mustard, dusty rose) behind feature section phones
- Realistic 3D phone mockups with visible side profile and device bezels
- Much larger typography (H1: 90–110px, H2: 64–80px)
- L-shaped retro stripe frame (replaces flowing ribbon)
- Three.js hero phone

---

## 10. Stripe Ribbon — REMOVED, Replaced by L-Shaped Retro Frame

### Remove entirely
The flowing stripe ribbon that curves through the page is removed. It was too complex to implement well.

### Replace with: L-shaped retro stripe frame
A simpler, bolder alternative inspired by the "Retro Stripes Super Pack" reference image. This is an L-shaped border that frames the page:

- **Vertical stripe** runs down the entire left edge of the page, top to bottom
- **Horizontal stripe** runs across the entire bottom of the page, left to right
- **Rounded corner** connects them at the bottom-left — a smooth quarter-circle curve, not a sharp 90-degree angle
- 5 parallel stripes, touching, no gaps — same construction rules as before
- Total width: ~250–300px (same as before)
- Colors — Bennett Feely retro palette:
  1. Dark teal / salvia (#5B8072)
  2. Warm rust / orange (#C2703E)
  3. Sand / khaki (#C4A661)
  4. Dark brown (#6B4332)
  5. Muted terracotta / brick (#A05038)
- Full opacity, vivid colors
- Sits behind all content (z-index: 0)
- On mobile: narrower (~120–150px) but still visible

This is much simpler to implement — straight lines + one curved corner. CSS borders or a simple SVG.

---

## 11. "Your Projects" Section — Phone Layout Fix

Same rules as other feature sections:
- **NO dark background inset area.** Phones float on an **avocado-colored background card**.
- Two phones side by side, both large (260–300px wide), realistic 3D device frames.
- Slight vertical offset between them (15–20px) for visual interest.
- Phones overlap the card edges freely.

---

## 12. Hero Phone — Three.js 3D

### Remove
CSS-based phone mockup. It cannot produce realistic 3D with visible side profile.

### Replace with: Three.js 3D phone model
- Realistic smartphone built as a 3D box in Three.js — front screen, back, sides, top, bottom all visible
- Screenshot of Row Counter (light theme) applied as texture on the front face
- Slow automatic rotation — gently rocking/rotating so all sides are slightly visible (front dominant, but edges and bottom peek through)
- Realistic lighting and shadows
- Large: fills the right column generously (320–360px equivalent)
- **Desktop only.** On mobile, replace with a static rendered image (pre-rendered from the same 3D model at a fixed angle) for performance. Users won't notice the difference on small screens.
- No backend required — Three.js runs entirely in the browser

### Phone appearance requirements
- Must include phone top bar (status bar with time, signal, battery icons)
- Must include bottom navigation bar from the app
- Realistic bezel/frame — dark edges, rounded corners (~40px), notch or dynamic island
- Side profile must show device thickness (~8px apparent depth)
- Reflective/glossy edge material

---

## 13. Reduced Screenshot Count

Only 4 sections have phone mockups. The rest use text-only layouts.

| Section | Phone? | Screenshot(s) needed |
|---------|--------|---------------------|
| Hero | Yes — Three.js 3D | Row Counter (light theme) |
| Stay on Track | No | — |
| Your Projects | Yes — static image | Project List |
| Calculators | Yes — static image | Cast On Calculator |
| Yarn Scanner | Yes — static image | Yarn Card Review + floating labels |
| Reference | No | — |

Total screenshots needed from app: **4** (Row Counter light, Project List, Cast On Calculator, Yarn Card Review)

All static phone images must be realistic — proper device frame with bezel, notch, status bar, and app bottom navigation visible. Generated via Rotato, shots.so, Spline export, or similar mockup tool.

---

## 14. "Stay on Track" Section — Text-Only Centered Layout

### Remove
Phone mockups and dark inset area from this section.

### Replace with: Full-width centered text layout
- Same structure as the Reference section — centered, no phone
- **NO colored background card** (no phone to frame)
- Section tag: "ROW COUNTER" in Bebas Neue, burnt orange, centered
- Heading: "Stay on Track" in Satoshi 900, dark brown, centered, 64–80px
- Description paragraph centered below, max-width ~700px
- Feature pills centered below description: Row Counter, Stitch Tracking, Voice Commands, Row Reminders, Session Timer, Pattern Viewer

This creates a clean rhythm: hero (phone) → Stay on Track (text only) → Your Projects (phone) → Calculators (phone) → Yarn Scanner (phone) → Reference (text only). Text-only sections give visual breathing room between phone-heavy sections.
