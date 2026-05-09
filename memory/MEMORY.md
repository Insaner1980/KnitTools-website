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
