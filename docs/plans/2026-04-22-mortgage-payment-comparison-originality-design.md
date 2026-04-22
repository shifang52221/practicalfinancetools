# Mortgage Payment Comparison Originality Design

## Goal

Upgrade the comparison-oriented mortgage-payment guides so they stop reading like overlapping support templates and instead behave like distinct decision pages for five different comparison jobs inside the housing-payment workflow.

## Why This Change

The mortgage-payment cluster now has stronger core destinations, stronger input-support pages, and stronger escrow/closing support pages. The remaining weak layer is the comparison set:

- older string-only review-card coverage,
- repeated checklist sections that make pages sound interchangeable,
- blurred page roles between DTI, down-payment tradeoffs, total-cost framing, term choice, and HOA-specific affordability.

These pages matter because they sit near high-intent decision points where users are choosing between scenarios, not just learning concepts.

## Target Pages

- `/guides/mortgage-payment-dti-housing-payment`
- `/guides/mortgage-payment-down-payment-impact`
- `/guides/mortgage-payment-total-cost-vs-payment`
- `/guides/mortgage-payment-15-vs-30-year`
- `/guides/hoa-fees-and-mortgage-payment`

## Desired Role by Page

### 1. Mortgage payment in DTI calculations

This page should own the qualification math mismatch:

- why lender DTI often feels tighter than borrower math,
- why full housing payment matters more than principal-and-interest-only estimates,
- when front-end and back-end DTI answers diverge.

### 2. Down payment impact on mortgage payments

This page should own the cash deployment tradeoff:

- when a larger down payment improves the payment,
- when preserving reserves is the better move,
- why PMI reduction is only one part of the answer.

### 3. Mortgage payment vs total cost

This page should own the low-payment illusion:

- why lower required payment can be the more expensive path,
- why amortization reset and longer term hide cost,
- why the real comparison should be run over the hold period, not just on monthly payment.

### 4. 15-year vs 30-year mortgage payment

This page should own the required-pace decision:

- forced faster payoff versus preserved flexibility,
- monthly discipline versus optional prepayment,
- the lifestyle impact of choosing one required payment shape over another.

### 5. HOA fees and mortgage payment

This page should own the non-loan housing-cost problem:

- why HOA behaves like housing cost without behaving like amortizing debt,
- how HOA changes affordability and DTI,
- why special assessments and insurance gaps matter more than the basic dues line alone.

## Shared Structural Upgrade

All five pages should share:

- stronger `authorProfile` and `reviewProfiles` metadata,
- `ReviewedByCard` with written, editorial, and methodology review identities,
- visible `Last updated` aligned with the page constant,
- one clear "Use this guide when..." role section,
- one section telling the reader when to move to a sibling page,
- a compact References section.

## Content Constraints

- Preserve the existing tested role phrases.
- Keep the pages noindex support leaves.
- Reduce repeated generic "inputs / checklist / mistakes" sections when they do not sharpen the page's own decision job.
- Avoid redirect-source guide links.

## Test Strategy

Add one regression test that asserts the five pages:

- keep the stronger trust model,
- keep `ReviewedByCard`,
- keep visible freshness alignment,
- include new originality phrases proving each page owns a different comparison question.

## Expected Outcome

After this wave, the comparison set should read like a guided decision layer:

- qualify the payment correctly,
- decide how much cash to put down,
- decide whether lower payment is actually cheaper,
- decide whether 15-year or 30-year matches the household,
- decide whether HOA changes the whole affordability picture.
