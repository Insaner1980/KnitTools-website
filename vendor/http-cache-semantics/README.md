# Local security patch

Based on `http-cache-semantics` 4.3.0 from the npm registry, with the original
BSD-2-Clause license retained in `LICENSE`.

Upstream tarball SHA-512:
`M5t5LlJpS1UHMjvwRQVdFHvPISGeLAxNcrWuJkeGh0KxsqCHZ1O3NXZU/8x7cD0BDcGW8kapxMKTvwlqrNkHkA==`

Upstream 4.3.0 still reproduces [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp).
The local patch prevents `max-stale`, stale-while-revalidate, stale-if-error and
cache TTLs from bypassing existing shared-cache reuse prohibitions. It evaluates
the existing policy fields, including policies restored from serialization.
Ordinary public stale responses, private caches and explicit public/immutable
cookie opt-ins retain their previous behavior.

Cache-Control directive names are normalized without changing their values,
including when restoring older serialized policies. Connection tokens are split
on literal commas and trimmed individually to avoid polynomial regex backtracking;
the named hop-by-hop fields are removed regardless of token case.

The root npm override selects this package for Astro. Regression coverage is in
`scripts/http-cache-semantics.test.mjs`, included in `npm run test:security`.
Replace this override only after an upstream version passes those regressions.
