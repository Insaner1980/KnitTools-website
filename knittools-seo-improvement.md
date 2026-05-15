# KnitTools SEO/GEO Trust Signals, Footer Contact, Social Links, and About Page

## Summary

Toteutetaan pieni mutta selkeä luottamus- ja structured data -parannus KnitTools-sivustolle ilman että sivu antaa harhaanjohtavaa “preorder/presale”-signaalia.

Päämuutokset:

- Poistetaan `SoftwareApplication.offers.availability`, koska appia ei voi oikeasti ennakkotilata.
- Ei lisätä `PreSale`, `PreOrder` tai muuta saatavuusarvoa.
- Lisätään `Organization` JSON-LD + `sameAs` virallisille Finnvek/KnitTools-someprofiileille.
- Lisätään etusivun/appin schemaan `publisher`, joka viittaa Finnvekiin.
- Lisätään `/about/`-sivu, joka kertoo KnitToolsista ja Finnvekistä ilman henkilöbrändäystä.
- Lisätään footeriin `contact@finnvek.com` Finnvek-linkin perään.
- Lisätään footeriin Instagram, TikTok ja YouTube virallisilla värillisillä logoilla.
- Ei lisätä schemaan sähköposti-ilmoittautumisen `SubscribeAction`/`RegisterAction`-merkintää, koska lomake toimii JS:n kautta eikä näkyvänä crawlattavana action-URLina.

## Implementation Changes

### Structured Data

Muokataan etusivun JSON-LD:tä tiedostossa `src/pages/index.astro`.

Nykyinen yksi `SoftwareApplication`-objekti korvataan `@graph`-rakenteella, jossa on kaksi entiteettiä:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://knittoolsapp.com/#organization",
      "name": "Finnvek",
      "url": "https://finnvek.com",
      "email": "mailto:contact@finnvek.com",
      "sameAs": [
        "https://www.instagram.com/finnvekapps/",
        "https://www.tiktok.com/@finnvekapps",
        "https://www.youtube.com/@Finnvekapps"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://knittoolsapp.com/#softwareapplication",
      "name": "KnitTools",
      "url": "https://knittoolsapp.com/",
      "operatingSystem": "Android",
      "applicationCategory": "LifestyleApplication",
      "publisher": {
        "@id": "https://knittoolsapp.com/#organization"
      },
      "description": "...existing description...",
      "offers": {
        "@type": "Offer",
        "price": "9.99",
        "priceCurrency": "USD"
      },
      "inLanguage": ["en", "fi", "sv", "da", "nb", "nl", "de", "fr", "it", "pt", "es"]
    }
  ]
}
```

Tarkat päätökset:

- `offers.availability` poistetaan kokonaan.
- `PreOrder` poistuu.
- `PreSale`a ei lisätä.
- `sameAs` käyttää TikTok-linkkiä ilman queryä: `https://www.tiktok.com/@finnvekapps`.
- `email` on `mailto:contact@finnvek.com`, koska schema.org odottaa URL-muotoista sähköpostiarvoa.
- Ilmoittautumislomakkeesta ei tehdä schema actionia; käyttäjälle näkyvä lomake ja teksti riittävät.

### About Page

Lisätään uusi julkinen englanninkielinen sivu `/about/`, todennäköisesti tiedostoon `src/pages/about.astro`.

Sivu käyttää nykyistä `PageLayout`-rakennetta:

- `canonicalPath="/about/"`
- `title="About KnitTools"`
- `browserTitle="About KnitTools"`
- meta description esimerkiksi:
  `Learn who builds KnitTools, why the Android knitting app exists, and how Finnvek approaches independent software for knitters.`

Sivun sisältö pidetään lyhyenä, uskottavana ja tuotelähtöisenä:

```text
About KnitTools

KnitTools is built by Finnvek, independent software from Turku, Finland. It is made for knitters who want practical tools without ads, subscriptions, or rushed releases. The app brings row counting, project notes, calculators, pattern help, and yarn tools into one Android toolkit.

Finnvek exists for ideas worth following carefully. Every product is its own thing: built to work well, released without shortcuts, and maintained with a long-term mindset.

KnitTools is the first Finnvek product. It is designed for real knitting projects, from quick row counting to keeping pattern notes, yarn details, calculations, and project progress in one place.

No ads. No tracking. No subscription. Just practical software for knitters.
```

Tarkat päätökset:

- Ei lisätä henkilökuvaa, henkilöhistoriaa tai pitkää henkilökohtaista bioa.
- Ei lisätä allekirjoitusta `Emma` KnitTools-sivulle.
- Mainitaan Turku, Finland ja Finnvek, mutta painotus pysyy tuotteessa.
- About-sivu linkitetään footerin App-osioon.

### Footer, Contact, and Social Links

Muokataan `src/components/Footer.astro`.

Footerin App-osioon lisätään:

- `About` linkki: `/about/`
- nykyinen Privacy Policy -linkki säilyy.
- nykyinen Finnvek-linkki säilyy footer-bottomissa.
- `contact@finnvek.com` lisätään Finnvek-linkin perään footer-bottomiin.

Footer-bottomin tavoitemuoto:

```html
© MMXXVI KnitTools. Finnvek. contact@finnvek.com
```

Toteutuksessa:

- `Finnvek` säilyy linkkinä `https://finnvek.com`.
- `contact@finnvek.com` tehdään `mailto:`-linkiksi.
- Linkkiteksti on näkyvä sähköpostiosoite.

Some-linkit lisätään footer-bottomiin tai sen viereen erillisenä ikonirivinä:

- Instagram: `https://www.instagram.com/finnvekapps/`
- TikTok: `https://www.tiktok.com/@finnvekapps`
- YouTube: `https://www.youtube.com/@Finnvekapps`

Assetit käytetään nykyisestä paikasta:

- `/brand/instagram.svg`
- `/brand/tiktok.png`
- `/brand/youtube.png`

Tarkat UI-päätökset:

- Ikonien renderöity koko: `22px × 22px`.
- Linkkien accessible labelit:
  - `Instagram`
  - `TikTok`
  - `YouTube`
- Ikonit ovat värillisiä virallisia logoja.
- Linkit avautuvat uuteen välilehteen: `target="_blank" rel="noopener"`.
- Ikonirivi ei saa kasvattaa footerin korkeutta mobiilissa kohtuuttomasti; mobiilissa se saa wrapata omalle riville.
- Ei inline-värejä; footerin layout/spacing tehdään komponentin CSS:ssä nykyisten design-tokenien hengessä.

### Logo Assets and Repo Hygiene

Nykyinen `public/brand/` sisältää käytettävät assetit:

- `instagram.svg` on hyvin suuri, noin 10.9 MB.
- `tiktok.png` ja `youtube.png` ovat pieniä.

Toteutuksessa tehdään yksi lisätarkistus ennen käyttöä:

- Jos `instagram.svg` kasvattaa build/output-kokoa liikaa tai sisältää tarpeettoman raskasta dataa, vaihdetaan käyttöön virallinen `Instagram_Glyph_Gradient.png` samasta ladatusta paketista ja kopioidaan se `public/brand/instagram.png`-nimellä.
- Jos SVG säilytetään, ei muokata logon muotoa tai värejä.

Alkuperäisiä ladattuja logopaketin kansioita ei saa commitoida:

- `IG_brand_asset_pack_2023/`
- `logo-pack/`
- `youtube-icon/`

Lisätään ne tarvittaessa `.gitignore`en, jotta vain `public/brand/`-käyttöassetit päätyvät mukaan.

## Test Plan

Ajetaan toteutuksen jälkeen:

```bash
npm run build
```

Tarkistetaan buildatusta HTML:stä:

- Etusivun JSON-LD sisältää `Organization`.
- Etusivun JSON-LD sisältää `sameAs`.
- Etusivun JSON-LD sisältää `publisher`.
- Etusivun JSON-LD ei sisällä `PreOrder`.
- Etusivun JSON-LD ei sisällä `PreSale`.
- Etusivun JSON-LD ei sisällä `offers.availability`.

Tarkistetaan selaimessa tai build-outputista:

- `/about/` buildautuu ja canonical on `https://knittoolsapp.com/about/`.
- Footerissa näkyy `contact@finnvek.com`.
- Footerissa näkyvät Instagram-, TikTok- ja YouTube-ikonit.
- Some-linkit osoittavat oikeisiin URL:eihin.
- Footer toimii mobiilissa ilman tekstin tai ikonien päällekkäisyyttä.

Tarkistetaan gitissä:

```bash
git status --short
```

Hyväksyttävät mukaan tulevat tiedostot ovat vain varsinaiset toteutustiedostot ja `public/brand/`-assetit. Alkuperäisiä logopaketin kansioita ei saa olla staged-tilassa.

## Assumptions

- About-sivu tehdään vain englanniksi polkuun `/about/`; lokalisoituja `/fi/...`, `/de/...` jne. About-sivuja ei tehdä tässä vaiheessa.
- Footer-linkki `About` voi näkyä kaikilla kieliversioilla englanninkielisenä ja osoittaa `/about/`.
- Sähköposti-ilmoittautuminen jätetään schema-tasolla merkitsemättä, koska nykyinen lomake on JS-pohjainen ja schema-action voisi antaa liian teknisen tai harhaanjohtavan signaalin.
- Some-profiilit ovat viralliset:
  - Instagram: `https://www.instagram.com/finnvekapps/`
  - TikTok: `https://www.tiktok.com/@finnvekapps`
  - YouTube: `https://www.youtube.com/@Finnvekapps`
- Toteutus ei sisällä deployta, ellei sitä pyydetä erikseen.
