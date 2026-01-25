import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config/site";

const envSiteUrl = process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL;
const canonicalSiteUrl =
  envSiteUrl && /^https:\/\/practicalfinancetools\.com\/?$/.test(envSiteUrl)
    ? envSiteUrl
    : SITE.url;

export default defineConfig({
  site: canonicalSiteUrl,
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
        if (["/contact", "/cookie-notice"].includes(pathname)) return false;
        if (/^\/guides\/pay-\d+-extra-on-mortgage$/.test(pathname)) return false;
        if (/^\/guides\/mortgage-lump-sum-\d+$/.test(pathname)) return false;
        return true;
      }
    })
  ],
  prefetch: true
});
