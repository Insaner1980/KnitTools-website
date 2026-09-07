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
| src/styles/global.css           | Fontit, globaalit tokenit, reset, fokus, prose, lomakkeet ja yhteiset pinnat |
| src/styles/typography.css       | Työkalutaulukoiden typografiatokenit                                         |
| src/assets/images/              | Lähdeassetit; nykyinen komponenttipuu ei tuo niitä renderöintiin             |
| scripts/                        | SEO-auditit, release gate ja Node-testit                                     |
| public/                         | Sellaisenaan kopioitavat fontit, kuvat, faviconit ja hosting-metatiedostot   |
| astro.config.mjs                | Astro site URL, trailing slash, sitemap ja build-asetukset                   |
| sonar-project.properties        | SonarCloud-projektin lähde- ja projektiasetukset                             |

Koodikannan tämänhetkinen suuruusluokka:

- 37 Astro-komponenttia
- 63 Astro-sivutiedostoa
- 5 selaimessa suoritettavaa TypeScript-skriptiä
- 304 Markdown-artikkelia
- 9 Node-testitiedostoa
- 25 public-assettia

Lukumäärät ovat toteutuksen rakennetta kuvaavia inventaariotietoja. Ne on laskettava uudelleen lähteestä, jos tiedostoja lisätään tai poistetaan; yksittäisen aiemman buildin tulostetta ei pidä käyttää nykytilan todisteena.

### Arkkitehtuurivirta

```text
Markdown-artikkelit ----> Astro content collection ----> artikkelireitit
                                 |                              |
i18n/routes + articles + ui -----+----> sivut ja komponentit ---+--> staattinen dist/
config/brand + pricing ----------+             |
toolReferenceData ---------------+             +--> selain-TS ja GSAP
global.css + komponenttityylit ----------------+
public/ -----------------------------------------------> dist/ sellaisenaan
                                                                  |
                                                                  +--> Cloudflare Pages Direct Upload
```

Build-aikana Astro lukee sisältökokoelman, tuottaa staattiset reitit, renderöi canonical-, hreflang- ja structured data -tiedot sekä kirjoittaa valmiin sivuston `dist/`-hakemistoon. Sivustolla ei ole Astro SSR:ää, Pages Functions -funktioita, repositoryssa toteutettua API-reittiä tai client-side-routeria.

Selainruntime koostuu neljästä toisistaan erotettavasta virrasta:

1. Tavallinen sivunavigaatio lataa staattisen HTML-dokumentin; View Transitions on progressiivinen CSS-parannus, ei JavaScript-routeri.
2. Laskurit, haut, taulukko-ohjaimet ja waitlist kytkeytyvät server-renderöityyn HTML:ään sivu- tai komponenttikohtaisilla skripteillä.
3. GSAP-revealit aktivoidaan vain sivuilla, jotka välittävät `enableRevealAnimations`-propin `BaseLayout`-ketjuun.
4. Alueellinen hinnoittelu yrittää hakea Cloudflaren maakoodin ja waitlist lähettää lomakkeen ulkoiseen Finnvek-API:in. Nämä ovat analytiikkaskriptien lisäksi ainoat nykyiset sovelluskoodin käynnistämät dynaamiset `fetch()`-pyynnöt; tavallisia dokumentti-, fontti-, kuva- ja assettipyyntöjä ei lasketa tähän.

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
| npm ci                 | Asentaa täsmälleen `package-lock.json`-lukituksen mukaisen riippuvuuspuun puhtaaseen ympäristöön               |
| npm run dev            | Käynnistää paikallisen Astro-kehityspalvelimen                                                                 |
| npm run build          | Generoi staattisen dist-buildin                                                                                |
| npm run check          | Ajaa nykyisen `astro check` -tarkistuksen                                                                      |
| npm run lint           | Ajaa ESLint-tarkistuksen `package.json`-tiedostossa määritellylle lähde-, scripti- ja konfiguraatiorajaukselle |
| npm run format         | Ajaa Prettierin kirjoittavassa tilassa ja voi muuttaa tiedostoja; käytä vain, kun tehtävä sallii formatoinnin  |
| npm run format:check   | Tarkistaa Prettier-muotoilun kirjoittamatta tarkoituksellisesti tiedostoja                                     |
| npm run test:articles  | Ajaa artikkelijärjestelmän ja migraattorin Node-testit                                                         |
| npm run test:design    | Ajaa design-token-, saavutettavuus-, komponenttisopimus- ja heading-tyylitestit                                |
| npm run astro          | Nykyinen alias komennolle `npm run verify`; ei välitä Astro CLI -argumentteja                                  |
| npm run test:seo       | Testaa SEO-auditiscriptien omaa käyttäytymistä                                                                 |
| npm run test:security  | Testaa `_headers`- ja `robots.txt`-lähdesopimukset                                                             |
| npm run verify         | Check, lint, format-check, article/design/security-source-testit ja build; ei aja `test:seo`:ta                |
| npm run seo:audit      | Auditoi paikallisen dist-buildin                                                                               |
| npm run seo:urls       | Vertaa paikallista ja tuotannon sitemapia                                                                      |
| npm run seo:live       | Auditoi tuotannon sivut, sitemapin, robotsin ja linkit                                                         |
| npm run seo:gate       | Kokoaa reports-hakemiston löydökset release-päätökseksi                                                        |
| npm run verify:seo     | Build, paikallinen audit, URL-pariteetti, live-audit ja gate                                                   |
| npm run verify:release | Kattavin paikallinen ja tuotantoon ulottuva release-varmistus                                                  |
| npm run preview        | Esikatselee valmiin dist-buildin                                                                               |
| sonar                  | Ajaa manuaalisen SonarCloud-skannauksen ja kirjoittaa raportit reports-hakemistoon                             |

npm run verify ei ota yhteyttä tuotantoon eikä osoita, että deployattu sivusto vastaa paikallista buildiä. npm run seo:live ja URL-pariteettitarkistus tarvitsevat verkkoyhteyden. Myös läpäissyt staattinen build todistaa vain lähteen ja buildin, ei Android-sovelluksen toimintaa, ulkoisen waitlist-API:n backendin toimintaa tai tuotannon kaikkia asetuksia.

### Testi- ja raporttikartta

Testit käyttävät Node.js:n sisäänrakennettua `node:test`-runneria. Repositoryssa ei ole Vitest-, Jest-, Playwright- tai selain-E2E-testikokoonpanoa eikä kattavuusrajaa. Suuri osa testeistä on lähdesopimustestejä: ne lukevat tiedostoja ja varmistavat arkkitehtuuri-, HTML-, CSS- tai konfiguraatioinvariantteja ajamatta sivua oikeassa selaimessa.

| Testitiedosto                           | Päävastuu                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/article-system.test.mjs`       | 8 kieltä, 38 käännösryhmää, 352 artikkeli-URLia, frontmatter-pariteetti, kategoriat, linkit ja reittihelperit                   |
| `scripts/migrate-articles.test.mjs`     | Vanhan artikkelimigraattorin parseri ja regexin turvallinen rakenne                                                             |
| `scripts/design-token-hygiene.test.mjs` | Tokenit, kontrastiparit, waitlistin saavutettavuus, taulukko-ohjaimet, hinnoittelu, fontit, animaatiot ja komponenttisopimukset |
| `scripts/page-heading-style.test.mjs`   | H1/eyebrow/back-link-tyylit, landing-copy, laskurin label-ID-suhde, puikkohaku, pricing ja WPI-rajat                            |
| `scripts/seo-audit.test.mjs`            | Paikallisen build-auditin parserit, metadata, linkit, robots, kuvat, canonical/hreflang ja JSON-LD                              |
| `scripts/live-seo-audit.test.mjs`       | Live-sitemap-, reitti- ja robots-parserit sekä Cloudflare-email-protection-poikkeus                                             |
| `scripts/url-parity-audit.test.mjs`     | Paikallisen ja live-URL-joukon lisäykset, poistot ja raportointi                                                                |
| `scripts/seo-release-gate.test.mjs`     | Release-gaten blocker- ja deploy-pending-luokittelu                                                                             |
| `scripts/security-headers.test.mjs`     | Staattisten security/cache-headerien ja crawler-sallinnan lähdesopimus                                                          |

SEO-ajot kirjoittavat sekä JSON- että Markdown-raportit `reports/`-hakemistoon: `seo-audit`, `live-seo-audit`, `url-parity-audit` ja `seo-release-gate`. Hakemisto on gitignoressa. Raportti on tehtäväkohtainen havainto, ei PROJECT.md:ään kopioitava pysyvä nykytila.

## 6. Astro-, build- ja julkaisuasetukset

astro.config.mjs määrittää:

- site: https://knittoolsapp.com
- output: static
- trailingSlash: always
- build.assets: \_assets
- Shiki-teema: github-light
- @astrojs/sitemap-integraation

### Konfiguraatio- ja ympäristörajat

Sivuston normaali `dev`, `check` ja `build` eivät lue `process.env`- tai `PUBLIC_*`-muuttujia. Repositoryssa ei ole `.env.example`-tiedostoa eikä omaa runtime-konfiguraatiokerrosta. Build-tilaa luetaan kahdessa kohdassa:

- `src/layouts/BaseLayout.astro`: Google Analytics renderöidään vain, kun `import.meta.env.PROD` on tosi.
- `src/i18n/articles.ts`: draft-artikkeli on näkyvä vain, kun `import.meta.env.DEV` on tosi.

Nykyiset palveluosoitteet ja julkiset integraatiotunnisteet ovat lähdekoodissa, eivät ympäristömuuttujissa:

| Arvo tai integraatio             | Omistava lähde                           | Muutosvaikutus                                                 |
| -------------------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| Sivuston origin                  | `src/i18n/config.ts`, `astro.config.mjs` | canonicalit, structured data, sitemap, robots ja auditit       |
| Waitlist-endpoint                | `src/scripts/waitlistSignup.ts`          | selainpyyntö, CSP/form- ja tietosuojatarkistus                 |
| Google Analytics measurement ID  | `src/layouts/BaseLayout.astro`           | vain production-buildin head-scriptit                          |
| Cloudflare Web Analytics -token  | `src/layouts/BaseLayout.astro`           | bodyn lopun beacon                                             |
| Finnvek-yhteys- ja someosoitteet | `src/config/brand.ts`                    | headin `rel=me`, footer-linkit ja structured data              |
| Hinnoittelutaulukko              | `src/config/pricing.ts`                  | näkyvät hinnat, selainvalinta ja landingin SoftwareApplication |

Sonar-wrapper on poikkeus: varsinainen NPM-skannaus vaatii shellissä `SONAR_TOKEN`-muuttujan. `SONAR_HOST_URL` on valinnainen ja saa wrapperissa oletuksen `https://sonarcloud.io`. SonarQube CLI:n keychain-kirjautuminen koskee issueiden lukemista, ei NPM-scannerin autentikointia.

Repositoryssa ei ole GitHub Actions -workflowta, `wrangler.toml`-tiedostoa, `package.json`-deploy-scriptiä tai versionhallittua Cloudflare Pages -projektikonfiguraatiota. Siksi hosting-tilin, Wranglerin kirjautumisen, Pages-projektin asetusten ja tuotannon ympäristön nykytila on varmistettava ulkoisesta järjestelmästä; lähdekoodi todistaa vain alla kuvatun manuaalisen deploy-komennon.

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

### Reittitiedostojen toteutusmatriisi

Julkinen URL-rakenne on yhdenmukainen kielten kesken, mutta Astro-tiedostorakenne ei ole. Nykyiset 63 `src/pages/**/*.astro`-tiedostoa jakautuvat seuraavasti:

| Alue                | Tiedostoja | Toteutus                                                                                   |
| ------------------- | ---------: | ------------------------------------------------------------------------------------------ |
| Juuri               |          3 | `index.astro`, `about.astro`, `404.astro`                                                  |
| EN tools            |          7 | index ja kuusi erillistä sivutiedostoa `src/pages/tools/`-hakemistossa                     |
| EN articles         |          3 | index, kategoria ja artikkeli omissa tiedostoissaan                                        |
| FI tools + articles |         10 | seitsemän tool-tiedostoa ja kolme article-tiedostoa                                        |
| DE tools + articles |         10 | seitsemän tool-tiedostoa ja kolme article-tiedostoa                                        |
| SV tools + articles |         10 | seitsemän tool-tiedostoa ja kolme article-tiedostoa                                        |
| NO tools + articles |          8 | seitsemän tool-tiedostoa; yksi article-catch-all tuottaa indexin, kategoriat ja artikkelit |
| FR tools + articles |          8 | seitsemän tool-tiedostoa; yksi article-catch-all tuottaa indexin, kategoriat ja artikkelit |
| NL tools + articles |          2 | yksi tool-catch-all ja yksi article-catch-all                                              |
| DA tools + articles |          2 | yksi tool-catch-all ja yksi article-catch-all                                              |

NL- ja DA-tool-catch-allit muodostavat `getStaticPaths()`-listan `routes.ts`-arvoista `toolRouteToRestSlug()`-helperillä ja valitsevat yhden seitsemästä kielikohtaisesta sivukomponentista. NO/FR/NL/DA-article-catch-allit käyttävät `buildLocalizedArticleStaticPaths()`-helperiä, jonka `view` on `index`, `category` tai `article`. Reittimuutoksen tarkistus on tehtävä oikeasta toteutusmallista; toisen kielen tiedostopolun kopioiminen voi olla arkkitehtuurisesti väärin.

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

### Nykyinen sisältöinventaario ja kenttäasymmetriat

Sisältöskeema kertoo, mikä on sallittua. Nykyiset 304 tiedostoa muodostavat sitä tiukemman käytännön sopimuksen:

| Nykyinen ominaisuus | Toteutunut määrä tai tila | Tarkistusmerkitys |
| ------------------- | ------------------------- | ---------------- |
| Tiedostomuoto | 304 `.md`-tiedostoa, 0 `.mdx`-tiedostoa | Loader hyväksyy sekä Markdownin että MDX:n, mutta MDX olisi uusi nykyisestä sisällöstä poikkeava toteutusmalli. |
| Yhteiset pakolliset metatiedot | Kaikissa 304 tiedostossa ovat `title`, `description`, `category`, `publishDate`, `categoryOrder` ja `tags`. | `categoryOrder` on skeemassa valinnainen, mutta nykyinen artikkelitesti vaatii sen jokaiselta tiedostolta. |
| Englannin identiteetti | 38 juuritason tiedostoa; kaikissa `browserTitle`, ei eksplisiittistä `lang`- tai `translationKey`-kenttää. | `lang` saa oletuksen `en`, ja englannin tiedostonimi toimii käännösavaimena. |
| Lokalisoitu identiteetti | 266 tiedostoa; kaikissa eksplisiittiset `lang` ja `translationKey`. | Hakemiston kieli, `lang` ja käännösryhmä tarkistetaan yhdessä. |
| Draft-kenttä | DE-, SV-, NO-, FR-, NL- ja DA-tiedostot sisältävät yhteensä 228 eksplisiittistä `draft: false` -arvoa. EN- ja FI-tiedostot käyttävät skeeman `false`-oletusta. | `draft`-kentän puuttuminen ei nykyisessä skeemassa tarkoita draftia. Yhtään `draft: true` -tiedostoa ei ole. |
| Käyttämättömät valinnaiset kentät | `readTime`- ja `updatedDate`-arvoja ei ole nykyisessä sisällössä. | Kentät ovat tuettuja, mutta niiden lisääminen muuttaa nykyistä sisältösopimusta ja vaatii renderöintivaikutuksen tarkistamisen. |
| Body-assetit ja ulkoiset Markdown-linkit | Artikkelibodyissa ei ole Markdown-kuvia eikä `http://`- tai `https://`-Markdown-linkkejä. | Kuva tai ulkoinen lähdelinkki olisi sallittu Markdown-muutos, mutta samalla uusi nykyisestä aineistosta poikkeava sisältö- ja SEO-tapaus. |

`browserTitle` ei ole yleinen lokalisoitujen artikkelien override nykyisessä reittitoteutuksessa. Vain `src/pages/articles/[...slug].astro` välittää sen `ArticleLayout`-layoutille. Lokalisoidut artikkelireitit välittävät `title`, `description`, `category`, päivät ja tagit, mutta eivät `browserTitle`-kenttää. `BaseLayout` käyttää dokumentti-, Open Graph- ja Twitter-otsikkona `browserTitle`-arvoa, kun se on välitetty; näkyvä H1 ja Article JSON-LD:n `headline` tulevat silti `title`-kentästä.

`updatedDate` vaikuttaisi nykyisessä `ArticleLayout`-ketjussa näkyvään `Updated`-metatietoon, Open Graphin `article:modified_time`-arvoon ja Article JSON-LD:n `dateModified`-arvoon. Ilman sitä kaikki kolme käyttävät `publishDate`-fallbackia. `ArticleCard` näyttää aina `publishDate`-päivän, joten päivityspäivän lisääminen ei muuta listakortin päivää.

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

Nykyisen sisällön identiteettisopimus on tarkemmin:

- 38 englanninkielistä juuritason Markdown-tiedostoa eivät sisällä eksplisiittistä `translationKey`-kenttää; niiden avain on tiedoston slug.
- Kaikilla 266 lokalisoidulla artikkelilla on eksplisiittinen `translationKey`, joka viittaa englannin slug-avaimeen.
- `articleTranslations` sisältää 38 avainta ja jokaiselle kahdeksan julkista polkua.
- Kaikilla 38 englanninkielisellä artikkelilla on `browserTitle`; lokalisoidut artikkelit eivät nykyisin käytä kenttää.
- Nykyisessä sisällössä ei ole `updatedDate`-arvoja eikä `draft: true` -artikkeleita. Skeema ja reitit tukevat silti molempia.

Reittitoteutus ei ole kaikilla kielillä samanmuotoinen:

- englannilla, suomella, saksalla ja ruotsilla on erilliset index-, kategoria- ja artikkelisivut
- norja, ranska, hollanti ja tanska käyttävät kielikohtaista catch-all-reittiä sekä buildLocalizedArticleStaticPaths-helperiä

Koodintarkistuksessa ei siis pidä olettaa tiedostorakenteen yhdenmukaisuutta pelkän URL-rakenteen perusteella.

Artikkelijärjestelmän testit varmistavat sisältö- ja URL-identiteetin, käännöskartan sekä migraatiot. Nykyinen URL-kokonaisuus sisältää 352 artikkelijärjestelmän sivua: 304 artikkelia, 40 kategoriaa ja 8 indexiä.

Artikkeli-indexit näyttävät kategoriat `CATEGORY_ORDER`-järjestyksessä. `buildArticleCategorySections()` lajittelee artikkelit `categoryOrder`-kentän mukaan, käyttää puuttuvalle arvolle fallbackia `999`, näyttää kustakin kategoriasta enintään kolme preview-korttia ja laskee loput `remainingCount`-arvoon. Kategoriasivu näyttää saman kategorian koko julkaistun listan samassa järjestyksessä.

`getArticleAlternates()` rajaa hreflangit todellisuudessa näkyvien saman käännösavaimen artikkeleiden kieliin, kun sille annetaan `visibleArticles`. Draftin lisäys ei siis saa perustua pelkkään `articleTranslations`-karttaan. `getArticlePath()` käyttää kartoitettua polkua, jos se löytyy, ja muuten kielikohtaista slug-fallbackia.

### Artikkelin renderöinti ja näkyvä rakenne

Artikkelin detail-reitti hakee content collectionin, suodattaa buildissa näkyvät artikkelit, valitsee kielen, renderöi Markdownin Astron `render()`-helperillä ja välittää tuloksen `ArticleLayout.astro`-layoutille. `ArticleLayout` käyttää `PageLayout`- ja `ClosingCTA`-komponentteja, joten artikkeli saa yhteisen Navbarin, Footerin, waitlistin, head-metadatan ja globaalit tyylit.

Artikkelibody on enintään 720 pikseliä leveä. `ArticleLayout` omistaa scoped-tyylit, joissa slottiin tulevat Markdown-elementit käsitellään `:global()`-selektoreilla. Nykyiset erityisesti tuetut body-elementit ovat kappaleet, H2/H3-otsikot, linkit, strong/em, järjestetyt ja järjestämättömät listat, blockquote, inline-code, code block, taulukko, vaakaviiva ja kuva. Uusi Markdown-rakenne on tarkistettava sekä Astron generoimasta HTML:stä että todellisessa artikkelileveydessä; pelkkä Markdown-lähteen silmäily ei osoita cascadea, vaakavieritystä tai mobiiliasettelua.

`ArticleCard.astro` omistaa index- ja kategorianäkymien kortin. Kortin `title`, `description`, `category`, `publishDate` ja kohdepolku tulevat artikkelidatasta; `headingLevel` on 2 tai 3 kutsuvan sivun heading-hierarkian mukaan. Kategorian väri tulee `CATEGORY_COLORS`-kartasta. Artikkelibodyyn tehty muutos ei muuta korttia, ellei samalla muuteta kortin käyttämää frontmatteria.

### Artikkelityön vaikutus- ja todistusmalli

Artikkelin tekninen eheys, julkaisuidentiteetti, kielellinen laatu ja neulontaväitteen oikeellisuus ovat eri tarkistuksia:

| Muutos tai väite | Kanoninen lähde ja vaikutus | Riittävä vähimmäistodiste |
| ---------------- | --------------------------- | ------------------------- |
| Yhden artikkelin body-copy | Kyseinen `src/content/articles/**/*.md`; ArticleLayout renderöi sisällön. | Lähteen kieli- ja faktatarkistus sekä `astro check`/build renderöitävyyttä varten. |
| Sama tekninen väite usealla kielellä | Kahdeksan saman `translationKey`-ryhmän Markdown-tiedostoa. | Jokainen muutettu kieliversio tarkistetaan oman oppaansa ja saman teknisen merkityksen mukaan; testisuite ei vertaa bodyjen merkityspariteettia. |
| Neulontafakta, mitoitus, tekniikkajärjestys tai tuotekohtainen luku | Artikkelibody; repositoryssa ei ole faktatietokantaa tai lähdeviiterekisteriä. | Täsmällinen ulkoinen lähde tai muu tehtävässä nimetty asiantuntijatodiste. Build, HTTP 200 ja käännöspariteetti eivät todista faktan oikeellisuutta. |
| Frontmatter | `src/content.config.ts` sekä kyseinen Markdown-tiedosto. | `npm run test:articles`, `npm run check` ja build. |
| Slug tai julkinen artikkeli-URL | Tiedostonimi, `articleTranslations`, kielikohtainen reitti, canonical ja hreflang. | `npm run test:articles`; tarkoituksellisessa URL-joukon muutoksessa testin URL-määrä ja SHA-256-identiteetti on tarkistettava ja tarvittaessa päivitettävä; lisäksi sitemap- ja pariteettitarkistus on ajettava. |
| Kategoria tai järjestys | Frontmatter, `CATEGORY_ORDER`, kategoriadatat ja kategoriapolut. | Artikkelitesti tarkistaa sallitun kategorian, positiivisen `categoryOrder`-arvon ja saman kielen kategorian sisäisen järjestysavaimen yksikäsitteisyyden. |
| Sisäinen linkki | Artikkelibody ja `routes.ts`/`articleTranslations` kohteen mukaan. | Buildin jälkeen `npm run seo:audit`; lokalisoitu linkki tarkistetaan nimenomaan saman kielen julkiseen polkuun. |
| Metaotsikko, kuvaus tai päivämäärä | Frontmatter, artikkelireitti, ArticleLayout ja BaseLayout. | Generoidun detail-sivun H1, `<title>`, meta/OG/Twitter-kentät ja Article JSON-LD tarkistetaan erikseen. |
| Julkaistu näkyvyys | `draft`, `isArticleVisibleInCurrentBuild()`, reittien `getStaticPaths()` ja alternates-suodatus. | Production-buildin URL/sitemap ja hreflang; dev-näkyvyys ei todista tuotantojulkaisua. |

Artikkelimuutoksen käytännön tarkistusjärjestys:

1. Tunnista tiedoston kieli, `translationKey`, kategoria, `categoryOrder`, julkinen slug ja samaan ryhmään kuuluvat seitsemän muuta versiota.
2. Rajaa, onko muutos kielellinen, faktuaalinen, SEO-metatietoa muuttava, reittiä muuttava vai useaa näistä. Englanti on artikkelien faktuaalinen lähdekieli ja muiden kieliversioiden merkityspariteetin vertailukohta.
3. Tarkista tekninen väite juuri sitä tukevasta lähteestä. Lähteen pitää tukea muutettavan virkkeen merkitys ja rajaus, ei vain artikkelin yleistä aihetta.
4. Muokkaa vain päätetyt kieliversiot. Jos yhteinen faktavirhe esiintyy koko käännösryhmässä, tarkista kaikki kahdeksan erikseen; mekaaninen korvaus ei todista luonnollista kieltä tai samaa merkitystä.
5. Säilytä kielikohtaiset sisäiset linkit. Nykyinen artikkelitesti estää lokalisoidun Markdownin suoran `](/)`-kotisivulinkin, mutta se ei todista kaikkien body-linkkien semanttista oikeellisuutta eikä neulontasisällön faktuaalisuutta.
6. Aja vaikutusalueen tarkistukset. `npm run test:articles` todistaa identiteetti- ja frontmatter-sopimuksia; `npm run build` todistaa renderöityvyyden; buildin jälkeinen `npm run seo:audit` todistaa paikallisen HTML:n linkki- ja SEO-sopimuksia. Vasta `seo:live` tarkistaa deployatun sivun, eikä sekään todista artikkelin neulontafaktaa tai käännöksen laatua.

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

| Komponentti              | Nykyinen vastuu ja tarkistettava sopimus                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `Hero.astro`             | Ainoa landingin H1, Android-sovelluksen kohderyhmä, Teko-wordmark, launch-signup sekä launch/regular-hinta ja 14 päivän trial |
| `Marquee.astro`          | 18 markkinointitermiä kahteen kertaan saumattomaksi raidaksi; koko alue on `aria-hidden`                                      |
| `YarnPath.astro`         | Koristeellinen `aria-hidden` SVG; `flip` peilaa toisen instanssin                                                             |
| `NineTools.astro`        | Viisi Free- ja kolme Pro-korttia sekä 11 Android-sovelluksen kielichipiä; ei selain-työkalulista                              |
| `FreeToolsCallout.astro` | Kuusi todellista englanninkielistä web-työkalulinkkiä ja linkki `/tools/`-indexiin                                            |
| `TrustSection.astro`     | Hinta-, privacy- ja 11 Android-kielen markkinointiväitteet                                                                    |
| `PullQuote.astro`        | Ruudunlukijalle yhtenäinen lainaus ja visuaalinen GSAP/SplitText-versio; ajonaikainen `.pq-word` tarvitsee `:global()`-tyylin |
| `PricingCards.astro`     | Free/Pro-ominaisuuslistat, aluehinta, 14 päivän trial ja one-time-purchase-kopio                                              |
| `HomeFaq.astro`          | Viisi landingin FAQ-kohtaa ja `data-animate-details`-sopimus                                                                  |
| `ClosingCTA.astro`       | Lokalisoitu yhteinen waitlist-lomake; `hero`/`page` vaikuttaa vain varianttityyliin                                           |

NineTools kuvaa viisi ilmaista ja kolme Pro-ominaisuutta. Tämä on markkinointisisältöä tulevasta sovelluksesta, ei todiste Android-toteutuksesta. FreeToolsCallout linkittää kuuteen oikeasti toteutettuun selainpohjaiseen työkaluun.

Sivuston julkiset sisältökielet ja markkinoidun Android-sovelluksen kielet ovat eri joukot. Website-reittejä on kahdeksalla kielellä. `NineTools`, `PricingCards`, `TrustSection` ja landingin `SoftwareApplication.inLanguage` kuvaavat 11 Android-kieltä: kahdeksan website-kielen lisäksi italia, portugali ja espanja. Tätä ei saa tulkita niin, että `/it/`, `/pt/` tai `/es/`-website-reitit olisivat olemassa.

Landingin JSON-LD on graph, joka sisältää:

- Finnvek Organization -solmun
- KnitTools SoftwareApplication -solmun
- publisher-viittauksen Finnvekiin
- aluekohtaiset tarjoussolmut pricing-konfiguraatiosta

Landingin `SoftwareApplication` kuvaa Androidia ja `LifestyleApplication`-kategoriaa. `Organization.email` on nykyisessä JSON-LD:ssä `mailto:`-URL, koska se tulee `CONTACT_MAILTO`-vakiosta. About-sivu rakentaa erillisen `@graph`-kokonaisuuden, jossa ovat Finnvek Organization, suppea KnitTools SoftwareApplication, AboutPage ja BreadcrumbList.

Offers-solmuissa ei ole availability-arvoa, koska Google Play -tilaus tai lataus ei ole vielä todellinen. Älä lisää PreOrder- tai PreSale-arvoa pelkän waitlistin perusteella.

## 11. Navigaatio, footer ja waitlist

### Navbar

Navbarin mobiilityyli on aktiivinen enintään 640 pikselissä ja desktop-media query alkaa 641 pikselistä. Mobiilivalikko päivittää `data-menu-open`-, `menu-open`-, `aria-expanded`- ja toggle-label-tilat. Se sulkeutuu linkin valinnasta, Escape-näppäimellä, ulkopuolisesta klikkauksesta ja desktop-leveyteen siirryttäessä; Escape palauttaa fokuksen toggleen. Scrolled-tila aktivoituu yli 80 pikselin vierityksessä. Navbar on `position: fixed`, ja globaali `body` varaa sille 80 pikseliä yläpaddingia.

Brändilinkki vie juureen /. Lokalisoitujen sivujen Join-linkki kohdistuu kielen omaan työkaluindexiin ja sen #join-ankkuriin.

### Footer

Footer hakee:

- lokalisoidut työkalulinkit src/i18n/tools.ts-tiedostosta
- artikkelikategoriat CATEGORY_ORDER-, getCategoryLabel- ja routes.category-lähteistä
- `CONTACT_MAILTO`- ja `FINNVEK_URL`-arvot `src/config/brand.ts`-tiedostosta

Nykyinen Footer ei renderöi someikoneita. `SOCIAL_PROFILE_URLS` ei kuulu Footerin nykyiseen toteutukseen. `src/layouts/BaseLayout.astro` käyttää sitä `<link rel="me">` -metadataan, ja `src/layouts/ArticleLayout.astro`, `src/pages/about.astro` sekä `src/pages/index.astro` käyttävät sitä rakenteisen datan `sameAs`-arvoihin. Vanha kuvaus footerissa näkyvistä someikoneista ei vastaa nykyistä komponenttia.

Footerin App-sarake sisältää `Launching soon` -tekstin, englanninkielisen `/about/`-linkin ja ulkoisen Finnvek privacy -linkin. Footer-seal on `/logo.webp`, sen kokoattribuutit ovat 220 x 220 ja se ladataan `loading="lazy"` + `decoding="async"`. Mobiilityyli alkaa 767 pikselin alapuolella. About- ja Contact-linkkejä ei lokalisoida nykyisessä Footerissa.

### Waitlist

src/scripts/waitlistSignup.ts omistaa kaikkien data-waitlist-signup-lomakkeiden submit-logiikan. Se:

- validoi sähköpostin
- lähettää JSON-payloadin, jossa ovat email, source ja website
- käyttää ulkoista API-päätepistettä
- katkaisee pyynnön 10 sekunnin jälkeen
- päivittää loading-, onnistumis- ja virhetilat
- ylläpitää aria-invalid- ja aria-describedby-attribuutteja

Helper alustaa vain `form[data-waitlist-signup]`-elementit ja merkitsee jokaisen lomakkeen `data-waitlist-initialized="true"`-arvolla, joten sama lomake ei saa kahta submit-listeneriä. Se käyttää selaimen `reportValidity()`-tarkistusta, trimmaa emailin, lukee `source`-arvon lomakkeen datasta ja lähettää näkymättömän `website`-honeypotin muuttamattomana. Onnistuminen edellyttää sekä HTTP-tason `response.ok`-arvoa että JSON-vastauksen `success`-arvoa. Muussa tapauksessa näytetään backendin `error` tai lomakekohtainen generic fallback; fetch-poikkeus ja timeout käyttävät network error -tekstiä. Automaattista retryä, paikallista queuea tai offline-tallennusta ei ole.

Kaikkien signup-lomakkeiden honeypot on poistettava tabijärjestyksestä ja accessibility treestä. Onnistumistilan pitää olla `role="status"` + `aria-live="polite"`, virheen `role="alert"`, ja email-inputin `aria-describedby`-arvon on viitattava palaute-elementteihin. Nämä suhteet ovat lähdesopimustestien piirissä.

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

Keskeiset työkalukomponenttien rajapinnat:

| Komponentti                     | Olennaiset propsit ja oletukset                                                                                                                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ToolsIndexPage.astro`          | metadata, canonical, kaikki alternates, kieli, CollectionPage-tekstit, kuusi korttia ja `english`/`localized`-variantti; `lang`-oletus on `en`                                                                                                        |
| `LocalizedToolPage.astro`       | title/description/canonical/alternates, intro, schema-nimi ja -kuvaus, FAQ-lista, värivariantti sekä valinnaiset size/responsive table -ohjaimet; `lang`-oletus on historiallisesti `fi`, joten uuden kutsujan on välitettävä kieli eksplisiittisesti |
| `ToolStructuredData.astro`      | WebApplication + valinnainen FAQPage; oletusvaluutta `USD`, hinta aina `0`, `operatingSystem: Any`                                                                                                                                                    |
| `CastOnCalculator.astro`        | vain `lang`; sama komponentti sisältää kahdeksan kopiojoukkoa ja yhden laskentalogiikan                                                                                                                                                               |
| `YarnEstimator.astro`           | vain `lang`; sama 30 projektin data ja kerroinlogiikka kaikille kielille, lokalisoidut labelit komponentissa                                                                                                                                          |
| `WpiIdentifier.astro`           | vain `lang`; yhteinen WPI-rajadata `toolReferenceData.ts`-lähteestä ja lokalisoitu vastauskopio komponentissa                                                                                                                                         |
| `SizeChartControls.astro`       | ei propseja; tuo `initSizeChartControls()`-alustuksen vain sitä tarvitsevalle sivulle                                                                                                                                                                 |
| `ResponsiveTableControls.astro` | ei propseja; tuo `initResponsiveTableControls()`-alustuksen vain sitä tarvitsevalle sivulle                                                                                                                                                           |

Englannin tool-sivut toistavat oman hero/content/FAQ/waitlist-rakenteensa ja kutsuvat `ToolStructuredData`-komponenttia suoraan. Ne eivät automaattisesti peri `LocalizedToolPage`-markup- tai tyylimuutoksia. Vastaavasti localized-pohjan muutos vaikuttaa 42 sivuun, vaikka NL- ja DA-kutsut kulkevat ensin kielikohtaisten sivukomponenttien kautta.

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

Dataomistus ei kata kaikkia kuutta työkalua samalla tavalla:

| Työkalu        | Kanoninen data tai logiikka                                               | Kielikohtainen osa                                             | Muutosriski                                                                          |
| -------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Cast on        | `CastOnCalculator.astro`                                                  | kahdeksan copy-objektia samassa komponentissa                  | kaava- tai input-muutos vaikuttaa kaikkiin kieliin                                   |
| Yarn estimator | `YarnEstimator.astro`                                                     | copy, lankavahvuus- ja kokolabelit samassa komponentissa       | projektidata, labelit, metri/yard-näyttö ja pyöristys tarkistettava yhdessä          |
| Needle sizes   | `NEEDLE_SIZE_BASE_ROWS` + `getNeedleSizeRows()`                           | otsikot, selitteet, haku ja osa desimaalimuotoilusta sivuissa  | perusriviä ei saa kopioida sivulle                                                   |
| Yarn weights   | `YARN_WEIGHT_BASE_ROWS` ja formatter/helperit                             | kahdeksan rivin nimet, aluekuvaukset ja käyttötekstit sivuissa | WPI-, CYC-, gauge- ja puikkoalueet pysyvät helperissä                                |
| Abbreviations  | kahdeksan erillistä sivukohtaista abbreviation-listaa ja suodatinskriptiä | koko data ja näkyvä logiikka kielikohtainen                    | shared-ohjainta ei ole; yhden sivun korjaus ei päivitä muita                         |
| Size charts    | kahdeksan erillistä `panels`-datajoukkoa                                  | otsikot, arvot ja mittamuotoilu kielikohtaisissa sivuissa      | vain kontrollilogiikka on shared; kokotaulukkodata ei ole `toolReferenceData.ts`:ssä |

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

Tabien roving tabindex -malli tukee Left/Right/Home/End-näppäimiä sekä Space/Enter-aktivointia. Yksikköradiot tukevat lisäksi Up/Down-näppäimiä. Aktiivinen tabi päivittää `aria-selected`- ja `hidden`-tilat; aktiivinen yksikkö päivittää `aria-checked`-tilan ja `show-cm`/`show-inch`-luokan. Mobiilivalitsin luodaan vain taulukolle, jossa on vähintään kaksi kokopalstaa otsikkopalstan lisäksi.

`responsiveTableControls.ts` ei kopioi otsikoita ennalta määritellystä listasta: se lukee `thead th` -tekstit ja kirjoittaa ne solujen `data-mobile-label`-attribuutteihin. Tämä on syy siihen, että lähdeotsikoiden, sarakkeiden ja solumäärien on pysyttävä linjassa.

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

Nykyisessä `global.css`-lähteessä yhä aktiiviset legacy-tokenit ovat `--cream`, `--cream-muted`, `--accent`, `--accent-hover` ja `--bebas-*`. Tokenit `--dark`, `--avocado`, `--mustard` ja `--dusty-rose` eivät ole nykyisessä `src/`-lähteessä. Legacy-nimeä ei pidä tulkita merkiksi vanhasta Geist/Bebas-ulkoasusta, mutta poistettua tokenia ei myöskään saa käyttää uuden UI:n lähtökohtana.

Primary-painikkeet ovat suorakulmaisia, General Sans -fontilla, uppercase-tekstillä ja vahvalla trackingilla.

### CSS-omistus ja cascade

`BaseLayout.astro` tuo `src/styles/global.css`-tiedoston, joka puolestaan tuo `typography.css`-tiedoston. Kaikki sivut saavat siten font-face-määrittelyt, root-tokenit, resetin, 80 pikselin nav-varauksen, globaalit heading/link/focus-säännöt, prose-perustyylin, shared waitlist -tyylit, form-card-variantit ja reduced-motion-säännöt.

Astro-komponentin `<style>` on scoped, mutta slottiin tuotu markup ja JavaScriptillä luodut elementit eivät saa omistavan komponentin scope-attribuuttia. `LocalizedToolPage.astro` käyttää siksi tarkoituksella `:global()`-selektoreita tool-slotin taulukoille, lyhennelistalle, hakukentille ja kokotaulukon kontrolleille. Sama koskee `PullQuote.astro`-komponentin GSAP SplitTextin luomia `.pq-word`-elementtejä sekä laskureiden JavaScriptillä luomia tulos- ja virhe-elementtejä.

Globaali `a { color: var(--accent) }` voi yliajaa komponenttilinkin värin, ellei komponenttiselektori ole riittävän tarkka. Globaali `h1/h2` käyttää Lalezaria, mutta komponentit voivat vaihtaa roolin: landingin H1-wordmark käyttää Tekoa ja labelit/metadata General Sansia. UI-tarkistuksessa on luettava sekä globaali että komponenttikohtainen sääntö ennen cascade-päätelmää.

### UI-muutoksen vaikutusala

Sama visuaalinen elementti voi olla yhden sivun scoped-tyyli, kaikkien lokalisoitujen työkalujen jaettu pinta tai koko sivuston globaali sopimus. Nykyinen vaikutusmatriisi:

| Omistava lähde | Nykyinen renderöintiala | Tarkistettava sivuvaikutus |
| -------------- | ----------------------- | -------------------------- |
| `BaseLayout.astro` + `global.css` | Kaikki 411 buildattua HTML-sivua joko suoraan tai `PageLayout`-ketjun kautta. | Head, fonttipreloadit, skip-linkki, analytiikka, waitlist-alustus, aluehinta, globaalit tokenit ja reset/cascade. |
| `PageLayout.astro` | Kaikki tavalliset sivut, myös landing, sekä 304 artikkelidetailia ArticleLayout-ketjun kautta. | Navbar, main landmark ja Footer voivat muuttua usealla reittityypillä yhtä aikaa. |
| `ArticleLayout.astro` | 304 artikkelin detail-sivua. | Näkyvä metadata, prose-tyylit, Article JSON-LD, OG-artikkelikentät ja ClosingCTA kaikilla kahdeksalla kielellä. |
| `ArticleCard.astro` | Kahdeksan artikkeli-indexiä ja 40 kategoriasivua. | Heading-taso, kategoria, väriteema, päivä, linkki ja pitkä lokalisoitu copy. |
| `ToolsIndexPage.astro` | Kahdeksan tools-indexiä. | 12-palstainen desktop-grid, english/localized-variantit, CollectionPage JSON-LD ja kuusi linkkiä per kieli. |
| `LocalizedToolPage.astro` | 42 lokalisoitua tool-detail-sivua. | Hero, slot-cascade, FAQ, WebApplication/FAQ JSON-LD, ClosingCTA ja valinnaiset taulukko-ohjaimet; kuusi EN-sivua eivät peri muutosta. |
| `CastOnCalculator.astro` | Kahdeksan cast-on-sivua. | Yksi logiikka ja kahdeksan copy-objektia; ID-, label-, parseri-, yksikkö- ja pyöristysmuutos on monikielinen. |
| `YarnEstimator.astro` | Kahdeksan yarn-estimator-sivua. | 30 projektia, yhdeksän kerrointa, metri/yard-rajat, lokalisoidut labelit ja client-renderöidyt tulokset. |
| `WpiIdentifier.astro` | Kahdeksan yarn-weight-sivua. | Jaettu 1-40-syöte, päällekkäisten WPI-alueiden tulkinta ja lokalisoitu tulosteksti. |
| `sizeChartControls.ts` | Kahdeksan size-chart-sivua. | Tab/radio-näppäimistö, ARIA, unit classit ja JS:llä luotu mobiilivalitsin. |
| `responsiveTableControls.ts` | Kahdeksan needle-size-sivua. | Otsikoista johdetut mobiililabelit ja taulukon valmiustila. |
| `src/components/dutch-tools/` tai `danish-tools/` | Seitsemän komponenttia per kieli yhden tool-catch-all-reitin takana. | Reittitiedosto valitsee komponentin data-avaimella; komponenttimuutos ei automaattisesti vaikuta muihin kieliin. |
| `src/lib/categories.ts` | Artikkelien detail-, index-, kategoria-, kortti- ja footer-pinnat. | Label, kuvaus, järjestys, väriluokka, structured data ja reitit on tarkistettava yhdessä. |

Vaikutusmäärä kertoo, missä muutos voi näkyä, ei sitä, että nykyiset source-testit olisivat renderöineet jokaisen sivun oikeassa selaimessa. Korkean vaikutusalan UI-muutos tarvitsee edustavat englannin ja pitkän lokalisoidun copyn sivut, breakpointtien molemmat puolet, keyboard/focus-tilat sekä tarvittaessa JS pois/reduced motion -tilan.

### Responsiiviset rajat

Koodikannassa ei ole yhtä keskitettyä breakpoint-tokenia. Nykyiset eksplisiittiset `max-width`-rajat ovat 1024, 1023, 980, 900, 768, 767, 640, 600 ja 430 pikseliä. Olennaiset omistajuudet:

|    Raja | Pääkäyttö                                                                                    |
| ------: | -------------------------------------------------------------------------------------------- |
| 1024 px | tool- ja artikkelikorttien siirtyminen kahteen sarakkeeseen sekä catch-all-artikkelin gridit |
| 1023 px | `TrustSection.astro`-komponentin kolmen palstan tiivistyminen                                |
|  980 px | 404-sivun kahden palstan muuttuminen yhdeksi                                                 |
|  900 px | landing Heron kahden palstan muuttuminen mobiilirakenteeksi                                  |
|  768 px | yleisin tool-, article- ja content-layoutien mobiiliraja                                     |
|  767 px | Footer, About, PricingCards, TrustSection ja osa landing-komponenteista                      |
|  640 px | Navbar, ClosingCTA, YarnPath ja useat pienet landing-muutokset; desktop-nav alkaa 641 px:stä |
|  600 px | JS-luotujen mobile size pickerien ja table-card-näkymän CSS-aktivointi                       |
|  430 px | Navbarin tihein puhelinlayout                                                                |

Pelkkä 768 pikselin tarkistus ei riitä laajaan UI-muutokseen. Eri kohdissa käytetään sekä 768/767- että 641/640-paria, joten yhden pikselin rajakäyttäytyminen kuuluu realistisiin tarkistustapauksiin.

### Assetit ja kuvat

`public/`-tiedostot kopioidaan buildiin muuttamattomina ja niihin viitataan juuresta alkavilla URL:eilla. Nykyinen renderöity komponenttipuu käyttää Footerissa `/logo.webp`-kuvaa; head, Article JSON-LD ja social metadata käyttävät `/images/og-image.png`-kuvaa; webmanifest käyttää 192- ja 512-pikselisiä Android Chrome -ikoneita. `src/assets/images/` sisältää useita lähdekuvia, mutta nykyiset Astro-komponentit eivät tuo niitä. Pelkkä assetin olemassaolo ei todista, että kuva näkyy sivustolla.

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

Reveal-alustus tekee ilman JavaScriptiä näkyvästä sisällöstä progressiivisesti animoidun vain, kun `<html>` saa `reveal-animations`-luokan. `data-reveal="clip"` käyttää clip-path-paljastusta, `scale` korttipaljastusta ja muut arvot fade/translate-paljastusta. `data-reveal-group` tekee 0,08 sekunnin staggerin. FAQ-details-animaatiot ohitetaan kokonaan reduced motion -tilassa, jolloin selaimen natiivi `<details>`-käyttäytyminen säilyy.

Marquee ja YarnPath ovat tarkoituksellisia poikkeuksia: niiden jatkuva animaatio säilyy nykyisen omistajapäätöksen mukaan myös reduced motion -tilassa. Jos tätä muutetaan, tarkista sekä komponenttityylit että motion-regressiotestit. Älä päättele yleisestä reduced-motion-säännöstä, että jokainen animaatio on pysähtynyt.

Marqueen CSS-peruskierros ja GSAP-looppi ovat molemmat 60 sekuntia yhdelle sisältökopiolle; arvot elävät eri tiedostoissa ja niiden pitää pysyä samoina. GSAP ottaa transformin haltuun `is-scroll-driven`-luokalla, vaihtaa suunnan scrollisuunnan mukaan, rajoittaa nopeuskertoimen välille 1–4 ja palauttaa nopeuden vähitellen perustasolle. Hover voi pysäyttää nauhan vain laitteella, jonka media query on `(hover: hover)`.

## 15. Hinnoittelu

src/config/pricing.ts on aluekohtaisen launch- ja regular-hinnan lähde.

- 16 nimettyä hintatasoa sekä default
- SSR-oletus on US
- tuntematon mutta saatu kaksikirjaiminen maakoodi käyttää default-tasoa
- trialDays: 14
- launchMonthLabel: Fall 2026

Selain yrittää tunnistaa maan Cloudflaren `/cdn-cgi/trace`-endpointista 1,2 sekunnin timeoutilla. Tulos tallennetaan sessionStorage-avaimeen `knittools-pricing-country`; cache sisältää maakoodin, ei hintatier-avainta. Navigator-localeen perustuvaa fallbackia ei ole. Jos fetch epäonnistuu, palauttaa tyhjän arvon tai sessionStorage ei ole käytettävissä, selain ei korvaa server-renderöityä US-hintaa. Jos saatu maakoodi ei ole `COUNTRY_TO_TIER`-kartassa, selain valitsee `default`-tason ja näyttää paikallisen valuutan huomautuksen.

`RegionalPrice.astro` renderöi SSR-hinnan lisäksi `data-*`-attribuutin jokaiselle tierille. `BaseLayout` vaihtaa kaikkien `[data-regional-price]`-elementtien tekstin samalla kertaa ja näyttää `[data-regional-pricing-note]`-huomautuksen vain `default`-tasolla. Hinnoittelumuutoksen on säilytettävä nämä attribuutit; pelkän näkyvän tekstin muutos ei päivitä selainvalintaa.

Structured data -tarjoukset generoidaan nimetyistä hintatasoista, eivät default-tasosta. Pricing-muutoksessa tarkista aina yhdessä:

- näkyvä hinta
- launch- ja regular-hinta
- valuutta
- region-lista
- structured data
- Cloudflare trace -fallback
- sessionStorage-käyttäytyminen

`getStructuredOffers()` irrottaa hinnasta ensimmäisen numero-osan, normalisoi mahdollisen pilkun pisteeksi, liittää tierin ISO-valuutan ja johtaa `eligibleRegion`-listan `COUNTRY_TO_TIER`-kartasta. EU-tarjouksen aluejoukko ei synny automaattisesti euroalueesta tai EU-jäsenyydestä, vaan vain karttaan eksplisiittisesti luetelluista maista. Maa- tai valuuttamuutos kuuluu siksi sekä näkyvän hinnan että structured data -testaukseen.

Fall 2026 on nyt nykyinen lähdekoodin launch-teksti ja hyväksytty liiketoimintapäätös.

## 16. SEO, analytiikka, tietoturva ja Sonar

### SEO

Paikallinen SEO-audit tarkistaa muun muassa canonicalit, hreflangit, metadataa, sisäisiä linkkejä, structured dataa, sitemapia ja rikkoutuneita polkuja. URL-pariteettiaudit vertaa paikallista ja tuotannon sitemapia.

`BaseLayout.astro` omistaa kaikille sivuille yhteisen SEO-headin: document title, description, canonical, valinnaiset kahdeksan kielen alternates-linkit, englannin alternateen perustuvan `x-default`-linkin, Open Graph -kentät, Twitter card -kentät, neljä `rel="me"`-linkkiä, faviconit ja webmanifestin. Norjan `no`-avain muunnetaan näissä kohdissa `nb`/`nb_NO`-esitykseen. Artikkelipropit lisäävät Open Graphin `article:*`-kentät; tavallinen sivu ei saa niitä.

Structured data -omistus:

| Sivutyyppi  | Omistava lähde             | Nykyinen skeema                                                                                                |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Landing     | `src/pages/index.astro`    | `@graph`: Finnvek `Organization` + Android `SoftwareApplication` ja aluekohtaiset `Offer`-solmut               |
| About       | `src/pages/about.astro`    | `@graph`: `Organization`, `SoftwareApplication`, `AboutPage` ja `BreadcrumbList`                               |
| Tools index | `ToolsIndexPage.astro`     | `CollectionPage`, jonka `ItemList` sisältää kuusi työkalua järjestysnumeroineen                                |
| Tool page   | `ToolStructuredData.astro` | ilmainen `WebApplication` ja FAQ-listan ollessa ei-tyhjä erillinen `FAQPage`                                   |
| Article     | `ArticleLayout.astro`      | `Article`, jonka päivät, organisaatiotekijät, kategoria, tagit, kuva, kieli ja canonical tulevat sivun datasta |

Index- ja kategoriasivuilla ei ole erillistä article-listan JSON-LD:tä `ToolsIndexPage`-tyyppisen rakenteen tapaan. Structured data -tarkistuksessa ei pidä olettaa skeemaa sivutyypille, joka ei nykyisin renderöi sitä.

Live-audit käyttää oletuksena kahdeksan rinnakkaista fetch-pyyntöä ja 20 sekunnin timeoutia. Status 0 tarkoittaa auditin fetch-epäonnistumista, ei palvelimen HTTP 0 -vastausta. Satunnaisen yksittäisen status 0 -löydöksen yhteydessä tarkista URL suoraan ja aja audit tarvittaessa pienemmällä --concurrency-arvolla ennen kuin päätät sivun puuttuvan.

Release gate estää julkaisun paikallisista virheistä ja varoituksista, live-virheistä, edelleen rikkoutuneista paikallisista löydöksistä sekä sitemapin odottamattomista lisäyksistä tai poistoista.

Auditit ovat eri todisteita, eivät keskenään korvaavia:

- `seo:audit` lukee juuri rakennetun `dist/`-hakemiston eikä todista tuotantoa.
- `seo:urls` todistaa paikallisen ja live-sitemapin URL-joukkojen eron, ei sivujen sisältöpariteettia.
- `seo:live` hakee tuotantosivut ja voi epäonnistua verkkotasolla, vaikka sivu olisi olemassa.
- `seo:gate` lukee valmiit raporttitiedostot; vanhentuneet tai eri commitista peräisin olevat raportit eivät todista nykyistä releasea.
- `verify:seo` ajaa buildin, paikallisen auditin, URL-pariteetin, live-auditin ja gaten samassa komentoketjussa.
- `verify:release` lisää tähän check-, lint-, format-, source-testit sekä SEO-testit, mutta se ei deployaa.

### Analytiikka ja yksityisyys

- Google Analytics ladataan vain tuotantobuildissa.
- Cloudflare Web Analytics -beacon renderöidään bodyn lopussa myös ei-production-buildin HTML:ään; toteutuksessa ei ole sille ympäristöehtoa.
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

`public/.well-known/security.txt` ja `public/security.txt` ovat nykyisin sisällöltään identtiset. Molemmat sisältävät yhteystiedon ja vanhenemispäivän 30.4.2027, mutta `Canonical` osoittaa `/.well-known/security.txt`-polkuun. Muuta ne yhdessä. Nykyinen `scripts/security-headers.test.mjs` ei lue kumpaakaan security.txt-tiedostoa, joten testin läpäisy ei todista niiden synkronointia tai vanhenemispäivää.

`public/robots.txt` sallii kaikki crawlerit ja osoittaa tuotannon sitemap-indexiin. `public/_redirects` ohjaa vain `/sitemap.xml` → `/sitemap-index.xml` koodilla 301. Nämä ovat staattisia deploy-lähteitä; Cloudflaren dashboard-säännöt, bot-asetukset tai reunapalvelun mahdolliset lisäheaderit eivät näy repositoriossa.

### SonarCloud

sonar-wrapper käyttää @sonar/scan-versiota 4.3.5. Skannaus tarvitsee SONAR_TOKEN-ympäristömuuttujan ja kirjoittaa raportit reports-hakemistoon. SonarCloud-projektin Automatic Analysis pitää olla pois käytöstä manuaalisen skannauksen aikana.

`sonar-project.properties` määrittää projektiksi `Insaner1980_KnitTools-website`, organisaatioksi `insaner1980` ja lähteiksi `src`, `scripts`, `astro.config.mjs` ja `eslint.config.mjs`. Artikkelien Markdown-sisältö on yleisen analyysin ja duplikaatioanalyysin ulkopuolella. `src/i18n/articles.ts` ja `src/i18n/ui.ts` on rajattu vain CPD-duplikaatioanalyysin ulkopuolelle. Coveragea ei kerätä sivuista, komponenteista, layouteista, sisällöstä tai scripteistä; Sonar-coverage ei siksi ole tämän repositoryn toiminnallisen testikattavuuden mittari.

reports, .sonar ja .scannerwork ovat gitignoressa eikä niitä saa commitoida.

### Todistusrajat

Pidä seuraavat väitteet erillään:

| Todiste                               | Mitä se voi osoittaa                                                | Mitä se ei yksin osoita                                                  |
| ------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Lähdekoodin lukeminen                 | omistajuus, konfiguraatio, kontrollivirta ja staattinen invarianssi | selaimen todellinen layout, ulkoinen palvelu tai deployattu vastaus      |
| Node source-test                      | testiin kirjattu tiedosto- tai helper-sopimus                       | visuaalinen lopputulos tai oikean selaimen tapahtumakäyttäytyminen       |
| `astro check`/ESLint/Prettier         | tyyppi-, diagnostiikka-, lint- ja format-sopimus                    | onnistunut staattinen generointi tai runtime                             |
| `npm run build`                       | nykyinen lähde generoi staattisen buildin                           | tuotanto, waitlist-backend, analytiikan vastaanotto tai Android-sovellus |
| paikallinen SEO-audit                 | `dist/`-HTML:n ja URL-joukon SEO-sopimus                            | live-CDN:n nykytila                                                      |
| live-audit tai suora HTTP-vastaus     | tuotannon havaittu verkko- ja HTML-tila kyseisellä hetkellä         | saman commitin identiteetti ilman erillistä Git/deploy-todistetta        |
| selaintesti tai visuaalinen tarkistus | renderöinti ja vuorovaikutus testatussa viewportissa/selaimessa     | kaikki kielet, breakpointit ja apuvälineet ilman erillistä kattavuutta   |

## 17. Koodintarkistuksen kysymysrunko

Käytä tarkistuksessa vain niitä rivejä, jotka liittyvät muutoksen todelliseen vaikutusalueeseen.

| Muutosalue          | Tarkistuskysymykset                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Reitit              | Vastaavatko `routes.ts`, Astro-tiedostomalli, nav/footer/card-linkit, canonical, hreflang, sitemap ja redirectit toisiaan? Säilyykö trailing slash -sopimus?             |
| Artikkelit          | Onko `translationKey` oikea, draft-tila tarkoituksellinen, slug kielikohtainen, category/order metadata validi ja hreflang vain julkaistuun sisältöön?                   |
| Lokalisaatio        | Tuleeko UI-teksti `ui.ts`:stä tai oikeasta kielikomponentista, onko HTML-kieli oikein, ja noudattavatko termit kielikohtaista guidea sekä metri-/desimaalipilkkusääntöä? |
| Laskurit            | Ovatko kaava, yksiköt, desimaalipilkku, inputin step/min/max, pyöristys, tyhjä/virhetila ja usean instanssin uniikit ID:t oikein?                                        |
| Referenssidata      | Onko jaettu numerodata `toolReferenceData.ts`-lähteessä eikä kopioituna kielisivuille, ja säilyvätkö formatterien näkyvät kielierot?                                     |
| Taulukot            | Säilyvätkö semanttinen desktop-taulukko, mobiilimuunnos, sarakeotsikoista johdetut labelit, näppäimistö ja ARIA-tilat?                                                   |
| Astro/DOM           | Renderöityykö sisältö serverillä oikein, alustetaanko client-scripti idempotentisti ja tarvitseeko JS:n luoma DOM `:global()`-tyylin?                                    |
| UI                  | Noudattaako muutos editorial-palettea, fonttirooleja, teräviä painikkeita, ei-puhdasta mustaa/valkoista sekä koristekehysten ja värillisten sivuraitojen kieltoa?        |
| Responsiivisuus     | Toimiiko muutos todellisissa omistavissa breakpointeissa, yhden pikselin rajoilla ja sisällön kasvaessa kaikilla olennaisilla kielillä?                                  |
| Saavutettavuus      | Säilyvätkö heading-hierarkia, label-suhteet, fokusjärjestys ja -näkyvyys, skip-linkki, keyboard pattern, live regionit sekä semanttinen fallback?                        |
| Motion              | Toimiiko reduced motion, säilyykö ilman JavaScriptiä näkyvä perussisältö ja onko Marquee/YarnPath-poikkeus huomioitu tarkoituksella?                                     |
| Hinnoittelu         | Täsmäävätkö SSR-hinta, data-attribuutit, maakartta, valuutat, structured data, cache ja fetch-fallback?                                                                  |
| Waitlist            | Vastaavatko endpoint, payload, timeout, success-ehto, backend/network-virheet, honeypot ja ARIA-palaute samaa lomakesopimusta?                                           |
| Analytiikka         | Onko production/dev-käyttäytyminen erotettu, ovatko kolmannen osapuolen pyynnöt tarkoituksellisia ja vastaavatko yksityisyysväitteet juuri verkkosivustoa?               |
| Structured data     | Vastaako JSON-LD näkyvää, nykyistä ja todellista sisältöä ilman tulevan sovelluksen keksittyä saatavuutta, hintaa tai reittiä?                                           |
| SEO                 | Pysyvätkö title/description/canonical/alternates/OG/Twitter/sitemap yhtenäisinä, ja onko audit-tulos oikean buildin tai live-tilan todiste?                              |
| Assetit/performance | Onko assetti todella renderöity, sopivassa formaatissa ja koossa, välttääkö muutos turhan preloadin/scriptin ja säilyykö layout ilman tarpeetonta CLS:ää?                |
| Tietoturva          | Onko löydös osoitettu oikeasta trust boundarysta, onko ulkoinen syöte validoitu, ja onko tuotantoväite varmennettu live-vastauksesta eikä vain `_headers`-lähteestä?     |
| Testit/build        | Kattaako tarkistus muuttuneen logiikan realistisen failure pathin, erotellaanko source-testi browser-runtime-todisteesta ja onko ohitettu tarkistus raportoitu?          |
| Julkaisu            | Onko työpuu ja commit-scope tarkistettu, upstream-divergenssi nolla, sama commit pushattu ja rakennettu sekä vasta sitten Direct Uploadattu?                             |

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
- Vaikuttaako muutos desktopin lisäksi 1024/1023, 980, 900, 768/767, 641/640, 600 tai 430 pikselin breakpointiin?
- Säilyykö näppäimistökäyttö, focus, ARIA ja reduced motion?
- Onko näkyvä teksti ja mittamuoto lokalisoitu, etenkin desimaalipilkku FR/NL/DA-näkymissä?
- Onko komponentin ympärillä slottia, globaalisti perittyä typografiaa tai toista instanssia, joka muuttaa CSS- tai ID-oletusta?
- Säilyykö sisältö pitkällä saksan/hollannin kopioilla, 200 prosentin tekstisuurennoksella sekä zoomissa ilman päällekkäisyyttä tai pakotettua vaakavieritystä?
- Onko kuva tai koriste semanttisesti sisältöä vai `aria-hidden`, ja vastaavatko alt-teksti, kokoattribuutit, latausstrategia sekä assetin todellinen käyttö toisiaan?

UI-muutoksen vaikutusketju on yleensä: sivutiedosto tai data → omistava komponentti/layout → globaali ja scoped CSS → mahdollinen browser-controller → source-testit → buildattu HTML → selain eri viewportissa. Tarkistuksen tulee seurata vain ketjun muutokseen kuuluvat lenkit, mutta yhtäkään todellista omistajaa ei saa ohittaa.

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
- ulkoinen endpoint, julkinen integraatiotunniste, build-ympäristön ehto tai Sonar-rajaus
- testikokoonpano, scriptien vastuut, raporttiformaatti tai julkaisuprosessi

Älä päivitä toteutuskuvausta suunnitelman perusteella ennen kuin muutos on nykyisessä lähdekoodissa. Älä lisää dokumenttiin hetkellistä työpuutilannekuvaa tai muuttuneiden tiedostojen luetteloa; nykyinen Git-tila tarkistetaan aina suoraan repositoriosta.
