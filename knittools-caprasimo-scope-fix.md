# KnitTools — Caprasimo Scope Correction

## Context

Following the v11 retro redesign, Caprasimo is currently being applied too broadly across the page. It has replaced Bebas Neue in places where it should not be — small UI elements, eyebrow labels, button text, navigation, marquee text, card category tags, and AI panel labels. This makes the page feel typographically chaotic because Caprasimo is a heavy, statement-strength display face that competes for visual attention wherever it appears.

This instruction corrects the typography scope. **The previous redesign instruction incorrectly consolidated `--font-label` to Caprasimo. That was wrong.** General Sans should take over the UI-text role that Bebas Neue used to fill.

## Goal

Restrict Caprasimo to genuine display surfaces. Move all small-text and UI-text usage to General Sans. Keep the existing v11 work in place; this is a typography scope refinement, not a redesign.

## Font usage scope (authoritative)

This table is the authoritative reference. If any element does not match this scope after the change, fix it.

### Caprasimo — display only

Use Caprasimo ONLY for these elements:

| Element | Examples |
|---------|----------|
| H1 (hero headline) | "All your knitting tools. *In one app.*" |
| H2 (section headlines) | "Every tool, *talking to each other*", "What you can *count on*", "AI that *knows knitting*", "Use them right here, no install." |
| Card titles | "ROW COUNTER WITH MEMORY", "PATTERN VIEWER THAT FOLLOWS ALONG", "FOUR CALCULATORS, QUIETLY WORKING", "RAVELRY, THE WAY IT SHOULD FEEL", "REFERENCE, ONE TAP AWAY", "YARN SCANNER FOR THE LABEL GRAVEYARD", "PROGRESS PHOTOS, JUST FOR YOU", "INSIGHTS WITHOUT THE PRESSURE", "A WIDGET ON YOUR HOME SCREEN" |
| Principles card titles | "PAY ONCE. OWN IT.", "NO TRACKING. NO ADS.", "SPEAKS YOUR LANGUAGE." |
| Pull quote | "One tool for every row. One price for every needle. One app for every project." |
| Tool page H1s | (on `/tools/*` pages) |

That is the complete list. If an element is not in this table, it must NOT use Caprasimo.

### General Sans — everything else

Use General Sans (with appropriate weight) for ALL other text on the page:

| Element | Suggested weight | Notes |
|---------|------------------|-------|
| Body paragraphs | 400 | Default reading text |
| Hero intro paragraph | 400 | "The row you were on, the yarn you forgot..." |
| Card descriptions | 400 | All card body copy |
| Eyebrow labels | 500 or 600, uppercase, letter-spacing 0.08–0.12em | "AN ANDROID APP FOR KNITTERS", "FEATURES", "PRINCIPLES", "PRICING", "FREE FOREVER", "FREE TOOLS" |
| Tier labels | 500, uppercase, letter-spacing 0.08–0.12em | "FREE FOREVER  5 TOOLS", "PRO €8.99  4 TOOLS + AI" |
| Card category tags (pill labels) | 500 or 600, uppercase, letter-spacing 0.08–0.10em | "COUNTER", "PATTERN", "CALC", "RAVELRY", "REFERENCE", "STASH", "PHOTOS", "INSIGHTS", "WIDGET", "AI" |
| Navigation links | 500, uppercase, letter-spacing 0.08–0.10em | "TOOLS", "ARTICLES" |
| Buttons | 500 or 600, uppercase, letter-spacing 0.08–0.10em | "JOIN THE LIST", "NOTIFY ME AT LAUNCH", "CAST ON", "YARN ESTIMATOR", etc. |
| Marquee items | 500, uppercase, letter-spacing 0.08–0.10em | "PROGRESS PHOTOS", "INSIGHTS", "WIDGET", "VOICE COUNTER", "VOICE JOURNAL", "ROW COUNTER", etc. |
| Form inputs and placeholders | 400 | Email field, etc. |
| AI section subheadings | 600 | "Live voice on the counter", "Pattern intelligence", "Stash and project memory", "Voice or text journal" |
| AI section roman numerals | 400 italic | i, ii, iii, iv (these are NOT Caprasimo — they are decorative numerals in General Sans italic, OR optionally in a complementary serif italic; do NOT make them heavy display) |
| AI section meta labels | 500, uppercase, letter-spacing 0.08–0.10em | "TRANSCRIPT · LIVE", "ROW 85", "YOU", "AI", "LISTENING" |
| AI section transcript text | 400 italic | "Next row.", "Row 85. Two more before your sleeve increase." |
| Meta text (small print) | 400 | "Coming 2026 to Google Play and Amazon Appstore. 14-day free trial.", footer text, captions |
| Footer | 400 / 500 | All footer text including column headings |
| FAQ questions and answers | 400 / 500 | On tool pages |

### Teko — logo only

Teko remains used ONLY in `PageBrandMark.astro` for the "KnitTools" logo text. Nowhere else.

If the logo currently uses Caprasimo or any other font, restore it to Teko.

## CSS variables

Update `src/styles/global.css` so the variables match this scope:

```css
:root {
  --font-display: 'Caprasimo', Georgia, serif;
  --font-body: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-logo: 'Teko', sans-serif;
  /* Remove --font-label entirely. UI labels use --font-body with weight + letter-spacing. */
}
```

The previous instruction said `--font-label` should be Caprasimo. **Remove the `--font-label` variable.** Replace any existing usage of `var(--font-label)` with `var(--font-body)` and apply the appropriate weight, uppercase, and letter-spacing per the table above.

## How to verify

After the change, scroll through the homepage and the tool pages and confirm:

1. **Hero**: Only "All your knitting tools. *In one app.*" is in Caprasimo. The eyebrow "AN ANDROID APP FOR KNITTERS", the intro paragraph, the email field, the "NOTIFY ME AT LAUNCH" button, and the meta line about pricing are ALL in General Sans.

2. **Navigation**: "KNITTOOLS" logo in Teko (in `PageBrandMark`). "TOOLS", "ARTICLES", "JOIN THE LIST" all in General Sans (uppercase, medium weight, letter-spacing).

3. **Section eyebrows**: "FEATURES", "FREE FOREVER  5 TOOLS", "PRO €8.99  4 TOOLS + AI", "PRINCIPLES", "PRICING" all in General Sans (uppercase, medium weight, letter-spacing). NOT Caprasimo.

4. **Section H2s**: "Every tool, *talking to each other*" etc. in Caprasimo. Correct.

5. **Cards**: The card pill labels ("COUNTER", "PATTERN", etc.) in General Sans. The card titles ("ROW COUNTER WITH MEMORY", etc.) in Caprasimo. The card descriptions in General Sans.

6. **Marquee**: All marquee items ("PROGRESS PHOTOS", "INSIGHTS", "WIDGET", etc.) in General Sans (uppercase, medium weight, letter-spacing). NOT Caprasimo. The marquee should read as a quiet running label band, not as a second headline layer.

7. **Free tools button row**: "CAST ON", "YARN ESTIMATOR", "YARN WEIGHTS", "NEEDLE SIZES", "SIZE CHARTS", "ABBREVIATIONS" in General Sans. NOT Caprasimo.

8. **AI section**: 
   - "AI" pill label in General Sans
   - "AI THAT *KNOWS KNITTING*" in Caprasimo (this is the H2)
   - "Live voice on the counter", "Pattern intelligence", "Stash and project memory", "Voice or text journal" in General Sans semibold
   - Roman numerals (i, ii, iii, iv) in General Sans italic, smaller, decorative — NOT Caprasimo
   - "TRANSCRIPT · LIVE", "ROW 85", "YOU", "AI", "LISTENING" in General Sans (uppercase, medium, letter-spacing)
   - Transcript text ("Next row.", "Row 85. Two more...") in General Sans italic

9. **Footer**: All footer text in General Sans.

10. **Tool pages**: H1 in Caprasimo. Everything else (FAQ, body, buttons) in General Sans.

## Why this matters

Caprasimo is a Cooper Black descendant — bold, soft, character-rich, deeply 70s. It works as a statement face. When applied to small UI text, it becomes visual noise: every label competes with every headline for attention, the page loses hierarchy, and the retro tone tips into pastiche.

General Sans is a neutral humanist sans with subtle warmth. It carries UI text quietly so the Caprasimo headlines can do their job. The contrast between the two is intentional: it is what makes the page feel "warm modern craft tool" rather than "70s pastiche".

## What NOT to change

- Do NOT change the page structure, sections, or layouts
- Do NOT change colors or card backgrounds
- Do NOT change the hero copy ("All your knitting tools. *In one app.*")
- Do NOT change the italic emphasis pattern in headlines
- Do NOT touch the AI section's structure, just its typography per the table above
- Do NOT add `--font-label` back as a Caprasimo alias

## Open question (only flag, do not change)

If any element in the table feels visually wrong after the change (for example, if a card title in Caprasimo feels too heavy at its current size), flag the issue with a screenshot. Do NOT adjust sizes or weights without approval. Size adjustments are a separate decision after we see how the scope correction lands.
