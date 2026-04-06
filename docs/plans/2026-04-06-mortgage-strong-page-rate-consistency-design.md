# Mortgage Strong-Page Rate Consistency Design

## Goal

Tighten the remaining mortgage payoff strong pages so they use accurate mortgage-rate terminology and keep users inside the mortgage payoff workflow instead of leaking attention into unrelated topic paths.

This batch is intentionally conservative:

- no new pages
- no route changes
- no redirect changes
- no indexability changes
- no framework changes

The work is limited to copy accuracy, CTA focus, and regression coverage.

## Context

The recent batches already improved:

- trust signals
- topic routing
- noindex edge cleanup
- extra-payment workflow structure

The next highest-confidence improvement is not more content volume. It is stronger consistency on the pages that already matter most.

Two quality issues remain in the mortgage payoff cluster:

### 1. Mortgage examples still call the modeled rate "APR"

Several strong mortgage guides use example copy like:

- `6.50% APR for 360 months`

That wording is too loose for mortgage modeling examples. In these pages, the modeled input is the note rate / mortgage rate, not the all-in APR disclosure concept.

We already enforced this distinction on the calculators and a few noindex/alias pages. The same accuracy should now carry into the remaining strong pages.

### 2. One core mortgage guide still leaks to an unrelated topic path

`src/pages/guides/extra-mortgage-payments.astro` is a central mortgage payoff workflow page, but its `Next steps` cluster still includes:

- `/calculators/rent-vs-buy-calculator`
- `/guides/rent-vs-buy-break-even`

That weakens topical focus and creates an unnecessary user-path detour at the end of a mortgage payoff guide.

## In-Scope Pages

- `src/pages/guides/amortization-with-extra-payments.astro`
- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/extra-mortgage-payments.astro`
- `src/pages/guides/mortgage-recast-vs-extra-payments.astro`
- `src/pages/guides/pmi-removal-vs-extra-principal.astro`
- `tests/seo.test.ts`

## Options

### Option 1: Terminology-only sweep

Pros:

- very low risk
- improves factual precision immediately
- easy to protect with regression tests

Cons:

- leaves minor CTA focus drift in place

### Option 2: Terminology sweep plus focused CTA cleanup

Pros:

- still low risk
- improves both factual precision and user-path focus
- reinforces topical quality without changing site structure

Cons:

- slightly broader than copy-only changes

### Option 3: Broader mortgage workflow rewrite

Pros:

- more visible changes

Cons:

- unnecessary for the current issue
- higher risk of scope creep
- worse fit with the "unified local batches, no random pushes" workflow

## Recommendation

Choose **Option 2**.

This is the safest strong move because it improves content accuracy and topical focus at the same time without widening into route, sitemap, or index changes.

## Design

### Terminology rule

For mortgage modeling pages:

- do not describe example modeled mortgage inputs as `% APR`
- use `note rate` when the page is modeling the loan's rate input directly
- use `mortgage rate` only where the page already frames the input more generally

This rule applies only to mortgage pages in this batch, not to credit-card or APR education pages where `APR` is the correct term.

### CTA / routing rule

Core mortgage payoff pages should route readers toward:

- mortgage payoff calculators
- mortgage payoff topic hub
- mortgage payoff support guides
- adjacent mortgage decision pages when directly relevant

Avoid unrelated end-of-page routing into:

- rent-vs-buy tools
- rent-vs-buy guides

This batch only needs one actual cleanup here:

- remove the two rent-vs-buy `Next steps` links from `extra-mortgage-payments`
- keep that cluster focused on mortgage payoff workflows

### Page-by-page target

#### `amortization-with-extra-payments`

- convert worked-example `% APR` wording to `note rate`

#### `biweekly-vs-extra-principal`

- convert worked-example `% APR` wording to `note rate`

#### `biweekly-mortgage-program-fees`

- convert worked-example `% APR` wording to `note rate`

#### `extra-mortgage-payments`

- convert worked-example `% APR` wording to `note rate`
- remove unrelated rent-vs-buy links from the final CTA cluster

#### `mortgage-recast-vs-extra-payments`

- convert worked-example `% APR` wording to `note rate`

#### `pmi-removal-vs-extra-principal`

- convert worked-example `% APR` wording to `note rate`

### Regression strategy

Extend `tests/seo.test.ts` so the current mortgage-rate terminology regression also covers these six guides.

Require:

- each target file no longer contains `% APR` in the modeled mortgage example copy
- each target file contains the expected `note rate` wording

Add a focused assertion for `extra-mortgage-payments`:

- the file must not include `/calculators/rent-vs-buy-calculator`
- the file must not include `/guides/rent-vs-buy-break-even`

This keeps the test aligned with the intent of the batch instead of relying on manual review.

## Out of Scope

- changing routes or canonicals
- adding or removing `noindex`
- changing redirects
- rewriting mortgage payoff architecture
- modifying calculators
- pushing, deploying, or committing
