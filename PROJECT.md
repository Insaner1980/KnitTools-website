# KnitTools Website - toteutuksen käsikirja

Repositorion juuri: nykyisen checkoutin juurihakemisto. Kaikki tässä dokumentissa mainitut suhteelliset polut tulkitaan siitä, ellei toisin mainita.

- **Tuotanto:** https://knittoolsapp.com
- **GitHub:** https://github.com/Insaner1980/KnitTools-website

Tämä dokumentti kuvaa KnitTools-verkkosivuston nykyisen toteutuksen. Sen tarkoitus on toimia lähteenä koodintarkistuskysymyksille, UI-työlle, lokalisoinnille, SEO-tarkistuksille, julkaisuvalmistelulle ja uusien työtehtävien rajaukselle.

Nykyinen lähdekoodi, konfiguraatio ja suoritettavat testit ovat aina ensisijaisia tähän dokumenttiin nähden. Päivitä tämä tiedosto, kun arkkitehtuuri, reitit, sisältömäärät, omistavat komponentit tai julkaisuprosessi muuttuvat.

## 1. Tärkein projektiraja

| Asia         | KnitTools Website                                              | KnitTools Android -sovellus                                    |
| ------------ | -------------------------------------------------------------- | -------------------------------------------------------------- |
| Hakemisto    | Nykyisen checkoutin juurihakemisto                             | Eri repository, ei tämä työhakemisto                           |
| Tekniikka    | Astro, TypeScript, CSS, selain-JavaScript                      | Kotlin, Jetpack Compose, Gradle                                |
| Tuotevastuu  | Landing page, ilmaiset web-työkalut, artikkelit, waitlist, SEO | Asennettava mobiilisovellus ja sen paikallinen toiminnallisuus |
| Julkaisu     | Cloudflare Pages Direct Upload                                 | Android-sovelluksen oma build- ja jakeluprosessi               |
| Tietolähteet | src, public, scripts, Astro-konfiguraatio                      | Android-repositoryn lähdekoodi ja Gradle-konfiguraatio         |

Tässä repositoryssa ei ole Kotlin-, Gradle- tai AndroidManifest-tiedostoja. Verkkosivuston markkinointitekstit voivat kuvailla sovelluksen ominaisuuksia, mutta ne eivät todista Android-toteutuksen nykytilaa. Android-koodin tarkistus-, UI- tai julkaisutöitä ei pidä johtaa tämän repositoryn toteutuksesta.

## 2. Nykytilan yhteenveto

- Staattinen Astro 7.1.6 -sivusto.
- Kahdeksan julkista kieltä: englanti, suomi, saksa, ruotsi, norja Bokmål, ranska, hollanti ja tanska.
- Kuusi ilmaista selainpohjaista työkalua jokaisella kielellä.
- 38 artikkelia jokaisella kielellä, yhteensä 304 julkaistua Markdown-artikkelia.
- Nykyinen tuotantobuild generoi 411 sivua.
- Landing page markkinoi tulevaa Android-sovellusta ja sisältää waitlist-lomakkeen.
- Sivusto on palvelimeton staattinen frontend. Waitlist-lomake käyttää ulkoista API-päätepistettä; repository omistaa selainpuolen integraation, ei backendin runtimea tai deploymentia.
- Julkaisu tehdään paikallisesti rakennetusta dist-hakemistosta Cloudflare Pagesiin.

Sivumäärän rakenne:

| Kokonaisuus                      |  Sivuja |
| -------------------------------- | ------: |
| Artikkelien kieli-indexit        |       8 |
| Artikkelikategoriat, 5 per kieli |      40 |
| Artikkelit, 38 per kieli         |     304 |
| Työkaluindexit                   |       8 |
| Työkalusivut, 6 per kieli        |      48 |
| Landing, About ja 404            |       3 |
| **Yhteensä**                     | **411** |

## 3. Lähdekoodin kartta

| Polku                           | Omistus ja käyttötarkoitus                                                   |
| ------------------------------- | ---------------------------------------------------------------------------- |
| src/pages/                      | Julkiset Astro-reitit                                                        |
| src/components/                 | Jaetut landing-, navigaatio-, työkalu-, CTA- ja sisältökomponentit           |
| src/layouts/BaseLayout.astro    | Head, canonicalit, hreflang, fontit, analytiikka ja globaalit selainhelperit |
| src/layouts/PageLayout.astro    | Navbar, main ja Footer tavallisille sivuille                                 |
| src/layouts/ArticleLayout.astro | Artikkelin rakenne, metadata ja Article structured data                      |
| src/content/articles/           | 304 artikkelia kielihakemistoissa                                            |
| src/content.config.ts           | Artikkelien sisältöskeema                                                    |
| src/i18n/routes.ts              | Lokalisoitujen reittien kanoninen lähde                                      |
| src/i18n/articles.ts            | Artikkelikäännösten translationKey-paritus ja kategoriat                     |
| src/i18n/ui.ts                  | Jaetut lokalisoidut käyttöliittymätekstit                                    |
| src/i18n/tools.ts               | Footerin lokalisoidut työkalulinkit                                          |
| src/lib/toolReferenceData.ts    | Puikko- ja lankavahvuustaulukoiden yhteinen numerodata                       |
| src/config/brand.ts             | Finnvek, yhteystieto ja someprofiilit                                        |
| src/config/pricing.ts           | Aluekohtaiset launch- ja regular-hinnat                                      |
| src/scripts/                    | Selainlogiikka taulukoille, animaatioille, navigaatiolle ja waitlistille     |
| scripts/                        | SEO-auditit, release gate ja Node-testit                                     |
| public/                         | Fontit, kuvat, faviconit, robots, headers, redirects ja webmanifest          |
| astro.config.mjs                | Astro site URL, trailing slash, sitemap ja build-asetukset                   |
| sonar-project.properties        | SonarCloud-projektin lähde- ja projektiasetukset                             |

Koodikannan tämänhetkinen suuruusluokka:

- 37 Astro-komponenttia
- 63 Astro-sivutiedostoa
- 5 selaimessa suoritettavaa TypeScript-skriptiä
- 304 Markdown-artikkelia
- 9 Node-testitiedostoa
- 25 public-assettia

## 4. Tekniikka ja riippuvuudet

Package manager on npm ja lukitustiedosto on package-lock.json version 3.

Keskeiset nykyiset versiot:

| Paketti          | Versio |
| ---------------- | -----: |
| astro            |  7.1.6 |
| @astrojs/sitemap |  3.7.3 |
| gsap             | 3.15.0 |
| @astrojs/check   |  0.9.9 |
| eslint           | 10.3.0 |
| prettier         |  3.8.3 |
| typescript       |  6.0.3 |

TypeScript käyttää Astron strict-konfiguraatiota. Repository ei määritä Node engines -rajaa eikä .nvmrc-tiedostoa, joten yksittäistä paikallista Node-versiota ei pidä kirjata projektivaatimukseksi ilman erillistä päätöstä.

Sharp ei ole nykyinen suora riippuvuus. Kolmannen osapuolen riippuvuuksia ei tule päätellä vanhoista suunnitelmista tai keskusteluista, vaan package.json- ja package-lock.json-tiedostoista.

## 5. Komennot ja todistustaso

| Komento                | Mitä se todistaa                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| npm run dev            | Käynnistää paikallisen Astro-kehityspalvelimen                                                                 |
| npm run build          | Generoi staattisen dist-buildin                                                                                |
| npm run check          | Ajaa nykyisen `astro check` -tarkistuksen                                                                      |
| npm run lint           | Ajaa ESLint-tarkistuksen `package.json`-tiedostossa määritellylle lähde-, scripti- ja konfiguraatiorajaukselle |
| npm run format         | Ajaa Prettierin kirjoittavassa tilassa ja voi muuttaa tiedostoja; käytä vain, kun tehtävä sallii formatoinnin  |
| npm run format:check   | Tarkistaa Prettier-muotoilun kirjoittamatta tarkoituksellisesti tiedostoja                                     |
| npm run verify         | Astro check, ESLint, Prettier, source-testit ja build                                                          |
| npm run astro          | Nykyinen alias komennolle `npm run verify`; ei välitä Astro CLI -argumentteja                                  |
| npm run test:seo       | Testaa SEO-auditiscriptien omaa käyttäytymistä                                                                 |
| npm run seo:audit      | Auditoi paikallisen dist-buildin                                                                               |
| npm run seo:urls       | Vertaa paikallista ja tuotannon sitemapia                                                                      |
| npm run seo:live       | Auditoi tuotannon sivut, sitemapin, robotsin ja linkit                                                         |
| npm run seo:gate       | Kokoaa reports-hakemiston löydökset release-päätökseksi                                                        |
| npm run verify:seo     | Build, paikallinen audit, URL-pariteetti, live-audit ja gate                                                   |
| npm run verify:release | Kattavin paikallinen ja tuotantoon ulottuva release-varmistus                                                  |
| npm run preview        | Esikatselee valmiin dist-buildin                                                                               |
| sonar                  | Ajaa manuaalisen SonarCloud-skannauksen ja kirjoittaa raportit reports-hakemistoon                             |

npm run verify ei ota yhteyttä tuotantoon eikä osoita, että deployattu sivusto vastaa paikallista buildiä. npm run seo:live ja URL-pariteettitarkistus tarvitsevat verkkoyhteyden. Myös läpäissyt staattinen build todistaa vain lähteen ja buildin, ei Android-sovelluksen toimintaa, ulkoisen waitlist-API:n backendin toimintaa tai tuotannon kaikkia asetuksia.

## 6. Astro-, build- ja julkaisuasetukset

astro.config.mjs määrittää:

- site: https://knittoolsapp.com
- output: static
- trailingSlash: always
- build.assets: \_assets
- Shiki-teema: github-light
- @astrojs/sitemap-integraation

public/\_redirects ohjaa /sitemap.xml-polun pysyvästi /sitemap-index.xml-polkuun. public/robots.txt sallii indeksoinnin ja viittaa sitemap-indexiin.

Tuotantodeploy on Direct Upload:

    npx wrangler pages deploy ./dist --project-name knittoolsapp --branch main

Ennen deployta:

1. Suorita tarkoitukseen sopiva release-varmistus.
2. Tarkista muutosten tarkka diff ja ettei mukana ole paikallisia raportteja tai salaisuuksia.
3. Commitoi ja pushaa sama lähde GitHubiin.
4. Varmista git rev-list --left-right --count HEAD...@{u} tulokseksi 0 0.
5. Deployaa juuri siitä paikallisesta commitista rakennettu dist.

Buildin läpäisy ei yksin oikeuta deployta. Repositoryn julkaisuohje edellyttää, että GitHub ja paikallinen commit ovat samassa tilassa ennen Direct Uploadia.

## 7. Layoutit, head ja yhteiset selaintoiminnot

### BaseLayout.astro

BaseLayout omistaa:

- html lang -arvon ja no -> nb -muunnoksen
- title- ja description-metatiedot
- canonical-linkin
- hreflang-linkit sekä x-default-linkin, kun englannin alternaatti on olemassa
- Open Graph- ja Twitter-metatiedot
- faviconit ja webmanifest-linkin
- fonttien preloadit
- Google Analyticsin vain tuotantobuildissa
- Cloudflare Web Analytics -beaconin bodyn lopussa
- waitlistSignup-helperin
- valinnaiset reveal-animaatiot
- alueellisen hinnoittelun selainlogiikan

Teko 500, General Sans 400 ja General Sans 600 preloadataan oletuksena. Lalezar preloadataan tarvittaessa. Landing poistaa Lalezarin preloadin käytöstä, koska sen nykyinen hero ei tarvitse sitä ensimmäisen renderin kriittisenä fonttina.

### PageLayout.astro ja ArticleLayout.astro

PageLayout yhdistää Navbarin, main-sisällön ja Footerin tavallisille sivuille. ArticleLayout lisää artikkelin otsikko-, kategoria-, päivämäärä- ja byline-rakenteen sekä Article JSON-LD:n.

Head- ja schema-muutoksia tarkistettaessa on aina tarkastettava sekä BaseLayout että sivu- tai artikkelikohtainen structured data. Näkyvä sisältö, canonical, hreflang ja JSON-LD eivät ole sama asia.

## 8. Julkiset reitit ja lokalisointi

Englanti on oletuskieli ilman /en-etuliitettä. Julkisia /en-reittejä ei saa lisätä, koska nykyiset englanninkieliset URLit ovat kanonisia.

### Reittiprefiksit

| Kieli | Työkalut                | Artikkelit      | Kategoriat                |
| ----- | ----------------------- | --------------- | ------------------------- |
| en    | /tools/                 | /articles/      | /articles/category/       |
| fi    | /fi/tyokalut/           | /fi/artikkelit/ | /fi/artikkelit/kategoria/ |
| de    | /de/werkzeuge/          | /de/artikel/    | /de/artikel/kategorie/    |
| sv    | /sv/verktyg/            | /sv/artiklar/   | /sv/artiklar/kategori/    |
| no    | /no/verktoy/            | /no/artikler/   | /no/artikler/kategori/    |
| fr    | /fr/outils/             | /fr/articles/   | /fr/articles/categorie/   |
| nl    | /nl/breitools/          | /nl/artikelen/  | /nl/artikelen/categorie/  |
| da    | /da/strikkevaerktoejer/ | /da/artikler/   | /da/artikler/kategori/    |

Norjan sisäinen avain on no. HTML lang ja hreflang renderöidään Bokmålin tunnuksella nb.

### Työkalureitit

| Kieli | Cast on                                  | Yarn estimator                        | Needle sizes                             | Yarn weights                          | Abbreviations                               | Size charts                                       |
| ----- | ---------------------------------------- | ------------------------------------- | ---------------------------------------- | ------------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| en    | /tools/cast-on-calculator/               | /tools/yarn-estimator/                | /tools/needle-size-chart/                | /tools/yarn-weight-chart/             | /tools/knitting-abbreviations/              | /tools/knitting-size-charts/                      |
| fi    | /fi/tyokalut/silmukkalaskuri/            | /fi/tyokalut/lankamuunnin/            | /fi/tyokalut/puikkokoot/                 | /fi/tyokalut/lankavahvuudet/          | /fi/tyokalut/neulelyhenteet/                | /fi/tyokalut/neulekokotaulukot/                   |
| de    | /de/werkzeuge/maschenanschlag-rechner/   | /de/werkzeuge/garnbedarfsrechner/     | /de/werkzeuge/nadelstaerken-tabelle/     | /de/werkzeuge/garnstaerken-tabelle/   | /de/werkzeuge/strickabkuerzungen/           | /de/werkzeuge/groessentabellen-stricken/          |
| sv    | /sv/verktyg/upplaggningskalkylator/      | /sv/verktyg/garnatgangskalkylator/    | /sv/verktyg/stickstorlekar/              | /sv/verktyg/garntjocklekar/           | /sv/verktyg/stickforkortningar/             | /sv/verktyg/storlekstabeller-stickning/           |
| no    | /no/verktoy/oppleggskalkulator/          | /no/verktoy/garnberegner/             | /no/verktoy/pinnestorrelser/             | /no/verktoy/garntykkelser/            | /no/verktoy/strikkeforkortelser/            | /no/verktoy/storrelsestabeller-strikking/         |
| fr    | /fr/outils/calculateur-mailles-a-monter/ | /fr/outils/estimateur-quantite-laine/ | /fr/outils/tailles-aiguilles/            | /fr/outils/epaisseurs-de-fil/         | /fr/outils/abreviations-tricot/             | /fr/outils/tableaux-tailles-tricot/               |
| nl    | /nl/breitools/opzetcalculator/           | /nl/breitools/garenberekenaar/        | /nl/breitools/naalddiktes/               | /nl/breitools/garendiktes/            | /nl/breitools/breiafkortingen/              | /nl/breitools/maattabellen-breien/                |
| da    | /da/strikkevaerktoejer/opslagsberegner/  | /da/strikkevaerktoejer/garnberegner/  | /da/strikkevaerktoejer/pindestoerrelser/ | /da/strikkevaerktoejer/garntykkelser/ | /da/strikkevaerktoejer/strikkeforkortelser/ | /da/strikkevaerktoejer/stoerrelsestabeller-strik/ |

src/i18n/routes.ts on näiden reittien lähde. Reittimuutoksessa pitää päivittää vähintään reittilähde, linkitykset, canonical/hreflang, sitemap-odotukset ja URL-pariteetti. Pelkkä sivutiedoston siirtäminen ei riitä.

## 9. Artikkelijärjestelmä

Artikkelit ovat src/content/articles-hakemistossa. Kieliä on kahdeksan ja jokaisessa on 38 julkaistua artikkelia:

| Kieli        | Artikkelit | Draftit |
| ------------ | ---------: | ------: |
| en           |         38 |       0 |
| fi           |         38 |       0 |
| de           |         38 |       0 |
| sv           |         38 |       0 |
| no           |         38 |       0 |
| fr           |         38 |       0 |
| nl           |         38 |       0 |
| da           |         38 |       0 |
| **Yhteensä** |    **304** |   **0** |

### Artikkelien frontmatter-skeema

Artikkelien frontmatter määritellään tiedostossa `src/content.config.ts`. Nykyinen lähdeskeema on aina ensisijainen, ja dokumentin taulukko päivitetään vain, kun itse skeema muuttuu.

| Kenttä           | Vaatimus ja tyyppi                                                   | Oletus tai hyväksytyt arvot                                        | Käyttö                                                                                                       |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `title`          | Pakollinen `string`; tyhjä merkkijono sallitaan.                     | Ei oletusta.                                                       | Näkyvä artikkeliotsikko, korttiotsikko ja Article-structured datan `headline`.                               |
| `browserTitle`   | Valinnainen `string`; tyhjä merkkijono sallitaan.                    | Ei oletusta.                                                       | Englanninkielisen artikkelireitin `<title>`-ylikirjoitus; ilman arvoa otsikko muodostetaan `title`-kentästä. |
| `description`    | Pakollinen `string`; tyhjä merkkijono sallitaan.                     | Ei oletusta.                                                       | Meta- ja Open Graph -kuvaus, kortin kuvaus sekä structured datan `description`.                              |
| `category`       | Pakollinen enum.                                                     | `gauge-calculations`, `yarn`, `needles`, `techniques`, `app-tools` | Kategoriajaottelu, listasuodatus ja structured datan `articleSection`.                                       |
| `readTime`       | Valinnainen `string`; tyhjä merkkijono sallitaan.                    | Ei oletusta.                                                       | Skeeman sallima lukuaikatieto; nykyinen renderöinti ei käytä kenttää.                                        |
| `publishDate`    | Pakollinen `z.coerce.date()`; tulos on `Date`.                       | Ei oletusta.                                                       | Julkaisupäivä kortissa, näkyvässä metadatassa sekä head- ja Article-metadatassa.                             |
| `updatedDate`    | Valinnainen `z.coerce.date()`; annettu arvo muuttuu `Date`-olioksi.  | Ei oletusta.                                                       | Merkittävän päivityksen päivämäärä; puuttuessa `publishDate` toimii muokkauspäivän fallbackina.              |
| `categoryOrder`  | Valinnainen kokonaisluku, vähintään `1`.                             | Ei skeemaolettamaa; lajittelufallback `999`.                       | Artikkelien järjestys kategoria- ja kielilistoissa.                                                          |
| `tags`           | Oletusarvollinen `string[]`; alkiot voivat olla tyhjiä merkkijonoja. | `[]`                                                               | Head-metadatan artikkelitunnisteet ja structured datan `keywords`.                                           |
| `draft`          | Oletusarvollinen `boolean`.                                          | `false`                                                            | Draftien näkyvyys dev-ympäristössä ja suodatus muista buildeistä.                                            |
| `lang`           | Oletusarvollinen enum.                                               | `en`, `fi`, `de`, `sv`, `no`, `fr`, `nl`, `da`; oletus `en`.       | Sisäinen kieliavain kielisuodatukseen, reititykseen ja metadataan.                                           |
| `translationKey` | Valinnainen `string`; tyhjä merkkijono sallitaan.                    | Ei oletusta.                                                       | Lokalisoitujen vastineiden ryhmittely sekä reitti- ja hreflang-paritus.                                      |

Jos `translationKey` puuttuu, nykyinen artikkelijärjestelmä käyttää ryhmäavaimena lähdetiedoston nimeen perustuvaa fallbackia. Eksplisiittistä avainta käytetään lokalisoitujen vastineiden yhdistämiseen, kun tiedostonimet eroavat toisistaan.

### Kielikohtaiset käännösoppaat

Kielikohtaiset termi-, tyyli- ja lokalisointilinjaukset on dokumentoitu repositoryn juuressa olevissa oppaissa. Tarkista asianomaisen kielen opas ennen kyseisen kielen käännös- tai lokalisointimuutosta. Älä kopioi oppaiden yksityiskohtaisia sääntöjä tähän käsikirjaan.

- `FINNISH_TRANSLATION_GUIDE.md`
- `GERMAN_TRANSLATION_STYLE_GUIDE.md`
- `SWEDISH_TRANSLATION_GUIDE.md`
- `NORWEGIAN_TRANSLATION_GUIDE.md`
- `FRENCH_TRANSLATION_GUIDE.md`
- `DUTCH_TRANSLATION_GUIDE.md`
- `DANISH_TRANSLATION_GUIDE.md`

Jokaisen kielen kategoriarakenne on:

- gauge-calculations: 6
- yarn: 9
- needles: 3
- techniques: 13
- app-tools: 7

src/i18n/articles.ts parittaa kaikki nykyiset 38 translationKey-ryhmää seitsemään käännökseen englannin lisäksi. Uutta draft-käännöstä ei lisätä translation-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan URLiin.

Reittitoteutus ei ole kaikilla kielillä samanmuotoinen:

- englannilla, suomella, saksalla ja ruotsilla on erilliset index-, kategoria- ja artikkelisivut
- norja, ranska, hollanti ja tanska käyttävät kielikohtaista catch-all-reittiä sekä buildLocalizedArticleStaticPaths-helperiä

Koodintarkistuksessa ei siis pidä olettaa tiedostorakenteen yhdenmukaisuutta pelkän URL-rakenteen perusteella.

Artikkelijärjestelmän testit varmistavat sisältö- ja URL-identiteetin, käännöskartan sekä migraatiot. Nykyinen URL-kokonaisuus sisältää 352 artikkelijärjestelmän sivua: 304 artikkelia, 40 kategoriaa ja 8 indexiä.

## 10. Landing page

Nykyinen src/pages/index.astro renderöi tässä järjestyksessä:

1. Hero
2. Marquee
3. YarnPath
4. NineTools
5. FreeToolsCallout
6. TrustSection
7. käännetty YarnPath
8. PullQuote
9. PricingCards
10. HomeFaq
11. ClosingCTA

Hero on editorial two-column -rakenne. Vasemmalla on kuvaava H1 ja Teko-fontilla renderöity KnitTools-wordmark. Oikealla on waitlist-kortti. Nykyisessä komponenttipuussa ei ole puhelinmockupia tai Three.js-hero-puhelinta.

NineTools kuvaa viisi ilmaista ja kolme Pro-ominaisuutta. Tämä on markkinointisisältöä tulevasta sovelluksesta, ei todiste Android-toteutuksesta. FreeToolsCallout linkittää kuuteen oikeasti toteutettuun selainpohjaiseen työkaluun.

Landingin JSON-LD on graph, joka sisältää:

- Finnvek Organization -solmun
- KnitTools SoftwareApplication -solmun
- publisher-viittauksen Finnvekiin
- aluekohtaiset tarjoussolmut pricing-konfiguraatiosta

Offers-solmuissa ei ole availability-arvoa, koska Google Play -tilaus tai lataus ei ole vielä todellinen. Älä lisää PreOrder- tai PreSale-arvoa pelkän waitlistin perusteella.

## 11. Navigaatio, footer ja waitlist

### Navbar

Navbarin mobiiliraja on 641 px. Mobiilivalikko päivittää ARIA-tilat, sulkeutuu Escape-näppäimellä, ulkopuolisesta klikkauksesta ja desktop-leveyteen siirryttäessä. Scrolled-tila aktivoituu yli 80 pikselin vierityksessä.

Brändilinkki vie juureen /. Lokalisoitujen sivujen Join-linkki kohdistuu kielen omaan työkaluindexiin ja sen #join-ankkuriin.

### Footer

Footer hakee:

- lokalisoidut työkalulinkit src/i18n/tools.ts-tiedostosta
- artikkelikategoriat CATEGORY_ORDER-, getCategoryLabel- ja routes.category-lähteistä
- `CONTACT_MAILTO`- ja `FINNVEK_URL`-arvot `src/config/brand.ts`-tiedostosta

Nykyinen Footer ei renderöi someikoneita. `SOCIAL_PROFILE_URLS` ei kuulu Footerin nykyiseen toteutukseen. `src/layouts/BaseLayout.astro` käyttää sitä `<link rel="me">` -metadataan, ja `src/layouts/ArticleLayout.astro`, `src/pages/about.astro` sekä `src/pages/index.astro` käyttävät sitä rakenteisen datan `sameAs`-arvoihin. Vanha kuvaus footerissa näkyvistä someikoneista ei vastaa nykyistä komponenttia.

### Waitlist

src/scripts/waitlistSignup.ts omistaa kaikkien data-waitlist-signup-lomakkeiden submit-logiikan. Se:

- validoi sähköpostin
- lähettää JSON-payloadin, jossa ovat email, source ja website
- käyttää ulkoista API-päätepistettä
- katkaisee pyynnön 10 sekunnin jälkeen
- päivittää loading-, onnistumis- ja virhetilat
- ylläpitää aria-invalid- ja aria-describedby-attribuutteja

Waitlist-lomakkeet lähettävät pyynnöt repositoryn ulkopuoliseen API-päätepisteeseen. Tämä repository sisältää selainpuolen integraation sekä sen pyyntö-, vastaus- ja virheenkäsittelyn, mutta ei taustapalvelun lähdekoodia, ajoympäristöä tai deployment-konfiguraatiota. Varmista ulkoisen palvelun nykyinen toteutus sen omasta lähteestä tai deployment-ympäristöstä ennen taustapalveluun kohdistuvia muutoksia.

Frontendin testaus ei osoita endpointin tuotantotilaa tai tallennuksen toimivuutta.

## 12. Työkalusivujen arkkitehtuuri

Kaikki kahdeksan tools-indexiä käyttävät ToolsIndexPage.astro-komponenttia. Nykyinen desktop-grid on:

- kaksi ylärivin laskurikorttia, kumpikin 6/12 leveä
- neljä alarivin referenssikorttia, kukin 3/12 leveä
- enintään 1024 px: kaksi saraketta
- enintään 768 px: yksi sarake

Tämä koodista luettu rakenne on ensisijainen mahdollisiin vanhoihin 50/50-alalarivikuvauksiin nähden.

Kaikki 42 lokalisoitua työkalusivua käyttävät LocalizedToolPage.astro-pohjaa. Kuusi englanninkielistä työkalusivua ovat edelleen erillisiä Astro-sivuja. Hollannin ja tanskan työkalut käyttävät kielikohtaisia catch-all-komponentteja, kun taas muilla lokalisoiduilla kielillä on erillisiä sivutiedostoja.

LocalizedToolPage omistaa yhteisen:

- heron, back-linkin ja tool/content-slotit
- FAQ-renderöinnin
- waitlist-CTA:n
- WebApplication structured datan
- valinnaiset responsiiviset taulukko-ohjaimet

ToolStructuredData merkitsee selaintyökalun hinnaksi 0. Lokalisoitu pohja välittää tällä hetkellä valuutaksi EUR kaikille lokalisoiduille kielille, vaikka hinta on nolla. Tämä on nykyinen toteutus ja mahdollinen structured data -tarkistuskohde, ei oletettu virhe.

## 13. Laskurit ja referenssityökalut

### CastOnCalculator.astro

Jaettu silmukkalaskuri on käytössä kaikilla kahdeksalla kielellä.

- Neuletiheys: min 1, max 100, askel 0,5
- Leveys: min 0,1, max 1000, askel 0,1
- senttimetrit: stitches = gauge / 10 \* width
- tuumat: stitches = gauge / 4 \* width
- tulos pyöristetään lähimpään parilliseen lukuun Math.round(stitches / 2) \* 2
- ranska, hollanti ja tanska ovat metricOnly
- jaettu numeroparseri hyväksyy desimaalipisteen ja normalisoi desimaalipilkun kaikilla kielillä, myös englanniksi
- instanssit saavat uniikit kenttä-ID:t, ja labelien for-attribuutit päivitetään vastaamaan niitä
- virhe renderöidään alert-tilaan
- tulos käyttää countUp-animaatiota

Silmukkalaskurin muutoksissa tarkista erikseen usean instanssin ID/label-suhteet, desimaalipilkku, yksikkövaihto, rajat ja pyöristys.

### YarnEstimator.astro

Lanka-arvio sisältää 30 projektityyppiä ja yhdeksän lankavahvuuden kerrointa:

| Lankavahvuus | Kerroin |
| ------------ | ------: |
| lace         |    1,50 |
| fingering    |    1,35 |
| sport        |    1,20 |
| dk           |    1,10 |
| worsted      |    1,00 |
| aran         |    0,95 |
| bulky        |    0,80 |
| super-bulky  |    0,60 |
| jumbo        |    0,45 |

Metrit pyöristetään baseMeters \* multiplier -arvosta. Yardit lasketaan metreistä kertoimella 1,094. Englanti, suomi ja saksa näyttävät yardit sekä metrit. Ruotsi, norja, ranska, hollanti ja tanska näyttävät vain metrit. Käyttöliittymä muistuttaa lisäämään noin 15-20 prosentin varan.

### Yhteiset referenssidatat

src/lib/toolReferenceData.ts sisältää:

- 38 puikkokokoriviä
- 8 lankavahvuuden CYC-riviä
- mitta-, WPI-, CYC- ja alueelliset perusarvot

Kielisivuihin kuuluvat nimet, selitteet ja näkyvän kopion poikkeukset. Numerodataa ei tule kopioida kielikohtaisiin tiedostoihin.

### WPI ja responsiiviset taulukot

WpiIdentifier.astro on yhteinen kaikille kahdeksalle lankavahvuussivulle. Syötearvo on 1-40. Alueet voivat olla päällekkäisiä, joten tuloslogiikan muutokset pitää tarkistaa kaikkien rajojen ympärillä.

src/scripts/responsiveTableControls.ts muuntaa data-mobile-table="cards" -puikkokokotaulukot enintään 600 pikselin leveydessä label-value-korteiksi taulukon omista sarakeotsikoista. Lokalisoituja mobiililabeleita ei kuulu kopioida JavaScriptiin.

src/scripts/sizeChartControls.ts omistaa:

- kokotaulukoiden tab- ja radio-näppäimistömallin
- ARIA-tilojen päivityksen
- yksikkövaihdon
- mobiilin koonvalitsimet
- yhden kokopalstan näyttämisen enintään 600 pikselin leveydessä

Semanttinen koko taulukko säilyy HTML:ssä ja desktopissa.

Lyhennesivut käyttävät selainpuolen hakua ja suodatusta. Englannin puikkokokosivulla on lisäksi nykyisessä lähteessä haku, joka tunnistaa myös US-, UK-, JP-, Japan- ja Japanese-etuliitteitä.

## 14. Design system ja UI-invariantit

### Värit

| Token        | Arvo    | Rooli               |
| ------------ | ------- | ------------------- |
| --paper      | #F4EAD9 | Päätausta           |
| --paper-2    | #EADFC9 | Toinen paperisävy   |
| --ink        | #2A1E17 | Pääteksti           |
| --ink-soft   | #4A382C | Toissijainen teksti |
| --terracotta | #A05038 | Korostus            |
| --sage       | #5B8072 | Vihreä korostus     |
| --walnut     | #6B4332 | Ruskea              |
| --amber      | #C2703E | Lämmin korostus     |
| --wheat      | #C4A661 | Vaalea korostus     |

Korttien stripe-nimiset palettitokenit ovat edelleen käytössä korttitaustoissa. Niiden nimi ei tarkoita, että käyttöliittymässä olisi nykyinen oikean reunan stripe-nauha. Tekstikontrastia varten käytetään accessible rust- ja teal-variantteja.

Älä käytä puhdasta #000000- tai #FFFFFF-väriä. Älä lisää korteille, riveille tai osioille värillisiä reunuksia, sivuraitoja tai koristekehyksiä.

### Typografia

| Fontti                   | Käyttö                                       |
| ------------------------ | -------------------------------------------- |
| Lalezar                  | Editorial display -otsikot                   |
| General Sans 400/500/600 | Body, navigaatio, labelit, napit ja metadata |
| Teko 400/500 subset      | KnitTools-wordmark                           |

Legacy-tokenit kuten --dark, --cream, --accent ja --bebas-\* ovat yhä yhteisten tyylien käytössä. Niitä ei pidä tulkita merkiksi vanhasta Geist/Bebas-ulkoasusta.

Primary-painikkeet ovat suorakulmaisia, General Sans -fontilla, uppercase-tekstillä ja vahvalla trackingilla.

### Poistetut järjestelmät

Nykyisessä komponenttipuussa eivät ole:

- StripeRibbon
- PhoneMockup
- FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave tai FeatureLearn
- FreeToolsMention
- PhoneInset
- ToolClosingCTA
- StitchSeam
- ToolCard

Älä rakenna uutta työtä näiden ympärille ilman erillistä suunnittelupäätöstä.

### Motion

src/scripts/revealAnimations.ts käyttää GSAP ScrollTrigger- ja SplitText-toimintoja revealeihin, sisältöryhmiin, YarnPathiin, PullQuoteen, marqueehen ja details-elementteihin.

src/scripts/motion.ts sisältää muun muassa 800 millisekunnin countUp-helperin ja reduced-motion-tarkistuksen. Globaalit revealit ja view transitionit poistetaan reduced motion -tilassa.

Marquee ja YarnPath ovat tarkoituksellisia poikkeuksia: niiden jatkuva animaatio säilyy nykyisen omistajapäätöksen mukaan myös reduced motion -tilassa. Jos tätä muutetaan, tarkista sekä komponenttityylit että motion-regressiotestit. Älä päättele yleisestä reduced-motion-säännöstä, että jokainen animaatio on pysähtynyt.

## 15. Hinnoittelu

src/config/pricing.ts on aluekohtaisen launch- ja regular-hinnan lähde.

- 16 nimettyä hintatasoa sekä default
- SSR-oletus on US
- selaimen tunnistamaton alue käyttää default-tasoa
- trialDays: 14
- launchMonthLabel: Summer 2026

Selain yrittää tunnistaa maan Cloudflaren /cdn-cgi/trace-endpointista 1,2 sekunnin timeoutilla. Tulos tallennetaan sessionStorage-avaimeen knittools-pricing-country. Navigator-localeen perustuvaa fallbackia ei ole.

Structured data -tarjoukset generoidaan nimetyistä hintatasoista, eivät default-tasosta. Pricing-muutoksessa tarkista aina yhdessä:

- näkyvä hinta
- launch- ja regular-hinta
- valuutta
- region-lista
- structured data
- Cloudflare trace -fallback
- sessionStorage-käyttäytyminen

Summer 2026 on edelleen nykyinen lähdekoodin launch-teksti. Se pitää varmistaa liiketoimintapäätöksenä ennen seuraavaa julkaisua.

## 16. SEO, analytiikka, tietoturva ja Sonar

### SEO

Paikallinen SEO-audit tarkistaa muun muassa canonicalit, hreflangit, metadataa, sisäisiä linkkejä, structured dataa, sitemapia ja rikkoutuneita polkuja. URL-pariteettiaudit vertaa paikallista ja tuotannon sitemapia.

Live-audit käyttää oletuksena kahdeksan rinnakkaista fetch-pyyntöä ja 20 sekunnin timeoutia. Status 0 tarkoittaa auditin fetch-epäonnistumista, ei palvelimen HTTP 0 -vastausta. Satunnaisen yksittäisen status 0 -löydöksen yhteydessä tarkista URL suoraan ja aja audit tarvittaessa pienemmällä --concurrency-arvolla ennen kuin päätät sivun puuttuvan.

Release gate estää julkaisun paikallisista virheistä ja varoituksista, live-virheistä, edelleen rikkoutuneista paikallisista löydöksistä sekä sitemapin odottamattomista lisäyksistä tai poistoista.

### Analytiikka ja yksityisyys

- Google Analytics ladataan vain tuotantobuildissa.
- Cloudflare Web Analytics -beacon renderöidään bodyn lopussa.
- Brändi- ja markkinointitekstit voivat viitata Android-sovelluksen paikalliseen tietojen käsittelyyn.

Sovelluksen yksityisyysväite ei kuvaa automaattisesti verkkosivuston analytiikkaa. Yksityisyystarkistuksessa nämä on arvioitava erillisinä järjestelminä.

### Headers ja security

public/\_headers määrittää tällä hetkellä:

- HSTS max-age 2592000
- CSP: frame-ancestors none, base-uri self, object-src none, form-action self ja upgrade-insecure-requests
- X-Frame-Options DENY
- X-Content-Type-Options nosniff
- Referrer-Policy strict-origin-when-cross-origin
- pitkän immutable-cachen asseteille ja fonteille
- 30 päivän cachen kuville ja brändiasseteille

CSP ei tällä hetkellä määritä default-src-, script-src-, style-src-, img-src-, font-src- tai connect-src-direktiivejä. Tätä ei tule kuvata kattavana CSP:nä. Source-testin läpäisy osoittaa public/\_headers-tiedoston odotetun sisällön, ei sitä, että Cloudflare palauttaa headerit tuotannossa.

public/.well-known/security.txt sisältää yhteystiedon ja vanhenemispäivän 30.4.2027. Tarkista päivämäärä ennen sitä.

### SonarCloud

sonar-wrapper käyttää @sonar/scan-versiota 4.3.5. Skannaus tarvitsee SONAR_TOKEN-ympäristömuuttujan ja kirjoittaa raportit reports-hakemistoon. SonarCloud-projektin Automatic Analysis pitää olla pois käytöstä manuaalisen skannauksen aikana.

reports, .sonar ja .scannerwork ovat gitignoressa eikä niitä saa commitoida.

## 17. Koodintarkistuksen kysymysrunko

Käytä tarkistuksessa vain niitä rivejä, jotka liittyvät muutoksen todelliseen vaikutusalueeseen.

| Muutosalue      | Tarkistuskysymykset                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Reitit          | Vastaavatko routes.ts, tiedostoreitti, linkit, canonical, hreflang, sitemap ja redirectit toisiaan?                  |
| Artikkelit      | Onko translationKey oikea, draft-tila tarkoituksellinen, slug kielikohtainen ja hreflang vain julkaistuun sisältöön? |
| Laskurit        | Ovatko kaava, yksiköt, desimaalipilkku, min/max, pyöristys, virhetila ja usean instanssin saavutettavuus oikein?     |
| Referenssidata  | Onko numerodata toolReferenceData.ts-lähteessä eikä kopioituna kielisivuille?                                        |
| Taulukot        | Säilyvätkö semanttinen desktop-taulukko, mobiilimuunnos, labelit, näppäimistö ja ARIA-tilat?                         |
| UI              | Noudattaako muutos editorial-palettea, fonttirooleja, teräviä painikkeita ja koristekehysten kieltoa?                |
| Motion          | Toimiiko reduced motion ja onko Marquee/YarnPath-poikkeus huomioitu tarkoituksella?                                  |
| Hinnoittelu     | Täsmäävätkö näkyvät hinnat, alueet, valuutat, structured data ja fallback?                                           |
| Analytiikka     | Onko tuotanto- ja dev-käyttäytyminen erotettu, ja vastaavatko yksityisyysväitteet juuri verkkosivustoa?              |
| Structured data | Vastaako JSON-LD näkyvää, nykyistä ja todellista sisältöä ilman tulevan sovelluksen keksittyä saatavuutta?           |
| Tietoturva      | Onko löydös osoitettu lähteen lisäksi tuotantovastauksesta, jos väite koskee tuotantoa?                              |
| Julkaisu        | Onko sama commit varmennettu, pushattu ja rakennettu ennen Direct Uploadia?                                          |

Hyvän tarkistuskysymyksen tulee nimetä:

1. tarkka lähdetiedosto tai omistava komponentti
2. odotettu invarianssi
3. rajatapaus
4. suoritus- tai testitodiste, joka voi osoittaa väitteen oikeaksi tai vääräksi

Esimerkki: Onko CastOnCalculatorin label for -arvo päivitetty jokaisen instanssin uniikkiin input-ID:hen myös silloin, kun samalla sivulla on kaksi laskuria, ja kattaako testi tämän DOM-suhteen?

## 18. UI-työn lähdekysymykset

Ennen UI-muutosta selvitä:

- Onko näkymä englannin erillissivu vai LocalizedToolPage-pohjan käyttäjä?
- Omistaako komponentti itse tyylit vai tulevatko ne global.css-tiedostosta?
- Luoko JavaScript DOM-elementtejä, jolloin scoped Astro -attribuutteja ei synny ja CSS tarvitsee :global()-selektorin?
- Voiko globaali linkkisääntö yliajaa komponentin värin?
- Vaikuttaako muutos desktopin lisäksi 1024, 768, 641 tai 600 pikselin breakpointiin?
- Säilyykö näppäimistökäyttö, focus, ARIA ja reduced motion?
- Onko näkyvä teksti ja mittamuoto lokalisoitu, etenkin desimaalipilkku FR/NL/DA-näkymissä?

Mockup on hierarkian ja sävyn viite. Siitä ei pidä kopioida keksittyä dataa, ominaisuuksia tai Android-sovelluksen tilaa verkkosivustoon.

## 19. Riskialueiden käsittely

PROJECT.md ei ylläpidä hetkellistä auditointihotspot- tai tarkistuslistaa. Tunnista tehtävän riskialueet nykyisestä lähteestä, testeistä ja muutoksen vaikutusketjusta. Kirjaa tehtäväkohtaiset löydökset, avoimet tarkistukset ja jatkotoimet tehtäväraporttiin tai issueen. Säilytä tässä käsikirjassa vain pysyvät vaatimukset, omistajuudet ja validointiperiaatteet.

## 20. Työpuun käsittely

PROJECT.md ei saa sisältää hetkellistä Git-työpuun tilannekuvaa tai muuttuneiden tiedostojen luetteloa, koska ne vanhenevat heti seuraavan muutoksen tai commitin yhteydessä. Tarkista työpuun tila aina suoraan Gitistä tehtävän alussa ja säilytä kaikki ennestään olevat käyttäjän muutokset. Kirjaa tehtäväkohtainen työpuutila tehtävän raporttiin, ei tähän pysyvään projektikäsikirjaan.

## 21. Git-historia

PROJECT.md ei ylläpidä commit-aikajanaa, yksittäisten commitien SHA-tunnisteita tai päiväkohtaisia toteutusluetteloita, koska ne vanhenevat nopeasti ja kuuluvat Gitin omaan historiaan. Tarkista toteutushistoria aina suoraan Gitistä esimerkiksi `git log`- ja `git show`-komennoilla. Dokumentoi tähän vain pysyvät arkkitehtuuri-, sisältö- ja työnkulkusäännöt. Valmistuneiden muutosten historia kuuluu commit-viesteihin ja tarvittaessa erilliseen changelogiin tai julkaisutietoihin.

## 22. Validointitulosten käsittely

PROJECT.md ei ylläpidä yksittäisten testiajojen tuloksia, testimääriä, rakennettujen sivujen lukumääriä, tarkistusajankohtia tai viimeisimmän onnistuneen ajon tilannekuvaa, koska ne vanhenevat lähteen ja testien muuttuessa. Selvitä käytettävissä olevat komennot aina nykyisestä `package.json`-tiedostosta ja suorita tehtävän vaikutusalueeseen sopivat tarkistukset. Kirjaa suoritetut komennot, tulokset, epäonnistumiset ja mahdolliset rajoitukset tehtäväraporttiin. Dokumentoi tähän vain pysyvät validointiperiaatteet ja komentojen tarkoitus, ei yksittäisen ajon lukumääriä tai tuloksia.

## 23. Päivityssääntö

Päivitä PROJECT.md, kun jokin seuraavista muuttuu:

- Astro- tai ydintyökalujen versio
- reittiprefiksi tai lokalisoitu slug
- kieli-, artikkeli-, kategoria- tai sivumäärä
- omistava layout, komponentti, helper tai datalähde
- laskurin kaava tai referenssidata
- landingin rakenne
- design-tokenit, fonttiroolit, breakpointit tai motion-invariantit
- hinnoittelu, analytiikka, security headerit tai structured data
- testikokoonpano tai julkaisuprosessi

Älä päivitä toteutuskuvausta suunnitelman perusteella ennen kuin muutos on nykyisessä lähdekoodissa. Älä lisää dokumenttiin hetkellistä työpuutilannekuvaa tai muuttuneiden tiedostojen luetteloa; nykyinen Git-tila tarkistetaan aina suoraan repositoriosta.
