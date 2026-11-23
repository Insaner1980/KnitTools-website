import assert from "node:assert/strict";
import test from "node:test";
import worker from "../public/_worker.js";

test("HTML 404 responses retain their body, status and security headers", async () => {
  const request = new Request("https://knittoolsapp.com/missing/");
  const original = new Response("<h1>Not found</h1>", {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "script-src 'self'",
      "X-Frame-Options": "DENY",
    },
  });
  const result = await worker.fetch(request, {
    ASSETS: {
      fetch(received) {
        assert.equal(received, request);
        return original;
      },
    },
  });
  assert.equal(result.status, 404);
  assert.equal(await result.text(), "<h1>Not found</h1>");
  assert.equal(result.headers.get("cache-control"), "no-store, no-transform");
  assert.equal(
    result.headers.get("content-security-policy"),
    "script-src 'self'",
  );
  assert.equal(result.headers.get("x-frame-options"), "DENY");
  assert.equal(original.headers.get("cache-control"), "no-store");
});

test("existing pages, assets, redirects and non-HTML errors pass through unchanged", async () => {
  for (const [status, type, cache] of [
    [200, "text/html", "no-transform, public, max-age=0, must-revalidate"],
    [200, "text/javascript", "public, max-age=31536000, immutable"],
    [301, "text/html", "public, max-age=0"],
    [404, "application/json", "no-store"],
  ]) {
    const response = new Response("body", {
      status,
      headers: { "Content-Type": type, "Cache-Control": cache },
    });
    assert.equal(
      await worker.fetch(new Request("https://knittoolsapp.com/path"), {
        ASSETS: { fetch: () => response },
      }),
      response,
    );
  }
});
