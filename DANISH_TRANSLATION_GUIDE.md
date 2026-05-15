# KnitTools Danish Translation Guide

Last updated: 2026-05-14

This guide is the working reference for translating KnitTools from English into Danish. Use it before translating Danish tool pages, UI strings, article pages, categories, SEO metadata, internal links, and route slugs.

## Language Choice

Use natural Danish as used by knitters in Denmark.

Recommended technical convention:

- Public URL prefix: `/da/`
- Human-facing language name: `Dansk`
- Rendered language and hreflang target: `da`
- Units: metric-first, with Danish/European number formatting

Write for Danish knitters who read strikkeopskrifter, yarn labels, yarn-shop pages, designer pattern notes, and knitting blogs in Danish. Do not write generic translated marketing copy.

## Publication Rule

Do not publish Danish pages before the user has reviewed and approved them.

When adding Danish articles, keep them as `draft: true` until review is complete. Do not add Danish article paths to `articleTranslations` if that would expose hreflang links to unpublished pages.

The first implementation pass should translate the English tool pages. Translate articles later in reviewed batches.

## Core Principles

- Translate from the English original as the source of truth.
- Preserve the same meaning, structure, examples, caveats, tables, FAQ items, and practical detail.
- Do not add extra advice, SEO filler, marketing fluff, or generic explanatory paragraphs.
- Keep the same level of certainty as the English source.
- Use natural Danish knitting terms, even when they are not literal translations.
- Use metric and European conventions first.
- Keep KnitTools as the brand name.
- Keep the tone practical, direct, and slightly opinionated where the English source is opinionated.
- Avoid AI-generic phrasing such as `løft dit strik til næste niveau`, `perfekt til alle niveauer`, `slip kreativiteten løs`, `din ultimative følgesvend`, `en sømløs oplevelse`, `magien ved strik`, and similar filler.

## Danish Voice

Use:

- `du`, `dig`, `dit`, `din`
- short active sentences
- concrete knitting verbs: `strikke`, `slå masker op`, `lukke af`, `tage ud`, `tage ind`, `samle masker op`, `trevle op`, `blokke`
- concrete nouns: `masker`, `pinde`, `omgange`, `strikkeprøve`, `garn`, `nøgle`, `strikkeopskrift`
- pattern-style phrasing where the page explains techniques

Avoid:

- formal `De`
- overly polite UI phrasing like `venligst` unless the sentence genuinely needs it
- English syntax with Danish words
- translating every occurrence of English `pattern` as `mønster`; use `strikkeopskrift` for the full instruction and `mønster`, `struktur`, `diagram`, or `rapport` for stitch patterns, motifs, charts, and repeats
- using `uld` when the fiber is not wool and precision matters; use `garn` as the generic term
- keeping English craft terms where Danish knitters have a normal term

## Units And Number Formatting

Use European units as primary:

- `cm` for widths, lengths, and body measurements
- `mm` for needle sizes
- `m` for yarn length
- `g` for yarn weight
- `10 x 10 cm` for gauge areas
- `meter` in prose, `m` in compact tables and labels
- `masker pr. 10 cm` and `pinde pr. 10 cm` for gauge values

Danish number formatting:

- Use decimal comma in prose and user-facing copy: `3,5 mm`, `21,5 masker`
- Keep decimal points only in code, data attributes, JSON, JavaScript, and other machine-readable values
- Use a space between number and unit: `10 cm`, `50 g`, `120 m`
- Use spaces, not commas, as thousands separators in prose: `1 200 m`
- Avoid a period as a thousands separator in KnitTools copy because the site is international and a period can be confused with an English decimal point

When the English source uses inches or yards:

- Convert or foreground metric for Danish readers.
- Keep inches/yards only when the page is explicitly about conversion, US/UK sizing, WPI, or when a tool label must support both systems.
- In prose, prefer `10 cm`; in compact conversion labels, `4 in` can remain if the English source/tool needs it.
- If converting values, keep the source intent and use `ca.` where the converted value is rounded.

Examples:

- English `Gauge (stitches per 10 cm / 4 in)` -> `Strikkefasthed (masker pr. 10 cm / 4 in)`
- English `4.5 mm needle` -> `pind 4,5 mm` or `strikkepind 4,5 mm`
- English `150 yards per skein` -> `ca. 137 m pr. nøgle` if converted, or keep `150 yards` only in a conversion context

## Essential Term Decisions

| English concept | Danish term to use | Notes |
|---|---|---|
| knitting | `strik`, `strikning` | `Strik` is natural in headings and compounds; `strikning` works as the general craft. |
| to knit | `strikke` | |
| knitter | `strikker`, `den der strikker`, `strikkere` | Prefer neutral sentence structure when possible. |
| knitting pattern | `strikkeopskrift` | Use for the full instructions. |
| pattern / stitch pattern | `mønster`, `struktur`, `maskemønster` | Use for texture, motif, stitch pattern, lace, cables, or colorwork. |
| chart | `diagram` | In knitting-pattern context. |
| gauge | `strikkefasthed` | Locked primary term. |
| gauge swatch | `strikkeprøve`, `prøvelap` | Use `strikkeprøve` in tool/article copy; `prøvelap` is acceptable as a synonym. |
| gauge test | `strikkeprøve`, `tjekke strikkefastheden` | Use the verb phrase when it reads better. |
| stitch | `maske` | Abbrev: `m`. |
| stitches | `masker` | |
| stitch count | `maskeantal`, `antal masker` | `antal masker` is often clearer in prose. |
| row | `pind`, `række` | Use `pind` in pattern-like flat-knitting contexts; use `række` only when plain UI wording needs it or the source is non-pattern prose. |
| round | `omgang` | Abbrev: `omg`. |
| rows/rounds when both apply | `pinde og omgange` | Useful for row-counter/app copy. |
| cast on | `slå masker op` | Noun: `opslag`, `opslåningskant`. |
| bind off / cast off | `lukke af` | Noun: `aflukning`, edge: `aflukningskant`. |
| increase | `tage ud`, `udtagning` | |
| decrease | `tage ind`, `indtagning` | `Lukke af` is not a normal decrease. |
| increase/decrease evenly | `tage ud/ind jævnt fordelt` | Pattern-style: `udtagninger/indtagninger jævnt fordelt`. |
| yarn | `garn` | Do not use `uld` unless the fiber is wool. |
| yarn weight | `garntykkelse`, `garnets tykkelse` | Avoid `garnvægt`; it sounds like physical weight in grams. |
| yarn weight chart | `Garntykkelser`, `Tabel over garntykkelser` | Tool title can be concise. |
| yarn amount / project yardage | `garnforbrug`, `garnmængde`, `hvor meget garn` | Choose by sentence. |
| yardage on label | `løbelængde` | Label concept: meters per skein/weight. |
| skein / ball | `nøgle`, `garnnøgle` | Use `fed` only for an actual hank/skein. |
| hank | `fed` | |
| yarn label | `banderole`, `garnlabel` | `Banderole` is natural for yarn labels; `garnlabel` is plain UI language. |
| fiber content | `fiberindhold`, `sammensætning` | Use `fiberindhold` in plain prose. |
| dye lot | `farveparti`, `indfarvningsparti`, `parti` | Use the label wording if the article shows a label. |
| color number | `farvenummer`, `farvekode` | |
| care instructions | `vaskeanvisning`, `vaskeinstruktioner` | `Vaskeanvisning` is natural on labels. |
| needle | `pind`, `strikkepind` | In context, `pind` is enough. |
| needle size | `pindestørrelse`, `pindetykkelse`, `pind nr.` | Use `pindestørrelse` in tools/SEO; `pind nr.` in pattern-like examples. |
| needle size chart | `Pindestørrelser`, `Tabel over pindestørrelser` | Tool title can be concise. |
| circular needle | `rundpind` | |
| straight needles | `jumperpinde`, `lige strikkepinde` | `Jumperpinde` is the Danish shop/pattern term; use `lige strikkepinde` if beginners need clarity. |
| DPNs / double-pointed needles | `strømpepinde` | Do not translate literally. |
| cable needle | `snoningspind`, `hjælpepind` | `Snoningspind` for cable tool; `hjælpepind` more general. |
| crochet hook | `hæklenål` | For dropped-stitch repairs. |
| stitch marker | `maskemarkør`, `markør` | Abbrev: `mm` can mean maskemarkør in pattern context; avoid ambiguity with millimeters in UI. |
| row counter | `omgangstæller`, `pindetæller`, `rækketæller` | For KnitTools app/tool copy, prefer `omgangstæller` and explain that it tracks `pinde og omgange`. |
| pattern viewer | `opskriftsvisning`, `PDF-visning` | Choose based on actual feature context. |
| project | `projekt`, `strikkeprojekt` | |
| stash | `garnlager`, `garnbeholdning` | Avoid untranslated `stash` unless discussing English app terms. |
| leftovers / scrap yarn | `restegarn`, `garnrester` | |
| right side | `retsiden` | Abbrev: `rs`. |
| wrong side | `vrangsiden` | Abbrev: `vs`. |

## Stitch And Technique Terms

| English concept | Danish term to use | Notes |
|---|---|---|
| knit stitch | `retmaske` | Abbrev: `r`. |
| purl stitch | `vrangmaske` | Abbrev: `vr`. |
| knit | `strikke ret` | |
| purl | `strikke vrang` | |
| stockinette stitch | `glatstrik` | Flat knitting: ret på retsiden, vrang på vrangsiden. |
| reverse stockinette | `omvendt glatstrik` | |
| garter stitch | `retstrik` | |
| ribbing | `rib`, `ribkant` | Use `ribkant` for cuffs/hems. |
| seed stitch | `perlestrik` | |
| moss stitch | `perlestrik`, `dobbelt perlestrik` | Check the stitch definition; English naming varies. |
| brioche | `patentstrik` | Use `halvpatent` when source specifies half brioche. |
| cable | `snoning`, `snoningsmønster` | |
| lace | `hulmønster`, `blondestrik` | Keep `Lace` only for yarn category if needed. |
| colorwork | `mønsterstrik`, `flerfarvestrik` | Choose by context. |
| stranded colorwork | `mønsterstrik`, `flerfarvestrik med flotteringer` | Use explanatory phrasing if the source discusses floats. |
| float | `flottering` | Common Danish colorwork term. |
| edge stitch | `kantmaske` | Abbrev: `km`. |
| stitch repeat | `rapport`, `mønsterrapport`, `gentagelse` | `Rapport` is pattern language; `gentagelse` is clearer for beginners. |
| repeat | `gentage`, `gentagelse` | Abbrev: `gent`. |
| asterisks and brackets | `stjerner og parenteser/klammer` | Match the exact punctuation used in the English source. |
| k2tog | `2 masker ret sammen`, `2 r sm` | In glossary entries, keep `k2tog` plus Danish expansion if source includes the abbreviation. |
| p2tog | `2 masker vrang sammen`, `2 vr sm` | |
| ssk | `ssk`, `venstrehældende indtagning` | Danish sources vary; keep `ssk` and explain rather than inventing a new abbreviation. |
| psso / SKP | `træk den løse maske over`, `overtrækning` | |
| yarn over | `slå om`, `omslag` | Abbrev: `omsl` in some patterns. |
| twisted stitch | `drejet maske`, `drejet ret`, `drejet vrang` | |
| through back loop | `i bagerste maskeled`, `drejet` | Choose by source wording. |
| slip stitch | `tage en maske løst af`, `løs maske` | Specify ret/vrang løs af when relevant. |
| pick up stitches | `samle masker op`, `strikke masker op` | Along an edge: `samle masker op langs kanten`. |
| dropped stitch | `tabt maske`, `løbet maske` | Use `tabt maske` for the problem; `løbet maske` when the stitch has run down. |
| fix dropped stitch | `samle en tabt maske op`, `redde en tabt maske` | |
| ladder | `stige`, `lænker`, `løse tråde` | Use visual explanation if needed. |
| frog / rip back | `trevle op`, `pille op` | `Trevle op` is polished; `pille op` is informal/natural. |
| tink | `strikke baglæns`, `pille masker op en ad gangen` | Explain if needed. |
| lifeline | `livline`, `hjælpetråd` | First use can include both. |
| join new ball | `sætte et nyt nøgle til`, `starte på et nyt nøgle`, `hæfte nyt garn på` | Choose by sentence. |
| weave in ends | `hæfte ender`, `hæfte tråde` | Not a literal weaving translation. |
| seam pieces | `sy strikkede dele sammen`, `montere strik` | |
| mattress stitch | `madrassting` | |
| whip stitch | `kastesting` | If needed. |
| three-needle bind off | `aflukning med tre pinde` | Explain on first use. |
| Kitchener stitch | `maskesting`, `Kitchener stitch` | Use `maskesting`; keep English name if the source uses it. |
| block / blocking | `blokke`, `blokning`, `spænde op` | `Blokke` and `blokning` are common; `spænde op` when pinning/shaping is central. |
| wet blocking | `vådblokning`, `våd blokning` | |
| steam blocking | `dampblokning`, `dampe` | Preserve all source warnings. |
| spray blocking | `sprayblokning`, `fugte og spænde op` | Prefer explanatory phrasing if it reads better. |

## Garment, Sock, And Fit Terms

| English concept | Danish term to use | Notes |
|---|---|---|
| sweater | `sweater`, `trøje` | `Sweater` is common in Danish pattern titles; `trøje` is plain Danish. |
| pullover | `sweater`, `trøje` | |
| cardigan | `cardigan`, `strikkejakke` | `Cardigan` is common in patterns; `strikkejakke` reads more plain. |
| slipover | `slipover`, `vest` | Use source-specific style. |
| scarf | `tørklæde` | |
| shawl | `sjal` | |
| blanket | `tæppe` | |
| throw blanket | `plaid`, `tæppe` | Choose by context. |
| hat | `hue` | Not `hat` unless it is actually a structured hat. |
| beanie | `hue`, `beaniehue` | Prefer `hue` unless style term matters. |
| sock | `strømpe`, `sok` | `Strømper` is very natural in knitting; `sokker` can be everyday clothing language. |
| mitten | `vante` | |
| fingerless mitt | `pulsvarmer`, `fingerløs vante` | Choose by item. |
| cuff | `ribkant`, `manchet` | Use `ribkant` for knitted cuffs. |
| sleeve | `ærme` | |
| yoke | `bærestykke` | |
| raglan | `raglan` | |
| body | `krop`, `bullen` | `Kroppen` is clear in articles; `bul`/`bullen` is pattern language. |
| front piece | `forstykke` | |
| back piece | `bagstykke`, `rygstykke` | `Rygstykke` when pattern distinguishes back. |
| neckline | `halsudskæring`, `halskant` | |
| armhole | `ærmegab` | |
| sock cuff | `skaft`, `ribkant` | Depends on sock section. |
| sock leg | `skaft` | |
| heel | `hæl` | |
| heel flap | `hælflap` | Also `hælkappe` in some Danish sock patterns. |
| heel turn | `hælvending`, `vende hælen` | |
| gusset | `kile` | Sock context. |
| foot | `fod` | |
| sole | `sål` | |
| toe | `tå` | |
| toe-up | `fra tåen og op`, `toe-up` | If the source discusses construction names, keep `toe-up` in parentheses. |
| cuff-down | `fra skaftet og ned`, `cuff-down` | If the source discusses construction names, keep `cuff-down` in parentheses. |
| crown shaping | `indtagninger i toppen`, `topindtagninger` | For hats. |
| chest / bust measurement | `brystmål` | |
| waist measurement | `taljemål` | |
| hip measurement | `hoftemål` | |
| finished measurements | `færdige mål`, `mål på det færdige arbejde` | |
| body measurements | `kropsmål` | |
| ease | `bevægelsesrum`, `positive ease` | Danish designers often keep `positive ease` in parentheses. |
| positive ease | `bevægelsesrum (positive ease)`, `positivt bevægelsesrum` | Prefer `bevægelsesrum (positive ease)` on first use. |
| negative ease | `negativt bevægelsesrum`, `negative ease` | Explain if the English source does. |
| fit | `pasform` | |
| oversized | `oversize`, `oversized`, `rummelig` | Use `oversize/oversized` if it is a style term. |
| drape | `fald`, `hvordan strikken falder` | Avoid forced literal translations. |

## Yarn Weight Categories

Danish knitting sources often keep international yarn category names and explain them through `garntykkelse`, `strikkefasthed`, `pindestørrelse`, and `løbelængde`.

Use these display names:

| English category | Danish display |
|---|---|
| Lace | `Lace` |
| Super Fine / Fingering | `Fingering / strømpegarn` |
| Sport | `Sport` |
| DK / Light | `DK / Light Worsted` |
| Worsted / Medium | `Worsted / Aran / Medium` |
| Bulky | `Bulky / Chunky` |
| Super Bulky | `Super Bulky / Super Chunky` |
| Jumbo | `Jumbo` |

Guidelines:

- Use `garntykkelse` as the concept.
- Keep `DK`, `Worsted`, `Aran`, `Fingering`, `Lace`, `Bulky`, and `Chunky` as category names.
- Use `strømpegarn` only when the context is typical sock yarn; not every fingering yarn is sock yarn.
- Explain WPI as `wraps per inch (WPI)` on first use, then `WPI`. If explaining in Danish, use `omviklinger pr. inch`, but keep `WPI` because the measurement itself is inch-based.
- Prefer meters per 50 g or 100 g where the source allows it.

## Tool Names And Route Shape

Recommended Danish tool names and public routes:

| English | Danish title | Recommended route |
|---|---|---|
| Free Knitting Tools | `Gratis strikkeværktøjer` or `Gratis strikkeberegnere og tabeller` | `/da/strikkevaerktoejer/` |
| Cast On Calculator | `Opslagsberegner` | `/da/strikkevaerktoejer/opslagsberegner/` |
| Yarn Estimator | `Garnberegner` or `Beregn garnforbrug` | `/da/strikkevaerktoejer/garnberegner/` |
| Needle Size Chart | `Pindestørrelser` | `/da/strikkevaerktoejer/pindestoerrelser/` |
| Yarn Weight Chart | `Garntykkelser` | `/da/strikkevaerktoejer/garntykkelser/` |
| Knitting Abbreviations | `Strikkeforkortelser` | `/da/strikkevaerktoejer/strikkeforkortelser/` |
| Knitting Size Charts | `Størrelsestabeller til strik` | `/da/strikkevaerktoejer/stoerrelsestabeller-strik/` |
| Articles | `Artikler` | `/da/artikler/` |

Recommended category routes:

| English category | Danish label | Recommended route |
|---|---|---|
| Gauge & Calculations | `Strikkefasthed og beregninger` | `/da/artikler/kategori/strikkefasthed-og-beregninger/` |
| Yarn | `Garn` | `/da/artikler/kategori/garn/` |
| Needles | `Strikkepinde` | `/da/artikler/kategori/strikkepinde/` |
| Techniques | `Teknikker` | `/da/artikler/kategori/teknikker/` |
| App & Tools | `App og værktøjer` | `/da/artikler/kategori/app-og-vaerktoejer/` |

Use ASCII slugs. Transliterate Danish characters:

- `æ` -> `ae`
- `ø` -> `oe`
- `å` -> `aa`

Confirm final Danish slugs before publishing.

## Common UI Labels

| English | Danish |
|---|---|
| Tools | `Værktøjer` or `Strikkeværktøjer` |
| Articles | `Artikler` |
| All tools | `Alle værktøjer` |
| All articles | `Alle artikler` |
| Category | `Kategori` |
| Back to all tools | `Tilbage til alle værktøjer` |
| Back to all articles | `Tilbage til alle artikler` |
| Calculate | `Beregn` |
| Estimate | `Beregn` or `Estimer` | Prefer `Beregn` for calculator buttons. |
| Reset | `Nulstil` |
| Search | `Søg` |
| Filter by category | `Filtrer efter kategori` |
| No articles in this category yet. | `Der er endnu ingen artikler i denne kategori.` |
| Stitches | `Masker` |
| Rows | `Pinde` |
| Rounds | `Omgange` |
| Gauge | `Strikkefasthed` |
| Width | `Bredde` |
| Length | `Længde` |
| Needle size | `Pindestørrelse` |
| Yarn weight | `Garntykkelse` |
| Project type | `Projekttype` |
| Size | `Størrelse` |
| Unit | `Enhed` |
| Stitches to cast on | `Masker der skal slås op` |
| Search abbreviation | `Søg efter forkortelse` |
| No results | `Ingen resultater` |
| Frequently asked questions | `Ofte stillede spørgsmål` |
| Email address | `E-mailadresse` |
| Join the list | `Skriv dig på listen` |
| Reserve my price | `Reservér lanceringsprisen` |
| Coming soon | `Kommer snart` |

## App And Landing Page Terms

| English | Danish |
|---|---|
| Android knitting app | `strikkeapp til Android` |
| all-in-one knitting toolkit | `samlet strikkeværktøjskasse`, `alt-i-en strikkeværktøjskasse` |
| row counter | `omgangstæller` |
| voice commands | `stemmekommandoer`, `stemmestyring` |
| pattern viewer | `opskriftsvisning`, `PDF-visning` |
| AI help | `AI-hjælp` |
| yarn label scanner | `garnlabelscanner`, `banderolescanner` |
| AI yarn label scanner | `AI-garnlabelscanner` |
| calculators | `beregnere`, `strikkeberegnere` |
| project summaries | `projektoversigter`, `projektsammendrag` |
| Ravelry integration | `Ravelry-integration` |
| progress photos | `fremskridtsbilleder`, `statusbilleder` |
| offline access | `offlineadgang`, `kan bruges offline` |
| one-time purchase | `engangskøb` |
| subscription | `abonnement` |
| no subscription | `intet abonnement` |
| free with ads | `gratis med reklamer` |
| 14-day trial | `14 dages prøveperiode` |

Use `beregnere` in prose. `Calculator` should not be kept in Danish UI unless an SEO title clearly benefits from it.

## Category Labels And Descriptions

Recommended category descriptions:

| Category | Danish description |
|---|---|
| `Strikkefasthed og beregninger` | `Strikkefasthed, strikkeprøver og maskeantal. Beregningerne der afgør, om det færdige arbejde får den størrelse, du havde tænkt dig.` |
| `Garn` | `Valg af garn, garnalternativer, banderoler og beregning af hvor meget garn et projekt faktisk kræver.` |
| `Strikkepinde` | `Pindestørrelser, materialer og typer strikkepinde. Hvad der er værd at købe, og hvornår hver type passer bedst.` |
| `Teknikker` | `Praktiske teknikguides trin for trin. Ret fejl, afslut pænt og læs strikkeopskrifter fra opslag til aflukning.` |
| `App og værktøjer` | `Apps, beregnere og hjælpemidler, der gør det lettere at planlægge, følge og holde styr på strikkeprojekter.` |

## Article Title Starting Points

Use these as starting points, not final locked titles. Match the English article meaning and SEO length when translating.

| English article | Danish title direction | Suggested slug |
|---|---|---|
| At the Same Time in Knitting Patterns | `"Samtidig" i strikkeopskrifter` | `samtidig-i-strikkeopskrifter` |
| Best Knitting Apps: What to Look For | `De bedste strikkeapps: Hvad skal du kigge efter?` | `bedste-strikkeapps` |
| Best Yarn for Beginners: Practical Guide | `Det bedste garn til begyndere` | `bedste-garn-til-begyndere` |
| Circular vs Straight vs DPN: When to Use Each | `Rundpinde, jumperpinde eller strømpepinde?` | `rundpinde-jumperpinde-stroempepinde` |
| Digital vs Physical Row Counters Compared | `Digital eller fysisk omgangstæller?` | `digital-eller-fysisk-omgangstaeller` |
| Essential Knitting Tools Beyond Needles and Yarn | `Vigtigt strikketilbehør ud over pinde og garn` | `vigtigt-strikketilbehoer` |
| How to Fix Dropped Stitches Without Frogging | `Saml en tabt maske op uden at trevle op` | `saml-tabt-maske-op` |
| Free Knitting Calculators Every Knitter Needs | `Gratis strikkeberegnere der faktisk er nyttige` | `gratis-strikkeberegnere` |
| When Your Gauge Doesn't Match the Pattern | `Når strikkefastheden ikke passer` | `naar-strikkefastheden-ikke-passer` |
| Knitting a Gauge Swatch. Step by Step | `Strik en strikkeprøve trin for trin` | `strikkeproeve-trin-for-trin` |
| How Many Stitches to Cast On (with Gauge) | `Hvor mange masker skal du slå op?` | `hvor-mange-masker-skal-du-slaa-op` |
| How Much Yarn Do I Need? Estimating Yardage | `Hvor meget garn skal du bruge?` | `hvor-meget-garn-skal-du-bruge` |
| How to Block Knitting: Wet, Steam & Spray | `Sådan blokker du strik: vådt, damp og spray` | `blokke-strik-vaadt-damp-spray` |
| How to Knit a Hat: Methods for Every Skill | `Strik en hue: metoder for alle niveauer` | `strik-hue-metoder` |
| How to Knit Socks. Anatomy of a Sock Pattern | `Strik strømper: sådan er en strømpeopskrift bygget op` | `strik-stroemper-stroempeopskrift` |
| How to Read a Knitting Pattern: Beginner's Guide | `Sådan læser du en strikkeopskrift` | `laes-strikkeopskrift` |
| How to Read a Yarn Label: Symbols Explained | `Sådan læser du en banderole` | `laes-banderole-symboler` |
| How to Substitute Yarn in a Knitting Pattern | `Skift garn i en strikkeopskrift` | `skift-garn-i-strikkeopskrift` |
| How to Measure Knitting Gauge | `Sådan måler du strikkefasthed` | `maal-strikkefasthed` |
| How to Identify Mystery Yarn Without a Label | `Ukendt garn uden banderole` | `ukendt-garn-uden-banderole` |
| How to Increase or Decrease Evenly Across a Row | `Fordel udtagninger og indtagninger jævnt over en pind` | `fordel-udtagninger-indtagninger-jaevnt` |
| How to Join a New Ball of Yarn Mid-Row | `Sæt et nyt nøgle til midt på pinden` | `nyt-noegle-midt-paa-pinden` |
| How to Knit Your First Scarf: Beginner Guide | `Strik dit første tørklæde` | `strik-foerste-toerklaede` |
| Knitting Needle Materials: Metal, Wood & Bamboo | `Strikkepinde i metal, træ og bambus` | `strikkepinde-metal-trae-bambus` |
| Knitting Pattern Repeats: Asterisks & Brackets | `Gentagelser i strikkeopskrifter: stjerner og parenteser` | `gentagelser-i-strikkeopskrifter` |
| What Size Knitting Needles for Beginners? | `Hvilken pindestørrelse passer til begyndere?` | `pindestoerrelse-for-begyndere` |
| How to Organize Multiple WIP Knitting Projects | `Hold styr på flere strikkeprojekter` | `hold-styr-paa-strikkeprojekter` |
| Knitting Pattern Sizes: Ease & Measurements | `Størrelser i strikkeopskrifter: bevægelsesrum og mål` | `stoerrelser-i-strikkeopskrifter` |
| How to Pick Up Stitches Along a Knitted Edge | `Saml masker op langs en strikket kant` | `saml-masker-op-langs-kant` |
| How to Seam Knitted Pieces: Mattress Stitch | `Sy strikkede dele sammen med madrassting` | `sy-strikkede-dele-sammen-madrassting` |
| How to Track Your Knitting Time and Speed | `Hold styr på strikketid og tempo` | `strikketid-og-tempo` |
| How to Keep Track of Rows When Knitting | `Hold styr på pinde og omgange, når du strikker` | `hold-styr-paa-pinde-og-omgange` |
| What Is Gauge in Knitting? Why It Changes | `Hvad er strikkefasthed?` | `hvad-er-strikkefasthed` |
| Why Does My Knitting Curl? Causes and Fixes | `Hvorfor ruller strik sig sammen?` | `hvorfor-ruller-strik` |
| Yarn Fibers Compared: Wool, Cotton & Acrylic | `Garnfibre sammenlignet: uld, bomuld og akryl` | `garnfibre-sammenlignet` |
| How Much Yarn for a Blanket? Yardage Guide | `Hvor meget garn skal du bruge til et tæppe?` | `hvor-meget-garn-til-taeppe` |
| Yarn Weight Substitution: When and How | `Skift garntykkelse i en strikkeopskrift` | `skift-garntykkelse-i-strikkeopskrift` |
| How Much Yarn for a Sweater? Yardage Guide | `Hvor meget garn skal du bruge til en sweater?` | `hvor-meget-garn-til-sweater` |

## SEO And Frontmatter

Danish SEO metadata should be written for Danish search behavior, not mechanically translated.

Rules:

- Keep titles clear and within the existing project SEO length style where possible.
- Put the main Danish search term early.
- Use `strikkefasthed`, `strikkeprøve`, `pindestørrelse`, `garntykkelse`, `strikkeopskrift`, `garnforbrug`, and `strikkeberegner` consistently.
- Keep `translationKey` identical to the English source.
- Use `draft: true` for unreviewed Danish articles.
- Do not add an unreviewed article to `articleTranslations`.
- Preserve dates from the English source unless the project workflow says otherwise.

Example frontmatter direction:

```yaml
title: "Sådan måler du strikkefasthed"
description: "Lær at tælle masker og pinde over 10 cm, justere pindestørrelsen og få strikkeprøven til at passe med opskriften."
lang: da
translationKey: how-to-measure-knitting-gauge
draft: true
tags:
  - strikkefasthed
  - strikkeprøve
  - pindestørrelse
  - strikkeopskrift
```

## Translation Workflow

Before translating:

1. Read the English source page.
2. Check whether Finnish, Swedish, Norwegian, Dutch, German, or French translations already exist for structure and internal-link decisions, but do not translate from them.
3. Identify the core knitting concepts and lock terms from this guide.
4. Search existing Danish files once they exist, so terms do not drift.

During translation:

1. Keep the English content structure.
2. Translate headings, SEO fields, UI labels, tables, FAQ questions, examples, and schema strings.
3. Preserve tool behavior and JavaScript logic.
4. Convert visible measurements to metric-first Danish format.
5. Use decimal commas in user-facing text and keep machine-readable values unchanged where required.
6. Replace internal links only when the Danish target page exists and is publishable. Otherwise link to the English original or leave the existing safe path according to the implementation pattern.

After translation:

1. Check every use of `gauge`, `swatch`, `cast on`, `bind off`, `yarn weight`, `yardage`, `needle size`, `row`, and `round`.
2. Check decimal commas in prose and UI text.
3. Check slugs for ASCII transliteration.
4. Check that draft articles are hidden in production.
5. Run `npm run build` after implementation work.
6. Do not deploy or publish until the user approves.

## Implementation Notes For This Repo

The current project has localized implementations for Finnish, German, Swedish, Norwegian, French, and Dutch. Danish should follow that architecture rather than introducing a separate pattern.

Expected code areas when implementation starts:

- `src/i18n/config.ts`: add Danish language key and locale mapping.
- `src/i18n/routes.ts`: add Danish tool, article, and category paths.
- `src/i18n/ui.ts`: add Danish shared UI strings.
- `src/i18n/articles.ts`: add Danish article helpers only when needed; keep draft articles out of public alternates.
- `src/lib/categories.ts`: add Danish category labels/descriptions and update function types.
- `src/pages/da/strikkevaerktoejer/`: add Danish tool pages.
- `src/pages/da/artikler/`: add Danish article listing/category/detail pages when article work begins.
- `src/content/articles/da/`: add Danish article markdown files as drafts until reviewed.

Use existing shared components:

- `LocalizedToolPage.astro` for localized tool pages.
- `WpiIdentifier.astro` for yarn-weight pages, so WPI logic is not copied per language.
- Existing calculator components where behavior is shared.

Do not duplicate calculator logic, WPI logic, or category data. Extend the shared sources of truth.

## Common Pitfalls

- `row` is not always `række` in Danish knitting. Use `pind` for flat pattern rows and `omgang` for circular knitting.
- `pattern` is not always `mønster`. Use `strikkeopskrift` for the full instruction.
- `needle` is not `nål` in knitting context. Use `pind` or `strikkepind`.
- `yarn weight` is not `garnvægt`. Use `garntykkelse`.
- `yardage` is not always `løbelængde`. Use `løbelængde` for label length, but `garnforbrug`, `garnmængde`, or `hvor meget garn` for project amount.
- `hat` is `hue`, not `hat`, unless it is actually a structured hat.
- DPNs are `strømpepinde`.
- `skein` is usually `nøgle` in project quantity copy, but `fed` if the yarn is explicitly a hank.
- `mm` can mean millimeters or maskemarkør. Avoid `mm` for maskemarkør in general UI text; spell out `maskemarkør`.
- Decimal points in prose are wrong for Danish. Use `2,5 mm`, not `2.5 mm`.
- Do not use darkly formal or machine-translated phrasing such as `udfør beregningen`, `initier projektet`, `optimér din strikkeoplevelse`, or `opnå perfekte resultater hver gang`.

## Source-Based Term Evidence

These sources informed the term choices. Re-check them if a term decision becomes uncertain:

- DROPS / Garnstudio Danish gauge lesson for `strikkefasthed`, `strikkeprøve`, `masker`, `pinde`, `10 x 10 cm`, and adjusting pindestørrelse: https://www.garnstudio.com/lesson.php?cid=3&id=25&page=3
- DROPS / Garnstudio Danish patterns for natural pattern wording such as `STRIKKEFASTHED`, `RUNDPIND`, `STRØMPEPINDE`, `glatstrik`, and `pinde nr.`: https://www.garnstudio.com/pattern.php?cid=3&id=10663
- Hobbii Danish swatch guide for `strikkeprøve`, `strikkefasthed`, `masker`, `pinde`, `rækker`, `pindestørrelse`, and measuring over `10 x 10 cm`: https://hobbii.dk/blogs/nyheder/knitting-swatch-and-tension
- Hobbii Danish yarn substitution guide for `strikkefasthed`, `løbelængde`, `nøgle`, `antal nøgler`, and calculating yarn amounts: https://hobbii.dk/blogs/nyheder/how-to-calculate-substitute-yarn-amounts
- Hobbii Danish yarn-category guide for international names such as `Lace`, `Fingering`, `DK`, `Worsted`, `Aran`, `Bulky`, and Danish gauge/needle context: https://hobbii.dk/blog/sadan-vaelger-du-garn-ud-fra-engelske-garn-kategorier
- Hobbii Danish needle-size conversion guide for `strikkepindestørrelser` and conversion-table context: https://hobbii.dk/blogs/nyheder/knitting-needles-conversion-chart
- Onling Danish abbreviation guide for `r`, `vr`, `m`, `p`, `omg`, `rs`, `vs`, `gent`, `km`, and pattern-language explanations: https://www.oenling.dk/pages/hvad-betyder-strikkeforkortelserne
- Knitmade Danish strikkeordbog for abbreviations such as `m`, `mm`, `omg`, `p`, `r`, `2 r sm`, `rk`, `udt`, and `vr`: https://knitmade.dk/strikkeordbogen/
- Nordic Yarn Lab on Danish needle types: `jumperpinde`, `rundpinde`, and `strømpepinde`: https://nordicyarnlab.dk/wooliversity/strikkepinde/
- PetiteKnit Danish product pages for natural garment copy, `bevægelsesrum (positive ease)`, `overvidde`, `brystmål`, `raglanudtagninger`, and `strikkefasthed`: https://www.petiteknit.com/products/sille-slipover
- Strikker.dk Danish dropped-stitch guide for `tabt maske`, `løbet maske`, `samle en tabt maske op`, `hæklenål`, and `lænke`: https://strikker.dk/tabt-maske/
- Kit Couture and DROPS Danish guides for `samle masker op` / `strikke masker op` along edges: https://www.kitcouture.dk/pages/strik-masker-op-langs-lodret-kant and https://www.garnstudio.com/videos.php?c=knitting-videos-pick-up-stitches&lang=dk
- PaaPinden Danish seaming guide for `sammensyning`, `madrassting`, and `maskesting`: https://www.paapinden.dk/strik/basis/sammensyning
- Danish blocking usage examples for `blokke`, `blokning`, `vådblokning`, `dampblokning`, and `spænde op`: https://diyunivers.dk/hvordan-blokker-man-strik-5-enkle-metoder/ and https://www.tantegroen.dk/vare/knitpro-knit-blockers-box-white/
- Lex.dk on decimal comma in Denmark: https://lex.dk/decimalkomma
- Digitaliseringsstyrelsen writing guide for clear, current Danish web writing principles: https://digitaliser.dk/Media/638766808315461393/Skrivevejledning%20for%20borger.dk%20og%20lifeindenmark.dk_marts%202025_version%203.0.pdf
- Google Search Central on hreflang requirements and bidirectional alternates: https://developers.google.com/search/docs/specialty/international/localized-versions
