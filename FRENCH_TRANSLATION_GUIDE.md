# KnitTools French Translation Guide

Last updated: 2026-05-12

This guide is the working reference for translating KnitTools from English into French. Use it before translating French tool pages, UI strings, article pages, categories, SEO metadata, and internal links.

## Language Choice

Use natural European French for knitters.

Recommended technical convention:

- Public URL prefix: `/fr/`
- Human-facing language name: `Français`
- Rendered language and hreflang target: `fr`
- Units: metric-first, with European number formatting

Write for French-speaking knitters who read patterns, yarn labels, blogs, and shop pages in French. Do not write generic translated marketing copy.

## Publication Rule

Do not publish French pages before the user has reviewed and approved them.

When adding French articles, keep them as `draft: true` until review is complete. Do not add French article paths to `articleTranslations` if that would expose hreflang links to unpublished pages.

The first implementation pass should translate the English tool pages. Translate articles later in reviewed batches.

## Core Principles

- Translate from the English original as the source of truth.
- Preserve the same meaning, structure, examples, caveats, tables, FAQ items, and practical detail.
- Do not add extra advice, SEO filler, marketing fluff, or generic explanatory paragraphs.
- Keep the same level of certainty as the English source.
- Use natural French knitting terms, even when they are not literal translations.
- Use metric and European conventions first.
- Keep KnitTools as the brand name.
- Keep the tone practical, direct, and slightly opinionated where the English source is opinionated.
- Avoid AI-generic phrasing such as `libérez votre créativité`, `donnez vie à vos créations`, `parfait pour tous les niveaux`, `votre allié indispensable`, `expérience fluide`, `sans effort`, and similar filler.

## French Voice

Use:

- `tu`, `ton`, `ta`, `tes` in article prose and explanatory tool copy
- neutral infinitives for compact UI buttons: `Calculer`, `Estimer`, `Voir`
- short active sentences
- concrete knitting verbs: `tricoter`, `monter`, `rabattre`, `augmenter`, `diminuer`, `relever`, `défaire`, `bloquer`
- concrete nouns: `mailles`, `rangs`, `tours`, `échantillon`, `fil`, `pelote`, `aiguilles`, `ouvrage`, `modèle`
- pattern-style phrasing when explaining a technique

Avoid:

- formal `vous` in article prose unless quoting or preserving a source phrase
- overly polite UI phrasing like `veuillez`
- English syntax with French words
- translating every occurrence of English `pattern` as `patron`; use `modèle` or `explications` for knitting instructions and `motif` or `point` for a stitch pattern
- using `laine` when the fiber is not wool and precision matters; use `fil` as the general term
- overusing anglicisms where French knitters have a standard term

## Units And Number Formatting

Use European units as primary:

- `cm` for widths, lengths, and body measurements
- `mm` for needle sizes
- `m` for yarn length
- `g` for yarn weight
- `10 x 10 cm` for gauge areas
- `m` for meters only; use `m.` or `maille(s)` for stitch abbreviations if ambiguity is possible

French number formatting:

- Use decimal comma in prose and user-facing copy: `3,5 mm`, `21,5 mailles`
- Keep decimal points only in code, data attributes, JSON, JavaScript, and other machine-readable values
- Use a space between number and unit: `10 cm`, `50 g`, `120 m`
- Use spaces, not commas, as thousands separators in prose: `1 200 m`

When the English source uses inches or yards:

- Convert or foreground metric for French readers.
- Keep inches/yards only when the page is explicitly about conversion, US/UK sizing, or when a tool label must support both systems.
- In prose, prefer `10 cm`; in compact conversion labels, `4 in` can remain if the English source/tool needs it.

Examples:

- English `Gauge (stitches per 10 cm / 4 in)` -> `Échantillon (mailles pour 10 cm / 4 in)`
- English `4.5 mm needle` -> `aiguilles 4,5 mm` or `aiguilles n° 4,5`
- English `150 yards per skein` -> `environ 137 m par pelote` if converted, or keep `150 yards` only in a conversion context

## Essential Term Decisions

| English concept | French term to use | Notes |
|---|---|---|
| knitting | `tricot` | General craft. |
| to knit | `tricoter` | |
| knitter | `tricoteur`, `tricoteuse`, `personne qui tricote` | Prefer neutral sentence structure when possible. |
| knitting pattern | `modèle de tricot`, `explications` | `patron de tricot` is common in blogs, but `modèle`/`explications` reads more broadly natural. |
| pattern / stitch pattern | `motif`, `point`, `point fantaisie` | Use for texture, chart, lace, cables, or colorwork. |
| chart | `diagramme` | In knitting-pattern context. |
| gauge | `échantillon`, `tension` | Use `échantillon` for the practical swatch/result; use `tension` when the sentence means the knitter's tension. Avoid literal `jauge`. |
| gauge swatch | `échantillon` | Also the physical swatch. `tricoter un échantillon` is the natural phrase. |
| stitch | `maille` | Abbrev: `m.` in pattern-like contexts. |
| stitches | `mailles` | |
| stitch count | `nombre de mailles` | More natural than `compte de mailles`. |
| row | `rang` | For flat knitting. Abbrev: `rg` or `rangs`; use full word in prose. |
| round | `tour` | For circular knitting. |
| rows/rounds when both apply | `rangs ou tours` | Useful for app/tool copy. |
| cast on | `monter les mailles` | Noun: `montage des mailles`, `bord de montage`. |
| bind off / cast off | `rabattre les mailles` | Noun: `rabattage`, edge: `bord rabattu`. |
| increase | `augmenter`, `augmentation` | |
| decrease | `diminuer`, `diminution` | |
| increase/decrease evenly | `répartir les augmentations/diminutions régulièrement` | Also `à intervalles réguliers` in pattern-style text. |
| yarn | `fil`, `laine` | Use `fil` as the precise generic term. Use `laine` in broad/search-friendly phrases where French knitters naturally say it. |
| yarn weight | `épaisseur de fil`, `grosseur de laine` | Use `épaisseur de fil` for precise UI; `grosseur de laine` is natural and search-friendly. Avoid `poids du fil` unless the source means grams. |
| yarn weight chart | `Tableau des épaisseurs de fil` | Tool title can also be `Grosseurs de laine` if a shorter display title is needed. |
| yarn amount / project yardage | `quantité de fil`, `métrage nécessaire`, `quantité de laine` | Choose by sentence. |
| yardage on label | `métrage` | Label concept: meters per skein/ball/weight. |
| skein / ball | `pelote` | Use `écheveau` only for a hank/skein that is actually an écheveau. |
| hank | `écheveau` | |
| yarn label | `étiquette`, `bande de pelote`, `banderole` | `étiquette` is plain; `bande de pelote` and `banderole` are label-specific. |
| fiber content | `composition du fil`, `composition` | |
| dye lot | `bain`, `bain de teinture`, `numéro de bain` | Use `numéro de bain` when reading labels. |
| color number | `référence du coloris`, `numéro de coloris` | `coloris` is standard on French yarn labels. |
| care instructions | `consignes d'entretien`, `instructions d'entretien` | |
| needle | `aiguille`, `aiguille à tricoter` | In context, `aiguille` is enough. |
| needle size | `taille d'aiguille`, `numéro d'aiguilles`, `aiguilles n° X` | For metric values, `aiguilles 4,5 mm` is natural. |
| needle size chart | `Tableau des tailles d'aiguilles` | Tool name. |
| needle gauge tool | `jauge à aiguilles` | Valid exception to the general "avoid jauge" rule; this is the standard accessory name for measuring needle sizes. |
| circular needle | `aiguille circulaire` | Plural: `aiguilles circulaires`. |
| straight needles | `aiguilles droites` | |
| DPNs | `aiguilles doubles pointes` | Common in DROPS; `aiguilles double pointe` also appears, but keep one form. |
| cable needle | `aiguille auxiliaire`, `aiguille à torsade` | Use `aiguille auxiliaire` in instructions, `aiguille à torsade` when naming the tool. |
| crochet hook | `crochet` | For dropped-stitch repairs. |
| stitch marker | `marqueur`, `marqueur de maille` | |
| row counter | `compteur de rangs` | Use for app/tool copy. |
| pattern viewer | `lecteur de modèle`, `affichage du PDF`, `vue des explications` | Choose based on actual feature context. |
| project | `projet`, `ouvrage`, `projet tricot` | `ouvrage` is very natural once the item is being worked. |
| stash | `stock de laine`, `réserve de fil`, `stock de fils` | Choose by context; `stash` is not primary. |
| leftovers / scrap yarn | `restes de laine`, `restes de fil` | |
| right side | `endroit`, `endroit de l'ouvrage` | |
| wrong side | `envers`, `envers de l'ouvrage` | |

## Stitch And Technique Terms

| English concept | French term to use | Notes |
|---|---|---|
| knit stitch | `maille endroit` | Abbrev: `m. end.` or `m end` in compact pattern tables. |
| purl stitch | `maille envers` | Abbrev: `m. env.` or `m env`. |
| knit | `tricoter à l'endroit`, `tricoter une maille endroit` | |
| purl | `tricoter à l'envers`, `tricoter une maille envers` | |
| stockinette stitch | `jersey endroit`, `jersey` | Use `jersey endroit` when contrast with reverse stockinette matters. |
| reverse stockinette | `jersey envers` | |
| garter stitch | `point mousse` | |
| ribbing | `côtes` | E.g. `côtes 1/1`, `côtes 2/2`. |
| seed stitch | `point de riz` | |
| moss stitch | `point de blé` or `point de riz double` | Choose based on source stitch definition. |
| cable | `torsade` | |
| lace | `dentelle`, `point ajouré`, `motif ajouré` | Use `Lace` only for yarn category if needed. |
| colorwork | `jacquard`, `tricot multicolore` | `jacquard` is common for stranded/colorwork patterns. |
| stranded colorwork | `jacquard à fils tirés`, `jacquard avec fils flottants` | Use explanatory phrasing if needed. |
| edge stitch | `maille lisière` | Abbrev: `m. lis.`. |
| stitch repeat | `motif`, `répétition du motif`, `rapport` | `rapport` appears in French pattern language, but `répétition` is clearer in articles. |
| repeat | `répéter`, `répétition` | |
| asterisks and brackets | `astérisques et crochets/parenthèses` | Use exact punctuation from source. |
| k2tog | `2 m. ens. à l'endroit` | In glossary entries, keep `k2tog` plus French expansion if source includes the abbreviation. |
| p2tog | `2 m. ens. à l'envers` | |
| ssk | `ssk`, `GGT`, or explanatory `glisser, glisser, tricoter` | French sources vary. If the English article discusses SSK, keep `ssk` and explain. |
| psso / SKP | `surjet simple`, `passer la maille glissée par-dessus` | |
| yarn over | `jeté` | |
| twisted stitch | `maille torse` | |
| slip stitch | `maille glissée`, `glisser une maille` | Specify `à l'endroit` or `à l'envers` when relevant. |
| pick up stitches | `relever des mailles` | Along an edge: `relever des mailles le long du bord`. |
| dropped stitch | `maille tombée`, `maille lâchée`, `maille perdue` | Use `maille tombée` in friendly prose; `maille lâchée` appears in dictionaries/patterns. |
| fix dropped stitch | `rattraper une maille tombée`, `reprendre une maille tombée` | |
| ladder | `échelle`, `fil horizontal`, `colonne défaite` | Choose by context; do not force a term if explanation is clearer. |
| frog / rip back | `défaire`, `détricoter` | `détricoter` is natural for undoing knitting; avoid forcing English `frog`. |
| lifeline | `fil de survie`, `ligne de vie` | Explain on first use; usage varies. |
| join new ball | `commencer une nouvelle pelote`, `changer de pelote`, `ajouter une nouvelle pelote` | |
| weave in ends | `rentrer les fils` | Not a literal weaving translation. |
| seam pieces | `assembler les pièces`, `coudre les pièces`, `faire les coutures` | |
| mattress stitch | `point de matelas` | |
| Kitchener stitch | `grafting`, `point de grafting`, `Kitchener stitch` | French usage varies. If source explains the technique, keep the English name in parentheses. |
| block / blocking | `bloquer`, `blocage`, `mettre en forme` | Use both concepts naturally: `bloquer et mettre en forme l'ouvrage`. |
| wet blocking | `blocage humide`, `blocage par lavage` | |
| steam blocking | `blocage à la vapeur`, `mettre en forme à la vapeur` | Preserve all source warnings. |
| spray blocking | `humidifier au vaporisateur puis bloquer` | More natural than a forced single noun. |

## Garment And Fit Terms

| English concept | French term to use | Notes |
|---|---|---|
| sweater | `pull` | Not `sweater` unless part of a product name. |
| cardigan | `gilet`, `cardigan` | `gilet` is plain French; `cardigan` is also common. |
| scarf | `écharpe` | |
| shawl | `châle` | |
| blanket | `couverture`, `plaid` | Use `plaid` for throw blanket when context fits. |
| hat | `bonnet` | Not `chapeau` unless it is actually a hat. |
| beanie | `bonnet` | |
| sock | `chaussette` | |
| mitten | `moufle` | |
| fingerless mitt | `mitaine` | |
| cuff | `poignet`, `bord-côtes`, `bordure en côtes` | Choose by garment part. |
| sleeve | `manche` | |
| yoke | `empiècement` | |
| raglan | `raglan` | |
| body | `corps` | Sweater body. |
| front piece | `devant` | |
| back piece | `dos` | |
| neckline | `encolure` | |
| armhole | `emmanchure` | |
| chest / bust measurement | `tour de poitrine` | |
| waist measurement | `tour de taille` | |
| hip measurement | `tour de hanches` | |
| finished measurements | `mesures du vêtement terminé`, `dimensions finies` | `mesures du vêtement terminé` is clearer. |
| body measurements | `mensurations` | |
| ease | `aisance` | |
| positive ease | `aisance positive` | Explain if the English source explains it. |
| negative ease | `aisance négative` | |
| fit | `coupe`, `ajustement`, `tomber` | Choose by sentence; `tomber` is useful for drape/fit. |
| oversized | `oversize`, `ample` | Use `oversize` if it is a style term. |

## Yarn Weight Categories

French knitters often encounter English yarn-weight names, especially in patterns and online yarn shops. Do not invent fully French category names that real knitters would not recognize.

Use these display names:

| English category | French display |
|---|---|
| Lace | `Lace / dentelle` |
| Super Fine / Fingering | `Fingering / Sock` |
| Sport | `Sport` |
| DK / Light | `DK / Light` |
| Worsted / Medium | `Worsted / Aran / Medium` |
| Bulky | `Bulky / Chunky` |
| Super Bulky | `Super Bulky` |
| Jumbo | `Jumbo` |

Guidelines:

- Use `épaisseur de fil` as the precise concept.
- Use `grosseur de laine` where natural French search phrasing matters.
- Keep `Fingering`, `Sock`, `Sport`, `DK`, `Worsted`, `Aran`, `Bulky`, `Chunky`, `Lace`, and `Jumbo` as category names.
- Explain categories through `aiguilles en mm`, `échantillon`, and `mètres par 50 g/100 g` where the source allows it.
- Use `fil à chaussettes` only when the context is typical sock yarn; not every fingering yarn is sock yarn.
- Explain WPI as `wraps per inch (WPI)` on first use, then `WPI`. Do not translate the abbreviation.

## Tool Names And Route Shape

Recommended French tool names and public routes:

| English | French title | Recommended route |
|---|---|---|
| Free Knitting Tools | `Outils tricot gratuits` | `/fr/outils/` |
| Cast On Calculator | `Calculateur de mailles à monter` | `/fr/outils/calculateur-mailles-a-monter/` |
| Yarn Estimator | `Estimateur de quantité de laine` | `/fr/outils/estimateur-quantite-laine/` |
| Needle Size Chart | `Tableau des tailles d'aiguilles` | `/fr/outils/tailles-aiguilles/` |
| Yarn Weight Chart | `Tableau des épaisseurs de fil` | `/fr/outils/epaisseurs-de-fil/` |
| Knitting Abbreviations | `Abréviations tricot` | `/fr/outils/abreviations-tricot/` |
| Knitting Size Charts | `Tableaux de tailles tricot` | `/fr/outils/tableaux-tailles-tricot/` |

Recommended article/category routes:

| English | French |
|---|---|
| `/articles/` | `/fr/articles/` |
| `/articles/category/gauge-calculations/` | `/fr/articles/categorie/echantillon-et-calculs/` |
| `/articles/category/yarn/` | `/fr/articles/categorie/fils-et-laine/` |
| `/articles/category/needles/` | `/fr/articles/categorie/aiguilles/` |
| `/articles/category/techniques/` | `/fr/articles/categorie/techniques/` |
| `/articles/category/app-tools/` | `/fr/articles/categorie/application-et-outils/` |

Confirm final French slugs before publishing.

## Common UI Copy

| English | French |
|---|---|
| Tools | `Outils` |
| Articles | `Articles` |
| App | `Application` |
| Launching soon | `Bientôt disponible` |
| Privacy Policy | `Politique de confidentialité` |
| All tools | `Tous les outils` |
| All articles | `Tous les articles` |
| Category | `Catégorie` |
| By KnitTools | `Par KnitTools` |
| Published | `Publié` |
| Updated | `Mis à jour` |
| View | `Voir` |
| more | `plus` |
| Coming | `À venir` |
| No articles in this category yet. | `Il n'y a pas encore d'articles dans cette catégorie.` |
| Back to all articles | `Retour à tous les articles` |
| Frequently asked questions | `Questions fréquentes` |
| Email address | `Adresse e-mail` |
| Leave this field empty | `Laisse ce champ vide` |
| Reserve my price | `Réserver le prix de lancement` |
| Reserved. See you at launch. | `C'est réservé. On te prévient au lancement.` |
| Something went wrong. Please try again. | `Une erreur est survenue. Réessaie.` |
| Network error. Please check your connection. | `Erreur réseau. Vérifie ta connexion.` |
| Sending... | `Envoi...` |

## Category Labels And Descriptions

Use these when adding French category constants:

| Key | Label | Description |
|---|---|---|
| `gauge-calculations` | `Échantillon et calculs` | `Échantillon, mailles et calculs. Les chiffres qui décident si ton ouvrage fini aura la taille prévue.` |
| `yarn` | `Fils et laine` | `Choisir un fil, le remplacer, lire une étiquette et estimer la quantité nécessaire pour un projet.` |
| `needles` | `Aiguilles` | `Tailles, matières et types d'aiguilles à tricoter. Quoi acheter et quand chaque aiguille est utile.` |
| `techniques` | `Techniques` | `Guides pratiques pas à pas. Corriger les erreurs, finir proprement et suivre un modèle du montage au rabattage.` |
| `app-tools` | `Application et outils` | `Applications, calculateurs et outils physiques pour planifier, suivre et organiser tes projets tricot.` |

## Article Translation Workflow

1. Use the English article as the only source of truth.
2. Preserve the content structure: title, description, headings, examples, tables, FAQ items, internal links, and warnings.
3. Translate meaning, not sentence shape. Natural French is allowed; new content is not.
4. Keep source caveats and uncertainty exactly as strong or weak as in English.
5. Localize units to metric-first French conventions.
6. Use this guide's term decisions consistently.
7. Keep French article files under `src/content/articles/fr/`.
8. Add `lang: fr`, the original `translationKey`, and `draft: true` until review.
9. Do not add a French article to `articleTranslations` until approved.
10. Run `npm run build` after implementation.
11. Do not deploy or publish until the user approves.

## Implementation Checklist For French Locale

When implementing French pages, expect to update at least:

- `src/content.config.ts`: add `fr` to the article `lang` enum.
- `src/i18n/config.ts`: add `fr` to supported languages.
- `src/i18n/routes.ts`: add French tool, article, and category routes.
- `src/i18n/ui.ts`: add French shared UI strings.
- `src/lib/categories.ts`: add French category labels and descriptions and update helper language unions.
- `src/content/articles/fr/`: add translated article drafts.
- `src/pages/fr/`: add French tool, article index, category, and article routes.
- `AGENTS.md`: update route and localization notes when French pages are actually added.
- `memory/MEMORY.md`: update project memory when the French locale is implemented.

Keep route slashes consistent with existing localized pages.

## Quality Checklist

Before marking a French translation ready:

- Every factual claim matches the English source.
- No paragraph has been added just to sound helpful.
- No warnings, limitations, or caveats were removed.
- Tool behavior, labels, examples, and table data match the English page.
- Metric units are primary and French number formatting is used in prose.
- `échantillon`, `mailles`, `rangs`, `aiguilles`, `fil`, `pelote`, and `métrage` are used consistently.
- `jauge` as a translation of knitting gauge, literal `poids du fil` for yarn weight, and generic AI phrases are absent. `jauge à aiguilles` is allowed for the needle gauge accessory.
- Article remains `draft: true` until reviewed.
- `npm run build` passes.

## Sources Used For Terminology

Reference French knitting usage from these sources:

- DROPS / Garnstudio French dictionary and glossary for abbreviations and pattern vocabulary such as `maille`, `m end`, `m env`, `rang`, `rabattre`, `relever des mailles`, `tension tricot`, and `échantillon`: https://www.garnstudio.com/dictionary.php?lang=fr
- DROPS French patterns and lessons for real pattern phrasing, diagrams, `aiguilles circulaires`, `aiguilles doubles pointes`, `point mousse`, `jersey`, `tour`, `rang`, and `10 x 10 cm` gauge formatting: https://www.garnstudio.com/
- Bergère de France on swatching for `échantillon`, `mailles pour 10 cm`, `rangs pour 10 cm`, and adjusting needle size: https://www.bergeredefrance.fr/content/comment-faire-un-echantillon
- Bergère de France on yarn labels for `bande de pelote`, `composition du fil`, `poids`, `longueur`, `coloris`, and `numéro de bain de teinture`: https://www.bergeredefrance.fr/campus/je-me-familiarise-avec-le-materiel/bande-pelote-laine
- Rascol needle/yarn calculator for current French ecommerce wording around `taille d'aiguille`, yarn categories, and metric needle sizes: https://www.rascol.com/conseils-et-astuces/tricot/calculateur-taille-aiguille-laine
- Tricotez-moi on `grosseurs de laine`, metric yarn length, and English category names such as Lace, Fingering, DK, Worsted, Aran, Bulky, and Chunky in French context: https://www.tricotez-moi.com/fr/blog/quelles-sont-les-diff%C3%A9rentes-grosseurs-de-laine-%C3%A0-tricoter-.html
- Les Triconautes for natural contemporary French knitting-blog tone using `tu`, and terms such as `maille endroit`, `maille envers`, `jeté`, `surjet simple`, `maille tombée`, `détricoter`, `métrage`, and `numéro de bain`: https://www.lestriconautes.com/
- Happywool / Phildar Wool School for beginner-friendly French technique wording such as `monter les mailles`, `rabattre les mailles`, `mailles endroit`, and `mailles envers`: https://woolschool.happywool.com/
