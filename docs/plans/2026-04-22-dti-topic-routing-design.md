# DTI Topic Routing Design

## Goal

Turn the DTI topic page into a clearer decision-tree entry so users and search engines can see which debt-to-income subpath matches the reader's actual question.

## Scope

- Rewrite `src/pages/topics/debt-to-income.astro` so it behaves like a routing hub, not a broad DTI overview page.
- Keep the stronger DTI destination guides stable and route into them more intentionally.
- Add regression coverage that locks in the topic page's routing-tree role and trust model.

## Problem

The DTI cluster already has stronger child pages, but the topic page still reads like a mixed summary:

- it stacks calculator notes, inclusion rules, housing-payment notes, thresholds, and improvement tips together,
- it does not clearly separate full-calculation, inclusion-rules, ratio-definition, housing-payment, improvement, and threshold questions,
- it risks flattening the cluster into a generic "learn about DTI" page instead of a usable entry point.

## Design Decisions

### 1. Make the topic page classify the DTI question first

The page should first sort readers into the major DTI question types:

- full DTI calculation before applying,
- what counts in DTI and which debts/income are included,
- front-end versus back-end DTI definitions,
- housing payment and how much house/payment fits the ratio,
- how to improve DTI before applying,
- threshold ranges and compensating factors.

### 2. Route to the strongest next page, not the most generic DTI explainer

Each branch should point to the page that now does the clearest job:

- `debt-to-income-calculator` and `dti-calculation-step-by-step` for the full ratio workflow,
- `what-counts-in-dti` for inclusion rules,
- `dti-housing-payment-piti-includes` and mortgage-payment tools for housing-input questions,
- `how-to-improve-dti` for action sequencing,
- supporting front-end/back-end and thresholds pages when the user really needs definition or range interpretation.

### 3. Keep the stronger trust model intact

The topic page already has the stronger trust pattern. This pass should preserve:

- `authorProfile`
- `reviewProfiles`
- `ReviewedByCard`
- visible `Last updated`

The improvement should come from routing structure and page-role clarity, not from changing trust scaffolding.

## Verification Strategy

Add a focused regression test that checks the DTI topic page includes:

- a routing-tree style chooser,
- explicit branch phrases for the major DTI question types,
- intact trust coverage and visible update date.

Then run the full test suite.

## Expected Outcome

After this pass:

- the DTI topic page should feel like the top of a decision tree,
- the stronger DTI guides should look intentionally connected instead of loosely bundled,
- the cluster should present a clearer hierarchy to Google and a more original entry-page role to users.
