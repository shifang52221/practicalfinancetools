# Refinance Topic Routing Design

## Goal

Turn the refinance topic page into a clearer decision-tree entry so users and search engines can see which refinance subpath matches the reader's actual question.

## Scope

- Rewrite `src/pages/topics/refinance.astro` so it behaves like a routing hub, not a broad refinance overview page.
- Keep the stronger refinance support pages stable and route into them more intentionally.
- Add regression coverage that locks in the topic page's routing-tree role and trust model.

## Problem

The refinance cluster already has stronger child pages, but the topic page still reads like a mixed summary:

- it stacks break-even notes, fee notes, checklists, alternatives, and examples together,
- it does not clearly separate timing, cost, execution, term-reset, pricing-structure, and alternative-path questions,
- it risks flattening the refinance cluster into one generic "learn about refinance" page instead of a usable entry point.

## Design Decisions

### 1. Make the topic page classify the refinance question first

The page should first sort readers into the major refinance question types:

- break-even timing or time horizon,
- closing costs or cash-to-close,
- rate lock, document prep, or execution checklist,
- term reset or payment-versus-total-cost tradeoff,
- points, lender credits, or rolling costs,
- refinance versus extra payments or other alternatives.

### 2. Route to the strongest next page, not the most generic refinance explainer

Each branch should point to the page that now does the clearest job:

- `refinance-break-even` for hold-period and break-even math,
- `refinance-closing-costs` for fee structure and cash-to-close interpretation,
- `refinance-checklist` for operational prep and rate-lock execution,
- supporting refinance/alternative pages when the question is really about term reset, pricing structure, or whether refinancing is the right move at all.

### 3. Keep the stronger trust model intact

The topic page already has the stronger trust pattern. This pass should preserve:

- `authorProfile`
- `reviewProfiles`
- `ReviewedByCard`
- visible `Last updated`

The improvement should come from routing structure and page role clarity, not from changing trust scaffolding.

## Verification Strategy

Add a focused regression test that checks the refinance topic page includes:

- a routing-tree style chooser,
- explicit branch phrases for the major refinance question types,
- intact trust coverage and visible update date.

Then run the full test suite.

## Expected Outcome

After this pass:

- the refinance topic page should feel like the top of a decision tree,
- the stronger refinance support pages should look intentionally connected instead of loosely stacked,
- the cluster should present a clearer hierarchy to Google and a more original page role to users.
