# KnitTools Dutch Translation Guide

Last updated: 2026-05-13

This guide is the working reference for translating KnitTools from English into Dutch. Use it before translating Dutch tool pages, UI strings, article pages, categories, SEO metadata, internal links, and route slugs.

## Language Choice

Use natural Standard Dutch for knitters in the Netherlands and Belgium.

Recommended technical convention:

- Public URL prefix: `/nl/`
- Human-facing language name: `Nederlands`
- Rendered language and hreflang target: `nl`
- Units: metric-first, with Dutch/European number formatting

Write for Dutch-speaking knitters who read patterns, yarn labels, yarn-shop pages, and knitting blogs in Dutch. Do not write generic translated marketing copy.

## Publication Rule

Do not publish Dutch pages before the user has reviewed and approved them.

When adding Dutch articles, keep them as `draft: true` until review is complete. Do not add Dutch article paths to `articleTranslations` if that would expose hreflang links to unpublished pages.

The first implementation pass should translate the English tool pages. Translate articles later in reviewed batches.

## Core Principles

- Translate from the English original as the source of truth.
- Preserve the same meaning, structure, examples, caveats, tables, FAQ items, and practical detail.
- Do not add extra advice, SEO filler, marketing fluff, or generic explanatory paragraphs.
- Keep the same level of certainty as the English source.
- Use natural Dutch knitting terms, even when they are not literal translations.
- Use metric and European conventions first.
- Keep KnitTools as the brand name.
- Keep the tone practical, direct, and slightly opinionated where the English source is opinionated.
- Avoid AI-generic phrasing such as `til je breiwerk naar een hoger niveau`, `laat je creativiteit de vrije loop`, `perfect voor elk niveau`, `jouw ideale metgezel`, `naadloze ervaring`, `moeiteloos`, `ontdek de magie van`, and similar filler.

## Dutch Voice

Use:

- `je`, `jij`, `jou`, `jouw` in article prose and explanatory tool copy
- neutral infinitives for compact UI buttons: `Berekenen`, `Schatten`, `Bekijken`
- short active sentences
- concrete knitting verbs: `breien`, `opzetten`, `afkanten`, `meerderen`, `minderen`, `steken opnemen`, `uithalen`, `blocken`, `opspannen`
- concrete nouns: `steken`, `toeren`, `proeflapje`, `garen`, `bol`, `breinaalden`, `breipatroon`
- pattern-style phrasing when explaining a technique

Avoid:

- formal `u` in article prose unless quoting or preserving a source phrase
- overly polite UI phrasing like `gelieve` or `alstublieft`
- English syntax with Dutch words
- translating every occurrence of English `pattern` as `patroon` without context; use `breipatroon` for full instructions and `steekpatroon`, `motief`, or `telpatroon` for stitch patterns/charts
- using `wol` when the fiber is not wool and precision matters; use `garen` as the generic term
- overusing English terms where Dutch knitters have a standard term

## Units And Number Formatting

Use European units as primary:

- `cm` for widths, lengths, and body measurements
- `mm` for needle sizes
- `m` for yarn length
- `g` for yarn weight
- `10 x 10 cm` for gauge areas
- `meter` in prose, `m` in compact tables and labels
- `steken per 10 cm` and `toeren per 10 cm` for gauge values

Dutch number formatting:

- Use decimal comma in prose and user-facing copy: `3,5 mm`, `21,5 steken`
- Keep decimal points only in code, data attributes, JSON, JavaScript, and other machine-readable values
- Use a space between number and unit: `10 cm`, `50 g`, `120 m`
- Use spaces, not commas, as thousands separators in prose: `1 200 m`
- Avoid a period as a thousands separator in KnitTools copy because the site is international and a period can be confused with an English decimal point

When the English source uses inches or yards:

- Convert or foreground metric for Dutch readers.
- Keep inches/yards only when the page is explicitly about conversion, US/UK sizing, WPI, or when a tool label must support both systems.
- In prose, prefer `10 cm`; in compact conversion labels, `4 in` can remain if the English source/tool needs it.
- If converting values, keep the source intent and use `ongeveer` where the converted value is rounded.

Examples:

- English `Gauge (stitches per 10 cm / 4 in)` -> `Stekenverhouding (steken per 10 cm / 4 in)`
- English `4.5 mm needle` -> `breinaald 4,5 mm` or `naald 4,5 mm`
- English `150 yards per skein` -> `ongeveer 137 m per bol` if converted, or keep `150 yards` only in a conversion context

## Essential Term Decisions

| English concept | Dutch term to use | Notes |
|---|---|---|
| knitting | `breien` | General craft. |
| to knit | `breien` | |
| knitter | `breier`, `breister`, `wie breit`, `breiers` | Prefer neutral sentence structure when possible. |
| knitting pattern | `breipatroon` | Use for the full instructions. |
| pattern / stitch pattern | `steekpatroon`, `motief`, `patroon` | Use for texture, chart, motif, lace, cables, or colorwork. |
| chart | `telpatroon`, `breischema` | `telpatroon` is very natural in pattern reading; `breischema` works in explanatory text. |
| gauge | `stekenverhouding` | Locked primary term. Do not use literal `gauge` except in search-friendly parentheses if needed. |
| gauge swatch | `proeflapje`, `proeflap` | Use `proeflapje` in friendly/tutorial copy. `stekenproef` appears in Dutch sources but should not replace `proeflapje` as the physical swatch term. |
| gauge test | `stekenproef`, `proeflapje` | Use `stekenproef` when the sentence is about testing gauge rather than the little swatch itself. |
| stitch | `steek` | Abbrev: `st`. |
| stitches | `steken` | |
| stitch count | `aantal steken`, `stekenaantal` | `aantal steken` is usually more natural in prose. |
| row | `toer`, `naald` | Use `toer` in articles/UI. Use `naald` in pattern-like flat-knitting instructions if it reads more natural. |
| round | `toer`, `toer in het rond` | Use `toer in het rond` when row/round ambiguity matters. |
| rows/rounds when both apply | `toeren` | Useful for app/tool copy and row counters. |
| cast on | `steken opzetten` | Noun: `opzet`, `opzetrand`. |
| bind off / cast off | `afkanten` | Noun: `afkanten`, edge: `afkantrand`. |
| increase | `meerderen`, `meerdering` | |
| decrease | `minderen`, `mindering` | |
| increase/decrease evenly | `meerderingen/minderingen gelijkmatig verdelen` | Pattern-style: `verdeeld meerderen/minderen`. |
| yarn | `garen` | Use `wol` only for wool or broad search phrases where Dutch knitters naturally say `wol en garen`. |
| yarn weight | `garendikte` | Do not use `garengewicht`; that sounds like physical weight in grams. |
| yarn weight chart | `Garendiktes`, `Tabel met garendiktes` | Tool title can be concise. |
| yarn amount / project yardage | `garenverbruik`, `benodigde meters`, `benodigde hoeveelheid garen` | Choose by sentence. |
| yardage on label | `looplengte` | Label concept: meters per ball/skein/weight. |
| skein / ball | `bol`, `bol garen` | Use `streng` only for an actual hank/skein. |
| hank | `streng` | |
| yarn label | `garenlabel`, `wikkel`, `banderol` | `garenlabel` is plain; `wikkel`/`banderol` are label-specific. |
| fiber content | `vezelsamenstelling`, `samenstelling` | Use `samenstelling` in compact label copy. |
| dye lot | `verfbad`, `lotnummer`, `kleurbad` | Prefer `verfbad` in tutorials; use `lotnummer` if the label wording does. |
| color number | `kleurnummer`, `kleurcode` | |
| care instructions | `wasvoorschrift`, `onderhoudsinstructies` | `wasvoorschrift` is natural for yarn labels. |
| needle | `breinaald`, `naald` | In context, `naald` is enough. |
| needle size | `naalddikte`, `naaldmaat` | Use `naalddikte` for mm-based tools and labels. |
| needle size chart | `Naalddiktes`, `Tabel met naalddiktes` | Tool title can be concise. |
| circular needle | `rondbreinaald` | Plural: `rondbreinaalden`. |
| straight needles | `rechte breinaalden` | |
| DPNs / double-pointed needles | `sokkennaalden`, `sokkenbreinaalden`, `breinaalden zonder knop` | Use `sokkennaalden` in normal copy. Mention `breinaalden zonder knop` when matching shop/pattern terminology. |
| cable needle | `kabelnaald` | |
| crochet hook | `haaknaald` | For dropped-stitch repairs. |
| stitch marker | `stekenmarkeerder`, `markeerder` | |
| row counter | `toerenteller` | App/tool term. Explain that it tracks flat rows and rounds when necessary. |
| pattern viewer | `patroonviewer`, `PDF-weergave`, `patroonweergave` | Choose based on actual feature context. |
| project | `project`, `breiproject` | |
| stash | `garenvoorraad` | Avoid untranslated `stash` unless discussing English app terms. |
| leftovers / scrap yarn | `restgaren`, `garenrestjes` | |
| right side | `goede kant` | Abbrev: `GK`. |
| wrong side | `verkeerde kant` | Abbrev: `VK`. |

## Stitch And Technique Terms

| English concept | Dutch term to use | Notes |
|---|---|---|
| knit stitch | `rechte steek` | Abbrev: `r`. |
| purl stitch | `averechte steek` | Abbrev: `av`. |
| knit | `recht breien` | |
| purl | `averecht breien` | |
| stockinette stitch | `tricotsteek` | Flat knitting: one row knit, one row purl. |
| reverse stockinette | `omgekeerde tricotsteek` | |
| garter stitch | `ribbelsteek` | |
| ribbing | `boordsteek`, `boord` | Use `boord` for cuffs/hems; `boordsteek` for the stitch pattern. |
| seed stitch | `gerstekorrelsteek` | Names vary between US/UK sources; trust the stitch definition. |
| moss stitch | `dubbele gerstekorrel`, `rijstekorrel` | Choose by source definition; do not rely on the English name alone. |
| cable | `kabel`, `kabelpatroon` | |
| lace | `ajour`, `kantpatroon` | Use `ajour` for eyelet/lace stitch patterns. Keep `Lace` only for yarn category if needed. |
| colorwork | `kleurwerk`, `jacquard`, `inbreien` | Use `kleurwerk` broadly; `jacquard`/`inbreien` for stranded pattern contexts. |
| stranded colorwork | `inbreien`, `jacquard breien`, `kleurwerk met meeloopdraden` | Use explanatory phrasing if the source explains floats. |
| edge stitch | `kantsteek` | |
| stitch repeat | `rapport`, `patroonherhaling` | `rapport` is pattern language; `patroonherhaling` is clearer in tutorials. |
| repeat | `herhalen`, `herhaling` | |
| asterisks and brackets | `sterretjes en haakjes` | Use exact punctuation from source: brackets, parentheses, or asterisks. |
| k2tog | `2 steken recht samenbreien`, `2rsm` | In glossary entries, keep `k2tog` plus Dutch expansion if source includes the abbreviation. |
| p2tog | `2 steken averecht samenbreien`, `avsm` | |
| ssk | `ssk`, `AAB`, `afhalen, afhalen, breien` | Dutch sources vary. If the English article discusses SSK, keep `ssk` and explain. |
| psso / SKP | `afgehaalde steek overhalen`, `overhalen` | |
| yarn over | `omslag` | Abbrev: `o` in compact tables if needed. |
| twisted stitch | `gedraaide steek` | |
| slip stitch | `steek afhalen`, `afgehaalde steek` | Specify `recht afhalen` or `averecht afhalen` when relevant. |
| pick up stitches | `steken opnemen` | Along an edge: `steken opnemen langs de rand`. |
| dropped stitch | `gevallen steek`, `een steek laten vallen` | Use `gevallen steek` for the problem; `een steek laten vallen` for the action. |
| fix dropped stitch | `een gevallen steek ophalen`, `een gevallen steek herstellen` | |
| ladder | `ladder`, `ladder van draadjes`, `losgeraakte kolom` | Choose by context; explain visually if clearer. |
| frog / rip back | `uithalen`, `uittrekken` | Use `uithalen` in polished copy. |
| tink | `terugsteken`, `steek voor steek terugbreien` | Explain if needed. |
| lifeline | `hulpdraad`, `lifeline` | Prefer `hulpdraad`; first use can include `(lifeline)` if source uses the English term. |
| join new ball | `nieuw garen aanhechten`, `een nieuwe bol beginnen`, `een nieuwe bol garen aanhechten` | Choose by sentence. |
| weave in ends | `draadjes wegwerken`, `draadjes afwerken` | Not a literal weaving translation. |
| seam pieces | `delen aan elkaar naaien`, `breidelen aan elkaar naaien`, `in elkaar zetten` | |
| mattress stitch | `matrassteek` | |
| whip stitch | `overhandse steek` | If needed. |
| three-needle bind off | `afkanten met drie naalden` | Explain on first use. |
| Kitchener stitch | `Kitchener stitch`, `maassteek` | Dutch usage varies. Keep the English name if the source uses it and explain. |
| block / blocking | `blocken`, `opspannen`, `in vorm brengen` | Use the method that matches the source. `Opspannen` is natural when pinning out. |
| wet blocking | `nat blocken`, `nat opspannen` | |
| steam blocking | `met stoom blocken`, `stomen` | Preserve all source warnings. |
| spray blocking | `licht bevochtigen en opspannen`, `sprayblocken` | Prefer explanatory phrasing if it reads better. |

## Garment, Sock, And Fit Terms

| English concept | Dutch term to use | Notes |
|---|---|---|
| sweater | `trui` | Do not keep `sweater` unless part of a product name. |
| cardigan | `vest` | `Cardigan` can appear in style/product names, but `vest` is plain Dutch. |
| scarf | `sjaal` | |
| shawl | `omslagdoek`, `sjaal` | Use `omslagdoek` for triangular/large shawls. |
| blanket | `deken` | |
| throw blanket | `plaid`, `deken` | Choose by context. |
| hat | `muts` | Not `hoed` unless it is actually a hat with structure/brim. |
| beanie | `muts`, `beanie` | Prefer `muts` unless style matters. |
| sock | `sok` | |
| mitten | `want` | |
| fingerless mitt | `polswarmer`, `vingerloze want` | Choose by item. |
| cuff | `boord`, `manchet` | Use `boord` for knitted rib cuffs. |
| sleeve | `mouw` | |
| yoke | `pas`, `ronde pas` | |
| raglan | `raglan` | |
| body | `lijf`, `pand` | Sweater body; choose by sentence. |
| front piece | `voorpand` | |
| back piece | `achterpand` | |
| neckline | `halslijn`, `halsrand` | |
| armhole | `armsgat` | |
| sock cuff | `boord` | |
| sock leg | `schacht`, `been` | `Schacht` is pattern language; `been` can read clearer in beginner copy. |
| heel | `hiel` | |
| heel flap | `hielflap` | |
| heel turn | `hielbocht`, `hiel keren` | Choose by source method. |
| gusset | `spie` | Sock context. |
| foot | `voet` | |
| sole | `zool` | |
| toe | `teen`, `teenstuk` | |
| toe-up | `vanaf de teen`, `toe-up` | If the source discusses the construction name, keep `toe-up` in parentheses. |
| cuff-down | `vanaf de boord`, `cuff-down` | If the source discusses the construction name, keep `cuff-down` in parentheses. |
| crown shaping | `minderingen bovenop de muts`, `topminderingen` | For hats. |
| chest / bust measurement | `borstomtrek` | |
| waist measurement | `tailleomtrek` | |
| hip measurement | `heupomtrek` | |
| finished measurements | `afgewerkte maten`, `afmetingen van het afgewerkte kledingstuk` | |
| body measurements | `lichaamsmaten` | |
| ease | `bewegingsruimte`, `overwijdte` | Use `bewegingsruimte` in explanatory articles; mention `positive ease` if the English source does. |
| positive ease | `positieve bewegingsruimte`, `positive ease` | First use can include the English term in parentheses. |
| negative ease | `negatieve bewegingsruimte`, `negative ease` | |
| fit | `pasvorm` | |
| oversized | `oversized`, `ruimvallend` | Use `oversized` if it is a style term. |
| drape | `valling`, `hoe soepel het breisel valt` | Avoid forced literal translations. |

## Yarn Weight Categories

Dutch knitting sources often keep international yarn category names and explain them through `garendikte`, `stekenverhouding`, `naalddikte`, and `looplengte`.

Use these display names:

| English category | Dutch display |
|---|---|
| Lace | `Lace` |
| Super Fine / Fingering | `Fingering / sokkengaren` |
| Sport | `Sport` |
| DK / Light | `DK / Light Worsted` |
| Worsted / Medium | `Worsted / Aran / Medium` |
| Bulky | `Bulky / Chunky` |
| Super Bulky | `Super Bulky / Super Chunky` |
| Jumbo | `Jumbo` |

Guidelines:

- Use `garendikte` as the concept.
- Keep `DK`, `Worsted`, `Aran`, `Fingering`, `Lace`, `Bulky`, and `Chunky` as category names.
- Use `sokkengaren` only when the context is typical sock yarn; not every fingering yarn is sock yarn.
- Explain WPI as `wraps per inch (WPI)` on first use, then `WPI`. If explaining in Dutch, use `wikkelingen per inch`, but keep `WPI` because the measurement itself is inch-based.
- Prefer meters per 50 g or 100 g where the source allows it.

## Tool Names And Route Shape

Recommended Dutch tool names and public routes:

| English | Dutch title | Recommended route |
|---|---|---|
| Free Knitting Tools | `Gratis breitools` or `Gratis breirekenaars en tabellen` | `/nl/breitools/` |
| Cast On Calculator | `Opzetcalculator` | `/nl/breitools/opzetcalculator/` |
| Yarn Estimator | `Garenberekenaar` or `Garenverbruik berekenen` | `/nl/breitools/garenberekenaar/` |
| Needle Size Chart | `Naalddiktes` | `/nl/breitools/naalddiktes/` |
| Yarn Weight Chart | `Garendiktes` | `/nl/breitools/garendiktes/` |
| Knitting Abbreviations | `Breiafkortingen` | `/nl/breitools/breiafkortingen/` |
| Knitting Size Charts | `Maattabellen voor breien` | `/nl/breitools/maattabellen-breien/` |
| Articles | `Artikelen` | `/nl/artikelen/` |

Recommended category routes:

| English category | Dutch label | Recommended route |
|---|---|---|
| Gauge & Calculations | `Stekenverhouding en berekeningen` | `/nl/artikelen/categorie/stekenverhouding-berekeningen/` |
| Yarn | `Garen` | `/nl/artikelen/categorie/garen/` |
| Needles | `Breinaalden` | `/nl/artikelen/categorie/breinaalden/` |
| Techniques | `Technieken` | `/nl/artikelen/categorie/technieken/` |
| App & Tools | `App en tools` | `/nl/artikelen/categorie/app-en-tools/` |

Confirm final Dutch slugs before publishing.

## Common UI Labels

| English | Dutch |
|---|---|
| Tools | `Tools` or `Breitools` |
| Articles | `Artikelen` |
| All tools | `Alle tools` |
| All articles | `Alle artikelen` |
| Category | `Categorie` |
| Back to all tools | `Terug naar alle tools` |
| Back to all articles | `Terug naar alle artikelen` |
| Calculate | `Berekenen` |
| Estimate | `Schatten` |
| Reset | `Resetten` |
| Search | `Zoeken` |
| Filter by category | `Filteren op categorie` |
| No articles in this category yet. | `Er zijn nog geen artikelen in deze categorie.` |
| Stitches | `Steken` |
| Rows | `Toeren` |
| Gauge | `Stekenverhouding` |
| Width | `Breedte` |
| Length | `Lengte` |
| Needle size | `Naalddikte` |
| Yarn weight | `Garendikte` |
| Project type | `Projecttype` |

## App And Landing Page Terms

| English | Dutch |
|---|---|
| Android knitting app | `brei-app voor Android` |
| all-in-one knitting toolkit | `complete breitoolkit` |
| row counter | `toerenteller` |
| voice commands | `stemcommando's` |
| pattern viewer | `patroonviewer`, `patroonweergave` |
| AI help | `AI-hulp` |
| yarn label scanner | `garenlabelscanner` |
| AI yarn label scanner | `AI-garenlabelscanner` |
| calculators | `rekenaars`, `calculators` |
| project summaries | `projectsamenvattingen` |
| Ravelry integration | `Ravelry-integratie` |
| progress photos | `voortgangsfoto's` |
| offline access | `offline toegang`, `offline gebruiken` |
| one-time purchase | `eenmalige aankoop` |
| subscription | `abonnement` |
| no subscription | `geen abonnement` |
| free with ads | `gratis met advertenties` |
| 14-day trial | `proefperiode van 14 dagen` |

Use `rekenaars` in prose. `Calculators` can be used in SEO/tool labels if search intent clearly benefits from the English loanword.

## Article Title Starting Points

Use these as starting points, not final locked titles. Match the English article meaning and SEO length when translating.

| English article | Dutch title direction |
|---|---|
| At the Same Time in Knitting | `"Tegelijkertijd" in een breipatroon` |
| Best Knitting Apps: What to Look For | `Beste brei-apps: waar let je op?` |
| Best Yarn for Beginners: Practical Guide | `Het beste garen voor beginners` |
| Circular vs Straight vs DPN: When to Use Each | `Rondbreinaalden, rechte naalden of sokkennaalden?` |
| Digital vs Physical Row Counters Compared | `Digitale of mechanische toerenteller?` |
| Essential Knitting Tools Beyond Needles and Yarn | `Handige breihulpmiddelen naast naalden en garen` |
| How to Fix Dropped Stitches Without Frogging | `Een gevallen steek herstellen zonder uithalen` |
| Free Knitting Calculators Every Knitter Needs | `Gratis breirekenaars voor je projecten` |
| What Is Gauge in Knitting? | `Wat is stekenverhouding bij breien?` |
| How to Measure Knitting Gauge | `Stekenverhouding meten` |
| When Your Gauge Doesn't Match the Pattern | `Als je stekenverhouding niet klopt` |
| Knitting a Gauge Swatch. Step by Step | `Een proeflapje breien, stap voor stap` |
| How Many Stitches to Cast On (with Gauge) | `Hoeveel steken moet je opzetten?` |
| How Much Yarn Do I Need? Estimating Yardage | `Hoeveel garen heb je nodig?` |
| How to Block Knitting: Wet, Steam & Spray | `Breiwerk blocken: nat, stoom en spray` |
| How to Knit a Hat: Methods for Every Skill | `Een muts breien: verschillende methodes` |
| How to Knit Socks. Anatomy of a Sock Pattern | `Sokken breien: de opbouw van een sokpatroon` |
| How to Read a Yarn Label: Symbols Explained | `Een garenlabel lezen: symbolen uitgelegd` |
| How to Substitute Yarn in a Knitting Pattern | `Garen vervangen in een breipatroon` |
| How to Identify Mystery Yarn Without a Label | `Onbekend garen herkennen zonder label` |
| How to Increase or Decrease Evenly Across a Row | `Gelijkmatig meerderen of minderen over een toer` |
| How to Join a New Ball of Yarn | `Nieuw garen aanhechten midden in een toer` |
| How to Knit Your First Scarf | `Je eerste sjaal breien` |
| Knitting Needle Materials: Metal, Wood, Bamboo | `Breinaalden van metaal, hout en bamboe` |
| Knitting Pattern Repeats: Asterisks and Brackets | `Herhalingen in breipatronen` |
| Knitting Pattern Sizes and Fit | `Maten en pasvorm in breipatronen` |
| Needle Size for Beginners | `Welke naalddikte voor beginners?` |
| Organize Multiple Knitting Projects | `Meerdere breiprojecten organiseren` |
| How to Read a Knitting Pattern | `Een breipatroon lezen` |
| How to Pick Up Stitches | `Steken opnemen langs een gebreide rand` |
| How to Seam Knitted Pieces | `Breidelen aan elkaar naaien` |
| Track Knitting Time and Speed | `Breitijd en tempo bijhouden` |
| Track Rows in Knitting | `Toeren bijhouden tijdens het breien` |
| Why Knitting Curls | `Waarom krult breiwerk?` |
| Yarn Fibers Compared | `Garenvezels vergeleken` |
| How Much Yarn for a Blanket? | `Hoeveel garen voor een deken?` |
| How Much Yarn for a Sweater? | `Hoeveel garen voor een trui?` |
| Yarn Weight Substitution | `Een andere garendikte gebruiken` |

## Translation Workflow

1. Use the English page as the source of truth.
2. Check this guide before translating headings, UI labels, article metadata, FAQ copy, tables, and internal links.
3. Preserve content structure: headings, FAQ questions, examples, tables, calculators, and tool behavior must match the English page.
4. Localize units to European defaults and use decimal commas in user-facing text.
5. Use the Dutch knitting terms in this guide.
6. Avoid adding new tips, claims, examples, or SEO filler.
7. Keep article translations as drafts until reviewed.
8. Add Dutch routes and article translations only after the user approves the Dutch content for publication.
9. Run `npm run build` after implementation.
10. Do not deploy or publish until the user approves.

## Checks Before Marking A Dutch Translation Done

- Does every heading, paragraph, FAQ item, table row, and example preserve the English meaning?
- Are all measurements metric-first?
- Are decimal values written with commas in user-facing text?
- Are code/data values still machine-readable with decimal points where required?
- Is `stekenverhouding` used for gauge?
- Is `garendikte` used for yarn weight?
- Is `naalddikte` used for needle size?
- Is `toerenteller` used for row counter?
- Does the text sound like a Dutch knitter wrote it, not like a literal translation?
- Are article drafts still unpublished until review?

## Sources Checked For Terminology

Use these sources as terminology references, not as text to copy:

- Knitting-and.com English-Dutch knitting glossary: https://knitting-and.com/crafts-and-needlework/knitting/tips/knitting-glossaries/english-nederlands-dutch-knitting-glossary/
- DROPS Design Dutch yarn categories and pattern help: https://www.garnstudio.com/yarn-groups.php?cid=7
- DROPS Design Dutch pattern FAQ on `stekenverhouding`, `10 x 10 cm`, and `garenverbruik`: https://www.garnstudio.com/pattern.php?cid=7&id=9802
- Katia Dutch guide using `proeflapje`, `rondbreinaalden`, `stekenproef`, and `10x10 centimeter`: https://www.katia.com/blog/nl/proeflapje-sokken-breien/
- Breistudio Kim Dutch article on `proeflapje` and `stekenverhouding`: https://www.breistudiokim.nl/een-proeflapje-breien-stekenverhouding-berekenen-voor-beginners/
- Wolplein Dutch yarn-weight guide using `garendikte`, `stekenverhouding`, `naalddikte`, and meters per 50 g: https://www.wolplein.nl/blog/2237/garendiktes-yarn-weights-uitgelegd.html
- De Wolkast Dutch pattern-reading article with `breipatroon`, `stekenverhouding`, `r`, `av`, `2rsm`, `omslag`, and `toer`: https://www.dewolkast.nl/hoe-lees-je-een-breipatroon-duidelijke-uitleg-voor-beginners/
- MYPZ Dutch abbreviation guide with `r`, `av`, `r. samenbr`, `AAB`, `GK`, and `VK`: https://mypz.nl/blogs/faq/common-knitting-abbreviations
- Team Taaladvies on Dutch decimal comma and spacing for digit groups: https://www.vlaanderen.be/team-taaladvies/taaladviezen/decimale-getallen-notatie-decimaalteken-komma-punt
