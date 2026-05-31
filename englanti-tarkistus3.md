# KnitTools English Article Audit Runbook

## Purpose

Tavoite on tehdä viimeinen julkaisuvalmiusauditointi kaikille 38 englanninkieliselle root-artikkelille ennen kuin niitä käytetään lähteenä suomelle tai muille kielille.

Lopputilan pitää olla:

- englanninkieliset artikkelit ovat faktallisesti oikein
- neulontatermit ja tekniikkakuvaukset ovat luotettavia
- kieli kuulostaa luonnolliselta englanninkieliseltä neulonta-artikkelilta
- AI/OCR/scanner/voice/parser/project-summary -tuoteväitteitä ei ole julkaisuartikkeleissa
- lokalisoituihin artikkeleihin, SEO-vaiheeseen, deployhin tai git-julkaisuun ei kosketa tässä vaiheessa

Tämä dokumentti on käytännön runbook. Se on tarkoitettu seuraavien chattien ensisijaiseksi työohjeeksi.

## Hard Scope

Käsittele vain:

- `src/content/articles/*.md`

Älä käsittele tai muokkaa:

- `src/content/articles/fi/`
- `src/content/articles/de/`
- `src/content/articles/sv/`
- `src/content/articles/no/`
- `src/content/articles/fr/`
- `src/content/articles/nl/`
- `src/content/articles/da/`

Älä tee tässä auditissa:

- SEO title/description -optimointia
- lokalisaatioiden päivitystä
- komponentti-, layout-, route- tai i18n-refaktorointia
- deployta
- commit/pushia ilman erillistä pyyntöä
- `AGENTS.md`- tai `memory/MEMORY.md`-päivitystä, ellei myöhemmin tehdä oikeaa arkkitehtuurimuutosta

Jos huomaat ongelman, joka kuuluu SEO:hon, lokalisaatioihin, komponentteihin tai reitteihin, raportoi se erillisenä jatkotyönä. Älä korjaa sitä tämän auditin sisällä.

## Current Baseline

Nykyinen työpuu on valmiiksi likainen. Kaikki 38 englanninkielistä root-artikkelia ovat jo muuttuneita, ja lisäksi reposta löytyy muita muutoksia.

Jokaisen toteutuserän alussa:

    git status --short

Jokaisen toteutuserän jälkeen varmista:

- muutokset pysyivät vain käsiteltävissä root-artikkeleissa
- lokalisoituihin artikkelikansioihin ei tullut uusia muutoksia
- et sotkenut olemassa olevia käyttäjän muutoksia
- jos samassa tiedostossa oli jo muutoksia, työskentele niiden kanssa, älä palauta niitä

Root-artikkelien määrä pitää olla 38:

    $files = Get-ChildItem -LiteralPath 'src\content\articles' -File -Filter '*.md' | Sort-Object Name
    $files.Count

Odotus: `38`.

## Research Gate

Ennen varsinaista artikkelieditointia tee lähdepaketti. Tämä gate tehdään ilman artikkelimuutoksia.

Varmennustaso on claim-level verification:

- faktalauseet, numerot, tekniikkakuvaukset, mitat, standardit, tuotteen/appin ominaisuudet ja muuttuvat väitteet tarkistetaan lähteestä tai muotoillaan varovaisemmaksi
- puhtaasti tyylillisiä, siirtymä- ja lukijaa ohjaavia lauseita ei tarvitse lähteistää väkisin
- älä käytä muistia tai mallin koulutusdataa faktatarkistuksen lähteenä

Päivitä lähteet aina webistä toteutussession alussa, koska standardit, appitiedot ja docsit voivat muuttua.

Seed-lähteet, tarkistettu 2026-05-23:

- Craft Yarn Council standards: https://www.craftyarncouncil.com/standards
- CYC yarn weight system: https://media.craftyarncouncil.com/standards/yarn-weight-system
- CYC yarn label information: https://www.craftyarncouncil.com/standards/yarn-label-information
- CYC knitting abbreviations: https://www.craftyarncouncil.com/standards/knitting-abbreviations
- CYC knit chart symbols: https://www.craftyarncouncil.com/standards/knit-chart-symbols
- Vogue Knitting needle conversion chart: https://www.vogueknitting.com/pattern-help/how-to/techniques-abbreviations/knitting-needles/
- Nimble Needles gauge swatches: https://nimble-needles.com/tutorials/knitting-gauge-swatches/
- TECHknitting picking up stitches: https://techknitting.blogspot.com/2015/11/pick-up-stitches-along-selvage.html
- Sheep & Stitch mattress stitch: https://sheepandstitch.com/library/how-to-mattress-stitch-an-invisible-seam/
- Interweave blocking techniques PDF: https://www.interweave.com/wp-content/uploads/knitting-techniques-freemium-final.pdf

Tärkeä CYC-huomio: yarn weight -järjestelmä on drift-prone. CYC:n sivu mainitsee, että järjestelmää päivitetään ja Size 8 -symboli on tulossa. Älä kirjoita “0-7” pysyvänä totuutena ilman nykytilan tarkistusta. Jos artikkelissa käsitellään weight category -järjestelmää, tarkista CYC:n nykyinen tila juuri siinä sessiossa.

Japanese needle conversion -väitteet pitää tarkistaa erityisen varovasti. Vogue kattaa metric/US/UK, mutta ei välttämättä Japanese-saraketta. Jos artikkelissa on Japanese conversion -tietoa, käytä vähintään kahta erillistä lähdettä tai pehmennä väite.

## Obsidian Source Map

Obsidian-lähde:

`C:\Users\emmah\Documents\ObsidianVault\Projects\Active\KnitTools\Website\SEO\Articles`

Repo-kohde:

`C:\Dev\KnitTools-website\src\content\articles`

Käytä tätä karttaa artikkelikohtaisessa vertailussa. Älä päättele ajantasaisuutta pelkästä `-v2`-nimestä, vaan käytä alla merkittyä source rulea.

| Repo slug                          | Obsidian source                           | Source rule  |
| ---------------------------------- | ----------------------------------------- | ------------ |
| `at-the-same-time-knitting`        | `20-at-the-same-time-knitting-v2.md`      | v2 preferred |
| `best-knitting-apps`               | `31-best-knitting-apps.md`                | current file |
| `best-yarn-for-beginners`          | `32-best-yarn-for-beginners.md`           | current file |
| `circular-vs-straight-vs-dpn`      | `14-circular-vs-straight-vs-dpn-v2.md`    | v2 preferred |
| `digital-vs-physical-row-counters` | `40-digital-vs-physical-row-counters.md`  | current file |
| `essential-knitting-tools`         | `33-essential-knitting-tools.md`          | current file |
| `fix-dropped-stitches`             | `21-fix-dropped-stitches-v2.md`           | v2 preferred |
| `free-knitting-calculators`        | `36-free-knitting-calculators.md`         | current file |
| `gauge-doesnt-match`               | `35-gauge-doesnt-match.md`                | current file |
| `gauge-swatch-step-by-step`        | `28-gauge-swatch-step-by-step.md`         | current file |
| `how-many-stitches-to-cast-on`     | `07-how-many-stitches-to-cast-on-v2.md`   | v2 preferred |
| `how-much-yarn-do-i-need`          | `05-how-much-yarn-do-i-need.md`           | current file |
| `how-to-block-knitting`            | `24-how-to-block-knitting-v2.md`          | v2 preferred |
| `how-to-knit-hat`                  | `30-how-to-knit-hat.md`                   | current file |
| `how-to-knit-socks`                | `29-how-to-knit-socks.md`                 | current file |
| `how-to-measure-knitting-gauge`    | `04-how-to-measure-knitting-gauge.md`     | current file |
| `how-to-read-knitting-pattern`     | `17-how-to-read-knitting-pattern-v2.md`   | v2 preferred |
| `how-to-read-yarn-label`           | `09-how-to-read-yarn-label.md`            | current file |
| `how-to-substitute-yarn`           | `08-how-to-substitute-yarn.md`            | current file |
| `identify-mystery-yarn`            | `12-identify-mystery-yarn.md`             | current file |
| `increase-decrease-evenly`         | `06-increase-decrease-evenly-v2.md`       | v2 preferred |
| `join-new-ball-of-yarn`            | `23-join-new-ball-of-yarn-v2.md`          | v2 preferred |
| `knit-first-scarf`                 | `27-knit-first-scarf-v2.md`               | v2 preferred |
| `knitting-needle-materials`        | `15-knitting-needle-materials-v2.md`      | v2 preferred |
| `knitting-pattern-repeats`         | `19-knitting-pattern-repeats-v2.md`       | v2 preferred |
| `knitting-pattern-sizes-and-fit`   | `18-knitting-pattern-sizes-and-fit-v2.md` | v2 preferred |
| `needle-size-for-beginners`        | `16-needle-size-for-beginners-v2.md`      | v2 preferred |
| `organize-knitting-projects`       | `37-organize-knitting-projects.md`        | current file |
| `pick-up-stitches`                 | `25-pick-up-stitches-v2.md`               | v2 preferred |
| `seam-knitted-pieces`              | `26-seam-knitted-pieces-v2.md`            | v2 preferred |
| `track-knitting-time`              | `41-track-knitting-time.md`               | current file |
| `track-rows-knitting`              | `34-track-rows-knitting.md`               | current file |
| `what-is-gauge-in-knitting`        | `11-what-is-gauge-in-knitting-v2.md`      | v2 preferred |
| `why-knitting-curls`               | `22-why-knitting-curls-v2.md`             | v2 preferred |
| `yarn-fibers-compared`             | `10-yarn-fibers-compared.md`              | current file |
| `yarn-for-blanket`                 | `38-yarn-for-blanket.md`                  | current file |
| `yarn-for-sweater`                 | `39-yarn-for-sweater.md`                  | current file |
| `yarn-weight-substitution`         | `13-yarn-weight-substitution-v2.md`       | v2 preferred |

## Default Batch Map

Käytä tätä oletuseräjakoa. Älä tee kaikkia vaiheita kerralla.

### Batch 0: preparation, no edits

Tee ensin:

- `git status --short`
- root-artikkelien laskenta, odotus 38
- lähdepaketin web-tarkistus
- Obsidian source mapin olemassaolon tarkistus
- ensimmäisen toteutuserän valinta

Ei artikkelimuutoksia tässä vaiheessa.

### Batch 1: app and KnitTools product claims

Tee 2 artikkelia kerrallaan:

- 1A: `best-knitting-apps`, `digital-vs-physical-row-counters`
- 1B: `track-rows-knitting`, `track-knitting-time`
- 1C: `organize-knitting-projects`, `essential-knitting-tools`

Päätarkistus:

- KnitTools-tuoteväitteet
- app-market- ja hinnoitteluväitteet
- muuttuvat Android/iOS/Ravelry/smartwatch-väitteet
- AI/OCR/scanner/voice/parser-väitteiden poisto

### Batch 2: gauge

Tee 2 + 2:

- 2A: `what-is-gauge-in-knitting`, `how-to-measure-knitting-gauge`
- 2B: `gauge-swatch-step-by-step`, `gauge-doesnt-match`

Päätarkistus:

- gauge/tension-terminologia
- stitch/row gauge -selitys
- swatch measurement -ohjeet
- blocked vs unblocked gauge
- CYC gauge ranges, jos weight category -väitteitä on mukana

### Batch 3: yarn label and yarn identification

Tee näin:

- 3A: `how-to-read-yarn-label`, `identify-mystery-yarn`
- 3B: `yarn-fibers-compared` yksin, jos faktatiheys on korkea

Päätarkistus:

- yarn label -tiedot
- care symbols
- dye lot / color number
- WPI
- fiber behavior -väitteet

### Batch 4: yarn amount and substitution

Älä tee kaikkia yhdessä.

- 4A: `how-much-yarn-do-i-need`, `yarn-for-blanket`
- 4B: `yarn-for-sweater` yksin
- 4C: `how-to-substitute-yarn` yksin
- 4D: `yarn-weight-substitution` yksin

Päätarkistus:

- yardage/meterage estimates
- project-size ranges
- yarn substitution logic
- CYC yarn weight ranges
- liian tarkkojen lankamääräväitteiden pehmennys

### Batch 5: needles

Voidaan tehdä yhdessä, jos lähdepaketti on valmis:

- `needle-size-for-beginners`
- `circular-vs-straight-vs-dpn`
- `knitting-needle-materials`

Päätarkistus:

- needle size conversions
- metric/US/UK consistency
- circular vs straight vs DPN claims
- bamboo/wood/metal material claims

Jos mukana on laaja conversion table tai Japanese conversion -väitteitä, pysähdy ja käsittele kyseinen artikkeli yksin.

### Batch 6: technique guides

Tee pienissä osissa:

- 6A: `fix-dropped-stitches`, `join-new-ball-of-yarn`
- 6B: `pick-up-stitches`, `seam-knitted-pieces`
- 6C: `increase-decrease-evenly` yksin
- 6D: `how-to-block-knitting` yksin

Päätarkistus:

- tekniikkakuvausten oikeellisuus
- k2tog, ssk, mattress stitch, picking up stitches
- blocking methods
- fiber-specific blocking behavior
- ohjeiden turvallisuus keskeneräiselle projektille

### Batch 7: pattern reading

Tee 2 + 2:

- 7A: `how-to-read-knitting-pattern`, `knitting-pattern-repeats`
- 7B: `knitting-pattern-sizes-and-fit`, `at-the-same-time-knitting`

Päätarkistus:

- pattern notation
- repeat syntax
- size/fit/ease terminology
- simultaneous shaping
- US/UK term clarity where useful

### Batch 8: project guides

Tee 2 + 2:

- 8A: `best-yarn-for-beginners`, `knit-first-scarf`
- 8B: `how-to-knit-hat`, `how-to-knit-socks`

Päätarkistus:

- beginner realism
- project-appropriate yarn/needle claims
- hat/sock structure
- no overpromising “easy/simple/quick” where it minimizes difficulty

### Batch 9: calculators and final cleanup

Tee lopuksi:

- 9A: `free-knitting-calculators` yksin
- 9B: `how-many-stitches-to-cast-on` yksin
- 9C: koko root-artikkelijoukon final grep + project checks

`how-many-stitches-to-cast-on` käsitellään yksin laskennallisen riskin takia.

## Per-Batch Workflow

Ennen erän editointia:

- lue jokainen erän repoartikkeli kokonaan
- lue vastaava Obsidian-lähde
- tunnista artikkelityyppi:
  - reference page
  - educational/explainer
  - technique guide
  - project guide
  - comparison/list
- listaa faktaväitteet, luvut, tekniikkakuvaukset ja muuttuvat väitteet
- tarkista ne lähteistä tai päätä pehmentää ne

Editoinnin aikana:

- korjaa vain todetut ongelmat
- älä tee laajaa uudelleenkirjoitusta, jos teksti on jo hyvä
- älä lisää uusia faktoja ilman lähdettä
- älä optimoi SEO title/description -kenttiä
- älä muuta lokalisoituja artikkeleita
- säilytä protected terms oikein:
  - k, p, k2tog, ssk, skp, s2kp, psso, sl, yo, M1, M1L, M1R, kfb, pfb, RS, WS, DPN(s), WPI, BO, CO
  - cast on, bind off, cast off, gauge, gauge swatch, stockinette, garter stitch, ribbing, seed stitch, moss stitch, mattress stitch, Kitchener stitch
  - Lace, Fingering, Sock, Sport, DK, Light Worsted, Worsted, Aran, Bulky, Chunky, Super Bulky, Jumbo, Roving
  - Craft Yarn Council, CYC, Ravelry, KnitTools

Kielisäännöt:

- käytä US knitting terms oletuksena
- mainitse UK-termit vain kun lukija hyötyy:
  - gauge/tension
  - bind off/cast off
  - stockinette/stocking stitch
- ei first person -ääntä
- ei “we”
- käytä `you/your`-ääntä luonnollisesti, mutta sekoita mukaan neutraaleja lauseita
- ei em dash -merkkejä
- headingit sentence case -tyyliin
- ei chatbot-lopetuksia
- ei “Happy knitting”
- ei “Let’s dive in”
- ei “Here’s what you need to know”
- ei AI-filleriä kuten `delve`, `vibrant`, `crucial`, `comprehensive`, `seamless`, `robust`, `cornerstone`, `realm`, `empower`, `showcase`, `testament`, `underscore`, `navigate` abstraktissa merkityksessä

Erän jälkeen raportoi:

- mitkä artikkelit luettiin
- mitkä artikkelit muuttuivat
- tärkeimmät faktakorjaukset ja lähteet
- tärkeimmät language/style-korjaukset
- jäikö mitään epävarmaa
- pitääkö seuraava erä tehdä yksin vai voiko sen yhdistää oletusjaon mukaan

Pysähdy erän jälkeen. Älä aloita seuraavaa erää ilman käyttäjän erillistä pyyntöä.

## KnitTools Product Claim Rules

Sallittu KnitTools-kuvaus englannin julkaisuartikkeleissa:

- row counter
- multiple counters
- project management
- session history
- saved PDF patterns
- Ravelry
- calculators
- reference library
- project notes
- progress photos
- project stats/session tracking
- rows per hour
- home-screen widget

Poista, vältä tai pehmennä englannin julkaisuartikkeleista:

- AI
- artificial intelligence
- OCR
- camera
- scanner
- scanning
- yarn label scanner
- voice
- voice command
- instruction parser
- project summaries

Jos jokin poistettava termi on artikkelissa muussa kuin tuoteväitemerkityksessä, arvioi tapaus erikseen. Älä poista teknisesti oikeaa neutraalia mainintaa mekaanisesti, mutta älä jätä KnitToolsille ominaisuutta, jota ei saa julkaisuartikkeleissa väittää.

## Stop Points

Pysähdy ja raportoi, jos:

- lähteet ovat ristiriidassa keskenään
- artikkeli vaatisi laajan rewrite-kierroksen
- korjaus vaikuttaisi SEO title/description -strategiaan
- korjaus vaatisi lokalisaatioiden päivittämistä
- korjaus vaatisi komponentti-, route- tai i18n-muutoksia
- faktaväitettä ei löydy luotettavasta lähteestä eikä sitä voi turvallisesti pehmentää
- erä alkaa laajeta yli sovitun artikkelimäärän
- `git status --short` näyttää uusia muutoksia lokalisoiduissa kansioissa
- build/check epäonnistuu syystä, joka ei selvästi liity käsiteltyyn erään

## Verification Commands

Root-artikkelien määrä:

```powershell
$files = Get-ChildItem -LiteralPath 'src\content\articles' -File -Filter '*.md' | Sort-Object Name
$files.Count
```

Odotus: `38`.

AI-tuoteväitejäämät:

```powershell
Select-String -Path $files.FullName -Pattern '\b(ai|artificial intelligence|ocr|voice|camera|scanner|scanning|yarn label scanner|instruction parser|project summaries|voice command)\b' -CaseSensitive:$false
```

Odotus: ei englanninkielisiä tuoteväitejäämiä.

Obsidian-meta ja duplicate H1:

```powershell
Select-String -Path $files.FullName -Pattern 'TITLE TAG|META DESCRIPTION|PRIMARY KEYWORD|SECONDARY KEYWORDS|ARTICLE TYPE|TARGET WORD COUNT|INTERNAL LINKS|<!--|-->|^# '
```

Odotus: ei Obsidian-metaa tai duplicate H1 -jäämiä.

Root-linkit:

```powershell
Select-String -Path $files.FullName -Pattern '\]\(/(?!\)|articles/|tools/|about/)'
```

Odotus: ei rikkinäisiä root-linkkejä. `/`, `/articles/`, `/tools/` ja `/about/` ovat sallittuja.

Lopullisen englanti-auditin jälkeen, ei jokaisen pienen erän jälkeen:

```powershell
npm run check
npm run lint
npm run format:check
npm run build
```

## Acceptance Criteria

Auditin lopuksi:

- kaikki 38 englanninkielistä root-artikkelia on luettu kokonaan
- jokainen faktalause, numero, tekniikkakuvaus ja muuttuva väite on tarkistettu lähteestä tai pehmennetty
- kieli on tarkistettu neulontakontekstissa, ei vain yleisenä englannin kielioppina
- AI/OCR/scanner/camera/voice/parser/project-summary -tuoteväitteitä ei ole root-artikkeleissa
- Obsidian-metaa, duplicate H1:iä tai rikkinäisiä root-linkkejä ei ole
- lokalisoituja artikkelikansioita ei ole muutettu tämän englanti-auditin aikana
- `npm run check`, `npm run lint`, `npm run format:check` ja `npm run build` menevät läpi
- SEO title/description -muutokset jäävät erilliseen myöhempään vaiheeseen
- lokalisaatiot päivitetään vasta, kun englanti on hyväksytty lähdetekstiksi

## Audit Progress

### 2026-05-28 batch 5, articles 21-25

Tarkistettu seuraavat viisi englanninkielistä root-artikkelia:

- `increase-decrease-evenly`
- `join-new-ball-of-yarn`
- `knit-first-scarf`
- `knitting-needle-materials`
- `knitting-pattern-repeats`

Lähteet tarkistettu webistä tässä erässä: Craft Yarn Council yarn weight system, Craft Yarn Council knitting abbreviations, Craft Yarn Council pattern-reading guide, ChiaoGoo product page, KnitPro Karbonz product page, Sheep & Stitch yarn-join/scarf guide, Interweave weave-in guidance, KnitPicks/Holli Yeoh long-tail cast-on tail guidance ja Interweave repeats/lifeline references.

Korjaukset:

- `increase-decrease-evenly`: CDD-notaatio korjattu CYC-linjan mukaiseksi muotoon `S2KP2` / `sl2-k1-p2sso`.
- `join-new-ball-of-yarn`: Russian join -väite pehmennetty; plied yarns ovat helpoimpia, mutta singles/splitty yarns eivät ole kategorinen "ei toimi" -tapaus.
- `knit-first-scarf`: long-tail cast-on -häntäarvio täsmennetty 3-4x leveyteen plus marginaaliin; 30-36 inches annettu turvallisena worsted-esimerkkinä.

Ei faktakorjauksia:

- `knitting-needle-materials`: valmistajaväitteet tarkistettu; Karbonz brass-coated tips ja ChiaoGoo stainless steel lace tips ovat lähteiden kanssa linjassa.
- `knitting-pattern-repeats`: asterisk/bracket/parenthesis-repeatit ja multi-row repeat -ohjeistus ovat CYC:n pattern-reading- ja abbreviation-linjan kanssa linjassa.

Etenemä: englanninkielisistä artikkeleista 25/38 tarkistettu. Seuraavat viisi aakkosjärjestyksessä ovat `knitting-pattern-sizes-and-fit`, `needle-size-for-beginners`, `organize-knitting-projects`, `pick-up-stitches` ja `seam-knitted-pieces`.

### 2026-05-28 batch 6, articles 26-30

Tarkistettu seuraavat viisi englanninkielistä root-artikkelia:

- `knitting-pattern-sizes-and-fit`
- `needle-size-for-beginners`
- `organize-knitting-projects`
- `pick-up-stitches`
- `seam-knitted-pieces`

Lähteet tarkistettu webistä tässä erässä: Craft Yarn Council yarn weight system, Craft Yarn Council hooks & needles, Craft Yarn Council woman size charts, Craft Yarn Council project levels, Vogue Knitting needle conversion chart, Vogue Knitting picking-up-stitches guide, TECHknitting selvedge pickup guide, Brooklyn Tweed sweater-size/ease guides, Purl Soho mattress stitch and seaming guides, Purl Soho Kitchener stitch guide ja Lion Brand three-needle bind off guide.

Korjaukset:

- `organize-knitting-projects`: KnitTools-tuoteväite pehmennetty `linked yarn` -muodosta `yarn details` -muotoon, jotta teksti pysyy nykyisen prelaunch-tuotepuheen ja muiden EN-artikkelien linjassa.
- `pick-up-stitches`: korjattu pickup-ration sanallinen kaava oikein päin: stitch gauge / row gauge. Lisäksi waste-yarn-kohta muutettu pysyvästä contrasting-yarn-rivistä testiriviksi, steek-kohta pehmennetty non-superwash wool / cotton / superwash -riskitasolle, downward-pickup-väite pehmennetty directionality-näkyvyyden osalta ja ripple-FAQ muutettu row/stitch/edge length -suhdetta kuvaavaksi.
- `seam-knitted-pieces`: korjattu textured-fabric mattress stitch -kohta niin, ettei se ohjaa poimimaan `very edge` -kohdasta vaan samasta seam line -kohdasta, yleensä yhden silmukan verran reunasta sisään. Samalla Kitchener- ja self-striping-kohdat pehmennetty vähemmän absoluuttisiksi.

Ei faktakorjauksia:

- `knitting-pattern-sizes-and-fit`: CYC:n body measurement / ease -lähteet ja Brooklyn Tweedin size-selection-ohjeet tukevat finished measurement, ease, schematic, armhole depth, construction style ja bulky-fabric-ease -linjaa.
- `needle-size-for-beginners`: CYC ja Vogue tukevat US 8 = 5.0 mm, US 7-9 = 4.5-5.5 mm, CYC Medium/Worsted -puikkohaitaria ja UK/US-numerojärjestelmien vastakkaista suuntaa.

Etenemä: englanninkielisistä artikkeleista 30/38 tarkistettu. Seuraavat viisi aakkosjärjestyksessä ovat `track-knitting-time`, `track-rows-knitting`, `what-is-gauge-in-knitting`, `why-knitting-curls` ja `yarn-fibers-compared`.

### 2026-05-28 batch 7, articles 31-35

Tarkistettu seuraavat viisi englanninkielistä root-artikkelia:

- `track-knitting-time`
- `track-rows-knitting`
- `what-is-gauge-in-knitting`
- `why-knitting-curls`
- `yarn-fibers-compared`

Lähteet tarkistettu webistä tässä erässä: Craft Yarn Council yarn weight system, Craft Yarn Council yarn label information, Craft Yarn Council knitting abbreviations / pattern-reading linkit, arXiv curling morphology of knitted fabrics, K-State wool characteristics fact sheet, Purl Soho cotton yarn properties, Lion Brand blocking guidance, Tonia Knits superwash wool guidance, National Park Service synthetic microfiber guidance ja row-counting / gauge-swatch lähteet.

Korjaukset:

- `track-rows-knitting`: KnitTools-tuoteväitteestä poistettu `pattern repeat support`, koska hyväksytty tuotekuvaus kattaa tässä vaiheessa tap counting, undo, multiple counters ja session tracking -linjan.
- `why-knitting-curls`: stockinette-curling-aloituksesta poistettu toisto ja muotoiltu selitys vähemmän kategoriseksi. Superwash-kohta pehmennetty: superwash voi rentoutua, venyä tai kasvaa pesussa ja siksi olla vaikeampi taltuttaa, mutta ei kategorisesti "curl harder". Akryylihöyrytys muotoiltu varovaisemmaksi label/swatch-first-ohjeeksi ja poistettu tarkka polyesteri-sulamisväite.
- `yarn-fibers-compared`: akryyliä koskevat washability/baby blanket -väitteet pehmennetty muotoon `often easy-care` ja `frequent laundering`, jotta teksti ei lupaa konepesua ilman langan label-ehtoa.

Ei faktakorjauksia:

- `track-knitting-time`: aiemmat tarkistukset ovat jo poistaneet siirrettävät rows-per-hour-vauhtiluvut ja pehmentäneet nopeuden kehittymistä koskevat väitteet. Nykyinen teksti pysyy suunnittelu-/oma-data-linjassa.
- `what-is-gauge-in-knitting`: gauge/tension, 4 in / 10 cm, blocked swatch, stitch vs row gauge, needle-material variable ja ease-matematiikka ovat lähteiden kanssa linjassa.

Etenemä: englanninkielisistä artikkeleista 35/38 tarkistettu. Viimeiset kolme aakkosjärjestyksessä ovat `yarn-for-blanket`, `yarn-for-sweater` ja `yarn-weight-substitution`.

### 2026-05-28 batch 8, articles 36-38

Tarkistettu viimeiset kolme englanninkielistä root-artikkelia:

- `yarn-for-blanket`
- `yarn-for-sweater`
- `yarn-weight-substitution`

Lähteet tarkistettu webistä tässä erässä: Craft Yarn Council yarn weight system, Craft Yarn Council yarn label information, Lion Brand yarn quantity / yarn-label guidance, Lion Brand Wool-Ease ja Wool-Ease Thick & Quick -tuotetiedot, KnitPicks sweater yardage chart, KnitPicks yarn-substitution guide, YarnSub substitution guidance, Gather Here holding-yarn-double guide ja vintage yarn / knitting-worsted reference checks.

Korjaukset:

- `yarn-for-blanket`: korjattu DK/worsted-selitys niin, ettei se väitä ohuemman langan kuluttavan automaattisesti enemmän lankaa per row, vaan enemmän kokonaispistoja ja yleensä enemmän kokonaisjaardeja. Lisäksi super bulky -rannelause ja scrappy blanket -paino-ohje pehmennetty, jotta ne eivät ole absoluuttisia.
- `yarn-for-sweater`: men's vs women's -FAQ korjattu chest-only-oletuksesta finished measurement / body length / sleeve length / gauge / construction -tasolle.
- `yarn-weight-substitution`: poistettu lähteistämättömät 20-30% / 25-40% yleisprosentit ja muotoiltu esimerkin DK-yardage suunnitteluarvioksi. Lisäksi vintage `knitting worsted` -kohta pehmennetty: vanhat yarn name -merkinnät voivat olla epäyhtenäisiä, joten gauge ratkaisee modernin vastineen, ei pelkkä yarn name tai vuosikymmen.

Ei faktakorjauksia:

- `yarn-for-blanket`: blanket yardage -taulukko on riittävän pehmeästi esitetty shopping range -arviona, ei pattern promise -tarkkuutena.
- `yarn-for-sweater`: sweater yardage -haarukat ovat linjassa KnitPicksin ja muiden sweater yardage -taulukoiden suuruusluokan kanssa, kun artikkeli rajaa ne stockinette peruspullover -arvioiksi ja ohjaa Yarn Estimatoriin.
- `yarn-weight-substitution`: stitch-count- ja row-count-esimerkin matematiikka tarkistettu: 40 in x 6 sts/in = 240 sts, 16 in x 8 rows/in = 128 rows.

Etenemä: 38/38 englanninkielistä root-artikkelia tarkistettu.
