## Batch 136 (Rent vs buy calculator smart presets)

Date: 2026-01-31

Scope: improve rent vs buy calculator usability with down payment flexibility and scenario presets.

### URLs updated
- /calculators/rent-vs-buy-calculator

### Changes applied (high level)
- Added down payment mode toggle (amount vs percent) with synchronized display.
- Added horizon and scenario presets to speed up comparison planning.
- Added cash-to-close and initial owner-cost KPIs for clarity.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260131-004706`
