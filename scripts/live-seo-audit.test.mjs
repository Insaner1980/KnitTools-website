import assert from "node:assert/strict";
import test from "node:test";

import {
  buildLiveRouteSet,
  parseRobotsTxt,
  parseSitemapXml,
  routeFromUrl,
} from "./live-seo-audit.mjs";

test("parseSitemapXml separates sitemap indexes from page URL sets", () => {
  assert.deepEqual(
    parseSitemapXml(`<?xml version="1.0"?>
      <sitemapindex>
        <sitemap><loc>https://knittoolsapp.com/sitemap-0.xml</loc></sitemap>
      </sitemapindex>`),
    {
      type: "index",
      urls: ["https://knittoolsapp.com/sitemap-0.xml"],
    },
  );

  assert.deepEqual(
    parseSitemapXml(`<?xml version="1.0"?>
      <urlset>
        <url><loc>https://knittoolsapp.com/</loc></url>
        <url><loc>https://knittoolsapp.com/da/artikler/</loc></url>
      </urlset>`),
    {
      type: "urlset",
      urls: [
        "https://knittoolsapp.com/",
        "https://knittoolsapp.com/da/artikler/",
      ],
    },
  );
});

test("routeFromUrl preserves trailing slash route identity", () => {
  assert.equal(routeFromUrl("https://knittoolsapp.com/"), "/");
  assert.equal(
    routeFromUrl("https://knittoolsapp.com/da/artikler"),
    "/da/artikler/",
  );
  assert.equal(
    routeFromUrl("https://knittoolsapp.com/images/og-image.png"),
    "/images/og-image.png",
  );
});

test("parseRobotsTxt detects sitemap references and global disallow", () => {
  assert.deepEqual(
    parseRobotsTxt(`User-agent: *
Allow: /
Sitemap: https://knittoolsapp.com/sitemap-index.xml`),
    {
      disallowsAll: false,
      sitemapUrls: ["https://knittoolsapp.com/sitemap-index.xml"],
    },
  );

  assert.equal(parseRobotsTxt("User-agent: *\nDisallow: /").disallowsAll, true);
});

test("buildLiveRouteSet allows Cloudflare email-protection infrastructure URLs", () => {
  const routes = buildLiveRouteSet(["https://knittoolsapp.com/about/"]);

  assert.equal(routes.has("/about/"), true);
  assert.equal(routes.has("/cdn-cgi/l/email-protection/"), true);
});
