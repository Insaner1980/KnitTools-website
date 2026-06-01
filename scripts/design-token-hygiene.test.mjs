import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const read = (path) => readFileSync(path, "utf8");
const normalizePath = (path) => path.replaceAll("\\", "/");

const collectSourceFiles = (dir, files = []) => {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      collectSourceFiles(path, files);
    } else if (/\.(astro|css|js|mjs|ts)$/.test(entry)) {
      files.push(path);
    }
  }
  return files;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const articleListingPages = [
  "src/pages/articles/index.astro",
  "src/pages/fi/artikkelit/index.astro",
  "src/pages/de/artikel/index.astro",
  "src/pages/sv/artiklar/index.astro",
  "src/pages/nl/artikelen/[...slug].astro",
  "src/pages/no/artikler/[...slug].astro",
  "src/pages/fr/articles/[...slug].astro",
  "src/pages/da/artikler/[...slug].astro",
];

const articleCategoryPages = [
  "src/pages/articles/category/[slug].astro",
  "src/pages/fi/artikkelit/kategoria/[slug].astro",
  "src/pages/de/artikel/kategorie/[slug].astro",
  "src/pages/sv/artiklar/kategori/[slug].astro",
  "src/pages/nl/artikelen/[...slug].astro",
  "src/pages/no/artikler/[...slug].astro",
  "src/pages/fr/articles/[...slug].astro",
  "src/pages/da/artikler/[...slug].astro",
];

const sizeChartFiles = [
  "src/pages/tools/knitting-size-charts.astro",
  "src/pages/fi/tyokalut/neulekokotaulukot.astro",
  "src/pages/de/werkzeuge/groessentabellen-stricken.astro",
  "src/pages/sv/verktyg/storlekstabeller-stickning.astro",
  "src/pages/no/verktoy/storrelsestabeller-strikking.astro",
  "src/pages/fr/outils/tableaux-tailles-tricot.astro",
  "src/components/dutch-tools/DutchKnittingSizeChartsPage.astro",
  "src/components/danish-tools/DanishKnittingSizeChartsPage.astro",
];

describe("design token hygiene", () => {
  it("keeps JS-created calculator error elements globally styleable", () => {
    for (const path of [
      "src/components/CastOnCalculator.astro",
      "src/components/YarnEstimator.astro",
    ]) {
      const source = read(path);
      assert.match(source, /className = "form-error"/);
      assert.match(source, /:global\(\.form-error\)/, path);
      assert.doesNotMatch(source, /\n\s*\.form-error\s*\{/, path);
    }
  });

  it("does not keep removed landing and stripe-offset scaffolding in global CSS", () => {
    const globalCss = read("src/styles/global.css");
    for (const pattern of [
      "body.landing",
      ".rule-thin",
      ".rule-double",
      "--safe-pr-desktop",
      "--safe-pr-mobile",
      "--stripe-width-desktop",
      "--stripe-width-mobile",
      "--stripe-column-width-desktop",
      "--stripe-column-width-mobile",
      ".feature-text",
    ]) {
      assert.ok(!globalCss.includes(pattern), pattern);
    }
  });

  it("does not define typography custom properties without a source usage", () => {
    const files = collectSourceFiles("src");
    const definitions = [
      ...read("src/styles/typography.css").matchAll(
        /(--ts-[A-Za-z0-9_-]+)\s*:/g,
      ),
    ].map((match) => match[1]);

    for (const token of definitions) {
      const usagePattern = new RegExp(
        `var\\(\\s*${escapeRegExp(token)}(?![A-Za-z0-9_-])`,
      );
      const usedOutsideDefinitionFile = files
        .filter((path) => normalizePath(path) !== "src/styles/typography.css")
        .some((path) => usagePattern.test(read(path)));
      assert.ok(usedOutsideDefinitionFile, `${token} is defined but unused`);
    }
  });

  it("keeps duplicated editorial palette hexes out of reviewed components", () => {
    const componentPaths = [
      "src/components/ArticleCard.astro",
      "src/components/FreeToolsCallout.astro",
      "src/components/Marquee.astro",
      "src/components/NineTools.astro",
      "src/components/PricingCards.astro",
      "src/components/ToolsIndexPage.astro",
      "src/components/TrustSection.astro",
    ];

    for (const path of componentPaths) {
      const source = read(path);
      for (const color of ["#2a1e17", "#f4ead9", "#a05038", "#4a382c"]) {
        assert.ok(!source.includes(color), `${path} duplicates ${color}`);
      }
    }
  });

  it("keeps card foreground and background pairs contrast-safe", () => {
    for (const path of [
      "src/components/ArticleCard.astro",
      "src/components/ToolsIndexPage.astro",
    ]) {
      const source = read(path);

      assert.match(
        source,
        /--card-bg:\s*var\(--stripe-terracotta\);[\s\S]*--card-fg:\s*var\(--paper\);/,
        path,
      );
      assert.match(
        source,
        /--card-bg:\s*var\(--stripe-rust-accessible\);[\s\S]*--card-fg:\s*var\(--paper\);/,
        path,
      );
      assert.match(
        source,
        /--card-bg:\s*var\(--stripe-teal-accessible\);[\s\S]*--card-fg:\s*var\(--paper\);/,
        path,
      );
      assert.doesNotMatch(source, /\.card-desc\s*\{[\s\S]*opacity:/, path);
      assert.doesNotMatch(source, /\.card-meta\s*\{[\s\S]*opacity:/, path);
    }
  });
});

describe("accessibility hygiene", () => {
  it("keeps article listings and footer heading levels structural", () => {
    const articleCard = read("src/components/ArticleCard.astro");
    assert.match(articleCard, /headingLevel/);
    assert.match(articleCard, /<HeadingTag class="card-title"/);

    for (const path of articleListingPages) {
      const source = read(path);
      assert.doesNotMatch(source, /<p class="cat-eyebrow"/, path);
      assert.match(source, /<h2 class="cat-eyebrow"/, path);
    }

    for (const path of articleCategoryPages) {
      assert.match(read(path), /headingLevel=\{2\}/, path);
    }

    const footer = read("src/components/Footer.astro");
    assert.doesNotMatch(footer, /<h4\b/);
    assert.match(footer, /<h2>{t\("tools"\)}<\/h2>/);
  });

  it("gives visible form controls an accessible name", () => {
    const missingNames = [];

    for (const path of collectSourceFiles("src")) {
      if (!/\.astro$/.test(path)) continue;
      const source = read(path);
      const labels = new Set(
        [...source.matchAll(/<label\b[^>]*\bfor=["']([^"']+)["']/g)].map(
          (match) => match[1],
        ),
      );

      for (const match of source.matchAll(/<input\b[\s\S]*?(?:\/>|>)/g)) {
        const tag = match[0];
        if (/\btype=["']hidden["']/.test(tag)) continue;
        if (/\bclass=["'][^"']*visually-hidden/.test(tag)) continue;

        const id = tag.match(/\bid=["']([^"']+)["']/)?.[1];
        const previousLabelStart = source.lastIndexOf("<label", match.index);
        const previousLabelEnd = source.lastIndexOf("</label>", match.index);
        const isInsideLabel = previousLabelStart > previousLabelEnd;
        const hasName =
          /\baria-label=|\baria-labelledby=|\btitle=/.test(tag) ||
          (id && labels.has(id)) ||
          isInsideLabel;

        if (!hasName) {
          const line = source.slice(0, match.index).split(/\r?\n/).length;
          missingNames.push(`${normalizePath(path)}:${line}`);
        }
      }
    }

    assert.deepEqual(missingNames, []);
  });

  it("announces waitlist success and error states to assistive tech", () => {
    for (const path of [
      "src/components/Hero.astro",
      "src/components/ClosingCTA.astro",
    ]) {
      const source = read(path);
      assert.match(source, /aria-describedby=/, path);
      assert.match(
        source,
        /data-success[\s\S]*role="status"[\s\S]*aria-live="polite"[\s\S]*aria-atomic="true"/,
        path,
      );
      assert.match(source, /data-error[\s\S]*role="alert"/, path);
    }

    const signupScript = read("src/scripts/waitlistSignup.ts");
    assert.match(signupScript, /aria-invalid/);
    assert.match(signupScript, /setAttribute\("aria-describedby"/);
  });

  it("uses one keyboard-complete size-chart controller", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");
    const controller = read("src/scripts/sizeChartControls.ts");

    assert.match(baseLayout, /initSizeChartControls/);
    for (const key of ["ArrowRight", "ArrowLeft", "Home", "End", " "]) {
      assert.ok(controller.includes(key), key);
    }

    for (const path of sizeChartFiles) {
      const source = read(path);
      assert.match(source, /data-size-chart/, path);
      assert.match(source, /tabindex=\{[^}]+\}/, path);
      assert.doesNotMatch(
        source,
        /querySelectorAll<[^>]+>\("\.tab-btn"\)/,
        path,
      );
      assert.doesNotMatch(
        source,
        /querySelectorAll<[^>]+>\("\.unit-btn"\)/,
        path,
      );
    }
  });
});

describe("performance hygiene", () => {
  it("keeps page-wide scripts scoped to pages that need them", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");
    const toolsIndexPage = read("src/components/ToolsIndexPage.astro");

    assert.ok(!baseLayout.includes('querySelectorAll(".reveal")'));
    assert.match(toolsIndexPage, /revealCards\s+&&\s+<script/);
    assert.match(toolsIndexPage, /IntersectionObserver/);
    assert.match(toolsIndexPage, /querySelectorAll\("\.reveal"\)/);
  });

  it("caches regional pricing country lookup between page loads", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");

    assert.match(baseLayout, /sessionStorage/);
    assert.match(baseLayout, /knittools-pricing-country/);
  });

  it("keeps critical font preloads aligned with visible weights", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");

    assert.match(baseLayout, /href="\/fonts\/general-sans-600\.woff2"/);
    assert.doesNotMatch(
      baseLayout,
      /rel="preload"\s+href="\/fonts\/general-sans-500\.woff2"/,
    );
  });

  it("loads the footer seal lazily", () => {
    const footer = read("src/components/Footer.astro");

    assert.match(footer, /src="\/logo\.webp"[\s\S]*loading="lazy"/);
    assert.match(footer, /src="\/logo\.webp"[\s\S]*decoding="async"/);
  });

  it("keeps Cloudflare Web Analytics out of the document head", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");
    const headMarkup = baseLayout.split("</head>")[0];

    assert.ok(!headMarkup.includes("static.cloudflareinsights.com"));
    assert.ok(
      baseLayout.indexOf("static.cloudflareinsights.com") >
        baseLayout.indexOf("</script>\n  </body>"),
    );
  });

  it("keeps GSAP but defers loading until motion is allowed", () => {
    for (const path of [
      "src/pages/tools/cast-on-calculator.astro",
      "src/pages/tools/yarn-estimator.astro",
      "src/pages/tools/needle-size-chart.astro",
      "src/pages/tools/yarn-weight-chart.astro",
      "src/pages/tools/knitting-abbreviations.astro",
      "src/pages/tools/knitting-size-charts.astro",
    ]) {
      const source = read(path);
      assert.doesNotMatch(source, /import \{ gsap \} from "gsap"/, path);
      assert.doesNotMatch(
        source,
        /import \{ ScrollTrigger \} from "gsap\/ScrollTrigger"/,
        path,
      );
      assert.match(source, /import\("gsap"\)/, path);
      assert.match(source, /import\("gsap\/ScrollTrigger"\)/, path);
      assert.ok(
        source.indexOf("if (!prefersReducedMotion)") <
          source.indexOf('import("gsap")'),
        path,
      );
      assert.match(source, /gsap\.registerPlugin\(ScrollTrigger\)/, path);
    }
  });
});
