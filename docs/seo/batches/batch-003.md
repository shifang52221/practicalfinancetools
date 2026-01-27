## Batch 003 (Guide depth, cluster coverage)

Date: 2026-01-28

Scope: deepen 10 guide pages tied to APR, credit cards, and mortgage payoff clusters. Add worked examples, checklists, FAQs, references, and tighter internal linking to topic hubs and calculators.

### URLs upgraded
- /guides/apr-vs-interest-rate
- /guides/apr-with-origination-fee
- /guides/how-to-find-your-apr
- /guides/interest-rate-apr-calculator
- /guides/how-credit-card-interest-is-calculated
- /guides/why-minimum-payments-take-so-long
- /guides/credit-card-payoff-strategy
- /guides/extra-mortgage-payments
- /guides/amortization-with-extra-payments
- /guides/biweekly-vs-extra-principal

### Changes applied (high level)
- Added computed worked examples using existing calculators (APR, credit card payoff, amortization).
- Added compliance-friendly checklists, FAQs, and references (CFPB/Reg Z).
- Added topic hub links for APR, credit cards, and mortgage payoff.
- Fixed encoding artifacts and normalized punctuation to ASCII in touched sections.
- Refreshed "Last updated" stamps to 2026-01-27.

### QA / validation
- Tests: `npm test` (pass)
- Typecheck: `npm run check` (pass)
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-000831` (issues.csv empty)

