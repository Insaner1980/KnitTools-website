# KnitTools monikielinen sisältöpariteetti ja julkaisuvalmius

## Yhteenveto

**Tavoite:** Päivitä kaikki jäljellä olevat kielet samalle sisältö- ja faktatasolle kuin nykyiset englannin ja suomen artikkelit sekä työkalusivut, ja tee vasta lopuksi koko sivuston tekninen julkaisuportti.

**Työtila:** `C:\Dev\KnitTools-website`

**Ei tehdä heti:** deploy, commit, slug-muutokset tai hreflang/canonical-loppuaudit ennen kuin kaikki kielet ovat sisällöllisesti valmiit.

**Jäljellä olevat kielet ja järjestys:** saksa `de`, ruotsi `sv`, norja `no`, ranska `fr`, hollanti `nl`, tanska `da`.

**Peruslähteet jokaisessa chatissä:**
- Projektiohjeet: `AGENTS.md` / käyttäjän antamat AGENTS-ohjeet
- Englannin audit-runbook: `englanti-tarkistus3.md`
- Suomen päivityssuunnitelma: `suomi-artikkelien-paivityssuunnitelma.md`
- Kielikohtainen ohje:
  - `GERMAN_TRANSLATION_STYLE_GUIDE.md`
  - `SWEDISH_TRANSLATION_GUIDE.md`
  - `NORWEGIAN_TRANSLATION_GUIDE.md`
  - `FRENCH_TRANSLATION_GUIDE.md`
  - `DUTCH_TRANSLATION_GUIDE.md`
  - `DANISH_TRANSLATION_GUIDE.md`
- Reitit ja käännöskartta: `src/i18n/articles.ts`, `src/i18n/routes.ts`, tarvittaessa `src/i18n/ui.ts`

## Jatkuvuus useiden chattien yli

Ensimmäisen toteutuschatti-erän pitää luoda tai päivittää etenemisdokumentti:

`C:\Dev\KnitTools-website\monikielinen-lokalisointi-eteneminen.md`

Dokumentissa pidetään aina ajan tasalla:
- käsiteltävä kieli
- kielikohtaisen tutkimuksen tila
- valmiit artikkeliparit
- seuraava artikkelipari
- työkalusivujen tila
- slug-muutokset ja redirectit, jos niitä on
- suoritetut tarkistukset
- viimeinen turvallinen jatkokohta

Jokaisen chatin lopussa tämä dokumentti päivitetään. Seuraava chat lukee ensin tämän dokumentin eikä arvaa jatkokohtaa.

## Eräkoko ja kontekstisääntö

Artikkelit tehdään **2 artikkelia per chat**. Yksi artikkelichat saa lukea vain:
- käsiteltävän kielen translation guide
- etenemisdokumentti
- 2 englanninkielistä lähdeartikkelia `src/content/articles/*.md`
- 2 suomenkielistä päivitettyä vertailuartikkelia `src/content/articles/fi/*.md`
- 2 kohdekielen artikkelia `src/content/articles/<lang>/*.md`
- `src/i18n/articles.ts` vain linkki- ja slug-tarkistukseen

Älä lue kaikkia 38 artikkelia samaan kontekstiin. Listaukset ja grep-laskennat ovat sallittuja.

## Kielikohtainen tutkimus ennen sisältöeriä

Jokainen kieli alkaa omalla tutkimuschattillaan ennen artikkelimuutoksia.

Tutkimuschatti tekee:
- lukee kielikohtaisen translation guide -dokumentin
- vertaa sitä EN/FI-sisältöjen nykyisiin tarpeisiin
- lukitsee termit vähintään näille käsitteille: `gauge`, `gauge swatch`, `cast on`, `bind off`, `yarn weight`, `needle size`, `yardage`, `WPI`, `row counter`, `stitch marker`, `circular needle`, `DPNs`, `blocking`, `ease`, `dye lot`, `skein`, `ball`, `hank`
- kirjaa kielen omat grep-riskit: AI, OCR, scanner/skanner, camera, voice, parser, project summary, automatic pattern, sekä niiden kohdekieliset vastineet
- tarkistaa faktalähteet tarvittaessa nykyisistä lähteistä, etenkin Craft Yarn Councilin yarn weight / WPI / needle size -standardit
- kirjaa etenemisdokumenttiin kielikohtaisen QA-briefin

Faktapolitiikka:
- Englanti on ensisijainen sisältölähde.
- Suomi on vertailulähde sille, mitä uutta sisältöä on jo siirretty lokalisoituun muotoon.
- Jos EN ja FI eroavat, tarkista englannin nykyinen artikkeli ja tarvittaessa faktalähde; älä arvaa.
- Epävarmat tai nopeasti muuttuvat väitteet pehmennetään tai poistetaan.
- Vanhoja app-claimia AI/OCR/scanner/voice/parser/project-summary ei palauteta.

## Artikkelien työjärjestys

Toista sama 19 erän lista jokaiselle kielelle `de`, `sv`, `no`, `fr`, `nl`, `da`.

Kohdekielen tiedosto etsitään aina `translationKey`-avaimella:
`rg -l 'translationKey: "<english-slug>"' src/content/articles/<lang>`

Erät:
1. `at-the-same-time-knitting.md` + `best-knitting-apps.md`
2. `best-yarn-for-beginners.md` + `circular-vs-straight-vs-dpn.md`
3. `digital-vs-physical-row-counters.md` + `essential-knitting-tools.md`
4. `fix-dropped-stitches.md` + `free-knitting-calculators.md`
5. `gauge-doesnt-match.md` + `gauge-swatch-step-by-step.md`
6. `how-many-stitches-to-cast-on.md` + `how-much-yarn-do-i-need.md`
7. `how-to-block-knitting.md` + `how-to-knit-hat.md`
8. `how-to-knit-socks.md` + `how-to-measure-knitting-gauge.md`
9. `how-to-read-knitting-pattern.md` + `how-to-read-yarn-label.md`
10. `how-to-substitute-yarn.md` + `identify-mystery-yarn.md`
11. `increase-decrease-evenly.md` + `join-new-ball-of-yarn.md`
12. `knit-first-scarf.md` + `knitting-needle-materials.md`
13. `knitting-pattern-repeats.md` + `knitting-pattern-sizes-and-fit.md`
14. `needle-size-for-beginners.md` + `organize-knitting-projects.md`
15. `pick-up-stitches.md` + `seam-knitted-pieces.md`
16. `track-knitting-time.md` + `track-rows-knitting.md`
17. `what-is-gauge-in-knitting.md` + `why-knitting-curls.md`
18. `yarn-fibers-compared.md` + `yarn-for-blanket.md`
19. `yarn-for-sweater.md` + `yarn-weight-substitution.md`

Jokaisessa artikkelierässä:
- päivitä kohdekielen artikkelit vastaamaan EN/FI:n nykyistä sisältöä: osiot, esimerkit, FAQ:t, caveatit, sisäiset linkit ja faktarajaukset
- säilytä `translationKey`
- säilytä nykyinen slug ellei se ole selvästi väärä tai harhaanjohtava
- jos slug muuttuu, päivitä `src/i18n/articles.ts` ja lisää 301 redirect `public/_redirects`-tiedostoon muodossa `/vanha-polku/ /uusi-polku/ 301`
- pidä frontmatter `draft: false`
- päivitä `title` ja `description` vain jos sisältömuutos vaatii sitä tai ne ovat selvästi huonoja; älä tee erillistä SEO-uudelleenkirjoituskierrosta tässä vaiheessa

Per artikkelierä aja:
- `git diff --check`
- `npm run check`
- tarvittaessa `npm run build`, jos linkkejä, slugia, frontmatteria tai reittikarttaa muutettiin

## Työkalusivujen työjärjestys

Työkalut tehdään vasta kun kyseisen kielen kaikki 38 artikkelia ovat valmiit.

Vertailulähteet:
- englanti: `src/pages/tools/*.astro`, `src/pages/tools/index.astro`
- suomi: `src/pages/fi/tyokalut/*.astro`, `src/pages/fi/tyokalut/index.astro`

Työkaluerät per kieli:
1. tools index + cast-on calculator
2. yarn estimator + needle size chart
3. yarn weight chart + knitting abbreviations
4. knitting size charts + jaetut UI-tekstit/linkit kyseiselle kielelle

Rakenteet:
- `de`, `sv`, `no`, `fr`: kielikohtaiset `src/pages/<lang>/.../*.astro`
- `nl`: `src/components/dutch-tools/*.astro`, `src/i18n/dutchTools.ts`, `src/pages/nl/breitools/[...slug].astro`
- `da`: `src/components/danish-tools/*.astro`, `src/i18n/danishTools.ts`, `src/pages/da/strikkevaerktoejer/[...slug].astro`

Työkalusivuilla pitää siirtää sama käyttäjälle näkyvä tieto EN/FI-versioista: ohjetekstit, esimerkit, taulukkosisältö, caveatit, FAQ-sisältö, CTA-tekstit ja sisäiset linkit. Älä pakota komponenttirakennetta identtiseksi, jos kieli käyttää jo jaettua lokalisoitua mallia.

Per työkaluerä aja:
- `git diff --check`
- `npm run check`
- `npm run lint`
- `npm run build`

## Kielen oma loppu-QA

Kun yhden kielen artikkelit ja työkalut ovat valmiit, tee kielikohtainen QA ennen seuraavaan kieleen siirtymistä.

Pakolliset tarkistukset:
- artikkelimäärä: 38 tiedostoa `src/content/articles/<lang>/`
- jokaisella artikkelilla `translationKey`
- ei `draft: true`
- ei vanhoja AI/OCR/scanner/voice/parser/project-summary-claimia
- sisäiset linkit osoittavat saman kielen julkisiin polkuihin
- `articleTranslations` sisältää kyseisen kielen 38 polkua
- slug-muutoksilla on redirect `public/_redirects`-tiedostossa
- title/description eivät ole selvästi liian pitkiä tai vääränkielisiä
- `npm run verify` menee läpi

Älä tee koko sivuston hreflang/canonical/sitemap-loppuauditia vielä tässä vaiheessa.

## Koko sivuston lopullinen julkaisuportti

Tee vasta kun kaikki 6 kieltä ovat valmiit.

Tarkista:
- `git status --short`: ymmärretty scope, ei vahingossa mukana salaisuuksia tai yksityistä konfiguraatiota
- `git diff --check`
- `npm run verify`
- kaikki artikkelikielet: `en`, `fi`, `de`, `sv`, `no`, `fr`, `nl`, `da` sisältävät 38 julkaistua artikkelia
- `articleTranslations` on täydellinen kaikille kielille
- canonicalit ovat self-canonicaleja
- hreflang-linkit ovat bidirectionaaliset ja mukana jokaisella käännösparilla
- sitemap sisältää lopulliset URLit
- JSON-LD ei sisällä vanhoja tai julkaisemattomia claimia
- preview-selaintarkistus desktopilla ja mobiililla ainakin: landing page, tools index, 2 tool pagea, article index, category page, 2 artikkelia per kieli
- launch/waitlist/hinta-copy on liiketoiminnallisesti oikea ennen deployta

## Julkiset rajapinnat ja muutettavat sopimukset

Ei uusia julkisia API-rajapintoja ole tarkoitus lisätä.

Mahdollisesti muuttuvat julkiset sopimukset:
- `src/i18n/articles.ts`, vain jos slug muuttuu
- `src/i18n/routes.ts`, vain jos työkalusivun julkinen polku muuttuu
- `public/_redirects`, aina jos julkinen slug tai työkalupolku muuttuu
- localized tool helperit `src/i18n/dutchTools.ts` ja `src/i18n/danishTools.ts`, jos NL/DA-työkalulinkit muuttuvat

Oletus: slugia ei muuteta, ellei se ole selvästi väärä.

## Komennot toteutuksen alussa

Aloita jokainen uusi chat näillä ei-tuhoavilla tarkistuksilla:

```powershell
cd C:\Dev\KnitTools-website
git status --short
Get-Content .\monikielinen-lokalisointi-eteneminen.md -ErrorAction SilentlyContinue
```

Listaa seuraava kohdekielen artikkelipari:

```powershell
Get-ChildItem -LiteralPath "src\content\articles\<lang>" -File -Filter "*.md" | Measure-Object
rg -n "translationKey:" "src/content/articles/<lang>"
```

## Lähteet, joita saa käyttää faktatarkistukseen

- Google localized versions / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google canonical docs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- W3C internationalization quick tips: https://www.w3.org/International/quicktips/index.en
- W3C language and locale identifiers: https://www.w3.org/TR/ltli/
- Craft Yarn Council yarn weights: https://www.craftyarncouncil.com/standards/yarn-weight-system
- Craft Yarn Council WPI: https://media.craftyarncouncil.com/standards/how-measure-wraps-inch-wpi
- Craft Yarn Council hooks and needles: https://www.craftyarncouncil.com/standards/hooks-and-needles

## Oletukset

- Englannin nykyinen root-artikkelisisältö on kanoninen lähde.
- Suomen nykyinen sisältö on valmis vertailulähde lokalisoidun sisältöpariteetin kannalta.
- Jäljellä olevat kielet ovat `de`, `sv`, `no`, `fr`, `nl`, `da`.
- Artikkelien eräkoko on aina 2 artikkelia per chat.
- Slugit säilytetään ellei muutos ole pakollinen.
- Commit, push ja deploy tehdään vasta erillisestä käyttäjän pyynnöstä.
