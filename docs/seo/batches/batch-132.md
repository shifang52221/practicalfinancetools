## Batch 132 (DTI calculator UX upgrade)

Date: 2026-01-30

Scope: upgrade the DTI calculator with detailed input breakdowns, target presets, and richer affordability outputs.

### URLs updated
- /calculators/debt-to-income-calculator

### Changes applied (high level)
- Added income, housing, and debt breakdown toggles with detailed line items.
- Added common target presets (28/36, 31/43) and headroom + income-needed outputs.
- Expanded results to show front-end vs back-end max housing and target guidance.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260130-234354`
