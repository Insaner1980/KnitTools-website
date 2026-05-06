# Claude Code Instruction: SEO Fixes and Trailing Slash Consistency

<context>
Bing Webmaster Tools and Google Search Console flagged issues on knittoolsapp.com:

1. Homepage `<title>` is 9 characters, flagged "too short" by Bing.
2. Homepage meta description is 196 characters, flagged "too long" by Bing.
3. Footer logo image is missing an alt attribute.
4. Five tool pages reported as "Redirect error" in Google Search Console:
   - `/tools/knitting-size-charts`
   - `/tools/yarn-estimator`
   - `/tools/knitting-abbreviations`
   - `/tools/needle-size-chart`
   - `/tools/yarn-weight-chart`
5. 44 pages "Discovered, currently not indexed" in GSC, likely caused by the same root cause as #4.

The root cause for #4 and most of #5: the sitemap uses URLs with trailing slashes (correct, matching Astro's static folder output), but internal `<a href>` links throughout the codebase use URLs without trailing slashes. Cloudflare Pages 308-redirects no-slash URLs to with-slash URLs, creating redirect chains that Googlebot flags.

Live verification:
- `https://knittoolsapp.com/tools/yarn-estimator` returns 308, location `/tools/yarn-estimator/`
- `https://knittoolsapp.com/tools/yarn-estimator/` returns 200
- Same pattern for every `/tools/*` and `/articles/*` URL

The fix is to align all internal links with the trailing-slash format used in the sitemap, plus three small Bing-flagged metadata fixes on the homepage.
</context>

<task_1_homepage_meta>
**Goal**: Fix the `<title>` and meta description on the homepage only.

Currently the homepage renders `<title>KnitTools</title>` (9 characters) while `og:title` renders the longer string `KnitTools: Every Tool a Knitter Needs. One App. | KnitTools`. This asymmetry indicates that `<title>` and `og:title` are constructed from different sources in the layout chain. Either `BaseLayout.astro` has separate logic for the two tags, or `src/pages/index.astro` passes only "KnitTools" as the title prop and the og:title is computed elsewhere.

**Exact strings to use**:

- Title (50 characters): `KnitTools: Every Knitting Tool in One Android App`
- Meta description (151 characters): `An Android knitting app with AI. Row counter, pattern viewer, yarn scanner, four calculators, Ravelry, voice commands. One-time purchase, 14-day trial.`

**Steps**:

1. Read `src/layouts/BaseLayout.astro` and `src/layouts/PageLayout.astro` to understand how `<title>`, `<meta name="description">`, og:title, og:description, twitter:title, and twitter:description are constructed.

2. Read `src/pages/index.astro` to see what title and description props it passes.

3. Update so the homepage renders consistently:
   - `<title>` = the 50-character string
   - og:title = the 50-character string
   - twitter:title = the 50-character string
   - `<meta name="description">` = the 151-character string
   - og:description = the 151-character string
   - twitter:description = the 151-character string

4. If BaseLayout has asymmetric logic between `<title>` and og:title (likely the bug here), simplify so both come from the same prop. The asymmetry is the source of this issue and should be removed.

5. Do not modify other pages' titles or descriptions in this task. Only the homepage.
</task_1_homepage_meta>

<task_2_footer_logo_alt>
**Goal**: Add an alt attribute to the footer sealing logo.

In `src/components/Footer.astro`, the `/logo.webp` image (220×220 sealing logo) is rendered without an alt attribute. Bing flagged this as a missing alt.

Add: `alt="KnitTools sealing logo"`

This is a single-line change.
</task_2_footer_logo_alt>

<task_3_trailing_slash>
**Goal**: Make every internal link to `/tools/...` and `/articles/...` end with a trailing slash, so internal navigation matches the sitemap and avoids Cloudflare's 308 redirect chain.

**Files to inspect and update** (verify each, only change links that need it):

- `src/components/Footer.astro` (6 tool links plus 5 article-category links)
- `src/components/FreeToolsCallout.astro` (6 pill links)
- `src/components/Navbar.astro` (Tools, Articles links)
- `src/pages/tools/index.astro` (6 bento card hrefs)
- `src/pages/tools/*.astro` (every individual tool page may have a back link or cross-references)
- `src/pages/articles/index.astro` (category buttons, "View N more" links)
- `src/pages/articles/category/[slug].astro`
- `src/components/ArticleCard.astro`
- Any other component or page that hardcodes `/tools/` or `/articles/` URLs

**Pattern of change**:

```
href="/tools/cast-on-calculator"                  →  href="/tools/cast-on-calculator/"
href="/articles/how-to-measure-knitting-gauge"    →  href="/articles/how-to-measure-knitting-gauge/"
href="/articles/category/yarn"                    →  href="/articles/category/yarn/"
```

For dynamically-built URLs in template literals, add the trailing slash inside the literal:

```
href={`/articles/${post.slug}`}        →  href={`/articles/${post.slug}/`}
href={`/articles/category/${slug}`}    →  href={`/articles/category/${slug}/`}
```

**Do NOT change**:

- The root `/` link (already correct)
- Anchor links such as `#join`, `#main-content`
- External URLs (e.g. `https://finnvek.com/privacy#knittools`, sitemap URLs in robots.txt)
- URLs that already end with `/` (no-op)
- Query strings or URL parameters
- The `<link rel="canonical">` href if BaseLayout already builds it from `Astro.url` (Task 4 will make `Astro.url.pathname` always include the trailing slash)
- The og:url and twitter:url meta values (same reason as canonical)
</task_3_trailing_slash>

<task_4_astro_config>
**Goal**: Enforce trailing-slash convention at the build level so future regressions are caught automatically.

In `astro.config.mjs` (or `.ts`), add `trailingSlash: 'always'` to the existing config:

```js
export default defineConfig({
  // existing config: site, output, build, integrations
  trailingSlash: 'always',
})
```

After the change:

1. Run `npm run build` and confirm no trailing-slash warnings or errors appear.
2. If warnings appear, they point to internal links Task 3 missed. Fix them, rebuild, repeat until clean.
3. Confirm `dist/sitemap-0.xml` still contains URLs with trailing slashes (this should remain unchanged because the previous output was already correct).
</task_4_astro_config>

<constraints>
- Do not commit or push. Emma reviews and deploys manually after building.
- Patch-level changes only. No refactoring of surrounding code, no styling changes, no "improvements" beyond the scope of these four tasks.
- Do not modify sitemap config or sitemap output. It already uses trailing slashes correctly.
- Do not change pricing copy, brand voice, or any UX content beyond the homepage `<title>` and meta description specified in Task 1.
- Do not modify the `_redirects` file. The `/sitemap.xml` to `/sitemap-index.xml` redirect there is intentional and correct.
- If you discover unrelated issues during this work, note them in your final report rather than fixing them.
</constraints>

<verification>
After all four tasks, run these checks before reporting done:

1. `npm run build` completes without errors and without trailing-slash warnings.

2. `dist/index.html` contains:
   - `<title>KnitTools: Every Knitting Tool in One Android App</title>`
   - `<meta name="description" content="An Android knitting app with AI. Row counter, pattern viewer, yarn scanner, four calculators, Ravelry, voice commands. One-time purchase, 14-day trial.">`
   - Matching og:title, og:description, twitter:title, twitter:description
   - Footer logo image element with `alt="KnitTools sealing logo"`

3. Grep `dist/` for remaining no-trailing-slash internal links:

   ```bash
   grep -rE 'href="/tools/[^"]*[^/]"' dist/ || echo "OK: no /tools/ links missing trailing slash"
   grep -rE 'href="/articles/[^"]*[^/]"' dist/ || echo "OK: no /articles/ links missing trailing slash"
   ```

   Both grep commands should print the "OK" message and find nothing. Any matches are bugs that need fixing.

4. Confirm `astro.config` has `trailingSlash: 'always'`.

5. Confirm `dist/sitemap-0.xml` still contains URLs with trailing slashes (a quick `grep -c '/</loc>' dist/sitemap-0.xml` should return roughly 52, matching the previous count).

**Final report should include**:

- List of changed files
- Confirmation that all four tasks are complete
- Output of the two grep commands in step 3
- Any unrelated issues noticed during the work, listed but not fixed
</verification>
