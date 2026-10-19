import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const CachePolicy = require("http-cache-semantics");

const request = {
  url: "https://example.test/account",
  method: "GET",
  headers: { host: "example.test" },
};
const incoming = (directive) => ({
  ...request,
  headers: { ...request.headers, "cache-control": directive },
});

for (const [label, headers] of [
  ["session cookies", { "set-cookie": "session=synthetic" }],
  ["proxy revalidation", { "cache-control": "proxy-revalidate" }],
  ["private responses", { "cache-control": "private" }],
  ["no-cache responses", { "cache-control": "no-cache" }],
  ["no-store responses", { "cache-control": "no-store" }],
  ["zero shared lifetime", { "cache-control": "s-maxage=0" }],
  ["expired shared lifetime", { "cache-control": "s-maxage=60" }],
  ["mandatory revalidation", { "cache-control": "must-revalidate, max-age=0" }],
]) {
  test(`shared-cache protections survive stale directives and serialization: ${label}`, () => {
    const policy = new CachePolicy(
      request,
      {
        status: 200,
        headers: {
          ...headers,
          age: "120",
          "cache-control": `${headers["cache-control"] ?? "max-age=300"}, stale-if-error=3600, stale-while-revalidate=3600`,
        },
      },
      { shared: true },
    );
    for (const current of [policy, CachePolicy.fromObject(policy.toObject())]) {
      for (const directive of ["max-stale", "max-stale=86400"]) {
        const next = incoming(directive);
        assert.equal(current.satisfiesWithoutRevalidation(next), false);
        assert.equal(current.evaluateRequest(next).response, undefined);
      }
      assert.equal(current.useStaleWhileRevalidate(), false);
      assert.equal(current.timeToLive(), 0);
      const revalidated = current.revalidatedPolicy(request, {
        status: 503,
        headers: {},
      });
      assert.notEqual(revalidated.policy, current);
      assert.equal(revalidated.modified, true);
    }
  });
}

test("ordinary public responses preserve fresh and stale reuse", () => {
  for (const directive of ["public, max-age=300", "s-maxage=300"]) {
    const fresh = new CachePolicy(request, {
      status: 200,
      headers: { "cache-control": directive },
    });
    assert.equal(fresh.storable(), true);
    assert.equal(fresh.satisfiesWithoutRevalidation(request), true);
    assert.ok(fresh.timeToLive() > 0);
  }

  const stale = new CachePolicy(request, {
    status: 200,
    headers: {
      "cache-control":
        "public, max-age=60, stale-if-error=3600, stale-while-revalidate=3600",
      age: "120",
    },
  });
  assert.equal(
    stale.satisfiesWithoutRevalidation(incoming("max-stale=300")),
    true,
  );
  assert.equal(stale.useStaleWhileRevalidate(), true);
  assert.equal(
    stale.revalidatedPolicy(request, { status: 503, headers: {} }).policy,
    stale,
  );
});

test("explicit public and immutable cookie responses remain reusable", () => {
  for (const directive of ["public", "immutable"]) {
    const policy = new CachePolicy(request, {
      status: 200,
      headers: {
        "cache-control": `${directive}, max-age=300`,
        "set-cookie": "session=synthetic",
      },
    });
    assert.equal(policy.satisfiesWithoutRevalidation(request), true);
  }
});

test("private caches can still reuse their own cookie responses", () => {
  for (const directive of [
    "private, max-age=300",
    "private, max-age=300, s-maxage=0",
  ]) {
    const policy = new CachePolicy(
      request,
      {
        status: 200,
        headers: {
          "cache-control": directive,
          "set-cookie": "session=synthetic",
        },
      },
      { shared: false },
    );
    assert.equal(policy.satisfiesWithoutRevalidation(request), true);
  }
});

test("Astro resolves the same patched cache policy tested here", () => {
  const requireFromAstro = createRequire(require.resolve("astro/package.json"));
  assert.equal(requireFromAstro("http-cache-semantics"), CachePolicy);
});
