#!/usr/bin/env node
// Migrate Obsidian SEO articles into src/content/articles/ as Astro content.
// Usage:
//   node scripts/migrate-articles.mjs            # full run
//   node scripts/migrate-articles.mjs --dry-run  # parse only
//   node scripts/migrate-articles.mjs --single 05

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

const VAULT_DIR =
  "/home/emma/Documents/ObsidianVault/Projects/Active/KnitTools/Website/SEO/Articles";
const CATEGORY_MAP_FILE =
  "/home/emma/Documents/ObsidianVault/Projects/Active/KnitTools/Website/artikkelijaot.md";
const DEST_DIR = join(REPO_ROOT, "src/content/articles");
const PROTECTED_SLUG = "how-to-measure-knitting-gauge"; // article 04, already in place
const PUBLISH_DATE = "2026-05-01";
const BACKSLASH = String.fromCodePoint(92);
const DOUBLE_QUOTE = '"';
const ESCAPED_BACKSLASH = BACKSLASH.repeat(2);
const ESCAPED_DOUBLE_QUOTE = `${BACKSLASH}${DOUBLE_QUOTE}`;
const CATEGORY_ITEM_PATTERN = /^[-*]\s+(\d{2})\s+[—\-–]/;
const ARTICLE_FILENAME_PATTERN = /^(\d{2})-(.+)\.md$/;

const CATEGORY_NAME_TO_SLUG = {
  "Gauge & Calculations": "gauge-calculations",
  Yarn: "yarn",
  Needles: "needles",
  Techniques: "techniques",
  "App & Tools": "app-tools",
};

function isAsciiDigitString(value) {
  if (!value) return false;
  for (const character of value) {
    if (character < "0" || character > "9") return false;
  }
  return true;
}

export function parseCategoryHeader(rawLine) {
  const line = rawLine.trim();
  const exactCategory = CATEGORY_NAME_TO_SLUG[line];
  if (exactCategory) return exactCategory;

  if (!line.endsWith(")")) return null;
  const countStart = line.lastIndexOf(" (");
  if (countStart === -1) return null;

  const name = line.slice(0, countStart);
  const count = line.slice(countStart + 2, -1);
  if (!isAsciiDigitString(count)) return null;

  return CATEGORY_NAME_TO_SLUG[name] ?? null;
}

function parseArgs(argv) {
  const args = { dryRun: false, single: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--single") args.single = argv[++i];
  }
  return args;
}

// Build {numberString -> categorySlug} from artikkelijaot.md
function buildCategoryMap() {
  const text = readFileSync(CATEGORY_MAP_FILE, "utf8");
  const lines = text.split(/\r?\n/);
  const map = {};
  let currentCategory = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Header detection: "Gauge & Calculations (6)" or just "Gauge & Calculations"
    const categorySlug = parseCategoryHeader(line);
    if (categorySlug) {
      currentCategory = categorySlug;
      continue;
    }

    // Article line: "- 05 — how much yarn do I need"
    const itemMatch = CATEGORY_ITEM_PATTERN.exec(line);
    if (itemMatch && currentCategory) {
      map[itemMatch[1]] = currentCategory;
    }
  }

  return map;
}

// Extract metadata fields from HTML comment blocks anywhere in the file.
// Returns { title, description, primary, secondaries[] }.
function extractMetadata(source) {
  const meta = {
    title: null,
    description: null,
    primary: null,
    secondaries: [],
  };

  const commentBlocks = [...source.matchAll(/<!--([\s\S]*?)-->/g)].map(
    (m) => m[1],
  );
  const haystack = commentBlocks.join("\n");

  const grab = (label) => {
    const re = new RegExp(String.raw`^\s*${label}\s*:\s*(.+)$`, "mi");
    const m = re.exec(haystack);
    return m ? m[1].trim() : null;
  };

  meta.title = grab("TITLE TAG");
  meta.description = grab("META DESCRIPTION");
  meta.primary = grab("PRIMARY KEYWORD");
  const secondaryRaw = grab("SECONDARY KEYWORDS");
  if (secondaryRaw) {
    meta.secondaries = secondaryRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return meta;
}

// Strip HTML comments + first H1 line, normalize leading whitespace.
function cleanBody(source) {
  let body = source.replace(/<!--[\s\S]*?-->/g, "");
  body = body.replace(/^\s+/, ""); // leading blanks after comment removal

  // Strip first H1 line if it's the first non-blank line
  const lines = body.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i < lines.length && /^#\s+/.test(lines[i])) {
    lines.splice(i, 1);
  }
  body = lines.join("\n").replace(/^\s+/, "");

  // Ensure trailing newline
  if (!body.endsWith("\n")) body += "\n";
  return body;
}

function escapeYamlDouble(s) {
  return s
    .replaceAll(BACKSLASH, ESCAPED_BACKSLASH)
    .replaceAll(DOUBLE_QUOTE, ESCAPED_DOUBLE_QUOTE);
}

function buildFrontmatter({ title, description, category, tags }) {
  const tagsYaml = tags.map((t) => `"${escapeYamlDouble(t)}"`).join(", ");
  return [
    "---",
    `title: "${escapeYamlDouble(title)}"`,
    `description: "${escapeYamlDouble(description)}"`,
    `publishDate: ${PUBLISH_DATE}`,
    `category: ${category}`,
    `tags: [${tagsYaml}]`,
    "draft: true",
    "---",
    "",
  ].join("\n");
}

// Parse one source file -> { number, slug, frontmatter, body, category, tags }
function processFile(filename, categoryMap) {
  const m = ARTICLE_FILENAME_PATTERN.exec(filename);
  if (!m)
    return {
      skipped: true,
      reason: `filename does not match NN-slug.md (${filename})`,
    };
  const number = m[1];
  const slug = m[2];

  if (slug === PROTECTED_SLUG) {
    return {
      skipped: true,
      slug,
      number,
      reason: "protected article 04, already in place",
    };
  }

  const category = categoryMap[number];
  if (!category) {
    return {
      skipped: true,
      slug,
      number,
      reason: `no category mapping for article ${number}`,
    };
  }

  const source = readFileSync(join(VAULT_DIR, filename), "utf8");
  const meta = extractMetadata(source);

  const missing = [];
  if (!meta.title) missing.push("TITLE TAG");
  if (!meta.description) missing.push("META DESCRIPTION");
  if (missing.length) {
    return {
      skipped: true,
      slug,
      number,
      reason: `missing comments: ${missing.join(", ")}`,
    };
  }

  const tags = [];
  const seen = new Set();
  for (const tag of [meta.primary, ...meta.secondaries]) {
    if (!tag) continue;

    const key = tag.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      tags.push(tag);
    }
  }

  const frontmatter = buildFrontmatter({
    title: meta.title,
    description: meta.description,
    category,
    tags,
  });
  const body = cleanBody(source);

  return {
    skipped: false,
    number,
    slug,
    category,
    tags,
    frontmatter,
    body,
    output: frontmatter + body,
  };
}

function getSourceFiles() {
  return readdirSync(VAULT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));
}

function getTargetFiles(allFiles, args) {
  if (!args.single) return allFiles;
  return allFiles.filter((f) => f.startsWith(`${args.single}-`));
}

function assertTargetsFound(targets, args) {
  if (args.single && targets.length === 0) {
    console.error(`No file found in vault for --single ${args.single}`);
    process.exit(1);
  }
}

function ensureDestDir(args) {
  if (!args.dryRun && !existsSync(DEST_DIR)) {
    mkdirSync(DEST_DIR, { recursive: true });
  }
}

function processTargets(targets, categoryMap, args) {
  const written = [];
  const skipped = [];
  const failed = [];
  const perCategory = {};

  for (const filename of targets) {
    let result;
    try {
      result = processFile(filename, categoryMap);
    } catch (err) {
      failed.push({ filename, error: err.message });
      continue;
    }

    if (result.skipped) {
      skipped.push({ filename, reason: result.reason });
      continue;
    }

    perCategory[result.category] = (perCategory[result.category] ?? 0) + 1;

    if (args.dryRun) {
      console.log(`\n--- ${filename} -> ${result.slug}.md ---`);
      console.log(result.frontmatter);
      console.log(
        "[body: " + result.body.length + " chars, first 200 chars below]",
      );
      console.log(result.body.slice(0, 200));
      written.push(result.slug);
      continue;
    }

    const dest = join(DEST_DIR, `${result.slug}.md`);
    writeFileSync(dest, result.output, "utf8");
    written.push(result.slug);
  }

  return { written, skipped, failed, perCategory };
}

function printSummary(args, targets, summary) {
  const { written, skipped, failed, perCategory } = summary;
  const mode = args.dryRun ? "dry-run" : "write";
  const singleSuffix = args.single ? ` (single ${args.single})` : "";

  console.log("\n=== Summary ===");
  console.log(`Mode: ${mode}${singleSuffix}`);
  console.log(`Source files scanned: ${targets.length}`);
  console.log(`Written: ${written.length}`);
  console.log(`Skipped: ${skipped.length}`);
  console.log(`Failed:  ${failed.length}`);
  if (Object.keys(perCategory).length) {
    console.log("Per category:");
    for (const k of Object.keys(perCategory).sort((a, b) =>
      a.localeCompare(b),
    )) {
      console.log(`  ${k}: ${perCategory[k]}`);
    }
  }
  if (written.length) {
    console.log("Slugs:");
    for (const s of written) console.log(`  - ${s}`);
  }
  if (skipped.length) {
    console.log("Skipped:");
    for (const s of skipped) console.log(`  - ${s.filename}: ${s.reason}`);
  }
  if (failed.length) {
    console.log("Failed:");
    for (const f of failed) console.log(`  - ${f.filename}: ${f.error}`);
    process.exitCode = 1;
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const categoryMap = buildCategoryMap();
  const targets = getTargetFiles(getSourceFiles(), args);

  assertTargetsFound(targets, args);
  ensureDestDir(args);
  printSummary(args, targets, processTargets(targets, categoryMap, args));
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
