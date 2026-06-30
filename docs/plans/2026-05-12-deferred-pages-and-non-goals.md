# Practical Finance Tools Deferred Pages and Non-Goals

**Date:** 2026-05-12

## Purpose

This document exists to protect the current recovery phase from scope creep. The project has enough surface area already. The next wave must stay concentrated on a small set of high-probability pages and clusters.

## Deferred Clusters

These clusters should remain stable, monitored, and available, but they are not front-line execution targets for the current wave.

### 1. Extra Payment

Why deferred:

- The cluster has strong visibility, especially through `extra-payment-calculator`.
- However, the current project needs to prove stronger trust concentration and topic discipline first.
- This cluster can become a major second-wave target after the first three priority clusters are strengthened.

Deferred pages include:

- `src/pages/calculators/extra-payment-calculator.astro`
- `src/pages/guides/extra-mortgage-payments.astro`
- `src/pages/guides/extra-payment-target-payoff-date.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`
- `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- and related extra-payment support pages

### 2. Refinance

Why deferred:

- There is some real visibility on `refinance-break-even`.
- But the cluster is not strong enough right now to outrank the first three focus clusters in immediate priority.
- Refinance work risks widening the project before the current trust strategy proves itself.

Deferred pages include:

- `src/pages/topics/refinance.astro`
- `src/pages/guides/refinance-break-even.astro`
- `src/pages/guides/refinance-checklist.astro`
- `src/pages/guides/refinance-closing-costs.astro`

### 3. Debt-to-Income

Why deferred:

- DTI pages remain valid support assets.
- Current visibility is too limited to justify first-wave concentration.
- This cluster should be preserved, not expanded.

Deferred pages include:

- `src/pages/calculators/debt-to-income-calculator.astro`
- `src/pages/topics/debt-to-income.astro`
- `src/pages/guides/dti-calculation-step-by-step.astro`
- `src/pages/guides/what-counts-in-dti.astro`
- `src/pages/guides/how-to-improve-dti.astro`

### 4. Rent vs Buy

Why deferred:

- There are isolated long-tail positives, but not enough current breadth.
- This cluster should be revisited after the first-wave trust model is proven.

Deferred pages include:

- `src/pages/calculators/rent-vs-buy-calculator.astro`
- `src/pages/topics/rent-vs-buy.astro`
- `src/pages/guides/rent-vs-buy-break-even.astro`
- `src/pages/guides/rent-vs-buy-checklist.astro`
- `src/pages/guides/rent-vs-buy-costs-to-include.astro`

### 5. Debt Snowball and Avalanche

Why deferred:

- The snowball calculator is being tested, but this cluster is not a better immediate bet than the current three priorities.
- It should be preserved as a future focused wave, not diluted with partial edits right now.

Deferred pages include:

- `src/pages/calculators/debt-snowball-calculator.astro`
- `src/pages/calculators/debt-avalanche-calculator.astro`
- `src/pages/guides/debt-snowball-vs-avalanche.astro`

## Deferred Page Types

These page patterns should not consume first-wave execution time unless they directly block a priority page.

### Exact-match or narrow support variants

Examples:

- highly narrow mortgage extra-payment variants
- pages that exist mainly as small permutations of a broader comparison

### Low-visibility support pages without clear cluster leverage

If a page:

- has little or no current visibility
- does not support a first-wave cluster
- does not strengthen review readiness

then it stays deferred.

### Trust infrastructure polish beyond what is necessary

Publisher-trust pages still matter, but this wave is not for endless policy-page refinement. After the current baseline, the main effort should move to high-impact content pages.

## Explicit Non-Goals for This Wave

The following are intentionally out of scope:

- creating new topic families
- launching a new wave of mass content production
- whole-site visual redesigns
- rebuilding layout systems without a direct ranking or trust reason
- broad noindex campaigns
- mass page deletions
- reopen-and-expand refinance as a major front-line cluster
- broad DTI buildout
- large rent-vs-buy refresh wave
- trying to rescue every page at once

## What Counts as Scope Creep

The current wave is drifting if any of these happen:

- more than three primary clusters become active at once
- support pages start getting treated like equal ranking centers
- new guides are proposed before the current Core Assets are upgraded
- broad cleanup work replaces focused trust work
- implementation time shifts away from the identified first-wave pages

## Allowed Exceptions

Exceptions are allowed only if one of these is true:

- a deferred page directly blocks the usefulness of a priority Core Asset page
- a factual error, broken route, or serious trust issue is found on a deferred page
- a live ranking signal changes materially and justifies re-prioritization

Any exception should still be smaller than reopening the full cluster.

## Revisit Trigger

Deferred clusters should be reconsidered only after one or more of the following:

- first-wave pages are upgraded and verified
- priority clusters show ranking movement
- topic hubs start behaving more like authority centers
- Search Console shows a new pattern that changes opportunity ranking

Until then, defer by default.
