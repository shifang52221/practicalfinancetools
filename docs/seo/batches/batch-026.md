## Batch 026 (ASCII normalization)

Date: 2026-01-28

Scope: normalize typography to ASCII for content consistency and crawl safety.

### URLs upgraded
- /404
- /calculators/biweekly-mortgage-payment-calculator
- /calculators/debt-avalanche-calculator
- /calculators/debt-snowball-calculator
- /calculators/debt-to-income-calculator
- /calculators/minimum-payment-payoff-calculator
- /calculators/rent-vs-buy-calculator
- /guides/biweekly-vs-extra-principal
- /guides/credit-card-payoff-strategy
- /guides/interest-rate-apr-calculator
- /guides/pay-150-extra-on-mortgage

### Changes applied (high level)
- Replaced curly quotes, en/em dashes, and math symbols with ASCII equivalents.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-191257` (issues.csv empty)
