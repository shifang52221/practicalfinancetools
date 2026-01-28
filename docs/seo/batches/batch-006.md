## Batch 006 (Topic hubs and compliance pages depth)

Date: 2026-01-28

Scope: deepen topic hubs and core compliance pages to reduce thin-content risk. Add checklists, FAQs, references, and update stamps; normalize punctuation to ASCII.

### URLs upgraded
- /contact
- /about
- /methodology
- /editorial-policy
- /terms
- /topics
- /topics/apr
- /topics/credit-cards
- /topics/mortgage-payoff
- /guides

### Changes applied (high level)
- Added structured sections (workflows, checklists, FAQs, references) for topic hubs.
- Expanded About/Methodology/Editorial/Terms/Contact with clearer guidance and scope.
- Normalized punctuation to ASCII in touched sections.
- Refreshed "Last updated" stamps to 2026-01-28 where applicable.

### QA / validation
- Build: `npm run build` (pass; upstream Vite warning in Astro dependency)
- Local SEO audit: `reports/seo-audit/local-20260128-094856` (issues.csv empty)
