# Mortgage Payment Estimation Entry Originality Design

## Goal

Upgrade the mortgage-payment estimation guides and calculator entry so they stop reading like generic support leaves and instead behave like a clean entry layer for building a reliable full housing-payment estimate.

## Why This Change

The mortgage-payment cluster now has stronger core destinations, input-support pages, escrow/closing support pages, and comparison pages. The last high-priority gap is the estimation-entry layer:

- the two estimation guides still read like generic explainers,
- the main mortgage-payment calculator still behaves more like a calculator with appended notes than a true workflow entry,
- the trust model is uneven compared with the newer pages.

These three pages matter because they are often the first touch for mortgage-payment users. If they still feel template-heavy, the rest of the workflow is harder to trust.

## Target Pages

- `/guides/how-to-estimate-homeowners-insurance`
- `/guides/how-to-estimate-property-taxes`
- `/calculators/mortgage-payment-calculator`

## Desired Role by Page

### 1. How to estimate homeowners insurance

This page should own the last-missing insurance input:

- how to replace a placeholder premium with a usable estimate,
- why quote comparability matters more than collecting random numbers,
- how coverage design changes the monthly payment model.

### 2. How to estimate property taxes

This page should own the last-missing tax input:

- how to estimate property taxes without copying the wrong seller bill,
- how reassessment risk changes the monthly payment estimate,
- how to turn local tax uncertainty into a practical monthly input.

### 3. Mortgage payment calculator

This page should own the full-entry workflow:

- gather principal, interest, taxes, insurance, HOA, and PMI in one place,
- route users toward better tax and insurance inputs before over-trusting the output,
- send users toward DTI, affordability, and comparison pages after the first full estimate.

## Shared Structural Upgrade

All three pages should share:

- stronger `authorProfile` and `reviewProfiles` metadata,
- `ReviewedByCard` with written, editorial, and methodology review identities,
- visible `Last updated` aligned with the page constant or calculator metadata,
- one clear role section,
- tighter routing to sibling pages,
- a compact References section.

## Content Constraints

- Preserve the existing tested role phrases.
- Keep the two guides noindex support leaves.
- Keep the calculator indexable and clearly positioned as the main entry for full monthly housing-payment estimation.
- Reduce generic checklist repetition where it does not sharpen the page's job.
- Avoid redirect-source guide links.

## Test Strategy

Add one regression test that asserts the two guides and calculator:

- keep the stronger trust model,
- keep `ReviewedByCard`,
- keep freshness alignment,
- include page-specific originality cues proving they act as estimation-entry pages instead of generic explainers.

## Expected Outcome

After this wave, the mortgage-payment estimation layer should work like a coherent funnel:

- estimate taxes,
- estimate insurance,
- build the full housing payment in one place,
- then move to affordability, DTI, and scenario comparison with better inputs.
