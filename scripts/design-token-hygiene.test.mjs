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

const getLineNumber = (source, index) =>
  source.slice(0, index).split(/\r?\n/).length;

const getAttribute = (tag, name) => {
  const escapedName = escapeRegExp(name);
  const match = tag.match(
    new RegExp(
      `\\b${escapedName}(?:=(?:"([^"]*)"|'([^']*)'|\\{([^}]*)\\}|([^\\s>]+)))?`,
    ),
  );
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? match?.[4] ?? null;
};

const findTag = (source, tagName, predicate) => {
  for (const match of source.matchAll(
    new RegExp(`<${tagName}\\b[\\s\\S]*?>`, "g"),
  )) {
    const tag = match[0];
    if (predicate(tag, match.index)) return { tag, index: match.index };
  }
  return null;
};

const getWaitlistForms = () => {
  const forms = [];

  for (const path of collectSourceFiles("src")) {
    if (!/\.astro$/.test(path)) continue;
    const source = read(path);

    for (const match of source.matchAll(/<form\b[\s\S]*?<\/form>/g)) {
      if (!match[0].includes("data-waitlist-signup")) continue;
      forms.push({
        path,
        source: match[0],
        startLine: getLineNumber(source, match.index),
      });
    }
  }

  return forms;
};

const cssBlock = (source, selector) => {
  const match = source.match(
    new RegExp(`${escapeRegExp(selector)}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`),
  );
  assert.ok(match, `Missing CSS block for ${selector}`);
  return match[1];
};

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
      ".reveal {",
      ".reveal.visible",
      ".reveal-left",
      ".reveal-right",
      ".reveal-delay-",
      "transition-delay: var(--reveal-delay",
    ]) {
      assert.ok(!globalCss.includes(pattern), pattern);
    }
  });

  it("keeps reveal clipping scoped to clip reveal elements", () => {
    const globalCss = read("src/styles/global.css");
    const revealedBlock = cssBlock(
      globalCss,
      "html.reveal-animations [data-reveal].is-revealed",
    );
    const clipRevealedBlock = cssBlock(
      globalCss,
      'html.reveal-animations [data-reveal="clip"].is-revealed',
    );
    const revealScript = read("src/scripts/revealAnimations.ts");
    const revealAllBlock = revealScript.match(
      /const revealAll =[\s\S]*?const markRevealed/,
    )?.[0];
    const setAllElementsCall = revealAllBlock?.match(
      /gsap\.set\(elements,\s*\{[\s\S]*?\n\s*\}\);/,
    )?.[0];

    assert.doesNotMatch(revealedBlock, /clip-path:/);
    assert.match(clipRevealedBlock, /clip-path:\s*inset\(0 0 0 0\)/);
    assert.ok(revealAllBlock, "Missing revealAll implementation");
    assert.ok(setAllElementsCall, "Missing revealAll gsap.set(elements) call");
    assert.match(revealAllBlock, /clipRevealElements/);
    assert.doesNotMatch(setAllElementsCall, /clipPath:/);
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

  it("keeps sand form cards using dark text on the light wheat background", () => {
    const globalCss = read("src/styles/global.css");
    const sandVariantBlock = cssBlock(globalCss, ".form-card.variant-sand");

    assert.match(sandVariantBlock, /--paper:\s*var\(--wheat\);/);
    assert.match(sandVariantBlock, /--ink:\s*var\(--text-on-light\);/);
    assert.match(sandVariantBlock, /--ink-soft:\s*var\(--text-on-light\);/);
    assert.match(sandVariantBlock, /--terracotta:\s*var\(--text-on-light\);/);
    assert.doesNotMatch(sandVariantBlock, /--ink:\s*#f4ead9/i);
  });

  it("keeps yarn weight chart category rows dark on sand cards", () => {
    const yarnWeightChart = read("src/pages/tools/yarn-weight-chart.astro");

    for (const selector of [
      ".cat-summary",
      ".cat-heading",
      ".cat-num",
      ".cat-name",
      ".cat-regional",
      ".cat-toggle",
      ".cat-row dt",
      ".cat-row dd",
    ]) {
      assert.match(
        cssBlock(yarnWeightChart, selector),
        /color:\s*var\(--text-on-light\);/,
        selector,
      );
    }
  });

  it("keeps the homepage closing CTA on the shared page CTA heading scale", () => {
    const closingCta = read("src/components/ClosingCTA.astro");

    assert.doesNotMatch(closingCta, /\.closing-cta--hero\s*\{/);
    assert.match(closingCta, /font-size:\s*var\(--closing-cta-heading-size\);/);
    assert.match(
      closingCta,
      /font-size:\s*var\(--closing-cta-heading-em-size\);/,
    );
  });

  it("keeps English tool waitlist CTA headings centered", () => {
    const toolPages = collectSourceFiles("src/pages/tools").filter(
      (path) =>
        path.endsWith(".astro") && read(path).includes("Where every stitch"),
    );

    assert.equal(toolPages.length, 6);

    for (const path of toolPages) {
      const source = read(path);
      const headingBlock = cssBlock(source, ".waitlist-cta h2");

      assert.match(
        headingBlock,
        /text-align:\s*center;/,
        `${normalizePath(path)} should center the waitlist heading text`,
      );
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

  it("uses a bounded network timeout for waitlist submissions", () => {
    const signupScript = read("src/scripts/waitlistSignup.ts");

    assert.match(signupScript, /WAITLIST_TIMEOUT_MS/);
    assert.match(signupScript, /AbortController/);
    assert.match(signupScript, /controller\.abort\(\)/);
    assert.match(signupScript, /signal:\s*controller\.signal/);
    assert.match(signupScript, /clearTimeout/);
  });

  it("keeps every waitlist form programmatically labeled and announced", () => {
    const issues = [];

    for (const form of getWaitlistForms()) {
      const labels = new Set(
        [
          ...form.source.matchAll(
            /<label\b[\s\S]*?\bfor=["']([^"']+)["'][\s\S]*?>/g,
          ),
        ].map((match) => match[1]),
      );
      const email = findTag(
        form.source,
        "input",
        (tag) => getAttribute(tag, "type") === "email",
      );
      const success = findTag(form.source, "p", (tag) =>
        /\bdata-success\b/.test(tag),
      );
      const error = findTag(form.source, "p", (tag) =>
        /\bdata-error\b/.test(tag),
      );
      const formRef = `${normalizePath(form.path)}:${form.startLine}`;

      if (!email) {
        issues.push(`${formRef} missing email input`);
        continue;
      }

      const emailId = getAttribute(email.tag, "id");
      const describedBy = new Set(
        (getAttribute(email.tag, "aria-describedby") || "")
          .split(/\s+/)
          .filter(Boolean),
      );
      const successId = success ? getAttribute(success.tag, "id") : "";
      const errorId = error ? getAttribute(error.tag, "id") : "";

      if (!emailId || !labels.has(emailId)) {
        issues.push(`${formRef} email input is not label-linked`);
      }
      if (!success) {
        issues.push(`${formRef} missing data-success message`);
      } else {
        if (getAttribute(success.tag, "role") !== "status") {
          issues.push(`${formRef} success message is not role=status`);
        }
        if (getAttribute(success.tag, "aria-live") !== "polite") {
          issues.push(`${formRef} success message is not aria-live=polite`);
        }
        if (getAttribute(success.tag, "aria-atomic") !== "true") {
          issues.push(`${formRef} success message is not aria-atomic=true`);
        }
      }
      if (!error) {
        issues.push(`${formRef} missing data-error message`);
      } else if (getAttribute(error.tag, "role") !== "alert") {
        issues.push(`${formRef} error message is not role=alert`);
      }
      if (successId && !describedBy.has(successId)) {
        issues.push(`${formRef} email input does not describe success state`);
      }
      if (errorId && !describedBy.has(errorId)) {
        issues.push(`${formRef} email input does not describe error state`);
      }
    }

    assert.deepEqual(issues, []);
  });

  it("keeps waitlist honeypots out of the accessibility tree", () => {
    const issues = [];

    for (const form of getWaitlistForms()) {
      const honeypot = findTag(
        form.source,
        "input",
        (tag) => getAttribute(tag, "name") === "website",
      );
      const formRef = `${normalizePath(form.path)}:${form.startLine}`;

      if (!honeypot) {
        issues.push(`${formRef} missing honeypot input`);
        continue;
      }

      const honeypotId = getAttribute(honeypot.tag, "id");
      const honeypotLabel = honeypotId
        ? findTag(
            form.source,
            "label",
            (tag) => getAttribute(tag, "for") === honeypotId,
          )
        : null;

      if (getAttribute(honeypot.tag, "aria-hidden") !== "true") {
        issues.push(`${formRef} honeypot input is not aria-hidden`);
      }
      if (
        honeypotLabel &&
        getAttribute(honeypotLabel.tag, "aria-hidden") !== "true"
      ) {
        issues.push(`${formRef} honeypot label is not aria-hidden`);
      }
    }

    assert.deepEqual(issues, []);
  });

  it("uses one keyboard-complete size-chart controller", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");
    const sizeChartControls = read("src/components/SizeChartControls.astro");
    const controller = read("src/scripts/sizeChartControls.ts");

    assert.ok(!baseLayout.includes("initSizeChartControls"));
    assert.match(sizeChartControls, /initSizeChartControls/);
    for (const key of ["ArrowRight", "ArrowLeft", "Home", "End", " "]) {
      assert.ok(controller.includes(key), key);
    }

    for (const path of sizeChartFiles) {
      const source = read(path);
      assert.match(source, /data-size-chart/, path);
      if (path === "src/pages/tools/knitting-size-charts.astro") {
        assert.match(source, /<SizeChartControls \/>/, path);
      } else {
        assert.match(source, /enableSizeChartControls/, path);
      }
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
    assert.ok(!baseLayout.includes("initSizeChartControls"));
    assert.match(toolsIndexPage, /enableRevealAnimations/);
    assert.match(toolsIndexPage, /data-reveal/);
    assert.doesNotMatch(toolsIndexPage, /IntersectionObserver/);
    assert.doesNotMatch(toolsIndexPage, /querySelectorAll\("\.reveal"\)/);
  });

  it("keeps only intentional animation dependencies in the runtime package manifest", () => {
    const manifest = JSON.parse(read("package.json"));
    const lockfile = JSON.parse(read("package-lock.json"));

    assert.match(manifest.dependencies.gsap, /^\^?3\./);
    assert.equal(manifest.dependencies.sharp, undefined);
    assert.match(lockfile.packages[""].dependencies.gsap, /^\^?3\./);
    assert.equal(lockfile.packages[""].dependencies.sharp, undefined);
    assert.ok(lockfile.packages["node_modules/gsap"]);
    assert.equal(lockfile.packages["node_modules/sharp"], undefined);
  });

  it("caches regional pricing country lookup between page loads", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");

    assert.match(baseLayout, /sessionStorage/);
    assert.match(baseLayout, /knittools-pricing-country/);
  });

  it("keeps raised launch pricing tiers aligned with current Google Play prices", () => {
    const pricing = read("src/config/pricing.ts");

    for (const [tier, launch, permanent] of [
      ["US", "$9.99", "$14.99"],
      ["EU", "€9.99", "€14.99"],
      ["UK", "£8.99", "£12.99"],
      ["CA", "CAD 13.99", "CAD 19.99"],
      ["AU", "AUD 14.99", "AUD 22.99"],
      ["NZ", "NZD 16.99", "NZD 24.99"],
      ["CH", "CHF 9.90", "CHF 14.90"],
      ["NO", "NOK 99", "NOK 149"],
      ["SE", "SEK 99", "SEK 149"],
      ["DK", "DKK 69", "DKK 99"],
      ["JP", "JPY 1500", "JPY 2200"],
    ]) {
      assert.match(
        pricing,
        new RegExp(
          `${tier}: \\{ launch: "${escapeRegExp(launch)}", permanent: "${escapeRegExp(
            permanent,
          )}" \\}`,
        ),
      );
    }
  });

  it("uses browsing country instead of browser locale for regional pricing", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");

    assert.match(baseLayout, /fetch\("\/cdn-cgi\/trace"/);
    assert.match(baseLayout, /trace\.match\(\/\^loc=/);
    assert.doesNotMatch(baseLayout, /navigator\.languages?/);
    assert.doesNotMatch(baseLayout, /Intl\.Locale/);
  });

  it("uses tier-specific structured offers for the paid app price", () => {
    const pricing = read("src/config/pricing.ts");
    const indexPage = read("src/pages/index.astro");

    assert.match(pricing, /export function getStructuredOffers/);
    assert.match(pricing, /eligibleRegion/);
    assert.match(indexPage, /import \{ getStructuredOffers \}/);
    assert.match(indexPage, /offers: structuredOffers/);
    assert.doesNotMatch(indexPage, /getStructuredPrice/);
  });

  it("keeps critical font preloads aligned with visible weights", () => {
    const baseLayout = read("src/layouts/BaseLayout.astro");
    const indexPage = read("src/pages/index.astro");
    const logoPreload = 'href="/fonts/teko-500-subset.woff2"';
    const displayPreload = 'href="/fonts/lalezar.woff2"';

    assert.match(baseLayout, /href="\/fonts\/general-sans-600\.woff2"/);
    assert.doesNotMatch(
      baseLayout,
      /rel="preload"\s+href="\/fonts\/general-sans-500\.woff2"/,
    );
    assert.ok(
      baseLayout.indexOf(logoPreload) < baseLayout.indexOf(displayPreload),
      "hero logo font preload should be discoverable before the larger display font",
    );
    assert.match(baseLayout, /preloadDisplayFont = true/);
    assert.match(indexPage, /preloadDisplayFont=\{false\}/);
  });

  it("loads the footer seal lazily", () => {
    const footer = read("src/components/Footer.astro");

    assert.match(footer, /src="\/logo\.webp"[\s\S]*loading="lazy"/);
    assert.match(footer, /src="\/logo\.webp"[\s\S]*decoding="async"/);
  });

  it("keeps localized page back links aligned with English tool-page styling", () => {
    const localizedToolPage = read("src/components/LocalizedToolPage.astro");
    const articleLayout = read("src/layouts/ArticleLayout.astro");

    assert.ok(
      !localizedToolPage.includes('class="tool-eyebrow"'),
      "localized tool pages must not render a second tool/category eyebrow",
    );
    assert.ok(
      !localizedToolPage.includes(".tool-eyebrow"),
      "localized tool pages must not keep unused tool/category eyebrow CSS",
    );

    for (const [path, source] of [
      ["src/components/LocalizedToolPage.astro", localizedToolPage],
      ["src/layouts/ArticleLayout.astro", articleLayout],
    ]) {
      const eyebrow = cssBlock(source, ".eyebrow");
      const eyebrowBack = cssBlock(source, ".eyebrow-back");
      const hover = cssBlock(source, ".eyebrow-back:hover");

      assert.match(eyebrow, /font-family:\s*var\(--mono\);/, path);
      assert.match(eyebrow, /font-size:\s*12px;/, path);
      assert.match(eyebrow, /letter-spacing:\s*0\.24em;/, path);
      assert.doesNotMatch(eyebrow, /font-weight:\s*600;/, path);
      assert.match(eyebrowBack, /color:\s*var\(--ink-soft\);/, path);
      assert.match(hover, /color:\s*var\(--terracotta\);/, path);
    }
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

  it("uses the shared GSAP reveal animation helper on all tool pages", () => {
    const home = read("src/pages/index.astro");
    const localizedToolPage = read("src/components/LocalizedToolPage.astro");
    const revealHelper = read("src/scripts/revealAnimations.ts");

    assert.match(home, /enableRevealAnimations/);
    assert.match(localizedToolPage, /enableRevealAnimations/);
    assert.match(localizedToolPage, /data-reveal-content/);
    assert.doesNotMatch(
      localizedToolPage,
      /<div data-reveal>\s*<slot name="content" \/>/,
    );
    assert.match(revealHelper, /from "gsap"/);
    assert.match(revealHelper, /from "gsap\/ScrollTrigger"/);
    assert.match(revealHelper, /gsap\.registerPlugin\(ScrollTrigger\)/);
    assert.match(revealHelper, /const prepareContentReveal/);
    assert.match(
      revealHelper,
      /querySelectorAll<HTMLElement>\("h2"\)[\s\S]*dataset\.reveal = "clip"/,
    );
    assert.match(revealHelper, /clipPath:\s*"inset\(0 0 0 0\)"/);
    assert.doesNotMatch(
      revealHelper,
      /onStart:\s*\(\)\s*=>\s*element\.classList\.add/,
    );
    assert.match(
      revealHelper,
      /const initClipReveal[\s\S]*gsap\.set\(element,\s*\{\s*clipPath:\s*"inset\(0 100% 0 0\)"\s*\}\)[\s\S]*duration:\s*0\.8[\s\S]*ease:\s*"power3\.inOut"[\s\S]*start:\s*"top 85%"/,
    );
    assert.match(
      revealHelper,
      /element\.dataset\.reveal === "clip"[\s\S]*initClipReveal\(element\)/,
    );

    for (const path of [
      "src/pages/tools/cast-on-calculator.astro",
      "src/pages/tools/yarn-estimator.astro",
      "src/pages/tools/needle-size-chart.astro",
      "src/pages/tools/yarn-weight-chart.astro",
      "src/pages/tools/knitting-abbreviations.astro",
      "src/pages/tools/knitting-size-charts.astro",
    ]) {
      const source = read(path);
      assert.match(source, /enableRevealAnimations/, path);
      assert.match(source, /data-animate-details/, path);
    }
  });
});
