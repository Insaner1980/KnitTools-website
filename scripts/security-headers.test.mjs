import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const HEADER_PATH = "public/_headers";
const ROBOTS_PATH = "public/robots.txt";

function parseHeadersFile(source) {
  const rules = new Map();
  let currentPattern = "";

  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (!line.startsWith(" ") && !line.startsWith("\t")) {
      currentPattern = trimmed;
      rules.set(currentPattern, new Map());
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    assert.notEqual(separatorIndex, -1, `invalid header line: ${line}`);
    assert.ok(currentPattern, `header appears before a rule pattern: ${line}`);

    const name = trimmed.slice(0, separatorIndex).trim().toLowerCase();
    const value = trimmed.slice(separatorIndex + 1).trim();
    rules.get(currentPattern).set(name, value);
  }

  return rules;
}

test("security headers harden static pages without restricting crawlers or resource loading", () => {
  const headersSource = fs.readFileSync(HEADER_PATH, "utf8");
  const headers = parseHeadersFile(headersSource).get("/*");

  assert.ok(headers, "root Cloudflare Pages header rule is missing");
  assert.equal(headers.get("strict-transport-security"), "max-age=2592000");
  assert.equal(headers.get("x-frame-options"), "DENY");
  assert.equal(headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );

  const csp = headers.get("content-security-policy");
  assert.ok(csp, "Content-Security-Policy header is missing");
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /base-uri 'self'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /form-action 'self'/);
  assert.match(csp, /upgrade-insecure-requests/);

  assert.doesNotMatch(csp, /\bdefault-src\b/);
  assert.doesNotMatch(csp, /\bscript-src\b/);
  assert.doesNotMatch(csp, /\bstyle-src\b/);
  assert.doesNotMatch(csp, /\bimg-src\b/);
  assert.doesNotMatch(csp, /\bfont-src\b/);
  assert.doesNotMatch(csp, /\bconnect-src\b/);

  assert.doesNotMatch(headersSource, /X-Robots-Tag/i);
  assert.doesNotMatch(headersSource, /\bnoindex\b/i);
  assert.doesNotMatch(headersSource, /\bnofollow\b/i);
  assert.doesNotMatch(headersSource, /\bnosnippet\b/i);
  assert.doesNotMatch(headersSource, /\bnoai\b/i);
  assert.doesNotMatch(headersSource, /\bnoimageai\b/i);
  assert.doesNotMatch(headersSource, /\bincludeSubDomains\b/i);
  assert.doesNotMatch(headersSource, /\bpreload\b/i);
  assert.doesNotMatch(headersSource, /^X-XSS-Protection:/im);
});

test("static asset headers improve browser caching without caching HTML", () => {
  const headersSource = fs.readFileSync(HEADER_PATH, "utf8");
  const rules = parseHeadersFile(headersSource);
  const pageHeaders = rules.get("/*");

  assert.ok(pageHeaders, "root Cloudflare Pages header rule is missing");
  assert.equal(pageHeaders.get("cache-control"), undefined);

  assert.equal(
    rules.get("/_assets/*")?.get("cache-control"),
    "public, max-age=31536000, immutable",
  );
  assert.equal(
    rules.get("/fonts/*")?.get("cache-control"),
    "public, max-age=31536000, immutable",
  );

  for (const pattern of [
    "/images/*",
    "/brand/*",
    "/*.webp",
    "/*.ico",
    "/*.svg",
    "/*.png",
  ]) {
    assert.equal(
      rules.get(pattern)?.get("cache-control"),
      "public, max-age=2592000",
    );
  }
});

test("robots.txt keeps all crawlers, including AI crawlers, allowed", () => {
  const robots = fs.readFileSync(ROBOTS_PATH, "utf8");

  assert.match(robots, /^User-agent:\s*\*$/im);
  assert.match(robots, /^Allow:\s*\/$/im);
  assert.match(
    robots,
    /^Sitemap:\s*https:\/\/knittoolsapp\.com\/sitemap-index\.xml$/im,
  );

  assert.doesNotMatch(robots, /^Disallow:\s*\S/im);
  assert.doesNotMatch(
    robots,
    /\b(GPTBot|OAI-SearchBot|ChatGPT-User|Google-Extended|ClaudeBot|Claude-User|PerplexityBot|Perplexity-User|CCBot|Bytespider|Amazonbot|Applebot-Extended)\b/i,
  );
  assert.doesNotMatch(robots, /\b(search|ai-input|ai-train)\s*=\s*no\b/i);
});
