# Mortgage Payment Support Guides Deepening Design

## Goal

Reduce low-value risk in the still-indexable `mortgage-payment` support cluster by strengthening the pages that explain escrow, assumptions, sensitivity, and PMI around the main mortgage-payment workflow.

## Context

The site has already improved destination pages in the broader mortgage-payment and extra-payment area, but the remaining risk is still visible in a group of short, indexable support pages. These URLs are not structurally broken. The problem is that many of them still look like thin utility notes:

- weak "when should I use this page?" guidance
- no visible review coverage
- no references section
- stale-looking update dates compared with recently strengthened destination pages
- internal links that are helpful, but not yet strong enough to make each page feel like part of one authoritative workflow

This batch should stay aligned with the approved strategy:

- no framework changes
- no random cleanup
- no broad deletions
- strengthen the cluster in place
- keep everything local until the whole review batch is ready

## Options

### Option 1: Touch the whole mortgage-payment cluster at once

Pros:

- reduces thinness across more URLs in one pass
- raises the average trust coverage for the whole cluster

Cons:

- high editing volume
- easier to introduce inconsistency
- harder to review safely before a unified submission

### Option 2: Strengthen one connected support sub-cluster first

Pros:

- safest scope for a deep review pass
- easier to make the pages feel intentionally connected
- lets tests lock the pattern before the next batch

Cons:

- some mortgage-payment micro-guides remain for a later pass

### Option 3: Shrink indexable surface now with more `noindex` or redirects

Pros:

- fastest way to reduce thin-page count

Cons:

- higher structural risk
- works against the current approved strategy of improving live pages first
- premature before we finish the stronger in-place quality pass

## Recommendation

Choose **Option 2**.

For this batch, strengthen the most connected support pages around mortgage-payment assumptions and escrow mechanics:

- `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- `src/pages/guides/mortgage-payment-escrow-account.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-pmi-thresholds.astro`

## Design

### Page-role alignment

Each page should clearly own one user question:

- `mortgage-payment-rate-sensitivity`: how much payment changes when the rate changes
- `mortgage-payment-escrow-account`: what escrow is and why it changes the payment
- `mortgage-payment-escrow-shortage`: why the payment jumped after an escrow review
- `mortgage-payment-prepaids-and-reserves`: why cash-to-close is higher than the monthly payment alone suggests
- `mortgage-payment-property-tax-assumptions`: how to build realistic tax inputs
- `mortgage-payment-insurance-assumptions`: how to build realistic insurance inputs
- `mortgage-payment-pmi-thresholds`: when PMI applies and how it changes payment planning

Each page should open with explicit chooser language so a user and Google can both see why the page exists and how it differs from the adjacent guides.

### Trust bundle

Each selected page should visibly carry the same trust pattern already used on stronger destination pages:

- `ReviewedByCard`
- `lastUpdated` refreshed to the current batch date
- visible `Last updated:` line that matches the constant
- `References` section with primary-source links
- stronger next-step links back to the calculator, destination guide, and hub

### Internal-link strategy

The pages should form an intentional loop instead of acting like isolated notes:

- escrow pages should cross-link to tax, insurance, prepaids, and PITI
- assumption pages should link back to escrow and affordability workflows
- PMI and rate-sensitivity pages should link to the main mortgage calculator and decision guides
- no links should point to redirect-source URLs

### Test strategy

Add regression checks in `tests/seo.test.ts` so the selected support pages keep:

- `ReviewedByCard`
- required role-signaling phrases
- `References` sections
- aligned visible update dates

This keeps the cluster from drifting back into thin, repetitive templates during future edits.

## Out Of Scope

This batch should not:

- change routing
- add new redirects
- noindex live pages
- redesign layouts
- touch unrelated roadmap documents
- commit or push anything yet
