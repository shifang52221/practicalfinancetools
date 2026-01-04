import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config/site";

export default defineConfig({
  site: process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL ?? SITE.url,
  integrations: [react(), sitemap()],
  prefetch: true
});
