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

# [KnitTools-website] recent context, 2026-05-01 9:33pm GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 44 obs (16,158t read) | 221,246t work | 93% savings

### May 1, 2026
4625 9:15a 🔵 Article Rendering Issue on Deployed KnitTools Website
4626 " 🔵 Build Process Generates All 38 Articles Successfully
4627 9:16a 🔵 Deployment Branch Mismatch Suspected
4628 " 🔵 Root Cause Found: Main Branch Has Only Initial Commit
4629 " 🔵 Main Branch Articles Directory Empty - Contains Only .gitkeep
4630 9:18a 🔵 Cloudflare Pages Configured to Deploy from Main Branch
4631 " 🔵 Deployment is Direct Upload Without Git Build Process
4632 9:19a 🔵 Live Site Confirms Only One Article Visible
4633 " 🔵 Article Pages Exist and Return 200 OK But Missing from Index
4635 " 🔵 Root Cause: 37 Articles Marked as Draft in Frontmatter
4634 9:20a 🔵 Local Build Contains All Articles But Deployed Version Shows Only One
4639 9:22a ✅ Removed Draft Flags from 37 Articles via Bulk Edit
4640 9:26a ✅ Successful Build With All Articles Now Visible in Index
4641 " ✅ Category Pages Now Display All 38 Articles Across Five Categories
4643 " ✅ Deployment Successful But Production Domain Not Yet Updated
4645 " 🔵 Preview Deployment Shows All 15 Articles While Production Domain Serves Old Content
4646 9:28a ✅ Draft Removal Changes Committed and Pushed to v2-editorial Branch
4647 " 🔵 v2-editorial Branch 22 Commits Ahead of Main With Zero Divergence
4648 " 🔵 Fast-Forward Merge Succeeded Locally But Push to Remote Main Rejected
4649 " 🔵 Remote Main Branch Already Merged v2-editorial via GitHub Pull Requests
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
S466 SonarQube plugin startup warnings - missing CLI and unconfigured hooks (May 1, 9:58 AM)
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
**4679** 11:25a ✅ **SonarQube Claude integration completed with hooks installed**
Completed SonarQube integration for Claude Code by running the global integration command with non-interactive mode. The setup executed in three phases: Discovery validated the SonarCloud connection and installed sonar-secrets binary (version 2.41.0.10709, Windows x86-64) for secrets scanning; Health Check verified token validity, server availability, and organization access while installing hooks; Final Verification confirmed all components functional. The integration now provides automatic secrets detection in prompts. MCP Server setup was skipped because no container runtime (Docker/Podman/Nerdctl) is installed on the system. This completes all three missing components from the original startup warnings: CLI installed, authentication configured, and hooks set up.
~415t 🛠️ 3,590

S470 Initiate SonarQube Cloud authentication with organization key insaner1980 (May 1, 11:25 AM)
S473 Complete SonarQube plugin integration and explain what's working and what requires Docker (May 1, 11:26 AM)
**4678** 11:28a ✅ **SonarQube Cloud authentication configured successfully**
Completed SonarQube Cloud authentication by connecting to the EU instance at sonarcloud.io with organization key insaner1980. The authentication token is securely stored in the operating system's keychain using Bun.secrets native integration (introduced in SonarQube CLI 0.10.0), eliminating the need for external keytar dependency. The sonar auth status command confirmed successful connection and token validation. This resolves the second of three missing components from the original plugin startup warnings.
~233t 🛠️ 1,456

**4680** 11:31a 🔵 **SonarQube CLI command capabilities explored**
Explored SonarQube CLI v0.10.0 command-line capabilities after installation. The CLI provides file-level scanning (verify), targeted workflow analysis (analyze for secrets/code quality), issue and project listing (list), and direct authenticated API access (api). The api command automatically handles V1/V2 API routing for both SonarQube Cloud and Server instances, supporting all HTTP methods with optional JSON request bodies. Integration commands support Claude Code AI agent hooks and Git pre-commit hooks. The tool is designed for terminal-based security vulnerability and code quality detection with comprehensive SonarQube platform access.
~339t 🔍 1,001

S474 Verify SonarQube integration is complete without Docker dependency (May 1, 11:32 AM)
**4731** 6:13p 🔴 **Fixed Google Search Console sitemap URL mismatch**
The KnitTools website was deployed to Cloudflare Pages with Astro's sitemap integration, which generates sitemap-index.xml as the primary sitemap. When the site was submitted to Google Search Console, the standard /sitemap.xml URL returned HTML content (the homepage) instead of the expected XML sitemap. Investigation revealed that accessing /sitemap-index.xml correctly served XML content with proper MIME type. The fix adds a Cloudflare Pages _redirects file with a 301 permanent redirect from /sitemap.xml to /sitemap-index.xml, ensuring search engines can discover the sitemap at the conventional URL while preserving Astro's default sitemap naming convention. The redirect file is copied to dist/ during build and will be processed by Cloudflare Pages on deployment.
~360t 🛠️ 32,731

**4733** " ✅ **Deployed sitemap redirect fix to Cloudflare Pages production**
The sitemap redirect fix was successfully deployed to production on Cloudflare Pages. The deployment process used `wrangler pages deploy ./dist --project-name knittoolsapp --branch main` to push the built site including the new `_redirects` file. Cloudflare Pages automatically recognizes and processes the `_redirects` file, implementing the 301 permanent redirect from /sitemap.xml to /sitemap-index.xml. Verification confirmed that accessing https://knittoolsapp.com/sitemap.xml now properly redirects to the Astro-generated sitemap-index.xml file with the correct application/xml MIME type, resolving the Google Search Console issue where /sitemap.xml was previously returning HTML homepage content.
~354t 🛠️ 54,780


Access 221k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>