## Batch 133 (DTI calculator simplification)

Date: 2026-01-30

Scope: simplify DTI calculator inputs to reduce complexity while keeping smart outputs and target guidance.

### URLs updated
- /calculators/debt-to-income-calculator

### Changes applied (high level)
- Removed breakdown toggles to keep inputs focused on three primary fields.
- Kept target presets and smart outputs (headroom, max housing, income needed).
- Simplified hints to highlight PITI + HOA + PMI and required minimums.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260130-235353`
