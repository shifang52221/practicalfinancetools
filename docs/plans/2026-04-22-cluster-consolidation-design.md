# Cluster Consolidation Design

## Goal

Tighten the strongest content clusters so Google sees fewer borderline pages competing for the same intent, while preserving the genuinely useful workflow pages that now act as primary entry points.

## Scope

This pass focuses on three clusters that were already upgraded into clearer workflow paths:

- extra payment
- minimum payment / credit-card payoff
- biweekly mortgage payoff

The first implementation round will only change indexation strategy inside the extra-payment cluster.

## Cluster Classification

### Keep and Strengthen

These pages now have distinct jobs and should remain indexable:

- `src/pages/guides/extra-mortgage-payments.astro`
- `src/pages/calculators/extra-payment-calculator.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`
- `src/pages/guides/extra-payment-target-payoff-date.astro`
- `src/pages/guides/extra-payment-liquidity-reserve.astro`
- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- `src/pages/guides/principal-only-extra-payments.astro`
- `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`
- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- `src/pages/guides/biweekly-vs-extra-principal.astro`

### Keep as Support Pages

These pages are useful, but should remain clearly subordinate to the primary workflow pages:

- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/guides/debt-snowball-vs-avalanche.astro`

### First-Round Consolidation Candidates

These pages answer narrow sub-questions but are too close to stronger destination pages to justify competing as standalone indexable entries:

- `src/pages/guides/extra-payment-escrow-not-affected.astro`
- `src/pages/guides/extra-payment-tax-deduction-impact.astro`
- `src/pages/guides/extra-payment-servicer-posting-rules.astro`
- `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`

## Consolidation Strategy

This round uses a light-consolidation approach:

- keep the pages live,
- add `robots="noindex, follow"` to the four consolidation candidates,
- exclude them from the sitemap,
- rewrite their opening language so they behave like narrow support leaves,
- reinforce routing from them back to the stronger workflow pages.

This is intentionally less aggressive than full redirects. It reduces index clutter without risking immediate path breakage.

## Why These Four

Each of the four candidate pages covers a concept that is already partially absorbed elsewhere:

- escrow behavior is better framed inside broader housing-payment pages,
- tax deduction tradeoffs belong inside broader payoff-versus-invest decision pages,
- posting rules are already close to `principal-only-extra-payments`,
- prepayment-penalty checks are a narrow diagnostic step, not a primary search destination for this site.

## Verification

The implementation should be verified by tests that confirm:

- the four consolidation candidates are marked `noindex, follow`,
- the sitemap excludes them,
- stronger workflow pages still route users into the right destinations.
