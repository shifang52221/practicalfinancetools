## Batch 040 (Content depth lift: minimum + amortization + mortgage payment)

Date: 2026-01-28

Scope: add practical comparison checkpoints and scenario levers.

### URLs upgraded
- /calculators/minimum-payment-payoff-calculator
- /calculators/amortization-schedule-calculator
- /calculators/mortgage-payment-calculator

### Changes applied (high level)
- Added comparison guidance and balance checkpoints to improve clarity.
- Added payment levers to test on mortgage payment calculator.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-221543` (issues.csv empty)
