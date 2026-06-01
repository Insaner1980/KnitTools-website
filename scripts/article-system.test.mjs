import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const ARTICLE_LANGS = ["en", "fi", "de", "sv", "no", "fr", "nl", "da"];
const CATEGORY_SLUGS = [
  "gauge-calculations",
  "yarn",
  "needles",
  "techniques",
  "app-tools",
];
const ARTICLE_PREFIXES = {
  en: "/articles/",
  fi: "/fi/artikkelit/",
  de: "/de/artikel/",
  sv: "/sv/artiklar/",
  no: "/no/artikler/",
  fr: "/fr/articles/",
  nl: "/nl/artikelen/",
  da: "/da/artikler/",
};
const EXPECTED_ARTICLE_URL_COUNT = 352;
const EXPECTED_ARTICLE_URL_HASH =
  "e276326d04ccfc1a3048a3d255789ae36ae09d3a4e4f63ab2c7fc6985e85074e";

function readSource(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function walkMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdownFiles(fullPath);
    return entry.isFile() && /\.mdx?$/.test(entry.name) ? [fullPath] : [];
  });
}

function frontmatterField(frontmatter, field) {
  const match = frontmatter.match(
    new RegExp(`^${field}:\\s*(?:["']([^"']*)["']|([^\\r\\n]+))`, "m"),
  );
  return match ? (match[1] ?? match[2]).trim() : undefined;
}

function parseArticleEntries() {
  const articlesDir = path.join("src", "content", "articles");
  return walkMarkdownFiles(articlesDir).map((filePath) => {
    const source = readSource(filePath);
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    const relativePath = path
      .relative(articlesDir, filePath)
      .replaceAll("\\", "/");
    const parts = relativePath.split("/");
    const langFromPath = parts.length === 1 ? "en" : parts[0];
    const slug = path.basename(relativePath).replace(/\.mdx?$/, "");

    return {
      category: frontmatterField(frontmatter, "category"),
      categoryOrder: frontmatterField(frontmatter, "categoryOrder"),
      draft: frontmatterField(frontmatter, "draft"),
      lang: frontmatterField(frontmatter, "lang") ?? "en",
      langFromPath,
      relativePath,
      slug,
      translationKey: frontmatterField(frontmatter, "translationKey"),
    };
  });
}

function parseArticleTranslations() {
  const source = readSource(path.join("src", "i18n", "articles.ts"));
  const translations = new Map();
  let currentKey;

  for (const line of source.split(/\r?\n/)) {
    const keyMatch = line.match(/^  "([^"]+)": \{$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      translations.set(currentKey, {});
      continue;
    }

    if (!currentKey) continue;

    const pathMatch = line.match(
      /^    (en|fi|de|sv|no|fr|nl|da): "([^"]+)",?$/,
    );
    if (pathMatch) {
      translations.get(currentKey)[pathMatch[1]] = pathMatch[2];
    } else if (/^  \},?$/.test(line)) {
      currentKey = undefined;
    }
  }

  return translations;
}

function collectArticleSystemUrls() {
  const urls = new Set();
  const articlesSource = readSource(path.join("src", "i18n", "articles.ts"));
  const routesSource = readSource(path.join("src", "i18n", "routes.ts"));

  for (const match of articlesSource.matchAll(
    /\b(?:en|fi|de|sv|no|fr|nl|da): "([^"]+)"/g,
  )) {
    urls.add(match[1]);
  }

  const articlesIndexBlock =
    routesSource.match(
      /articlesIndex: \{\r?\n([\s\S]*?)\r?\n  \},\r?\n  tool:/,
    )?.[1] ?? "";
  for (const match of articlesIndexBlock.matchAll(
    /\b(?:en|fi|de|sv|no|fr|nl|da): "([^"]+)"/g,
  )) {
    urls.add(match[1]);
  }

  const categoryBlock =
    routesSource.match(/category: \{([\s\S]*?)\n  \},\n} as const;/)?.[1] ?? "";
  for (const match of categoryBlock.matchAll(
    /\b(?:en|fi|de|sv|no|fr|nl|da): "([^"]+)"/g,
  )) {
    urls.add(match[1]);
  }

  return [...urls].sort();
}

function translationKeyFor(entry) {
  return entry.translationKey ?? entry.slug;
}

test("article system keeps indexed URL sources unchanged", () => {
  const urls = collectArticleSystemUrls();
  const digest = crypto
    .createHash("sha256")
    .update(`${urls.join("\n")}\n`)
    .digest("hex");

  assert.equal(urls.length, EXPECTED_ARTICLE_URL_COUNT);
  assert.equal(digest, EXPECTED_ARTICLE_URL_HASH);
});

test("article content frontmatter stays aligned with the translation map", () => {
  const entries = parseArticleEntries();
  const translations = parseArticleTranslations();
  const entriesByKey = new Map();

  for (const entry of entries) {
    assert.ok(
      ARTICLE_LANGS.includes(entry.langFromPath),
      `${entry.relativePath} is in an unknown language directory`,
    );
    assert.equal(
      entry.lang,
      entry.langFromPath,
      `${entry.relativePath} lang must match its folder`,
    );
    assert.ok(entry.category, `${entry.relativePath} is missing category`);
    assert.ok(
      CATEGORY_SLUGS.includes(entry.category),
      `${entry.relativePath} has invalid category ${entry.category}`,
    );
    assert.ok(
      entry.categoryOrder,
      `${entry.relativePath} is missing categoryOrder`,
    );
    assert.match(
      entry.categoryOrder,
      /^[1-9]\d*$/,
      `${entry.relativePath} categoryOrder must be a positive integer`,
    );

    if (entry.langFromPath !== "en") {
      assert.ok(
        entry.translationKey,
        `${entry.relativePath} is missing translationKey`,
      );
    }

    const key = translationKeyFor(entry);
    if (!entriesByKey.has(key)) entriesByKey.set(key, []);
    entriesByKey.get(key).push(entry);
  }

  assert.equal(entries.length, 304);
  assert.equal(translations.size, 38);

  for (const [key, localizedEntries] of entriesByKey) {
    const languages = new Set(
      localizedEntries.map((entry) => entry.langFromPath),
    );
    assert.deepEqual(
      [...languages].sort(),
      [...ARTICLE_LANGS].sort(),
      `${key} must have one file per language`,
    );
    assert.ok(
      translations.has(key),
      `${key} is missing from articleTranslations`,
    );

    for (const entry of localizedEntries) {
      const mappedPath = translations.get(key)[entry.langFromPath];
      assert.equal(
        mappedPath,
        `${ARTICLE_PREFIXES[entry.langFromPath]}${entry.slug}/`,
        `${entry.relativePath} path must match articleTranslations`,
      );
    }
  }
});

test("localized category ordering is deterministic within each category", () => {
  const byLanguageCategoryOrder = new Map();

  for (const entry of parseArticleEntries()) {
    const key = `${entry.langFromPath}:${entry.category}:${entry.categoryOrder}`;
    const existing = byLanguageCategoryOrder.get(key);
    assert.equal(
      existing,
      undefined,
      `${entry.relativePath} duplicates categoryOrder with ${existing}`,
    );
    byLanguageCategoryOrder.set(key, entry.relativePath);
  }
});

test("article routes use shared visibility, category, and alternate helpers", () => {
  const englishRoute = readSource(
    path.join("src", "pages", "articles", "[...slug].astro"),
  );
  assert.match(englishRoute, /isArticleVisibleForLang\(article,\s*"en"\)/);
  assert.match(
    englishRoute,
    /getArticleAlternates\(article,\s*visibleArticles\)/,
  );

  for (const routePath of [
    path.join("src", "pages", "no", "artikler", "[...slug].astro"),
    path.join("src", "pages", "fr", "articles", "[...slug].astro"),
    path.join("src", "pages", "nl", "artikelen", "[...slug].astro"),
    path.join("src", "pages", "da", "artikler", "[...slug].astro"),
  ]) {
    const route = readSource(routePath);
    assert.match(route, /buildLocalizedArticleStaticPaths/);
    assert.doesNotMatch(route, /CATEGORY_ORDER\.filter\(\(category\)/);
  }
});
