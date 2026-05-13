# KnitTools Norwegian Translation Guide

Last updated: 2026-05-12

This guide is the working reference for translating KnitTools from English into Norwegian. Use it before translating Norwegian tool pages, UI strings, article pages, categories, SEO metadata, and internal links.

## Language Choice

Use Norwegian Bokmal for KnitTools Norwegian content.

Recommended technical convention:

- Public URL prefix: `/no/`
- Human-facing language name: `Norsk`
- Content style: Bokmal, not Nynorsk
- Rendered language/hreflang target should be Bokmal-aware, ideally `nb` or `nb-NO`, even if the internal route key is `no`

If the implementation uses `no` as the internal language key to match `/no/`, check `BaseLayout.astro` carefully. It currently writes the language key directly into `<html lang>` and `hreflang`. Add a mapping if needed so Norwegian Bokmal pages do not accidentally expose a country-style or ambiguous language signal.

## Publication Rule

Do not publish Norwegian pages before the user has reviewed and approved them.

When adding Norwegian articles, keep them as `draft: true` until review is complete. Do not add Norwegian article paths to `articleTranslations` if that would expose hreflang links to unpublished pages.

The first implementation pass should translate the English tool pages. Translate articles later in reviewed batches.

## Core Principles

- Translate from the English original as the source of truth.
- Preserve the same meaning, structure, examples, caveats, tables, FAQ items, and practical detail.
- Do not add extra advice, SEO filler, marketing fluff, or generic explanatory paragraphs.
- Write natural Norwegian for knitters, not literal English.
- Use metric and European conventions first.
- Keep KnitTools as the brand name.
- Keep the tone practical, direct, and slightly opinionated where the English source is opinionated.
- Avoid AI-generic phrasing such as `ta strikkingen til neste nivå`, `sømløs opplevelse`, `perfekt for alle`, `kreativ reise`, and similar filler.

## Norwegian Voice

Use:

- `du`, `deg`, `ditt`
- short active sentences
- everyday knitting verbs: `strikke`, `legge opp`, `felle av`, `øke`, `felle`, `plukke opp`, `rekke opp`, `blokke`
- concrete nouns: `masker`, `pinner`, `omganger`, `prøvelapp`, `garn`, `nøste`, `strikkeoppskrift`
- natural pattern-style phrasing where the page explains techniques

Avoid:

- formal `De`
- overly polite UI phrasing like `vennligst` unless the sentence genuinely needs it
- English syntax with Norwegian words
- using `mønster` for every occurrence of English `pattern`; use `strikkeoppskrift` for the full instruction and `mønster` for stitch pattern, motif, texture, or chart pattern
- using `rad` for knitting rows; use `pinne` for flat knitting and `omgang` for knitting in the round

## Units And Number Formatting

Use European units as primary:

- `cm` for widths, lengths, and body measurements
- `mm` for needle sizes
- `m` for yarn length
- `g` for yarn weight
- `10 x 10 cm` for gauge areas
- `meter` in prose, `m` in compact tables and labels

Norwegian number formatting:

- Use decimal comma in prose and user-facing copy: `2,5 mm`, `21,5 masker`
- Keep decimal points only in code, data attributes, JSON, JavaScript, and other machine-readable values
- Use a space between number and unit: `10 cm`, `50 g`, `120 m`
- Use spaces, not periods, as thousands separators in prose: `1 200 m`
- For four-digit numbers, `1200 m` is acceptable in tight UI, but prefer `1 200 m` in prose

When the English source uses inches or yards:

- Convert or foreground metric for Norwegian readers.
- Keep inches/yards only when the page is explicitly about conversion, US/UK sizing, or when a tool label must support both systems.
- Use `4 in` in compact labels only if the English source/tool also needs the inch reference. In prose, explain through `10 cm`.

Examples:

- English `Gauge (stitches per 10 cm / 4 in)` -> `Strikkefasthet (masker per 10 cm / 4 in)`
- English `4.5 mm needle` -> `pinne 4,5 mm`
- English `150 yards per skein` -> `ca. 137 m per nøste` if the value is converted, or `150 yards` only in a conversion context

## Essential Term Decisions

| English concept | Norwegian term to use | Notes |
|---|---|---|
| knitting | `strikking` | General craft. |
| to knit | `strikke` | |
| knitter | `strikker`, `den som strikker`, `strikkere` | Prefer neutral sentence structure when possible. |
| knitting pattern | `strikkeoppskrift` | Use for the full pattern/instructions. |
| pattern / stitch pattern | `mønster`, `maskemønster` | Use for texture, chart, motif, lace, cables, or colorwork. |
| chart | `diagram` | In knitting-pattern context. |
| gauge | `strikkefasthet` | Locked primary term. |
| gauge swatch | `prøvelapp`, `strikkeprøve` | Use `prøvelapp` for the physical swatch; `strikkeprøve` is also standard in tutorials. |
| stitch | `maske` | Abbrev: `m`. |
| stitches | `masker` | |
| stitch count | `maskeantall` | |
| row | `pinne` | For flat knitting. Abbrev: `p`. Avoid `rad` for knitting rows. |
| round | `omgang` | For circular knitting. Abbrev: `omg`. |
| rows/rounds when both apply | `pinner og omganger` | Useful for articles and app copy. |
| cast on | `legge opp masker` | Noun: `opplegg`, `oppleggskant`. |
| bind off / cast off | `felle av` | Noun: `avfelling`; edge: `avfellingskant`. |
| increase | `øke`, `økning` | |
| decrease | `felle`, `felling` | Use `ta inn` only if the specific source phrasing requires it. |
| increase/decrease evenly | `fordele økninger/fellinger jevnt` | Often `jevnt fordelt`. |
| yarn | `garn` | Do not use `ull` unless the fiber is wool. |
| yarn weight | `garntykkelse`, `garnets tykkelse` | Avoid `garnvekt`; it sounds like physical weight in grams. |
| yarn weight chart | `Garntykkelser`, `Tabell over garntykkelser` | Tool title can be concise. |
| yarn amount / project yardage | `garnmengde`, `garnforbruk`, `garnbehov` | Choose by sentence. |
| yardage on label | `løpelengde` | Label concept: meters per skein/weight. |
| skein / ball | `nøste` | Use `hespe` only for an actual hank. |
| yarn label | `garnetikett`, `banderole` | Prefer `garnetikett` in plain tutorials; `banderole` is acceptable when discussing labels. |
| fiber content | `fiberinnhold`, `materialsammensetning` | Use `fiberinnhold` in plain prose. |
| dye lot | `parti`, `fargeparti` | |
| needle | `pinne`, `strikkepinne` | In context, `pinne` is enough. |
| needle size | `pinnestørrelse`, `pinnetykkelse`, `pinne nr.` | Use `pinnestørrelse` in tools/SEO; `pinne nr.` in pattern-like examples. |
| needle size chart | `Pinnestørrelser`, `Tabell over pinnestørrelser` | Tool title can be `Pinnestørrelser`. |
| circular needle | `rundpinne` | |
| straight needles | `rette pinner`, `strikkepinner` | Choose by context. |
| DPNs | `strømpepinner` | Not `sukkapinner`. |
| stitch marker | `maskemarkør` | |
| row counter | `omgangsteller` | Common product term. Explain it tracks `pinner` flat and `omganger` in the round. |
| pattern viewer | `oppskriftsvisning`, `PDF-visning` | Choose based on actual feature context. |
| project | `prosjekt`, `strikkeprosjekt` | |
| stash | `garnlager` | |
| leftovers / scrap yarn | `restegarn` | |
| right side | `rettsiden` | |
| wrong side | `vrangsiden` | |
| knit stitch | `rett maske` | Abbrev: `r`. |
| purl stitch | `vrang maske` | Abbrev: `vr`. |
| knit | `strikke rett` | |
| purl | `strikke vrang` | |
| stockinette | `glattstrikk` | |
| garter stitch | `rillestrikk` | |
| ribbing | `vrangbord` | |
| seed stitch | `perlestrikk` | |
| cable | `flette`, `flettemønster` | |
| lace | `hullmønster` | Keep `Lace` only for yarn category. |
| colorwork | `mønsterstrikk`, `flerfargestrikk` | Choose by context. |
| pick up stitches | `plukke opp masker` | |
| dropped stitch | `mistet maske`, `tapt maske` | Prefer `mistet maske` in friendly prose. |
| fix dropped stitch | `redde en mistet maske`, `plukke opp en mistet maske` | |
| frog / rip back | `rekke opp` | |
| lifeline | `livline` | Explain if needed. |
| join new ball | `sette til et nytt nøste`, `starte på et nytt nøste` | |
| weave in ends | `feste tråder` | Not a literal weave translation. |
| seam pieces | `sy sammen strikkede deler` | |
| mattress stitch | `madrassting` | |
| block / blocking | `blokke`, `blokking` | Also use `damping` when the method is steam. |
| wet blocking | `våtblokking` | |
| steam blocking | `damping`, `dampe` | |
| spray blocking | `sprayblokking`, `fukte og forme` | Prefer explanatory phrasing if it reads better. |

## Garment And Fit Terms

| English concept | Norwegian term to use | Notes |
|---|---|---|
| sweater | `genser` | Do not keep `sweater` unless it is part of a product name. |
| cardigan | `cardigan`, `strikkejakke` | `Cardigan` is common in patterns; `strikkejakke` is plain Norwegian. |
| scarf | `skjerf` | |
| shawl | `sjal` | |
| blanket | `teppe`, `pledd` | Use `pledd` for throw blanket when context fits. |
| hat | `lue` | Not `hatt`. |
| sock | `sokk` | Plural: `sokker`. |
| mitten | `vott` | Plural: `votter`. |
| cuff | `vrangbord`, `mansjett` | Use `vrangbord` for knitted rib cuff. |
| sleeve | `erme` | |
| yoke | `bærestykke` | |
| raglan | `raglan` | |
| body | `bol` | Sweater body. |
| front piece | `forstykke` | |
| back piece | `bakstykke` | |
| chest / bust measurement | `brystmål`, `bystemål` | `brystmål` is broadly clear; many patterns use `bystemål`. |
| finished measurements | `plaggets mål`, `ferdige mål` | |
| body measurements | `kroppsmål` | |
| ease | `bevegelsesvidde` | First use can include `(positive ease)` if the English source does. |
| positive ease | `positiv bevegelsesvidde`, `bevegelsesvidde (positive ease)` | |
| negative ease | `negativ bevegelsesvidde` | |
| fit | `passform` | |
| oversized | `oversized`, `romslig` | Use `oversized` if the style term matters. |

## Yarn Weight Categories

Norwegian knitting sources often keep international yarn category names and explain them through `garntykkelse`, `strikkefasthet`, `pinnestørrelse`, and `løpelengde`.

Use these display names:

| English category | Norwegian display |
|---|---|
| Lace | `Lace` |
| Super Fine / Fingering | `Fingering / sokkegarn` |
| Sport | `Sport` |
| DK / Light | `DK / Light` |
| Worsted / Medium | `Worsted / Aran / Medium` |
| Bulky | `Bulky / Chunky` |
| Super Bulky | `Super Bulky / Super Chunky` |
| Jumbo | `Jumbo` |

Guidelines:

- Use `garntykkelse` as the concept.
- Keep `DK`, `Worsted`, `Aran`, `Fingering`, `Lace`, `Bulky`, and `Chunky` as category names.
- Use `sokkegarn` only when the context is typical sock yarn; not every fingering yarn is sock yarn.
- Explain WPI as `wraps per inch (WPI)` on first use, then `WPI`.
- Prefer meters per 50 g or 100 g where the source allows it.

## Tool Names And Route Shape

Recommended Norwegian tool names and public routes:

| English | Norwegian title | Recommended route |
|---|---|---|
| Free Knitting Tools | `Gratis strikkeverktøy` | `/no/verktoy/` |
| Cast On Calculator | `Oppleggskalkulator` | `/no/verktoy/oppleggskalkulator/` |
| Yarn Estimator | `Garnberegner` | `/no/verktoy/garnberegner/` |
| Needle Size Chart | `Pinnestørrelser` | `/no/verktoy/pinnestorrelser/` |
| Yarn Weight Chart | `Garntykkelser` | `/no/verktoy/garntykkelser/` |
| Knitting Abbreviations | `Strikkeforkortelser` | `/no/verktoy/strikkeforkortelser/` |
| Knitting Size Charts | `Størrelsestabeller for strikking` | `/no/verktoy/storrelsestabeller-strikking/` |

Use ASCII slugs. Transliterate `ø` as `o` in slugs to match existing project style for localized URLs.

## Common UI Labels

| English UI | Norwegian UI |
|---|---|
| Tools | `Verktøy` |
| Articles | `Artikler` |
| All tools | `Alle verktøy` |
| All articles | `Alle artikler` |
| Back to all tools | `Tilbake til alle verktøy` |
| Category | `Kategori` |
| By KnitTools | `Av KnitTools` |
| Published | `Publisert` |
| Updated | `Oppdatert` |
| View | `Vis` |
| Coming soon | `Kommer snart` |
| Frequently asked questions | `Vanlige spørsmål` |
| Calculate | `Beregn` |
| Estimate | `Beregn` or `Estimer` | Prefer `Beregn` for calculator buttons. |
| Project type | `Prosjekttype` |
| Size | `Størrelse` |
| Yarn weight | `Garntykkelse` |
| Gauge | `Strikkefasthet` |
| Width | `Bredde` |
| Unit | `Enhet` |
| Stitches to cast on | `Masker å legge opp` |
| Search | `Søk` |
| Search abbreviation | `Søk etter forkortelse` |
| No results | `Ingen treff` |
| Email address | `E-postadresse` |
| Join the list | `Skriv deg på listen` |
| Reserve my price | `Sikre lanseringsprisen` |

## Category Labels And Routes

| English category | Norwegian label | Recommended route |
|---|---|---|
| Gauge & Calculations | `Strikkefasthet og beregninger` | `/no/artikler/kategori/strikkefasthet-og-beregninger/` |
| Yarn | `Garn` | `/no/artikler/kategori/garn/` |
| Needles | `Pinner` | `/no/artikler/kategori/pinner/` |
| Techniques | `Teknikker` | `/no/artikler/kategori/teknikker/` |
| App & Tools | `App og verktøy` | `/no/artikler/kategori/app-og-verktoy/` |

Suggested category descriptions:

- `Strikkefasthet og beregninger`: `Strikkefasthet, prøvelapper og maskeantall. Beregningene som avgjør om det ferdige arbeidet får størrelsen du hadde tenkt.`
- `Garn`: `Valg av garn, garnbytte, garnetiketter og beregning av hvor mye garn et prosjekt faktisk trenger.`
- `Pinner`: `Pinnestørrelser, materialer og typer strikkepinner. Hva som er verdt å kjøpe, og når hver type passer best.`
- `Teknikker`: `Praktiske teknikkguider steg for steg. Rette opp feil, avslutte pent og lese oppskrifter fra opplegg til avfelling.`
- `App og verktøy`: `Apper, kalkulatorer og hjelpemidler som gjør det enklere å planlegge, følge og holde orden på strikkeprosjekter.`

## Article Title Directions

Use these as baseline title and slug directions. Adjust only if the final article context requires it.

| Source article | Norwegian title direction | Suggested slug |
|---|---|---|
| At the Same Time in Knitting Patterns | `"Samtidig" i strikkeoppskrifter` | `samtidig-i-strikkeoppskrifter` |
| Best Knitting Apps: What to Look For | `De beste strikkeappene: Hva du bør se etter` | `beste-strikkeapper-hva-du-bor-se-etter` |
| Best Yarn for Beginners: Practical Guide | `Det beste garnet for nybegynnere` | `beste-garn-for-nybegynnere` |
| Circular vs Straight vs DPN: When to Use Each | `Rundpinne, rette pinner eller strømpepinner?` | `rundpinne-rette-pinner-strompepinner` |
| Digital vs Physical Row Counters Compared | `Digital eller mekanisk omgangsteller?` | `digital-eller-mekanisk-omgangsteller` |
| Essential Knitting Tools Beyond Needles and Yarn | `Viktig strikketilbehør utover pinner og garn` | `viktig-strikketilbehor-utover-pinner-og-garn` |
| How to Fix Dropped Stitches Without Frogging | `Redd mistede masker uten å rekke opp` | `redde-mistede-masker-uten-a-rekke-opp` |
| Free Knitting Calculators Every Knitter Needs | `Gratis strikkekalkulatorer som faktisk er nyttige` | `gratis-strikkekalkulatorer` |
| When Your Gauge Doesn't Match the Pattern | `Når strikkefastheten ikke stemmer` | `nar-strikkefastheten-ikke-stemmer` |
| Knitting a Gauge Swatch. Step by Step | `Strikk prøvelapp: steg for steg` | `strikke-provelapp-steg-for-steg` |
| How Many Stitches to Cast On (with Gauge) | `Hvor mange masker skal du legge opp?` | `hvor-mange-masker-skal-du-legge-opp` |
| How Much Yarn Do I Need? Estimating Yardage | `Hvor mye garn trenger jeg?` | `hvor-mye-garn-trenger-jeg` |
| How to Block Knitting: Wet, Steam & Spray | `Slik blokker du strikk: vått, damp og spray` | `blokke-strikk-vatt-damp-spray` |
| How to Knit a Hat: Methods for Every Skill | `Strikke lue: metoder for alle nivåer` | `strikke-lue-metoder-for-alle-nivaer` |
| How to Knit Socks. Anatomy of a Sock Pattern | `Strikke sokker: delene i en sokkeoppskrift` | `strikke-sokker-sokkeoppskriftens-deler` |
| How to Read a Knitting Pattern: Beginner's Guide | `Slik leser du en strikkeoppskrift` | `lese-strikkeoppskrift-nybegynnerguide` |
| How to Read a Yarn Label: Symbols Explained | `Slik leser du en garnetikett` | `lese-garnetikett-symboler` |
| How to Substitute Yarn in a Knitting Pattern | `Bytte garn i en strikkeoppskrift` | `bytte-garn-i-strikkeoppskrift` |
| How to Measure Knitting Gauge | `Slik måler du strikkefasthet` | `male-strikkefasthet` |
| How to Identify Mystery Yarn Without a Label | `Ukjent garn uten garnetikett` | `ukjent-garn-uten-garnetikett` |
| How to Increase or Decrease Evenly Across a Row | `Fordele økninger og fellinger jevnt over en pinne` | `fordele-okninger-og-fellinger-jevnt` |
| How to Join a New Ball of Yarn Mid-Row | `Sette til et nytt nøste midt på pinnen` | `nytt-noste-midt-pa-pinnen` |
| How to Knit Your First Scarf: Beginner Guide | `Strikke ditt første skjerf` | `strikke-forste-skjerf` |
| Knitting Needle Materials: Metal, Wood & Bamboo | `Strikkepinner i metall, tre og bambus` | `strikkepinner-metall-tre-bambus` |
| Knitting Pattern Repeats: Asterisks & Brackets | `Rapporter i strikkeoppskrifter: stjerner og klammer` | `rapporter-i-strikkeoppskrifter` |
| What Size Knitting Needles for Beginners? | `Hvilken pinnestørrelse passer for nybegynnere?` | `pinnestorrelse-for-nybegynnere` |
| How to Organize Multiple WIP Knitting Projects | `Holde orden på flere strikkeprosjekter` | `holde-orden-pa-strikkeprosjekter` |
| Knitting Pattern Sizes: Ease & Measurements | `Størrelser i strikkeoppskrifter: bevegelsesvidde og mål` | `storrelser-i-strikkeoppskrifter` |
| How to Pick Up Stitches Along a Knitted Edge | `Plukke opp masker langs en strikket kant` | `plukke-opp-masker-langs-strikket-kant` |
| How to Seam Knitted Pieces: Mattress Stitch | `Sy sammen strikkede deler: madrassting` | `sy-sammen-strikkede-deler-madrassting` |
| How to Track Your Knitting Time and Speed | `Følge med på strikketid og tempo` | `folge-med-pa-strikketid-og-tempo` |
| How to Keep Track of Rows When Knitting | `Holde styr på pinner og omganger når du strikker` | `holde-styr-pa-pinner-og-omganger` |
| What Is Gauge in Knitting? Why It Changes | `Hva er strikkefasthet?` | `hva-er-strikkefasthet` |
| Why Does My Knitting Curl? Causes and Fixes | `Hvorfor ruller strikketøyet seg?` | `hvorfor-ruller-strikketoyet-seg` |
| Yarn Fibers Compared: Wool, Cotton & Acrylic | `Garnfibre sammenlignet: ull, bomull og akryl` | `garnfibre-sammenlignet` |
| How Much Yarn for a Blanket? Yardage Guide | `Hvor mye garn trenger du til et teppe?` | `hvor-mye-garn-til-teppe` |
| Yarn Weight Substitution: When and How | `Bytte garntykkelse i en strikkeoppskrift` | `bytte-garntykkelse-i-strikkeoppskrift` |
| How Much Yarn for a Sweater? Yardage Guide | `Hvor mye garn trenger du til en genser?` | `hvor-mye-garn-til-genser` |

## SEO And Frontmatter

Norwegian SEO metadata should be written for Norwegian search behavior, not mechanically translated.

Rules:

- Keep titles clear and within the existing project SEO length style where possible.
- Put the main Norwegian search term early.
- Use `strikkefasthet`, `prøvelapp`, `pinnestørrelse`, `garntykkelse`, `strikkeoppskrift`, `garnmengde`, and `strikkekalkulator` consistently.
- Keep `translationKey` identical to the English source.
- Use `draft: true` for unreviewed Norwegian articles.
- Do not add an unreviewed article to `articleTranslations`.
- Preserve dates from the English source unless the project workflow says otherwise.

Example frontmatter direction:

```yaml
title: "Slik måler du strikkefasthet"
description: "Lær hvordan du måler masker og pinner over 10 cm, justerer pinnestørrelsen og får prøvelappen til å stemme med oppskriften."
lang: no
translationKey: how-to-measure-knitting-gauge
draft: true
tags:
  - strikkefasthet
  - prøvelapp
  - pinnestørrelse
  - strikkeoppskrift
```

If the implementation chooses `nb` instead of `no` as the content language key, update all TypeScript unions, route helpers, collection filters, and page folders consistently.

## Translation Workflow

Before translating:

1. Read the English source page.
2. Check whether Finnish, Swedish, or German translations already exist for structure and internal-link decisions, but do not translate from them.
3. Identify the core knitting concepts and lock terms from this guide.
4. Search existing Norwegian files once they exist, so terms do not drift.

During translation:

1. Keep the English content structure.
2. Translate headings, SEO fields, UI labels, tables, FAQ questions, examples, and schema strings.
3. Preserve tool behavior and JavaScript logic.
4. Convert visible measurements to metric-first Norwegian format.
5. Keep machine-readable values unchanged unless the code explicitly supports localized formatting.
6. Replace internal links only when the Norwegian target page exists and is publishable. Otherwise link to the English original or leave the existing safe path according to the implementation pattern.

After translation:

1. Check every use of `gauge`, `swatch`, `cast on`, `bind off`, `yarn weight`, `yardage`, `needle size`, `row`, and `round`.
2. Check decimal commas in prose and UI text.
3. Check slugs for ASCII transliteration.
4. Check that draft articles are hidden in production.
5. Run `npm run build` after implementation work.
6. Do not deploy or publish until the user approves.

## Implementation Notes For This Repo

The current project has localized implementations for Finnish, German, and Swedish. Norwegian should follow that architecture rather than introducing a separate pattern.

Expected code areas when implementation starts:

- `src/i18n/config.ts`: add Norwegian language key and locale mapping.
- `src/i18n/routes.ts`: add Norwegian tool, article, and category paths.
- `src/i18n/ui.ts`: add Norwegian shared UI strings.
- `src/i18n/articles.ts`: add Norwegian article helpers only when needed; keep draft articles out of public alternates.
- `src/lib/categories.ts`: add Norwegian category labels/descriptions and update function types.
- `src/pages/no/verktoy/`: add tool pages.
- `src/pages/no/artikler/`: add Norwegian article listing/category/detail pages when article work begins.
- `src/content/articles/no/`: add Norwegian article markdown files as drafts until reviewed.

Use existing shared components:

- `LocalizedToolPage.astro` for localized tool pages.
- `WpiIdentifier.astro` for yarn-weight pages, so WPI logic is not copied per language.
- Existing calculator components where behavior is shared.

Do not duplicate calculator logic, WPI logic, or category data. Extend the shared sources of truth.

## Common Pitfalls

- `row` is usually not `rad` in Norwegian knitting. Use `pinne` or `omgang`.
- `pattern` is not always `mønster`. Use `strikkeoppskrift` for the full instruction.
- `needle` is not `nål` in knitting context. Use `pinne`.
- `yarn weight` is not `garnvekt`. Use `garntykkelse`.
- `yardage` is not always `løpelengde`. Use `løpelengde` for label length, but `garnmengde`, `garnforbruk`, or `garnbehov` for project amount.
- `hat` is `lue`, not `hatt`.
- `DPNs` are `strømpepinner`.
- Decimal points in prose are wrong for Norwegian. Use `2,5 mm`, not `2.5 mm`.
- Do not use darkly formal or machine-translated phrasing such as `utfør beregningen`, `initier prosjektet`, or `optimaliser din strikkeopplevelse`.

## Source-Based Term Evidence

These sources informed the term choices. Re-check them if a term decision becomes uncertain:

- DROPS / Garnstudio, `strikkefasthet`, `strikkeprøve`, `masker`, `pinner`, and `10 x 10 cm`: https://www.garnstudio.com/lesson.php?cid=1&id=25&page=9
- Strikkeskolen, `strikkefasthet`, `prøvelapp`, `pinner/omganger`, and measuring over 10 cm: https://www.strikkeskolen.no/for-du-begynner/strikkefasthet/
- Sense Garn strikkeskole, basic technique wording like `legge opp masker`, `strikke rett og vrang`, and `felle av`: https://www.sensegarn.no/strikkeskolen/
- Vogue Knitting English-Norwegian term list for core terms such as `strikkefasthet`, `prøvelapp`, `legg opp`, and `felle av`: https://www.vogueknitting.com/pattern-help/international-knitting-terms/english-norwegian/
- DROPS garngrupper for `garntykkelse`, `garngruppe`, `løpelengde`, and international yarn category names: https://www.garnstudio.com/yarn-groups.php?cid=1
- Strikketips yarn calculator usage for `garnkalkulator`, `garnmengde`, and `løpelengde`: https://strikketips.no/verktoy/garnkalkulator/
- PetiteKnit Norwegian pages for natural garment copy, `bevegelsesvidde`, `overvidde`, `bærestykke`, `vendepinner`, and `strikkefasthet`: https://www.petiteknit.com/no/products/caramel-sweater
- Adlibris guide for Norwegian `blokking` usage: https://www.adlibris.com/nb/artikler/blokking-og-vask-av-strikkede-plagg
- Sprakradet on decimal comma: https://sprakradet.no/spraksporsmal-og-svar/desimaltegn-1-5-eller-15/
- Sprakradet on thousands separators: https://sprakradet.no/spraksporsmal-og-svar/10-000-eller-10000/
- Store norske leksikon on spacing between number and unit: https://snl.no/m%C3%A5ltall
- Google Search Central on hreflang requirements and bidirectional alternates: https://developers.google.com/search/docs/specialty/international/localized-versions
