# Mortgage Extra Payment Intent Split Design

## Goal

Reduce keyword self-competition between the two mortgage extra-payment calculator URLs without changing slugs, redirects, canonicals, or component logic.

## Approved Direction

Keep both URLs indexable and self-canonical.

- `/calculators/extra-payment-calculator` remains the broad primary page for:
  - extra mortgage payment calculator
  - pay extra on mortgage
  - monthly extra payment
  - one extra payment per year
- `/calculators/additional-principal-payment-calculator` becomes the narrower support page for:
  - additional principal payment
  - lump sum principal payment
  - principal-only payment
  - paid ahead vs principal-only

This avoids a disruptive SEO move such as a 301 or canonical merge while still making the two pages easier for search engines to differentiate.

## Why This Is The Best Low-Risk Option

- It preserves existing URLs and indexation patterns.
- It avoids short-term consolidation volatility from redirects or canonical changes.
- It still improves clarity by separating broad payoff-intent wording from principal-only and lump-sum wording.

## Page-Level Positioning

### Broad Page

File: `src/pages/calculators/extra-payment-calculator.astro`

Keep this page centered on broad mortgage extra-payment intent:

- monthly extra payments
- extra mortgage payments in general
- one extra payment per year
- general payoff acceleration

Only make light copy changes here:

- preserve the current H1 and broad framing
- keep broad scenario coverage intact
- add a concise handoff to the support page for principal-only and lump-sum workflows

### Support Page

File: `src/pages/calculators/additional-principal-payment-calculator.astro`

Narrow this page more clearly around:

- additional principal
- lump sum timing
- principal-only posting
- paid-ahead pitfalls

Front-of-page content should make that distinction obvious before Google or users need to infer it from deeper sections.

## Internal Link Strategy

Do not sweep the entire site. Update only the most semantically important references first.

### Keep Pointing To Broad Page

Use `/calculators/extra-payment-calculator` for guides that are primarily about:

- monthly extra payments
- sustained payoff acceleration
- one extra payment per year
- broad mortgage payoff planning

### Point To Support Page

Use `/calculators/additional-principal-payment-calculator` for guides that are primarily about:

- lump sums or windfalls
- principal-only posting
- additional principal instructions
- paid-ahead vs principal-only behavior

High-signal guides for this adjustment:

- `src/pages/guides/extra-payment-windfall-strategy.astro`
- `src/pages/guides/principal-only-extra-payments.astro`
- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- `src/pages/guides/extra-mortgage-payments.astro`

## Verification Strategy

Add a focused SEO regression test that checks a small set of intent-specific guides link to the intended calculator page.

The test should be narrow and durable:

- it should verify the chosen high-signal guides point to the intended calculator URL
- it should not try to assert every sitewide link pattern
- it should complement existing canonical and redirect-link checks

## Rollout Constraints

- no slug changes
- no redirect changes
- no canonical changes
- no calculator component logic changes
- no bulk sitewide link rewrite in this pass

## Success Signals To Watch After Release

Watch Search Console for at least 10 to 21 days.

Desired signal split:

- `/calculators/extra-payment-calculator` gains or retains more broad extra-payment query coverage
- `/calculators/additional-principal-payment-calculator` gains more additional-principal, lump-sum, and principal-only query coverage

Do not judge the result from the first few days of ranking churn.
