import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://knittoolsapp.com",
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
  integrations: [sitemap()],
});
