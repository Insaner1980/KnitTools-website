# KnitTools Website — Project Documentation

> Tila 2026-04-20. Landing page on v11 editorial-tyyliin. Tool-sivut käyttävät yhä v10-paletti/typografiaa (erillinen myöhempi työ).

## Overview

KnitTools on Android-neulontasovelluksen (pre-launch) markkinointisivusto + kuusi ilmaista selainpohjaista työkalua + (valmis, mutta tyhjä) artikkeliosio. Staattinen Astro 6 -sivusto, `@astrojs/sitemap`.

- **URL:** https://knittoolsapp.com
- **Tekijä:** Finnvek
- **Tila:** Pre-launch — hero ja CTA:t ohjaavat waitlist-lomakkeeseen, ei kauppalinkkejä
- **Pro-hinta:** €8.99 launch → €11.99 kaksi kuukautta launchin jälkeen. Free tier ilmainen (rajoitettu 3 projektiin)
- **Riippuvuudet (`package.json`):** `astro ^6.1.3`, `@astrojs/sitemap ^3.7.2`, `sharp ^0.33.5`, `three ^0.183.2` (ei enää käytössä), `gsap ^3.15.0`
- **Skriptit:** `npm run dev` (:4321) · `npm run build` → `dist/` · `npm run preview`

---

## Reitit

| Polku | Sivu | Tyyli |
|-------|------|-------|
| `/` | Landing page | **v11 editorial** (DM Serif Display, Lora, JetBrains Mono) |
| `/tools/` | Tools bento | v10 (Geist, Bebas Neue, Teko) |
| `/tools/cast-on-calculator` | Cast On Calculator | v10 |
| `/tools/yarn-estimator` | Yarn Estimator | v10 |
| `/tools/needle-size-chart` | Needle Size Chart | v10 |
| `/tools/yarn-weight-chart` | Yarn Weight Chart | v10 |
| `/tools/knitting-abbreviations` | Knitting Abbreviations | v10 |
| `/tools/knitting-size-charts` | Knitting Size Charts | v10 |
| `/articles` | Artikkelilista | v10 |
| `/articles/[...slug]` | Artikkeli | v10 |

---

## Layout-hierarkia

```
BaseLayout.astro (meta, OG, Twitter, favicon, font preload, IntersectionObserver
                  .reveal, skip-link, bodyClass prop)
 └─ PageLayout.astro (Navbar, <main>, Footer — StripeRibbon ja PageBrandMark
                      poistettu v11:ssä)
     └─ index.astro  → body.landing, 8 osiota editorial-komponenteista
     └─ tool-sivut   → käyttävät yhä v10-tyyliä
     └─ ArticleLayout.astro artikkeleille
```

---

## v11 Editorial Landing

`src/pages/index.astro` importoi 7 komponenttia ja lisää JSON-LD SoftwareApplication -schemam. Wrapper: `PageLayout` bodyClass="landing".

Osioiden järjestys:

1. `Hero`
2. `Marquee`
3. `NineTools`
4. `FreeToolsCallout`
5. `TrustSection`
6. `PricingCards`
7. `ClosingCTA`

(Navbar + Footer tulee PageLayoutista.)

### Design tokenit (`src/styles/global.css`)

v11-tokenit v10:n rinnalla (tool-sivut yhä tarvitsevat vanhat):

```css
--paper: #F4EAD9;    --paper-2: #EADFC9;
--ink: #2A1E17;      --ink-soft: #4A382C;
--terracotta: #A05038;  --sage: #5B8072;  --walnut: #6B4332;
--amber: #C2703E;    --amber-hover: #A05F32;  --wheat: #C4A661;
--serif: "DM Serif Display";  --body-ed: "Lora";  --mono: "JetBrains Mono";
```

`body.landing`: paper-tausta + hyvin kevyt radial-gradient overlay (5% terracotta + 5% sage). `.dot-grid-paper` utility lisää 3% opaciteetilla radial dot pattern (24 px välein) — käytössä Herossa ja ClosingCTA:ssa.

### Fontit (`public/fonts/`)

Self-hosted woff2:

| Tiedosto | Koko | Käyttö |
|----------|------|--------|
| `dm-serif-display.woff2` | 24 kB | Display serif |
| `dm-serif-display-italic.woff2` | 25 kB | Italic-aksentit (`<em>`) |
| `lora-variable.woff2` | 38 kB | Body 400–700 |
| `lora-italic-variable.woff2` | 41 kB | Body italic |
| `jetbrains-mono-variable.woff2` | 31 kB | Eyebrowit, mono-labelit |

Kaikki preloadattu `BaseLayout.astro`:ssa. Yhteensä ~160 kB.

### Editorial-motiivit

- **Nº 01/02/03** -osionumerot NineToolsin, TrustSectionin ja PricingCardsin yläpuolella (section-head grid: `auto 1fr auto` = num + title + kicker). 2 px ink rule alle.
- **§-tagit** yksittäisissä korteissa (§ Counter, § Pattern, §:t pricingissa jne.)
- **Roomalaiset numerot** i–viii pricing-bulleteissa (DM Serif italic, terracotta/wheat)
- **Pisteruudukko** (3% ink) Herossa + ClosingCTA:ssa
- **Iso italic-aksentti** jokaisessa H1/H2/H3:ssa — `<em>` terracotta-värillä paperilla, wheat walnut-taustalla

### Komponentit

#### Navbar (`src/components/Navbar.astro`)
- Fixed top, transparent default, scrolled-tila (`window.scrollY > 80`) → paper-tausta + 1 px ink border
- Oikealla: Tools / Articles / **Join the waitlist** (amber pill, ink border)
- Vasen: placeholder (logo nyt hero-masthead-stripissä, ei navbarissa)

#### Hero (`src/components/Hero.astro`, `dot-grid-paper`)
- Yläreunassa **meta-strippi**: 2 kpl `.rule-double` + `.meta-row` välissä (Vol. 01 · Pre-launch | "One app for every tool a knitter needs" (serif italic keskellä) | EST. 2026)
- **Logo** (`/logo.webp`, 112×112) absolute-positioitu meta-stripin vasempaan reunaan, pystykeskitys, paper-bg + 4 px padding
- **Eyebrow:** "A knitting toolkit for Android · Launching soon" (terracotta mono caps)
- **H1:** *"Pick up where you left off."* (clamp 3.5–7 rem, `<em>` terracotta italic)
- **Dek:** "The row you were on... **KnitTools remembers it all.** So the only thing you need to do is **keep knitting.**" (terracotta strong emphasis)
- Waitlist-lomake: email + "Join the list" (amber pill-nappi), submit → success "You're in. We'll email you at launch."
- Microcopy: "Lock in the launch price: **€8.99** → €11.99 two months after launch."
- Oikealla: `PhoneMockup` theme="light" + `counter-light.png`, `transform: rotate(-2deg)`, terracotta radial glow
- Padding-top: 42 px (meta-strippi lähellä navbaria)

#### Marquee (`src/components/Marquee.astro`)
- Paper-tausta, 1 px ink top+bottom border
- 9 termiä duplikoituna: Row counter · Voice commands · Yarn scanner · AI journaling · Pattern viewer · Ravelry · Insights · Progress photos · Widget
- Mono caps ink-teksti, terracotta-pisteet erottimina
- 40 s CSS `@keyframes scroll`, pausee `prefers-reduced-motion`

#### NineTools (`src/components/NineTools.astro`)
- **Nº 01** section-head, H2 "Every tool, *talking to each other.*", kicker "Free core · Pro unlocks"
- **10 korttia** 3×3-ruudukossa + 1 leveä AI-kortti
- 9 regular-korttia paper-2-täytöllä, 1 px ink-border, 28 × 28 × 32 padding. Kortissa: card-meta (§-tagi mono caps vasemmalla + FREE/PRO-pilli oikealla), h3, p
- **5 FREE:** Counter (chips 11 kielestä), Pattern, Calc, Ravelry (walnut-tint), Reference. Counter on 1. kortti chipsirivillä.
- **5 PRO:** Stash (sage-tint), Photos, Insights, Widget, AI (leveä)
- **AI-kortti** (`.tool-card.wide.tint-ink`) `grid-column: 1 / -1`, ink-tausta, terracotta glow-ornament. Sisältö 3-sarakkeisena gridinä:
  - Vasen: H3 *"AI that knows knitting."*, intro, 🎙 Listening… mono
  - Keski: 4 aliominaisuutta (i Live voice · ii Pattern intelligence · iii Stash + project memory · iv Voice or text journal) roomalaisin numeroin
  - Oikea: **Transcript · Live wheat-vignette** (terävät kulmat, ink border) 4 puhevuoroa: YOU/AI labelit, viestit. YOU-riveissä animoitu 9-barinen terracotta-ääniraita (40 px korkea, pausee reduced-motion)
- Tintit: .tint-sage (paper-teksti), .tint-walnut (paper-teksti + wheat lead-sana), .tint-ink (paper-teksti)

#### FreeToolsCallout (`src/components/FreeToolsCallout.astro`)
- Paper-tausta, 900 px max-width, keskitetty
- Eyebrow "FREE TOOLS" terracotta mono
- H2 (26–38 px) "Not ready for the app? *Try one in your browser.*"
- 6 pill-linkkiä stripenvärein: Cast On (terracotta), Yarn Estimator (amber), Yarn Weights (wheat), Needle Sizes (sage), Size Charts (walnut), Abbreviations (ink)
- "See all tools →" linkkinä `/tools/`:iin

#### TrustSection (`src/components/TrustSection.astro`)
- **Nº 02** section-head, H2 "What you can *count on.*", kicker "No subscription · No tracking · No language barrier"
- 3 kehystettyä korttia paper-2:lla (Price / Privacy / Languages); Privacy-kortti sage-tint + paper-teksti
- Jokainen kortti: eyebrow (sage tai paper), H3 (2 riviä — lead + italic), body

#### PricingCards (`src/components/PricingCards.astro`)
- **Nº 03** section-head, H2 "Pay once. *Own it.*", kicker "No monthly · No yearly"
- 2 korttia rinnakkain (Free paper-2, Pro terracotta-tausta + paper-teksti)
- Mobiililla Pro-kortti ensin (`order: -1`)
- **Free-kortti:** § Free, H3 "Forever", 7 bulletia roomalaisin numeroin (i–vii), footnote "No account. No trial expiry. No card."
- **Pro-kortti:** § Pro (wheat label), H3 "€8.99 one-time", "Everything in Free, plus:" (wheat mono), 8 bulletia i–viii, footnote "14-day free trial. No credit card. Rises to €11.99 two months after launch — permanently. No subscription, ever."

#### ClosingCTA (`src/components/ClosingCTA.astro`, `dot-grid-paper`)
- Eyebrow "BE THERE AT LAUNCH" terracotta
- H2 (clamp 3–6 rem) "Where every stitch *counts.*"
- Waitlist-lomake (`id="join"`, Navbarin linkki osoittaa tähän): email + "Reserve my price" (amber pill). Success-tila "Reserved. See you at launch."
- Meta: "Free at launch · Pro €8.99 → €11.99 after two months · No card required"

#### Footer (`src/components/Footer.astro`)
- Paper-tausta, 1 px ink top-border
- 3 saraketta: **Tools** (6 työkalua), **Articles** (5 kategorialinkkiä `/articles`:iin), **App** (Launching soon, Privacy Policy)
- Copyright-rivi: "© MMXXVI KnitTools · Finnvek"

---

## Bullet-lista pricingissa

**Free (7):** i Row counter + session history · ii Pattern viewer (PDF or Ravelry) · iii Four calculators (gauge, cast-on, increases, yardage) · iv Ravelry sign-in · v Reference library (needles, sizes, symbols, abbreviations) · vi Three projects · vii Eleven languages

**Pro (8):** i Unlimited projects · ii Yarn OCR scanner · unlimited stash · iii Progress photos, row-tagged · iv Insights, streaks, pace-over-time · v Home-screen counter widget · vi Live AI voice on the counter (all eleven languages) · vii AI pattern help: read rows aloud, explain stitches, parse instructions · viii AI project summaries + voice journal

---

## Tool-sivut (v10, ei skopessa)

Kuusi erillistä tool-sivua yhä käyttävät `PageLayout` `showStripe={true}`, mutta `showStripe`-prop on nyt no-op (StripeRibbon ja PageBrandMark poistettu). Tool-sivut renderöityvät ilman stripeä ja brand-markia, mutta sisältö toimii.

Rakenteet kullakin tool-sivulla:
1. Hero (cream, Bebas Neue H1, intro)
2. ToolCard + kalkulaattori/taulukko
3. SEO-sisältö
4. FAQ `<details>/<summary>`
5. Waitlist-CTA
6. Footer (nyt v11 paper-tausta — yhteinen)

---

## Tunnettuja puutteita

- **Hero-logo:** kohdistus vielä säädössä (paperitausta saattaa näkyä viivojen päällä logon kohdalla)
- **Tool-sivut yhä v10-tyylissä** — design-yhtenäistys on erillinen työ
- **Artikkeleita ei ole luotu** — `/articles`-sivu näyttää tyhjän tilan
- **StripeRibbon ja PageBrandMark** komponenttitiedostot jäävät diskille käyttämättöminä (cleanup myöhemmin)
- **Legacy-komponentit** (FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave, FeatureLearn, FreeToolsMention, PhoneInset, ToolClosingCTA, StitchSeam) jäävät diskille
- **/privacy-reitti** ei ole olemassa — footerin Privacy Policy osoittaa `#`:iin

---

## Git

- Aktiivinen haara: `v2-editorial` (v11 editorial -työ)
- Remote: `origin` → `https://github.com/Insaner1980/KnitTools-website`
- `.gitignore` jättää ulkopuolelle: `node_modules/`, `dist/`, `.astro/`, `.DS_Store`, `.remember/`, `.claude/`, `.codex`
