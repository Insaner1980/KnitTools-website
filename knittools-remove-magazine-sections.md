# KnitTools — Remove Magazine Sections from Landing Page

## Context

The v11 retro redesign removed magazine vocabulary from the hero (VOL/EST/FIG/Nº/§ markers, "Knitter's Journal" tagline, hero horizontal rules). However, two sections further down the landing page still carry editorial magazine framing that does not belong in the new direction:

1. **"From the Editor"** — an editorial intro block introducing the issue
2. **"Further Reading / From the *Journal*"** — a three-card preview of forthcoming articles, with "CONTINUE READING →" links and an "Articles forthcoming. Full journal opens with launch." caption below

Both sections directly contradict the decision to drop the magazine framing. They need to be removed entirely.

## Goal

Remove both sections from the landing page (`src/pages/index.astro`) without replacement. The space they occupied is simply gone — sections above and below should now sit directly adjacent.

## What to remove

### "From the Editor" section

Remove the entire section, including:

- The "FROM THE EDITOR" eyebrow label
- The two paragraphs of body text starting "This issue introduces KnitTools..." and "The pre-launch list opens through the season..."
- All decorative framing around the block: horizontal rule lines above and below, vertical separator lines on the sides (these are magazine-frame elements that match the hero rules we already removed)
- Any container `<section>`, `<div>`, or `<article>` wrapping this block

### "Further Reading / From the *Journal*" section

Remove the entire section, including:

- The "FURTHER READING" eyebrow label
- The "From the *Journal*." headline
- The horizontal rule below the headline
- All three article preview cards:
  - TECHNIQUE — "READING A PATTERN WITHOUT LOSING THE THREAD" + description + "CONTINUE READING →" link
  - REFERENCE — "YARN WEIGHTS, METERS, AND WHAT THE LABEL IS TELLING YOU" + description + "CONTINUE READING →" link
  - YARN — "ON STASH, DYE LOTS, AND WHY IT MATTERS" + description + "CONTINUE READING →" link
- The vertical separator lines between the three cards
- The horizontal rule below the cards
- The italic caption "Articles forthcoming. Full journal opens with launch."
- Any container `<section>`, `<div>`, or `<article>` wrapping this block

## Where these sections live

They appear in `src/pages/index.astro` between the existing sections. Search the file for:

- "From the Editor" or "FROM THE EDITOR"
- "Further Reading" or "FURTHER READING"
- "From the Journal"
- "CONTINUE READING"
- "Articles forthcoming"

Remove all matching markup and any associated component imports if those components become unused after removal.

## Files to check

- `src/pages/index.astro` — primary location of both sections
- `src/components/` — if either section is implemented as a separate component (e.g. `FromTheEditor.astro`, `FurtherReading.astro`, `JournalTeaser.astro`, `ArticleTeaserCard.astro`), remove those component files entirely
- If the components are removed, remove their import statements from `index.astro`

## Important — articles infrastructure stays

Do NOT touch:

- `/src/pages/articles/index.astro` — the articles listing page stays
- `/src/pages/articles/[...slug].astro` — the dynamic article route stays
- `/src/content/articles/` — content collection stays
- `src/content.config.ts` — schema stays
- The "ARTICLES" link in `Navbar.astro` — stays
- The "ARTICLES" link in `Footer.astro` — stays
- `ArticleLayout.astro` — stays

Articles infrastructure remains fully intact. Only the landing-page teaser/preview is removed. Users still reach articles through the navbar link when articles are eventually published.

## What NOT to do

- Do NOT replace these sections with anything else. The space they occupied is intentionally empty for now. A small replacement element may be considered later, but not as part of this change.
- Do NOT adjust spacing, padding, or margins of adjacent sections. The sections above and below should now sit at their natural spacing.
- Do NOT change anything else on the landing page — hero, AI section, free tools, principles, pricing, footer all stay as they are.

## Verification

After the change, scroll the landing page from top to bottom and confirm:

1. No "FROM THE EDITOR" eyebrow appears anywhere
2. No "FURTHER READING" or "From the Journal" section appears anywhere
3. No "CONTINUE READING →" links appear on the homepage
4. No "Articles forthcoming" caption appears
5. The landing page flow is: hero → features (9 tools) → free tools → principles → pricing → quote → footer (or whatever the current order is, minus the two removed sections)
6. Navbar and Footer "ARTICLES" links still work and lead to `/articles/`
7. `/articles/` page still loads correctly with its empty state
8. No console errors about missing components or imports
9. Build succeeds: `npm run build`
