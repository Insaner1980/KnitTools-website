# Instruction 01: Content and Copy Updates

## Context

You are updating the KnitTools landing page (`src/pages/index.astro`) for Emma's KnitTools website. This is a pre-launch landing page for a premium Android knitting toolkit app. The goal of this instruction is to update copy, remove outdated or unwanted content, and convert the existing "Get the App" CTAs into waitlist signup forms.

**This instruction is pure content work.** No layout changes, no new components, no palette changes. Those come in later instructions.

**Current authoritative pricing** (may differ from what's in the existing component files — update wherever you find it):
- €8.99 one-time launch price
- Rises to €11.99 two months after launch
- 14-day free trial
- No subscription

**Brand voice:** Warm, direct, written like a knitter talking to another knitter. No marketing jargon, no em-dashes, no generic SaaS copy. Short sentences. Periods, commas, and colons instead of em-dashes.

## Task 1: Replace Hero copy and convert CTA to waitlist form

In `src/components/Hero.astro`:

**Replace the H1** with:
```
Pick up where you left off.
```
The phrase "left off." should be styled as an accent (italic, burnt orange color — reuse the existing accent styling convention used elsewhere on the site for accent words).

This headline works on two levels: it's a knitting term (picking up stitches) and it describes the core promise of the app (remembering your place when you return to a project after days or weeks away).

**Replace the eyebrow/tag** above the H1 with: `A knitting toolkit for Android · launching soon`

**Replace the hero subheading** with:
```
The row you were on, the yarn you forgot, the pattern that made no sense at midnight. KnitTools remembers it all, so the only thing you need to do is keep knitting.
```

This subheading names three specific moments every knitter recognizes, then resolves them in a single sentence. It bridges from the emotional hook of the H1 to the practical promise of the app.

**Replace the existing email signup form** (currently labeled "NOTIFY ME") with a waitlist form. Use the same visual pattern you'd use for the existing email signup, but:
- Placeholder text: `your@email.com`
- Button label: `Join the list`
- Form action: leave as `#` for now (Emma will add the real endpoint later)
- Below the form, display this meta line:
  `Lock in the launch price: €8.99 → €11.99 two months after launch`
- After successful submit (JS-only for now, preventDefault), show a success message:
  `You're in. We'll email you the moment it's ready.`

**Remove the two "Coming soon on Google Play / Amazon Appstore" badges** from the hero entirely. These reappear in no section.

**Remove the four floating labels** (Voice Commands, Row Reminders, Session Timer, Pattern Viewer) around the phone mockup. They add visual noise on mobile.

## Task 2: Update Navbar CTA

In `src/components/Navbar.astro`:

Change the `GET THE APP` link text to `JOIN THE WAITLIST`. Link target: `#final-cta` (or whatever the final CTA section's id is — see Task 7).

## Task 3: Replace TrustSection copy

In `src/components/TrustSection.astro`:

Replace the entire trust section content with three promise items. Keep the existing visual layout (three items in a row on desktop, stacked on mobile). The three items:

**Item 1**
- Label: `PRICE`
- Headline: `Pay once. Own it.`
- Body: `€8.99 for the whole toolkit. After launch the price rises to €11.99, so if you're going to buy it, buy it early. No subscription, ever.`

**Item 2**
- Label: `PRIVACY`
- Headline: `No tracking. No ads.`
- Body: `Your stash, your patterns, your pace. All on your device, none of it sold to anyone.`

**Item 3**
- Label: `OFFLINE`
- Headline: `Works on the sofa.`
- Body: `Full row counter, pattern viewer, and stash, offline. WiFi drops mid-row? You won't notice.`

**Remove the old pricing reference** (currently shows €5.99 — this is outdated).

**Important:** Styling of headlines should use the existing accent styling (italic + burnt orange) on the accented phrase:
- `Pay once. *Own it.*`
- `No tracking. *No ads.*`
- `Works *on the sofa.*`

Where asterisks indicate the accent-styled part.

**Note:** A fourth promise item (Languages) will be added in Instruction 03. For now, keep the layout as three items.

## Task 4: Rewrite ClosingCTA section

In `src/components/ClosingCTA.astro`:

- Change the H1 to: `Where every stitch counts.` with `counts.` as the accent (italic + burnt orange).
- Change the eyebrow from `Available now` (or whatever it currently says) to: `Be there at launch`
- Replace the `GET THE APP` button with a waitlist form matching the hero form pattern:
  - Placeholder: `your@email.com`
  - Button label: `Reserve my price`
  - Action: `#`
  - Same success message on submit as hero
- Replace the meta rows below with these three lines:
  ```
  €8.99 launch price · rises to €11.99 two months after launch
  14-day free trial · no credit card required
  Android 10 or newer · no spam, one email at launch
  ```
- Remove both "Coming soon on Google Play / Amazon Appstore" badges.
- Add id attribute `final-cta` to the section for the navbar link.

## Task 5: Remove Marquee section

In `src/pages/index.astro`:

Remove the `<Marquee />` import and usage. The infinite-scroll marquee is not needed. The file `src/components/Marquee.astro` can stay but is no longer imported.

## Task 6: Update Footer

In `src/components/Footer.astro`:

Replace the footer content with this structure. Keep the overall dark background and typographic style, but reorganize content:

**Top row** (visible logo + wordmark on left, no "by Finnvek" tagline):
- Existing KnitTools logo mark + wordmark stay on the left.
- Nothing on the right of the top row for now — this space will be used later (instruction 03).

**Links section** — three columns as currently, but with these links:

TOOLS column:
- Cast On Calculator → `/tools/cast-on-calculator`
- Yarn Estimator → `/tools/yarn-estimator`
- Needle Size Chart → `/tools/needle-size-chart`

ARTICLES column:
- Gauge & Calculations → `/articles?category=gauge`
- Yarn → `/articles?category=yarn`
- Needles → `/articles?category=needles`
- Techniques → `/articles?category=techniques`
- App & Tools → `/articles?category=app`

APP column:
- Launching soon (no link, plain text)
- Privacy → `https://finnvek.com/privacy` (external link)

**Bottom row** — single line, all meta info:
```
Finnvek · contact@finnvek.com · © 2026
```

Remove:
- The "by Finnvek" tagline anywhere it appears
- Any "made slowly, in Finland" type copy
- "Support" link (replaced by contact email)
- "Press kit" link (not needed yet)

## Task 7: Global copy find-and-replace

Do a global check for these strings in all `.astro`, `.md`, and `.mdx` files in `src/`:

- Replace any instance of `€5.99` with `€8.99`
- Replace any instance of `€4.99` with `€8.99`
- Replace any instance of `7-day trial` with `14-day trial`
- Replace `no card required` with `no credit card required`
- Replace every em-dash (`—`) with either a period, colon, or comma depending on context. If unsure, use a period. Do not leave any em-dashes in user-facing copy.

## Task 8: Remove unused "AI uses cloud" negative framing

If you find this sentence anywhere on the site:
```
WiFi drops mid-row? You won't notice. The AI features use cloud — everything else doesn't.
```
Replace it with just:
```
Works on the sofa, on the train, at the summer cottage.
```

The AI cloud dependency will be communicated in-app during onboarding, not on the landing page.

## Verification checklist

After completing this instruction, verify:

- [ ] Every €5.99, €4.99, "7-day" reference is gone
- [ ] No em-dashes remain in user-facing copy
- [ ] Both hero and final CTA have working waitlist forms (even with placeholder `#` action)
- [ ] Navbar "GET THE APP" now says "JOIN THE WAITLIST"
- [ ] Marquee no longer renders on the page
- [ ] Footer is single line at bottom with `Finnvek · contact@finnvek.com · © 2026`
- [ ] "made slowly" and "by Finnvek" tagline are gone
- [ ] Site builds without errors (`npm run build` or equivalent)
- [ ] Page still renders correctly on mobile (it's mobile-first)

Do not modify color variables, fonts, or component layout in this instruction. Those come in instructions 02 and 03.
