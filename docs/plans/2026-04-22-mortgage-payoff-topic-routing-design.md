# Mortgage Payoff Topic Routing Design

## Goal

Turn the mortgage-payoff topic page into a clearer decision-tree entry so users and search engines can see which mortgage-payoff subpath matches the reader's actual question.

## Scope

- Rewrite `src/pages/topics/mortgage-payoff.astro` so it behaves like a routing hub, not a broad summary page.
- Keep the strengthened extra-payment, biweekly, and support guides stable.
- Add regression coverage that locks in the topic page's decision-tree role.

## Problem

The mortgage-payoff cluster already has stronger child pages, but the topic page still feels too mixed:

- it stacks calculators, guides, checklists, and comparison notes together,
- it does not clearly separate baseline-payment, extra-payment, lump-sum, biweekly, principal-only, and refinance-alternative questions,
- it risks flattening the structure that the child pages now establish.

## Design Decisions

### 1. Make the topic page classify the question first

The page should first sort readers into the major mortgage-payoff question types:

- baseline monthly payment / amortization,
- monthly extra or target-payoff planning,
- lump sum or one-extra-payment pattern,
- biweekly vs monthly extra,
- principal-only / servicer handling,
- extra payment vs refinance / recast / PMI alternative.

### 2. Route to the strongest next page, not the most generic page

Each branch should point to the page that now does the clearest job:

- calculators when the reader already knows the main input,
- guides when the reader still needs interpretation or operational detail.

### 3. Keep the trust model intact

The topic page already has the stronger trust pattern. This pass should preserve:

- `authorProfile`
- `reviewProfiles`
- `ReviewedByCard`
- visible `Last updated`

The improvement should come from routing structure, not from changing trust scaffolding.

## Verification Strategy

Add a focused regression test that checks the mortgage-payoff topic page includes:

- a routing-tree style chooser,
- explicit branch phrases for the major mortgage-payoff question types,
- intact trust coverage and visible update date.

Then run the full test suite.

## Expected Outcome

After this pass:

- the mortgage-payoff topic page should feel like the top of a decision tree,
- the existing strong extra-payment and biweekly pages should look more intentionally connected,
- the cluster should present a clearer hierarchy to Google.
