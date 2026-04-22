# Credit Card Topic Routing Design

## Goal

Turn the credit-card topic page into a clearer decision-tree entry so users and search engines can immediately see which credit-card subpath fits the reader's real problem.

## Scope

- Rewrite `src/pages/topics/credit-cards.astro` so it behaves like a routing hub, not a broad summary page.
- Keep the recently differentiated guide pages stable.
- Add regression coverage that locks in the topic page's routing-tree role.

## Problem

The credit-card guides now have clearer roles, but the topic page still reads like a mixed overview:

- it stacks calculators, query shortcuts, and generic checklists together,
- it does not strongly separate one-balance, minimum-payment, statement-math, promo, and multi-balance questions,
- it risks collapsing the cleaner guide structure back into a generic “everything about credit cards” page.

## Design Decisions

### 1. Make the topic page a routing tree, not a content dump

The page should first ask what kind of credit-card problem the reader has, then send them to the best next page.

The five main branches should be:

- one balance with a fixed monthly payment target,
- minimum payment drag,
- statement interest / math confusion,
- promo APR or balance-transfer deadline,
- multiple balances and payoff order.

### 2. Keep calculators and guides paired by question

Each branch should route to the strongest next asset:

- a calculator when the user already knows the key input,
- a guide when the user still needs interpretation.

That keeps the page useful without repeating the guide content.

### 3. Preserve trust and visible freshness

The topic page already uses the stronger trust model. This pass should keep:

- `authorProfile`
- `reviewProfiles`
- `ReviewedByCard`
- visible `Last updated`

The originality gain should come from better routing structure, not from changing the trust pattern.

## Verification Strategy

Add a focused test that checks the credit-card topic page includes:

- a decision-tree style chooser,
- explicit branch phrases for the five main question types,
- intact trust coverage and visible update date.

Then run the full test suite.

## Expected Outcome

After this pass:

- the topic page should feel like the top of a decision tree,
- the stronger guide pages should look more connected and less overlapping,
- the credit-card cluster should present a cleaner hierarchy to Google.
