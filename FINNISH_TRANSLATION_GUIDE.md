# KnitTools Finnish Translation Guide

Last updated: 2026-05-23

This guide is the working reference for Finnish KnitTools content. Use it before editing Finnish tool pages, UI strings, article pages, categories, SEO metadata, internal links, and route slugs.

## Language Choice

Use natural Finnish as used by Finnish knitters.

Recommended technical convention:

- Public URL prefix: `/fi/`
- Human-facing language name: `Suomi`
- Rendered language and hreflang target: `fi`
- Units: metric-first, Finnish number formatting

Write for Finnish knitters who read Finnish knitting patterns, yarn labels, yarn-shop pages, designer notes, and knitting tutorials. Do not write generic translated marketing copy.

## Publication Rule

The current Finnish routes are public. Do not unpublish, rename, or move existing Finnish pages unless the user explicitly asks for a route/content migration.

When adding a new Finnish article, keep it as `draft: true` until review is complete. Do not add an unreviewed Finnish article path to `articleTranslations` if that would expose hreflang links to unpublished pages.

When updating existing Finnish articles after the English source changes, preserve the existing public route unless the user explicitly approves a slug change.

## Core Principles

- Translate from the final English source as the source of truth.
- Preserve the same meaning, structure, examples, caveats, tables, FAQ items, and practical detail.
- Do not add extra advice, SEO filler, marketing fluff, or generic explanatory paragraphs.
- Keep the same level of certainty as the English source.
- Use natural Finnish knitting terms, even when they are not literal translations.
- Use metric conventions first.
- Keep KnitTools as the brand name.
- Keep the tone practical, direct, and slightly opinionated where the English source is opinionated.
- Avoid AI-generic phrasing such as `vie neulontasi uudelle tasolle`, `täydellinen kaikille taitotasoille`, `vapauta luovuutesi`, `saumaton kokemus`, `neulonnan taika`, `luotettava kumppani`, and similar filler.

## Finnish Voice

Use:

- `sinä`, `sinun`, `oma`, and direct imperative forms where helpful
- short active sentences
- concrete knitting verbs: `neulo`, `luo silmukat`, `päättele`, `lisää`, `kavenna`, `poimi silmukoita`, `pura`, `pingota`, `viimeistele`
- concrete nouns: `silmukat`, `kerrokset`, `puikot`, `mallitilkku`, `lanka`, `kerä`, `neuleohje`
- pattern-style phrasing where the page explains techniques

Avoid:

- formal `te` unless the source is a customer-service/legal page
- overly polite UI phrasing such as `ole hyvä ja`
- English syntax with Finnish words
- translating every occurrence of English `pattern` as `kuvio`; use `neuleohje` for full instructions and `mallineule`, `kuvio`, `kaavio`, `mallikerta`, or `raportti` for stitch patterns, motifs, charts, and repeats
- using `villa` when the fiber is not wool and precision matters; use `lanka` as the generic term
- keeping English craft terms where Finnish knitters have a normal term

## Units And Number Formatting

Use metric units as primary:

- `cm` for widths, lengths, and body measurements
- `mm` for needle sizes
- `m` for yarn length
- `g` for yarn weight
- `10 x 10 cm` for gauge areas
- `metri` in prose when it reads better, `m` in compact tables and labels
- `silmukkaa / 10 cm` and `kerrosta / 10 cm` for gauge values

Finnish number formatting:

- Use decimal comma in prose and user-facing copy: `3,5 mm`, `21,5 silmukkaa`
- Keep decimal points only in code, data attributes, JSON, JavaScript, and other machine-readable values
- Use a space between number and unit: `10 cm`, `50 g`, `120 m`
- Use a space as the thousands separator in prose: `1 200 m`
- Avoid comma as a thousands separator in Finnish text

When the English source uses inches or yards:

- Convert or foreground metric for Finnish readers.
- Keep inches/yards only when the page is explicitly about conversion, US/UK sizing, WPI, or when a tool label must support both systems.
- In prose, prefer `10 cm`; in compact conversion labels, `4 in` can remain if the English source/tool needs it.
- If converting values, keep the source intent and use `noin` where the converted value is rounded.

Examples:

- English `Gauge (stitches per 10 cm / 4 in)` -> `Neuletiheys (silmukkaa / 10 cm / 4 in)`
- English `4.5 mm needle` -> `4,5 mm puikko` or `puikko 4,5 mm`
- English `150 yards per skein` -> `noin 137 m per kerä` if converted, or keep `150 yards` only in a conversion context

## Essential Term Decisions

| English concept | Finnish term to use | Notes |
|---|---|---|
| knitting | `neulonta`, `neule` | `Neulonta` for the craft; `neule` for the fabric/finished item or compound. |
| to knit | `neuloa` | Imperative: `neulo`. |
| knitter | `neuloja`, `neulojat` | Prefer neutral sentence structure when possible. |
| knitting pattern | `neuleohje` | Use for the full instructions. |
| pattern / stitch pattern | `mallineule`, `kuvio`, `neulepinta` | Choose by context. |
| chart | `kaavio`, `ruutupiirros` | `Kaavio` is general; `ruutupiirros` when the source is chart-grid specific. |
| gauge | `neuletiheys` | Locked primary term. `Tiheys` is acceptable inside pattern-like tables when context is clear. |
| gauge swatch | `mallitilkku` | Locked primary term. |
| gauge test | `mallitilkku`, `neuletiheyden tarkistaminen` | Use a verb phrase when it reads better. |
| stitch | `silmukka` | Abbrev: `s`. |
| stitches | `silmukat` | |
| stitch count | `silmukkamäärä`, `silmukoiden määrä` | `Silmukkamäärä` is concise; prose can use the longer form. |
| row | `kerros` | For flat knitting. Abbrev: `krs`. |
| round | `kerros`, `suljetun neuleen kerros` | Finnish commonly uses `kerros` for both rows and rounds. Use explanatory phrasing when row/round distinction matters. |
| rows/rounds when both apply | `kerrokset`, `kerrokset tasona ja suljettuna` | Useful for row-counter/app copy if distinction is relevant. |
| cast on | `luoda silmukat` | Noun: `silmukoiden luominen`, edge: `luomisreuna`. |
| bind off / cast off | `päätellä` | Noun: `päättely`; edge: `päättelyreuna`. |
| increase | `lisätä`, `lisäys` | |
| decrease | `kaventaa`, `kavennus` | Do not use `päätellä` for a normal decrease. |
| increase/decrease evenly | `jakaa lisäykset/kavennukset tasaisesti`, `lisätä/kaventaa tasavälein` | Pattern-style: `lisää/kavenna tasavälein`. |
| yarn | `lanka` | Do not use `villa` unless the fiber is wool. |
| yarn weight | `lankavahvuus`, `langan vahvuus` | Use `lankavahvuus` for tools, SEO, and article headings. Avoid `langan paino` for the thickness concept. |
| yarn weight chart | `Lankavahvuudet`, `lankavahvuustaulukko` | Tool title can be concise. |
| yarn amount / project yardage | `langanmenekki`, `lankamäärä`, `paljonko lankaa` | Choose by sentence. |
| yardage on label | `juoksevuus`, `metrit per 50 g / 100 g` | Label concept: length per weight. |
| skein / ball | `kerä`, `lankakerä` | Use `vyyhti` only for an actual hank/skein. |
| hank | `vyyhti` | |
| yarn label | `vyöte`, `lankavyöte` | Use `vyöte` once context is clear. |
| fiber content | `kuitusisältö`, `materiaali`, `koostumus` | `Kuitusisältö` is precise; `materiaali` often reads naturally. |
| dye lot | `värjäyserä`, `värjäyserän numero` | Keep the label wording if the article shows a label. |
| color number | `värinumero`, `värikoodi` | |
| care instructions | `hoito-ohje`, `pesuohje` | `Hoito-ohje` is broader; `pesuohje` for washing. |
| needle | `puikko`, `neulepuikko` | In context, `puikko` is enough. |
| needle size | `puikkokoko`, `puikon koko` | Use `puikkokoko` in tools/SEO. |
| needle size chart | `Puikkokoot`, `puikkokokotaulukko` | Tool title can be concise. |
| circular needle | `pyöröpuikko` | |
| straight needles | `suorat puikot` | |
| DPNs / double-pointed needles | `sukkapuikot` | Do not translate literally. |
| cable needle | `apupuikko`, `palmikkopuikko` | `Palmikkopuikko` for cable tool; `apupuikko` more general. |
| crochet hook | `virkkuukoukku` | For dropped-stitch repairs. |
| stitch marker | `silmukkamerkki`, `merkki` | Avoid `sm` in general UI unless pattern abbreviations are being explained. |
| row counter | `kerroslaskuri` | KnitTools app/tool copy should use this. |
| pattern viewer | `ohjenäkymä`, `PDF-ohjenäkymä`, `PDF-lukija` | Choose based on actual feature context. |
| project | `projekti`, `neuleprojekti`, `työ` | `Työ` is natural in technique prose; `projekti` in app context. |
| stash | `lankavarasto` | Avoid untranslated `stash` unless discussing English app terms. |
| leftovers / scrap yarn | `jämälanka`, `lankajämä`, `loppulanka` | Choose by sentence. |
| right side | `oikea puoli` | Abbrev: `OP`. |
| wrong side | `nurja puoli` | Abbrev: `NP`. |

## Stitch And Technique Terms

| English concept | Finnish term to use | Notes |
|---|---|---|
| knit stitch | `oikea silmukka` | Abbrev: `o`. |
| purl stitch | `nurja silmukka` | Abbrev: `n`. |
| knit | `neulo oikein` | |
| purl | `neulo nurin` | |
| stockinette stitch | `sileä neule` | Flat knitting: oikealla oikein, nurjalla nurin. |
| reverse stockinette | `nurja sileä neule` | |
| garter stitch | `aina oikein -neule`, `aina oikein` | Use the compound when naming the stitch pattern. |
| ribbing | `joustinneule`, `joustin` | `Joustin` for cuffs/hems if context is clear. |
| seed stitch | `helmineule` | |
| moss stitch | `helmineule`, `pidennetty helmineule` | Check the stitch definition; English naming varies. |
| brioche | `patenttineule`, `briossi` | Use `patenttineule` as primary unless source uses brioche as a style term. |
| cable | `palmikko`, `palmikkoneule` | |
| lace | `pitsi`, `pitsineule` | Keep `Lace` only for yarn category if needed. |
| colorwork | `kirjoneule`, `monivärineule` | Choose by context. |
| stranded colorwork | `kirjoneule`, `lankajuoksullinen kirjoneule` | Explain floats if the source discusses them. |
| float | `lankajuoksu` | Common Finnish colorwork term. |
| edge stitch | `reunasilmukka` | |
| stitch repeat | `mallikerta`, `toisto`, `raportti` | `Mallikerta` is natural in patterns; `toisto` is clearer for beginners. |
| repeat | `toista`, `toisto` | |
| asterisks and brackets | `tähdet ja sulkeet/hakasulkeet` | Match the exact punctuation used in the English source. |
| k2tog | `2 o yhteen`, `neulo 2 silmukkaa oikein yhteen` | Keep `k2tog` when explaining English abbreviations. |
| p2tog | `2 n yhteen`, `neulo 2 silmukkaa nurin yhteen` | |
| ssk | `ssk`, `kahden noston kavennus` | Keep `ssk` and explain; Finnish sources vary on abbreviation. |
| psso / SKP | `ylivetokavennus`, `nosta silmukka neulotun yli` | |
| yarn over | `langankierto` | Abbrev: `lk`. |
| twisted stitch | `kiertäen neulottu silmukka`, `kiertäen oikein/nurin` | |
| through back loop | `takareunasta`, `takareunoistaan` | Choose singular/plural by stitch count. |
| slip stitch | `nostettu silmukka`, `nosta silmukka neulomatta` | Specify oikein/nurin neulomatta when relevant. |
| pick up stitches | `poimia silmukoita` | Along an edge: `poimi silmukoita reunasta`. |
| dropped stitch | `pudonnut silmukka`, `karannut silmukka` | Prefer `pudonnut silmukka` in polished article copy. |
| fix dropped stitch | `korjata pudonnut silmukka`, `nostaa pudonnut silmukka` | |
| ladder | `tikapuu`, `lankalenkki`, `vaakalanka` | Use visual explanation if needed. |
| frog / rip back | `purkaa`, `purkaa takaisin` | Avoid untranslated `frog` except when explaining English slang. |
| tink | `purkaa silmukka kerrallaan`, `neuloa taaksepäin` | Explain if needed. |
| lifeline | `apulanka`, `turvalanka` | First use can include both. |
| join new ball | `liittää uusi kerä`, `aloittaa uusi kerä`, `vaihtaa uuteen kerään` | Choose by sentence. |
| weave in ends | `päätellä langanpäät` | Not a literal weaving translation. |
| seam pieces | `yhdistää neulekappaleet`, `ommella kappaleet yhteen` | |
| mattress stitch | `patjapisto`, `vuoropisto` | Current Finnish content uses `patjapisto`; `vuoropisto` is also common. |
| whip stitch | `luotospisto` | If needed. |
| three-needle bind off | `kolmen puikon päättely` | Explain on first use. |
| Kitchener stitch | `silmukointi`, `Kitchener stitch` | Use `silmukointi`; keep English name if the source uses it. |
| block / blocking | `pingottaa`, `pingotus`, `viimeistely` | Use `pingotus` when shaping to measurements is central; `viimeistely` for the broader finishing process. |
| wet blocking | `märkäpingotus`, `märkäviimeistely` | |
| steam blocking | `höyrytys`, `höyrypingotus` | Preserve all source warnings. |
| spray blocking | `suihkepullolla kostutus ja pingotus`, `kevyt pingotus` | Prefer explanatory phrasing if it reads better. |

## Garment, Sock, And Fit Terms

| English concept | Finnish term to use | Notes |
|---|---|---|
| sweater | `villapaita`, `neulepusero`, `pusero` | Choose by garment and fiber. Do not call every sweater `villapaita` if it is not wool. |
| pullover | `neulepusero`, `pusero` | |
| cardigan | `neuletakki` | |
| slipover | `slipoveri`, `neuleliivi` | Use source-specific style. |
| scarf | `huivi`, `kaulahuivi` | |
| shawl | `hartiahuivi`, `huivi` | |
| blanket | `peitto` | |
| throw blanket | `torkkupeitto`, `peitto` | Choose by context. |
| hat | `pipo`, `myssy` | Use `pipo` for beanie-style hats; `myssy` if the source style fits. |
| beanie | `pipo` | |
| sock | `sukka` | |
| mitten | `lapanen` | |
| fingerless mitt | `kämmekäs`, `sormeton lapanen` | Choose by item. |
| cuff | `joustin`, `resori`, `suu` | `Resori` is common, but `joustin` reads more knitting-specific. |
| sleeve | `hiha` | |
| yoke | `kaarroke` | |
| raglan | `raglan` | |
| body | `miehusta`, `vartalo-osa` | `Miehusta` is pattern language; `vartalo-osa` is explanatory. |
| front piece | `etukappale` | |
| back piece | `takakappale` | |
| neckline | `pääntie`, `kaula-aukko` | |
| armhole | `kädentie` | |
| sock cuff | `varsi`, `joustin` | Depends on sock section. |
| sock leg | `varsi` | |
| heel | `kantapää` | |
| heel flap | `kantalappu` | |
| heel turn | `kantapään käännös`, `kantapään kavennukset` | Choose by construction. |
| gusset | `kiila` | Sock context. |
| foot | `jalkaterä` | |
| sole | `jalkapohja` | |
| toe | `kärki` | Sock context. |
| toe-up | `kärjestä varteen`, `toe-up` | If construction names matter, keep English in parentheses. |
| cuff-down | `varresta kärkeen`, `cuff-down` | If construction names matter, keep English in parentheses. |
| crown shaping | `päälaen kavennukset` | For hats. |
| chest / bust measurement | `rinnanympärys` | |
| waist measurement | `vyötärönympärys` | |
| hip measurement | `lantionympärys` | |
| finished measurements | `valmiin neuleen mitat`, `valmiit mitat` | |
| body measurements | `vartalonmitat`, `kehon mitat` | Prefer `vartalonmitat` in articles. |
| ease | `väljyys`, `väljyysvara` | Use `väljyysvara` when comparing body and garment measurements. |
| positive ease | `positiivinen väljyys`, `väljyysvara` | First use can include `(positive ease)` if the English source does. |
| negative ease | `negatiivinen väljyys`, `negatiivinen väljyysvara` | Explain if the English source does. |
| fit | `istuvuus`, `mitoitus` | |
| oversized | `oversize`, `väljä` | Use `oversize` if it is a style term. |
| drape | `laskeutuvuus` | |

## Yarn Weight Categories

Finnish knitting sources often keep international yarn category names and explain them through `lankavahvuus`, `neuletiheys`, `puikkokoko`, `juoksevuus`, and meters per 50 g or 100 g.

Use these display names:

| English category | Finnish display |
|---|---|
| Lace | `Lace` |
| Super Fine / Fingering | `Fingering / sukkalanka` |
| Sport | `Sport` |
| DK / Light | `DK / Light Worsted` |
| Worsted / Medium | `Worsted / Aran / Medium` |
| Bulky | `Bulky / Chunky` |
| Super Bulky | `Super Bulky / Super Chunky` |
| Jumbo | `Jumbo` |

Guidelines:

- Use `lankavahvuus` as the concept.
- Keep `DK`, `Worsted`, `Aran`, `Fingering`, `Lace`, `Bulky`, and `Chunky` as category names.
- Use `sukkalanka` only when the context is typical sock yarn; not every fingering yarn is sock yarn.
- Explain WPI as `wraps per inch (WPI)` on first use, then `WPI`. If explaining in Finnish, use `kierrosta tuumalla`, but keep `WPI` because the measurement itself is inch-based.
- Prefer meters per 50 g or 100 g where the source allows it.
- Re-check the Craft Yarn Council yarn weight system before editing factual yarn-weight ranges. The current CYC page says the updated system includes Size 8, blocking, and plus symbols.

## Tool Names And Route Shape

Current Finnish tool names and public routes:

| English | Finnish title | Public route |
|---|---|---|
| Free Knitting Tools | `Ilmaiset neuletyökalut` or `Ilmaiset neulelaskurit ja taulukot` | `/fi/tyokalut/` |
| Cast On Calculator | `Silmukkalaskuri` | `/fi/tyokalut/silmukkalaskuri/` |
| Yarn Estimator | `Lankamuunnin` | `/fi/tyokalut/lankamuunnin/` |
| Needle Size Chart | `Puikkokoot` | `/fi/tyokalut/puikkokoot/` |
| Yarn Weight Chart | `Lankavahvuudet` | `/fi/tyokalut/lankavahvuudet/` |
| Knitting Abbreviations | `Neulelyhenteet` | `/fi/tyokalut/neulelyhenteet/` |
| Knitting Size Charts | `Neulekokotaulukot` | `/fi/tyokalut/neulekokotaulukot/` |
| Articles | `Artikkelit` | `/fi/artikkelit/` |

Current Finnish category routes:

| English category | Finnish label | Public route |
|---|---|---|
| Gauge & Calculations | `Neuletiheys ja laskurit` | `/fi/artikkelit/kategoria/neuletiheys-ja-laskurit/` |
| Yarn | `Langat` | `/fi/artikkelit/kategoria/langat/` |
| Needles | `Puikot` | `/fi/artikkelit/kategoria/puikot/` |
| Techniques | `Tekniikat` | `/fi/artikkelit/kategoria/tekniikat/` |
| App & Tools | `Sovellus ja työkalut` | `/fi/artikkelit/kategoria/sovellus-ja-tyokalut/` |

Use ASCII slugs. Transliterate Finnish characters:

- `ä` -> `a`
- `ö` -> `o`
- `å` -> `a`

Do not change existing public slugs unless the user explicitly approves redirects and SEO impact.

## Common UI Labels

| English | Finnish |
|---|---|
| Tools | `Työkalut` |
| Articles | `Artikkelit` |
| All tools | `Kaikki työkalut` |
| All articles | `Kaikki artikkelit` |
| Category | `Kategoria` |
| Back to all tools | `Takaisin kaikkiin työkaluihin` |
| Back to all articles | `Takaisin kaikkiin artikkeleihin` |
| Calculate | `Laske` |
| Estimate | `Arvioi`, `Laske` | Prefer `Arvioi` for yarn amount; `Laske` for calculators. |
| Reset | `Tyhjennä`, `Nollaa` | Use `Tyhjennä` for forms, `Nollaa` for counters. |
| Search | `Hae` |
| Filter by category | `Suodata kategorian mukaan` |
| No articles in this category yet. | `Tässä kategoriassa ei ole vielä artikkeleita.` |
| Stitches | `Silmukat` |
| Rows | `Kerrokset` |
| Rounds | `Kerrokset` | Add explanation if row/round distinction matters. |
| Gauge | `Neuletiheys` |
| Width | `Leveys` |
| Length | `Pituus` |
| Needle size | `Puikkokoko` |
| Yarn weight | `Lankavahvuus` |
| Project type | `Projektityyppi` |
| Size | `Koko` |
| Unit | `Yksikkö` |
| Stitches to cast on | `Luotavat silmukat` |
| Search abbreviation | `Hae lyhennettä` |
| No results | `Ei tuloksia` |
| Frequently asked questions | `Usein kysytyt kysymykset` |
| Email address | `Sähköpostiosoite` |
| Join the list | `Liity listalle` |
| Reserve my price | `Varaa julkaisuhinta` |
| Coming soon | `Tulossa pian` |

## App And Landing Page Terms

| English | Finnish |
|---|---|
| Android knitting app | `Android-neulesovellus`, `neulesovellus Androidille` |
| all-in-one knitting toolkit | `neulojan työkalupakki`, `kaikki neulontatyökalut yhdessä` |
| row counter | `kerroslaskuri` |
| multiple counters | `useita laskureita`, `useita samanaikaisia laskureita` |
| pattern viewer | `ohjenäkymä`, `PDF-ohjenäkymä` |
| calculators | `laskurit`, `neulelaskurit` |
| project management | `projektinhallinta`, `neuleprojektien hallinta` |
| session history | `sessiohistoria`, `neulontasessioiden historia` |
| saved PDF patterns | `tallennetut PDF-ohjeet` |
| Ravelry integration | `Ravelry-yhteys`, `Ravelry-integraatio` |
| project notes | `projektimuistiinpanot` |
| progress photos | `edistymiskuvat`, `projektikuvat` |
| project stats / session tracking | `projektitilastot`, `sessioseuranta` |
| rows per hour | `kerrosta tunnissa` |
| home-screen widget | `aloitusnäytön widget` |
| offline access | `offline-käyttö`, `toimii ilman verkkoyhteyttä` |
| one-time purchase | `kertamaksu` |
| subscription | `tilaus`, `kuukausitilaus` |
| no subscription | `ei tilausta` |
| free with ads | `ilmainen mainoksilla` |
| 14-day trial | `14 päivän kokeilu` |

Do not add AI/OCR/scanner/voice/instruction-parser/project-summary product claims to Finnish public copy unless the English source and product reality explicitly reintroduce them.

## Category Labels And Descriptions

Current category descriptions:

| Category | Finnish description |
|---|---|
| `Neuletiheys ja laskurit` | `Neuletiheys, mallitilkut ja silmukkamäärät. Ne laskut, joista valmiin neuleen koko lopulta riippuu.` |
| `Langat` | `Langan valinta, korvaaminen, vyötteen lukeminen ja menekin arviointi silloin kun ohjeen numerot eivät yksin riitä.` |
| `Puikot` | `Puikkokoot, materiaalit ja puikkotyypit. Mitä kannattaa ostaa ja milloin mikäkin puikko tuntuu oikealta työssä.` |
| `Tekniikat` | `Käytännön tekniikkaohjeita. Virheiden korjaamista, viimeistelyä ja ohjeiden lukemista luomisesta päättelyyn.` |
| `Sovellus ja työkalut` | `Sovellukset, laskurit ja apuvälineet, joilla neuleprojektien seuraaminen ja suunnittelu pysyy helpompana.` |

## Article Title Starting Points

These are the current Finnish article routes and title directions. Preserve existing slugs unless the user approves a migration.

| English article | Finnish title direction | Current slug |
|---|---|---|
| At the Same Time in Knitting Patterns | `"Samaan aikaan" neuleohjeessa` | `samaan-aikaan-neuleohjeessa` |
| Best Knitting Apps: What to Look For | `Parhaat neulesovellukset` | `parhaat-neulesovellukset` |
| Best Yarn for Beginners: Practical Guide | `Paras lanka aloittelijalle` | `paras-lanka-aloittelijalle` |
| Circular vs Straight vs DPN: When to Use Each | `Pyöröpuikot, suorat puikot vai sukkapuikot?` | `pyoropuikot-suorat-puikot-sukkapuikot` |
| Digital vs Physical Row Counters Compared | `Digitaalinen vai mekaaninen kerroslaskuri?` | `digitaalinen-vs-mekaaninen-kerroslaskuri` |
| Essential Knitting Tools Beyond Needles and Yarn | `Välttämättömät neuletarvikkeet` | `valttamattomat-neuletarvikkeet` |
| How to Fix Dropped Stitches Without Frogging | `Pudonneen silmukan korjaaminen` | `pudonneen-silmukan-korjaaminen` |
| Free Knitting Calculators Every Knitter Needs | `Ilmaiset neulelaskurit` | `ilmaiset-neulelaskurit` |
| When Your Gauge Doesn't Match the Pattern | `Kun neuletiheys ei täsmää` | `kun-neuletiheys-ei-tasmaa` |
| Knitting a Gauge Swatch. Step by Step | `Mallitilkun neulominen vaiheittain` | `mallitilkun-neulominen-vaiheittain` |
| How Many Stitches to Cast On (with Gauge) | `Montako silmukkaa luodaan?` | `montako-silmukkaa-luodaan` |
| How Much Yarn Do I Need? Estimating Yardage | `Paljonko lankaa tarvitaan?` | `paljonko-lankaa-tarvitaan` |
| How to Block Knitting: Wet, Steam & Spray | `Neuleen pingotus` | `neuleen-pingotus` |
| How to Knit a Hat: Methods for Every Skill | `Pipon neulominen` | `pipon-neulominen` |
| How to Knit Socks. Anatomy of a Sock Pattern | `Sukkien neulominen` | `sukkien-neulominen` |
| How to Read a Knitting Pattern: Beginner's Guide | `Neuleohjeen lukeminen` | `neuleohjeen-lukeminen` |
| How to Read a Yarn Label: Symbols Explained | `Lankavyötteen lukeminen` | `lankavyotteen-lukeminen` |
| How to Substitute Yarn in a Knitting Pattern | `Langan korvaaminen neuleohjeessa` | `langan-korvaaminen-neuleohjeessa` |
| How to Measure Knitting Gauge | `Neuletiheyden mittaaminen` | `neuletiheyden-mittaaminen` |
| How to Identify Mystery Yarn Without a Label | `Tuntemattoman langan tunnistaminen` | `tuntemattoman-langan-tunnistaminen` |
| How to Increase or Decrease Evenly Across a Row | `Lisäysten ja kavennusten jakaminen` | `lisaysten-ja-kavennusten-jakaminen` |
| How to Join a New Ball of Yarn Mid-Row | `Uuden lankakerän liittäminen` | `uuden-lankakeran-liittaminen` |
| How to Knit Your First Scarf: Beginner Guide | `Ensimmäisen huivin neulominen` | `ensimmaisen-huivin-neulominen` |
| Knitting Needle Materials: Metal, Wood & Bamboo | `Puikkomateriaalit: metalli, puu ja bambu` | `puikkomateriaalit-metalli-puu-bambu` |
| Knitting Pattern Repeats: Asterisks & Brackets | `Neuleohjeen toistot` | `neuleohjeen-toistot` |
| What Size Knitting Needles for Beginners? | `Puikkokoko aloittelijalle` | `puikkokoko-aloittelijalle` |
| How to Organize Multiple WIP Knitting Projects | `Neuleprojektien järjestäminen` | `neuleprojektien-jarjestaminen` |
| Knitting Pattern Sizes: Ease & Measurements | `Neuleohjeen koot ja istuvuus` | `neuleohjeen-koot-ja-istuvuus` |
| How to Pick Up Stitches Along a Knitted Edge | `Silmukoiden poimiminen` | `silmukoiden-poimiminen` |
| How to Seam Knitted Pieces: Mattress Stitch | `Neulekappaleiden yhdistäminen` | `neulekappaleiden-yhdistaminen` |
| How to Track Your Knitting Time and Speed | `Neulonta-ajan seuraaminen` | `neulonta-ajan-seuraaminen` |
| How to Keep Track of Rows When Knitting | `Kerrosten seuraaminen neuloessa` | `kerrosten-seuraaminen-neuloessa` |
| What Is Gauge in Knitting? Why It Changes | `Mitä neuletiheys tarkoittaa?` | `mita-neuletiheys-tarkoittaa` |
| Why Does My Knitting Curl? Causes and Fixes | `Miksi neule kaartuu?` | `miksi-neule-kaartuu` |
| Yarn Fibers Compared: Wool, Cotton & Acrylic | `Lankakuidut vertailussa` | `lankakuidut-vertailussa` |
| How Much Yarn for a Blanket? Yardage Guide | `Paljonko lankaa peittoon?` | `paljonko-lankaa-peittoon` |
| Yarn Weight Substitution: When and How | `Langan korvaaminen eri vahvuudella` | `langan-korvaaminen-eri-vahvuudella` |
| How Much Yarn for a Sweater? Yardage Guide | `Paljonko lankaa villapaitaan?` | `paljonko-lankaa-villapaitaan` |

## SEO And Frontmatter

Finnish SEO metadata should be written for Finnish search behavior, not mechanically translated.

Rules:

- Keep titles clear and within the existing project SEO length style where possible.
- Put the main Finnish search term early.
- Use `neuletiheys`, `mallitilkku`, `puikkokoko`, `lankavahvuus`, `neuleohje`, `langanmenekki`, and `neulelaskuri` consistently.
- Keep `translationKey` identical to the English source.
- Use `lang: fi`.
- Use `draft: true` for unreviewed new Finnish articles.
- Do not add an unreviewed new article to `articleTranslations`.
- Preserve dates from the English source unless the project workflow says otherwise.

Example frontmatter direction:

```yaml
title: "Neuletiheyden mittaaminen"
description: "Näin mittaat silmukat ja kerrokset 10 cm matkalta, vaihdat puikkokokoa ja saat mallitilkun vastaamaan neuleohjetta."
lang: fi
translationKey: how-to-measure-knitting-gauge
draft: true
tags:
  - neuletiheys
  - mallitilkku
  - puikkokoko
  - neuleohje
```

## Translation Workflow

Before translating or updating Finnish content:

1. Read the final English source page.
2. Check whether the current Finnish page already exists and whether its route is public.
3. Identify the core knitting concepts and lock terms from this guide.
4. Search existing Finnish files so terms do not drift.
5. Check current external terminology if the page uses yarn-weight standards, care symbols, needle conversion tables, or other facts that can change.

During translation:

1. Keep the English content structure.
2. Translate headings, SEO fields, UI labels, tables, FAQ questions, examples, and schema strings.
3. Preserve tool behavior and JavaScript logic.
4. Convert visible measurements to metric-first Finnish format.
5. Use decimal commas in user-facing text and keep machine-readable values unchanged where required.
6. Replace internal links only when the Finnish target page exists and is publishable. Otherwise link to the English original or leave the existing safe path according to the implementation pattern.

After translation:

1. Check every use of `gauge`, `swatch`, `cast on`, `bind off`, `yarn weight`, `yardage`, `needle size`, `row`, and `round`.
2. Check decimal commas in prose and UI text.
3. Check slugs for ASCII transliteration.
4. Check that draft articles are hidden in production.
5. Run `npm run build` after implementation work.
6. Do not deploy or publish until the user approves.

## Implementation Notes For This Repo

Finnish is already implemented. Do not introduce a new localization pattern.

Current code areas:

- `src/i18n/config.ts`: Finnish language key and label.
- `src/i18n/routes.ts`: Finnish tool, article, and category paths.
- `src/i18n/ui.ts`: shared Finnish UI strings.
- `src/i18n/articles.ts`: Finnish article alternates.
- `src/lib/categories.ts`: Finnish category labels/descriptions.
- `src/pages/fi/tyokalut/`: Finnish tool pages.
- `src/pages/fi/artikkelit/`: Finnish article listing/category/detail pages.
- `src/content/articles/fi/`: Finnish article markdown files.

Use existing shared components:

- `LocalizedToolPage.astro` for localized tool pages.
- `FinnishToolPage.astro` is a legacy wrapper around `LocalizedToolPage` with `lang="fi"`.
- `WpiIdentifier.astro` for yarn-weight pages, so WPI logic is not copied per language.
- Existing calculator components where behavior is shared.

Do not duplicate calculator logic, WPI logic, category data, or article alternate mapping. Extend the shared sources of truth when architecture changes are explicitly requested.

## Common Pitfalls

- `gauge` is `neuletiheys`, not generic `mitta` or untranslated `gauge`.
- `gauge swatch` is `mallitilkku`, not `näytepala`.
- `pattern` is not always `kuvio`. Use `neuleohje` for the full instruction.
- `yarn weight` is not `langan paino`. Use `lankavahvuus`.
- `yardage` is not always `juoksevuus`. Use `juoksevuus` for label length, but `langanmenekki`, `lankamäärä`, or `paljonko lankaa` for project amount.
- `needle` is `puikko`, not `neula`, in knitting context.
- DPNs are `sukkapuikot`.
- `skein` is usually `kerä` in project quantity copy, but `vyyhti` if the yarn is explicitly a hank.
- Finnish commonly uses `kerros` for both flat rows and rounds. Add explanatory wording only when the distinction matters.
- Decimal points in prose are wrong for Finnish. Use `2,5 mm`, not `2.5 mm`.
- Keep `KnitTools` uninflected where it reads naturally; if inflection is needed, use `KnitToolsin`.
- Do not use machine-translated phrasing such as `suorita laskenta`, `aloita projekti saumattomasti`, `optimoi neulontakokemuksesi`, or `saavuta täydellisiä tuloksia joka kerta`.

## Source-Based Term Evidence

These sources informed the term choices. Re-check them if a term decision becomes uncertain:

- Craft Yarn Council yarn weight system for current category/gauge/needle ranges and the note that the updated system includes Size 8, blocking, and plus symbols: https://www.craftyarncouncil.com/standards/yarn-weight-system
- Craft Yarn Council yarn label information for yarn weight symbols and label-standard context: https://www.craftyarncouncil.com/standards/yarn-label-information
- Craft Yarn Council knitting abbreviations for protected English abbreviations such as `k2tog`, `ssk`, `M1R`, `M1L`, `RS`, `WS`, and US/Canada term differences: https://www.craftyarncouncil.com/standards/knitting-abbreviations
- DROPS / Garnstudio Finnish gauge lesson for `neuletiheys`, `mallitilkku`, `s`, `krs`, `10 x 10 cm`, `puikot`, and changing needle size based on gauge: https://www.garnstudio.com/lesson.php?cid=11&id=25&page=3
- DROPS / Garnstudio Finnish patterns for natural pattern wording such as `TARKISTA NEULETIHEYS`, `pyöröpuikot`, `sukkapuikot`, `sileä neule`, `joustinneule`, `kaarroke`, and `raglanlisäykset`: https://www.garnstudio.com/pattern.php?cid=11&id=10104
- Lankava Finnish needle/gauge guidance for `puikkokoko`, `neuletiheys`, `mallitilkku`, and the larger/smaller needle correction rule: https://www.lankava.fi/fi/kaikki-tarvikkeet/puikot-ja-koukut/
- Titityy English-Finnish knitting vocabulary for `luo silmukoita`, `päättele`, `sukkapuikot`, `2 o yht`, `ssk`, `mallitilkku`, `sileä neule`, `langankierto`, and related abbreviations: https://titityy.fi/fi/articles/englanti-suomi-neulesanasto/87
- Punomo Finnish knitting symbols and abbreviations for `o`, `n`, `s`, `krs`, `kav.`, `lis.`, `OP`, `NP`, `2 o yht.`, and pattern-repeat notation: https://punomo.fi/neulemerkit-ja-lyhenteet/
- Punomo knitting material for `lankavyöte`, yarn-label information, `neuletiheys`, and recommended needle/hook size on a label: https://static.punomo.fi/uploads/2016/05/neulonta.pdf
- Novita customer-service wording for `vyöte`, `värinumero`, `värjäyserä`, `puikkosuositus`, `neuletiheys`, and individual knitting tension: https://novita.com/pages/novita-asiakaspalvelu133
- Hobbii Finnish yarn/product pages for `langanvahvuus`, `neuletiheys`, `juoksevuus`, and product-label style fields: https://hobbii.fi/collections/winter-yarns
- DROPS Finnish blocking video for `pingotus`, setting work to measurements, dampening, pinning, and drying: https://www.garnstudio.com/video.php?id=516&lang=fi
- Vuonue Finnish finishing guide for `neuleen viimeistely`, `höyrytys`, wet finishing, and testing finishing methods on a swatch first: https://www.vuonue.fi/fi/sivu/175484
- Finnish garment/fit examples for `valmiin neuleen mitat`, `rinnanympärys`, and `väljyysvara`: https://www.ylivieskankotikutomo.fi/product/1507/amy-sweater-villapaita-neuleohje---suomi
- Kielitoimiston ohjepankki on decimal comma in Finnish text: https://kielitoimistonohjepankki.fi/ohje/luvut-ja-numerot-desimaaliluvut/
- Kielitoimiston ohjepankki on Finnish heading capitalization and punctuation: https://kielitoimistonohjepankki.fi/ohje/otsikot/
- Kielitoimiston ohjepankki checklist for clear, scannable Finnish web text: https://kielitoimistonohjepankki.fi/vk/tekstien-parantamisen-lahtokohtia/tekstintekijan-tarkistuslista/
- Google Search Central localized versions documentation for hreflang and bidirectional alternate requirements: https://developers.google.com/search/docs/specialty/international/localized-versions
