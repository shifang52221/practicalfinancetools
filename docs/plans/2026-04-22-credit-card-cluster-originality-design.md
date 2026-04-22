# Credit Card Cluster Originality Design

## Goal

Deepen originality across the credit-card payoff cluster by making the strongest two pages do clearly different jobs:

- `credit-card-payoff-strategy` should become the main decision hub for choosing the right payoff path.
- `debt-snowball-vs-avalanche` should become a narrower method-selection page for readers who already know the issue is payoff order.

## Scope

- Strengthen the page role and routing on `src/pages/guides/credit-card-payoff-strategy.astro`.
- Narrow and differentiate `src/pages/guides/debt-snowball-vs-avalanche.astro`.
- Keep `src/pages/guides/why-minimum-payments-take-so-long.astro` mostly stable, with only light routing alignment if needed.
- Add regression coverage so later edits do not collapse these pages back into the same generic content shape.

## Problem

The cluster is technically healthier than before, but the two strongest credit-card support pages still overlap too much:

- `credit-card-payoff-strategy` reads like a broad summary of everything.
- `debt-snowball-vs-avalanche` still repeats too much generic payoff advice instead of owning the method-choice question.

That weakens originality signals and makes it harder for Google to understand which page deserves to rank for which intent.

## Design Decisions

### 1. Give `credit-card-payoff-strategy` one unmistakable job

This page should act like a routing decision page, not a generic article. It should explicitly separate four reader situations:

- one balance with a fixed-payment question,
- minimum-payment drag,
- promo / balance-transfer deadline,
- multiple balances where payoff order matters.

The content should feel like triage: identify the bottleneck, pick the right next model, and avoid mixing every subtopic together.

### 2. Give `debt-snowball-vs-avalanche` a narrower psychological and behavioral role

This page should no longer try to be a general debt-payoff explainer. Its job is to help someone choose between two payoff-order methods after the multi-debt problem is already established.

That means the page should emphasize:

- momentum vs interest savings,
- how to judge whether the interest gap is meaningful,
- when behavior outweighs spreadsheet optimization,
- when to switch methods.

### 3. Preserve trust signals while changing the substance

We should keep the stronger trust model introduced in earlier passes:

- `authorProfile`
- `reviewProfiles`
- `ReviewedByCard`
- visible `Last updated`

The originality gain should come from page role, examples, and routing, not from removing trust scaffolding.

## Verification Strategy

Add a focused SEO regression test that checks:

- `credit-card-payoff-strategy` includes clear bottleneck-routing phrases unique to a decision hub,
- `debt-snowball-vs-avalanche` includes clear method-selection phrases unique to an order-choice page,
- both pages keep the trust model and visible update dates.

Then run the full test suite to make sure the new role expectations do not break the broader cluster rules.

## Expected Outcome

After this pass:

- the credit-card cluster should look less templated,
- the main payoff page should feel like a routing hub rather than a broad summary,
- the snowball-vs-avalanche page should feel like a real method-choice page,
- the site should present fewer overlapping signals across its highest-value credit-card pages.
