# Mortgage Payment Comparison Guides Deepening Design

## Goal

Strengthen the mortgage-payment comparison and decision-support guides that sit between the calculator and the user's real loan choice.

## Context

The first April 3 batch strengthened escrow and assumption pages. The next thin-page risk inside the same cluster is a set of live guides that represent major decisions but still read like short support notes:

- `mortgage-payment-dti-housing-payment`
- `mortgage-payment-down-payment-impact`
- `mortgage-payment-total-cost-vs-payment`
- `mortgage-payment-15-vs-30-year`
- `hoa-fees-and-mortgage-payment`

These pages are valuable because they map directly to real borrower decisions, but they still lack the visible trust and role clarity already added to the stronger destination pages.

## Options

### Option 1: Move to a different cluster now

Pros:

- broadens the site-level quality pass

Cons:

- leaves the mortgage-payment journey only half-finished
- misses the chance to make one cluster feel fully connected

### Option 2: Finish the mortgage-payment decision layer now

Pros:

- creates a more complete end-to-end path from calculation to decision
- improves both user experience and perceived topical depth
- keeps the review batch coherent

Cons:

- delays work on APR or credit-card clusters slightly

## Recommendation

Choose **Option 2**.

## Design

### Page ownership

- `mortgage-payment-dti-housing-payment` should own the question of which housing costs belong in lender DTI.
- `mortgage-payment-down-payment-impact` should own the trade-off between monthly payment, PMI, and preserving cash reserves.
- `mortgage-payment-total-cost-vs-payment` should own the conflict between low monthly payment and long-term cost.
- `mortgage-payment-15-vs-30-year` should own the term-choice decision.
- `hoa-fees-and-mortgage-payment` should own the question of how HOA dues alter the real housing payment and DTI.

### Trust pattern

Each page should receive the same visible trust bundle used in the prior batch:

- `ReviewedByCard`
- `lastUpdated` refreshed to `2026-04-03`
- matching visible update date
- `References` section with primary sources
- chooser language starting with `Use this guide when...`

### Internal-link pattern

These pages should point intentionally to:

- the mortgage payment calculator
- affordability and PITI explainers
- DTI calculator where relevant
- nearby comparison pages within the same decision chain

## Out Of Scope

This batch should not:

- change routes
- add redirects
- noindex pages
- touch unrelated clusters
- commit or push anything yet
