# Redirect Source Noindex Phase 1 Design

## Goal

Finish the safest next phase of redirect-source cleanup by aligning `mortgage-payment` and `credit-card` redirect-source guides with the same source-page `noindex, follow` pattern already established for refinance and APR.

## Context

The current review pass surfaced one clear structural issue:

- many guide URLs are already redirected in `vercel.json`
- those same URLs are already excluded from the sitemap in `astro.config.mjs`
- but a large portion of the corresponding source pages still do not include `robots="noindex, follow"`

That creates an inconsistent search signal. We have already fixed this pattern in the refinance cluster and, in the latest batch, in the APR cluster. The remaining work should now follow the same rule.

The safest next move is not a site-wide sweep in one pass. It is to close the clusters whose destination pages are already strongest and most recently reviewed.

Current phase-selection logic:

- `mortgage-payment` redirect-source pages: `14`
- `credit-card` redirect-source pages: `12`
- `rent-vs-buy` redirect-source pages: `11`
- `dti` redirect-source pages: `10`
- `extra-mortgage` redirect-source pages: `3`

Destination maturity is not equal across those clusters:

- `mortgage-payment` destination pages already have visible review coverage, references, and recent `Last updated` alignment
- `credit-card` destination pages are mostly strong, but `how-credit-card-interest-is-calculated` still needs a small trust refresh
- `rent-vs-buy` and `dti` destination pages are not yet as consistently reviewed, so they should wait for Phase 2

## Options

### Option 1: Phase 1 only covers `mortgage-payment`

Pros:

- safest possible scope
- every source page points to destinations already strengthened in the latest batches

Cons:

- leaves a visibly incomplete source-page cleanup pattern in `credit-card`
- lower overall impact for the review effort

### Option 2: Phase 1 covers `mortgage-payment` and `credit-card`

Pros:

- best balance of safety and impact
- closes `26` redirect-source pages in the two most mature clusters
- requires only one small destination-page trust refresh beyond source-page `noindex`

Cons:

- slightly larger test and edit surface

### Option 3: Phase 1 covers `mortgage-payment`, `credit-card`, `rent-vs-buy`, and `dti`

Pros:

- bigger cleanup in one pass

Cons:

- the `rent-vs-buy` and `dti` destination pages are not yet as uniformly mature
- higher risk of shrinking source pages before the destination pages are fully ready
- harder to review safely before unified submission

## Recommendation

Choose **Option 2**.

Phase 1 should close the safest remaining clusters:

- `mortgage-payment`
- `credit-card`

Then Phase 2 can handle:

- `rent-vs-buy`
- `dti`
- any leftover small clusters

## Design

### Scope

#### Mortgage-payment redirect-source pages

These source pages should add `robots="noindex, follow"` while preserving their route and canonical structure:

- `src/pages/guides/mortgage-payment-15-vs-30-year.astro`
- `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-pmi-thresholds.astro`
- `src/pages/guides/how-to-estimate-property-taxes.astro`
- `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- `src/pages/guides/hoa-fees-and-mortgage-payment.astro`
- `src/pages/guides/mortgage-payment-escrow-account.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`
- `src/pages/guides/mortgage-payment-dti-housing-payment.astro`

These already point to stronger destination pages:

- `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- `src/pages/guides/mortgage-payment-affordability-checklist.astro`
- `src/pages/guides/what-is-piti.astro`
- `src/pages/guides/principal-and-interest-vs-escrow.astro`
- `src/pages/guides/dti-housing-payment-piti-includes.astro`

#### Credit-card redirect-source pages

These source pages should also add `robots="noindex, follow"`:

- `src/pages/guides/credit-card-balance-transfer-fee.astro`
- `src/pages/guides/balance-transfer-payoff-timeline.astro`
- `src/pages/guides/credit-card-payoff-fixed-vs-minimum.astro`
- `src/pages/guides/credit-card-payoff-payment-target.astro`
- `src/pages/guides/credit-card-payoff-timeline.astro`
- `src/pages/guides/credit-card-payoff-order.astro`
- `src/pages/guides/credit-card-utilization-payoff.astro`
- `src/pages/guides/average-daily-balance-interest.astro`
- `src/pages/guides/credit-card-interest-calculator-payoff.astro`
- `src/pages/guides/credit-card-minimum-payment-formula.astro`
- `src/pages/guides/calculate-credit-card-payoff.astro`
- `src/pages/guides/credit-card-payment-payoff-calculator.astro`

These point to the following destination pages:

- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`

### Minimal destination-page reinforcement

This phase should avoid broad content expansion. The only destination page that needs a trust refresh before we shrink source-page signals is:

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`

That page should receive the same basic trust bundle already used on stronger destination pages:

- `ReviewedByCard`
- refreshed `lastUpdated`
- visible `Last updated:` line aligned with the constant
- keep the existing `References`

No other destination pages need a new expansion cycle in this phase.

### Source-page behavior

Every source page in this phase should:

- keep the existing `BaseLayout`
- keep the existing route and `canonicalPath`
- keep the redirect relationship intact
- add `robots="noindex, follow"`

This is a crawl-signal cleanup, not a content rewrite.

### Test strategy

Add a new regression section in `tests/seo.test.ts` that checks:

1. Phase 1 `mortgage-payment` and `credit-card` source pages stay aligned across:

- `vercel.json` redirect map
- `astro.config.mjs` sitemap exclusion
- page-level `robots="noindex, follow"`

2. `how-credit-card-interest-is-calculated` keeps:

- `ReviewedByCard`
- `References`
- matching `lastUpdated` and visible `Last updated:` text

This gives the Phase 1 cleanup the same permanent guardrails now used for refinance and APR.

## Out Of Scope

This phase should not:

- change redirects
- change route structure
- noindex `rent-vs-buy` or `dti` source pages yet
- broadly rewrite destination pages
- commit or push anything yet
