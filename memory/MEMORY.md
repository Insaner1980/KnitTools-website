# KnitTools Website Memory

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
