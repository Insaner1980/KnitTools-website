# KnitTools Website — AGENTS.md

## Project

Astro 6 -staattinen sivusto. Neulontasovelluksen (Android) landing page + kuusi ilmaista selainpohjaista työkalua (2 laskuria + 4 referenssitaulukkoa) + artikkeliosio.

## Commands

```bash
npm run dev      # Dev-serveri (localhost:4321)
npm run build    # Staattinen build → dist/
npm run preview  # Preview buildattu versio
```

## Design System

### Colors

- Dark: `--dark` (#2E2A26), `--dark-deep` (#262320)
- Cream: `--cream` (#E8E4D0), `--cream-muted` (#D4D0BD)
- Accent: `--accent` (#C45100) — burnt orange, pääkorostusväri
- Avocado: `--avocado` (#8BA44A) — Projects-osio, sekundäärinen aksentti
- Mustard: `--mustard` (#C9A435) — Calculators-osio, tertiäärinen aksentti
- Dusty Rose: `--dusty-rose` (#B8908F) — Yarn Scanner -osio, kvartäärinen aksentti
- Ei koskaan #000000 tai #FFFFFF
- Sivun tausta aina cream — ei tummia osiotaustoja (paitsi ref-kortit, footer)

### Fonts (self-hosted woff2, `/public/fonts/`)

| Fontti | Rooli | Muuttuja |
|--------|-------|----------|
| Geist (variable, 100-900) | H1, H2 (800-900), body (400-700) | `--font-display`, `--font-body` |
| Bebas Neue | Tags, labels, nav-linkit, napit, H3, tool-sivujen H1:t, tools-kortit | `--font-label` |
| Teko (500) | PageBrandMark "KnitTools" -logo | `--font-logo` |

Yksi variable woff2 (`geist-variable.woff2`) kattaa kaikki Geist-painot.

### Typography

- H1: `clamp(3rem, 6.5vw, 6.875rem)` — Geist 900. Massiivinen, hallitseva.
- H2: `clamp(2.5rem, 5vw, 5rem)` — Geist 900. Jokaisen osion dominantti elementti.
- `<em>` ja `.accent` → burnt orange korostus
- H3: Bebas Neue, uppercase
- Section tags: Bebas Neue, osiokohtaiset värit (accent/avocado/mustard/dusty-rose)

### Buttons

- Primary (`.btn-primary`): outline, suorakulmio (border-radius: 0), burnt orange reunus, transparent bg, Bebas Neue -fontti
- Calculate/Estimate -napit: solid burnt orange, square corners (scoped overridet sivuilla)

### Stripe Ribbon

`StripeRibbon.astro` — viisi pystysuoraa raitaa **oikeassa reunassa** kiinteänä (`position: fixed`). Värit oikealta vasemmalle: terracotta (#A05038), brown (#6B4332), sand (#C4A661), rust (#C2703E), teal (#5B8072). Leveys: 275px (5×55px), mobiililla 135px (5×27px). `z-index: 0`, osiot `z-index: 1`. Käytössä landing pagella ja kaikilla tools-sivuilla (`showStripe={true}` PageLayoutissa).

### Diagonal Sections (viistot taustaosiot)

Feature-osioissa (Your Projects, Calculators, Yarn Scanner) on viistoreunainen väritausta `::before` pseudo-elementillä. `clip-path: polygon()` luo diagonaalin kulman. Puhelimet istuvat diagonaalin PÄÄLLÄ (z-index: 2), teksti on cream-puolella.

| Osio | Suunta | Väri | Layout |
|------|--------|------|--------|
| Your Projects | Oikealta | Terracotta (#A05038) | Teksti vasemmalla, puhelimet oikealla |
| Calculators | Vasemmalta | Teal (#5B8072) | Puhelimet vasemmalla, teksti oikealla |
| Yarn Scanner | Oikealta | Terracotta (#A05038) | Teksti vasemmalla, puhelin oikealla |

- Oikealta tulevien diagonaalien `right: 275px` jättää tilan stripe-nauhalle
- Vasemmalta tulevat (teal) ulottuvat täysleveäksi
- Korkeus: 45% osion korkeudesta, mobiililla 40%

### Phone Mockups (realistiset Android-laitteet)

`PhoneMockup.astro` — realistinen Android-puhelin CSS:llä: tumma bezel (36px border-radius), **punch-hole -kamera** (piste, ei notch), Android status bar (aika + ikonit), gesture navigation bar. Sivuprofiilin syvyys CSS `transform-style: preserve-3d` + pseudo-elementit.

Hero-osiossa työpöydällä (≥769px) käytetään **Three.js** 3D-mallia, joka latautuu dynaamisesti. Puhelin keinuu kevyesti (sin-aalto rotaatiolla). Mobile/fallback: CSS PhoneMockup perspektiivikäännöksellä.

### Dot grid -taustakuvio

`dot-grid-cream` ja `dot-grid-dark` global-luokat — `::before` pseudo-elementti SVG-pisteillä. Käytössä: Hero, ClosingCTA (cream), ToolClosingCTA (dark). **Huom:** scoped CSS:ssä täytyy käyttää `background-color` (ei `background` shorthand) tai pseudo-elementti ei näy.

## Routes

| Polku | Sivu |
|-------|------|
| `/` | Landing page |
| `/tools/` | Tools listing page (bento grid) |
| `/tools/cast-on-calculator` | Cast On Calculator |
| `/tools/yarn-estimator` | Yarn Estimator |
| `/tools/needle-size-chart` | Needle Size Chart |
| `/tools/yarn-weight-chart` | Yarn Weight Chart |
| `/tools/knitting-abbreviations` | Knitting Abbreviations |
| `/tools/knitting-size-charts` | Knitting Size Charts |
| `/articles` | Artikkelilista |
| `/articles/[slug]` | Artikkeli |

## Tools Listing Page (`/tools/`)

Bento grid -layout. Ylärivi: Cast On Calculator + Yarn Estimator (50/50). Alarivi 1: Yarn Weight Chart + Needle Size Chart. Alarivi 2: Knitting Size Charts + Knitting Abbreviations. CSS-luokat: `card-top-left`, `card-top-right`, `card-bl1`, `card-br1`, `card-bl2`, `card-br2`.

Kortit: stripe-paletin väritaustat (terracotta, rust, teal, sand, brown) rgba 0.88 opacityllä, terävät kulmat (border-radius: 0), Bebas Neue -otsikot (uppercase), Geist-kuvaukset `var(--dark)` -värillä. Hover: opacity 0.88→0.94. Ei watermarkia, ei kategorialabeleita.

Tablet (≤1024px): 2-sarakkeinen. Mobiililla (≤768px): yksisarakkeinen. JSON-LD CollectionPage schema (6 työkalua). SEO-metatiedot.

## Landing Page -rakenne (nykyinen)

Hero (cream, dot grid, email signup, "ONE APP." caps burnt orange, Three.js 3D puhelin / CSS fallback) → NineTools (9 app-ominaisuutta numeroituna listana, 2-sarakkeinen desktop) → FreeToolsCallout (yksinkertainen aside, linkit 6 ilmaistyökaluun) → TrustSection (heading + 3 itemiä) → ClosingCTA (cream, dot grid) → Footer (dark, kompakti, 3-sarakkeinen)

Kaikki osiot läpinäkyvällä taustalla — stripe-nauha näkyy oikeassa reunassa. Body cream -tausta.

**Huom (käyttämättömät komponentit):** FeatureKnit, FeatureOrganize, FeatureCalculate, FeatureScanSave, FeatureLearn, Marquee, FreeToolsMention, PhoneInset, ToolClosingCTA, StitchSeam ovat olemassa mutta **eivät käytössä**.

## Tool-sivujen rakenne

Cream hero (H1 Bebas Neue, intro, back-link → /tools/) → Cream laskuri/taulukko-osio (ToolCard dark-overridella, cast-on ja yarn-estimator -sivuilla) → Cream SEO-sisältö → Cream FAQ (`<details>/<summary>`) → Waitlist CTA (cream, email-lomake, loading + success state) → Footer

## Gotchas

- `background` shorthand resetoi `background-image` → käytä `background-color` dot grid -osioissa
- JS-luodut DOM-elementit eivät saa Astron scoped data-attribuutteja → `:global()` CSS:ssä
- Globaali `a { color: var(--accent) }` voi yliajaa komponenttilinkkien värejä
- Osioilla EI saa olla `background: var(--cream)` — se peittää stripe-nauhan. Body hoitaa taustavärin.
- PhoneMockup-komponentissa scoped CSS viittaa sisäisiin elementteihin → käytä `:global()` wrapperia
- Stripe-nauhan safe padding: `--safe-pr-desktop` ja `--safe-pr-mobile` custom propertyt sisältöosioissa
- TrustSection näyttää hinnan €5.99 — tarkista ennen launchia
- Footerissa Needle Size Chart, Yarn Weight Chart ja Abbreviations linkkaavat `href="#"` — pitäisi osoittaa oikeisiin URL:eihin


<claude-mem-context>
# Memory Context

# [KnitTools-website] recent context, 2026-05-03 5:59am GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (19,031t read) | 1,943,527t work | 99% savings

### May 1, 2026
4646 9:28a ✅ Draft Removal Changes Committed and Pushed to v2-editorial Branch
4650 9:29a 🔵 Branch Divergence Shows 3 New v2-editorial Commits and 5 PR Merge Commits on Main
4651 9:30a ✅ Merged v2-editorial Into Main With Draft Removal and Recent Changes
4652 9:31a ✅ Main Branch Successfully Pushed to GitHub With Draft Removal Integration
4658 9:38a 🔵 Current Article Ordering Uses categoryRank on 12 of 38 Articles
4661 " 🔄 Renamed categoryRank to categoryOrder Across 12 Articles
4662 9:39a 🟣 Assigned categoryOrder Values to All 38 Articles Based on Learning Progression
4663 9:40a 🔄 Simplified Article Sorting Logic Using Unified categoryOrder Field
4665 " ✅ Build Verification Confirms New Article Ordering Applied Successfully
4666 " ✅ Deployed Article Ordering Update to Cloudflare Pages Preview
4667 " ✅ Staged Article Ordering Changes Across Schema, Articles, and Templates
4668 9:41a ✅ Committed and Pushed categoryOrder Refactoring to v2-editorial Branch
4669 9:49a 🔵 Cloudflare Pages Project Configuration Retrieved
4670 " 🔵 No Custom Environment Variables Required for Deployment
4671 " ⚖️ Manual Wrangler Deployment Workflow Retained Instead of Git Integration
4672 " 🔵 Production Deployment Out of Sync with Latest GitHub Commits
S467 Resolve SonarQube plugin startup warnings by completing CLI and hook installation (May 1, 10:01 AM)
S465 SonarQube plugin startup warnings - sonarqube-cli not found and hooks not configured (May 1, 10:01 AM)
S468 Complete SonarQube plugin integration by installing CLI and configuring authentication (May 1, 10:02 AM)
4674 10:03a 🔵 SonarQube CLI latest release verification
4675 10:04a 🔵 SonarQube CLI PowerShell installation script analysis
4676 10:43a ✅ SonarQube CLI installed to local system
4677 " ✅ SonarQube CLI added to PATH and verified working
S469 User provided SonarQube Cloud organization key for authentication configuration (May 1, 10:43 AM)
S471 Configure SonarQube Cloud authentication after CLI installation (May 1, 10:46 AM)
S472 Complete SonarQube Cloud authentication and verify connection status (May 1, 10:47 AM)
4679 11:25a ✅ SonarQube Claude integration completed with hooks installed
S470 Initiate SonarQube Cloud authentication with organization key insaner1980 (May 1, 11:25 AM)
S473 Complete SonarQube plugin integration and explain what's working and what requires Docker (May 1, 11:26 AM)
4678 11:28a ✅ SonarQube Cloud authentication configured successfully
S474 Verify SonarQube integration is complete without Docker dependency (May 1, 11:29 AM)
4680 11:31a 🔵 SonarQube CLI command capabilities explored
4731 6:13p 🔴 Fixed Google Search Console sitemap URL mismatch
4733 " ✅ Deployed sitemap redirect fix to Cloudflare Pages production
4737 " 🔵 Deployed Sitemap Fix Not Working in Production
4738 9:34p 🔴 Fixed Sitemap XML Issue with Cloudflare Pages _redirects File
4739 " 🔵 Cloudflare Pages _redirects File Enables URL Routing Without Server Functions
### May 3, 2026
4817 3:16a 🔵 PROJECT.md Documentation Outdated Compared to Live Code
4818 3:17a 🔵 Font System Uses Lalezar Not Caprasimo Despite Documentation
4819 " 🔵 Landing Page Has 8 Sections Including Undocumented PullQuote
4820 " 🔵 Hero Component Structure Completely Different From Documentation
4821 " 🔵 Marquee Contains 20 Feature Items Not 9 As Documented
4822 " 🔵 Body.landing Implements Inverted Color Palette For Dark Theme
4823 3:19a 🔵 Articles Section Fully Populated With 38 Published Articles Not Empty As Documented
4824 " 🔵 Git History Confirms Caprasimo to Lalezar Font Replacement in April 2026
4825 3:22a ✅ PROJECT.md updated to reflect current KnitTools website state
S568 Update PROJECT.md documentation to reflect current KnitTools website codebase state (May 3, 3:24 AM)
4839 5:26a 🔄 Teko Logo Font Subset to KnitTools Glyphs Only
4840 " 🔄 Removed Unused Caprasimo Display Font
4841 " 🟣 Teko Logo Font Subsetting Optimization
4842 5:28a 🟣 Font Optimization Deployed to Production
4848 5:30a ⚖️ Code Review Triage Decisions
4849 5:38a 🟣 Pinterest Content Removal and Release Cleanup
4850 " 🟣 Custom 404 Page Implementation
4851 " 🔵 Cloudflare Pages Deployment and Wrangler Authentication
**4843** 5:43a 🔵 **Build Verification Post-Font-Optimization**
After font optimization changes, production build verified successful. Astro 6 built 64 static pages including 38 articles, 6 tool pages, 12 Pinterest pin pages, and supporting routes. Font subsetting optimization confirmed in production output: Teko fonts reduced from 307KB (original TTF) to 2.4KB (WOFF2 subsets). Font preload declarations in BaseLayout.astro successfully reference the new subset files. @astrojs/sitemap integration generates sitemap-index.xml and sitemap-0.xml with Pinterest routes filtered out as configured.
~278t 🔍 109,991

**4844** " 🔵 **Broken Internal Link Detected**
Automated link validation script (Node.js with regex scanning all href/src/content attributes) detected one broken internal link in the production build. The knitting-size-charts tool page references an article with slug `how-much-yarn-for-a-sweater` which does not exist. The correct article is published as `yarn-for-sweater`. This is a simple typo in the href value that will result in a 404 if users click the link.
~217t 🔍 109,991

**4845** " 🔵 **Missing OG Image Asset**
BaseLayout includes Open Graph and Twitter Card meta tags referencing `/images/og-image.png` for social media previews. This asset does not exist in the public/images/ directory or anywhere in the codebase. When shared on social platforms, the link preview will either show a broken image or fall back to platform defaults. The OG image needs to be created and placed in public/images/ or the meta tag references should be removed/updated.
~190t 🔍 109,991

**4846** " 🔵 **Large Unused Assets Detected**
Asset size audit revealed three large image files in the public/ directory that appear unused. coming-soon-badge.png (1.1MB) is in the public root, while knit-texture.png and craft-table-flatlay.webp (totaling 1.5MB) are in public/images/. No references to these files were found in source code. These assets are copied to dist/ on every build, adding 2.6MB to the production payload despite potentially having no usage. They may be remnants from previous designs or planned features that were never implemented.
~243t 🔍 109,991

**4847** " 🟣 **Pinterest Pin Generation Infrastructure**
Pinterest marketing infrastructure implemented with 12 shareable pin designs covering the 6 free tools. Each tool has two pin variants (save-for-later infographic and click-to-use preview). Pin definitions in pinterest-pins.ts specify content, layout kind (steps, calculator mock, table, comparison cards, etc), variant color, and text tone. PinterestPinLayout component renders fixed 1000×1500px pages styled with the v11 editorial palette and typography. Automated screenshot generation script launches Playwright browser in headless mode, navigates to each /pinterest/[slug]/ route, waits for fonts to load, captures full-page screenshot at 2x scale, validates dimensions (2000×3000), and saves to gitignored pinterest-images/ directory. SEO properly configured: sitemap filter excludes Pinterest routes, robots.txt disallows crawling. This workflow allows updating pin content via TypeScript data edits and regenerating all 12 PNGs with a single command.
~462t 🛠️ 109,991


Access 1944k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>