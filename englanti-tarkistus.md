# KnitTools Website English Article Audit Plan

## Summary
Tavoite on jatkaa työ toisessa chatissä hallitusti: ensin selvitetään faktat nettilähteistä, sitten auditoidaan ja korjataan englanninkieliset artikkelit, ja vasta sen jälkeen käytetään lopullista englantia suomen ja muiden kielten lähteenä.

Tässä vaiheessa ei pidä koskea suomenkielisiin eikä muihin lokalisoituihin artikkeleihin. Työn ensimmäinen varsinainen portti on **research/fact baseline**, ei editointi.

Obsidian-lähde:
`C:\Users\emmah\Documents\ObsidianVault\Projects\Active\KnitTools\Website\SEO\Articles`

Repo-kohde:
`C:\Dev\KnitTools-website\src\content\articles`

Nykyinen inventaario:
- 38 englanninkielistä repoartikkelia on muuttunut.
- Kaikille 38 artikkelille löytyi Obsidian-vastine.
- 18 artikkelissa valittu Obsidian-lähde on `-v2`.
- 20 artikkelissa valittu Obsidian-lähde on numeroprefixillä oleva nykyinen tiedosto, ei `-v2`.
- Älä päättele päivittyneisyyttä pelkästä `-v2`-nimestä.

## Obsidian Inventory
| Slug | Obsidian source | Source rule |
|---|---|---|
| `at-the-same-time-knitting` | `20-at-the-same-time-knitting-v2.md` | v2 preferred |
| `best-knitting-apps` | `31-best-knitting-apps.md` | current file |
| `best-yarn-for-beginners` | `32-best-yarn-for-beginners.md` | current file |
| `circular-vs-straight-vs-dpn` | `14-circular-vs-straight-vs-dpn-v2.md` | v2 preferred |
| `digital-vs-physical-row-counters` | `40-digital-vs-physical-row-counters.md` | current file |
| `essential-knitting-tools` | `33-essential-knitting-tools.md` | current file |
| `fix-dropped-stitches` | `21-fix-dropped-stitches-v2.md` | v2 preferred |
| `free-knitting-calculators` | `36-free-knitting-calculators.md` | current file |
| `gauge-doesnt-match` | `35-gauge-doesnt-match.md` | current file |
| `gauge-swatch-step-by-step` | `28-gauge-swatch-step-by-step.md` | current file |
| `how-many-stitches-to-cast-on` | `07-how-many-stitches-to-cast-on-v2.md` | v2 preferred |
| `how-much-yarn-do-i-need` | `05-how-much-yarn-do-i-need.md` | current file |
| `how-to-block-knitting` | `24-how-to-block-knitting-v2.md` | v2 preferred |
| `how-to-knit-hat` | `30-how-to-knit-hat.md` | current file |
| `how-to-knit-socks` | `29-how-to-knit-socks.md` | current file |
| `how-to-measure-knitting-gauge` | `04-how-to-measure-knitting-gauge.md` | current file |
| `how-to-read-knitting-pattern` | `17-how-to-read-knitting-pattern-v2.md` | v2 preferred |
| `how-to-read-yarn-label` | `09-how-to-read-yarn-label.md` | current file |
| `how-to-substitute-yarn` | `08-how-to-substitute-yarn.md` | current file |
| `identify-mystery-yarn` | `12-identify-mystery-yarn.md` | current file |
| `increase-decrease-evenly` | `06-increase-decrease-evenly-v2.md` | v2 preferred |
| `join-new-ball-of-yarn` | `23-join-new-ball-of-yarn-v2.md` | v2 preferred |
| `knit-first-scarf` | `27-knit-first-scarf-v2.md` | v2 preferred |
| `knitting-needle-materials` | `15-knitting-needle-materials-v2.md` | v2 preferred |
| `knitting-pattern-repeats` | `19-knitting-pattern-repeats-v2.md` | v2 preferred |
| `knitting-pattern-sizes-and-fit` | `18-knitting-pattern-sizes-and-fit-v2.md` | v2 preferred |
| `needle-size-for-beginners` | `16-needle-size-for-beginners-v2.md` | v2 preferred |
| `organize-knitting-projects` | `37-organize-knitting-projects.md` | current file |
| `pick-up-stitches` | `25-pick-up-stitches-v2.md` | v2 preferred |
| `seam-knitted-pieces` | `26-seam-knitted-pieces-v2.md` | v2 preferred |
| `track-knitting-time` | `41-track-knitting-time.md` | current file |
| `track-rows-knitting` | `34-track-rows-knitting.md` | current file |
| `what-is-gauge-in-knitting` | `11-what-is-gauge-in-knitting-v2.md` | v2 preferred |
| `why-knitting-curls` | `22-why-knitting-curls-v2.md` | v2 preferred |
| `yarn-fibers-compared` | `10-yarn-fibers-compared.md` | current file |
| `yarn-for-blanket` | `38-yarn-for-blanket.md` | current file |
| `yarn-for-sweater` | `39-yarn-for-sweater.md` | current file |
| `yarn-weight-substitution` | `13-yarn-weight-substitution-v2.md` | v2 preferred |

## Work Plan
1. **Research gate before editing**
   - Selvitä ensin faktat netistä ja kirjaa lähteet ennen artikkelikorjauksia.
   - Pakolliset lähdetyypit:
     - Craft Yarn Council: yarn weight system, WPI, gauge ranges, needle recommendations.
     - Craft Yarn Council: yarn label information ja care symbols.
     - Needle size conversion sources for US/metric/UK/Japanese.
     - Technique references for k2tog, ssk, mattress stitch, picking up stitches, blocking, gauge swatching.
     - Fiber/blocking sources for superwash, acrylic steam blocking, cotton stretch, wool felting, yarn substitution.
     - Google Search Central only for later SEO phase.
   - Jokainen täsmällinen luku tai väite tarkistetaan ennen kuin sitä pidetään julkaisukelpoisena.

2. **English-only audit**
   - Käsittele vain root-artikkelit: `src/content/articles/*.md`.
   - Älä koske `src/content/articles/fi/`, `de/`, `sv/`, `no/`, `fr/`, `nl/` tai `da/`.
   - Auditoi jokainen artikkeli valittua Obsidian sourcea vasten.
   - Käytä `knit-article-validator`-mallia:
     - writing quality
     - factual accuracy
     - voice/style
     - cross-article consistency

3. **English corrections**
   - Korjaa vain englanninkieliset artikkelit.
   - Poista AI/OCR/scanner/camera/voice/parser/project-summary -tuoteväitteet.
   - Pidä sallittu KnitTools-kuvaus ei-AI-ominaisuuksissa: row counter, multiple counters, project management, session history, saved PDF patterns, Ravelry, calculators, reference library, project notes, progress photos, project stats/session tracking, rows per hour, home-screen widget.
   - Varmista luonnollinen englanninkielinen neulojakieli:
     - US terms primary where current English content uses them.
     - Mention UK equivalents only when needed: `gauge/tension`, `bind off/cast off`, `stockinette/stocking stitch`.
   - Pehmennä liian tarkat langanmenekki- ja kokoväitteet haarukoiksi, jos lähteet eivät tue tarkkaa lukua.

4. **Do not do article SEO yet**
   - Älä julkaise paikallisen version uusia article title/description -muutoksia sellaisenaan.
   - Tuotannossa article title/description -pituudet ovat paremmassa kunnossa:
     - production: 0/38 titles over 60 chars, 0/38 descriptions over 160 chars
     - local new version: 16/38 titles over 60 chars, 10/38 descriptions over 160 chars
   - SEO tehdään myöhemmin erillisenä vaiheena:
     - keep production titles/descriptions as baseline
     - add `Article` JSON-LD if wanted
     - set `og:type="article"` if wanted
     - add localized `browserTitle` support only after English titles are stable

5. **Localization only after English is final**
   - Kun englanninkieliset artikkelit ovat faktallisesti ja tyylillisesti valmiit, suomi tarkistetaan lopullista englantia vasten.
   - Sen jälkeen muut kielet samalla mallilla, kieli kerrallaan.
   - Älä tee monikielistä päivitystä ennen kuin englanti on hyväksytty lähdetekstiksi.

## Test Plan
- Inventory:
  - Confirm 38 English repo articles still map to Obsidian sources above.
  - Confirm no localized article files are modified during English phase.
- Content safety:
  - `rg -n -i "\b(ai|artificial intelligence|ocr|voice|camera|scanner|scanning|yarn label scanner|instruction parser|project summaries|voice command)\b" src/content/articles/*.md`
  - Expected: no AI product-feature leftovers.
- Obsidian metadata cleanup:
  - `rg -n "TITLE TAG|META DESCRIPTION|PRIMARY KEYWORD|SECONDARY KEYWORDS|ARTICLE TYPE|TARGET WORD COUNT|INTERNAL LINKS|<!--|-->|^# " src/content/articles/*.md`
  - Expected: no Obsidian metadata or duplicate H1 in rendered article body.
- Link safety:
  - `rg -n --pcre2 "\]\(/(?!articles/|tools/|about/|$)" src/content/articles/*.md`
  - Expected: no broken root article links.
- Project checks:
  - `npm run check`
  - `npm run lint`
  - `npm run format:check`
  - `npm run build`
- Rendered spot checks:
  - `/articles/`
  - `/articles/best-knitting-apps/`
  - `/articles/yarn-weight-substitution/`
  - `/articles/how-to-read-yarn-label/`
  - `/articles/track-knitting-time/`

## Assumptions
- Obsidian source selection is: use `-v2` when present, otherwise use the numbered current file.
- Repo currently has all 38 English articles modified.
- First follow-up implementation must not edit Finnish or other localized article folders.
- SEO is a separate later phase, not part of the English content/fact audit.
- No commits or pushes unless explicitly requested.
