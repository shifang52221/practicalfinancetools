import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config/site";

export default defineConfig({
  site: process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL ?? SITE.url,
  trailingSlash: "never",
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const raw = String(page);
        let pathname = raw;
        try {
          pathname = new URL(raw, SITE.url).pathname;
        } catch {}
        pathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
        return !["/contact", "/cookie-notice"].includes(pathname);
      }
    })
  ],
  prefetch: true
});
