# KnitTools Landing Page — Layout & Design Spec v5

**Purpose:** Complete visual and structural specification for the KnitTools marketing landing page rebuild.
**Framework:** Astro 6 (static site generation)
**Status:** Pre-launch ("Coming soon")
**Price:** €5.99 one-time purchase

---

## Design Philosophy

**Bold, warm, confident.** Every element owns its space. Large typography, generous proportions, free-flowing phone mockups. Inspired by Pure Audio's typographic confidence, Bennett Feely's retro stripe, and Analogica's warm multi-phone layouts — but grounded in a professional app-marketing context.

**Not:** a vintage blog, a generic SaaS template, or a cute craft site.

### Visual References

**Include these images when handing spec to Claude Code:**

1. **Bennett Feely portfolio** (stripe-reference.png) — CRITICAL REFERENCE. The thick multicolor 3D ribbon that flows through the page. Copy the feeling: thick parallel stripes touching each other, 3D fold/twist at the top where it enters the page, flat band as it flows downward. The stripe colors come from this image. The 3D effect at curves is essential — this is not a flat SVG, it must feel like a physical ribbon with depth.

2. **Pure Audio / Lautsprecher** (pure-audio-reference.png) — STYLE REFERENCE. The overall feeling to aim for: bold oversized typography that dominates the viewport, warm cream/brown palette, products (in our case phones) that feel large and confidently placed, and the general sense that every element owns its space. Note how the product images are large and free-floating rather than trapped inside tight grid boxes.

---

## Global Design Tokens

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Cream | #E8E4D0 | Page background — entire site |
| Cream muted | #D4D0BD | Secondary backgrounds, pill fills |
| Dark brown | #2E2A26 | Text, dark inset areas, footer |
| Deep brown | #262320 | Footer background |
| Burnt orange | #C45100 | Primary accent — CTAs, tags, stripe |
| Avocado | #8BA44A | Accent — projects, secondary tags |
| Mustard | #C9A435 | Accent — calculators, tertiary tags |
| Dusty rose | #B8908F | Accent — yarn scanner, quaternary |

**Rules:**
- Never use pure black (#000000) or pure white (#FFFFFF)
- Page background is always cream — no dark-background sections
- Dark brown used only in: phone inset areas, reference cards, footer, stripe ribbon
- Color comes from accents, cards, stripe, marquee, and text — not from section backgrounds

### Typography
| Role | Font | Weight | Size (desktop) | Size (mobile) | Notes |
|------|------|--------|----------------|---------------|-------|
| Logo text | Outfit | 700 | 24px | 20px | Only used for "KnitTools" next to logo |
| H1 (hero) | Satoshi | 900 (Black) | 72–80px | 44–48px | Must feel massive and commanding |
| H2 (section) | Satoshi | 800–900 | 48–56px | 32–36px | Bold, owns the space |
| Section tag | Bebas Neue | 400 | 14–16px | 12–14px | Uppercase, letter-spacing 3px |
| Body | Creato Display | 400 | 17–18px | 16px | Generous line-height 1.7 |
| Pills / labels | Creato Display | 500 | 13–14px | 12–13px | Feature capsules |
| Nav links | Bebas Neue | 400 | 17px | — | Uppercase, letter-spacing 2.5px |
| Button text | Bebas Neue | 400 | 17–18px | 16px | Uppercase, letter-spacing 2px |
| Marquee | Bebas Neue | 400 | 22–24px | 18px | Uppercase, letter-spacing 3px |

**Key principle:** Typography must feel BIG. Hero H1 should dominate the viewport. Section headings should be the first thing the eye catches in each section. Never timid.

### Spacing
- Section padding: 120–140px vertical (desktop), 80–100px (mobile)
- Max content width: 1200px, centered
- Grid gap between text and phones: 72–80px (desktop)

### Buttons
- Primary CTA: Solid burnt orange fill, cream text, rectangular (border-radius: 0), Bebas Neue uppercase
- Secondary CTA: Burnt orange border, transparent fill, hover → solid fill
- No rounded pill buttons — sharp rectangles throughout

---

## The Stripe Ribbon

A thick, multi-color decorative ribbon that flows vertically through the entire page, connecting all sections as a continuous visual thread.

### Construction
- 5 parallel stripes, each ~30–35px wide, **touching with no gaps**
- Total ribbon width: ~150–175px
- Colors taken from Bennett Feely's retro palette — each stripe must be clearly distinguishable from its neighbors:
  1. Dark teal / salvia (#5B8072 or similar — muted green-teal)
  2. Warm rust / orange (#C2703E or similar — warm earthy orange)
  3. Sand / khaki (#C4A661 or similar — warm golden sand)
  4. Dark brown (#6B4332 or similar — rich chocolate)
  5. Muted terracotta / brick (#A05038 or similar — deep reddish brown)
- These are decorative colors for the stripe only — they do not replace the UI accent palette (burnt orange, avocado, mustard, dusty rose)
- **Full opacity** — colors must be vivid and clearly visible, not faded/ghostly
- Strokes use `stroke-linecap: butt` so edges align cleanly

### Path & 3D Effect
- **Start:** Top-left of page, entering from above like Bennett Feely's portfolio — the ribbon appears to "fall" onto the page at an angle
- **3D perspective:** At the starting point and at each major curve, the ribbon has a 3D twist/fold effect using gradients, shadows, or perspective transforms. Between curves it flattens into a 2D band.
- **Flow:** 2–3 large, graceful S-curves across the full page length:
  1. Starts top-left, descends diagonally to center-right (through hero → first features)
  2. Curves left through middle features
  3. Curves right again toward closing sections
- **Passes behind all content** — sections, cards, phones all sit on top of the ribbon. The ribbon is visible in the gaps and margins between content blocks.

### Implementation Notes
- SVG with gradient fills for 3D fold sections
- `position: fixed` or absolute with full page height
- `z-index: 0` — all sections at `z-index: 1` or higher
- Consider `will-change: transform` for scroll performance
- On mobile: ribbon may need to be narrower (~100px) or repositioned, but still visible and recognizable

---

## Section-by-Section Layout

### 1. Navbar

**Background:** Transparent, same as cream page. On scroll: backdrop-blur + cream tint (#E8E4D0 at 85% opacity).

**Height:** Taller than typical — 80px+ with generous vertical padding (24px).

**Layout:**
- Left: Burnt orange circle (44px) with "KT" in white/cream + "KnitTools" in Outfit 700, dark brown
- Right: TOOLS / ARTICLES / GET THE APP in Bebas Neue, dark brown. Note: "GET THE APP" text only — no button styling, since app is not yet available. This link scrolls to the closing CTA or shows a "coming soon" message.

**Mobile:** Hamburger menu icon (dark brown). Overlay menu with same links.

**Fixed position, z-index 100.**

---

### 2. Hero

**Background:** Cream (#E8E4D0) with subtle dot grid (darker cream dots, ~3–5% opacity).

**Desktop layout (2 columns):**

Left column (text):
- H1: "Every tool a knitter needs. *One app.*" — Satoshi Black 72–80px. "One app." in burnt orange italic. This heading must be massive and commanding.
- Description: "Row counter, calculators, yarn scanner, and reference guides — all in one beautiful app." — Creato Display 18px, dark brown at 70% opacity.
- Email signup: Input field (subtle border, cream-tinted background) + "NOTIFY ME" button (solid burnt orange, Bebas Neue). Full width up to 420px.
- Store badges: "Coming soon on Google Play" + "Coming soon on Amazon Appstore" side by side, muted text (50% opacity), small official store icons/badges.

Right column (phone):
- One large phone mockup showing the row counter light theme (cream screen, large "2", "CURRENT ROW" in avocado, "CLASSIC RIBBED HAT" at top)
- **3D tilt — dramatic and eye-catching:** `perspective(800px) rotateY(-15deg) rotateX(5deg)` — this must be a bold, noticeable rotation, not subtle. The phone should look like it's dramatically angled toward the viewer, almost like a product shot in a magazine. Experiment with values up to rotateY(-20deg) if it looks good.
- Large cinematic shadow: `30px 30px 80px rgba(0,0,0,0.35)` plus a softer secondary shadow for depth
- The phone should feel like it's floating and turning in 3D space — impressive and showstopping
- Phone sits inside a **rounded dark brown inset area** (border-radius 28–32px, padding 40px) that provides contrast against the cream page
- Phone must be BIG — at least 280–300px wide on desktop
- **Pre-launch phase:** Feature labels float around the phone as text badges (e.g., "Voice Commands", "Row Reminders", "Session Timer", "Pattern Viewer") — small rounded cards with subtle shadow, positioned organically around the phone. These are temporary until real screenshots are available.
- **Post-launch phase:** Small screenshots animate out from the main phone, replacing the text labels.

**Mobile layout (single column):**
- Phone appears ABOVE the text (order: -1) — the app visual hooks attention first
- Phone mockup: 220–240px wide, centered
- H1 scales to 44–48px, centered text
- Email signup: full width
- Store badges: stack vertically if needed

---

### 3. Feature: "Stay on Track" (Row Counter)

**Tag:** ROW COUNTER — Bebas Neue, burnt orange
**Heading:** "Stay on Track" — Satoshi 900, dark brown, 48–56px
**Description:** Current site text about row counting, tracking, etc. — Creato Display
**Pills:** Row Counter, Stitch Tracking, Voice Commands, Row Reminders, Session Timer, Pattern Viewer — on cream-colored capsules

**Phone layout — 3 phones, center raised:**
Inside a rounded dark brown inset area (28px radius):
- Left phone: small (140–150px wide) — e.g., Session History
- Center phone: large (200–220px wide), raised 24px higher — Row Counter (dark theme)
- Right phone: small (140–150px wide) — e.g., Row Reminders
- Phones rise from the bottom of the inset, cut off slightly at bottom edge (no bottom padding in inset) — creates a "rising out" effect
- All phones must be large enough to be readable

**Desktop:** Text left, phones right
**Mobile:** Text on top, phones below. Phones may reduce to 2 (drop one small phone) or scale down proportionally. Inset area full width.

---

### 4. Feature: "Your Projects" (Projects & Library)

**Tag:** PROJECTS — Bebas Neue, avocado
**Heading:** "Your Projects" — Satoshi 900, dark brown
**Description:** Managing projects, library, yarn stash, Ravelry integration
**Pills:** Project Management, Library, Yarn Stash, Progress Photos, Ravelry, Insights

**Phone layout — 2 equal large phones:**
Inside a rounded dark brown inset area:
- Two phones side by side, both large (180–200px wide)
- e.g., Project List + Library screen
- Slight vertical offset between them (one 10–15px higher) for visual interest
- Rising from bottom of inset

**Desktop:** Text RIGHT, phones LEFT (reversed from previous section)
**Mobile:** Text on top, phones below side by side (scaled down) or stacked with slight overlap.

---

### 5. Feature: "Calculators"

**Tag:** CALCULATORS — Bebas Neue, mustard
**Heading:** "Four calculators for every *knitting math*" (keeping current text) — Satoshi 900, dark brown. "knitting math" in burnt orange italic.
**Sub-features (from current site):**
- Gauge Perfection — description
- Inc/Dec Spacing — description
- Cast-On Master — description
- Yarn Estimation — description

These are displayed as a 2×2 grid of text blocks with burnt orange bold titles (keeping the current presentation style, which works well for explaining multiple calculators).

**Phone layout — 1 large + 2 stacked cards:**
Inside a rounded dark brown inset area:
- Left: one large phone (200–220px wide) — Cast On Calculator
- Right: two smaller cards/phones stacked vertically (130–140px wide each) — Gauge Converter + Increase/Decrease
- Creates an asymmetric, dynamic composition

**Desktop:** Phones LEFT, text RIGHT (reversed)
**Mobile:** Text on top. Below: large phone centered, two smaller cards side by side underneath.

---

### 6. Feature: "Yarn Scanner"

**Tag:** YARN SCANNER — Bebas Neue, dusty rose
**Heading:** "Scan. Save. Never lose a yarn label again." (keeping current text) — Satoshi 900, dark brown
**Sub-features (from current site):**
- Label OCR Scanning — with description
- AI Instruction Parser — with description

**Phone layout — CapWise style, center phone + floating info cards:**
Inside a rounded dark brown inset area:
- One large phone centered (200–220px wide) — Yarn Card Scanner screen
- 4 small floating cards around the phone, positioned organically:
  - "Merino Wool 80%" (top-left)
  - "100g / 200m" (top-right)
  - "DK Weight" (bottom-left, avocado text)
  - "Care: Machine wash" (bottom-right, dusty rose text)
- Cards have cream background, subtle shadow, rounded corners
- Cards appear to float/hover slightly with subtle shadow depth
- This layout communicates "the app reads your label and extracts this info"

**Desktop:** Text LEFT, phones RIGHT
**Mobile:** Text on top. Below: phone centered, floating cards repositioned (2 above phone, 2 below) or converted to a simple horizontal scroll of small cards.

---

### 7. Feature: "Reference"

**Tag:** REFERENCE — Bebas Neue, burnt orange
**Heading:** "Reference" — Satoshi 900, dark brown, centered
**No phone mockups.** Instead: 4 dark brown cards.

**Card grid:**
- 4 cards in a row (desktop), 2×2 grid (mobile)
- Each card: dark brown (#2E2A26) background, rounded corners (20px), generous padding (36px vertical)
- Card content:
  1. NEEDLE SIZES — title in burnt orange, sub: "Metric · US · UK · JP"
  2. SIZE CHARTS — title in avocado, sub: "6 categories"
  3. ABBREVIATIONS — title in mustard, sub: "76 terms"
  4. CHART SYMBOLS — title in dusty rose, sub: "Categorized symbols"
- Title in Bebas Neue 15–16px, subtitle in cream muted 12–13px
- Cards should be substantial — not tiny. Min-height 140px on desktop.

**Centered layout, full width of content area.**

---

### 8. Trust Section

**Background:** Cream (same as page).

**Heading:** "No ads. No subscription. Yours *forever.*" — Satoshi 900, dark brown, centered, 48–56px. "forever." in burnt orange italic.

**Trust items:** Three items in a row, centered:
| Label (Bebas Neue, burnt orange) | Value (Creato Display, dark brown) |
|---|---|
| PRICE | One-time €5.99 |
| CONNECTION | Works offline |
| PRIVACY | Zero data collection |

**Spacing:** Generous — this section breathes. 100–120px padding.

**Mobile:** Items stack vertically, centered.

---

### 9. Closing CTA

**Background:** Cream with subtle dot grid (matching hero).

**Heading:** "Where *every stitch* counts." — Satoshi 900, dark brown, centered, 52–60px. "every stitch" in burnt orange italic.

**CTA button:** "GET THE APP" — burnt orange border, transparent fill, Bebas Neue. On hover: solid burnt orange fill.

Note: Since the app is not yet launched, this button could scroll to the email signup in the hero, or open a modal with the email signup form. It should NOT link to a store page that doesn't exist yet.

**Store badges:** Same as hero — "Coming soon on Google Play" + "Coming soon on Amazon Appstore", muted.

**Mobile:** Everything centered, full width button.

---

### 10. Marquee

**Background:** Burnt orange (#C45100), full viewport width.
**Padding:** 18–22px vertical.

**Content:** Infinite horizontal scroll, Bebas Neue, cream text:
ROW COUNTER · GAUGE CONVERTER · YARN SCANNER · VOICE COMMANDS · PATTERN VIEWER · INSIGHTS · RAVELRY · STITCH TRACKING

- Dots (·) between items at 40% opacity
- Smooth CSS animation, ~25–30s loop
- Text duplicated to fill the loop seamlessly

**Mobile:** Same, slightly smaller text (18px).

---

### 11. Footer

**Background:** Dark brown (#262320).
**Padding:** 60–80px vertical.

**Layout — 3 columns (desktop):**

| Tools | Articles | App |
|-------|----------|-----|
| Cast On Calculator | Gauge & Calculations | Coming soon |
| Yarn Estimator | Yarn | Privacy Policy |
| Needle Size Chart | Needles | |
| Yarn Weight Chart | Techniques | |
| Abbreviations | App & Tools | |

- Column headers: Bebas Neue, burnt orange, uppercase
- Links: Creato Display, cream at 50% opacity, hover → full cream
- Articles column links to category anchors on /articles page

**Below columns:** Centered line: "KnitTools · Finnvek · © 2026" — cream at 35% opacity, 13px

**Mobile:** Columns stack vertically. Each column section with header.

---

## Mobile-First Priorities

### Breakpoint
- Primary breakpoint: 768px
- Content switches from 2-column to single-column at this point

### Mobile-Specific Rules
1. **Phone mockups are never tiny.** Minimum 200px wide on mobile. If a layout requires 3 phones and they'd be too small, reduce to 2 or 1.
2. **Typography scales generously.** H1 never below 44px on mobile. H2 never below 32px. Text must feel bold even on small screens.
3. **Phone appears before text** in hero (visual hook first).
4. **Feature sections:** Text first, then phone area below. No side-by-side on mobile.
5. **Dark inset areas** go full width on mobile with horizontal padding of 16–20px.
6. **Floating cards** (Yarn Scanner section) reposition to above/below the phone rather than around it.
7. **Reference cards:** 2×2 grid on mobile, not 4 in a row.
8. **Trust items:** Stack vertically.
9. **Footer columns:** Stack vertically with clear section headers.
10. **Stripe ribbon:** Narrower (~100px) but still visible. 3D effects may simplify to flat on mobile for performance.
11. **Navbar:** Hamburger menu, full-screen overlay with links.
12. **Touch targets:** All interactive elements minimum 44px tap target.
13. **No horizontal scroll** anywhere except the marquee.

---

## Scroll Animations (Subtle)

- **Sections:** Gentle fade-in + slight upward translate (20px) as they enter viewport. Triggered by Intersection Observer. Duration: 0.6s ease-out. One-time only.
- **Phone mockups:** Slightly delayed entrance compared to their text (0.2s delay). Creates a natural reading flow: text appears → phones follow.
- **Stripe ribbon:** Static, no scroll animation. It's a background element, not a performer.
- **Marquee:** Continuous CSS animation, always running.

---

## Files Changed / Created

This is a landing page rebuild. The page structure changes significantly from v4:
- New font imports (Satoshi, Bebas Neue, Creato Display, Outfit)
- New component structure for feature sections with varied phone layouts
- New SVG stripe ribbon component
- New email signup component (Mailchimp integration)
- Updated navbar (thicker, transparent, Outfit logo)
- Updated footer (3-column layout)
- Removed: FreeToolsMention section, dark section backgrounds, DM Serif Display font
- All existing section texts preserved unless noted above

---

## Pre-Launch vs Post-Launch Changes

### Pre-launch (current):
- Hero phone: text labels floating around phone instead of small screenshots
- "GET THE APP" buttons → scroll to email signup or show "coming soon"
- Store badges show "Coming soon on..."
- No actual store links

### Post-launch:
- Hero phone: animated screenshots emerging from main phone
- "GET THE APP" → links to Google Play and Amazon Appstore
- Store badges become active links with official badge graphics
- Email signup removed or converted to newsletter signup
- Price shown more prominently
