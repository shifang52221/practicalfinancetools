## Batch 027 (Punctuation cleanup)

Date: 2026-01-28

Scope: clean up punctuation and phrasing after ASCII normalization.

### URLs upgraded
- /calculators/debt-avalanche-calculator
- /calculators/debt-snowball-calculator
- /calculators/debt-to-income-calculator
- /calculators/minimum-payment-payoff-calculator
- /calculators/rent-vs-buy-calculator

### Changes applied (high level)
- Replaced hyphen run-ons with proper sentence breaks and punctuation.
- Clarified "extra payment" phrasing without altering meaning.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-191535` (issues.csv empty)
