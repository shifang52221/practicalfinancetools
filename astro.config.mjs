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
            "/guides/refinance-no-closing-costs-myth",
            "/guides/mortgage-payment-15-vs-30-year",
            "/guides/mortgage-payment-rate-sensitivity",
            "/guides/mortgage-payment-down-payment-impact",
            "/guides/mortgage-payment-total-cost-vs-payment",
            "/guides/mortgage-payment-property-tax-assumptions",
            "/guides/mortgage-payment-insurance-assumptions",
            "/guides/mortgage-payment-pmi-thresholds",
            "/guides/how-to-estimate-property-taxes",
            "/guides/how-to-estimate-homeowners-insurance",
            "/guides/estimating-pmi-cost",
            "/guides/hoa-fees-and-mortgage-payment",
            "/guides/mortgage-payment-escrow-account",
            "/guides/mortgage-payment-escrow-shortage",
            "/guides/mortgage-payment-prepaids-and-reserves",
            "/guides/rent-vs-buy-time-horizon",
            "/guides/rent-vs-buy-price-to-rent-ratio",
            "/guides/rent-vs-buy-rent-growth",
            "/guides/rent-vs-buy-home-appreciation",
            "/guides/rent-vs-buy-investment-return",
            "/guides/rent-vs-buy-mortgage-rate-sensitivity",
            "/guides/rent-vs-buy-down-payment",
            "/guides/rent-vs-buy-maintenance-estimate",
            "/guides/rent-vs-buy-closing-costs",
            "/guides/rent-vs-buy-hoa-fees",
            "/guides/rent-vs-buy-pmi-assumptions",
            "/guides/front-end-vs-back-end-dti",
            "/guides/dti-thresholds-compensating-factors",
            "/guides/dti-income-documentation-checklist",
            "/guides/dti-variable-income-averaging",
            "/guides/dti-self-employed-income",
            "/guides/dti-co-borrower-impacts",
            "/guides/dti-and-student-loans",
            "/guides/dti-installment-loans-and-leases",
            "/guides/dti-credit-card-minimums",
            "/guides/dti-when-to-recalculate",
            "/guides/mortgage-payment-dti-housing-payment",
            "/guides/apr-and-closing-costs",
            "/guides/apr-and-fees-origination-vs-closing",
            "/guides/apr-when-fees-are-financed",
            "/guides/apr-and-points-break-even",
            "/guides/apr-and-term-length",
            "/guides/apr-and-prepayment",
            "/guides/credit-card-apr-vs-interest-rate",
            "/guides/credit-card-interest-apr-vs-daily",
            "/guides/credit-card-apr-promo-vs-standard",
            "/guides/credit-card-penalty-apr",
            "/guides/credit-card-balance-transfer-fee",
            "/guides/0-apr-credit-card-payoff-plan",
            "/guides/balance-transfer-payoff-timeline",
            "/guides/credit-card-payoff-fixed-vs-minimum",
            "/guides/credit-card-payoff-payment-target",
            "/guides/credit-card-payoff-timeline",
            "/guides/credit-card-payoff-order",
            "/guides/credit-card-utilization-payoff",
            "/guides/average-daily-balance-interest",
            "/guides/credit-card-interest-calculator-payoff",
            "/guides/credit-card-minimum-payment-formula",
            "/guides/calculate-credit-card-payoff",
            "/guides/credit-card-payment-payoff-calculator",
            "/guides/personal-loan-apr-comparison",
            "/guides/auto-loan-apr-comparison",
            "/guides/student-loan-apr-comparison",
            "/guides/small-business-loan-apr-comparison"
          ].includes(pathname)
        )
          return false;
        if (/^\/guides\/pay-\d+-extra-on-mortgage$/.test(pathname)) return false;
        if (/^\/guides\/mortgage-lump-sum-\d+$/.test(pathname)) return false;
        if (/^\/guides\/extra-payment-/.test(pathname)) return false;
        return true;
      }
    })
  ],
  prefetch: true
});
