# Suomenkielisten artikkelien päivityssuunnitelma

**Tiedosto:** `C:\Dev\KnitTools-website\suomi-artikkelien-paivityssuunnitelma.md`

## Summary

Tavoite on päivittää kaikki 38 suomenkielistä artikkelia vastaamaan hyväksyttyä englanninkielistä lähdetekstiä. Työ tehdään erissä, koska artikkelit ovat pitkiä ja konteksti täyttyy helposti.

Ensisijaiset lähtödokumentit jokaisessa toteutuschätissä:

- `suomi-artikkelien-paivityssuunnitelma.md`
- `FINNISH_TRANSLATION_GUIDE.md`

Taustadokumentit, joita ei tarvitse yleensä antaa kokonaan mukaan:

- `englanti-tarkistus.md`
- `englanti-tarkistus3.md`

## Key Rules

- Päivitä vain `src/content/articles/fi/*.md`.
- Käytä hyväksyttyä englanninkielistä artikkelia lähteenä: `src/content/articles/*.md`.
- Säilytä nykyiset public slugit ja `translationKey`-arvot.
- Älä lisää lokalisoitua `browserTitle`-kenttää tässä sisältöpäivityksessä. Tee SEO-title/description-kierros myöhemmin erikseen.
- Älä muuta reittejä, komponentteja, layoutteja, `articleTranslations`-karttaa tai muiden kielten artikkeleita.
- Tarkista AI/OCR/scanner/voice/parser/project-summary myös suomenkielisillä käsitteillä, ei vain englanninkielisellä grepillä.
- Älä lisää uusia faktaväitteitä ilman lähteenä olevaa englannin versiota tai erillistä faktatarkistusta.
- Säilytä suomen kielessä FINNISH_TRANSLATION_GUIDE:n termit, metriyksiköt ja desimaalipilkut.

## Context-Light Execution

Pidä jokainen toteutuschätti itsenäisenä ja pienenä. Tavoite on minimoida mukaan ladattava konteksti ilman, että laatu tai rajaukset heikkenevät.

- Käsittele yhdessä chatissä yleensä 1-3 artikkelia. Aloita yhdellä artikkelilla, jos aiheessa on paljon termi-, taulukko- tai faktariskiä.
- Käytä tätä dokumenttia operatiivisena lähteenä: rajaus, työjärjestys, eräkoko, tarkistuskomennot ja raportointitapa.
- Käytä `FINNISH_TRANSLATION_GUIDE.md`-dokumenttia kieli- ja termilähteenä. Älä kopioi sitä kokonaan mukaan, ellei tehtävä erikseen vaadi koko dokumentin lukemista.
- Lue guideä valikoivasti artikkelin aiheen mukaan: esimerkiksi gauge-artikkeleissa neuletiheys/mallitilkku-kohdat, yarn-artikkeleissa lankavahvuus/menekki/juoksevuus-kohdat ja app-artikkeleissa app/product-claim-kohdat.
- Älä luo kolmatta ohjedokumenttia tätä työtä varten. Jos toteutusohjeita pitää täsmentää, päivitä tätä suunnitelmaa.
- Aloita uusi toteutuschätti aina seuraavasta keskeneräisestä `Work Order` -kohdasta tai käyttäjän erikseen nimeämästä erästä.
- Raportoi erän lopuksi lyhyesti: luetut artikkelit, muokatut artikkelit, tärkeimmät sisältömuutokset, epävarmat kohdat ja seuraava suositeltu erä.
- Älä tee koko projektin lopputarkistuksia jokaisen pienen erän jälkeen. Käytä eräkohtaisia tarkistuksia ensin ja aja täydet `npm`-tarkistukset vasta, kun kaikki suomenkieliset artikkelit on päivitetty tai käyttäjä erikseen pyytää.

## Work Order

Aloita suurimmista eroista ja jatka aiheittain:

1. `yarn-weight-substitution` -> `langan-korvaaminen-eri-vahvuudella.md`
2. `increase-decrease-evenly` -> `lisaysten-ja-kavennusten-jakaminen.md`
3. `gauge-swatch-step-by-step` -> `mallitilkun-neulominen-vaiheittain.md`
4. `how-many-stitches-to-cast-on` -> `montako-silmukkaa-luodaan.md`
5. `how-to-knit-socks` -> `sukkien-neulominen.md`
6. `circular-vs-straight-vs-dpn` -> `pyoropuikot-suorat-puikot-sukkapuikot.md`
7. `knitting-needle-materials` -> `puikkomateriaalit-metalli-puu-bambu.md`

Sen jälkeen jatka aihe-erissä:

- Gauge: `what-is-gauge-in-knitting`, `how-to-measure-knitting-gauge`, `gauge-doesnt-match`
- Yarn label and fibers: `how-to-read-yarn-label`, `identify-mystery-yarn`, `yarn-fibers-compared`
- Yarn amount: `how-much-yarn-do-i-need`, `yarn-for-blanket`, `yarn-for-sweater`
- Techniques: `fix-dropped-stitches`, `join-new-ball-of-yarn`, `pick-up-stitches`, `seam-knitted-pieces`, `how-to-block-knitting`
- Pattern reading: `how-to-read-knitting-pattern`, `knitting-pattern-repeats`, `knitting-pattern-sizes-and-fit`, `at-the-same-time-knitting`
- App/tools/project guides: `best-knitting-apps`, `digital-vs-physical-row-counters`, `track-rows-knitting`, `track-knitting-time`, `organize-knitting-projects`, `essential-knitting-tools`, `free-knitting-calculators`
- Beginner/project guides: `best-yarn-for-beginners`, `knit-first-scarf`, `how-to-knit-hat`, `how-to-substitute-yarn`

## Per-Article Workflow

Jokaiselle artikkelille:

1. Lue englanninkielinen lähdeartikkeli kokonaan.
2. Lue nykyinen suomenkielinen artikkeli kokonaan.
3. Vertaa rakennetta: otsikot, osiot, esimerkit, taulukot, FAQ:t, varoitukset ja käytännön caveatit.
4. Päivitä suomi vastaamaan englannin merkitystä ja yksityiskohtaisuutta.
5. Käytä luonnollista suomenkielistä neulontakieltä, ei mekaanista käännöstä.
6. Tarkista AI/voice/scanner-riskit myös termeillä kuten `tekoäly`, `ääniohjaus`, `puhe`, `kamera`, `skannaus`, `skanneri`, `kuvantunnistus`, `tekstintunnistus`, `ohjeen tulkinta`, `projektikooste`.
7. Älä muuta näkyvää otsikkoa tai slugia ilman erillistä päätöstä.
8. Raportoi erän lopuksi: luetut artikkelit, muokatut artikkelit, tärkeimmät sisältömuutokset, epävarmat kohdat ja seuraava suositeltu erä.

## Verification

Ennen erää:

```powershell
git status --short
```

Varmista artikkelimäärät:

```powershell
(Get-ChildItem -LiteralPath 'src\content\articles' -File -Filter '*.md').Count
(Get-ChildItem -LiteralPath 'src\content\articles\fi' -File -Filter '*.md').Count
```

Odotus: molemmat `38`.

Tarkista suomenkieliset AI/voice/scanner-jäämät:

```powershell
rg -n -i "tekoäly|tekoaly|ääniohjaus|aani|ääni|puhe|kamera|skannaus|skannaa|skanneri|kuvantunnistus|tekstintunnistus|OCR|parser|ohjeparseri|ohjeen tulkinta|projektikooste|project summary|voice|scanner|camera|AI" src/content/articles/fi
```

Erän jälkeen:

```powershell
git diff -- src/content/articles/fi
```

Lopuksi, kun kaikki suomenkieliset artikkelit on päivitetty:

```powershell
npm run check
npm run lint
npm run format:check
npm run build
```

## Public Interfaces

Ei muutoksia julkisiin reitteihin, slugeihin, komponenttirajapintoihin, content schemaan, `articleTranslations`-karttaan tai hreflang-rakenteeseen tässä vaiheessa.

`browserTitle` jätetään pois suomen artikkeleista tässä työssä. Se voidaan lisätä myöhemmin erillisessä SEO-metadatavaiheessa, jossa kirjoitetaan suomenkieliset title tagit ja descriptions tarkoituksella.

## Acceptance Criteria

Työ on valmis, kun:

- kaikki 38 suomenkielistä artikkelia on verrattu nykyiseen englanninkieliseen lähteeseen
- suomenkieliset artikkelit sisältävät samat keskeiset osiot, esimerkit, taulukot, FAQ:t ja varaukset kuin englanti
- public slugit ja `translationKey`-arvot ovat säilyneet
- `browserTitle`-kenttiä ei ole lisätty suomeen tässä vaiheessa
- AI/OCR/scanner/voice/parser/project-summary-väitteet on poistettu tai todettu turvallisiksi myös suomenkielisillä termeillä
- vain `src/content/articles/fi/*.md` on muuttunut, ellei käyttäjä erikseen hyväksy muuta
- lopulliset tarkistuskomennot menevät läpi

## Assumptions

- Englanninkieliset root-artikkelit ovat lähdetotuus vasta sen jälkeen, kun käyttäjä hyväksyy ne lopullisiksi.
- Suomen nykyiset artikkelit ovat julkisia, joten niitä ei muuteta draftiksi eikä poisteta.
- SEO title/description -työ tehdään erillisenä myöhempänä vaiheena.
- Työ tehdään useassa chatissä, ja jokainen chat käsittelee vain rajatun erän.
