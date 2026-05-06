# Claude Code Instruction: Manual Cloudflare Web Analytics Snippet

<context>
Cloudflare Web Analytics auto-injection has been buggy: it injects a `<script>` tag with a malformed `integrity` attribute that browsers block via Subresource Integrity (SRI), so analytics never runs. Emma has switched the Cloudflare-side setting from "Enable" (auto-inject) to "Enable with JS Snippet installation" (manual). The clean snippet must now be added to the site's HTML manually. After this change, the site will collect analytics correctly and the integrity error in the browser console will go away.

This task is a single-snippet addition. No other changes.
</context>

<task>
Add the following Cloudflare Web Analytics snippet to `src/layouts/BaseLayout.astro`, placed at the end of the `<head>` section, just before the closing `</head>` tag.

**Exact snippet to add** (paste verbatim, do not modify):

```html
<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "90537a60e26f433485a8fdaf6b076843"}'></script><!-- End Cloudflare Web Analytics -->
```

**Placement rules**:

- Inside `<head>...</head>`
- After all existing `<head>` content (title, meta, canonical, OG/Twitter, favicons, font preload tags)
- Immediately before the closing `</head>` tag
- Do not place it inside any conditional, fragment, or layout slot. It must always render on every page.
</task>

<critical_constraints>
- **Do NOT add an `integrity` attribute** to the `<script>` tag. The whole purpose of this manual setup is to avoid the broken auto-injected integrity attribute that was breaking analytics.
- **Do NOT modify the token** (`90537a60e26f433485a8fdaf6b076843`). It is correct as provided.
- **Do NOT modify the script src URL**. It must remain `https://static.cloudflareinsights.com/beacon.min.js` exactly, with no version hash, no query string, no other modifications.
- **Do NOT change the `defer` attribute** or replace it with `async`. `defer` is correct here.
- Do not move, refactor, or reformat any other code in `BaseLayout.astro`.
- Do not add the snippet to any other file (no PageLayout, no individual pages, no components). Adding it once in BaseLayout is sufficient because every page uses BaseLayout.
- Do not commit or push. Emma reviews and deploys manually.
</critical_constraints>

<verification>
After the change:

1. `npm run build` completes without errors.

2. Confirm the snippet is in the built HTML on multiple pages. Run:

   ```bash
   grep -l 'cloudflareinsights.com/beacon.min.js' dist/index.html dist/tools/index.html dist/articles/index.html dist/404.html
   ```

   All four files should be listed (i.e., grep prints all of them). If any are missing, the snippet was placed in a wrong location and is not propagating to all pages.

3. Confirm there is **no** `integrity` attribute on the beacon script in the built HTML:

   ```bash
   grep -E 'cloudflareinsights\.com/beacon\.min\.js[^>]*integrity' dist/index.html
   ```

   This must return **no matches**. If it does match, an integrity attribute was accidentally added and must be removed.

4. Confirm the token is intact:

   ```bash
   grep -o '"token": "[a-f0-9]*"' dist/index.html
   ```

   Output should show `"token": "90537a60e26f433485a8fdaf6b076843"`.

**Final report**:

- Confirm BaseLayout.astro was modified
- List the line number(s) where the snippet was added
- Confirm verification steps 1-4 all pass
- Note any unrelated issues observed (do not fix)
</verification>
