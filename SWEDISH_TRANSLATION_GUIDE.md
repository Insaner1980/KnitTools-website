# Swedish Translation Guide

## Publication Rule

Do not publish Swedish pages before the user has reviewed and approved them.

When adding Swedish articles, keep them as `draft: true` until review is complete. Do not add Swedish article paths to `articleTranslations` if that would expose hreflang links to unpublished pages.

## Goal

Translate KnitTools pages into natural Swedish used by knitters. The content must match the English pages exactly in meaning, structure, and practical detail. Do not add AI-generic filler, extra claims, marketing fluff, or generic explanations that are not present in the English source.

## Voice

- Natural Swedish, written for knitters.
- Practical and direct.
- Avoid literal English syntax.
- Avoid overly formal or machine-translated phrasing.
- Keep the same level of specificity as the English text.
- Prefer wording a Swedish knitter would expect in a pattern, knitting tutorial, yarn label context, or tool UI.

## Units And Formatting

Use European units as the primary units:

- `cm` for width and measurements.
- `mm` for needle sizes.
- `m` for yarn length.
- `g` for yarn weight.
- `10 x 10 cm` for gauge/stickfasthet.
- Use `m` for `maskor` only when context is clearly a knitting abbreviation; avoid ambiguity with meters.
- Use `v` for `varv` where abbreviations are appropriate.

If a page is explicitly about conversion, US/UK sizes may appear as comparison values, but millimeters must be the primary reference for Swedish readers.

## Core Swedish Knitting Terms

Use these terms consistently:

| English | Swedish |
| --- | --- |
| gauge | stickfasthet |
| gauge swatch | stickprov / provlapp |
| stitch | maska |
| stitches | maskor |
| row | varv |
| round | varv |
| cast on | lägga upp maskor |
| bind off / cast off | maska av |
| increase | öka / ökning |
| decrease | minska / minskning |
| yarn | garn |
| yarn weight | garntjocklek / garnets tjocklek |
| yarn amount / yardage | garnåtgång |
| yardage | löplängd / garnåtgång, depending on context |
| skein / ball | nystan |
| yarn label | banderoll |
| knitting needle | sticka |
| needles | stickor |
| needle size | stickstorlek / stickor i X mm |
| circular needle | rundsticka |
| double-pointed needles / DPNs | strumpstickor |
| pattern | mönster / stickmönster |
| pattern repeat | rapport |
| right side | rätsida |
| wrong side | avigsida |
| knit stitch | rät maska |
| purl stitch | avig maska |
| knit | sticka räta maskor / sticka rätt, depending on context |
| purl | sticka aviga maskor / sticka avigt, depending on context |
| stockinette | slätstickning |
| garter stitch | rätstickning |
| ribbing | resår |
| cable | fläta |
| lace | spetsstickning / hålmönster, depending on context |
| stitch marker | markör / maskmarkör |
| row counter | varvräknare |
| pick up stitches | plocka upp maskor |
| dropped stitch | tappad maska |
| blocking | blockning / blocka |

## Important Term Choices

Use `stickfasthet` as the primary translation for `gauge`. `Masktäthet` can be used only as an explanatory secondary term if needed, but not as the main UI or article term.

Use `stickprov` or `provlapp` for `gauge swatch`. `Stickprov` is often the more natural tutorial term; `provlapp` is also common in Swedish knitting sources.

For `yarn weight`, do not use `garnvikt` as the main term, because it can sound like physical weight in grams. Use `garntjocklek` or `garnets tjocklek`.

For `yardage`, avoid direct English carryover. Use `garnåtgång` when the page means how much yarn a project needs. Use `löplängd` when referring to the length on a yarn label, such as meters per 100 g.

For `needle size chart`, use `stickstorlekstabell` or a more natural heading like `Stickstorlekar`.

For yarn weights, keep international names where they help pattern reading: `Lace`, `Fingering`, `Sport`, `DK`, `Worsted`, `Aran`, `Bulky`, `Super Bulky`. Explain them using Swedish context: garntjocklek, stickfasthet, stickstorlek in mm, and meter per 100 g.

## Routes

Recommended public Swedish route shape:

| English | Swedish |
| --- | --- |
| `/tools/` | `/sv/verktyg/` |
| `/tools/cast-on-calculator/` | `/sv/verktyg/upplaggningskalkylator/` |
| `/tools/yarn-estimator/` | `/sv/verktyg/garnatgangskalkylator/` |
| `/tools/needle-size-chart/` | `/sv/verktyg/stickstorlekar/` |
| `/tools/yarn-weight-chart/` | `/sv/verktyg/garntjocklekar/` |
| `/tools/knitting-abbreviations/` | `/sv/verktyg/stickforkortningar/` |
| `/tools/knitting-size-charts/` | `/sv/verktyg/storlekstabeller-stickning/` |
| `/articles/` | `/sv/artiklar/` |
| `/articles/category/gauge-calculations/` | `/sv/artiklar/kategori/stickfasthet-och-berakningar/` |
| `/articles/category/yarn/` | `/sv/artiklar/kategori/garn/` |
| `/articles/category/needles/` | `/sv/artiklar/kategori/stickor/` |
| `/articles/category/techniques/` | `/sv/artiklar/kategori/tekniker/` |
| `/articles/category/app-tools/` | `/sv/artiklar/kategori/app-och-verktyg/` |

Confirm final Swedish slugs before publishing.

## Translation Workflow

1. Use the English page as the source of truth.
2. Preserve content structure: headings, FAQ questions, examples, tables, and tool behavior must match the English page.
3. Localize units to European defaults.
4. Use the Swedish knitting terms in this guide.
5. Avoid adding new tips, claims, or SEO filler.
6. Keep article translations as drafts until reviewed.
7. Run `npm run build` after implementation.
8. Do not deploy or publish until the user approves.

## Sources Used For Terminology

Reference Swedish knitting usage from sources such as:

- DROPS / Garnstudio Swedish pages for `stickfasthet`, `provlapp`, `maskor`, `varv`, and `10 x 10 cm`.
- Hobbii Swedish tutorials for `stickprov`, `stickfasthet`, and `maskor och varv per 10 cm`.
- Järbo Swedish tutorials for natural technique phrasing such as `plocka upp maskor`.
- Swedish knitting instructions using `lägga upp maskor`.
- Swedish yarn-weight references that explain international yarn names through meters per 100 g, stickfasthet, and needle size in mm.
