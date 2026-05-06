# Claude Code Instruction: v10 Orphan Cleanup

<context>
The KnitTools website was redesigned from v10 to v11 retro-editorial style on 2026-04-23. Several v10 components were orphaned during that redesign and have been sitting on disk unused since.

This task removes those orphaned files and fixes a small number of related issues. It is explicitly NOT a wider refactor or visual update. The previous deploy (SEO and trailing-slash fixes) is now in production. This is a separate, focused cleanup deploy.

Read each section in order and follow the boundaries strictly. Sections are explicit about what to delete, what to fix, what to leave alone, and what is intentionally deferred to a future task.
</context>

<scope_summary>
**In scope for this task** (do these now):
- Delete 12 specific v10 orphan component files
- Clean up dead imports in `PageLayout.astro` that reference the deleted components
- Remove the redundant `browserTitle` override on the 404 page
- Investigate and report (without modifying) two suspected dead code paths

**Out of scope for this task** (do NOT do these now, even if you notice them):
- Any change to CSS files except as required by Task 2 below
- Any change to v10 CSS tokens (`--accent`, `--cream`, `--bebas-*`)
- Any change to tool pages (`src/pages/tools/*.astro`)
- Any change to article content or article components
- Any visual or stylistic adjustments
- Any change to build, routing, or sitemap configuration
- Any commits or pushes (Emma reviews and deploys manually)
</scope_summary>

<task_1_files_to_delete>
**Goal**: Delete 12 v10 orphan component files, after verifying each is genuinely unused.

**Files to delete** (all under `src/components/`):

```
PhoneMockup.astro
FeatureKnit.astro
FeatureOrganize.astro
FeatureCalculate.astro
FeatureScanSave.astro
FeatureLearn.astro
FreeToolsMention.astro
PhoneInset.astro
ToolClosingCTA.astro
StitchSeam.astro
StripeRibbon.astro
PageBrandMark.astro
```

The exact filenames may vary slightly (capitalization, extension). Begin by running `ls src/components/` and matching the actual filenames. Use those exact paths.

**Verification procedure for each component before deletion**:

Run a workspace-wide grep for the component name to find any imports or references:

```bash
grep -rn "ComponentName" src/ public/ --include='*.astro' --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' --include='*.md' --include='*.mdx' --include='*.css' --include='*.json'
```

Example for `PhoneMockup`:

```bash
grep -rn "PhoneMockup" src/ public/ --include='*.astro' --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' --include='*.md' --include='*.mdx' --include='*.css' --include='*.json'
```

**Interpret grep results**:

- **Zero matches outside the component's own file**: the component is truly orphaned. Delete `src/components/<ComponentName>.astro`.
- **Only commented-out references** (lines starting with `//`, `<!--`, or inside `/* ... */`): treat as zero matches. Delete the component, then also remove the dead comment(s) where the references appeared.
- **Active references** (an import statement, a JSX-style usage, or a non-comment string match): **do NOT delete**. Skip this component, leave the file in place, and add an entry to your final report describing where the active reference is.

After processing all 12 components, run `npm run build` once. If the build fails with "Cannot find module" or similar, the failing import points to either a wrongly-deleted component (restore from git and report) or a stale import in another file (handled in Task 2 below).
</task_1_files_to_delete>

<task_2_files_to_fix>
**Goal**: Two small in-place fixes after the deletions.

### Fix 2a: Clean up `src/layouts/PageLayout.astro`

`PageLayout` may import or render some of the components deleted in Task 1 (most likely `StripeRibbon` and `PageBrandMark`).

Steps:

1. Open `src/layouts/PageLayout.astro`.
2. Remove any `import` statements that reference components deleted in Task 1.
3. Remove any unreachable JSX/template code that would have rendered those deleted components. For example, if the existing logic is `{showStripe && <StripeRibbon />}`, remove both the conditional check and the orphaned reference.
4. **Keep the `showStripe` prop in the component's frontmatter / Props interface as a no-op.** Existing tool pages still pass `showStripe={false}` to PageLayout, and removing the prop entirely would generate Astro warnings about unknown props. Leaving the prop accepted but unused preserves backward compatibility.

Files modified: only `src/layouts/PageLayout.astro`.

### Fix 2b: Remove redundant `browserTitle` override in `src/pages/404.astro`

After the previous deploy fixed BaseLayout's title-handling, the 404 page no longer needs the explicit `browserTitle="Page Not Found | KnitTools"` override. Setting `title="Page Not Found"` alone now produces the same final `<title>` because BaseLayout appends the brand suffix consistently.

Steps:

1. Open `src/pages/404.astro`.
2. Remove the `browserTitle="Page Not Found | KnitTools"` prop from the layout call.
3. Build and verify `dist/404.html` contains a sensible title with "Page Not Found" and the brand suffix. Visible behavior must not change.

If for some reason BaseLayout's title logic is not aligned (e.g. the previous deploy did not actually fix the asymmetry), leave the 404 override in place and add a note to the final report. Do not modify BaseLayout in this task.

Files modified: only `src/pages/404.astro`.
</task_2_files_to_fix>

<task_3_investigate_and_report>
**Goal**: Investigate two suspected dead code paths. Report findings only. **Do NOT modify any code in this task.**

### Investigation 3a: `body.landing` CSS scope

PROJECT.md notes that `body.landing` is defined in `src/styles/global.css` but never activated, because no layout sets `bodyClass="landing"`.

Run these greps:

```bash
grep -rn "bodyClass" src/ --include='*.astro'
grep -rn "body.landing" src/ public/ --include='*.css' --include='*.astro'
grep -rn 'class="landing"' src/ public/ --include='*.astro' --include='*.html'
grep -rn "'landing'" src/ public/ --include='*.astro' --include='*.ts'
```

Document in your final report:

- Whether `body.landing` is referenced only inside `global.css` and nowhere else
- If any layout or page assigns `bodyClass="landing"`, list the file and line
- A short conclusion: "appears genuinely dead", "stub for future feature", or "actively used"

Do not delete or modify the CSS.

### Investigation 3b: `Footer.astro` `languages` array

PROJECT.md notes that `Footer.astro` defines a `languages` array (11 languages) in its frontmatter but does not render it.

Steps:

1. Open `src/components/Footer.astro`.
2. Locate the `languages` array.
3. Search the same file's template (after the `---` frontmatter delimiter) for any reference to that array (`languages.map`, `{languages}`, `Array.from(languages)`, etc.).
4. Search the rest of the codebase for any imports or references to the array, in case it is exported and used elsewhere.

Document in your final report:

- Whether the array is genuinely unrendered in this file
- Whether anything else in the codebase imports or references it
- Any commented-out template blocks that would have rendered it
- A short conclusion: "appears genuinely dead", "stub for future feature", or "actively used"

Do not delete or modify the array.
</task_3_investigate_and_report>

<what_not_to_touch>
**Files and patterns that must remain untouched in this task**, even if they look outdated or redundant. These are either actively used or scheduled for separate future work.

**CSS variables in any CSS file**:
- `--accent`, `--cream`, `--bebas-*` and the entire v10 palette section in `global.css`. Tool pages still depend on these tokens through `typography.css`. These will be removed in a separate future task only after every tool page has been migrated to v11 styling.
- `--stripe-terracotta`, `--stripe-rust`, `--stripe-sand`, `--stripe-brown`, `--stripe-teal`. These are actively used by v11 components.
- All semantic typography tokens in `src/styles/typography.css` (e.g. `--ts-h1-tool-size`, `--ts-h2-size`, `--ts-faq-summary-weight`).

**Files**:
- `astro.config.mjs` (or `.ts`)
- `public/_redirects`
- `public/robots.txt`
- `public/security.txt`
- Any sitemap-related configuration
- `src/styles/global.css` (except as part of Task 3a investigation, which is read-only)
- `src/styles/typography.css`
- Any file under `src/pages/tools/`
- Any file under `src/pages/articles/`
- Any file under `src/content/articles/`
- Any component **not** in the Task 1 deletion list

**Behaviors**:
- Do not commit or push.
- Do not run `git` for anything other than read-only inspection (e.g., `git status`, `git diff`).
- Do not refactor, reformat, or "improve" any file you touch beyond the specific changes required by Tasks 1 and 2.
- Do not change content text, brand voice, or pricing copy.
- If a Task 1 component turns out to be referenced somewhere unexpected, report it but do not force-delete and do not refactor the referencing code to remove the dependency.
</what_not_to_touch>

<deferred_to_later>
**These are intentionally NOT part of this cleanup. Listed here so you do not get tempted, and so the final report does not flag them as "issues".**

1. **Removal of v10 CSS tokens** (`--accent`, `--cream`, `--bebas-*`). Deferred until every tool page has been migrated to v11 retro styling. Doing this now would break the visual rendering of all six tool pages.

2. **Visual unification of tool pages to v11 retro style.** Per PROJECT.md, this is being done page-by-page based on user feedback. Out of scope for any cleanup task.

3. **Decision on `body.landing` CSS scope.** Task 3a only investigates and reports. If the report concludes the scope is dead, Emma will issue a small follow-up patch to remove it. Not done in this task.

4. **Decision on Footer `languages` array.** Same as above: Task 3b is investigation only. Removal or rendering is a future patch.

5. **Audit of dead CSS rules in `global.css`**, e.g. selectors that target class names of the deleted components. This is a separate housekeeping pass, not part of this cleanup. Leave any such rules in place for now.

6. **Removal of the `showStripe` prop from `PageLayout.astro`.** Task 2a explicitly keeps the prop interface intact for backward compatibility. Removing it would require updating every tool page and is a separate refactor.

7. **`README.md` cleanup.** PROJECT.md notes the README is largely a starter template. Out of scope here.
</deferred_to_later>

<constraints>
- Patch-level changes only on Tasks 1 and 2. No refactoring, no styling tweaks, no "improvements" outside scope.
- Task 3 is investigation-only. Do not modify code.
- If you discover unrelated issues during the work, list them in your final report rather than fixing them.
- Do not commit or push. Emma reviews and deploys manually after building.
- If a Task 1 component is found to be in active use, leave it on disk and report. Do not refactor the referencing code to make deletion possible.
</constraints>

<verification>
After Tasks 1 and 2, perform these checks before reporting done.

1. `npm run build` completes without errors and without warnings about missing modules or unknown props.

2. Confirm deletions:

   ```bash
   ls src/components/ | grep -E "(PhoneMockup|FeatureKnit|FeatureOrganize|FeatureCalculate|FeatureScanSave|FeatureLearn|FreeToolsMention|PhoneInset|ToolClosingCTA|StitchSeam|StripeRibbon|PageBrandMark)"
   ```

   This should return no results if all 12 components were deletable. If it returns some results, those are the ones that were found to be still in use per Task 1, and they must be listed in the final report.

3. Spot-check that key pages still build correctly. Verify these output files exist after `npm run build`:
   - `dist/index.html`
   - `dist/tools/index.html`
   - `dist/tools/cast-on-calculator/index.html`
   - `dist/articles/index.html`
   - `dist/articles/category/yarn/index.html`
   - `dist/404.html`

4. Confirm the 404 page change (if Fix 2b was applied):

   ```bash
   grep -o '<title>[^<]*</title>' dist/404.html
   ```

   Output should be a sensible title containing "Page Not Found" and the brand suffix.

5. Confirm no broken imports anywhere:

   ```bash
   npm run build 2>&1 | grep -iE "cannot find|not found|unresolved"
   ```

   Should output nothing.

**Final report must include**:

- **Deleted**: list of components actually deleted (count out of 12)
- **Kept (still in use)**: list of components NOT deleted, with file:line references showing where they are still referenced
- **PageLayout.astro**: what dead imports or template code was removed (if any)
- **404.astro**: whether `browserTitle` was removed, or skipped with reason
- **Investigation 3a (`body.landing`)**: short paragraph with grep findings and conclusion
- **Investigation 3b (Footer `languages` array)**: short paragraph with findings and conclusion
- **Unrelated issues noticed**: bullet list, do not fix
</verification>
