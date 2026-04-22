# Credit Card Explainer Differentiation Design

## Goal

Differentiate the two core explainers inside the credit-card cluster so they stop overlapping and each page answers one distinct reader question:

- `why-minimum-payments-take-so-long` should own the minimum-payment drag problem.
- `how-credit-card-interest-is-calculated` should own the statement-interest mechanics problem.

## Scope

- Strengthen the page role on `src/pages/guides/why-minimum-payments-take-so-long.astro`.
- Rewrite `src/pages/guides/how-credit-card-interest-is-calculated.astro` to use the stronger trust model and a narrower “statement math” role.
- Add regression coverage that locks the two explainers into distinct jobs.

## Problem

The credit-card cluster now has better routing, but these two explainers still sit too close together:

- the minimum-payment page already explains some interest mechanics,
- the interest page still drifts toward generic payoff explanation.

That overlap makes the cluster feel more templated than it should, and it weakens intent clarity for both users and search engines.

## Design Decisions

### 1. Give the minimum-payment page a “rule drag” identity

This page should answer:

- why the statement warning looks so bad,
- why shrinking minimums keep the balance alive,
- how to convert the warning into a fixed-payment target.

It should feel like a page about payment rules and payoff drag, not about daily interest mechanics.

### 2. Give the interest page a “statement reconciliation” identity

This page should answer:

- why statement interest differs from simple monthly math,
- how average daily balance works,
- how grace periods and trailing interest show up,
- what to check on the statement before assuming the calculator is wrong.

It should feel like a page about statement mechanics, not about choosing a payoff method.

### 3. Upgrade the interest page to the stronger trust model

The interest explainer still uses the older review pattern. This pass should move it onto:

- `authorProfile={TRUST_PROFILES.siteOwner}`
- `reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}`
- `ReviewedByCard` with `writtenBy`, `reviewedBy`, `secondaryReview`, and `reviewScope`

## Verification Strategy

Add a focused regression test that checks:

- the minimum-payment page includes role cues unique to payment-rule drag,
- the interest page includes role cues unique to statement-math reconciliation,
- the interest page adopts the stronger trust model,
- both pages keep visible and matching `Last updated` dates.

Then run the full test suite.

## Expected Outcome

After this pass:

- the minimum-payment page should feel like the “why the warning is so bad” page,
- the interest page should feel like the “why the statement math looks weird” page,
- the credit-card cluster should show less redundancy and stronger originality.
