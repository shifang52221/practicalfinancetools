# APR Consolidation And Destination Strengthening Design

## Goal

Reduce low-value risk in the APR cluster by clearly separating redirect-source pages from destination pages, while strengthening the destination pages that should continue to absorb APR search intent.

## Context

The APR cluster now has a structural split:

- about `30` APR-related pages total
- about `10` pages that should remain as destination or topic-entry pages
- about `20` guide URLs that already redirect in `vercel.json`

That structure is directionally correct, but the quality signals are not yet aligned:

- the redirect-source APR pages are excluded from the sitemap, but they do not yet have the same `noindex, follow` source-page guard used in the refinance cluster
- only a small portion of the APR cluster has visible review coverage
- many APR pages still sit below the stronger content threshold used in recent site-quality review passes
- destination pages do not yet absorb every redirected APR intent strongly enough

This leaves the cluster vulnerable to the same pattern we have already been correcting elsewhere on the site: too many adjacent URLs that feel semantically close, with insufficient role clarity between source pages and destination pages.

This batch should stay aligned with the approved strategy:

- no framework or routing changes
- no random deletions or broad cleanup
- keep the current Vercel redirect map intact
- improve the cluster in place
- keep all changes local until the unified review and submission

## Options

### Option 1: Only add `noindex` to APR redirect-source pages

Pros:

- safest structural change
- reduces mixed indexing signals quickly
- minimal editing volume

Cons:

- destination pages may still underperform because they do not fully absorb redirected intent
- does not improve trust coverage enough on its own

### Option 2: Add `noindex` to APR redirect-source pages and strengthen the destination pages

Pros:

- best balance of safety and effectiveness
- reduces thin-entry risk while improving the pages that should rank
- matches the pattern already used successfully in refinance and mortgage-payment work

Cons:

- moderate editing volume
- requires careful regression coverage to avoid redirect-link drift

### Option 3: Deepen the entire APR cluster, including redirect-source pages

Pros:

- raises content depth across more URLs
- could improve perceived completeness at a glance

Cons:

- wastes effort on URLs that should no longer be treated as destination pages
- increases review complexity
- easier to muddy page roles again

## Recommendation

Choose **Option 2**.

Keep the existing redirect structure, but make the page roles explicit:

- redirect-source APR pages become clearly non-indexable source pages with `robots="noindex, follow"`
- destination pages become stronger, more trustworthy landing pages that absorb the redirected intent and guide users to the right next step

## Design

### Cluster roles

Split the APR cluster into two layers:

#### Destination pages

These pages should continue to act as the visible APR entry points and absorb redirected intent:

- `src/pages/topics/apr.astro`
- `src/pages/calculators/apr-calculator.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/apr-by-loan-type.astro`
- `src/pages/guides/apr-comparison-checklist.astro`

This batch should focus directly on the four highest-value guides:

- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/apr-by-loan-type.astro`

#### Redirect-source pages

These pages should remain as redirect sources, but they need explicit source-page controls:

- calculator-entry sources like `apr-tool`, `apr-calculator-payment`, `interest-rate-apr-calculator`
- fee-comparison sources like `apr-vs-interest-rate-fees`, `apr-and-closing-costs`, `apr-when-fees-are-financed`
- refinance and term variants like `apr-for-refinance-comparison`, `apr-and-term-length`, `apr-and-prepayment`
- credit-card APR variants like `credit-card-apr-vs-interest-rate`, `credit-card-interest-apr-vs-daily`, `credit-card-apr-promo-vs-standard`, `credit-card-penalty-apr`
- loan-type variants like `personal-loan-apr-comparison`, `auto-loan-apr-comparison`, `student-loan-apr-comparison`, `small-business-loan-apr-comparison`

### Source-page behavior

Every APR redirect-source page should add the same protection pattern already used on refinance source pages:

- `robots="noindex, follow"` on the page layout
- keep canonical and route structure stable
- keep the page file present, but clearly downgraded as a source page rather than an index target

This does not change the redirect itself. It only removes residual ambiguity for crawlers that still fetch the source page.

### Destination-page strengthening

Each selected destination page should visibly demonstrate that it owns the absorbed intent:

- `ReviewedByCard`
- refreshed `lastUpdated` and matching visible `Last updated:` line
- clearer chooser language like `Use this guide when...`
- `References` with primary or high-trust public sources
- stronger next-step links to the calculator, topic hub, and adjacent decision pages

The content should explicitly absorb redirected questions:

- `apr-vs-interest-rate` should cover fee-driven APR differences and refinance-comparison framing
- `apr-with-origination-fee` should absorb closing-cost, financed-fee, and points-adjacent comparisons without creating duplicate destination behavior
- `how-to-use-apr-for-credit-cards` should absorb daily-interest, promo-vs-standard, and penalty APR intent
- `apr-by-loan-type` should absorb personal, auto, student, and small-business APR comparisons

### Internal-link hygiene

The APR cluster must not continue linking users to redirect-source URLs from active pages.

This batch should preserve and extend the existing rule:

- active pages link only to final destination URLs
- redirected source pages may remain as files, but should not receive fresh internal-link promotion

### Test strategy

Add APR-specific regression coverage in `tests/seo.test.ts` for two classes of issues:

1. Redirect-source guardrails

- APR redirect-source pages must keep `robots="noindex, follow"`
- the redirect map and sitemap exclusions must stay aligned for the selected APR source URLs

2. Destination trust and intent absorption

- selected APR destination pages must include `ReviewedByCard`
- selected APR destination pages must include a required chooser phrase
- selected APR destination pages must include `References`
- selected APR destination pages must keep visible `Last updated:` aligned with `lastUpdated`
- selected APR destination pages must mention the absorbed redirected intents they are expected to own

This protects both the crawl surface and the pages we actually want Google to evaluate.

## Out Of Scope

This batch should not:

- add new redirects
- remove existing redirects
- redesign APR page layouts
- commit or push anything yet
- restructure unrelated topic clusters
