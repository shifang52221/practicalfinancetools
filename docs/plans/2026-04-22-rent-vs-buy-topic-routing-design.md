# Rent vs Buy Topic Routing Design

## Goal

Turn the rent-vs-buy topic page into a clearer decision-tree entry so users and search engines can see which rent-versus-buy subpath matches the reader's actual question.

## Scope

- Rewrite `src/pages/topics/rent-vs-buy.astro` so it behaves like a routing hub, not a broad rent-versus-buy overview page.
- Keep the stronger rent-vs-buy destination guides stable and route into them more intentionally.
- Add regression coverage that locks in the topic page's routing-tree role and trust model.

## Problem

The rent-vs-buy cluster already has stronger child pages, but the topic page still reads like a mixed summary:

- it stacks calculator guidance, input checklists, horizon notes, local-market notes, and assumptions together,
- it does not clearly separate full-scenario, break-even, upfront-cash, ownership-cost, affordability, and sensitivity questions,
- it risks flattening the cluster into a generic "rent vs buy guide" instead of a usable entry point.

## Design Decisions

### 1. Make the topic page classify the rent-vs-buy question first

The page should first sort readers into the major rent-versus-buy question types:

- full scenario comparison before deciding whether to buy,
- break-even timing or holding period,
- upfront cash, down payment, or closing costs,
- ownership costs like taxes, insurance, HOA, maintenance, or PMI,
- monthly affordability or payment fit,
- assumption sensitivity for rent growth, appreciation, rates, or investment return.

### 2. Route to the strongest next page, not the most generic rent-vs-buy explainer

Each branch should point to the page that now does the clearest job:

- `rent-vs-buy-calculator` for the full scenario decision,
- `rent-vs-buy-break-even` for holding-period and break-even math,
- `rent-vs-buy-costs-to-include` for upfront-cash and ownership-cost modeling,
- mortgage-payment and DTI tools when the main issue is affordability,
- `rent-vs-buy-checklist` when the scenario needs assumption cleanup before rerunning.

### 3. Keep the stronger trust model intact

The topic page already has the stronger trust pattern. This pass should preserve:

- `authorProfile`
- `reviewProfiles`
- `ReviewedByCard`
- visible `Last updated`

The improvement should come from routing structure and page-role clarity, not from changing trust scaffolding.

## Verification Strategy

Add a focused regression test that checks the rent-vs-buy topic page includes:

- a routing-tree style chooser,
- explicit branch phrases for the major rent-versus-buy question types,
- intact trust coverage and visible update date.

Then run the full test suite.

## Expected Outcome

After this pass:

- the rent-vs-buy topic page should feel like the top of a decision tree,
- the stronger rent-vs-buy guides should look intentionally connected instead of loosely bundled,
- the cluster should present a clearer hierarchy to Google and a more original entry-page role to users.
