# Mortgage Payment Estimation And Entry Alignment Design

## Goal

Strengthen the mortgage-payment input-estimation pages and the main mortgage payment calculator so the entry path into the cluster feels complete, trustworthy, and clearly structured.

## Context

After the first two April 3 batches, the remaining weakest points in the mortgage-payment cluster are:

- `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- `src/pages/guides/how-to-estimate-property-taxes.astro`
- `src/pages/calculators/mortgage-payment-calculator.astro`

These URLs matter because they sit at the top of the user journey:

- the two guides help users build realistic mortgage-payment inputs
- the calculator is the main entry page for the cluster

Right now they still look lighter than the pages around them:

- no visible review coverage
- no references section
- older update dates
- limited chooser language about when to use the calculator versus the adjacent guides

## Options

### Option 1: Move to a new cluster now

Pros:

- spreads improvements across the site

Cons:

- leaves the mortgage-payment entry journey incomplete
- weakens the payoff of the last two batches

### Option 2: Finish the mortgage-payment entry layer now

Pros:

- highest leverage for user experience
- strengthens the calculator that anchors the whole topic
- reduces the risk that Google still sees the cluster as a loose set of support pages

Cons:

- delays APR or credit-card cleanup a little longer

## Recommendation

Choose **Option 2**.

## Design

### Page ownership

- `how-to-estimate-property-taxes`: should own the workflow for building realistic property-tax inputs before using the payment calculator.
- `how-to-estimate-homeowners-insurance`: should own the workflow for building realistic insurance inputs before using the payment calculator.
- `mortgage-payment-calculator`: should clearly present itself as the main starting point when the user needs the full monthly housing payment in one place.

### Trust pattern

Each page should visibly carry:

- `ReviewedByCard`
- refreshed update date
- `References` section with primary sources
- explicit chooser language showing where the page belongs in the broader workflow

### Internal-link pattern

The three pages should reinforce one another:

- the two estimation guides should route back to the calculator and the payment explainers
- the calculator should point explicitly to the tax and insurance estimation pages
- the calculator should also prefer the strengthened mortgage-payment pages over older, weaker neighboring links where appropriate

## Out Of Scope

This batch should not:

- change route structure
- add redirects
- noindex pages
- change calculator logic
- commit or push anything yet
