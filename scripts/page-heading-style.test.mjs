import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(path) {
  return readFileSync(path, "utf8");
}

function extractRule(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(
    new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`),
  );
  assert.ok(match, `Missing CSS rule for ${selector}`);
  return match[1];
}

function assertEnglishToolBackLinkStyle(rule, linkRule) {
  assert.match(rule, /font-family:\s*var\(--mono\);/);
  assert.match(rule, /font-size:\s*12px;/);
  assert.doesNotMatch(rule, /font-weight:/);
  assert.match(rule, /letter-spacing:\s*0\.24em;/);
  assert.match(rule, /text-transform:\s*uppercase;/);
  assert.match(rule, /margin:\s*0 0 24px;/);
  assert.match(linkRule, /color:\s*var\(--ink-soft\);/);
  assert.match(linkRule, /text-decoration:\s*none;/);
}

test("localized tool pages use the English tool hero heading pattern", () => {
  const source = read("src/components/LocalizedToolPage.astro");

  assert.doesNotMatch(source, /toolEyebrow/);
  assert.doesNotMatch(source, /class="tool-eyebrow"/);
  assert.match(source, /max-width:\s*760px;/);
  assert.match(source, /font-size:\s*clamp\(2rem,\s*4vw,\s*3\.25rem\);/);

  assertEnglishToolBackLinkStyle(
    extractRule(source, ".eyebrow"),
    extractRule(source, ".eyebrow-back"),
  );
});

test("article pages use the English tool back-link style", () => {
  const source = read("src/layouts/ArticleLayout.astro");

  assertEnglishToolBackLinkStyle(
    extractRule(source, ".eyebrow"),
    extractRule(source, ".eyebrow-back"),
  );
});

test("article category pages use the same back-link style", () => {
  const paths = [
    "src/pages/articles/category/[slug].astro",
    "src/pages/fi/artikkelit/kategoria/[slug].astro",
    "src/pages/sv/artiklar/kategori/[slug].astro",
    "src/pages/de/artikel/kategorie/[slug].astro",
    "src/pages/fr/articles/[...slug].astro",
    "src/pages/no/artikler/[...slug].astro",
    "src/pages/nl/artikelen/[...slug].astro",
    "src/pages/da/artikler/[...slug].astro",
  ];

  for (const path of paths) {
    const source = read(path);
    assertEnglishToolBackLinkStyle(
      extractRule(source, ".back"),
      extractRule(source, ".back a"),
    );
  }
});

test("homepage hero uses one descriptive visible h1", () => {
  const source = read("src/components/Hero.astro");
  const h1Match = source.match(/<h1[\s\S]*?<\/h1>/);

  assert.ok(h1Match, "Hero should include a visible h1");

  const h1 = h1Match[0];
  assert.doesNotMatch(h1, /aria-label="KnitTools"/);
  assert.match(h1, /<span class="eyebrow">An Android app for knitters<\/span>/);
  assert.match(h1, /<span class="wordmark-line">Knit<\/span>/);
  assert.match(h1, /<span class="wordmark-line">Tools<\/span>/);
});
