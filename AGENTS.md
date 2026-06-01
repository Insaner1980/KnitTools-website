# KnitTools Website — AGENTS.md

## Project

Astro 6 -staattinen sivusto. Neulontasovelluksen (Android) landing page + kuusi ilmaista selainpohjaista työkalua (2 laskuria + 4 referenssitaulukkoa) + artikkeliosio.

## Commands

```bash
npm run dev      # Dev-serveri (localhost:4321)
npm run build    # Staattinen build → dist/
npm run verify   # Astro check + ESLint + Prettier check + build
npm run test:seo # SEO-auditskriptien Node-testit
npm run seo:audit # Paikallinen dist/ SEO- ja linkkiaudit
npm run seo:urls # Paikallisen dist/-sitemapin vertailu tuotannon sitemapiin
npm run seo:live # Tuotannon live SEO-, sitemap-, robots- ja linkkiaudit
npm run seo:gate # Lukee reports/ SEO-raportit ja estää release-blockerit
npm run verify:seo # Build + local SEO + URL-pariteetti + live SEO + release gate
npm run verify:release # check + lint + format:check + test:seo + verify:seo
npm run preview  # Preview buildattu versio
sonar             # SonarCloud-skannaus, raportit reports/sonar*.*
```

## Quality Tools

- `sonar` ajaa projektin SonarCloud-skannauksen NPM-pohjaisella `@sonar/scan@4.3.5`-scannerilla ja kirjoittaa lokin `reports/sonar.txt`; `sonar auth login/status/...` ohjautuu edelleen SonarQube CLI:lle.
- SonarCloud-skannaus tarvitsee `SONAR_TOKEN`-ympäristömuuttujan. SonarQube CLI:n keychain-kirjautumista käytetään issueiden lukemiseen `reports/sonar-issues.json`-raporttiin.
- Manuaalinen `sonar`-skannaus toimii vain, kun SonarCloud-projektin Automatic Analysis on poistettu käytöstä: Project > Administration > Analysis Method > poista Enabled for this project.
- Sonar-asetusten lähde on `sonar-project.properties`: project key `Insaner1980_KnitTools-website`, organization `insaner1980`, lähdekoodina `src`, `scripts` ja projektin JS-konfiguraatiot.
- `reports/`, `.sonar/` ja `.scannerwork/` ovat gitignoressa, älä commitoi Sonarin paikallisia raportteja tai cachea.
- SEO-release-gate-skriptit ovat `scripts/`-kansiossa: `seo-audit.mjs` auditoi paikallisen `dist/`-buildin, `live-seo-audit.mjs` auditoi `https://knittoolsapp.com`-tuotannon, `url-parity-audit.mjs` vertaa paikallista sitemapia live-sitemapiin ja `seo-release-gate.mjs` kokoaa release-päätöksen. Raportit kirjoitetaan `reports/`-kansioon, jota ei commitoida.
- Direct Upload -tuotantodeploy tehdään paikallisesta buildistä komennolla `npx wrangler pages deploy ./dist --project-name knittoolsapp --branch main`. Ennen deployta commitoi ja push GitHubiin, varmista `git rev-list --left-right --count HEAD...@{u}` = `0 0`, ja deployaa vasta sitten sama paikallinen commit.

## Design System

### Colors

- Nykyinen editorial-paletti: `--paper` (#F4EAD9), `--paper-2` (#EADFC9), `--ink` (#2A1E17), `--ink-soft` (#4A382C), `--terracotta` (#A05038), `--sage` (#5B8072), `--walnut` (#6B4332), `--amber` (#C2703E), `--wheat` (#C4A661).
- Stripe-derived card palette on yhä käytössä korttien väreissä: `--stripe-terracotta`, `--stripe-rust`, `--stripe-sand`, `--stripe-brown`, `--stripe-teal`. Korttitekstin AA-kontrastia varten `--stripe-rust-accessible` ja `--stripe-teal-accessible` ovat korttitaustojen käytettävät variantit silloin kun alkuperäinen sävy ei riitä.
- Legacy-tokenit `--dark`, `--cream`, `--accent`, `--avocado`, `--mustard`, `--dusty-rose` ja `--bebas-*` ovat vielä olemassa vanhempien shared-tyylien takia. Älä tulkitse niitä merkiksi vanhasta Geist/Bebas-designista.
- Ei koskaan #000000 tai #FFFFFF.

### Fonts (self-hosted woff2, `/public/fonts/`)

| Fontti | Rooli | Muuttuja |
|--------|-------|----------|
| Lalezar | Display-otsikot, editorial H1/H2 | `--font-display`, `--serif` |
| General Sans 400/500/600 | Body, nav, labels, napit, metadata | `--font-body`, `--body-ed`, `--mono` |
| Teko 400/500 subset | KnitTools-wordmark/logo | `--font-logo` |

`BaseLayout` preloadittaa Lalezar, General Sans 400/500 ja Teko 500 -fontit.

### Typography

- Landingin ja tools-indexien isot otsikot käyttävät Lalezar-pohjaista `--serif`/`--font-display`-linjaa.
- Body, napit, labelit ja metadata käyttävät General Sans -linjaa (`--font-body`, `--body-ed`, `--mono`).
- `<em>` ja `.accent` käyttävät terracotta/burnt orange -korostusta.
- `--bebas-*`-nimiset tokenit ovat legacy-nimiä ja toimivat enää jaettuina koko-/tracking-tokenina.

### Buttons

- Primary (`.btn-primary`): suorakulmio (border-radius: 0), General Sans, uppercase, vahva tracking.
- ClosingCTA käyttää tummaa solid-nappia ja hoverissa terracotta-taustaa.
- Calculate/Estimate-napit ovat sivukohtaisesti scoped-tyyleissä.

### Removed visual systems

- `StripeRibbon.astro`, `showStripe`, `PhoneMockup.astro`, Three.js hero phone ja vanhat diagonaaliset feature-osiot eivät ole nykyisessä `src/components/`-rakenteessa.
- Stripe-nimiset värit ovat yhä korttipaletin tokeneita, eivät renderöity oikean reunan stripe-nauha.

## Routes

Englanti on oletuskieli ilman kieliprefiksiä. Älä lisää julkisia `/en/`-reittejä, koska nykyiset englanninkieliset URLit ovat indeksoituja ja niiden pitää pysyä ennallaan.

| Polku | Sivu |
|-------|------|
| `/` | Landing page |
| `/about/` | About KnitTools / Finnvek trust page |
| `/tools/` | Tools listing page (bento grid) |
| `/tools/cast-on-calculator` | Cast On Calculator |
| `/tools/yarn-estimator` | Yarn Estimator |
| `/tools/needle-size-chart` | Needle Size Chart |
| `/tools/yarn-weight-chart` | Yarn Weight Chart |
| `/tools/knitting-abbreviations` | Knitting Abbreviations |
| `/tools/knitting-size-charts` | Knitting Size Charts |
| `/articles` | Artikkelilista |
| `/articles/[slug]` | Artikkeli |
| `/fi/tyokalut/` | Suomenkielinen tools listing |
| `/fi/tyokalut/silmukkalaskuri/` | Silmukkalaskuri |
| `/fi/tyokalut/lankamuunnin/` | Lankamuunnin |
| `/fi/tyokalut/puikkokoot/` | Puikkokoot |
| `/fi/tyokalut/lankavahvuudet/` | Lankavahvuudet |
| `/fi/tyokalut/neulelyhenteet/` | Neulelyhenteet |
| `/fi/tyokalut/neulekokotaulukot/` | Neulekokotaulukot |
| `/fi/artikkelit/` | Suomenkielinen artikkelilista |
| `/fi/artikkelit/kategoria/[slug]/` | Suomenkielinen kategoria |
| `/fi/artikkelit/[slug]/` | Suomenkielinen artikkeli |
| `/sv/verktyg/` | Ruotsinkielinen tools listing |
| `/sv/verktyg/upplaggningskalkylator/` | Uppläggningskalkylator |
| `/sv/verktyg/garnatgangskalkylator/` | Garnåtgångskalkylator |
| `/sv/verktyg/stickstorlekar/` | Stickstorlekar |
| `/sv/verktyg/garntjocklekar/` | Garntjocklekar |
| `/sv/verktyg/stickforkortningar/` | Stickförkortningar |
| `/sv/verktyg/storlekstabeller-stickning/` | Storlekstabeller för stickning |
| `/sv/artiklar/` | Ruotsinkielinen artikkelilista |
| `/sv/artiklar/kategori/[slug]/` | Ruotsinkielinen kategoria |
| `/sv/artiklar/[slug]/` | Ruotsinkielinen artikkelidraft (dev-only ennen hyväksyntää) |
| `/no/verktoy/` | Norjankielinen tools listing |
| `/no/verktoy/oppleggskalkulator/` | Oppleggskalkulator |
| `/no/verktoy/garnberegner/` | Garnberegner |
| `/no/verktoy/pinnestorrelser/` | Pinnestørrelser |
| `/no/verktoy/garntykkelser/` | Garntykkelser |
| `/no/verktoy/strikkeforkortelser/` | Strikkeforkortelser |
| `/no/verktoy/storrelsestabeller-strikking/` | Størrelsestabeller for strikking |
| `/no/artikler/` | Norjankielinen artikkelilista (dev-only draft-tarkistus ennen hyväksyntää) |
| `/no/artikler/kategori/[slug]/` | Norjankielinen kategoria (dev-only draft-tarkistus ennen hyväksyntää) |
| `/no/artikler/[slug]/` | Norjankielinen artikkelidraft (dev-only ennen hyväksyntää) |
| `/fr/outils/` | Ranskankielinen tools listing |
| `/fr/outils/calculateur-mailles-a-monter/` | Calculateur de mailles à monter |
| `/fr/outils/estimateur-quantite-laine/` | Estimateur de quantité de laine |
| `/fr/outils/tailles-aiguilles/` | Tableau des tailles d'aiguilles |
| `/fr/outils/epaisseurs-de-fil/` | Tableau des épaisseurs de fil |
| `/fr/outils/abreviations-tricot/` | Abréviations tricot |
| `/fr/outils/tableaux-tailles-tricot/` | Tableaux de tailles tricot |
| `/fr/articles/` | Ranskankielinen artikkelilista |
| `/fr/articles/categorie/[slug]/` | Ranskankielinen kategoria |
| `/fr/articles/[slug]/` | Ranskankielinen artikkeli |
| `/de/werkzeuge/` | Saksankielinen tools listing |
| `/de/werkzeuge/maschenanschlag-rechner/` | Maschenanschlag-Rechner |
| `/de/werkzeuge/garnbedarfsrechner/` | Garnbedarfsrechner |
| `/de/werkzeuge/nadelstaerken-tabelle/` | Nadelstärken-Tabelle |
| `/de/werkzeuge/garnstaerken-tabelle/` | Garnstärken-Tabelle |
| `/de/werkzeuge/strickabkuerzungen/` | Strickabkürzungen |
| `/de/werkzeuge/groessentabellen-stricken/` | Größentabellen fürs Stricken |
| `/de/artikel/` | Saksankielinen artikkelilista |
| `/de/artikel/kategorie/[slug]/` | Saksankielinen kategoria |
| `/de/artikel/[slug]/` | Saksankielinen artikkeli |
| `/nl/breitools/` | Hollanninkielinen tools listing |
| `/nl/breitools/opzetcalculator/` | Opzetcalculator |
| `/nl/breitools/garenberekenaar/` | Garenberekenaar |
| `/nl/breitools/naalddiktes/` | Naalddiktes |
| `/nl/breitools/garendiktes/` | Garendiktes |
| `/nl/breitools/breiafkortingen/` | Breiafkortingen |
| `/nl/breitools/maattabellen-breien/` | Maattabellen breien |
| `/nl/artikelen/` | Hollanninkielinen artikkelilista |
| `/nl/artikelen/categorie/[slug]/` | Hollanninkielinen kategoria |
| `/nl/artikelen/[slug]/` | Hollanninkielinen artikkeli |
| `/da/strikkevaerktoejer/` | Tanskankielinen tools listing |
| `/da/strikkevaerktoejer/opslagsberegner/` | Opslagsberegner |
| `/da/strikkevaerktoejer/garnberegner/` | Garnberegner |
| `/da/strikkevaerktoejer/pindestoerrelser/` | Pindestørrelser |
| `/da/strikkevaerktoejer/garntykkelser/` | Garntykkelser |
| `/da/strikkevaerktoejer/strikkeforkortelser/` | Strikkeforkortelser |
| `/da/strikkevaerktoejer/stoerrelsestabeller-strik/` | Størrelsestabeller til strik |
| `/da/artikler/` | Tanskankielinen artikkelilista |
| `/da/artikler/kategori/[slug]/` | Tanskankielinen kategoria |
| `/da/artikler/[slug]/` | Tanskankielinen artikkeli |

## Localization

- i18n helperit ovat `src/i18n/`-kansiossa. `routes.ts` on reittien lähde, `articles.ts` parittaa julkaistut artikkelikäännökset `translationKey`-avaimella, ja `ui.ts` sisältää yhteiset UI-tekstit.
- `BaseLayout` ottaa `lang`- ja `alternates`-propit. Suomen sivuilla pitää olla `lang="fi"`, canonical `/fi/...`-osoitteeseen ja `hreflang`-pari vain jos käännös on olemassa. Norjan sisäinen kieliavain on `no`, mutta renderöity `<html lang>` ja `hreflang` mapataan Bokmål-muotoon `nb`.
- Englannin artikkelit pysyvät julkisesti `/articles/[slug]/`-reiteissä. Suomen artikkelit ovat `src/content/articles/fi/`-kansiossa ja julkaistaan `/fi/artikkelit/[suomenkielinen-slug]/`.
- `src/pages/articles/[...slug].astro` filtteröi englanninkieliset artikkelit, jotta `src/content/articles/fi/` ei vahingossa generoi `/articles/fi/...`-reittejä.
- Suomenkielinen review-entry `/fi/` on poistettu ennen julkaisua. Julkiset suomenkieliset entryt ovat `/fi/tyokalut/` ja `/fi/artikkelit/`; uudet suomenkieliset sisällöt hyväksytetään ennen tuotantodeployta.
- Tarkistusta odottavat suomenkieliset artikkelikäännökset lisätään `draft: true` -tilassa. `src/pages/fi/artikkelit/[...slug].astro` näyttää draftit vain dev-ympäristössä ja käyttää julkaisemattomille käännöksille tiedostonimeen perustuvaa fallback-slugia. Älä lisää draft-artikkelia `articleTranslations`-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan sivuun.
- Suomen termipolitiikka: suomi ensin, englanti sulkeissa vain jos se auttaa hakua tai englanninkielisten ohjeiden lukemista. Tärkeitä termejä: `gauge` → `neuletiheys`, `gauge swatch` → `mallitilkku`, `cast on` → `luoda silmukat`, `bind off` → `päätellä`, `circular needle` → `pyöröpuikko`, `DPNs` → `sukkapuikot`.
- Saksankieliset tools-sivut ovat julkisesti `/de/werkzeuge/`-prefiksissä. Saksankieliset artikkelit käyttävät `/de/artikel/`-prefiksiä ja kategoriat `/de/artikel/kategorie/`. Kaikki 38 saksankielistä artikkelia ovat `draft: false` -tilassa ja mukana `articleTranslations`-kartassa `de`-poluilla.
- Uudet tarkistusta odottavat saksankieliset artikkelikäännökset lisätään `src/content/articles/de/`-kansioon `draft: true` -tilassa. `src/pages/de/artikel/[...slug].astro` näyttää draftit vain dev-ympäristössä ja käyttää julkaisemattomille käännöksille tiedostonimeen perustuvaa fallback-slugia. Älä lisää uutta draft-artikkelia `articleTranslations`-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan sivuun.
- Saksankielisten työkalujen termipolitiikka on `GERMAN_TRANSLATION_STYLE_GUIDE.md`: `gauge` → `Maschenprobe`, `cast on` → `Maschen anschlagen`, `yarn weight` → `Garnstärke`, `needle size` → `Nadelstärke`, `yardage` → `Garnbedarf`.
- Ruotsinkieliset tools-sivut ovat `/sv/verktyg/`-prefiksissä. Ruotsinkieliset artikkelit käyttävät `/sv/artiklar/`-prefiksiä ja kategoriat `/sv/artiklar/kategori/`. Kaikki 38 ruotsinkielistä artikkelia ovat `draft: false` -tilassa ja mukana `articleTranslations`-kartassa `sv`-poluilla.
- Uudet tarkistusta odottavat ruotsinkieliset artikkelikäännökset lisätään `src/content/articles/sv/`-kansioon `draft: true` -tilassa. `src/pages/sv/artiklar/[...slug].astro`, `/sv/artiklar/` ja `/sv/artiklar/kategori/[slug]/` näyttävät draftit dev-ympäristössä tarkistusta varten, mutta tuotantobuild suodattaa draftit pois. Älä lisää uutta ruotsinkielistä draft-artikkelia `articleTranslations`-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan sivuun.
- Ruotsinkielisten työkalujen termipolitiikka on `SWEDISH_TRANSLATION_GUIDE.md`: `gauge` → `stickfasthet`, `gauge swatch` → `stickprov`/`provlapp`, `cast on` → `lägga upp maskor`, `bind off` → `maska av`, `yarn weight` → `garntjocklek`, `yardage` → `garnåtgång` tai `löplängd` kontekstin mukaan.
- Norjankieliset tools-sivut ovat `/no/verktoy/`-prefiksissä. Norjankieliset artikkelit ovat julkisia `/no/artikler/`-prefiksissä ja kategoriat `/no/artikler/kategori/`. Kaikki 38 norjankielistä artikkelia ovat `draft: false` -tilassa ja mukana `articleTranslations`-kartassa `no`-poluilla. Käytä Bokmålia ja `NORWEGIAN_TRANSLATION_GUIDE.md`-ohjetta.
- Uudet tarkistusta odottavat norjankieliset artikkelikäännökset lisätään `src/content/articles/no/`-kansioon `draft: true` -tilassa. `src/pages/no/artikler/[...slug].astro` näyttää draftit vain dev-ympäristössä ja käyttää julkaisemattomille käännöksille tiedostonimeen perustuvaa fallback-slugia. Älä lisää uutta norjankielistä draft-artikkelia `articleTranslations`-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan sivuun.
- Norjan termipolitiikka: `gauge` → `strikkefasthet`, `gauge swatch` → `prøvelapp`, `cast on` → `legge opp masker`, `bind off` → `felle av`, `yarn weight` → `garntykkelse`, `needle size` → `pinnestørrelse`, `yardage` → kontekstista riippuen `garnmengde`, `garnforbruk`, `garnbehov` tai etiketissä `løpelengde`.
- Ranskankieliset tools-sivut ovat `/fr/outils/`-prefiksissä. Ranskankieliset artikkelit käyttävät `/fr/articles/`-prefiksiä ja kategoriat `/fr/articles/categorie/`. Kaikki 38 ranskankielistä artikkelia ovat `draft: false` -tilassa ja mukana `articleTranslations`-kartassa `fr`-poluilla.
- Uudet tarkistusta odottavat ranskankieliset artikkelikäännökset lisätään `src/content/articles/fr/`-kansioon `draft: true` -tilassa. `src/pages/fr/articles/[...slug].astro` näyttää draftit vain dev-ympäristössä ja käyttää julkaisemattomille käännöksille tiedostonimeen perustuvaa fallback-slugia. Älä lisää uutta ranskankielistä draft-artikkelia `articleTranslations`-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan sivuun.
- Ranskan termipolitiikka on `FRENCH_TRANSLATION_GUIDE.md`: käytä eurooppalaista ranskaa ja neulojien termejä, kuten `échantillon`, `mailles`, `rangs`, `tours`, `monter les mailles`, `rabattre les mailles`, `aiguilles`, `fil`, `pelote`, `métrage`, `épaisseur de fil`; metriyksiköt ja desimaalipilkku ovat ensisijaisia.
- Hollanninkieliset tools-sivut ovat julkisesti `/nl/breitools/`-prefiksissä. Reitit elävät julkisessa `src/i18n/routes.ts`-lähteessä; `src/i18n/dutchTools.ts` tarjoaa NL-catch-all-komponenteille reittikohtaiset route-vakiot.
- Hollannin termipolitiikka on `DUTCH_TRANSLATION_GUIDE.md`: käytä luonnollista Alankomaiden hollantia ja neulojien termejä, metriyksiköitä sekä desimaalipilkkua näkyvissä luvuissa. Älä käytä englanninkielistä desimaalipistettä käyttäjälle näkyvissä mitoissa.
- Hollanninkieliset artikkelit ovat julkisia `/nl/artikelen/`-prefiksissä ja kategoriat `/nl/artikelen/categorie/`. Kaikki 38 hollanninkielistä artikkelia ovat `draft: false` -tilassa ja mukana `articleTranslations`-kartassa `nl`-poluilla.
- Uudet tarkistusta odottavat hollanninkieliset artikkelikäännökset lisätään `src/content/articles/nl/`-kansioon `draft: true` -tilassa. `src/pages/nl/artikelen/[...slug].astro` näyttää draftit dev-ympäristössä, mutta tuotantobuild suodattaa ne pois. Älä lisää uutta hollanninkielistä draft-artikkelia `articleTranslations`-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan sivuun.
- Tanskankieliset tools-sivut ovat julkisesti `/da/strikkevaerktoejer/`-prefiksissä. Reitit elävät julkisessa `src/i18n/routes.ts`-lähteessä; `src/i18n/danishTools.ts` tarjoaa DA-catch-all-komponenteille route-vakiot ja `danishToolAlternates`-rakenteen.
- Tanskan termipolitiikka on `DANISH_TRANSLATION_GUIDE.md`: käytä luonnollista Tanskan tanskaa neulojille, kuten `strikkefasthed`, `strikkeprøve`, `slå masker op`, `lukke af`, `garntykkelse`, `pindestørrelse` ja `løbelængde`; metriyksiköt ja desimaalipilkku ovat ensisijaisia.
- Tanskankieliset artikkelit ovat julkisia `/da/artikler/`-prefiksissä ja kategoriat `/da/artikler/kategori/`. Kaikki 38 tanskankielistä artikkelia ovat `draft: false` -tilassa ja mukana `articleTranslations`-kartassa `da`-poluilla.
- Uudet tarkistusta odottavat tanskankieliset artikkelikäännökset lisätään `src/content/articles/da/`-kansioon `draft: true` -tilassa. `src/pages/da/artikler/[...slug].astro` näyttää draftit dev-ympäristössä, mutta tuotantobuild suodattaa ne pois. Älä lisää uutta tanskankielistä draft-artikkelia `articleTranslations`-karttaan ennen hyväksyntää, jotta hreflang ei osoita julkaisemattomaan sivuun.
- `LocalizedToolPage.astro` on jaettu tools-sivupohja lokalisoiduille työkalusivuille. Myös suomenkieliset työkalusivut käyttävät sitä suoraan `lang="fi"`-asetuksella; erillistä `FinnishToolPage`-wrapperia ei enää ole.
- `ToolsIndexPage.astro` on jaettu tools-listaussivujen renderöijä kaikille 8 kielelle. Säilytä englannin `reveal`-variantti ja lokalisoitujen indexien tiheämpi mobiilikorkeus erillisinä variantteina, jos muokkaat ulkoasua.
- `WpiIdentifier.astro` on jaettu WPI-tunnistin lankavahvuussivuille. Käytä sitä englannin, suomen, saksan, ruotsin, norjan, ranskan, hollannin ja tanskan sivuilla, jotta WPI-logiikkaa ei kopioida kielikohtaisiin sivuihin.
- `src/scripts/sizeChartControls.ts` omistaa kokotaulukkosivujen tab/radio-näppäimistömallin ja ARIA-tilojen päivityksen. Kokotaulukon juureen lisätään `data-size-chart`; älä palauta sivukohtaisia `.tab-btn`/`.unit-btn`-querySelector-kopioskriptejä.
- `src/lib/toolReferenceData.ts` on puikkokoko- ja lankavahvuustaulukoiden yhteinen numerodatan lähde. Pidä mitta-, WPI-, CYC- ja alueelliset perusarvot siellä; sivukohtaisiin tiedostoihin kuuluvat vain lokalisoidut nimet, kuvaukset, linkit ja näkyvän kopion poikkeukset.
- `src/i18n/tools.ts` on footerin työkalulinkkien label/href-lähde. `src/i18n/articles.ts` tarjoaa footerin artikkelikategorialinkit `CATEGORY_ORDER` + `getCategoryLabel` + `routes.category` -lähteistä.
- `src/scripts/waitlistSignup.ts` omistaa waitlist-lomakkeiden submit-logiikan sekä virhe-/onnistumistilojen `aria-invalid`/`aria-describedby`-päivityksen. Lomake liitetään helperiin `data-waitlist-signup`-attribuutilla ja lomakekohtaisilla virhe-/loading-teksteillä.

## Tools Listing Page (`/tools/`)

Bento grid -layout. Ylärivi: Cast On Calculator + Yarn Estimator (50/50). Alarivi 1: Yarn Weight Chart + Needle Size Chart. Alarivi 2: Knitting Size Charts + Knitting Abbreviations. CSS-luokat: `card-top-left`, `card-top-right`, `card-bl1`, `card-br1`, `card-bl2`, `card-br2`.

Kortit: stripe-paletin väritaustat (terracotta, rust, teal, sand, brown), terävät kulmat (border-radius: 0), Lalezar-otsikot ja General Sans -kuvaukset. Ei watermarkia, ei kategorialabeleita.

Tablet (≤1024px): 2-sarakkeinen. Mobiililla (≤768px): yksisarakkeinen. JSON-LD CollectionPage schema (6 työkalua). SEO-metatiedot.

## Landing Page -rakenne (nykyinen)

Hero (editorial two-column, Teko KnitTools wordmark, signup card) → Marquee → NineTools (5 free + 3 Pro -korttia) → FreeToolsCallout → TrustSection → PullQuote → PricingCards → ClosingCTA → Footer

Etusivun JSON-LD käyttää `@graph`-rakennetta: `Organization` (`Finnvek`, `contact@finnvek.com`, Instagram/TikTok/YouTube/X `sameAs`) + `SoftwareApplication` (`KnitTools`) jossa `publisher` viittaa Finnvek-organisaatioon. `offers.availability` ei ole käytössä ennen todellista Google Play -tilausta/latausta; älä lisää `PreOrder`/`PreSale`-arvoja pelkkää launch-ilmoittautumista varten.

`/about/` on englanninkielinen KnitTools/Finnvek trust page. Se kertoo tuotteesta ja Finnvekin riippumattomasta ohjelmistotaustasta ilman henkilöbrändäystä. Sivulla on oma `AboutPage` + `BreadcrumbList` JSON-LD ja sama Finnvek `Organization`/`sameAs`-signaali kuin etusivulla. Footerin App-osiossa on About-linkki, footer-bottomissa näkyy `contact@finnvek.com`, ja someikonit käyttävät optimoituja 64x64 WebP-assetteja kansiosta `/public/brand/`. Finnvek/contact/some-profiilit ovat yhdessä lähteessä `src/config/brand.ts`; samaa lähdettä käyttävät footer, structured data ja `BaseLayout`in head-linkit. X-profiili käyttää footerissa mustaa `public/brand/x.webp`-ikonia, koska nykyinen footer-teema on vaalea.

Landing käyttää nykyistä paper/ink-editorial-palettia. Oikean reunan stripe-nauhaa ei renderöidä nykyisessä koodissa.

**Huom (poistetut/ei nykyisessä komponenttipuussa):** FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave, FeatureLearn, FreeToolsMention, PhoneInset, ToolClosingCTA, StitchSeam, PhoneMockup, StripeRibbon ja ToolCard eivät ole nykyisiä `src/components/`-komponentteja. `Marquee` on käytössä etusivulla.

## Tool-sivujen rakenne

Hero (Lalezar H1, intro, back-link → tools index) → laskuri/taulukko-osio → SEO-sisältö → FAQ (`<details>/<summary>`) → Waitlist CTA (`data-waitlist-signup`) → Footer. Lokalisoidut tools-sivut käyttävät `LocalizedToolPage.astro`-pohjaa; englanninkieliset tool-sivut ovat edelleen omia `.astro`-sivujaan.

## Gotchas

- JS-luodut DOM-elementit eivät saa Astron scoped data-attribuutteja → `:global()` CSS:ssä
- Globaali `a { color: var(--accent) }` voi yliajaa komponenttilinkkien värejä
- `global.css` sisältää vielä legacy stripe/safe-padding-tokenit, mutta nykyinen layout ei renderöi stripe-nauhaa.
- TrustSection näyttää alueellisen launch/regular-hinnan — tarkista ennen launchia


<claude-mem-context>
# Memory Context

# [KnitTools-website] recent context, 2026-05-31 11:44am GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (20,272t read) | 1,621,716t work | 99% savings

### May 6, 2026
5180 6:38p 🔵 PageLayout Acts as Pass-Through Wrapper Between Tool Pages and BaseLayout
5182 6:40p ✅ Updated Cast On Calculator Page Title for SEO Optimization
5183 6:41p ✅ Updated Size Charts and Abbreviations Page Titles for SEO
5187 6:56p ✅ Built KnitTools site with updated SEO title tags
5188 " 🔵 KnitTools deployment configuration has no npm deploy script
5189 6:57p 🔵 KnitTools deploys to Cloudflare Pages via manual wrangler commands
5190 " ✅ Deployed KnitTools with SEO-optimized titles to Cloudflare Pages production
5191 " 🔵 Cloudflare Pages deployment history confirms production rollout
5199 7:07p ✅ Committed and pushed SEO title updates to GitHub main branch
5200 7:11p 🔵 KnitTools article content uses Astro content collections with 38 markdown files
5201 7:15p ✅ Started optimizing article SEO titles in markdown frontmatter
5203 7:16p ✅ Optimized SEO titles for 6 knitting articles in markdown frontmatter
5204 7:17p ✅ Optimized 4 more article SEO titles to meet 60-character limit
5205 7:20p 🔵 Current SEO titles for 14 remaining articles exceed 60-character limit
5206 7:26p ✅ SEO title optimization applied to final 14 article pages
5210 7:28p ✅ Verified 29 article title optimizations applied cleanly
S749 Deploy 29 article title SEO optimizations to production after build completion (May 6, 7:32 PM)
S748 Second batch of 14 article title SEO optimizations - edited, built, and deployed to Cloudflare Pages (May 6, 7:32 PM)
S751 Commit and push 29 article title optimizations to GitHub, excluding AGENTS.md via .gitignore (May 6, 7:33 PM)
5211 7:37p ✅ Added AGENTS.md to .gitignore
5212 " ✅ Committed and pushed 29 article title SEO optimizations to GitHub
S752 Git commit and push completed: 29 article title optimizations and .gitignore update synchronized to GitHub (May 6, 7:37 PM)
S753 User greeting "haloo" followed by preparatory file reading for potential description field optimization (May 6, 7:38 PM)
S755 Complete meta description SEO optimization batch for 12 KnitTools pages with length validation (May 6, 7:40 PM)
5217 7:46p ✅ Optimized meta descriptions on 2 tool pages for SEO and specificity
5218 " ✅ Optimized meta descriptions on 2 article pages for conciseness and specificity
5219 7:47p ✅ Optimized meta descriptions on 3 more article pages for brevity
5220 " ✅ Optimized meta descriptions on 2 additional articles for brevity and specificity
5221 7:48p ✅ Verified completion of meta description optimization across 12 pages with character length validation
S754 Meta description SEO optimization across 3 tool pages and 9 article pages for KnitTools website (May 6, 7:48 PM)
S756 Build and deploy 12 meta description SEO optimizations to Cloudflare Pages production (May 6, 7:49 PM)
S757 Successfully deployed 12 meta description SEO optimizations to Cloudflare Pages production (May 6, 7:51 PM)
5225 8:34p ✅ Committed and pushed 12 meta description SEO optimizations to GitHub
S758 Git commit and push of 12 meta description SEO optimizations to GitHub main branch (May 6, 8:35 PM)
### May 8, 2026
5295 9:18p ✅ Yarn Estimator page copy updated to reflect estimation workflow
5296 9:37p 🔄 English tools index refactored to data-driven structure with single source of truth
5302 10:20p 🔵 Cloudflare Origin Status Codes Traced to Multiple Sources
5303 " 🔵 Cloudflare GraphQL Analytics Revealed Early Hints Timeouts and Security Blocks
### May 9, 2026
5308 2:55a 🔵 Article Translation Status Investigation
5309 " 🔵 Translation Status Breakdown for KnitTools Articles
5312 3:01a ✅ Created Three Finnish Article Translations for KnitTools Website
### May 18, 2026
5419 2:44p 🔵 English Articles Not in en/ Subdirectory
5426 " 🔵 Batch 3 article 26 baseline reading initiated
5422 3:16p 🔄 Insights heatmap now uses independent 55-day session window
5423 " 🔴 Insights Pro feature gate now observable and recomposition-safe
5424 " 🟣 Insights activity grid respects per-app locale for weekday ordering
5425 " 🔵 Gradle transformDebugClassesWithAsm fails when Windows process locks build directories
### May 20, 2026
5465 12:30p 🔄 Migrated Pro feature checks from binary isPro to granular ProFeature enum
5475 " 🔄 Granular ProFeature Authorization System Implementation
5476 " ✅ ProUpgradeScreen Feature List Expansion
5474 12:33p 🔴 Added regression test for malformed hearing test threshold data
### May 29, 2026
5515 6:07p ✅ Completed French (FR) Translation Validation - 38/38 Articles
5517 8:03p ✅ DE Articles Batch 4/8 Completed - Gauge, Pattern Reading, Yarn Labels
5519 " ✅ DE Articles Batch 5/8 Started - Increases, Yarn Joining, Scarf Guide
5520 8:05p ✅ DE Batch 5/8 Initialized - Verified Current Tooling and Sources
### May 31, 2026
**5557** 4:32a ✅ **Dutch localization batch 7/8 completed with content parity fixes**
Completed Dutch (NL) article localization batch 7/8 as part of systematic multi-language content quality assurance. Corrected content parity issues including unconfirmed product feature claims in rapportondersteuning article and technical accuracy gaps in waarom-krult-breiwerk.md regarding stockinette curl behavior, superwash processing, and acrylic fiber steam limitations to match the authoritative English reference. Verified seaming, time tracking, and fiber articles required no changes. Updated progress tracking in monikielinen-lokalisointi-eteneminen.md showing 35 of 38 NL articles now complete. Full verification suite passed: prettier formatting, git diff whitespace check, riskigrep pattern scan, npm run check (0 errors/warnings), npm run build (411 pages), and dist link validation (87 NL links, 0 broken). Sources referenced include Astro docs, Craft Yarn Council, Vogue Knitting, TECHknitting, Our Daily Craft, Olive Knits, Woolmark, and Coats. This follows the established pattern of verifying headers, facts, warnings, limits, product claims, and natural language style match EN structure while preserving language-specific terminology.
~443t 🛠️ 10,787

**5558** 10:17a ✅ **Danish Articles Batch 1/8 Localization Completed**
First batch of Danish article localization completed as part of systematic multi-language content verification. Five Danish knitting articles were validated against their English translationKey sources to ensure headers match current EN structure, facts/numbers/warnings/limitations align with corrected EN versions, product tool claims don't promise unconfirmed features, and language-specific style remains natural. Three files received content corrections addressing measurement conversions, standard references, technique step counts, brand examples, and feature limitations missing from EN sources. All verification steps passed including formatting, whitespace, product claim risk checking, type checking, build with 411 total pages, and Danish-specific internal link and article page validation. Progress logged to continuation tracking file to prevent losing place in multi-batch workflow covering 7 languages × multiple article batches.
~451t 🛠️ 10,886

**5559** " ✅ **Dutch Localization Completed and Danish Tools/Articles Batch 1 Finished**
Completed systematic multilingual localization work across Dutch and Danish language content for KnitTools website. Finished all remaining Dutch articles (batches 7/8 and 8/8) with EN-source parity checks including metric conversion corrections, YarnEstimator tool claim scoping, and gauge/row-count examples. All 38 Dutch articles now validated against current English translationKey sources. Completed full Danish tools suite (7 pages in two batches) with CYC Size 8 clarifications, needle size table updates to 38 rows matching EN source, body measurement/ease corrections, and product claim narrowing to remove unconfirmed app-specific features. Started Danish article localization with batch 1/8, applying content corrections for metric parity (~180m vs 200 yards), magic loop technique step counts (3-4 transitions vs 4-5), and digital counter feature limitations missing from prior EN version. All verification steps passed including formatting, whitespace, Danish product claim risk patterns, type checking, build with 411 total pages, and Danish-specific link/article page validation. Workflow follows established pattern: read continuation point from progress log, process exact batch boundary, compare to current EN Astro translationKey sources, preserve frontmatter/routing identity, update progress log with next exact file before stopping. Languages completed: EN 38/38, FI 38/38, SV 38/38, NO 38/38, FR 38/38, DE 35/38, NL 38/38, DA 5/38 articles + 7/7 tools.
~711t 🛠️ 4,777

**5560** 10:20a ✅ **Danish Article Localization Batch 1/8 Completed**
Completed first batch of Danish article localization validation as part of a systematic multi-language content review. After completing EN, FI, SV, NO, FR, DE, and NL languages, the Danish (DA) content validation began with tools pages (completed in two batches of 3+4 pages) followed by articles in batches of 5. The first article batch validated 5 Danish articles against their English translationKey sources, checking that headings/subheadings match current English structure, facts/numbers/warnings/limitations match corrected English version, product tool claims don't promise unconfirmed features, language-specific style and terms remain natural, and translationKey/draft/slug/routes don't change unnecessarily. Three files received content corrections for measurement conversions, yarn weight standards, technique details, and limitation disclosures. Full verification suite confirmed code quality (prettier, git diff), content safety (product claim risk grep), build integrity (npm check and build with 411 pages), and link validity (all 14 DA internal links and 38 article pages present in dist). Progress tracking ensures no work is lost between batches.
~516t 🛠️ 8,791

**5561** 10:27a ✅ **Danish Article Localization Batch 2/8 Completed**
Completed second batch of systematic Danish article localization validation, checking five articles against their English translationKey sources for structural parity, factual accuracy, and product claim compliance. Three files received content corrections: vigtigt-strikketilbehoer.md removed an out-of-scope "haptisk feedback" feature claim and reverted app counter description to match prelaunch English source state; gratis-strikkeberegnere.md corrected a yarn yardage example that would have incorrectly claimed "220 m pr. 100 g" when the English source stated "220 yards per 100 g" (approximately 200 meters); maal-strikkefasthed.md fixed yarn calculator description to accurately reflect the tool's actual inputs (project type, size, yarn weight) rather than incorrectly stating it accepts user gauge input. Two files (saml-tabt-maske-op.md and hvad-er-strikkefasthed.md) were verified against English sources and dropped-stitch/gauge references but required no corrections as content already matched source facts. All verification steps passed including formatting, whitespace checks, risk pattern searches for unsupported product claims and AI filler phrases, Astro type checking, full build with 411 pages, and link validation confirming 100 Danish internal links with 24 unique targets and zero missing build artifacts. Structure parity maintained across all files with H2/H3/FAQ counts matching English sources. Progress tracking updated in monikielinen-lokalisointi-eteneminen.md documenting batch 2 completion (10/38 DA articles complete) with next continuation point at batch 3/8 starting with naar-strikkefastheden-ikke-passer.md.
~761t 🛠️ 149,764


Access 1622k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>
