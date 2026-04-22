# Calculators Index Routing Design

## Goal

Turn `/calculators` into a stronger calculator-entry page that helps readers choose the right tool based on the calculation job they actually have, instead of leading with a broad tool catalog.

## Why This Change

The current calculators index is already better than a raw tool list, but it still carries a noticeable directory feel:

- the full grouped tool library dominates the page,
- several sections overlap in purpose,
- the page still risks reading like a collection of utilities rather than an editorially useful entry layer.

That makes the page helpful, but not as distinctive or original as it could be.

## Desired Role

`/calculators` should answer three questions:

- What kind of calculation am I actually trying to run?
- Which calculator should I open first?
- When should I leave the calculator layer and go to a topic hub or guide?

## Recommended Structure

### 1. Hero reframed around calculator-job selection

Lead with the idea that readers should choose the calculator job before choosing the tool.

Keep the older role cue language that existing tests already expect:

- `Start with the question you are trying to answer`
- `I want to compare two loan offers`
- `I want to know whether an extra mortgage payment is realistic`

### 2. Primary calculator routing table

Add a compact routing table for the main calculator jobs:

- compare loan offers, fees, or borrowing cost -> APR calculator
- one balance payoff or fixed monthly target -> credit card payoff calculator
- multiple balances and payoff order -> snowball and avalanche calculators
- housing payment or affordability estimate -> mortgage payment calculator or DTI calculator depending on the job
- rent-vs-buy scenario comparison -> rent vs buy calculator
- extra principal or mortgage payoff acceleration -> extra payment calculator

### 3. Clarify calculators versus topics/guides

Add a short section explaining:

- calculators are best for direct numeric modeling,
- topic hubs are better when the sub-question is still unclear,
- guides are better when assumptions or interpretation need explanation.

### 4. Simplified high-priority calculator cards

Keep a compact set of strongest calculator-entry cards. They should reinforce entry roles, not repeat every tool listing above.

### 5. Full library preserved but demoted

Keep the grouped `TOOLS` library so the index still provides complete access to all calculators, but move it clearly below the stronger routing sections so it reads as a secondary browse layer.

### 6. Trust and freshness preserved

Keep:

- `ReviewedByCard`
- stronger author/reviewer metadata
- visible `Last updated`

Keep the existing ad slot unless the rewrite creates a structural reason to move it.

## Content Constraints

- Reduce repeated "quick guide" style copy that overlaps the main routing table.
- Keep the full tool library accessible, but clearly secondary.
- Do not remove trust or privacy cues that support a calculator index.
- Avoid unnecessary filler that belongs on guides or topic hubs.

## Test Strategy

Add a new SEO regression test asserting that `src/pages/calculators/index.astro` behaves like a calculator-job router, with exact phrases for:

- choose the calculator job before you choose the tool,
- compare loan offers, fees, or borrowing cost,
- one balance payoff or fixed monthly target,
- multiple balances and payoff order,
- housing payment or affordability estimate,
- rent-vs-buy scenario comparison,
- extra principal or mortgage payoff acceleration,
- trust markers and matching visible `Last updated`.

Preserve the existing role-cue phrases already required by `rewritten workflow pages should declare distinct page roles`.

## Expected Outcome

After this change, `/calculators` should feel less like a generic tool shelf and more like a strong entry page that helps readers choose the right first model before they browse the full library.
