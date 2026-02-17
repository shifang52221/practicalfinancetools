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
        if (
          [
            "/guides/extra-mortgage-payment-calculator",
            "/guides/mortgage-extra-principal-calculator",
            "/guides/calculate-mortgage-payoff-with-additional-principal-payments",
            "/guides/apr-tool",
            "/guides/apr-calculator-payment",
            "/guides/interest-rate-apr-calculator",
            "/guides/apr-vs-interest-rate-fees",
            "/guides/apr-for-refinance-comparison",
            "/guides/refinance-rate-vs-term-tradeoff",
            "/guides/refinance-reset-amortization",
            "/guides/refinance-points-break-even",
            "/guides/refinance-when-not-to-refinance",
            "/guides/refinance-cash-in-lower-rate",
            "/guides/refinance-offer-comparison-checklist",
            "/guides/refinance-rate-lock",
            "/guides/refinance-cash-out-vs-rate-term",
            "/guides/refinance-rolling-costs-into-loan",
            "/guides/refinance-no-closing-costs-myth"
          ].includes(pathname)
        )
          return false;
        if (/^\/guides\/pay-\d+-extra-on-mortgage$/.test(pathname)) return false;
        if (/^\/guides\/mortgage-lump-sum-\d+$/.test(pathname)) return false;
        return true;
      }
    })
  ],
  prefetch: true
});
