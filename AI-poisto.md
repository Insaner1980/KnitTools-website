# KnitTools English Homepage AI Removal Plan

## Summary

Poistetaan englanninkieliseltä etusivulta kaikki AI-, OCR-, skanneri-, kamera-, ääni-, mikrofoni-, transcript- ja automaattiseen tulkintaan viittaavat kohdat. Työ rajataan tässä vaiheessa `/`-etusivuun ja sen suoraan käyttämiin komponentteihin.

Toteutus ei lisää uusia tuotelupauksia. Jäljelle jäävät vain nykyisestä copysta todettavat ei-AI-ominaisuudet: row counter, pattern viewer, calculators, Ravelry, reference library, progress photos, insights ja home-screen widget.

Astro-lähteet ennen toteutusta: [Astro components](https://docs.astro.build/en/basics/astro-components/) ja [Astro scoped styles](https://docs.astro.build/en/guides/styling/).

## Key Changes

- Päivitä [src/pages/index.astro](C:/Dev/KnitTools-website/src/pages/index.astro) SEO- ja JSON-LD-kuvaukset ei-AI-muotoon:
  - JSON-LD description:
    `An all-in-one knitting toolkit for Android. Row counter, pattern viewer, four calculators, Ravelry integration, project notes, progress photos, insights, and a home-screen counter widget. One-time purchase, no subscription.`
  - Meta description:
    `An Android knitting app with a row counter, pattern viewer, four calculators, Ravelry, project notes, progress photos, and a home-screen widget. One-time purchase, 14-day trial.`
- Päivitä [src/components/Marquee.astro](C:/Dev/KnitTools-website/src/components/Marquee.astro):
  - Poista `Yarn label scanner`.
  - Poista `Voice commands`.
  - Älä lisää korvaavia lupauksia, ellei niille ole jo selvä ei-AI-vastine.
- Päivitä [src/components/NineTools.astro](C:/Dev/KnitTools-website/src/components/NineTools.astro):
  - Poista row counter -kortista lause `Say "add three" or "next row"...`.
  - Korvaa se tekstillä: `Session history keeps each project exactly where you left it.`
  - Vaihda otsikko `Every tool, talking to each other.` muotoon `Every tool, in one project home.`
  - Poista `Stash` / yarn scanner -Pro-kortti kokonaan.
  - Poista `aiFeatures`-taulukko, koko AI-wide-card markup, mic/transcript/wave UI, inline script ja kaikki niihin liittyvät CSS-säännöt/keyframet.
  - Renderöi jäljelle jäävät Pro-kortit yhtenä 3 kortin gridinä: `Progress photos`, `Insights`, `Widget`.
  - Lisää Pro-gridiin erillinen luokka, esim. `pro-feature-grid`, jotta desktopillä 3 korttia täyttää rivin eikä poistettujen korttien paikalle jää tyhjää layout-aukkoa.
- Päivitä [src/components/PricingCards.astro](C:/Dev/KnitTools-website/src/components/PricingCards.astro):
  - Poista Pro-bulleteista `Yarn OCR scanner`, `Live AI voice`, `AI pattern help`, `AI project summaries + voice journal`.
  - Jätä Pro-bulleteiksi vain:
    `Unlimited projects`, `Progress photos, row-tagged`, `Insights, streaks, pace-over-time`, `Home-screen counter widget`.

## Layout Details

- `NineTools`-komponentissa Free-grid saa jäädä nykyiseen 5 kortin malliin: row counter span-2 + neljä normaalia korttia.
- Pro-grid muutetaan yhdeksi yhtenäiseksi korttilistaksi. Ei enää `proCards.slice(0, 2)`, ei `nine-grid-halves`, eikä erillistä AI-gridiä.
- CSS-siivo:
  - Poista käyttämättömät `.nine-grid-halves`, `.tool-card.wide`, `.ai-*`, `.mic-*`, `.bc-*`, `.big-wave`, `wave-*`, `sonar`, `dotPulse`, `caret`.
  - Säilytä `.tool-card.span-2`, koska Free row counter käyttää sitä.
  - Jos `tint-sage` ei jää käyttöön, poista myös sen CSS. Suositus: käytä `tint-sage` Insights-kortissa, jotta värivaihtelu säilyy ja token pysyy käytössä.
- Responsiivinen oletus:
  - Desktop: Pro-kortit 3 sarakkeessa.
  - Tablet/mobile: kortit pinoutuvat ilman varattua tyhjää AI-aluetta; tarvittaessa `pro-feature-grid` saa oman breakpointin, esim. 3 saraketta yli 900px ja 1 sarake alle 900px.

## Test Plan

- Aja lähdekoodihaku ennen buildiä:
  ```powershell
  rg -n -i "\b(ai|a\.i\.|artificial intelligence|machine learning|llm|gpt|openai|ocr|voice|mic|microphone|listen|listening|transcript|camera|scan|scanner|aloud|intelligence|automatic|automatically|summar|parse|explain)\b|add three|next row|set row" src/pages/index.astro src/components/Hero.astro src/components/Marquee.astro src/components/NineTools.astro src/components/PricingCards.astro src/components/FreeToolsCallout.astro src/components/TrustSection.astro src/components/PullQuote.astro src/components/ClosingCTA.astro
  ```
  Odotus: ei osumia etusivun AI/voice/skanneri-scopeen.
- Aja projektin tarkistus:
  ```powershell
  npm run verify
  ```
  Jos vain formatointi kaatuu, aja Prettier rajatuille tiedostoille ja `npm run verify` uudelleen.
- Aja buildin jälkeen renderöidyn etusivun tarkistus:
  ```powershell
  rg -n -i "\b(ai|ocr|voice|mic|microphone|listen|listening|transcript|camera|scan|scanner|aloud|intelligence|automatic|automatically|summar|parse|explain)\b|add three|next row|set row" dist/index.html
  ```
  Odotus: ei osumia.
- Visuaalinen QA selaimessa:
  - Avaa `/` desktopillä, tabletilla ja mobiililla.
  - Tarkista erityisesti Features-osio ja Pricing-osio.
  - Hyväksymiskriteeri: poistettujen scanner/AI-korttien kohdalle ei jää tyhjää täysleveää aluetta, Pro-kortit ovat tasapainoisesti ruudukossa, pricing-lista ei näytä katkenneelta.

## Assumptions

- Scope on vain englanninkielinen etusivu `/`, ei vielä `/tools/`, artikkelit, muut kielet tai app store -materiaalit.
- Kaikki ääniominaisuudet poistetaan etusivulta tässä vaiheessa, myös offline-perusäänikomennot.
- Yarn label scanner ja OCR käsitellään AI-scopeen kuuluvina ja poistetaan kokonaan.
- Uusia korvaavia ominaisuuksia ei keksitä; copy saa nojata vain jo näkyvissä oleviin ei-AI-ominaisuuksiin.
- AGENTS.md- tai memory-päivitystä ei tarvita, koska tämä on sisältö/layout-siivo eikä arkkitehtuurimuutos.
