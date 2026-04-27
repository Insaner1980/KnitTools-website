# KnitTools Website — Jäljellä olevat tehtävät

Lista asioista jotka vaativat vielä huomiota ennen launchia. Järjestys: kriittisimmät ensin.

## Kriittiset (ennen julkaisua)

### 1. Hinnan epäjohdonmukaisuus tool-sivuilla
Tool-sivujen `ToolClosingCTA.astro` näyttää `LAUNCH PRICE €4.99` (rivi 10), mutta landingilla ja muualla hinta on `€8.99`. Päivitä yhtenäiseksi.

### 2. Footer-linkit osoittavat `href="#"`
Footer-komponentissa seuraavat linkit eivät mene minnekään (CLAUDE.md:n mukaan):
- Needle Size Chart
- Yarn Weight Chart
- Abbreviations

Korjaa osoittamaan oikeisiin tool-URL:iin (`/tools/needle-size-chart`, `/tools/yarn-weight-chart`, `/tools/knitting-abbreviations`).

### 3. Mobiilitarkistus — H1 `white-space: nowrap`
Hero-H1:n ensimmäinen rivi "Pick up where you" pakotettu yhdelle riville `nowrap`-säännöllä. Kapeilla mobiilinäytöillä (alle 375px) teksti saattaa mennä yli viewportin reunan. Testaa ja lisää media-kysely joka poistaa nowrapin tai pienentää fonttikokoa mobiilissa tarvittaessa.

## Keskitason (polishia ennen julkaisua)

### 4. Footer uudelleenarvioitu — kolofonin tyyliseksi
Nykyinen footer on 3-sarakkeinen linkkiverkko. Sanomalehtimäisempi vaihtoehto olisi **kolofoni**: yksi tiivis palsta johon mahtuu julkaisutiedot ja muutamat olennaiset linkit (Tools, Articles, Privacy). Tarkistettava yhtenäisyys editoriaalisen muun sivuston kanssa.

### 5. Tool-sivujen newspaper-pavistus
Tool-sivut (cast-on-calculator, yarn-estimator, yms.) käyttävät vielä vanhempaa palettia (`--accent`, `--cream`, Bebas Neue) ja design-systeemiä. Landingista poiketen:
- Hero-osuudet ovat eri tyyliä
- Taustat ja typografia eivät ole samassa editoriaalisessa linjassa

Päätös tarvitaan: pidetäänkö tool-sivut nykyisenä tai tuodaanko ne samaan newspaper-vaikutelmaan kuin landing. Tämä on iso työ jos tehdään.

### 6. Typografia-tarkistus koko sivu läpi
Polish-vaihe: kävellään sivu ylhäältä alas ja tarkistetaan:
- Otsikkohierarkian johdonmukaisuus (H2-koot, paksuudet, värit)
- Leipätekstin fontit eri kohdissa (Lora vs Geist sekaisin?)
- Rule-viivojen paino ja opasiteetti
- Marginaalit ja padding osioiden välissä
- Kaikkien linkkien hover-tilat yhtenäiset (terracotta + underline)

### 7. Animaation kesto (StitchChart)
Nykyinen animaatio:
- 70ms / solu × 64 solua = ~4.5s / kuvio
- 120ms / rivi × 8 = ~1s ylimääräinen
- 2.4s pysähdys ennen seuraavaa
- Koko sykli: 4 kuviota × ~8s = ~32s

Jos käyttäjä pysähtyy sivulle 10 sekunniksi, hän ehtii nähdä vain 1 kuvion. Harkitse:
- Nopeampi tempo (esim. 40ms / solu → kokonaiskesto puolittuu)
- Tai hyväksy hidas meditatiivinen tempo ja jätä KT-monogrammi pysyvästi näkyviin (jo tehty)

### 8. Articles teaser — oikea sisältö
`ArticlesTeaser.astro` näyttää nyt 3 placeholder-artikkelia. Kun `src/content/articles/`-kansioon lisätään ensimmäiset 3 markdown-tiedostoa, komponentti vaihtaa automaattisesti oikeaan sisältöön. Ennen sitä, mieti:
- Onko placeholder-kortit OK näkyvissä (antaa mielikuvan "coming soon") vai pitäisikö koko osio piilottaa kunnes artikkeleita on? Nykyinen `useReal`-logiikka vaatii 3 artikkelia — voi säätää alemmaksi jos haluat näyttää yhden tai kaksi.

### 9. Teko-fontti lataamisesta pois
`global.css`-tiedostossa ladataan Teko-fontti `@font-face`:lla (rivit 23–38), mutta sitä ei käytetä missään landingilla (käyttäjän vaatimus: ei Tekoa). Ainoa käyttö on `PageBrandMark.astro`-komponentissa joka ei ole importtattuna missään. Voit joko:
- Poistaa `@font-face` Teko-säännöt globalista + ko. woff2-tiedostot `/public/fonts/`-kansiosta
- Säilyttää mutta tiedostaa että on dead weight

Säästää ~20-40KB latausaikaa.

## Pienet viilaukset

### 10. Stitch chart -animaation sijainti
Animaatio on hero-osion oikeassa palstassa. Testaa että scrollaus toimii: IntersectionObserver laukaisee kun 20% chartista näkyy. Jos user avaa sivun ja chart on heti täysin näkyvissä, voi olla että observer laukeaa fallback-timerin kanssa samanaikaisesti (loop käynnistyy kerran, hyvä).

### 11. Byline- ja dek-spacing
Heron byline ("Filed by the KnitTools Editorial Desk.") ja dek (body-teksti drop capilla) välillä on nyt 28px. Katso onko liian tiivis tai löysä kun drop cap avautuu.

### 12. Stripe Ribbon
Oikean reunan viisiraitainen stripe-nauha (`StripeRibbon.astro`) on `position: fixed` z-index 0. Tarkista että uusi hero-layout ei mene nauhan päälle, ja että kaikki osioiden padding oikealle on riittävä (`--safe-pr-desktop` custom property).

### 13. SEO-tarkistus ennen julkaisua
- Jokaisella sivulla uniikki `<title>` + `<meta description>`
- `canonicalPath` asetettu jokaisessa PageLayoutissa
- Sitemap generoituu oikein (robotit.txt sallii)
- Kuville alt-tekstit
- JSON-LD SoftwareApplication-skeema toimii (landingilla on jo)
- Social preview -kuva (`og:image`) asetettu

### 14. Suorituskyky
- LightHouse-testi launch-tilassa
- Tarkista että kaikki kuvat on webp-muodossa ja oikean kokoisia
- Third-party-skriptejä ei pitäisi olla (ei analyticsia vielä?)
- Fonttien preload tarvittaessa

### 15. Toimivuustarkistus
- Kaikki signup-lomakkeet (hero, ClosingCTA, tool-sivujen waitlist) toimivat samalla tavalla ja sähköposti oikeasti menee jonnekin (nyt kaikki `action="#"` → ei lähetä minnekään)
- Navigaatio kaikilta sivuilta toisille
- 404-sivu tyyliltään yhtenäinen

## Mikä on jo tehty (muistutuksena)

- Masthead (iso KnitTools-nimi + seal-logo + tagline)
- Metarivi (Vol. 01, tagline, Est. 2026) ilman middoteja
- Drop cap dekin alussa
- Byline H1:n alla
- Pull quote ("One tool for every row...") TrustSectionin ja PricingCardsin välissä
- Editor's Note (tuplaviiva ylhäällä + yksi alhaalla)
- ArticlesTeaser placeholder
- Stitch chart -animaatio (4 kuviota, päättyy KT-monogrammiin)
- Kickerit section-headeissa (FEATURES / PRINCIPLES / PRICING)
- Nappisysteemi: primary = solid ink, secondary = outlined
- Kaikki · ja — -erottimet poistettu näkyvästä tekstistä
- Tool-nappien reunat 1.5px + suorat kulmat
- FreeToolsCallout-pillit suorakulmaiseksi
- Navbar-scrollin "KnitTools" brand vasemmalla
- Stagger/jättiläinen H1 kokeiltiin → palattu kahteen riviin (iso italic alla)
