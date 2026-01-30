## Batch 121 (Schema dedupe)

Date: 2026-01-30

Scope: remove duplicate JSON-LD WebPage/Breadcrumb on calculator pages.

### URLs updated
- /calculators/*

### Changes applied (high level)
- Added layout flags to disable BaseLayout WebPage/Breadcrumb schema when calculator layouts emit their own JSON-LD.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260130-131209`
