# APR Cluster Consolidation Design

## Goal

Reduce low-value overlap inside the APR workflow cluster while keeping the existing URLs intact and making the page hierarchy much clearer:

- `topics/apr` stays the main APR topic hub.
- `apr-calculator` stays the strongest action page when the reader already has the comparison inputs.
- `how-to-find-your-apr` stays the discovery page for source-finding and disclosure lookup.
- `apr-vs-interest-rate`, `apr-with-origination-fee`, `apr-by-loan-type`, and `how-to-use-apr-for-credit-cards` stay as parent guides that each own one distinct comparison job.
- `apr-comparison-checklist` stays the final consistency check before trusting the comparison.
- the surrounding redirect-source or narrow-support pages continue to exist only as feeders, not peer destinations.

The goal is not to reduce the URL count. The goal is to reduce the number of pages that appear to be competing for the same search intent.

## Context

Search Console improvement after the May 29 update suggests the site is earning more impressions, but still not enough clicks. For the APR cluster, the most likely reason is not that the site lacks content. It is that the cluster still spreads similar intent across too many pages:

- some pages behave like discovery pages,
- some pages behave like comparison pages,
- some pages behave like support pages,
- but the distinctions are not always explicit enough.

That creates a weak cluster shape:

- the hub is clearer than before, but nearby guides still need stronger role boundaries,
- support pages can still read like second main pages,
- freshness and trust dates across refreshed APR assets are not yet aligned.

This should remain a soft-consolidation pass:

- keep routes stable,
- keep redirects and noindex source pages intact,
- keep the calculator framework intact,
- tighten hierarchy through page-role clarity, routing, and trust alignment.

## Recommended Approach

### Option A: Soft consolidation with role tightening

This is the recommended path.

- Preserve the URLs.
- Keep `topics/apr` as the main router.
- Strengthen the parent guides so each one clearly owns a different job.
- Rewrite support and gate pages so they explicitly hand off to the correct parent guide or calculator.
- Refresh trust dates only on pages that are genuinely reworked in this pass.
- Lock the hierarchy with SEO regression tests.

Trade-off: slower than a hard merge, but much safer for a live site that already has some visibility.

### Option B: Add selective `noindex` to weaker APR leaves

This would reduce overlap more aggressively by downgrading some support pages sooner.

Trade-off: cleaner index shape, but higher risk of removing useful support signals before we finish clarifying the parent pages.

### Option C: Merge multiple APR pages into fewer URLs

This would collapse several parent and support pages into fewer destinations.

Trade-off: potentially simpler long-term, but much higher short-term risk. Not recommended for this phase because the site still needs stable crawling and trust accumulation.

## Decision

Proceed with Option A.

This pass should:

- keep `topics/apr` as the one clear entry hub,
- make `how-to-find-your-apr` explicitly a discovery page,
- make `apr-comparison-checklist` explicitly a final validation page,
- make each parent guide clearly own its own comparison branch,
- make refreshed pages show consistent maintenance and trust signals,
- keep source pages and redirect targets aligned with the current consolidation strategy.

## Page Role Model

### Hub

- `src/pages/topics/apr.astro`
- Job: route readers to the right APR branch before they choose a guide or calculator.

### Action Page

- `src/pages/calculators/apr-calculator.astro`
- Job: calculate once the reader already has the inputs and knows which APR decision they are making.

### Discovery Gate

- `src/pages/guides/how-to-find-your-apr.astro`
- Job: help readers locate the disclosed APR before they compare anything.

### Parent Guides

- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/apr-by-loan-type.astro`
- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- Job: own one distinct comparison branch each.

### Final Check

- `src/pages/guides/apr-comparison-checklist.astro`
- Job: confirm apples-to-apples comparison discipline after the reader already understands the specific branch.

### Support / Absorbed Intent Pages

- redirect-source or noindex pages like `apr-vs-interest-rate-fees`, `apr-tool`, `apr-and-prepayment`, and similar variants
- Job: support absorbed intent, reinforce redirects or noindex strategy, and avoid acting like new main destinations.

## Success Criteria

- `topics/apr` clearly behaves like the main routing tree for APR intent.
- `how-to-find-your-apr` clearly behaves like a discovery page, not a full comparison page.
- `apr-comparison-checklist` clearly behaves like a final comparison check, not a broad explainer.
- each parent guide clearly owns a distinct decision job.
- refreshed APR pages have aligned trust and maintenance cues.
- tests guard against cluster drift and overlap.
