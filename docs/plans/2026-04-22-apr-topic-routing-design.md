# APR Topic Routing Design

## Goal

Turn the APR topic page into a clearer decision-tree entry so users and search engines can see which APR subpath matches the reader's actual question.

## Scope

- Rewrite `src/pages/topics/apr.astro` so it behaves like a routing hub, not a broad APR overview page.
- Keep the stronger APR destination guides stable and route into them more intentionally.
- Add regression coverage that locks in the topic page's routing-tree role and trust model.

## Problem

The APR cluster already has stronger child pages, but the topic page still reads like a mixed summary:

- it stacks calculator notes, fee notes, glossary notes, pitfalls, examples, and quick answers together,
- it does not clearly separate concept confusion, fee-structure, loan-type, short-horizon, disclosure-location, and credit-card APR questions,
- it risks flattening the APR cluster into a generic "learn about APR" page instead of an intentional entry point.

## Design Decisions

### 1. Make the topic page classify the APR question first

The page should first sort readers into the major APR question types:

- APR versus interest rate or fee-heavy offer confusion,
- origination fees, closing costs, or financed fees,
- APR comparisons across loan types,
- short hold period, prepayment, or refinance horizon,
- where to find the official APR disclosure,
- promo APR, balance transfer fee, or penalty APR on credit cards.

### 2. Route to the strongest next page, not the most generic APR explainer

Each branch should point to the page that now does the clearest job:

- `apr-vs-interest-rate` for concept-level rate-versus-APR confusion,
- `apr-with-origination-fee` for fee-heavy offers and financed-fee tradeoffs,
- `apr-by-loan-type` for cross-product APR interpretation,
- `apr-comparison-checklist` for short-horizon and prepayment-sensitive comparisons,
- `how-to-find-your-apr` for disclosure-location and official-value questions,
- `how-to-use-apr-for-credit-cards` for promo/balance-transfer/penalty APR cases.

### 3. Keep the stronger trust model intact

The topic page already has the stronger trust pattern. This pass should preserve:

- `authorProfile`
- `reviewProfiles`
- `ReviewedByCard`
- visible `Last updated`

The improvement should come from routing structure and page-role clarity, not from changing trust scaffolding.

## Verification Strategy

Add a focused regression test that checks the APR topic page includes:

- a routing-tree style chooser,
- explicit branch phrases for the major APR question types,
- intact trust coverage and visible update date.

Then run the full test suite.

## Expected Outcome

After this pass:

- the APR topic page should feel like the top of a decision tree,
- the stronger APR guides should look intentionally connected instead of loosely bundled,
- the cluster should present a clearer hierarchy to Google and a more original entry-page role to users.
