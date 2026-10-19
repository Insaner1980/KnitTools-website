import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
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

test("mixed-case response directives retain cache reuse restrictions", () => {
  for (const directive of [
    "Private, max-age=300",
    "No-Cache, max-age=300",
    "No-Store, max-age=300",
    "Proxy-Revalidate, max-age=300",
    "S-Maxage=0, max-age=300",
    "S-Maxage=60, max-age=300",
    "Must-Revalidate, max-age=0",
  ]) {
    const policy = new CachePolicy(request, {
      status: 200,
      headers: {
        age: "120",
        "cache-control": `${directive}, stale-if-error=3600, stale-while-revalidate=3600`,
      },
    });
    for (const current of [policy, CachePolicy.fromObject(policy.toObject())]) {
      assert.equal(
        current.satisfiesWithoutRevalidation(incoming("max-stale=86400")),
        false,
        directive,
      );
      assert.equal(
        current.evaluateRequest(request).response,
        undefined,
        directive,
      );
      assert.equal(current.useStaleWhileRevalidate(), false, directive);
      assert.equal(current.timeToLive(), 0, directive);
      assert.notEqual(
        current.revalidatedPolicy(request, { status: 503, headers: {} }).policy,
        current,
        directive,
      );
    }
  }
});

test("mixed-case request directives and explicit cache opt-ins retain their meaning", () => {
  const response = {
    status: 200,
    headers: { "cache-control": "Public, Max-Age=300, X-Private=KeepCase,, " },
  };
  const policy = new CachePolicy(request, response);
  assert.equal(policy.satisfiesWithoutRevalidation(request), true);
  assert.equal(
    policy.satisfiesWithoutRevalidation(incoming("No-Cache")),
    false,
  );
  assert.equal(
    new CachePolicy(incoming("No-Store"), response).storable(),
    false,
  );
  assert.equal(policy.toObject().rescc["x-private"], "KeepCase");
  assert.equal(Object.hasOwn(policy.toObject().rescc, ""), false);

  for (const directive of ["Public", "Immutable"]) {
    const cookiePolicy = new CachePolicy(request, {
      status: 200,
      headers: {
        "cache-control": `${directive}, Max-Age=300`,
        "set-cookie": "session=synthetic",
      },
    });
    assert.equal(cookiePolicy.satisfiesWithoutRevalidation(request), true);
  }
  const privatePolicy = new CachePolicy(
    request,
    {
      status: 200,
      headers: { "cache-control": "Private, Max-Age=300, S-Maxage=0" },
    },
    { shared: false },
  );
  assert.equal(privatePolicy.satisfiesWithoutRevalidation(request), true);

  const stale = new CachePolicy(request, {
    status: 200,
    headers: {
      "cache-control":
        "Public, Max-Age=60, Stale-While-Revalidate=3600, Stale-If-Error=3600",
      age: "120",
    },
  });
  assert.equal(
    stale.satisfiesWithoutRevalidation(incoming("Max-Stale=300")),
    true,
  );
  assert.equal(stale.useStaleWhileRevalidate(), true);
  assert.equal(
    stale.revalidatedPolicy(request, { status: 503, headers: {} }).policy,
    stale,
  );
});

test("legacy serialized mixed-case directives cannot bypass cache restrictions", () => {
  const policy = new CachePolicy(request, {
    status: 200,
    headers: { "cache-control": "public, max-age=300" },
  });
  for (const field of ["rescc", "reqcc"]) {
    const stored = structuredClone(policy.toObject());
    stored[field]["No-Store"] = true;
    const restored = CachePolicy.fromObject(stored);
    assert.equal(restored.storable(), false, field);
    assert.equal(restored.satisfiesWithoutRevalidation(request), false, field);
    assert.equal(restored.timeToLive(), 0, field);
  }
  const stored = structuredClone(policy.toObject());
  stored.rescc = { Public: true, "Max-Age": "300", "X-Option": "KeepCase" };
  const restored = CachePolicy.fromObject(stored);
  assert.equal(restored.satisfiesWithoutRevalidation(request), true);
  assert.equal(restored.toObject().rescc["x-option"], "KeepCase");
});

test("Connection header filtering handles padded tokens and long internal whitespace", () => {
  const result = spawnSync(
    process.execPath,
    [
      "-e",
      `const assert = require('node:assert/strict');
      const CachePolicy = require(${JSON.stringify(require.resolve("http-cache-semantics"))});
      const request = { url: 'https://example.test/', method: 'GET', headers: { host: 'example.test' } };
      const headers = {
        connection: ' \\tX-Hop \\t, x' + ' '.repeat(1000000) + 'x, \\t x-last \\t ',
        'x-hop': 'remove', 'x-last': 'remove', 'x-keep': 'retain',
        'cache-control': 'public, max-age=300'
      };
      const policy = new CachePolicy(request, { status: 200, headers });
      for (const filtered of [policy.responseHeaders(), policy.revalidationHeaders({ ...request, headers })]) {
        assert.equal(filtered.connection, undefined);
        assert.equal(filtered['x-hop'], undefined);
        assert.equal(filtered['x-last'], undefined);
        assert.equal(filtered['x-keep'], 'retain');
      }`,
    ],
    { encoding: "utf8", timeout: 5000 },
  );
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});
