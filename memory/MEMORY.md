# KnitTools Website Memory

## 2026-05-15: SonarCloud-paikallisskannaus

- Projekti on konfiguroitu SonarCloudiin samalla paikallisella `sonar`-työnkululla kuin KnitTools- ja dBcheck-Android-projektit: argumentiton `sonar` etsii `tools/sonar.ps1`-wrapperin, ajaa skannauksen ja tallentaa raportit `reports/`-kansioon.
- SonarCloud project key on `Insaner1980_KnitTools-website` ja organization `insaner1980`. Asetukset ovat `sonar-project.properties`-tiedostossa.
- Astro/JS/TS/CSS-skannaus käyttää NPM-pohjaista `@sonar/scan@4.3.5`-scanneria. `sonar auth login/status/...` ohjautuu edelleen SonarQube CLI:lle, mutta varsinainen skannaus tarvitsee `SONAR_TOKEN`-ympäristömuuttujan.
- Manuaalinen scanner-ajo edellyttää, että SonarCloud-projektin Automatic Analysis poistetaan käytöstä Project > Administration > Analysis Method -näkymästä; muuten SonarCloud hylkää paikallisen analyysin duplikaattina.
- `reports/`, `.sonar/`, `.scannerwork/`, `.astro/` ja muut generoidut analyysi-/build-kansiot pidetään pois gitistä.

## 2026-05-08: suomenkielisen sisällön i18n-rakenne

- Englanti säilyy oletuskielenä ilman `/en/`-prefiksiä. Nykyisiä `/`, `/tools/`, `/articles/` ja `/articles/[slug]/` URL:eja ei saa siirtää.
- Suomenkieliset sivut lisätään rinnalle `/fi/`-prefiksillä. Ensimmäiset reitit ovat `/fi/tyokalut/`, kuusi suomenkielistä työkalusivua, `/fi/artikkelit/`, suomenkieliset kategoriat ja 12 SEO-valittua artikkelia.
- i18n-apukerros sijaitsee `src/i18n/`: `routes.ts`, `articles.ts`, `ui.ts`, `config.ts`.
- Suomenkielinen Yarn Estimator näkyy käyttäjälle nimellä `Lankamuunnin` ja reitillä `/fi/tyokalut/lankamuunnin/`.
- Artikkelien paritus tehdään frontmatterin `translationKey`-kentällä. Suomen artikkelit ovat `src/content/articles/fi/`, mutta englannin artikkelit pysyvät julkisissa root-artikkelireiteissä.
- Suomenkielistä sisältöä ei pidä deployata tuotantoon ennen käyttäjän hyväksyntää. Tarkistus tehdään paikallisella dev/preview-palvelimella.
- Suomen termilinja: luonnollinen neulesuomi, ei suoraa konekäännöstä. `neuletiheys`, `mallitilkku`, `silmukoiden luominen`, `päätellä`, `pyöröpuikko`, `sukkapuikot`.

## 2026-05-08: suomenkielisen sisällön pariteetti

- Suomenkieliset työkalusivut ja 12 suomenkielistä artikkelia on tarkoitus pitää sisällöllisesti englanninkielisten vastineiden tasalla, vaikka suomen kieli saa olla luonnollista eikä sanasanaista käännöstä.
- `src/components/WpiIdentifier.astro` omistaa lankavahvuussivujen WPI-tunnistimen käyttöliittymän ja selainlogiikan. Englannin ja suomen lankavahvuussivut käyttävät samaa komponenttia eri `lang`-propilla.
- Suomenkielisten artikkelien `publishDate` ja `categoryOrder` seuraavat englanninkielistä vastinetta pariteetin vuoksi. `lang: fi` ja `translationKey` säilyvät reitityksen ja hreflang-parien lähteenä.

## 2026-05-08: suomenkielisen review-entryn poisto ennen julkaisua

- `/fi/`-esikatselusivu poistetaan tuotantojulkaisusta kokonaan. Suomenkieliset julkaistavat entryt ovat `/fi/tyokalut/` ja `/fi/artikkelit/`.
- Suomenkielisen navigaation KnitTools-logo osoittaa englanninkieliselle etusivulle `/`, koska erillistä suomenkielistä etusivua ei julkaista.
- `/fi/`-reitille ei lisätä redirectiä, koska review-entryä ei ole tarkoitus julkaista tai indeksoida tuotannossa.
- Suomenkieliset työkalusivut ja 12 ensimmäistä suomenkielistä artikkelia julkaistiin tuotantoon Cloudflare Pagesiin. Tuotannossa `/fi/tyokalut/`, `/fi/artikkelit/` ja suomenkielinen artikkeliesimerkki palauttavat 200, mutta `/fi/` palauttaa 404 eikä näy sitemapissa tai sisäisissä linkeissä.

## 2026-05-09: suomenkielisten artikkelidraftien suojaus

- Uudet tarkistamattomat suomenkieliset artikkelikäännökset lisätään `draft: true` -tilassa, eikä niitä lisätä `articleTranslations`-karttaan ennen käyttäjän hyväksyntää.
- `src/pages/fi/artikkelit/[...slug].astro` suodattaa draftit pois tuotantobuildissä mutta näyttää ne dev-ympäristössä tarkistusta varten. Julkaisemattomat draftit saavat reitin tiedostonimen perusteella, jolloin niiden `translationKey` voi vastata englanninkielistä lähdeartikkelia ilman julkaistua hreflang-paria.
- Ensimmäinen jatkokäännöserä sisältää 9 draft-artikkelia: mallitilkku, lisäysten/kavennusten jakaminen, lankavahvuuden korvaaminen, kuituvertailu, peiton menekki, villapaidan menekki, tuntematon lanka, sileän neuleen rullautuminen ja puikkomateriaalit.

## 2026-05-09: saksankielisten työkalusivujen i18n-rakenne

- Saksankieliset tools-sivut julkaistaan käännetyllä reittisegmentillä `/de/werkzeuge/`, ei englanninkielisellä `/de/tools/`-segmentillä. Kuusi alasivua ovat `/de/werkzeuge/maschenanschlag-rechner/`, `/garnbedarfsrechner/`, `/nadelstaerken-tabelle/`, `/garnstaerken-tabelle/`, `/strickabkuerzungen/` ja `/groessentabellen-stricken/`.
- `src/i18n/config.ts`, `src/i18n/routes.ts` ja `src/i18n/ui.ts` tukevat nyt `de`-kieltä tools-reiteillä ja yhteisissä UI-teksteissä. Saksankielisiä artikkeleita ei vielä ole, joten artikkelilinkit voivat väliaikaisesti fallbackata englanninkielisiin reitteihin.
- `src/components/LocalizedToolPage.astro` on uusi jaettu lokalisoitujen tools-sivujen pohja. `FinnishToolPage.astro` jäi legacy-wrapperiksi suomenkielisille sivuille, jotta nykyisiä suomi-importteja ei tarvitse muuttaa.
- Saksankielisten käännösten termilähde on `GERMAN_TRANSLATION_STYLE_GUIDE.md`: `Maschenprobe`, `Garnstärke`, `Nadelstärke`, `Garnbedarf`, `Maschen anschlagen`, `abketten` ja `du`-muoto ovat lukittuja linjauksia.

## 2026-05-09: saksankielisten artikkelidraftien rakenne

- Saksankieliset artikkelit käyttävät `/de/artikel/`-prefiksiä ja kategoriat `/de/artikel/kategorie/`. Reitit ovat devissä käytössä myös draft-käännösten tarkistusta varten, mutta tuotantobuild suodattaa `draft: true` -artikkelit pois.
- `src/content.config.ts` hyväksyy nyt artikkelien `lang: de` -arvon. `src/pages/de/artikel/[...slug].astro` käyttää tiedostonimeen perustuvaa fallback-slugia julkaisemattomille saksankielisille drafteille, jotta niitä ei tarvitse lisätä `articleTranslations`-karttaan ennen hyväksyntää.
- Ensimmäinen saksankielinen artikkelidraftierä sisältää 10 artikkelia: Maschenprobe-perusartikkelit, Maschenanschlag, Zunahmen/Abnahmen, kostenlose Strickrechner sekä kolme Nadel-artikkelia. Kaikki pidetään `draft: true` -tilassa käyttäjän tarkistusta varten.

## 2026-05-10: ruotsinkielisten työkalusivujen rakenne

- Ruotsinkieliset tools-sivut lisättiin `/sv/verktyg/`-prefiksiin: `/upplaggningskalkylator/`, `/garnatgangskalkylator/`, `/stickstorlekar/`, `/garntjocklekar/`, `/stickforkortningar/` ja `/storlekstabeller-stickning/`.
- `src/i18n/config.ts`, `src/i18n/routes.ts`, `src/i18n/ui.ts`, `Navbar`, `Footer`, `CastOnCalculator`, `YarnEstimator` ja `WpiIdentifier` tukevat nyt `sv`-kieltä tools-käytössä.
- Ruotsinkielisiä artikkeleita ei lisätty. Ruotsin navigaation artikkelilinkki fallbackaa englanninkieliseen artikkeliosioon, kunnes `/sv/artiklar/`-sisältö tehdään ja hyväksytään.
- Ruotsin termilinja seuraa `SWEDISH_TRANSLATION_GUIDE.md`-ohjetta: `stickfasthet`, `stickprov`, `lägga upp maskor`, `maska av`, `garntjocklek`, `garnåtgång`, `löplängd`, `stickstorlek`, `rundsticka` ja `strumpstickor`.
- Ruotsinkielisiä sivuja ei saa deployata tuotantoon ennen käyttäjän hyväksyntää; paikallinen build/dev/preview on tarkoitettu tarkistusta varten.

## 2026-05-10: ruotsinkielisten artikkelidraftien ensimmäinen erä

- `src/content.config.ts` hyväksyy nyt artikkelien `lang: sv` -arvon. Ruotsinkieliset artikkelit elävät `src/content/articles/sv/`-kansiossa ja pidetään `draft: true` -tilassa käyttäjän tarkistusta varten.
- `src/pages/sv/artiklar/[...slug].astro` generoi ruotsinkieliset artikkelidraftit vain dev-ympäristössä. Tuotantobuild suodattaa draftit pois, eikä `/sv/artiklar/`-indexiä tai kategoriasivuja ole vielä julkaistu.
- Ensimmäinen ruotsinkielinen artikkelidraftierä sisältää 10 artikkelia translationKey-järjestyksessä: `at-the-same-time-knitting`, `best-knitting-apps`, `best-yarn-for-beginners`, `circular-vs-straight-vs-dpn`, `digital-vs-physical-row-counters`, `essential-knitting-tools`, `fix-dropped-stitches`, `free-knitting-calculators`, `what-is-gauge-in-knitting` ja `how-to-measure-knitting-gauge`.
- Ruotsinkielisiä artikkelidrafteja ei lisätä `articleTranslations`-karttaan ennen hyväksyntää, jotta canonical/hreflang-linkit eivät osoita julkaisemattomiin sivuihin.

## 2026-05-10: ruotsinkielisten artikkelidraftien toinen erä

- Toinen ruotsinkielinen artikkelidraftierä lisättiin `src/content/articles/sv/`-kansioon `draft: true` -tilassa. Ruotsinkielisiä artikkelidrafteja on nyt 20.
- Toisen erän translationKeyt: `gauge-doesnt-match`, `gauge-swatch-step-by-step`, `how-many-stitches-to-cast-on`, `how-much-yarn-do-i-need`, `how-to-block-knitting`, `how-to-knit-hat`, `how-to-knit-socks`, `how-to-read-yarn-label`, `how-to-substitute-yarn` ja `identify-mystery-yarn`.
- Toisessa erässä yksiköt lokalisoitiin ruotsalaiselle lukijalle (`10 cm`, `mm`, `m`, `g`) ja termilinja pidettiin `SWEDISH_TRANSLATION_GUIDE.md`-ohjeen mukaisena: `stickfasthet`, `provlapp`, `garnåtgång`, `löplängd`, `banderoll`, `rundsticka`, `strumpstickor`, `maska av`.
- Artikkelit ovat edelleen dev-preview-sisältöä; niitä ei ole lisätty `articleTranslations`-karttaan eikä tuotantobuild generoi `/sv/artiklar/`-outputia ennen hyväksyntää.

## 2026-05-10: ruotsinkielisten artikkelidraftien kolmas erä

- Kolmas ruotsinkielinen artikkelidraftierä lisättiin `src/content/articles/sv/`-kansioon `draft: true` -tilassa. Ruotsinkielisiä artikkelidrafteja on nyt 29.
- Kolmannen erän translationKeyt: `increase-decrease-evenly`, `join-new-ball-of-yarn`, `knit-first-scarf`, `knitting-needle-materials`, `knitting-pattern-repeats`, `knitting-pattern-sizes-and-fit`, `needle-size-for-beginners`, `organize-knitting-projects` ja `how-to-read-knitting-pattern`.
- Kolmannessa erässä säilytettiin englanninkielisten lähdeartikkelien otsikkorakenne, frontmatterin julkaisu- ja kategoriatiedot sekä sisältöjärjestys. Linkit ohjattiin ruotsinkielisiin draft-vastineisiin silloin kun vastine on jo olemassa, muuten englanninkieliseen julkaistuun artikkeliin.
- Artikkelit ovat edelleen dev-preview-sisältöä; niitä ei ole lisätty `articleTranslations`-karttaan eikä tuotantobuild generoi `/sv/artiklar/`-outputia ennen hyväksyntää.

## 2026-05-10: ruotsinkielisten artikkelidraftien neljäs erä

- Neljäs ruotsinkielinen artikkelidraftierä lisättiin `src/content/articles/sv/`-kansioon `draft: true` -tilassa. Kaikki 38 englanninkielistä artikkelia on nyt käännetty ruotsinkielisiksi drafteiksi.
- Neljännen erän translationKeyt: `pick-up-stitches`, `seam-knitted-pieces`, `track-knitting-time`, `track-rows-knitting`, `why-knitting-curls`, `yarn-fibers-compared`, `yarn-for-blanket`, `yarn-for-sweater` ja `yarn-weight-substitution`.
- Neljännessä erässä lanka-artikkelien jaardeihin perustuvat esimerkit lokalisoitiin metreiksi ja senttimetreiksi, mutta lähdeartikkelien käytännön sisältö, varoitukset, FAQ:t ja rakenne säilytettiin.
- Ruotsinkieliset artikkelit ovat edelleen julkaisemattomia drafteja. Niitä ei ole lisätty `articleTranslations`-karttaan ennen käyttäjän hyväksyntää, joten tuotantobuild ei generoi `/sv/artiklar/`-artikkelisivuja eikä hreflang osoita niihin.

## 2026-05-11: ruotsinkielisten artikkelilinkkien tarkistus

- Ruotsinkieliselle artikkelisisällölle lisättiin `/sv/artiklar/`-index ja `/sv/artiklar/kategori/[slug]/`-kategoriat, jotta ruotsinkielisen draft-artikkelin navbar-, takaisin- ja footer-linkit osoittavat ruotsinkielisiin näkymiin dev-tarkistuksessa.
- `src/i18n/routes.ts` sisältää nyt ruotsinkieliset artikkeli- ja kategoriapolut. `Navbar`, `Footer` ja `ArticleLayout` käyttävät näitä reittejä `lang="sv"`-sivuilla.
- Draft-suoja säilyy: ruotsinkielisiä artikkeleita ei lisätty `articleTranslations`-karttaan, ja artikkelikokoelmat suodatetaan tuotannossa `draft: true` -tilan perusteella.

## 2026-05-11: ruotsinkielisten SEO- ja sisälinkkitarkistus

- Ruotsinkielisten sivujen SEO-tarkistus ajettiin renderöityjä dev-sivuja vasten: 51 sivua, eli 7 tools/artikkelilista- ja kategoriasivua sekä 38 ruotsinkielistä artikkelidraftia.
- Kaikkien tarkistettujen ruotsinkielisten sivujen `<title>` jäi enintään 60 merkkiin ja meta description enintään 155 merkkiin. Liian pitkät tools- ja artikkeliotsikot lyhennettiin ilman sisällön muuttamista.
- Renderöidyillä ruotsinkielisillä sivuilla canonical-polut osoittavat `/sv/`-osoitteisiin ja `og:locale` on `sv_SE`. Ruotsinkielisiä artikkelidrafteja ei silti lisätty `articleTranslations`-karttaan ennen hyväksyntää.
- Ruotsinkielisten artikkelien ja työkalusivujen tekstissä olleet englanninkieliset `/articles/...`-sisälinkit korvattiin ruotsinkielisillä `/sv/artiklar/...`-draft-vastineilla. Tarkistus kävi läpi 59 paikallista linkkiä ilman 4xx-virheitä.
- `npm run build` onnistui muutosten jälkeen. Staattinen build generoi ruotsinkieliset tools-, artikkelilista- ja kategoriasivut, mutta ei ruotsinkielisiä draft-artikkelidetail-sivuja ennen hyväksyntää.

## 2026-05-11: monikielinen julkaisukunto

- Kaikki 38 saksankielistä ja 38 ruotsinkielistä artikkelia vaihdettiin `draft: false` -tilaan julkaisua varten.
- `src/i18n/articles.ts` sisältää nyt jokaiselle 38 artikkelille `en`, `fi`, `de` ja `sv` -polut, joten artikkelidetailien canonicalit, artikkelikortit ja hreflangit käyttävät samaa nelikielistä lähdettä.
- Ruotsinkieliset tools-, artikkelilista-, kategoria- ja artikkelidetail-sivut ovat mukana tuotantobuildissä. Saksankieliset artikkelidetailit ovat myös mukana tuotantobuildissä.
- Vanhoja liian pitkiä englannin ja suomen SEO-title/metakuvaus-arvoja lyhennettiin niin, että buildattu output pysyy alle sovittujen pituusrajojen.
- `npm run build` onnistui ja buildattu `dist` validoitiin: 205 varsinaista reittiä, 38 artikkeliryhmää neljällä kielellä, 227 paikallista hrefiä, 205 sitemap-locia. Tarkistus varmisti title/description-pituudet, canonicalit, `og:locale`-arvot, artikkelien en/fi/de/sv-hreflangit ja sitemapin kattavuuden.

## 2026-05-11: monikielinen tuotantojulkaisu

- Monikielinen julkaisu deployattiin Cloudflare Pagesiin komennolla `npx wrangler pages deploy ./dist --project-name knittoolsapp --branch main`.
- Deploy latasi 205 tiedostoa ja valmistui onnistuneesti. Cloudflare Pages deployment URL oli `https://d2c7664a.knittoolsapp.pages.dev`.
- Tuotannosta varmistettiin 200-status etusivulle, sitemapeille, ruotsin tools-indexille, ruotsin artikkelidetailille, saksan artikkelidetailille, suomen puikkokokosivulle ja englannin cast-on calculatorille.
- Tuotannon `https://knittoolsapp.com/sitemap-0.xml` sisältää 205 URLia julkaisun jälkeen.

## 2026-05-12: norjankielisten työkalusivujen rakenne

- Norjankieliset tools-sivut lisättiin paikalliseen koodiin `/no/verktoy/`-prefiksillä: `/oppleggskalkulator/`, `/garnberegner/`, `/pinnestorrelser/`, `/garntykkelser/`, `/strikkeforkortelser/` ja `/storrelsestabeller-strikking/`.
- `src/i18n/config.ts` tukee nyt sisäistä `no`-avainta, mutta `BaseLayout` mapppaa renderöidyn `<html lang>`- ja `hreflang`-arvon Bokmål-muotoon `nb`. Open Graph locale on `nb_NO`.
- Norjan yhteiset UI-tekstit, footer/nav-linkit, `CastOnCalculator`, `YarnEstimator` ja `WpiIdentifier` käyttävät `NORWEGIAN_TRANSLATION_GUIDE.md`-terminologiaa: `strikkefasthet`, `prøvelapp`, `legge opp masker`, `felle av`, `garntykkelse`, `pinnestørrelse` ja `garnmengde`.
- Norjankielisiä artikkeleita ei vielä lisätty eikä norjapolkuja lisätty `articleTranslations`-karttaan. Tools-sivujen artikkelisisälinkit osoittavat toistaiseksi englanninkielisiin julkaistuihin artikkeleihin, kunnes norjankieliset artikkelidraftit tehdään ja hyväksytään erissä.
- Norjankielisiä sivuja ei ole deployattu tai julkaistu tuotantoon tämän muutoksen yhteydessä; ne ovat paikallista tarkistusta varten.

## 2026-05-12: norjankielisten artikkelidraftien esikatselu

- Kaikki 38 norjankielistä artikkelia elävät `src/content/articles/no/`-kansiossa `draft: true` -tilassa. Sisältöä ei ole julkaistu eikä deployattu.
- `src/pages/no/artikler/[...slug].astro` tarjoaa dev-only catch-all-esikatselun artikkelilistalle, kategorioille ja artikkelidetaileille. Kun kaikki Norja-artikkelit ovat draft-tilassa, tuotantobuild palauttaa tyhjän `getStaticPaths()`-listan eikä generoi `/no/artikler/`-reittejä.
- `src/i18n/articles.ts` sisältää norjan dev-preview-polut `norwegianArticlePreviewRoutes`-vakiossa. `src/i18n/routes.ts` ei sisällä norjan artikkelipolkuja, jotta julkaistujen en/fi/de/sv-lista- ja kategoriasivujen hreflang-linkit eivät osoita julkaisemattomiin Norja-sivuihin. `articleTranslations`-karttaan ei lisätä `no`-polkuja ennen käyttäjän hyväksyntää.
- Dev-esikatselussa norjankieliset nav-, footer-, tools- ja artikkelisisälinkit ohjaavat norjankielisiin `/no/artikler/`-drafteihin silloin kun vastine on olemassa. Tuotantobuildissä Norjan tools-sivujen artikkelilinkit fallbackaavat edelleen englanninkielisiin julkaistuihin artikkeleihin, jotta staattinen output ei linkitä julkaisemattomiin draft-reitteihin.

## 2026-05-12: norjankielisten artikkelien julkaisu

- Kaikki 38 norjankielistä artikkelia julkaistiin `draft: false` -tilaan ja lisättiin `articleTranslations`-karttaan `no`-poluilla.
- `src/i18n/routes.ts` sisältää nyt norjankieliset artikkelilista- ja kategoriapolut: `/no/artikler/` ja `/no/artikler/kategori/.../`.
- `norwegianArticlePreviewRoutes` poistettiin käytöstä. `Navbar`, `Footer`, `ArticleLayout` ja norjan artikkelien catch-all-reitti käyttävät samaa `routes.ts`-lähdettä kuin muut julkaistut kielet.
- Norjankielisten tools-sivujen artikkelilinkit osoittavat tuotannossa norjankielisiin `/no/artikler/.../`-sivuihin englanninkielisten fallbackien sijaan.
- Julkaisu deployattiin Cloudflare Pagesiin komennolla `npx wrangler pages deploy ./dist --project-name knittoolsapp --branch main`. Deployment URL oli `https://0d0e1720.knittoolsapp.pages.dev`.
- Tuotannosta varmistettiin 200-status, canonical, `hreflang="nb"` ja `<html lang="nb">` reiteille `/no/artikler/`, `/no/artikler/beste-garn-for-nybegynnere/`, `/no/artikler/kategori/garn/` ja `/no/verktoy/garntykkelser/`. Sitemapissa on 256 URLia ja norjan artikkelireitit mukana.

## 2026-05-12: ranskankielisten työkalusivujen rakenne

- Ranskankieliset tools-sivut lisättiin paikalliseen koodiin `/fr/outils/`-prefiksillä: `/calculateur-mailles-a-monter/`, `/estimateur-quantite-laine/`, `/tailles-aiguilles/`, `/epaisseurs-de-fil/`, `/abreviations-tricot/` ja `/tableaux-tailles-tricot/`.
- `src/i18n/config.ts`, `src/i18n/routes.ts`, `src/i18n/ui.ts`, `Footer`, `CastOnCalculator`, `YarnEstimator` ja `WpiIdentifier` tukevat nyt `fr`-kieltä tools-käytössä.
- Ranskan termilinja seuraa `FRENCH_TRANSLATION_GUIDE.md`-ohjetta: `échantillon`, `mailles`, `rangs`, `tours`, `monter les mailles`, `rabattre les mailles`, `aiguilles`, `fil`, `pelote`, `métrage` ja `épaisseur de fil`. Käyttöliittymä käyttää metriyksiköitä ensisijaisesti ja ranskalaista desimaalipilkkua näkyvässä tekstissä.
- Ranskankielisiä artikkeleita ei lisätty eikä ranskan artikkelireittejä julkaistu. Ranskan tools-sivujen artikkelisisälinkit osoittavat toistaiseksi englanninkielisiin julkaistuihin artikkeleihin, kunnes ranskankieliset artikkelit tehdään ja hyväksytään erissä.
- Ranskankielisiä sivuja ei ole deployattu tai julkaistu tuotantoon tämän muutoksen yhteydessä; ne ovat paikallista tarkistusta varten.

## 2026-05-12: ranskankielisten artikkelidraftien ensimmäinen erä

- Ensimmäinen ranskankielinen artikkelidraftierä lisättiin `src/content/articles/fr/`-kansioon `draft: true` -tilassa. Erä kattaa 10 englanninkielistä lähdeartikkelia aakkosjärjestyksen alusta.
- Ensimmäisen erän translationKeyt: `at-the-same-time-knitting`, `best-knitting-apps`, `best-yarn-for-beginners`, `circular-vs-straight-vs-dpn`, `digital-vs-physical-row-counters`, `essential-knitting-tools`, `fix-dropped-stitches`, `free-knitting-calculators`, `gauge-doesnt-match` ja `gauge-swatch-step-by-step`.
- `src/content.config.ts` hyväksyy nyt artikkelien `lang: fr` -arvon. `src/pages/fr/articles/[...slug].astro` tarjoaa ranskankielisen dev-only catch-all-esikatselun artikkelilistalle, kategorioille ja artikkelidetaileille. Kun kaikki ranskan artikkelit ovat draft-tilassa, tuotantobuild ei generoi `/fr/articles/`-reittejä.
- `src/lib/categories.ts`, `src/i18n/articles.ts`, `ArticleLayout`, `ArticleCard`, `Navbar` ja `Footer` tukevat nyt ranskan artikkeliesikatselua ja kategoriakopioita dev-tarkistusta varten. Ranskan artikkelipolut elävät `frenchArticlePreviewRoutes`-vakiossa, eivät julkisessa `routes.ts`-alternates-lähteessä. Artikkelit eivät ole `articleTranslations`-kartassa ennen käyttäjän hyväksyntää, jotta hreflang ei osoita julkaisemattomiin sivuihin.
- Erässä lokalisoitiin näkyvät mittayksiköt eurooppalaisiksi: `10 cm`, `15 cm`, `mm`, `m`, `g`, eurohinnat ja desimaalipilkku ranskan prose-käytössä. Sisälinkit osoittavat ranskankielisiin draft-vastineisiin vain silloin kun vastine on jo tässä erässä tai työkalusivulla olemassa.

## 2026-05-13: ranskankielisten artikkelidraftien toinen erä

- Toinen ranskankielinen artikkelidraftierä lisättiin `src/content/articles/fr/`-kansioon `draft: true` -tilassa. Erä jatkaa englanninkielisten lähdeartikkelien aakkosjärjestystä ensimmäisen 10 artikkelin jälkeen.
- Toisen erän translationKeyt: `how-many-stitches-to-cast-on`, `how-much-yarn-do-i-need`, `how-to-block-knitting`, `how-to-knit-hat`, `how-to-knit-socks`, `how-to-measure-knitting-gauge`, `how-to-read-knitting-pattern`, `how-to-read-yarn-label`, `how-to-substitute-yarn` ja `identify-mystery-yarn`.
- Ranskan artikkelidraftit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `fr`-polkuja, ja tuotantobuildin kuuluu edelleen olla generoimatta `/fr/articles/`-reittejä.
- Jo olemassa olevien ranskankielisten draftien sisälinkkejä päivitettiin osoittamaan toisen erän ranskankielisiin vastineisiin silloin kun kohde on nyt olemassa. Muut artikkelisisälinkit jäävät englanninkielisiin julkaistuihin artikkeleihin, kunnes niiden ranskankieliset vastineet lisätään myöhemmissä erissä.

## 2026-05-13: ranskankielisten artikkelidraftien kolmas erä

- Kolmas ranskankielinen artikkelidraftierä lisättiin `src/content/articles/fr/`-kansioon `draft: true` -tilassa. Erä jatkaa englanninkielisten lähdeartikkelien aakkosjärjestystä toisen erän jälkeen.
- Kolmannen erän translationKeyt: `increase-decrease-evenly`, `join-new-ball-of-yarn`, `knit-first-scarf`, `knitting-needle-materials`, `knitting-pattern-repeats`, `knitting-pattern-sizes-and-fit`, `needle-size-for-beginners`, `organize-knitting-projects`, `pick-up-stitches` ja `seam-knitted-pieces`.
- Ranskan artikkelidraftit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `fr`-polkuja, ja tuotantobuildin kuuluu edelleen olla generoimatta `/fr/articles/`-reittejä.
- Olemassa olevien ranskankielisten draftien sisälinkkejä päivitettiin osoittamaan kolmannen erän ranskankielisiin vastineisiin silloin kun kohde on nyt olemassa. Näkyvät mitat on lokalisoitu metriyksiköihin ja hinnat euroihin lähteen sisältöä muuttamatta.

## 2026-05-13: ranskankielisten artikkelidraftien neljäs erä

- Neljäs ja viimeinen ranskankielinen artikkelidraftierä lisättiin `src/content/articles/fr/`-kansioon `draft: true` -tilassa. Ranskankielisiä artikkelidrafteja on nyt 38, eli jokaisella englanninkielisellä artikkelilla on `translationKey`-vastine.
- Neljännen erän translationKeyt: `track-knitting-time`, `track-rows-knitting`, `what-is-gauge-in-knitting`, `why-knitting-curls`, `yarn-fibers-compared`, `yarn-for-blanket`, `yarn-for-sweater` ja `yarn-weight-substitution`.
- Ranskan artikkelidraftit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `fr`-polkuja, eikä ranskan artikkelipolkuja lisätty julkiseen hreflang-lähteeseen ennen käyttäjän hyväksyntää.
- Kaikkien ranskankielisten draftien artikkelisisälinkit päivitettiin osoittamaan ranskankielisiin `/fr/articles/.../`-draft-vastineisiin, kun kohde on olemassa. Neljännessä erässä lankamäärät lokalisoitiin eurooppalaisiksi metreiksi, senteiksi, grammoiksi ja desimaalipilkuiksi lähdesisältöä muuttamatta.

## 2026-05-13: ranskankielisten UI-linkkien fallback-korjaus

- Tuotantobuildin ranskankielisiltä tools-sivuilta löytyi englanninkielisiä artikkelilinkkejä: `Navbar` fallbackasi `/articles/`-polkuun ja `Footer` fallbackasi `/articles/category/...`-kategorioihin, koska ranskan artikkelireitit eivät ole julkisessa `routes.ts`-alternates-lähteessä.
- Lisättiin `getArticlesIndexPath(lang)` helperiin `src/i18n/articles.ts`, jotta ranskan article-index-linkit käyttävät `frenchArticlePreviewRoutes.articlesIndex`-polkua ilman että `routes.ts` alkaa tuottaa julkaisemattomia ranskan `hreflang`-viittauksia.
- `Navbar`, `ArticleLayout` ja `Footer` käyttävät nyt ranskan kontekstissa `/fr/articles/` ja `/fr/articles/categorie/.../` -polkuja englannin fallbackien sijaan. Ranskan artikkelit pysyvät silti `draft: true` -tilassa eikä niitä lisätty `articleTranslations`-karttaan.

## 2026-05-13: ranskankielisten sivujen julkaisuvalmistelu

- Live-tarkistus ennen julkaisua vahvisti, että `https://knittoolsapp.com/fr/outils/` ja `https://knittoolsapp.com/fr/articles/` palauttivat 404, eli ranskankielisiä sivuja ei ollut vielä tuotannossa.
- Kaikki 38 ranskankielistä artikkelia vaihdettiin `draft: false` -tilaan ja lisättiin `articleTranslations`-karttaan `fr`-poluilla.
- `src/i18n/routes.ts` sisältää nyt ranskankieliset artikkelilista- ja kategoriapolut: `/fr/articles/` ja `/fr/articles/categorie/.../`.
- `frenchArticlePreviewRoutes` poistettiin käytöstä. `Navbar`, `Footer`, `ArticleLayout` ja ranskan artikkelien catch-all-reitti käyttävät samaa `routes.ts`-lähdettä kuin muut julkaistut kielet.
- Ranskankieliset tools-, artikkelilista-, kategoria- ja artikkelidetail-sivut julkaistiin Cloudflare Pagesiin komennolla `npx wrangler pages deploy ./dist --project-name knittoolsapp --branch main`. Deployment URL oli `https://4cbbac07.knittoolsapp.pages.dev`.
- Tuotantoverifiointi `https://knittoolsapp.com`-domainissa palautti 200-statukset reiteille `/fr/outils/`, `/fr/outils/epaisseurs-de-fil/`, `/fr/articles/`, `/fr/articles/accessoires-tricot-indispensables/` ja `/fr/articles/categorie/fils-et-laine/`.
- SEO-verifiointi vahvisti ranskankielisellä artikkelilla canonicalin, `og:locale`-arvon `fr_FR` sekä `fr`, `en` ja `x-default` hreflangit. Paikallinen ja live-sitemap ovat identtiset: 307 URLia, joista 51 ranskankielisiä.

## 2026-05-13: hollanninkielisten työkalusivujen dev-only-rakenne

- Hollanninkieliset tools-sivut lisättiin paikalliseen koodiin dev-only-drafteina `/nl/breitools/`-prefiksillä: `/opzetcalculator/`, `/garenberekenaar/`, `/naalddiktes/`, `/garendiktes/`, `/breiafkortingen/` ja `/maattabellen-breien/`.
- `src/i18n/config.ts`, `src/i18n/ui.ts`, `Navbar`, `Footer`, `LocalizedToolPage`, `CastOnCalculator`, `YarnEstimator` ja `WpiIdentifier` tukevat nyt `nl`-kieltä tools-esikatselussa.
- NL-reitit elävät `src/i18n/dutchTools.ts`-tiedostossa, eivät julkisessa `src/i18n/routes.ts`-alternates-lähteessä. Näin julkaistut sivut eivät saa `nl`-hreflang-linkkejä ennen hyväksyntää.
- `src/pages/nl/breitools/[...slug].astro` palauttaa tuotantobuildissä tyhjän `getStaticPaths()`-listan, joten staattinen build ei generoi `/nl/breitools/`-outputia eikä sitemapia. Sivut on tarkoitettu vain paikalliseen dev-tarkistukseen.
- Hollannin sisältö noudattaa `DUTCH_TRANSLATION_GUIDE.md`-linjaa: luonnollinen Alankomaiden hollanti neulojille, eurooppalaiset mittayksiköt ja desimaalipilkku näkyvissä luvuissa.

## 2026-05-13: hollanninkielisten artikkelidraftien ensimmäinen erä

- Ensimmäinen hollanninkielinen artikkelidraftierä lisättiin `src/content/articles/nl/`-kansioon `draft: true` -tilassa. Erä kattaa 10 englanninkielistä lähdeartikkelia aakkosjärjestyksen alusta.
- Ensimmäisen erän translationKeyt: `at-the-same-time-knitting`, `best-knitting-apps`, `best-yarn-for-beginners`, `circular-vs-straight-vs-dpn`, `digital-vs-physical-row-counters`, `essential-knitting-tools`, `fix-dropped-stitches`, `free-knitting-calculators`, `gauge-doesnt-match` ja `gauge-swatch-step-by-step`.
- `src/content.config.ts` hyväksyy nyt artikkelien `lang: nl` -arvon. `src/pages/nl/artikelen/[...slug].astro` tarjoaa hollanninkielisen dev-only catch-all-esikatselun artikkelilistalle, kategorioille ja artikkelidetaileille.
- Hollanninkielisiä artikkeleita ei lisätty `articleTranslations`-karttaan eikä `src/i18n/routes.ts`-julkiseen route-lähteeseen. Tuotantobuildin kuuluu generoida nolla `/nl/artikelen/`-sivua ennen käyttäjän hyväksyntää.
- Erässä lokalisoitiin näkyvät mitat ja hinnat eurooppalaisiksi (`cm`, `mm`, `m`, `g`, eurohinnat) ja desimaalipilkuiksi. Sisälinkit osoittavat hollanninkielisiin drafteihin vain silloin kun kohde on jo tässä erässä tai hollanninkielisellä tools-sivulla olemassa.

## 2026-05-14: hollanninkielisten artikkelidraftien toinen erä

- Toinen hollanninkielinen artikkelidraftierä lisättiin `src/content/articles/nl/`-kansioon `draft: true` -tilassa. Erä jatkaa englanninkielisten lähdeartikkelien aakkosjärjestystä ensimmäisen 10 artikkelin jälkeen.
- Toisen erän translationKeyt: `how-many-stitches-to-cast-on`, `how-much-yarn-do-i-need`, `how-to-block-knitting`, `how-to-knit-hat`, `how-to-knit-socks`, `how-to-measure-knitting-gauge`, `how-to-read-knitting-pattern`, `how-to-read-yarn-label`, `how-to-substitute-yarn` ja `identify-mystery-yarn`.
- Hollanninkieliset artikkelit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `nl`-polkuja, eikä hollannin artikkelipolkuja lisätty julkiseen `routes.ts`/hreflang-lähteeseen.
- Ensimmäisen erän hollanninkielisten draftien sisälinkkejä päivitettiin osoittamaan toisen erän hollanninkielisiin vastineisiin silloin kun kohde on nyt olemassa. Muut artikkelisisälinkit jäävät englanninkielisiin julkaistuihin artikkeleihin, kunnes niiden hollanninkieliset vastineet lisätään myöhemmissä erissä.
- Näkyvät mittayksiköt lokalisoitiin eurooppalaisiksi (`cm`, `mm`, `m`, `g`, eurohinnat), ja desimaalit kirjoitettiin hollannin desimaalipilkulla käyttäjälle näkyvässä tekstissä.

## 2026-05-14: hollanninkielisten artikkelidraftien kolmas erä

- Kolmas hollanninkielinen artikkelidraftierä lisättiin `src/content/articles/nl/`-kansioon `draft: true` -tilassa. Erä jatkaa englanninkielisten lähdeartikkelien aakkosjärjestystä toisen erän jälkeen.
- Kolmannen erän translationKeyt: `increase-decrease-evenly`, `join-new-ball-of-yarn`, `knit-first-scarf`, `knitting-needle-materials`, `knitting-pattern-repeats`, `knitting-pattern-sizes-and-fit`, `needle-size-for-beginners`, `organize-knitting-projects`, `pick-up-stitches` ja `seam-knitted-pieces`.
- Hollanninkieliset artikkelit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `nl`-polkuja, eikä hollannin artikkelipolkuja lisätty julkiseen `routes.ts`/hreflang-lähteeseen.
- Ensimmäisen ja toisen erän hollanninkielisiä sisälinkkejä päivitettiin osoittamaan kolmannen erän hollanninkielisiin draft-vastineisiin silloin kun kohde on nyt olemassa. Vielä kääntämättömät neljännen erän kohteet jäävät englanninkielisiin julkaistuihin artikkeleihin.
- Näkyvät mitat ja hinnat lokalisoitiin eurooppalaisiksi (`cm`, `mm`, `m`, eurohinnat) ja desimaalipilkuiksi lähdesisältöä muuttamatta.

## 2026-05-14: hollanninkielisten artikkelidraftien viimeinen erä

- Viimeinen hollanninkielinen artikkelidraftierä lisättiin `src/content/articles/nl/`-kansioon `draft: true` -tilassa. Hollanninkielisiä artikkelidrafteja on nyt 38, eli jokaisella englanninkielisellä artikkelilla on `translationKey`-vastine.
- Viimeisen erän translationKeyt: `track-knitting-time`, `track-rows-knitting`, `what-is-gauge-in-knitting`, `why-knitting-curls`, `yarn-fibers-compared`, `yarn-for-blanket`, `yarn-for-sweater` ja `yarn-weight-substitution`.
- Hollanninkieliset artikkelit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `nl`-polkuja, eikä hollannin artikkelipolkuja lisätty julkiseen `routes.ts`/hreflang-lähteeseen.
- Kaikkien hollanninkielisten draftien artikkelisisälinkit päivitettiin osoittamaan hollanninkielisiin `/nl/artikelen/.../`-draft-vastineisiin, kun kohde on olemassa. Näkyvät lankamäärät ja mitat lokalisoitiin metreiksi, senteiksi, grammoiksi ja desimaalipilkuiksi lähdesisältöä muuttamatta.

## 2026-05-14: hollanninkielisten sivujen julkaisuvalmistelu

- Hollanninkieliset tools-sivut ja artikkelit muutettiin dev-only-rakenteesta julkisiksi tuotantosivuiksi. `src/pages/nl/breitools/[...slug].astro` ja `src/pages/nl/artikelen/[...slug].astro` eivät enää palauta tuotannossa tyhjää `getStaticPaths()`-listaa.
- `src/i18n/routes.ts` on nyt myös NL-tools-, NL-artikkelilista- ja NL-kategoriareittien julkinen lähde. `src/i18n/dutchTools.ts` johtaa omat linkkinsä `routes.ts`-lähteestä.
- `dutchArticlePreviewRoutes` korvattiin `dutchArticleRoutes`-rakenteella, joka johtaa polut `routes.ts`-lähteestä. `Footer`, NL-artikkelilistat ja kategoriat käyttävät julkaistuja NL-polkuja.
- Kaikki 38 hollanninkielistä artikkelia muutettiin `draft: false` -tilaan ja niiden `nl`-polut lisättiin `articleTranslations`-karttaan, jotta canonicalit ja hreflangit osoittavat julkaistuihin hollanninkielisiin sivuihin.
- Uudet tarkistamattomat hollanninkieliset artikkelit pidetään jatkossa `draft: true` -tilassa eikä niitä lisätä `articleTranslations`-karttaan ennen erillistä hyväksyntää.

## 2026-05-14: tanskankielisten tools-sivujen dev-only-esikatselu

- Tanskankieliset tools-sivut lisättiin paikalliseen koodiin dev-only-drafteina `/da/strikkevaerktoejer/`-prefiksillä: `/opslagsberegner/`, `/garnberegner/`, `/pindestoerrelser/`, `/garntykkelser/`, `/strikkeforkortelser/` ja `/stoerrelsestabeller-strik/`.
- `src/i18n/config.ts`, `src/i18n/ui.ts`, `src/i18n/tools.ts`, `src/lib/categories.ts`, `Navbar`, `Footer`, `LocalizedToolPage`, `CastOnCalculator`, `YarnEstimator` ja `WpiIdentifier` tukevat nyt `da`-kieltä tools-esikatselussa.
- DA-reitit elävät `src/i18n/danishTools.ts`-tiedostossa, eivät julkisessa `src/i18n/routes.ts`-alternates-lähteessä. Näin julkaistut sivut eivät saa `da`-hreflang-linkkejä ennen hyväksyntää.
- `src/i18n/danishTools.ts` sisältää `danishToolAlternates`-rakenteen, joka lisää tanskan dev-only tools-sivuille oman `da` self-hreflangin yhdistämällä paikalliset DA-polut julkisiin muiden kielten alternates-polkuhin. Tätä ei pidä siirtää `routes.ts`-lähteeseen ennen tanskankielisten sivujen hyväksyntää.
- `src/pages/da/strikkevaerktoejer/[...slug].astro` palauttaa tuotantobuildissä tyhjän `getStaticPaths()`-listan, joten staattinen build ei generoi `/da/strikkevaerktoejer/`-outputia eikä sitemapia. Sivut on tarkoitettu vain paikalliseen dev-tarkistukseen.
- Tanskan sisältö noudattaa `DANISH_TRANSLATION_GUIDE.md`-linjaa: luonnollinen Tanskan tanska neulojille, eurooppalaiset mittayksiköt ja desimaalipilkku näkyvissä luvuissa. Tanskankielisiä artikkeleita ei lisätä `articleTranslations`-karttaan ennen käyttäjän hyväksyntää.

## 2026-05-14: tanskankielisten artikkelidraftien ensimmäinen erä

- Ensimmäinen tanskankielinen artikkelidraftierä lisättiin `src/content/articles/da/`-kansioon `draft: true` -tilassa. Erä sisältää 10 englanninkielisen lähdeartikkelin vastinetta translationKey-järjestyksen alusta.
- Ensimmäisen erän translationKeyt: `at-the-same-time-knitting`, `best-knitting-apps`, `best-yarn-for-beginners`, `circular-vs-straight-vs-dpn`, `digital-vs-physical-row-counters`, `essential-knitting-tools`, `fix-dropped-stitches`, `free-knitting-calculators`, `what-is-gauge-in-knitting` ja `how-to-measure-knitting-gauge`.
- `src/content.config.ts` hyväksyy nyt artikkelien `lang: da` -arvon. `articleTranslations`-karttaan ei lisätty `da`-polkuja, eikä julkiseen `routes.ts`-lähteeseen lisätty DA-artikkelireittejä.
- Staattinen build ei generoi `/da/`-outputia. Tanskankieliset artikkelit pysyvät julkaisemattomina drafteina, kunnes käyttäjä hyväksyy ne ja julkaisurakenne avataan erikseen.

## 2026-05-14: tanskankielisten artikkelidraftien toinen erä

- Toinen tanskankielinen artikkelidraftierä lisättiin `src/content/articles/da/`-kansioon `draft: true` -tilassa. Tanskankielisiä artikkelidrafteja on nyt 20.
- Toisen erän translationKeyt: `gauge-doesnt-match`, `gauge-swatch-step-by-step`, `how-many-stitches-to-cast-on`, `how-much-yarn-do-i-need`, `how-to-block-knitting`, `how-to-knit-hat`, `how-to-knit-socks`, `how-to-read-yarn-label`, `how-to-substitute-yarn` ja `identify-mystery-yarn`.
- Tanskankieliset artikkelit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `da`-polkuja, eikä julkiseen `routes.ts`/hreflang-lähteeseen lisätty DA-artikkelireittejä.
- Näkyvät mitat ja lankamäärät lokalisoitiin eurooppalaisiksi (`cm`, `mm`, `m`, `g`) ja desimaalipilkuiksi. Sisälinkit osoittavat tanskan `/da/artikler/.../`-draft-vastineisiin ja tanskan dev-only tools-sivuihin, kun kohde on tanskaksi nimetty.

## 2026-05-14: tanskankielisten artikkelidraftien kolmas erä

- Kolmas tanskankielinen artikkelidraftierä lisättiin `src/content/articles/da/`-kansioon `draft: true` -tilassa. Tanskankielisiä artikkelidrafteja on nyt 30.
- Kolmannen erän translationKeyt: `increase-decrease-evenly`, `join-new-ball-of-yarn`, `knit-first-scarf`, `knitting-needle-materials`, `knitting-pattern-repeats`, `knitting-pattern-sizes-and-fit`, `needle-size-for-beginners`, `organize-knitting-projects`, `how-to-read-knitting-pattern` ja `pick-up-stitches`.
- Tanskankieliset artikkelit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `da`-polkuja, eikä julkiseen `routes.ts`/hreflang-lähteeseen lisätty DA-artikkelireittejä.
- Kolmannessa erässä näkyvät mitat, pindestørrelser, længder ja hinnat lokalisoitiin tanskalaiselle lukijalle (`cm`, `mm`, `m`, `g`, kr.) ja desimaalipilkuiksi. Sisälinkit osoittavat tanskan `/da/artikler/.../`-draft-vastineisiin ja tanskan dev-only tools-sivuihin, kun kohde on tanskaksi nimetty.

## 2026-05-14: tanskankielisten artikkelidraftien neljäs erä

- Neljäs ja viimeinen alkuperäisen eräjaon mukainen tanskankielinen artikkelidraftierä lisättiin `src/content/articles/da/`-kansioon `draft: true` -tilassa. Tanskankielisiä artikkelidrafteja on nyt 38 eli kaikki englanninkieliset artikkelit kattava draft-vastineisto.
- Neljännen erän translationKeyt: `seam-knitted-pieces`, `track-knitting-time`, `track-rows-knitting`, `why-knitting-curls`, `yarn-fibers-compared`, `yarn-for-blanket`, `yarn-for-sweater` ja `yarn-weight-substitution`.
- Tanskankieliset artikkelit pysyvät julkaisemattomina: `articleTranslations`-karttaan ei lisätty `da`-polkuja, eikä julkiseen `routes.ts`/hreflang-lähteeseen lisätty DA-artikkelireittejä.
- Neljännessä erässä lanka- ja projektimäärät lokalisoitiin metriyksiköihin (`cm`, `m`, `g`), eurooppalaiseen lukumuotoon ja tanskalaisiin neuletermeihin. Sisälinkit osoittavat tanskan `/da/artikler/.../`-draft-vastineisiin ja tanskan dev-only tools-sivuihin, kun kohde on tanskaksi nimetty.

### 2026-05-14 - Tanskan artikkelireittien dev-preview
- Lisättiin `src/pages/da/artikler/[...slug].astro`, joka näyttää tanskankielisen artikkelilistan, kategoriat ja yksittäiset artikkelidraftit paikallisessa dev-ympäristössä.
- `src/i18n/articles.ts` sisältää nyt `danishArticleRoutes`-dev-preview-polut, `isDanishArticle`-tarkistuksen sekä tanskan artikkeli- ja kategoriarouttaushelperit. `getArticlePath()` ja `getArticlesIndexPath()` palauttavat `lang="da"`-kontekstissa `/da/artikler/.../`-fallback-polut.
- Tuotantobuild palauttaa DA-artikkelireitille tyhjän `getStaticPaths()`-listan. `da`-polkuja ei lisätty `articleTranslations`-karttaan eikä julkiseen `routes.ts`/hreflang-lähteeseen ennen hyväksyntää.

### 2026-05-15 - Tanskan artikkelien SEO-tarkistus, erä 1
- Ensimmäisen tanskankielisen artikkelierän SEO-frontmatter tarkistettiin: 10 artikkelia pysyvät `draft: true` -tilassa, `lang: da` ja `translationKey` vastaavat englanninkielisiä lähdeartikkeleita.
- Korjattiin `bedste-strikkeapps.md`-otsikko lyhyemmäksi ja `hvad-er-strikkefasthed.md`-metakuvaus yli 120 merkin laatualarajan. Ensimmäisen erän title-pituudet ovat enintään 60 merkkiä muodossa `<title> | KnitTools`, ja descriptionit ovat 120-155 merkkiä.
- Lisättiin `getDanishArticleAlternates(article)` helperiin `src/i18n/articles.ts` ja vaihdettiin `src/pages/da/artikler/[...slug].astro` käyttämään sitä artikkelidetailissa. Helper lisää vain dev-preview-sivun `da` self-hreflangin fallback-polusta eikä lisää `da`-polkuja `articleTranslations`-karttaan.

### 2026-05-15 - Tanskan artikkelien SEO-tarkistus, erä 2
- Toisen tanskankielisen artikkelierän SEO-frontmatter tarkistettiin translationKey-järjestyksen artikkeleille `gauge-doesnt-match` - `identify-mystery-yarn`. Kaikki 10 artikkelia pysyvät `draft: true` -tilassa, `lang: da` ja `translationKey` vastaavat englanninkielisiä lähdeartikkeleita.
- Korjattiin viiden artikkelin SEO-frontmatter: `hvor-mange-masker-skal-du-slaa-op.md`, `hvor-meget-garn-skal-du-bruge.md`, `strik-hue-metoder.md`, `strik-stroemper-stroempeopskrift.md` ja `laes-banderole-symboler.md`. Korjaukset koskivat liian lyhyitä metakuvauksia sekä yli 60 merkin titlejä muodossa `<title> | KnitTools`.
- Toisen erän title-pituudet ovat 38-59 merkkiä ja descriptionit 120-147 merkkiä. Dev-renderöinnissä kaikilla 10 DA-artikkelidraftilla on oikea canonical, `<html lang="da">`, `da` self-hreflang ja `x-default`; tuotantobuild ei generoi `/da/`-outputia.

### 2026-05-15 - Tanskan artikkelien SEO-tarkistus, erä 3
- Kolmannen tanskankielisen artikkelierän SEO-frontmatter tarkistettiin translationKey-järjestyksen artikkeleille `increase-decrease-evenly` - `pick-up-stitches`. Kaikki 10 artikkelia pysyvät `draft: true` -tilassa, `lang: da` ja `translationKey` vastaavat englanninkielisiä lähdeartikkeleita.
- Korjattiin `fordel-udtagninger-indtagninger-jaevnt.md`-artikkelin metakuvaus yli 120 merkin laatualarajan. Muut kolmannen erän title- ja description-pituudet olivat jo sovituissa rajoissa.
- Kolmannen erän title-pituudet ovat 37-56 merkkiä ja descriptionit 120-150 merkkiä. Dev-renderöinnissä kaikilla 10 DA-artikkelidraftilla on oikea canonical, `<html lang="da">`, `da` self-hreflang ja `x-default`; tuotantobuild ei generoi `/da/`-outputia.

### 2026-05-15 - Tanskan artikkelien SEO-tarkistus, erä 4
- Neljännen tanskankielisen artikkelierän SEO-frontmatter tarkistettiin translationKey-järjestyksen artikkeleille `seam-knitted-pieces` - `yarn-weight-substitution`. Kaikki 8 artikkelia pysyvät `draft: true` -tilassa, `lang: da` ja `translationKey` vastaavat englanninkielisiä lähdeartikkeleita.
- Korjattiin `hvor-meget-garn-til-sweater.md`-artikkelin metakuvaus alle 155 merkin ylärajan. Muut neljännen erän title- ja description-pituudet olivat jo sovituissa rajoissa.
- Neljännen erän title-pituudet ovat 44-58 merkkiä ja descriptionit 127-154 merkkiä. Dev-renderöinnissä kaikilla 8 DA-artikkelidraftilla on oikea canonical, `<html lang="da">`, `da` self-hreflang ja `x-default`; tuotantobuild ei generoi `/da/`-outputia.

### 2026-05-15 - Tanskankielisten sivujen julkaisuvalmistelu
- Tanskankieliset tools- ja artikkelireitit avattiin julkisiksi tuotantobuildiin: `src/i18n/routes.ts` sisältää nyt DA tools-, artikkelilista- ja kategoriapolut, ja `src/pages/da/**/[...slug].astro` generoi reitit myös tuotannossa.
- Kaikki 38 `src/content/articles/da/`-artikkelia muutettiin `draft: false` -tilaan ja lisättiin `articleTranslations`-karttaan `da`-poluilla, jotta canonicalit ja hreflangit käyttävät samaa lähdettä kuin muissa julkisissa kielissä.
- Tanskan tools-linkit johdetaan nyt `routes.ts`-lähteestä `src/i18n/danishTools.ts`-helperissä. Kuollut dev-only `getDanishArticleAlternates(article)` poistettiin, koska julkaistut artikkelit käyttävät yleistä `getArticleAlternates()`-logiikkaa.
- Build ja live-tarkistus vahvistivat 51 tanskankielistä tuotantosivua: kaikki palauttavat 200-statuksen `https://knittoolsapp.com/da/...`-osoitteissa, canonical osoittaa omaan URLiin, `<html lang="da">` on oikein, sitemap sisältää DA-polut ja sisäiset linkit sekä buildatut assetit ratkeavat. Tuotantodeploy tehtiin Cloudflare Pagesiin `main`-ympäristöön deploymentilla `75deb286-7a42-4264-b883-8cdfebbbdde1`.

### 2026-05-15 - KnitTools trust signals ja About-sivu
- Etusivun structured data muutettiin `@graph`-rakenteeksi, jossa on `Organization` (`Finnvek`) ja `SoftwareApplication` (`KnitTools`). `SoftwareApplication.publisher` viittaa Finnvek-organisaatioon ja Organization sisältää `sameAs`-linkit Instagramiin, TikTokiin ja YouTubeen.
- `offers.availability` poistettiin kokonaan, jotta schema ei väitä sovelluksen olevan ennakkotilattavissa. Älä lisää `PreOrder`/`PreSale`-arvoja ennen todellista Google Play -ennakkotilausta tai lataussivua.
- Lisättiin julkinen englanninkielinen `/about/`-sivu, joka kertoo KnitToolsista ja Finnvekistä tuotelähtöisesti ilman henkilöbrändäystä.
- `/about/`-sivulla on oma `AboutPage` + `BreadcrumbList` JSON-LD, joka viittaa KnitTools `SoftwareApplication`-entiteettiin ja Finnvek `Organization`-entiteettiin. Sivun title, meta description, canonical, Open Graph ja Twitter-metat tulevat edelleen `BaseLayout`-pohjasta.
- Footerin App-osioon lisättiin About-linkki, footer-bottomiin näkyvä `contact@finnvek.com`-mailto ja viralliset Instagram/TikTok/YouTube-ikonit kansiosta `public/brand/`. Alkuperäiset ladatut logopaketit pidetään `.gitignore`ssa eikä niitä commitoida.
- Muutokset julkaistiin Cloudflare Pagesiin `main`-ympäristöön deploymentilla `559d3fcf`. Live-tarkistus vahvisti `/about/`-sivun 200-statuksen, canonicalin, AboutPage/Breadcrumb/Organization JSON-LD:n, footer-yhteystiedon sekä sen, ettei etusivun tai About-sivun HTML sisällä `PreOrder`, `PreSale` tai `availability`-arvoja.
- Finnvek/contact/some-profiilit keskitettiin `src/config/brand.ts`-lähteeseen. `Footer`, etusivun schema, About-sivun schema ja `BaseLayout`in head-linkit käyttävät samaa listaa. `BaseLayout` lisää nyt `og:site_name`-metan sekä Instagram/TikTok/YouTube-profiileille `rel="me"`-linkit; erillisiä epästandardeja `instagram:*`, `tiktok:*` tai `youtube:*` meta-tageja ei käytetä.

### 2026-05-16 - Footerin X-profiililinkki
- Lisättiin Finnvekin X-profiili `https://x.com/finnvek` keskitettyyn `src/config/brand.ts`-someprofiililistaan, jolloin footer, `sameAs`-structured data ja `rel="me"`-head-linkit käyttävät samaa lähdettä.
- Footerin someikonit optimoitiin 64x64 WebP-asseteiksi (`instagram.webp`, `tiktok.webp`, `youtube.webp`, `x.webp`) ja `src/config/brand.ts` osoittaa niihin. Vanhat footerin PNG-assetit poistettiin `public/brand/`-kansiosta, jotta buildiin ei jää käyttämättömiä raskaita logoja. Ikonit normalisoitiin 44px näkyvään maksimikokoon 64px canvasilla, ja TikTokin musta neliötausta poistettiin läpinäkyväksi.
