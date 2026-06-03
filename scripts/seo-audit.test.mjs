import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  auditPages,
  extractPageData,
  normalizeInternalTarget,
  readSitemapUrls,
  auditRobotsText,
  routeFromHtmlPath,
} from "./seo-audit.mjs";

test("routeFromHtmlPath maps dist index files to stable public routes", () => {
  assert.equal(routeFromHtmlPath("dist/index.html", "dist"), "/");
  assert.equal(
    routeFromHtmlPath("dist/da/artikler/index.html", "dist"),
    "/da/artikler/",
  );
  assert.equal(routeFromHtmlPath("dist/404.html", "dist"), "/404.html");
});

test("404 page offers helpful recovery links without redirecting", () => {
  const source = fs.readFileSync("src/pages/404.astro", "utf8");

  assert.match(source, /href: "\/"/);
  assert.match(source, /href: "\/tools\/"/);
  assert.match(source, /href: "\/articles\/"/);
  assert.doesNotMatch(source, /search engines|real 404/i);
  assert.doesNotMatch(source, /stripe-mark|--stripe-/);
  assert.doesNotMatch(source, /border-left:\s*\d/);
  assert.doesNotMatch(source, /Astro\.redirect|http-equiv="refresh"/i);
});

test("footer logo uses an optimized WebP asset", () => {
  const footer = fs.readFileSync("src/components/Footer.astro", "utf8");
  const logo = fs.statSync("public/logo.webp");

  assert.match(footer, /src="\/logo\.webp"/);
  assert.ok(logo.size < 80_000, `footer logo is ${logo.size} bytes`);
});

test("base layout exposes a standard Apple touch icon", () => {
  const layout = fs.readFileSync("src/layouts/BaseLayout.astro", "utf8");
  const icon = fs.readFileSync("public/apple-touch-icon.png");

  assert.match(
    layout,
    /<link rel="apple-touch-icon" sizes="180x180" href="\/apple-touch-icon\.png" \/>/,
  );
  assert.equal(icon.toString("ascii", 1, 4), "PNG");
  assert.equal(icon.readUInt32BE(16), 180);
  assert.equal(icon.readUInt32BE(20), 180);
  assert.equal(icon[25], 2, "Apple touch icon should not rely on transparency");
});

test("favicon assets use the KnitTools logo artwork", () => {
  const layout = fs.readFileSync("src/layouts/BaseLayout.astro", "utf8");
  const svg = fs.readFileSync("public/favicon.svg", "utf8");
  const webp = fs.readFileSync("public/favicon.webp");

  assert.match(
    layout,
    /<link rel="icon" type="image\/x-icon" href="\/favicon\.ico" \/>/,
  );
  assert.match(
    layout,
    /<link rel="icon" type="image\/webp" href="\/favicon\.webp" \/>/,
  );
  assert.match(svg, /KnitTools favicon generated from logo\.webp/);
  assert.doesNotMatch(svg, /<circle cx="16" cy="16" r="14"/);
  assert.equal(webp.toString("ascii", 8, 12), "WEBP");
});

test("base layout exposes Android home-screen manifest icons", () => {
  const layout = fs.readFileSync("src/layouts/BaseLayout.astro", "utf8");
  const manifest = JSON.parse(
    fs.readFileSync("public/site.webmanifest", "utf8"),
  );

  assert.match(layout, /<link rel="manifest" href="\/site\.webmanifest" \/>/);
  assert.match(layout, /<meta name="theme-color" content="#F4EAD9" \/>/);
  assert.equal(manifest.name, "KnitTools");
  assert.equal(manifest.short_name, "KnitTools");
  assert.equal(manifest.theme_color, "#F4EAD9");
  assert.equal(manifest.background_color, "#F4EAD9");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "/");

  for (const size of [192, 512]) {
    const icon = manifest.icons.find(
      (entry) =>
        entry.src === `/android-chrome-${size}x${size}.png` &&
        entry.sizes === `${size}x${size}` &&
        entry.type === "image/png" &&
        entry.purpose === "any",
    );
    const png = fs.readFileSync(`public/android-chrome-${size}x${size}.png`);

    assert.ok(icon, `manifest missing ${size}x${size} Android icon`);
    assert.equal(png.toString("ascii", 1, 4), "PNG");
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
    assert.equal(png[25], 2, `${size}x${size} icon should not rely on alpha`);
  }
});

test("extractPageData reads core SEO fields from a built HTML page", () => {
  const page = extractPageData({
    htmlPath: "dist/da/artikler/test/index.html",
    route: "/da/artikler/test/",
    siteUrl: "https://knittoolsapp.com",
    html: `<!doctype html>
      <html lang="da">
        <head>
          <title>Testside | KnitTools</title>
          <meta name="description" content="Kort dansk testbeskrivelse.">
          <meta name="robots" content="index,follow">
          <meta name="googlebot" content="index,follow">
          <meta property="og:image" content="https://knittoolsapp.com/images/og-image.png">
          <meta property="og:image:alt" content="KnitTools test image">
          <meta name="twitter:image" content="https://knittoolsapp.com/images/og-image.png">
          <meta name="twitter:image:alt" content="KnitTools test image">
          <link rel="canonical" href="https://knittoolsapp.com/da/artikler/test/">
          <link rel="alternate" hreflang="da" href="https://knittoolsapp.com/da/artikler/test/">
          <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article"}</script>
        </head>
        <body>
          <h1>Testside</h1>
          <a href="/da/artikler/anden/">Anden</a>
          <a href="/da/artikler/billede/"><img src="/images/og-image.png" alt="Billedelink"></a>
          <img src="/images/og-image.png" alt="KnitTools eksempel">
        </body>
      </html>`,
  });

  assert.equal(page.lang, "da");
  assert.deepEqual(page.titles, ["Testside | KnitTools"]);
  assert.equal(page.description, "Kort dansk testbeskrivelse.");
  assert.equal(page.canonical, "https://knittoolsapp.com/da/artikler/test/");
  assert.deepEqual(page.hreflangs, [
    {
      hreflang: "da",
      href: "https://knittoolsapp.com/da/artikler/test/",
    },
  ]);
  assert.equal(page.jsonLd.length, 1);
  assert.equal(page.h1.length, 1);
  assert.equal(page.links[0].raw, "/da/artikler/anden/");
  assert.equal(page.links[0].text, "Anden");
  assert.equal(page.links[1].text, "Billedelink");
  assert.equal(page.images[0].raw, "/images/og-image.png");
  assert.equal(page.images[0].alt, "Billedelink");
  assert.equal(page.images[1].alt, "KnitTools eksempel");
  assert.equal(
    page.meta.ogImage,
    "https://knittoolsapp.com/images/og-image.png",
  );
  assert.equal(page.meta.ogImageAlt, "KnitTools test image");
  assert.equal(
    page.meta.twitterImage,
    "https://knittoolsapp.com/images/og-image.png",
  );
  assert.equal(page.meta.twitterImageAlt, "KnitTools test image");
  assert.equal(page.meta.robots, "index,follow");
  assert.equal(page.meta.googlebot, "index,follow");
});

test("normalizeInternalTarget keeps URL identity while resolving built targets", () => {
  assert.equal(
    normalizeInternalTarget(
      "/da/artikler/test/#faq",
      "https://knittoolsapp.com",
    )?.route,
    "/da/artikler/test/",
  );
  assert.equal(
    normalizeInternalTarget(
      "https://knittoolsapp.com/tools/yarn-estimator/",
      "https://knittoolsapp.com",
    )?.route,
    "/tools/yarn-estimator/",
  );
  assert.equal(
    normalizeInternalTarget(
      "https://example.com/elsewhere/",
      "https://knittoolsapp.com",
    ),
    null,
  );
});

test("readSitemapUrls reads page URLs and skips sitemap index children", () => {
  const distDir = fs.mkdtempSync(path.join(os.tmpdir(), "seo-audit-"));
  fs.writeFileSync(
    path.join(distDir, "sitemap-index.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>https://knittoolsapp.com/sitemap-0.xml</loc></sitemap>
    </sitemapindex>`,
  );
  fs.writeFileSync(
    path.join(distDir, "sitemap-0.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://knittoolsapp.com/</loc></url>
      <url><loc>https://knittoolsapp.com/da/artikler/</loc></url>
    </urlset>`,
  );

  assert.deepEqual(
    [...readSitemapUrls(distDir, "https://knittoolsapp.com")].sort(),
    ["https://knittoolsapp.com/", "https://knittoolsapp.com/da/artikler/"],
  );
});

test("auditPages reports broken internal links and missing hreflang reciprocity", () => {
  const pages = [
    extractPageData({
      htmlPath: "dist/index.html",
      route: "/",
      siteUrl: "https://knittoolsapp.com",
      html: `<!doctype html><html lang="en"><head>
        <title>Home</title>
        <meta name="description" content="Home page.">
        <link rel="canonical" href="https://knittoolsapp.com/">
        <link rel="alternate" hreflang="en" href="https://knittoolsapp.com/">
        <link rel="alternate" hreflang="fi" href="https://knittoolsapp.com/fi/artikkelit/test/">
      </head><body><h1>Home</h1><a href="/missing/">Missing</a></body></html>`,
    }),
    extractPageData({
      htmlPath: "dist/fi/artikkelit/test/index.html",
      route: "/fi/artikkelit/test/",
      siteUrl: "https://knittoolsapp.com",
      html: `<!doctype html><html lang="fi"><head>
        <title>Testi</title>
        <meta name="description" content="Testisivu.">
        <link rel="canonical" href="https://knittoolsapp.com/fi/artikkelit/test/">
        <link rel="alternate" hreflang="fi" href="https://knittoolsapp.com/fi/artikkelit/test/">
      </head><body><h1>Testi</h1></body></html>`,
    }),
  ];

  const result = auditPages({
    pages,
    siteUrl: "https://knittoolsapp.com",
    existingRoutes: new Set(pages.map((page) => page.route)),
    existingAssetPaths: new Set(),
    sitemapUrls: new Set(),
  });

  assert.equal(
    result.issues.some(
      (issue) => issue.code === "broken-internal-link" && issue.route === "/",
    ),
    true,
  );
  assert.equal(
    result.issues.some(
      (issue) =>
        issue.code === "hreflang-reciprocity-missing" &&
        issue.route === "/" &&
        issue.target === "https://knittoolsapp.com/fi/artikkelit/test/",
    ),
    true,
  );
});

test("auditPages reports indexability, social image, and JSON-LD regressions", () => {
  const page = extractPageData({
    htmlPath: "dist/index.html",
    route: "/",
    siteUrl: "https://knittoolsapp.com",
    html: `<!doctype html><html lang="en"><head>
      <title>Complete SEO Test Page | KnitTools</title>
      <meta name="description" content="A complete test page description long enough to pass the local SEO audit length checks.">
      <meta name="robots" content="noindex,follow">
      <link rel="canonical" href="https://knittoolsapp.com/">
      <meta property="og:title" content="Complete SEO Test Page | KnitTools">
      <meta property="og:description" content="A complete test page description long enough to pass the local SEO audit length checks.">
      <meta property="og:image" content="https://knittoolsapp.com/images/missing.png">
      <meta property="og:image:alt" content="Missing image">
      <meta property="og:url" content="https://knittoolsapp.com/wrong/">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Complete SEO Test Page | KnitTools">
      <meta name="twitter:description" content="A complete test page description long enough to pass the local SEO audit length checks.">
      <meta name="twitter:image" content="https://knittoolsapp.com/images/missing.png">
      <meta name="twitter:image:alt" content="Missing image">
      <script type="application/ld+json">{"@context":"https://schema.org","name":"Missing type"}</script>
    </head><body><h1>Complete SEO Test Page</h1></body></html>`,
  });

  const result = auditPages({
    pages: [page],
    siteUrl: "https://knittoolsapp.com",
    existingRoutes: new Set([page.route]),
    existingAssetPaths: new Set(["/images/og-image.png"]),
    sitemapUrls: new Set([page.url]),
  });
  const codes = result.issues.map((issue) => issue.code);

  assert.equal(codes.includes("meta-noindex"), true);
  assert.equal(codes.includes("broken-og-image"), true);
  assert.equal(codes.includes("broken-twitter-image"), true);
  assert.equal(codes.includes("og-url-not-canonical"), true);
  assert.equal(codes.includes("json-ld-missing-type"), true);
});

test("auditPages reports article structured data regressions", () => {
  const page = extractPageData({
    htmlPath: "dist/articles/test/index.html",
    route: "/articles/test/",
    siteUrl: "https://knittoolsapp.com",
    html: `<!doctype html><html lang="en"><head>
      <title>Complete Article Test Page | KnitTools</title>
      <meta name="description" content="A complete article test description long enough to pass the local SEO audit length checks.">
      <link rel="canonical" href="https://knittoolsapp.com/articles/test/">
      <meta property="og:title" content="Complete Article Test Page | KnitTools">
      <meta property="og:description" content="A complete article test description long enough to pass the local SEO audit length checks.">
      <meta property="og:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta property="og:image:alt" content="KnitTools">
      <meta property="og:url" content="https://knittoolsapp.com/articles/test/">
      <meta property="og:type" content="article">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Complete Article Test Page | KnitTools">
      <meta name="twitter:description" content="A complete article test description long enough to pass the local SEO audit length checks.">
      <meta name="twitter:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta name="twitter:image:alt" content="KnitTools">
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "headline": "Wrong headline",
              "description": "Wrong description",
              "url": "https://knittoolsapp.com/articles/wrong/",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://knittoolsapp.com/articles/wrong/"
              },
              "datePublished": "not-a-date",
              "dateModified": "2026-05-31T00:00:00.000Z",
              "author": { "@type": "Organization" },
              "publisher": { "@type": "Organization", "name": "Finnvek" },
              "inLanguage": "fi"
            },
            { "@id": "https://knittoolsapp.com/articles/test/#missing-type" }
          ]
        }
      </script>
    </head><body><h1>Complete Article Test Page</h1></body></html>`,
  });

  const result = auditPages({
    pages: [page],
    siteUrl: "https://knittoolsapp.com",
    existingRoutes: new Set([page.route]),
    existingAssetPaths: new Set(["/images/og-image.png"]),
    sitemapUrls: new Set([page.url]),
  });
  const codes = result.issues.map((issue) => issue.code);

  assert.equal(codes.includes("json-ld-entity-missing-type"), true);
  assert.equal(codes.includes("article-schema-url-not-canonical"), true);
  assert.equal(
    codes.includes("article-schema-main-entity-not-canonical"),
    true,
  );
  assert.equal(codes.includes("article-schema-headline-mismatch"), true);
  assert.equal(codes.includes("article-schema-description-mismatch"), true);
  assert.equal(codes.includes("article-schema-missing-image"), true);
  assert.equal(codes.includes("article-schema-invalid-date"), true);
  assert.equal(codes.includes("article-schema-author-missing-name"), true);
  assert.equal(codes.includes("article-schema-publisher-missing-id"), true);
  assert.equal(codes.includes("article-schema-language-mismatch"), true);
});

test("auditPages reports web application and FAQ structured data regressions", () => {
  const page = extractPageData({
    htmlPath: "dist/tools/test/index.html",
    route: "/tools/test/",
    siteUrl: "https://knittoolsapp.com",
    html: `<!doctype html><html lang="en"><head>
      <title>Complete Tool Test Page | KnitTools</title>
      <meta name="description" content="A complete tool test description long enough to pass the local SEO audit length checks.">
      <link rel="canonical" href="https://knittoolsapp.com/tools/test/">
      <meta property="og:title" content="Complete Tool Test Page | KnitTools">
      <meta property="og:description" content="A complete tool test description long enough to pass the local SEO audit length checks.">
      <meta property="og:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta property="og:image:alt" content="KnitTools">
      <meta property="og:url" content="https://knittoolsapp.com/tools/test/">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Complete Tool Test Page | KnitTools">
      <meta name="twitter:description" content="A complete tool test description long enough to pass the local SEO audit length checks.">
      <meta name="twitter:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta name="twitter:image:alt" content="KnitTools">
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "description": "A tool",
          "url": "https://knittoolsapp.com/tools/wrong/",
          "applicationCategory": "UtilityApplication",
          "offers": { "@type": "Offer" }
        }
      </script>
      <script type="application/ld+json">
        { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] }
      </script>
    </head><body><h1>Complete Tool Test Page</h1></body></html>`,
  });

  const result = auditPages({
    pages: [page],
    siteUrl: "https://knittoolsapp.com",
    existingRoutes: new Set([page.route]),
    existingAssetPaths: new Set(["/images/og-image.png"]),
    sitemapUrls: new Set([page.url]),
  });
  const codes = result.issues.map((issue) => issue.code);

  assert.equal(
    codes.includes("web-application-schema-url-not-canonical"),
    true,
  );
  assert.equal(codes.includes("web-application-schema-missing-name"), true);
  assert.equal(
    codes.includes("web-application-schema-missing-offers-price"),
    true,
  );
  assert.equal(
    codes.includes("web-application-schema-unsupported-category"),
    true,
  );
  assert.equal(codes.includes("faq-schema-empty"), true);
});

test("auditPages reports hreflang canonical alignment regressions", () => {
  const englishPage = extractPageData({
    htmlPath: "dist/articles/test/index.html",
    route: "/articles/test/",
    siteUrl: "https://knittoolsapp.com",
    html: `<!doctype html><html lang="en"><head>
      <title>Complete English Test Page | KnitTools</title>
      <meta name="description" content="A complete English test description long enough to pass the local SEO audit length checks.">
      <link rel="canonical" href="https://knittoolsapp.com/articles/test/">
      <link rel="alternate" hreflang="en" href="https://knittoolsapp.com/articles/test/">
      <link rel="alternate" hreflang="fi" href="https://knittoolsapp.com/fi/artikkelit/test/">
      <link rel="alternate" hreflang="fi" href="https://knittoolsapp.com/fi/artikkelit/test/">
      <link rel="alternate" hreflang="x-default" href="https://knittoolsapp.com/articles/wrong/">
      <meta property="og:title" content="Complete English Test Page | KnitTools">
      <meta property="og:description" content="A complete English test description long enough to pass the local SEO audit length checks.">
      <meta property="og:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta property="og:image:alt" content="KnitTools">
      <meta property="og:url" content="https://knittoolsapp.com/articles/test/">
      <meta property="og:type" content="article">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Complete English Test Page | KnitTools">
      <meta name="twitter:description" content="A complete English test description long enough to pass the local SEO audit length checks.">
      <meta name="twitter:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta name="twitter:image:alt" content="KnitTools">
    </head><body><h1>Complete English Test Page</h1></body></html>`,
  });
  const finnishPage = extractPageData({
    htmlPath: "dist/fi/artikkelit/test/index.html",
    route: "/fi/artikkelit/test/",
    siteUrl: "https://knittoolsapp.com",
    html: `<!doctype html><html lang="fi"><head>
      <title>Complete Finnish Test Page | KnitTools</title>
      <meta name="description" content="A complete Finnish test description long enough to pass the local SEO audit length checks.">
      <link rel="canonical" href="https://knittoolsapp.com/fi/artikkelit/eri/">
      <link rel="alternate" hreflang="fi" href="https://knittoolsapp.com/fi/artikkelit/test/">
      <link rel="alternate" hreflang="en" href="https://knittoolsapp.com/articles/test/">
      <meta property="og:title" content="Complete Finnish Test Page | KnitTools">
      <meta property="og:description" content="A complete Finnish test description long enough to pass the local SEO audit length checks.">
      <meta property="og:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta property="og:image:alt" content="KnitTools">
      <meta property="og:url" content="https://knittoolsapp.com/fi/artikkelit/eri/">
      <meta property="og:type" content="article">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Complete Finnish Test Page | KnitTools">
      <meta name="twitter:description" content="A complete Finnish test description long enough to pass the local SEO audit length checks.">
      <meta name="twitter:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta name="twitter:image:alt" content="KnitTools">
    </head><body><h1>Complete Finnish Test Page</h1></body></html>`,
  });

  const result = auditPages({
    pages: [englishPage, finnishPage],
    siteUrl: "https://knittoolsapp.com",
    existingRoutes: new Set([englishPage.route, finnishPage.route]),
    existingAssetPaths: new Set(["/images/og-image.png"]),
    sitemapUrls: new Set([englishPage.url, finnishPage.url]),
  });
  const codes = result.issues.map((issue) => issue.code);

  assert.equal(codes.includes("duplicate-hreflang"), true);
  assert.equal(codes.includes("hreflang-target-not-canonical"), true);
  assert.equal(codes.includes("hreflang-x-default-target-missing"), true);
  assert.equal(codes.includes("hreflang-x-default-not-english"), true);
});

test("auditPages reports missing image alt and weak link text", () => {
  const page = extractPageData({
    htmlPath: "dist/index.html",
    route: "/",
    siteUrl: "https://knittoolsapp.com",
    html: `<!doctype html><html lang="en"><head>
      <title>Complete SEO Test Page | KnitTools</title>
      <meta name="description" content="A complete test page description long enough to pass the local SEO audit length checks.">
      <link rel="canonical" href="https://knittoolsapp.com/">
      <meta property="og:title" content="Complete SEO Test Page | KnitTools">
      <meta property="og:description" content="A complete test page description long enough to pass the local SEO audit length checks.">
      <meta property="og:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta property="og:image:alt" content="KnitTools">
      <meta property="og:url" content="https://knittoolsapp.com/">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Complete SEO Test Page | KnitTools">
      <meta name="twitter:description" content="A complete test page description long enough to pass the local SEO audit length checks.">
      <meta name="twitter:image" content="https://knittoolsapp.com/images/og-image.png">
      <meta name="twitter:image:alt" content="KnitTools">
    </head><body>
      <h1>Complete SEO Test Page</h1>
      <a href="/tools/">Click here</a>
      <a href="/articles/"></a>
      <img src="/images/og-image.png">
    </body></html>`,
  });

  const result = auditPages({
    pages: [page],
    siteUrl: "https://knittoolsapp.com",
    existingRoutes: new Set(["/", "/tools/", "/articles/"]),
    existingAssetPaths: new Set(["/images/og-image.png"]),
    sitemapUrls: new Set([page.url]),
  });
  const codes = result.issues.map((issue) => issue.code);

  assert.equal(codes.includes("generic-link-text"), true);
  assert.equal(codes.includes("empty-link-text"), true);
  assert.equal(codes.includes("missing-image-alt"), true);
});

test("auditRobotsText reports missing sitemap and global disallow", () => {
  const issues = auditRobotsText({
    robotsText: "User-agent: *\nDisallow: /",
    siteUrl: "https://knittoolsapp.com",
  });

  assert.deepEqual(issues.map((issue) => issue.code).sort(), [
    "robots-disallow-all",
    "robots-sitemap-missing",
  ]);
});
