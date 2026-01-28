## Batch 033 (Three-step pass: mortgage hub + debt inputs)

Date: 2026-01-28

Scope: add mortgage payoff hub CTA and input verification guidance on key debt calculators.

### URLs upgraded
- /calculators/additional-principal-payment-calculator
- /calculators/debt-avalanche-calculator
- /calculators/debt-snowball-calculator
- /calculators/debt-to-income-calculator

### Changes applied (high level)
- Added mortgage payoff topic hub CTA where missing.
- Added "inputs to verify" sections for avalanche, snowball, and DTI calculators.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-200844` (issues.csv empty)
