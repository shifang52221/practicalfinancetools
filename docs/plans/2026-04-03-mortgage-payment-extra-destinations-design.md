# Mortgage Payment And Extra Payment Destination Strengthening Design

## Goal

Reduce low-value risk in the `mortgage-payment` and `extra-payment` clusters without breaking the current site structure or doing broad cleanup.

## Context

Recent review shows the biggest remaining quality risk is not the already-consolidated refinance cluster. It is the set of still-indexable mortgage and extra-payment guides that are short, structurally similar, and uneven on trust signals.

The highest-leverage pattern in this codebase has been:

1. strengthen the true destination pages
2. make page roles more explicit
3. lock the intent split and trust coverage in tests

That approach already worked well for refinance, credit-card, DTI, and rent-vs-buy improvements.

## Options

### Option 1: Upgrade many micro-guides one by one

Pros:

- improves a larger number of URLs directly
- can raise average content depth across a whole cluster

Cons:

- highest implementation cost
- easiest way to create another batch of repetitive pages
- weaker ROI than strengthening the pages that already act as cluster destinations

### Option 2: Strengthen cluster destination pages first

Pros:

- best leverage for existing internal links and redirect targets
- safest way to improve topical authority without changing architecture
- lowers thin-page risk by making destination pages visibly stronger and more trustworthy

Cons:

- some weaker support pages remain in the site until later passes

### Option 3: Consolidate more pages now with redirects or noindex

Pros:

- fastest way to shrink indexable thin-page surface

Cons:

- higher structural risk
- user preference has been to avoid unnecessary cleanup and avoid framework disruption
- better used only after more destination strengthening

## Recommendation

Choose **Option 2**.

For this batch, strengthen the destination and high-leverage comparison pages that matter most:

- `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- `src/pages/guides/what-is-piti.astro`
- `src/pages/guides/principal-and-interest-vs-escrow.astro`
- `src/pages/guides/mortgage-payment-affordability-checklist.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`

## Design

### Page roles

- `how-mortgage-payments-are-calculated` should be the main explainer for baseline mortgage payment math and what belongs in the payment.
- `what-is-piti` should be the payment-breakdown page for PITI, PMI, HOA, and underwriting-aligned housing payment inputs.
- `principal-and-interest-vs-escrow` should own the statement-alignment question about why escrow changes while fixed-rate P&I does not.
- `mortgage-payment-affordability-checklist` should own the affordability decision workflow and absorb rate/term/payment-comparison concerns.
- `extra-payment-vs-refinance` should own the comparison between faster payoff on the current loan and replacing the loan with closing-cost friction.

### Trust signals

Each selected page should visibly carry:

- `ReviewedByCard`
- aligned update date
- references section
- short chooser language explaining when this page is the right starting point

### Test strategy

Add regression coverage in `tests/seo.test.ts` so these destination pages keep:

- review coverage
- role-signaling text
- references where expected

This keeps future edits from drifting back toward thin generic templates.

## Approval Basis

This design follows the user-approved strategy already established in the session:

- deep review before submission
- safe but strong changes
- no random cleanup
- no framework breakage
- batch-oriented improvements before any unified commit
