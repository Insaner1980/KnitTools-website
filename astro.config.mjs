import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import inlineScriptCsp from "./scripts/inline-script-csp.mjs";

export default defineConfig({
  site: "https://knittoolsapp.com",
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "connect-src 'self' https://api.finnvek.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://cloudflareinsights.com",
        "img-src 'self' data: https://*.google-analytics.com https://www.googletagmanager.com",
        "frame-src 'none'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: [
          "'self'",
          "https://www.googletagmanager.com",
          "https://static.cloudflareinsights.com",
        ],
      },
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
  output: "static",
  trailingSlash: "always",
  build: {
    assets: "_assets",
    inlineStylesheets: "always",
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  integrations: [sitemap(), inlineScriptCsp()],
});
