# KnitTools English Articles Final Audit Plan

## Summary
Tavoite: tehdä viimeinen julkaisuvalmiustarkistus kaikille 38 englanninkieliselle root-artikkelille ennen kuin niitä käytetään lähteenä suomelle tai muille kielille.

Varmennuslinjaus: älä vaadi jokaiselle lauseelle erillistä web-lähdettä. Se tekisi työstä hitaamman ja voisi huonontaa luonnollista proosaa. Sen sijaan jokainen lause luetaan ja luokitellaan: jos lause sisältää faktan, luvun, tekniikkaohjeen, muuttuvan tilanteen, tuotteen/appin ominaisuuden tai neulontatermin, se pitää varmistaa lähteestä tai muotoilla varovaisemmaksi. Puhtaasti tyylilliset, siirtymä- ja lukijaa ohjaavat lauseet tarkistetaan luonnollisen englannin ja neulojien kielen kannalta.

Rajaus: käsittele vain `C:\Dev\KnitTools-website\src\content\articles\*.md`. Älä muokkaa `fi/`, `de/`, `sv/`, `no/`, `fr/`, `nl/` tai `da/`-alikansioita. Älä tee SEO title/description -vaihetta vielä. Älä commit/push ilman erillistä pyyntöä.

## Key Changes
- Tee ensin baseline:
  - Lue `englanti-tarkistus.md`.
  - Tallenna nykyinen `git status --short` vertailua varten, koska työpuu on jo valmiiksi likainen.
  - Laske root-artikkelit: odotus 38 tiedostoa.
- Rakenna faktalähdepaketti ennen uutta editointia:
  - CYC: yarn weight system, WPI, label information, care symbols.
  - Needle conversions: vähintään Vogue Knitting + toinen luotettava lähde, jos taulukossa on epäselvyyttä.
  - Tekniikat: k2tog, ssk, mattress stitch, picking up stitches, blocking, gauge swatching.
  - Fiber/blocking: wool/superwash, acrylic steam blocking, cotton stretch/water retention, yarn substitution.
  - Muuttuvat retail/app-väitteet tarkistetaan aina webistä.
- Auditoi artikkelit pienissä erissä, 5-6 kerrallaan:
  - Vertaa Obsidian-lähteeseen suunnitelman inventoryn mukaan.
  - Merkitse jokaisesta artikkelista: factual issues, language/style issues, cross-article consistency issues.
  - Korjaa vain todetut ongelmat. Älä tee laajoja uudelleenkirjoituksia, jos teksti on jo hyvä.
- Hyväksyttävä KnitTools-kuvaus:
  - row counter, multiple counters, project management, session history, saved PDF patterns, Ravelry, calculators, reference library, project notes, progress photos, project stats/session tracking, rows per hour, home-screen widget.
  - Poista tai vältä AI/OCR/scanner/camera/voice/parser/project-summary -tuoteväitteitä englanninkielisissä julkaisuartikkeleissa.
- Kielen tarkistus:
  - US knitting terms oletuksena.
  - Mainitse UK-termit vain kun niistä on lukijalle hyötyä: gauge/tension, bind off/cast off, stockinette/stocking stitch.
  - Käytä `knit-article-humanizer` ja `knit-article-validator` -ohjeita: ei AI-filleriä, ei chatbot-lopetuksia, ei kovien kieltolistojen osumia.
  - Tarkista luonnollisuus vertaamalla neulojien lähteisiin, ei yleiseen englannin kielioppiin yksin.

## Test Plan
Aja root-artikkeleille PowerShellillä, ei Windowsissa rikkoutuvalla `src/content/articles/*.md`-globilla:

```powershell
$files = Get-ChildItem -LiteralPath 'src\content\articles' -File -Filter '*.md' | Sort-Object Name
$files.Count
```

Odotus: `38`.

```powershell
Select-String -Path $files.FullName -Pattern '\b(ai|artificial intelligence|ocr|voice|camera|scanner|scanning|yarn label scanner|instruction parser|project summaries|voice command)\b' -CaseSensitive:$false
```

Odotus: ei englanninkielisiä tuoteväitejäämiä.

```powershell
Select-String -Path $files.FullName -Pattern 'TITLE TAG|META DESCRIPTION|PRIMARY KEYWORD|SECONDARY KEYWORDS|ARTICLE TYPE|TARGET WORD COUNT|INTERNAL LINKS|<!--|-->|^# '
```

Odotus: ei Obsidian-metaa tai duplicate H1 -jäämiä.

```powershell
Select-String -Path $files.FullName -Pattern '\]\(/(?!\)|articles/|tools/|about/)'
```

Odotus: ei rikkinäisiä juurilinkkejä; `/` on sallittu etusivulinkki.

Lopuksi:
```powershell
npm run check
npm run lint
npm run format:check
npm run build
```

Lisäksi vertaile lopun `git status --short` alkuperäiseen baselineen ja varmista, ettei uusi työ lisännyt muutoksia lokalisoituihin artikkelikansioihin.

## Acceptance Criteria
- Kaikki 38 englanninkielistä root-artikkelia on luettu kokonaan.
- Jokainen faktalause, numero, tekniikkakuvaus ja muuttuva väite on tarkistettu lähteestä tai pehmennetty.
- Luonnollinen englanti on tarkistettu neulontakontekstissa, ei vain yleisenä kielentarkistuksena.
- AI-tuoteväitteitä ei ole root-artikkeleissa.
- Obsidian-metaa, duplicate H1:iä tai rikkinäisiä root-linkkejä ei ole.
- `npm run check`, `npm run lint`, `npm run format:check` ja `npm run build` menevät läpi.
- SEO title/description -muutokset ja kaikki lokalisaatiot jäävät erilliseen myöhempään vaiheeseen.

## Assumptions
- Suositeltu varmennustaso on claim-level verification: jokainen faktaväite varmistetaan, mutta jokaiselle tyylilauseelle ei haeta omaa web-lähdettä.
- Jos myöhemmin halutaan literal every sentence web verification, työ tehdään erillisenä hitaana audit-moodina, jossa jokainen lause saa merkinnän joko `source verified`, `style/no factual claim`, `softened`, tai `removed`.
- Nykyinen englanti on lähdeteksti tuleville kielille vasta tämän auditin jälkeen.
