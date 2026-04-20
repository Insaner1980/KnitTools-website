# Calculator Pages — Visual Update + Content

## Scope

Update both calculator pages to match the new landing page design:
- `/tools/cast-on-calculator`
- `/tools/yarn-estimator`

## 1. Visual Update

### Fonts

Replace all fonts on calculator pages to match landing page:
- **DM Serif Display** for page headings (H1, H2)
- **Bebas Neue** for labels, section tags
- **Creato Display** for body text, input labels, buttons

Remove all references to Playfair Display and Source Sans 3 on these pages.

### Color Scheme

| Area | Background | Text |
|------|-----------|------|
| Navbar | Dark (~#2E2A26) | Cream |
| Calculator section | Cream (~#E8E4D0) | Deep gray |
| Content section (How to use, FAQ) | Dark (~#2E2A26) | Cream |
| CTA section | Dark with dot grid | Cream |
| Footer | Dark | Cream |

One color change on the page: cream (calculator) → dark (everything below).

### Calculator Card

- Background: slightly lighter than cream, or white with very subtle shadow/border to separate from cream background
- No neumorphism — clean flat design
- Input fields: subtle 1px border in muted color, no heavy shadows
- Border radius on card: 12px

### Buttons

**CALCULATE button:**
- Burnt orange solid background (#C45100)
- Square corners (border-radius: 0)
- Bebas Neue or Creato Display text, uppercase
- Dark text on orange

**GET THE APP button (in CTA):**
- Outline style: transparent background, 2px burnt orange border, burnt orange text
- Square corners (border-radius: 0)
- On hover: fills with burnt orange, text turns cream

**Unit toggle (cm/inches):**
- Active: burnt orange solid
- Inactive: outline or muted background
- Square corners to match buttons

### Back Link

Replace "← Home" with "← Back to KnitTools" or remove entirely — navbar handles navigation.

### Remove Old CTA Photo

Remove the craft-table-flatlay.webp photo from the calculator page CTA section. Replace with dark background + dot grid pattern (same as landing page closing CTA).

### Dot Grid CSS

```css
.dot-grid-dark {
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='0.6' fill='%23E8E4D0' opacity='0.05'/%3E%3C/svg%3E");
}
```

---

## 2. Page Structure

Both pages follow the same structure:

```
[Navbar — dark]

[Calculator section — cream background]
  H1: page title (DM Serif Display)
  Calculator tool (inputs, button, result)
  Small text: "For a more precise estimate, try KnitTools for Android" with link

[Content section — dark background]
  H2: educational heading
  Body text (2-3 paragraphs)
  
  H2: second heading (if applicable)
  Body text

  H2: FAQ
  Accordion or simple list of Q&A pairs

[CTA section — dark background with dot grid]
  H2: "Get the full toolkit" (DM Serif Display, cream)
  Outline button: "GET THE APP"
  Small text: "Android · Launch price €4.99 · No ads · No tracking"
  (Bebas Neue, wide letter-spacing, no separators between items)

[Footer — dark]
```

---

## 3. Cast On Calculator Content

Place this content in the dark section below the calculator.

### H2: What is cast on in knitting?

Casting on is the first step in any knitting project — it's how you create the initial row of stitches on your needle. The number of stitches you cast on determines the width of your finished piece. Too few and it's too narrow. Too many and you've wasted yarn and time. Getting this number right from the start saves frogging later.

### H2: Why gauge matters

Every knitter knits differently. Even with the same yarn and needles, your tension produces a slightly different fabric than someone else's. That's why patterns list a recommended gauge — and why you need to knit a swatch to find yours. Measure how many stitches fit in 10 cm (or 4 inches), and you have the number this calculator needs.

### H2: How to use this calculator

To calculate your cast on stitches, you need two things: your gauge (how many stitches you get in 10 cm or 4 inches of knitting) and the desired width of your piece. Knit a gauge swatch first, measure it, and enter those numbers. The calculator rounds to the nearest even number, which is a common knitting convention.

### H2: Frequently asked questions

Implement as an accordion (click to expand) or simple list with bold questions and body-text answers.

**Do I really need to knit a gauge swatch?**

Yes. Skipping the swatch is the most common reason knitted pieces come out the wrong size. It takes 20 minutes and saves hours of rework.

**Should I count edge stitches in my gauge?**

No. Measure from the center of your swatch, avoiding the first and last two stitches — edge stitches are often tighter or looser than the rest.

**Why does the calculator round to an even number?**

Many stitch patterns (ribbing, cables, colorwork) require an even number of stitches to work correctly. Rounding to the nearest even number gives you a clean repeat.

**What if my pattern requires a specific stitch multiple?**

Add or subtract a few stitches to reach the nearest multiple your pattern needs. For example, if your pattern repeats over 4 stitches and the calculator says 46, adjust to 44 or 48.

**Can I use this for circular knitting?**

Yes. Enter the full circumference as your desired width. The calculator works the same way for flat and circular knitting.

---

## 4. Yarn Estimator Content

Place this content in the dark section below the calculator.

### H2: How to use this calculator

Enter the total amount of yarn your project needs in meters (or yards), the length per skein from your yarn label, and the weight per skein. The calculator tells you how many skeins to buy and the total weight of yarn you'll need. Always buy one extra skein — running out mid-project with a discontinued dye lot is every knitter's nightmare.

### H2: How much yarn do I need?

Yarn requirements depend on three things: what you're knitting, what size, and what yarn weight. A fingering-weight adult sweater uses roughly 1200–1500 meters. A bulky hat might need 100 meters. Pattern instructions always list the total yardage — that's the number you enter here.

### H2: Reading a yarn label

Every yarn label (or ball band) tells you the weight per skein and the length per skein. These are the two numbers this calculator needs. If you've lost the label, weigh your yarn on a kitchen scale and check the manufacturer's website for the meters-per-gram ratio.

### H2: Frequently asked questions

**How do I know how much yarn my project needs?**

Your pattern lists total yardage or meterage in the materials section. If you're designing without a pattern, search for average yarn requirements by project type and size — there are well-established ranges for most garments.

**Should I buy extra yarn?**

Always. Buy at least one extra skein, especially if your yarn has a dye lot number. Dye lots vary slightly in color, and matching later may be impossible if the lot is sold out.

**What if my yarn label is in grams but the pattern lists yards?**

Convert using your yarn's meters-per-gram ratio. Divide the label's length by its weight to get meters per gram, then multiply by the total grams you have. Or use KnitTools — it handles the math for you.

**Does yarn weight category affect how much I need?**

Yes. Thinner yarn (fingering, sport) requires more meters for the same project than thicker yarn (worsted, bulky) because the stitches are smaller and you need more of them to cover the same area.

**Can I substitute a different yarn than the pattern recommends?**

Yes, if the gauge matches. Knit a swatch with your substitute yarn, check that you get the same stitch count per 10 cm, and use this calculator to figure out how many skeins of the new yarn you need.

---

## 5. SEO Elements

### Cast On Calculator

- **Title tag:** "Cast On Calculator — Free Knitting Stitch Calculator | KnitTools"
- **Meta description:** "Calculate how many stitches to cast on for any width. Enter your gauge and desired width — free, instant, no signup required."
- **H1:** "Cast On Calculator"
- **Schema:** WebApplication (calculator) + FAQPage (FAQ section)

### Yarn Estimator

- **Title tag:** "Yarn Estimator — How Much Yarn Do I Need? | KnitTools"
- **Meta description:** "Calculate how many skeins of yarn you need for your knitting project. Enter yardage and skein info — free, instant, no signup."
- **H1:** "Yarn Estimator"
- **Schema:** WebApplication (calculator) + FAQPage (FAQ section)

---

## 6. CTA Section (shared by both pages)

Both pages use the same closing CTA:

```
[Dark background + dot grid pattern]

[DM Serif Display, cream, large, centered]
Get the full toolkit

[Outline button — burnt orange border, transparent bg, square corners]
GET THE APP

[Bebas Neue, cream muted, wide letter-spacing, centered]
ANDROID     LAUNCH PRICE €4.99     NO ADS     NO TRACKING
```

No background photo. No "Coming soon on Android" — use the Bebas Neue info line instead.
