## Batch 025 (Topics layout fix)

Date: 2026-01-28

Scope: stabilize topic cards layout on /topics and align CTA rows.

### URLs upgraded
- /topics

### Changes applied (high level)
- Added a topic card layout helper to keep CTA rows aligned.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-190316` (issues.csv empty)
