## Batch 122 (Schema breadcrumbs)

Date: 2026-01-30

Scope: align JSON-LD page type and breadcrumb hierarchy for guides/topics.

### URLs updated
- /guides
- /guides/*
- /topics
- /topics/*
- /calculators

### Changes applied (high level)
- Set guides index to CollectionPage and kept guides detail as Article.
- Expanded BreadcrumbList to include parent sections for guides/topics and a cleaner label for calculators index.

### QA / validation
- `npm run build`
- scripts/seo/run-local-preview-audit.ps1
- Local audit: `reports/seo-audit/local-20260130-131855`
