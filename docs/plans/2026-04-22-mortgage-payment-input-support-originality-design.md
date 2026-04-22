# Mortgage Payment Input Support Originality Design

## Goal

Upgrade the mortgage-payment input-support guides so they stop reading like repeated support templates and instead work as distinct editorial decision pages for the four main weak-input questions inside a payment estimate.

## Why This Change

The mortgage-payment cluster now has stronger core destinations, but several noindex support pages still show the older pattern:

- the review card uses the older string-only reviewer model,
- section stacks repeat the same "inputs / checklist / mistakes" rhythm across pages,
- the pages describe the topic broadly instead of owning one narrow decision job.

That creates a low-originality signal even when the topic itself is useful. These pages matter because they sit one click away from the mortgage payment calculator and often absorb uncertainty-driven searches.

## Target Pages

- `/guides/mortgage-payment-rate-sensitivity`
- `/guides/mortgage-payment-property-tax-assumptions`
- `/guides/mortgage-payment-insurance-assumptions`
- `/guides/mortgage-payment-pmi-thresholds`

## Desired Role by Page

### 1. Mortgage payment rate sensitivity

This page should own the "how much does a small rate move change the decision?" question:

- isolate the rate move from every other monthly payment input,
- frame the result in payment room, lock decisions, and buydown tradeoffs,
- route readers away if the real problem is affordability or full-payment composition.

### 2. Mortgage payment property tax assumptions

This page should own the "is my tax assumption too low?" question:

- explain why the seller tax bill can be misleading,
- focus on reassessment, exemptions, and special assessments,
- turn tax estimation into a conservative scenario decision, not a generic tax explainer.

### 3. Mortgage payment insurance assumptions

This page should own the "is my insurance placeholder distorting the payment?" question:

- anchor the page around quote hygiene and coverage matching,
- distinguish rebuild-cost logic from market-value thinking,
- call out missing policy layers such as flood, wind, or HOA gaps.

### 4. Mortgage payment PMI thresholds

This page should own the "does PMI change the better scenario?" question:

- compare PMI duration, removal path, and monthly-payment distortion,
- separate PMI analysis from generic down-payment advice,
- route readers toward down-payment, affordability, or extra-payment pages only when those become the real decision.

## Shared Structural Upgrade

All four pages should share:

- stronger `authorProfile` and `reviewProfiles` metadata,
- `ReviewedByCard` with written, editorial, and methodology review identities,
- visible `Last updated` aligned with the page constant,
- one clear "Use this guide when..." role section,
- one section explaining when to move to a sibling page,
- a compact References section.

## Content Constraints

- Preserve the current tested role phrases.
- Keep the pages noindex support leaves; this wave is about originality and trust, not indexation changes.
- Remove repeated generic checklist blocks when they do not sharpen the page's decision job.
- Avoid links to redirect-source pages.

## Test Strategy

Add one regression test that asserts the four pages:

- keep the stronger trust model,
- keep `ReviewedByCard`,
- keep visible freshness alignment,
- include new page-specific originality cues that prove each page owns a distinct weak-input question.

## Expected Outcome

After this wave, the mortgage-payment input-support set should feel less like a cloned support cluster and more like a set of tightly scoped editorial explainers that help users fix the exact assumption that is making their payment estimate unreliable.
