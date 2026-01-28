## Batch 008 (Lift remaining mid-depth guides above 600 words)

Date: 2026-01-28

Scope: push remaining mid-depth guides over ~600 words by adding targeted clarifying sections (payment timing, liquidity, fee context, and savings snapshots).

### URLs upgraded
- /guides/calculate-credit-card-payoff
- /guides/credit-card-interest-calculator-payoff
- /guides/credit-card-payment-payoff-calculator
- /guides/one-extra-mortgage-payment-per-year
- /guides/extra-mortgage-payment-calculator
- /guides/apr-tool
- /guides/apr-calculator-payment
- /guides/calculate-mortgage-payoff-with-additional-principal-payments
- /guides/mortgage-lump-sum-5000
- /guides/pay-off-mortgage-early-or-invest

### Changes applied (high level)
- Added short, decision-oriented sections for timing, liquidity, fee handling, and minimum payment floor guidance.
- Expanded a few mortgage and APR guides with context sections to avoid thin content risk.
- Normalized punctuation to ASCII in touched sections.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-101203` (issues.csv empty)
