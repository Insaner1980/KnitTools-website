# Yarn Estimator — source-backed references (B02-09, 2026-10-19)

## Decision and scope

The live tool now looks up **133 named pattern/size cases from 19 designs**, in 28 project categories. It does not fit or extrapolate a consumption model. It converts original source quantities into meters or yards, rounding only the final display. Unsupported categories and invalid/mismatched cases return no number. No yarn-category multipliers, personalized size scaling, consumption accuracy guarantee or empirical-calibration claim remains.

Sources were read on 2026-10-19. Translations of a pattern are not independent observations. The four original and fifteen additional pattern sources below supply specifications, not a compatible measured-consumption training/validation dataset. Their different fabrics, fibers, constructions and quantities cannot justify nine universal yarn-class factors. No calibration parameters or holdout consumption errors are reported because no predictive model is being fitted. Verification is source transcription, dimensional context, arithmetic, conversion and interface behavior, not predictive validation.

## Provenance of the removed model

`git log -- yarn-estimator-data.md` traces the old planning document to initial commit `919cf68`. It asserts that the estimates are established across multiple sources but names none. It specifies worsted-baseline meters for 30 projects / 121 size cells and eight category multipliers. The shared component history introduces the matching baseline cells, Fingering = 1.35 and Jumbo = 0.45 in commit `23760fb` (located with `git log -S`). The current pre-replacement component matched those cells and added Jumbo = 0.45 as a ninth multiplier relative to the planning document. That historical component contains no measurement-source references. Neither document nor inspected component/history supplied original pattern identities, measured samples, gauge assumptions beyond generic stockinette, widths for scarves, full garment dimensions, quantity-type definitions, or independent validation. A label such as M did not define a physical garment. No evidence found turns these numbers into measured consumption.

Old arithmetic tests checked a hard-coded data fingerprint and products of these factors. They established implementation consistency, not predictive accuracy. Existing stale clearing, select-label overflow handling and exact international-yard conversion are retained and tested against the replacement behavior.

## Original source records

### N — PetiteKnit: Novice Sweater

Original designer page: <https://www.petiteknit.com/en/products/novice-sweater>, size guide, gauge and suggested yarn, **suggestion 3 only**.

Construction: seamless top down, round yoke, stockinette body/sleeves, ribbed neck/hem/cuffs. Gauge: 16 stitches × 21 rows per 10 × 10 cm in stockinette, 6 mm needles. Dimensions below are finished bust circumference and mid-back length excluding neckband. Yarn: Sandnes Garn Kos, nominal 150 m / 50 g. Single yarn; other held-together suggestions are not mixed into this reference.

| Size | Bust cm | Back cm | Recommended Kos g | Whole 50 g balls implied | Nominal supply m |
| --- | --- | --- | --- | --- | --- |
| XS | 91 | 54 | 250 | 5 | 750 |
| S | 98 | 55 | 300 | 6 | 900 |
| M | 103 | 57 | 350 | 7 | 1050 |
| L | 109 | 60 | 350 | 7 | 1050 |
| XL | 116 | 62 | 400 | 8 | 1200 |
| 2XL | 128 | 64 | 400 | 8 | 1200 |
| 3XL | 138 | 65 | 450 | 9 | 1350 |
| 4XL | 149 | 66 | 500 | 10 | 1500 |
| 5XL | 161 | 68 | 550 | 11 | 1650 |

Classification: **recommended supply / whole-ball nominal length**, not measured consumption. Calculation: g × 150 / 50. No estimate for another yarn, construction, dimension or size outside these nine source columns.

### C — Purl Soho / Hiromi Glover: Garter Ridge Cowl

Original manufacturer/designer pattern: <https://www.purlsoho.com/create/2023/09/27/garter-ridge-cowl/>, Materials, Gauge, Sizes, Pattern.

Construction: two-color garter ridges and stockinette in the round, 4.5 mm needles. Gauge: 18 stitches × 37 rounds per **4 inches (10.16 cm)** in pattern. Yarn: Knitting Yarn DK, 100% merino, approximately 219 yd / 100 g ball. The source describes it as light worsted/DK; this is not a universal DK factor.

| Size | Circumference × height in | Exact converted cm | A / B required yd | Total required yd | Converted m | Whole-ball purchasing |
| --- | --- | --- | --- | --- | --- | --- |
| Once-Around | 22.25 × 10.25 | 56.515 × 26.035 | 120 / 110 | 230 | 210.312 | 1 A + 1 B = 438 yd |
| Twice-Around | 58 × 10.25 | 147.32 × 26.035 | 315 / 290 | 605 | 553.212 | 2 A + 2 B = 876 yd |

Classification used by tool: **pattern's approximate required lengths**, not observed consumption. Purchasing totals are deliberately not substituted for required totals. Original approximate dimensions remain approximate despite exact unit conversion.

### M — Purl Soho / Hiromi Glover: Meadow Breeze Scarf + Shawl

Original manufacturer/designer pattern: <https://www.purlsoho.com/create/2024/06/22/meadow-breeze-scarf-shawl/>, Materials, Gauge, Sizes, written pattern.

Construction: flat textured fabric with increases/decreases, slipped edges, 3 mm needles. Gauge: 30 stitches × 39 rows per **4 inches (10.16 cm)** in pattern. Yarn: Oleander, 50% cotton / 50% linen, fingering, 205 yd / 50 g.

| Size | Width × length in | Exact converted cm | Required yd | Converted m | Whole-ball purchasing |
| --- | --- | --- | --- | --- | --- |
| Scarf | 5.5 × 59.25 | 13.97 × 150.495 | 385 | 352.044 | 2 balls = 410 yd |
| Shawl | 27 × 27.25 | 68.58 × 69.215 | 910 | 832.104 | 5 balls = 1025 yd |

Classification: **pattern's approximate required lengths**, not measured consumption. The page also says the shawl sample used four full balls plus a few yards; that anecdote is not identical to the recommended 910 yd. The tool intentionally reproduces the materials requirement, not an invented precise sample measurement or an average of these statements.

### B — Purl Soho / Hiromi Glover: Piece Of Cake Blanket

Original manufacturer/designer pattern: <https://www.purlsoho.com/create/2023/03/26/piece-of-cake-blanket/>, Materials, Gauge, Sizes and block construction.

Construction: flat garter-stitch blocks connected by picking up stitches, 8 mm needles. Gauge: 9 stitches × 18 rows per **4 inches (10.16 cm)** in garter stitch. Yarn: Fiddlehead, 100% alpaca, super bulky, approximately 65 yd / 100 g skein.

| Size / tool category | Width × length in | Exact converted cm | A/B/C/D/E/F/G required yd | Total yd | Converted m | Purchasing |
| --- | --- | --- | --- | --- | --- | --- |
| Crib / baby blanket | 30 × 44 | 76.2 × 111.76 | 120/60/40/80/60/100/80 | 540 | 493.776 | 2/1/1/2/1/2/2 skeins = 715 yd |
| Throw / throw blanket | 40 × 58 | 101.6 × 147.32 | 250/100/65/130/100/165/130 | 940 | 859.536 | 4/2/1/2/2/3/2 skeins = 1040 yd |

Classification: **sum of pattern's approximate required color lengths**, not measured consumption or a generic blanket estimate. Source warns some colors are nearly exhausted and advises matching gauge, short tails and other colors for swatching. The tool links the original and tells users to follow its per-color/swatch instructions; it does not add a blanket percentage. Source notes the bundle and some colors are unavailable; these are reference cases, not availability recommendations.

## Independent arithmetic and coverage checks

- Nine N rows checked directly against original size columns: 250/300/350/350/400/400/450/500/550 g, independently calculated nominal lengths above.
- C totals: 120 + 110 = 230; 315 + 290 = 605 yd.
- B totals: 120 + 60 + 40 + 80 + 60 + 100 + 80 = 540; 250 + 100 + 65 + 130 + 100 + 165 + 130 = 940 yd.
- M quantities taken directly from the original materials paragraph, not its sample anecdote or purchase count.
- Exact international conversions ([NIST SI Units – Length](https://www.nist.gov/pml/owm/si-units-length)): 1 yd = 0.9144 m and 1 in = 2.54 cm. 1500 m rounds to 1640 yd; round-trip selection always restarts from the source quantity, never the rounded display.
- The first replacement contained 15 cases in six project categories. Those cases remain unchanged; the expansion below now covers 28 categories. The former 121 × 9 output combinations are removed, not reclassified as validated.
- Test fixtures were transcribed from the above sources separately from production arrays. Zero source-value discrepancies after checks is a transcription result, not a percentage accuracy claim about knitting.

## Coverage expansion — 2026-10-19

**Current total: 133 cases, 19 named designs, 28 of the 30 existing project categories.** All 15 earlier cases and their numerical values remain. The addition is 118 source rows; these are not 118 independent experiments. Two distinct adult designs for each of sweaters, cardigans and vests cover every requested 2XL/XXL, 3XL, 4XL and 5XL. No missing adult garment/size combination remains in that requested range. Smaller original sizes are retained, including XXS in Eva and XS in all six adult designs.

The interface is project → named pattern → original size with dimensions → unit. A size label is not a universal physical size. Original XXL labels remain XXL; the coverage note explains the 2XL/XXL naming correspondence, without asserting equivalent measurements.

### Adult coverage matrix

| Garment | Original pattern | Implemented source size range | 2XL or original XXL chest cm | 3XL chest cm | 4XL chest cm | 5XL chest cm | Length convention |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sweater | [PetiteKnit — Novice Sweater](https://www.petiteknit.com/en/products/novice-sweater) | XS–5XL | 128 | 138 | 149 | 161 | Mid-back excluding neckband |
| Sweater | [Tin Can Knits — Flax (Worsted / Aran)](https://tincanknits.com/pattern/flax-worsted) | 0–6 mo–8–10 yrs; adult XS, S, SM, M, ML, L, XL, XXL–6XL | 127 | 140.97 | 153.67 | 165.1 | Underarm to hem, c2; long b3 sleeves |
| Cardigan | [Tin Can Knits — Harvest](https://tincanknits.com/pattern/harvest) | 0–6 mo–8–10 yrs; adult XS, S, SM, M, ML, L, XL, XXL–6XL | 125.73 | 139.7 | 152.4 | 165.1 | Underarm to hem |
| Cardigan | [PetiteKnit — Eva Cardigan](https://www.petiteknit.com/en/products/eva-cardigan) | XXS–5XL | 134 | 140 | 150 | 156 | Mid-back excluding neckband |
| Vest | [PetiteKnit — Weekend Slipover](https://www.petiteknit.com/en/products/weekend-slipover) | XS–5XL | 141 | 151 | 160 | 171 | Mid-back excluding neckband |
| Vest | [Tin Can Knits — Bracken](https://tincanknits.com/pattern/bracken) | Adult XS–6XL | 115.57 | 125.73 | 135.89 | 146.05 | Back neck to hem |

### Additional original source records

All sources below accessed/reviewed **2026-10-19 (Europe/Helsinki)**. Source inch dimensions are recorded alongside exact converted centimeters; the interface marks converted measurements approximate, because conversion does not increase source precision. Gauge span 4 in is 10.16 cm, not 10 cm. Quantity ranges are retained through conversion.

#### Tin Can Knits — Flax (Worsted / Aran)

Original: <https://tincanknits.com/pattern/flax-worsted>. Access date: 2026-10-19.

Current original FLAX-tincanknits-WORSTED.pdf, sizing table on PDF page 3. Only regular body c2 with long sleeves b3. Do not substitute the older 2013 tutorial yardages. Single strand; worsted/aran sample yarns are Gilliatt and SweetGeorgia Superwash Worsted. Source size labels retain SM, ML and XXL. Choose finished chest with desired ease, not a universal body-size chart.

Construction: Seamless top-down raglan, stockinette with garter sleeve panels; 5 mm gauge needles. Regular body length (c2), long sleeves (b3) only.

Gauge: 18 stitches × 24 rounds / 10.16 cm. Yarn specification: Worsted / Aran — De Rerum Natura Gilliatt; SweetGeorgia Superwash Worsted. Quantity basis: **Pattern-stated yarn requirement**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| 0-6 mo | baby-sweater | 18 × 6 | 45.72 × 15.24 | — | 240 yd | 240 yd |
| 6-12 mo | baby-sweater | 20.5 × 6.5 | 52.07 × 16.51 | — | 280 yd | 280 yd |
| 1-2 yrs | child-sweater | 22 × 7 | 55.88 × 17.78 | — | 340 yd | 340 yd |
| 2-4 yrs | child-sweater | 24 × 8 | 60.96 × 20.32 | — | 420 yd | 420 yd |
| 4-6 yrs | child-sweater | 26 × 10 | 66.04 × 25.4 | — | 540 yd | 540 yd |
| 6-8 yrs | child-sweater | 28.5 × 13 | 72.39 × 33.02 | — | 660 yd | 660 yd |
| 8-10 yrs | child-sweater | 30 × 15 | 76.2 × 38.1 | — | 800 yd | 800 yd |
| XS | sweater | 32 × 15 | 81.28 × 38.1 | — | 920 yd | 920 yd |
| S | sweater | 34 × 15 | 86.36 × 38.1 | — | 980 yd | 980 yd |
| SM | sweater | 36.5 × 16 | 92.71 × 40.64 | — | 1080 yd | 1080 yd |
| M | sweater | 38 × 16 | 96.52 × 40.64 | — | 1160 yd | 1160 yd |
| ML | sweater | 40 × 17 | 101.6 × 43.18 | — | 1260 yd | 1260 yd |
| L | sweater | 42 × 18 | 106.68 × 45.72 | — | 1380 yd | 1380 yd |
| XL | sweater | 46 × 18.5 | 116.84 × 46.99 | — | 1520 yd | 1520 yd |
| XXL | sweater | 50 × 19 | 127 × 48.26 | — | 1700 yd | 1700 yd |
| 3XL | sweater | 55.5 × 20 | 140.97 × 50.8 | — | 1880 yd | 1880 yd |
| 4XL | sweater | 60.5 × 20 | 153.67 × 50.8 | — | 2080 yd | 2080 yd |
| 5XL | sweater | 65 × 20 | 165.1 × 50.8 | — | 2200 yd | 2200 yd |
| 6XL | sweater | 70 × 20 | 177.8 × 50.8 | — | 2340 yd | 2340 yd |

#### Tin Can Knits — Harvest

Original: <https://tincanknits.com/pattern/harvest>. Access date: 2026-10-19.

Original HARVEST-tincanknits.pdf, specifications and sizing pp. 2–3. Single worsted/aran strand; Madelinetosh Vintage sample. Slight positive or negative ease is allowed by the designer; no fixed body interval is supplied.

Construction: Seamless top-down raglan, flat stockinette body, garter collar/fronts, sleeves in the round; 5 mm gauge needles.

Gauge: 18 stitches × 24 rows / 10.16 cm. Yarn specification: Worsted / Aran — Madelinetosh Vintage. Quantity basis: **Pattern-stated yarn requirement**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| 0-6 mo | baby-cardigan | 18.5 × 6 | 46.99 × 15.24 | — | 250 yd | 250 yd |
| 6-12 mo | baby-cardigan | 20.5 × 7 | 52.07 × 17.78 | — | 350 yd | 350 yd |
| 1-2 yrs | child-cardigan | 22 × 8 | 55.88 × 20.32 | — | 450 yd | 450 yd |
| 2-4 yrs | child-cardigan | 24 × 9 | 60.96 × 22.86 | — | 500 yd | 500 yd |
| 4-6 yrs | child-cardigan | 25.5 × 11 | 64.77 × 27.94 | — | 600 yd | 600 yd |
| 6-8 yrs | child-cardigan | 28.5 × 14 | 72.39 × 35.56 | — | 700 yd | 700 yd |
| 8-10 yrs | child-cardigan | 30.5 × 16 | 77.47 × 40.64 | — | 850 yd | 850 yd |
| XS | cardigan | 31.5 × 18 | 80.01 × 45.72 | — | 1000 yd | 1000 yd |
| S | cardigan | 33.5 × 19 | 85.09 × 48.26 | — | 1100 yd | 1100 yd |
| SM | cardigan | 37 × 19 | 93.98 × 48.26 | — | 1200 yd | 1200 yd |
| M | cardigan | 38 × 20 | 96.52 × 50.8 | — | 1300 yd | 1300 yd |
| ML | cardigan | 40 × 20 | 101.6 × 50.8 | — | 1400 yd | 1400 yd |
| L | cardigan | 42 × 21 | 106.68 × 53.34 | — | 1500 yd | 1500 yd |
| XL | cardigan | 46.5 × 21 | 118.11 × 53.34 | — | 1600 yd | 1600 yd |
| XXL | cardigan | 49.5 × 21 | 125.73 × 53.34 | — | 1700 yd | 1700 yd |
| 3XL | cardigan | 55 × 21 | 139.7 × 53.34 | — | 1800 yd | 1800 yd |
| 4XL | cardigan | 60 × 21 | 152.4 × 53.34 | — | 1900 yd | 1900 yd |
| 5XL | cardigan | 65 × 21 | 165.1 × 53.34 | — | 2100 yd | 2100 yd |
| 6XL | cardigan | 70.5 × 21 | 179.07 × 53.34 | — | 2300 yd | 2300 yd |

#### PetiteKnit — Eva Cardigan

Original: <https://www.petiteknit.com/en/products/eva-cardigan>. Access date: 2026-10-19.

Original product page, Peer Gynt alternative only: 100% Norwegian wool, 91 m / 50 g. Source grams by original size: 550–600, 600, 600, 650, 650, 700, 750, 800, 850, 900. Divide grams by 50 and multiply by 91. XXS remains 1001–1092 m; do not replace the range with a midpoint. Body bust intervals are recorded below. Ease about 26 cm in smaller sizes, diminishing for larger sizes. Length excludes the neckband.

Construction: Top down, V-neck, flat stockinette body, sleeves in the round, 2×2 rib front bands; 4 mm gauge needles.

Gauge: 20 stitches × 30 rows / 10 cm. Yarn specification: Sandnes Garn Peer Gynt — 91 m / 50 g. Quantity basis: **Recommended yarn supply (nominal length)**.

| Original size | Project | Original dimensions cm | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| XXS | cardigan | 106 × 53 | 106 × 53 | 75–80 | 550–600 g | 1001–1092 m |
| XS | cardigan | 112 × 55 | 112 × 55 | 80–85 | 600 g | 1092 m |
| S | cardigan | 116 × 59 | 116 × 59 | 85–90 | 600 g | 1092 m |
| M | cardigan | 120 × 61 | 120 × 61 | 90–95 | 650 g | 1183 m |
| L | cardigan | 126 × 63 | 126 × 63 | 95–100 | 650 g | 1183 m |
| XL | cardigan | 132 × 64 | 132 × 64 | 100–110 | 700 g | 1274 m |
| 2XL | cardigan | 134 × 67 | 134 × 67 | 110–120 | 750 g | 1365 m |
| 3XL | cardigan | 140 × 68 | 140 × 68 | 120–130 | 800 g | 1456 m |
| 4XL | cardigan | 150 × 71 | 150 × 71 | 130–140 | 850 g | 1547 m |
| 5XL | cardigan | 156 × 72 | 156 × 72 | 140–150 | 900 g | 1638 m |

#### PetiteKnit — Weekend Slipover

Original: <https://www.petiteknit.com/en/products/weekend-slipover>. Access date: 2026-10-19.

Original product page, Håndværksgarn (200 m / 100 g) with Isager Silk Mohair (source specifically says 212 m / 25 g). One strand of each held together. Håndværksgarn grams: 400/400/400/400/400/400/500/500/500. Mohair grams: 75/75/75/75/100/100/125/125/125. The headline sums two separate nominal whole-ball supplies; neither their sum nor the smaller supply is a single-strand fabric length or measured consumption. Do not silently substitute 210 m from a different current yarn label. Positive ease about 20–25 cm. Length excludes the neckband.

Construction: Top down, short-row shoulders, stockinette body in the round, rib edges; 5.5 mm gauge needles. Håndværksgarn + Isager Silk Mohair held together.

Gauge: 15 stitches × 20 rows / 10 cm. Yarn specification: Hjelholt Håndværksgarn — 200 m / 100 g; Isager Silk Mohair — 212 m / 25 g. Quantity basis: **Combined nominal supply of both yarns**.

| Original size | Project | Original dimensions cm | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| XS | vest | 107 × 58 | 107 × 58 | 80–85 | Håndværksgarn: 400 g = 800 m; Silk Mohair: 75 g = 636 m | 1436 m |
| S | vest | 112 × 59 | 112 × 59 | 85–90 | Håndværksgarn: 400 g = 800 m; Silk Mohair: 75 g = 636 m | 1436 m |
| M | vest | 117 × 60 | 117 × 60 | 90–95 | Håndværksgarn: 400 g = 800 m; Silk Mohair: 75 g = 636 m | 1436 m |
| L | vest | 123 × 61 | 123 × 61 | 95–100 | Håndværksgarn: 400 g = 800 m; Silk Mohair: 75 g = 636 m | 1436 m |
| XL | vest | 131 × 62 | 131 × 62 | 100–110 | Håndværksgarn: 400 g = 800 m; Silk Mohair: 100 g = 848 m | 1648 m |
| 2XL | vest | 141 × 63 | 141 × 63 | 110–120 | Håndværksgarn: 400 g = 800 m; Silk Mohair: 100 g = 848 m | 1648 m |
| 3XL | vest | 151 × 64 | 151 × 64 | 120–130 | Håndværksgarn: 500 g = 1000 m; Silk Mohair: 125 g = 1060 m | 2060 m |
| 4XL | vest | 160 × 65 | 160 × 65 | 130–140 | Håndværksgarn: 500 g = 1000 m; Silk Mohair: 125 g = 1060 m | 2060 m |
| 5XL | vest | 171 × 66 | 171 × 66 | 140–150 | Håndværksgarn: 500 g = 1000 m; Silk Mohair: 125 g = 1060 m | 2060 m |

#### Tin Can Knits — Bracken

Original: <https://tincanknits.com/pattern/bracken>. Access date: 2026-10-19.

Original Tin Can Knits interactive sizing viewer, all ten adult columns read separately. Designer-authored listing https://www.ravelry.com/patterns/library/bracken-14 corroborates the specifications. Gauge shown is honeycomb cable, 30 stitches × 28 rounds / 4 in; moss stitch is 20 × 28 / 4 in. Gilliatt worsted sample, single strand. Close-fitting cropped adult vest with negative ease. The source also offers baby/child sizes; those are not assigned to the adult vest category (there is no child-vest selector). Adult XS–6XL is complete; no XXL-to-2XL data relabeling.

Construction: Bottom up, cables and moss stitch; 4.5 mm gauge needles. Gauge shown is honeycomb cable; moss stitch is 20 stitches × 28 rounds / 10.16 cm.

Gauge: 30 stitches × 28 rounds / 10.16 cm. Yarn specification: Worsted — De Rerum Natura Gilliatt. Quantity basis: **Pattern-stated yarn requirement**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| XS | vest | 27 × 17 | 68.58 × 43.18 | — | 450 yd | 450 yd |
| S | vest | 30.5 × 17 | 77.47 × 43.18 | — | 500 yd | 500 yd |
| M | vest | 33.5 × 19 | 85.09 × 48.26 | — | 650 yd | 650 yd |
| L | vest | 37.5 × 20.5 | 95.25 × 52.07 | — | 750 yd | 750 yd |
| XL | vest | 40.5 × 21.5 | 102.87 × 54.61 | — | 900 yd | 900 yd |
| XXL | vest | 45.5 × 22 | 115.57 × 55.88 | — | 1050 yd | 1050 yd |
| 3XL | vest | 49.5 × 23.5 | 125.73 × 59.69 | — | 1150 yd | 1150 yd |
| 4XL | vest | 53.5 × 24.5 | 135.89 × 62.23 | — | 1200 yd | 1200 yd |
| 5XL | vest | 57.5 × 26 | 146.05 × 66.04 | — | 1400 yd | 1400 yd |
| 6XL | vest | 61.5 × 27 | 156.21 × 68.58 | — | 1500 yd | 1500 yd |

#### Tin Can Knits — Barley (Worsted / Aran)

Original: <https://tincanknits.com/pattern/barley-worsted>. Access date: 2026-10-19.

Original BARLEY-tincanknits.pdf specification page 2, worsted/aran column only. Intended head circumference, NOT finished hat circumference. Designer-authored https://www.ravelry.com/patterns/library/barley-worsted prose confirms 18 stitches × 24 rounds per 4 in (PDF omits the gauge span); do not treat a rounded 10 cm listing field as an exact conversion. Single strand; Brooklyn Tweed Shelter sample.

Construction: Brim to crown in the round, stockinette and garter panel; 5 mm gauge needles. Worsted/aran version only.

Gauge: 18 stitches × 24 rounds / 10.16 cm. Yarn specification: Worsted / Aran — Brooklyn Tweed Shelter. Quantity basis: **Pattern-stated yarn requirement**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| Newborn | baby-hat | 14 | 35.56 | — | 60 yd | 60 yd |
| Baby | baby-hat | 16 | 40.64 | — | 70 yd | 70 yd |
| Toddler | child-hat | 17.5 | 44.45 | — | 80 yd | 80 yd |
| Child | child-hat | 19 | 48.26 | — | 90 yd | 90 yd |
| Adult S | adult-hat | 21 | 53.34 | — | 110 yd | 110 yd |
| M | adult-hat | 22.5 | 57.15 | — | 150 yd | 150 yd |
| L | adult-hat | 23.5 | 59.69 | — | 170 yd | 170 yd |

#### Tin Can Knits — Maize

Original: <https://tincanknits.com/pattern/maize>. Access date: 2026-10-19.

Original MAIZE-tincanknits.pdf specification page 2. First dimension is intended hand circumference; second is finished cuff-to-tip length. Both mitten and fingerless variants retained for all five source sizes. Pair quantities. Designer-authored https://www.ravelry.com/patterns/library/maize-3 prose confirms 20 stitches × 28 rounds per 4 in in reverse stockinette. Single strand; SweetGeorgia Superwash Worsted sample.

Construction: Pair, cuff to fingers in the round, thumb gusset, reverse stockinette and ribs; 4 mm needles. Choose mittens or fingerless mitts via project type.

Gauge: 20 stitches × 28 rounds / 10.16 cm. Yarn specification: Worsted / Aran — SweetGeorgia Superwash Worsted. Quantity basis: **Pattern-stated yarn requirement**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| Toddler | child-mittens | 6 × 7 | 15.24 × 17.78 | — | 70 yd | 70 yd |
| Child | child-mittens | 6.5 × 7.5 | 16.51 × 19.05 | — | 80 yd | 80 yd |
| Adult S | adult-mittens | 7 × 9.25 | 17.78 × 23.495 | — | 120 yd | 120 yd |
| M | adult-mittens | 7.75 × 9.75 | 19.685 × 24.765 | — | 150 yd | 150 yd |
| L | adult-mittens | 8.5 × 11.25 | 21.59 × 28.575 | — | 200 yd | 200 yd |
| Toddler | fingerless-mitts | 6 × 4.5 | 15.24 × 11.43 | — | 50 yd | 50 yd |
| Child | fingerless-mitts | 6.5 × 4.5 | 16.51 × 11.43 | — | 60 yd | 60 yd |
| Adult S | fingerless-mitts | 7 × 5.75 | 17.78 × 14.605 | — | 80 yd | 80 yd |
| M | fingerless-mitts | 7.75 × 6.5 | 19.685 × 16.51 | — | 100 yd | 100 yd |
| L | fingerless-mitts | 8.5 × 7.75 | 21.59 × 19.685 | — | 140 yd | 140 yd |

#### Tin Can Knits — Rye (Worsted / Aran)

Original: <https://tincanknits.com/pattern/rye-worsted>. Access date: 2026-10-19.

Original RYE-WORSTED-tincanknits.pdf specification page 2. Finished cuff/foot circumference and heel-to-toe length; no universal foot-size labels. Original leg lengths in the same size order: 2, 2.5, 4.5, 5.5, 6.5, 7.5, 8 inches. Pair quantities for the stated lengths. Single worsted/aran strand, Plucky Sweater sample. Newborn/Baby appear in child socks because the existing selector has no separate baby-socks category.

Construction: Pair, cuff down with heel flap, gusset and grafted toe; 3.75 mm gauge needles. Source leg lengths apply; no adjustment for longer socks.

Gauge: 22 stitches × 30 rounds / 10.16 cm. Yarn specification: Worsted / Aran — Plucky Sweater. Quantity basis: **Pattern-stated yarn requirement**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| Newborn | child-socks | 4.25 × 3.25 | 10.795 × 8.255 | — | 70 yd | 70 yd |
| Baby | child-socks | 5 × 4 | 12.7 × 10.16 | — | 90 yd | 90 yd |
| Toddler | child-socks | 5.75 × 5.25 | 14.605 × 13.335 | — | 120 yd | 120 yd |
| Child | child-socks | 6.5 × 7.25 | 16.51 × 18.415 | — | 180 yd | 180 yd |
| Adult S | adult-socks | 7.25 × 8.25 | 18.415 × 20.955 | — | 220 yd | 220 yd |
| M | adult-socks | 8 × 9.75 | 20.32 × 24.765 | — | 280 yd | 280 yd |
| L | adult-socks | 8.75 × 11.5 | 22.225 × 29.21 | — | 340 yd | 340 yd |

#### Purl Soho / Keith Foster — Knit + Purl Washcloth

Original: <https://www.purlsoho.com/create/2024/07/22/knit-purl-washcloth/>. Access date: 2026-10-19.

Original Materials/Gauge/Sizes: one cloth. Cotton Chirp DK Minis, 100% Pima cotton, 58 yd / 25 g. Approximately MC 40 + CC 15 = 55 yd. Two purchased minis contain 116 yd; that is not the required 55 yd. Colors worked separately, not held together.

Construction: One washcloth, flat seed stitch, rib border and I-cord loop; 4 mm needles. MC + CC are separate colors.

Gauge: 20 stitches × 35 rows / 10.16 cm. Yarn specification: Purl Soho Cotton Chirp DK Minis — 58 yd / 25 g. Quantity basis: **Pattern’s approximate required length**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| 6½ × 6½ in | dishcloth | 6.5 × 6.5 | 16.51 × 16.51 | — | MC: 40 yd; CC: 15 yd | 55 yd |

#### Purl Soho / Hiromi Glover — Knit + Fold Slippers

Original: <https://www.purlsoho.com/create/2025/02/01/knit-fold-slippers/>. Access date: 2026-10-19.

Original Materials/Gauge/Sizes. Knitting Yarn DK, 100% merino, 219 yd / 100 g. Pair including pom poms. Required A/B lengths by size: 25/60, 40/75, 55/85, 70/105, 90/120, 115/145, 140/165, 170/195, 200/219 yd. All sizes purchase one ball of each color (438 yd), not the displayed sum of approximate requirements. Intended foot length intervals in inches: 4–4.5, 4.5–5.5, 5.5–6.5, 6.5–7.5, 7.5–8.5, 8.5–9.5, 9.5–10.5, 10.5–11.25, 11.25–12.25. Source specifies 0–1 in negative ease. Dimensions below are finished foot width × length, not circumference.

Construction: Pair, striped garter stitch worked flat, folded and seamed; 3.25 mm needles. A and B are separate colors; dimensions are foot width × length.

Gauge: 24 stitches × 48 rows / 10.16 cm. Yarn specification: Purl Soho Knitting Yarn DK — 219 yd / 100 g. Quantity basis: **Pattern’s approximate required length**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| Baby | baby-booties | 2 × 3.75 | 5.08 × 9.525 | — | A: 25 yd; B: 60 yd | 85 yd |
| Toddler Small | slippers | 2.25 × 4.75 | 5.715 × 12.065 | — | A: 40 yd; B: 75 yd | 115 yd |
| Toddler Large | slippers | 2.75 × 5.75 | 6.985 × 14.605 | — | A: 55 yd; B: 85 yd | 140 yd |
| Little Kid | slippers | 3.25 × 6.5 | 8.255 × 16.51 | — | A: 70 yd; B: 105 yd | 175 yd |
| Big Kid | slippers | 3.75 × 7.5 | 9.525 × 19.05 | — | A: 90 yd; B: 120 yd | 210 yd |
| Adult Small | slippers | 4.25 × 8.5 | 10.795 × 21.59 | — | A: 115 yd; B: 145 yd | 260 yd |
| Adult Medium | slippers | 4.75 × 9.5 | 12.065 × 24.13 | — | A: 140 yd; B: 165 yd | 305 yd |
| Adult Large | slippers | 5.25 × 10.25 | 13.335 × 26.035 | — | A: 170 yd; B: 195 yd | 365 yd |
| Adult Extra Large | slippers | 5.75 × 11.25 | 14.605 × 28.575 | — | A: 200 yd; B: 219 yd | 419 yd |

#### Purl Soho — Very Classic Gloves

Original: <https://www.purlsoho.com/create/2023/09/25/very-classic-gloves/>. Access date: 2026-10-19.

Original indexed manufacturer Materials/Gauge/Sizes were read; direct page opening returned HTTP 403 in this session. Cygnet is fingering, 70% cashmere / 30% baby alpaca, 164 yd / 50 g, single strand. Four original sizes: Kid/Junior, Adult Small, Adult Medium, Adult Large. Full pair requirements 210/270/310/380 yd; fingerless 160/215/250/305 yd. Full Kid/Junior is not assigned to Adult Gloves; all four fingerless sizes are included. Full-pair purchased skeins 2/2/2/3; fingerless 1/2/2/2. First dimension is FINISHED palm circumference (unlike Maize intended hand circumference). Second dimension ends at the middle finger, using the source full/fingerless version. No fixed body interval; fingers may be adjusted, but the displayed quantity applies to source lengths.

Construction: Pair, cuff up, stockinette with thumb gusset and individual fingers; 3 mm needles. Choose full or fingerless gloves via project type. Source finger lengths apply.

Gauge: 34 stitches × 40 rounds / 10.16 cm. Yarn specification: Purl Soho Cygnet — 164 yd / 50 g. Quantity basis: **Pattern’s approximate required length**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| Adult Small | adult-gloves | 6.75 × 11.5 | 17.145 × 29.21 | — | 270 yd | 270 yd |
| Adult Medium | adult-gloves | 7.25 × 12.5 | 18.415 × 31.75 | — | 310 yd | 310 yd |
| Adult Large | adult-gloves | 8.25 × 13.5 | 20.955 × 34.29 | — | 380 yd | 380 yd |
| Kid/Junior | fingerless-mitts | 6 × 8.5 | 15.24 × 21.59 | — | 160 yd | 160 yd |
| Adult Small | fingerless-mitts | 6.75 × 9.5 | 17.145 × 24.13 | — | 215 yd | 215 yd |
| Adult Medium | fingerless-mitts | 7.25 × 10.5 | 18.415 × 26.67 | — | 250 yd | 250 yd |
| Adult Large | fingerless-mitts | 8.25 × 11.25 | 20.955 × 28.575 | — | 305 yd | 305 yd |

#### Purl Soho / Hiromi Glover — Poetic Poncho

Original: <https://www.purlsoho.com/create/2025/02/21/poetic-poncho/>. Access date: 2026-10-19.

Original Materials/Gauge/Sizes. Single strand Vinter Wool (70% Norwegian white sheep wool / 30% Norwegian wildsheep wool), 120 yd / 50 g. Approximate requirements 680/935/1275 yd, versus 6/8/11 purchased skeins = 720/960/1320 yd. The original numeric sizes 46/54/64 are retained. Dimensions are the UNSEAMED panel. Intended chest 30–40/40–50/50–60 in, converted exactly below. These numeric sizes are not relabeled XL sizes.

Construction: Flat stockinette panel with mock-rib ends, folded and seamed; 4 mm needles. Dimensions are before seaming. Original sizes 46, 54 and 64 are not XL labels.

Gauge: 20 stitches × 29 rows / 10.16 cm. Yarn specification: Purl Soho Vinter Wool — 120 yd / 50 g. Quantity basis: **Pattern’s approximate required length**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| 46 | poncho | 17 × 46 | 43.18 × 116.84 | 76.2–101.6 | 680 yd | 680 yd |
| 54 | poncho | 20 × 54 | 50.8 × 137.16 | 101.6–127 | 935 yd | 935 yd |
| 64 | poncho | 23 × 64 | 58.42 × 162.56 | 127–152.4 | 1275 yd | 1275 yd |

#### Purl Soho — Double Seed Stitch Blanket

Original: <https://www.purlsoho.com/create/2013/01/27/double-seed-stitch-blanket/>. Access date: 2026-10-19.

Original Materials/Gauge/Sizes. Single strand Super Soft Merino, 100% merino, 87 yd / 100 g. Source calls the lengths approximate requirements; they also equal its 6/17/22/36/52 whole skeins. No measured consumption claim. Only stitch gauge is stated; row count is null, never invented. Source label Baby/Crib maps to baby blanket, Throw to throw blanket, Twin/Queen to bed blanket. No arbitrary relabeling as lap size.

Construction: Flat double seed stitch; 9 mm needles. The source gives stitch gauge only, no row gauge.

Gauge: 11 stitches / 10.16 cm (row gauge unstated). Yarn specification: Purl Soho Super Soft Merino — 87 yd / 100 g. Quantity basis: **Pattern’s approximate required length**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| Baby | baby-blanket | 28 × 30 | 71.12 × 76.2 | — | 522 yd | 522 yd |
| Crib | baby-blanket | 45 × 60 | 114.3 × 152.4 | — | 1479 yd | 1479 yd |
| Throw | throw-blanket | 60 × 60 | 152.4 × 152.4 | — | 1914 yd | 1914 yd |
| Twin | afghan | 66 × 90 | 167.64 × 228.6 | — | 3132 yd | 3132 yd |
| Queen | afghan | 90 × 95 | 228.6 × 241.3 | — | 4524 yd | 4524 yd |

#### Purl Soho / Whitney Van Nes — Pixie Dust Lap Blanket

Original: <https://www.purlsoho.com/create/2012/10/18/pixie-dust-lap-blanket-in-cool-white/>. Access date: 2026-10-19.

Original 2012 Materials/Gauge/Size and linked original method. Pixie Dust wool/mohair/sparkle blend, 40 yd / 145 g, single strand. Seven skeins and approximately 280 yd required; stated stitch gauge approximately 1 stitch / 1 in in 1×1 rib. No row gauge supplied. The separate doubled-Sister alternative is excluded, as its four/five-skein/changed-length discussion is not the same reference.

Construction: Flat 1×1 rib; 19–20 mm needles. Approximate stitch gauge only; no row gauge. Original single-strand Pixie Dust version, not the doubled Sister alternative.

Gauge: 1 stitches / 2.54 cm (row gauge unstated). Yarn specification: Knit Collage Pixie Dust — 40 yd / 145 g. Quantity basis: **Pattern’s approximate required length**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| 26 × 56 in | lap-blanket | 26 × 56 | 66.04 × 142.24 | — | 280 yd | 280 yd |

#### Shaina Bilow — Link Headband

Original: <https://www.shainabilow.com/_files/ugd/1a5a98_f901f21ffb4a4e7595858b7ded116a79.pdf>. Access date: 2026-10-19.

Original designer PDF, Link Headband by Shaina Bilow (2015), pages 1–2. Only the single-strand chunky CYCA #5 option: 100 yd. The alternative two DK strands needs 100 yd EACH; it is not mixed into this case. Finished 19 in circumference × 4 in width, 21 stitches × 18 rows per 4 in in 1×1 rib, 6.5 mm needles. Source does not give a fixed intended head interval or a mandatory brand/ball length for the chunky choice. No invented ball count.

Construction: Flat 1×1 rib with linked ends and minimal seaming; 6.5 mm needles. Single-strand chunky version only, not the two-strand DK alternative. Dimensions: circumference × width.

Gauge: 21 stitches × 18 rows / 10.16 cm. Yarn specification: Chunky — CYCA #5. Quantity basis: **Pattern-stated yarn requirement**.

| Original size | Project | Original dimensions in | Converted dimensions cm | Body bust cm when supplied | Source materials | Display basis quantity |
| --- | --- | --- | --- | --- | --- | --- |
| 19 × 4 in | headband | 19 × 4 | 48.26 × 10.16 | — | 100 yd | 100 yd |

### Review of all retained project categories

| Category / related categories | Implemented references |
| --- | --- |
| sweater | PetiteKnit — Novice Sweater; Tin Can Knits — Flax (Worsted / Aran) |
| cowl | Purl Soho / Hiromi Glover — Garter Ridge Cowl |
| scarf | Purl Soho / Hiromi Glover — Meadow Breeze Scarf + Shawl |
| shawl | Purl Soho / Hiromi Glover — Meadow Breeze Scarf + Shawl |
| baby-blanket | Purl Soho / Hiromi Glover — Piece Of Cake Blanket; Purl Soho — Double Seed Stitch Blanket |
| throw-blanket | Purl Soho / Hiromi Glover — Piece Of Cake Blanket; Purl Soho — Double Seed Stitch Blanket |
| baby-sweater | Tin Can Knits — Flax (Worsted / Aran) |
| child-sweater | Tin Can Knits — Flax (Worsted / Aran) |
| baby-cardigan | Tin Can Knits — Harvest |
| child-cardigan | Tin Can Knits — Harvest |
| cardigan | Tin Can Knits — Harvest; PetiteKnit — Eva Cardigan |
| vest | PetiteKnit — Weekend Slipover; Tin Can Knits — Bracken |
| baby-hat | Tin Can Knits — Barley (Worsted / Aran) |
| child-hat | Tin Can Knits — Barley (Worsted / Aran) |
| adult-hat | Tin Can Knits — Barley (Worsted / Aran) |
| child-mittens | Tin Can Knits — Maize |
| adult-mittens | Tin Can Knits — Maize |
| fingerless-mitts | Tin Can Knits — Maize; Purl Soho — Very Classic Gloves |
| child-socks | Tin Can Knits — Rye (Worsted / Aran) |
| adult-socks | Tin Can Knits — Rye (Worsted / Aran) |
| dishcloth | Purl Soho / Keith Foster — Knit + Purl Washcloth |
| baby-booties | Purl Soho / Hiromi Glover — Knit + Fold Slippers |
| slippers | Purl Soho / Hiromi Glover — Knit + Fold Slippers |
| headband | Shaina Bilow — Link Headband |
| adult-gloves | Purl Soho — Very Classic Gloves |
| poncho | Purl Soho / Hiromi Glover — Poetic Poncho |
| afghan | Purl Soho — Double Seed Stitch Blanket |
| lap-blanket | Purl Soho / Whitney Van Nes — Pixie Dust Lap Blanket |
| wrap | Not implemented: see rejected candidate below. |
| pillow-cover | Not implemented: see rejected candidates below. |

Exact remaining gaps are **wrap/stole and pillow-cover**, every size. This is not a claim that reliable patterns do not exist elsewhere. The selected evidence does not justify a reference for these categories:

- [Purl Soho Osmosis Wrap](https://www.purlsoho.com/create/2021/12/31/osmosis-wrap/): current original states Tussock 955 yd and Sweetgrass Fine six colors × 125 = 750 yd, held one strand of each throughout. It does not reconcile the differing required strand lengths. Its official 20 January 2022 reply corrects the gauge from 48 rows to 24 (14 stitches per 4 in), now reflected in the main pattern. Do not invent a matching strand quantity or use a combined number as a personalized estimate; held for clarification.
- [Craft Yarn Council Floral Pillow](https://www.craftyarncouncil.com/proj_pillow_1299.html): 16 × 16 in, approximately 10 oz of unspecified worsted plus unspecified embroidery scraps, three or sometimes four strands. Without a yarn length/weight specification or complete color lengths, mass cannot be converted to a defensible meter total. Not added.
- [Purl Soho Bobble Sheep Pillow](https://www.purlsoho.com/create/2016/02/29/bobble-sheep-pillow-in-gentle-giant/): shaped stuffed animal, not the retained pillow-cover category; not relabeled.

### Correction checks and evidence boundaries

- Read [Tin Can Knits errata](https://tincanknits.com/errata), latest downloadable Flax/Harvest/Barley/Maize/Rye PDFs and the Bracken original sizing viewer. No separate correction for the selected values was listed in the checked errata. Current Flax regular-body/long-sleeve quantities were chosen over the older tutorial.
- Read [PetiteKnit updates/corrections](https://www.petiteknit.com/en/pages/opdateringer-rettelser) and current original product specifications. The selected Eva/Weekend values have no contrary correction in that checked list. Other yarn alternatives (Novice Slipover, Stockholm Slipover, Holiday and Novice Cardigan Chunky) were considered but not combined with these records.
- Purl Soho original pattern specs and available author replies were checked. The centralized [knitting errata index](https://www.purlsoho.com/create/knitting-errata/) returned HTTP 403; scoped original-domain correction searches found no selected-pattern correction. This is a limited check, not a claim that every historical correction was accessible. Very Classic Gloves data was available from the indexed original page even though direct web/browser fetch returned 403.
- Shaina Bilow's original two-page PDF supplies the headband record. No separate revision notice is present in that PDF.
- Five downloaded TCK PDFs and browser snapshots are retained under the ignored `reports/yarn-coverage/browser-artifacts/` folder; extracted specification text and size-viewer captures are under `reports/yarn-coverage/`. These copies are verification material, not new site assets. No illustrations were created.

### Arithmetic and UI validation

Focused independent source fixtures cover every new quantity and dimension, garment size list, accessory gauge, Eva range, separate held-yarn supplies, per-color sums and exact conversion in both directions. Quantity is never inferred from dimensions, needle size or yarn weight. Unsupported/foreign combinations show no number; all four selectors clear stale results. Source ranges are formatted as ranges. Missing row gauge renders only stitch gauge.

Validation results are recorded after the final run in the B02-09 coverage-expansion follow-up in CONTENT_AUDIT.md; local logs and browser evidence are in reports/yarn-coverage/. This is source transcription and UI validation, not measured-consumption calibration.

## Historical specification — obsolete, retained for provenance

The document below is the original unsupported specification. Its numbers, multipliers, UI instructions and disclaimer are **not current requirements and must not be reused as validated data**.

---

# Yarn Estimator — Project Types & Sizes Update

## Task

Replace the current limited project type and size options in the Yarn Estimator calculator with this list. Only includes project types where yardage estimates are well-established across multiple sources.

## Calculation

```
estimatedMeters = baseWorstedMeters[projectType][size] × yarnWeightMultiplier[yarnWeight]
```

### Yarn Weight Multipliers

| Yarn Weight | Multiplier |
|------------|-----------|
| Lace | 1.5 |
| Fingering | 1.35 |
| Sport | 1.2 |
| DK | 1.1 |
| Worsted | 1.0 |
| Aran | 0.95 |
| Bulky | 0.8 |
| Super Bulky | 0.6 |

---

## Project Types, Sizes & Yardage (meters, worsted weight baseline)

### ADULT GARMENTS

**Sweater / Pullover**

| Size | Meters |
|------|--------|
| XS | 1000 |
| S | 1100 |
| M | 1200 |
| L | 1350 |
| XL | 1500 |
| 2XL | 1650 |
| 3XL | 1800 |
| 4XL | 1950 |
| 5XL | 2100 |

**Cardigan**

| Size | Meters |
|------|--------|
| XS | 1100 |
| S | 1250 |
| M | 1400 |
| L | 1550 |
| XL | 1700 |
| 2XL | 1850 |
| 3XL | 2050 |
| 4XL | 2200 |
| 5XL | 2400 |

**Vest**

| Size | Meters |
|------|--------|
| XS | 550 |
| S | 625 |
| M | 700 |
| L | 800 |
| XL | 900 |
| 2XL | 1000 |
| 3XL | 1100 |

**Poncho**

| Size | Meters |
|------|--------|
| S/M | 900 |
| L/XL | 1100 |
| 2XL+ | 1300 |

---

### CHILD GARMENTS

**Child Sweater**

| Size | Meters |
|------|--------|
| 2Y | 350 |
| 4Y | 425 |
| 6Y | 525 |
| 8Y | 625 |
| 10Y | 725 |
| 12Y | 850 |

**Child Cardigan**

| Size | Meters |
|------|--------|
| 2Y | 400 |
| 4Y | 500 |
| 6Y | 600 |
| 8Y | 725 |
| 10Y | 850 |
| 12Y | 975 |

---

### BABY GARMENTS

**Baby Sweater**

| Size | Meters |
|------|--------|
| Preemie | 125 |
| Newborn | 150 |
| 3M | 175 |
| 6M | 200 |
| 12M | 250 |
| 18M | 300 |
| 24M | 350 |

**Baby Cardigan**

| Size | Meters |
|------|--------|
| Preemie | 150 |
| Newborn | 175 |
| 3M | 200 |
| 6M | 250 |
| 12M | 300 |
| 18M | 350 |
| 24M | 400 |

**Baby Booties**

| Size | Meters |
|------|--------|
| Preemie | 25 |
| Newborn | 30 |
| 3-6M | 40 |
| 6-12M | 50 |
| 12-24M | 60 |

---

### HATS

**Adult Hat / Beanie**

| Size | Meters |
|------|--------|
| S | 100 |
| M | 125 |
| L | 150 |

**Child Hat**

| Size | Meters |
|------|--------|
| Toddler | 60 |
| Child | 80 |
| Teen | 100 |

**Baby Hat**

| Size | Meters |
|------|--------|
| Preemie | 25 |
| Newborn | 35 |
| 3-6M | 45 |
| 6-12M | 55 |
| 12-24M | 65 |

**Headband / Ear Warmer**

| Size | Meters |
|------|--------|
| Child | 30 |
| Adult | 50 |

---

### HANDS

**Adult Mittens**

| Size | Meters |
|------|--------|
| S | 100 |
| M | 125 |
| L | 150 |

**Child Mittens**

| Size | Meters |
|------|--------|
| Toddler | 45 |
| Child | 65 |
| Teen | 85 |

**Adult Gloves**

| Size | Meters |
|------|--------|
| S | 150 |
| M | 175 |
| L | 200 |

**Fingerless Mitts**

| Size | Meters |
|------|--------|
| S | 75 |
| M | 90 |
| L | 110 |

---

### FEET

**Adult Socks**

| Size | Meters |
|------|--------|
| S (EU 36-38) | 175 |
| M (EU 39-41) | 200 |
| L (EU 42-44) | 225 |
| XL (EU 45-47) | 250 |

**Child Socks**

| Size | Meters |
|------|--------|
| Toddler | 75 |
| Child | 100 |
| Teen | 140 |

**Slippers**

| Size | Meters |
|------|--------|
| S | 100 |
| M | 125 |
| L | 150 |

---

### NECK & SHOULDERS

**Scarf**

| Size | Meters |
|------|--------|
| Short (120cm) | 200 |
| Medium (150cm) | 275 |
| Long (180cm) | 350 |
| Extra Long (200cm+) | 425 |

**Cowl / Snood**

| Size | Meters |
|------|--------|
| Short | 125 |
| Tall | 200 |

**Shawl**

| Size | Meters |
|------|--------|
| Small | 350 |
| Medium | 550 |
| Large | 750 |

**Wrap / Stole**

| Size | Meters |
|------|--------|
| Small | 500 |
| Medium | 700 |
| Large | 900 |

---

### BLANKETS

**Baby Blanket**

| Size | Meters |
|------|--------|
| Small (60x75cm) | 550 |
| Standard (75x100cm) | 750 |
| Large (100x100cm) | 950 |

**Throw Blanket**

| Size | Meters |
|------|--------|
| Small (100x125cm) | 1200 |
| Standard (125x150cm) | 1600 |
| Large (150x175cm) | 2100 |

**Lap Blanket**

| Size | Meters |
|------|--------|
| One Size (90x120cm) | 1000 |

**Afghan / Bed Blanket**

| Size | Meters |
|------|--------|
| Twin (170x225cm) | 2750 |
| Full (195x225cm) | 3200 |
| Queen (230x250cm) | 4000 |
| King (270x250cm) | 4800 |

---

### HOME

**Dishcloth / Washcloth**

| Size | Meters |
|------|--------|
| One Size | 60 |

**Pillow Cover**

| Size | Meters |
|------|--------|
| Small (30x30cm) | 150 |
| Medium (40x40cm) | 250 |
| Large (50x50cm) | 375 |

---

## UI Implementation

### Category Grouping in Dropdown

```
ADULT GARMENTS
  Sweater / Pullover
  Cardigan
  Vest
  Poncho
CHILD GARMENTS
  Child Sweater
  Child Cardigan
BABY GARMENTS
  Baby Sweater
  Baby Cardigan
  Baby Booties
HATS
  Adult Hat / Beanie
  Child Hat
  Baby Hat
  Headband / Ear Warmer
HANDS
  Adult Mittens
  Child Mittens
  Adult Gloves
  Fingerless Mitts
FEET
  Adult Socks
  Child Socks
  Slippers
NECK & SHOULDERS
  Scarf
  Cowl / Snood
  Shawl
  Wrap / Stole
BLANKETS
  Baby Blanket
  Throw Blanket
  Lap Blanket
  Afghan / Bed Blanket
HOME
  Dishcloth / Washcloth
  Pillow Cover
```

### Size Dropdown

Changes dynamically based on selected project type.

### Yarn Weight Dropdown

```
Lace
Fingering
Sport
DK
Worsted (default)
Aran
Bulky
Super Bulky
```

### Disclaimer

Small text below result: "Estimate based on stockinette stitch. Cables, colorwork, and textured stitches use 15-20% more yarn. Always buy one extra skein."

### Dropdown Styling

Custom styled dropdowns matching site design — Creato Display font, burnt orange accent on selected/hover, no native blue highlight. Category headers use Bebas Neue, muted color, non-selectable.
