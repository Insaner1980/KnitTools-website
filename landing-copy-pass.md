# Landing page copy and layout pass (post-hero)

This pass covers seven targeted changes across seven component files. The hero is already done and must not be touched. A separate pass for `src/pages/index.astro` head tags (meta description) is deferred and not part of this work.

## Scope

Files to modify in this pass:

- `src/components/TrustSection.astro` (change 1)
- `src/components/EditorsNote.astro` (changes 2 and 3)
- `src/components/FreeToolsCallout.astro` (change 4)
- `src/components/ClosingCTA.astro` (change 5)
- `src/components/PullQuote.astro` (change 6)
- `src/components/Footer.astro` (change 7)
- `src/components/PricingCards.astro` (change 8)

Files NOT to touch in this pass:

- `src/components/Hero.astro`
- `src/components/NineTools.astro`
- `src/components/Marquee.astro`
- `src/components/ArticlesTeaser.astro`
- `src/pages/index.astro`
- `src/styles/global.css` unless a shared CSS rule specifically needs to be removed as part of a deletion noted below

---

## Change 1: TrustSection Privacy column body

File: `src/components/TrustSection.astro`

Current body paragraph of the Privacy column (the third `.trust-col`, note that the sage-filled middle column is Privacy in this layout):

> Your stash, your patterns, your pace. All on your device, none of it sold to anyone.

Problem: the phrase "All on your device" is factually incorrect. The app uses the Gemini API for AI features (live voice on the counter, pattern AI, yarn OCR scanner, project summaries, voice journal). The text must reflect the honest truth.

Replace the body paragraph with:

> Your stash, your patterns, your pace. No account needed, nothing sold, nothing tracked.

The H3 (`No tracking. No ads.`) stays exactly as it is. The eyebrow (`Privacy`) stays exactly as it is. Only the body paragraph inside the Privacy column changes.

---

## Change 2: EditorsNote remove sign-off

File: `src/components/EditorsNote.astro`

Remove the sign-off element at the bottom of the note:

> *The KnitTools Editorial*

This is the italic serif paragraph (right-aligned, using `class="sign-off"` per the design system) that closes the note. Delete the markup entirely.

If `.sign-off` is only used by this deleted element, also remove the corresponding scoped CSS rule. If the rule might be referenced elsewhere, leave the rule in place and only remove the markup.

Reason: "The KnitTools Editorial" reads as an institutional or team voice. KnitTools is built by a single person, so institutional plural phrasing is inaccurate.

---

## Change 3: EditorsNote body fix "no cloud account"

File: `src/components/EditorsNote.astro`

In the first paragraph of the body, change the phrase `no cloud account` to `no account`.

Current full sentence:

> All under one roof, paid for once, ever. No subscription, no cloud account, no trial that quietly turns into a charge.

After edit:

> All under one roof, paid for once, ever. No subscription, no account, no trial that quietly turns into a charge.

Reason: "no cloud account" is ambiguous and can be misread as "the app uses no cloud at all," which is false (Gemini API is used for AI features). "No account" is unambiguous and true.

---

## Change 4: FreeToolsCallout reframe

File: `src/components/FreeToolsCallout.astro`

Current copy above the tool pills:

> **Free tools**
>
> Not ready for the app? Try one in your browser.

Replace the two-sentence lead with a single line. Keep the "Free tools" eyebrow. The new body reads:

> Use them right here, no install.

If the current structure uses two separate elements for the two sentences ("Not ready for the app?" and "Try one in your browser."), consolidate into a single element and apply the replacement copy. Keep the existing CSS class on whichever element remains visible.

Do not change the pills below or the "See all tools →" link.

Reason: "Not ready for the app?" frames the free tools as a consolation prize for visitors who are not ready to buy. These tool pages are the primary SEO entry points and should read as first-class destinations, not a fallback.

---

## Change 5: ClosingCTA meta line clarification

File: `src/components/ClosingCTA.astro`

Current meta line below the signup form:

> Free at launch. Pro €8.99 → €11.99 after two months. No card required.

Change only the first sentence. The new full meta line:

> Free tier from day one. Pro €8.99 → €11.99 after two months. No card required.

Do not change the arrow character, the price values, or the "No card required." tail.

Reason: "Free at launch" can be misread as "the app itself is free on launch day." "Free tier from day one" unambiguously refers to the perpetual free tier.

---

## Change 6: PullQuote remove attribution

File: `src/components/PullQuote.astro`

Current attribution below the quote:

> Vol. 01, No. 02

Remove the entire `<p class="attribution">` element and its content. The quote text above it stays unchanged.

If `.attribution` is only used by this deleted element, remove the corresponding scoped CSS rule. Also remove the centered decorative rules (`72px × 1px` hairlines) only if they were specifically tied to the attribution and are now meaningless. If the rules sit above and below the quote itself and frame it, leave them.

Reason: the masthead uses the convention "Vol. 01. Pre-launch". The PullQuote uses "Vol. 01, No. 02". Two different issue-numbering conventions on one page is a consistency bug. Removing the attribution is simpler than reconciling.

---

## Change 7: Footer seal-logo

File: `src/components/Footer.astro`

Add the seal-logo image to the footer, centered above the copyright line.

Insertion point: inside the footer's inner container, after the 3-column link grid (`.cols`) and immediately before the copyright paragraph (`<p class="copyright">`).

Markup to insert:

```html
<img
  src="/logo.webp"
  alt=""
  class="footer-seal"
  width="48"
  height="48"
  aria-hidden="true"
/>
```

Add scoped CSS to the component:

```css
.footer-seal {
  display: block;
  margin: 32px auto 16px;
  width: 48px;
  height: 48px;
  opacity: 0.85;
}
```

Constraints specific to this change:

- Do not rotate the seal. It sits straight in the footer, unlike the hero treatment.
- Do not add a hover effect, scale, or transition.
- Do not wrap it in an anchor tag or link it anywhere.
- Alt text stays empty and `aria-hidden="true"` is present because the copyright text already provides the brand attribution in the DOM.

---

## Change 8: PricingCards Pro card trial line placement

File: `src/components/PricingCards.astro`

Currently the Pro card has one combined footnote at the very bottom:

> 14-day free trial. No credit card. Rises to €11.99 two months after launch. Permanently. No subscription, ever.

This buries the trial promise at the end of the card. Split it into two parts: move the trial portion up near the price, leave the launch-promo portion as the bottom footnote.

After the price element (the H3 that shows "€8.99" plus the "one-time" mono suffix) and before the "Everything in Free, plus:" label, insert a new small line:

> 14-day free trial. No credit card required.

Suggested styling for this new line: Lora italic, 14px, `--paper` color (the Pro card is terracotta-filled so paper text contrasts). Margin-top around 4px, margin-bottom around 24px so it visually groups with the price above but leaves air before the feature list below.

Rewrite the bottom footnote on the Pro card to:

> Rises to €11.99 two months after launch. Permanently. No subscription, ever.

The Pro card H3 (the "€8.99" price), the "one-time" mono suffix, the "Everything in Free, plus:" label, and the i–viii feature list all stay exactly as they are. Only the trial phrase is relocated and the bottom footnote is shortened accordingly.

The Free card is not touched in this change.

---

## Constraints

These apply across all eight changes:

- Do not touch the hero in any file.
- Do not add a `·` middle-dot separator anywhere in copy written here. The existing section-label patterns (`Nº 01 · Features`, `Nº 02 · Principles`, `Nº 03 · Pricing`) are pre-existing design system conventions and stay as they are.
- Do not introduce em-dashes (`—`) anywhere in copy.
- Do not use "we", "our", "us", or any first-person plural in any copy.
- Do not claim knitter authorship or knitter authenticity in any copy ("by a knitter", "from a knitter", "made by knitters", etc.). The author of the app is not a knitter and such claims would be false.
- Do not rename any existing CSS class, ID, or CSS custom property.
- Do not add new dependencies, fonts, scripts, or assets. The only asset referenced is the existing `/logo.webp`.
- Do not refactor adjacent code that looks messy but is not listed in these changes.
- Do not add emoji.
- If any of these changes appears to conflict with an existing constraint in the code that these instructions did not anticipate, stop and ask before improvising.

---

## Verification

After editing, run dev mode and confirm each of the following on desktop at around 1280px:

1. TrustSection Privacy column body reads "Your stash, your patterns, your pace. No account needed, nothing sold, nothing tracked." with no mention of "on your device".
2. EditorsNote has no italic sign-off paragraph at the bottom. The note ends after the second body paragraph.
3. EditorsNote body reads "no subscription, no account, no trial that quietly turns into a charge." (not "no cloud account").
4. FreeToolsCallout shows the "Free tools" eyebrow, followed by "Use them right here, no install." and then the pills. The phrase "Not ready for the app?" appears nowhere.
5. ClosingCTA meta line starts with "Free tier from day one." and keeps the rest unchanged.
6. PullQuote shows only the quote, with no "Vol. 01, No. 02" attribution below it.
7. Footer shows a small 48px seal logo centered above the copyright line, not rotated, not linked.
8. PricingCards Pro card shows "14-day free trial. No credit card required." in a small italic line right under the €8.99 price, and the bottom footnote reads "Rises to €11.99 two months after launch. Permanently. No subscription, ever." with no duplicated trial phrasing.

Resize the browser to about 375px wide and confirm nothing overflows horizontally in any of the touched sections. Tab through the page with the keyboard and confirm focus rings are visible where interactive elements exist (signup forms, pills, links).
