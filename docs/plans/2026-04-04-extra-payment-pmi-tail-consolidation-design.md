# Extra Payment And PMI Tail Consolidation Design

## Goal

Finish the remaining redirect-source cleanup by strengthening the two live destination pages that still need a clearer absorbed-intent layer, then align the final four redirected source pages with the same redirect, sitemap, and source-page `noindex, follow` pattern used in the earlier cleanup batches.

## Context

After the DTI batch, only four static redirected guide routes are still missing page-level source alignment:

- `/guides/extra-mortgage-payment-calculator` -> `/calculators/extra-payment-calculator`
- `/guides/calculate-mortgage-payoff-with-additional-principal-payments` -> `/calculators/extra-payment-calculator`
- `/guides/mortgage-extra-principal-calculator` -> `/calculators/additional-principal-payment-calculator`
- `/guides/estimating-pmi-cost` -> `/guides/what-is-piti`

All four already redirect in `vercel.json`, and all four are already excluded from the sitemap in `astro.config.mjs`.

That means the same structural gap remains:

- redirect exists
- sitemap exclusion exists
- source-page `noindex, follow` is still missing

At the destination level, the situation is split:

- [`additional-principal-payment-calculator.astro`](/f:/www/www.practicalfinancetools.com/src/pages/calculators/additional-principal-payment-calculator.astro) is already strong enough for consolidation
- [`extra-payment-calculator.astro`](/f:/www/www.practicalfinancetools.com/src/pages/calculators/extra-payment-calculator.astro) is good, but still needs a more explicit absorbed-intent layer for the remaining guide-style entry intents
- [`what-is-piti.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/what-is-piti.astro) is also good, but it does not yet say clearly enough that PMI estimation belongs inside the broader housing-payment breakdown

So the safest final cleanup is not a broad rewrite. It is a small destination-first reinforcement pass followed by page-level noindex alignment on the four remaining source pages.

## Options

### Option 1: Add `noindex` to the four source pages only

Pros:

- smallest edit surface
- finishes the structural checklist quickly

Cons:

- leaves `extra-payment-calculator` and `what-is-piti` slightly weaker than they should be as final consolidation targets
- does not clearly explain why those destination pages should own the absorbed intents

### Option 2: Strengthen the two destination pages that still need it, then align the four source pages

Pros:

- matches the successful pattern used in the prior batches
- keeps the batch very small
- improves both user routing and Google-facing clarity
- avoids unnecessary edits to already-strong destinations

Cons:

- slightly more work than a noindex-only pass

### Option 3: Broaden into another mortgage/extra-payment rewrite

Pros:

- could make more pages look refreshed in one round

Cons:

- unnecessary churn
- higher regression risk
- violates the principle of closing only the remaining gap

## Recommendation

Choose **Option 2**.

This keeps the final batch tightly scoped while still solving the real issue: the remaining redirect-source pages should be closed only after the live destination pages make their intended role explicit enough to absorb those entry intents.

## Design

### Scope

#### Destination pages to strengthen

- [`src/pages/calculators/extra-payment-calculator.astro`](/f:/www/www.practicalfinancetools.com/src/pages/calculators/extra-payment-calculator.astro)
- [`src/pages/guides/what-is-piti.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/what-is-piti.astro)

#### Destination page intentionally left unchanged

- [`src/pages/calculators/additional-principal-payment-calculator.astro`](/f:/www/www.practicalfinancetools.com/src/pages/calculators/additional-principal-payment-calculator.astro)

This calculator already has:

- `ReviewedByCard`
- `References`
- clear principal-only / lump-sum role language
- a recent `lastUpdated`

It is already strong enough for the single redirected source page pointing to it.

#### Redirect-source pages to align

- [`src/pages/guides/extra-mortgage-payment-calculator.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/extra-mortgage-payment-calculator.astro)
- [`src/pages/guides/calculate-mortgage-payoff-with-additional-principal-payments.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/calculate-mortgage-payoff-with-additional-principal-payments.astro)
- [`src/pages/guides/mortgage-extra-principal-calculator.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/mortgage-extra-principal-calculator.astro)
- [`src/pages/guides/estimating-pmi-cost.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/estimating-pmi-cost.astro)

### Destination-page reinforcement

#### `extra-payment-calculator`

This page should become the explicit home for:

- general extra mortgage payment planning
- guide-style “how do I use an extra mortgage payment calculator?” intent
- users trying to calculate mortgage payoff changes with additional principal payments before narrowing to a pure lump-sum or principal-only case

Required changes:

- keep `ReviewedByCard`
- keep `References`
- refresh `lastUpdated` to `2026-04-04`
- add a short role section near the top that explicitly absorbs:
  - “extra mortgage payment calculator”
  - “calculate mortgage payoff with additional principal payments”

This section should also continue to differentiate the page from the principal-only calculator, not blur the roles together.

#### `what-is-piti`

This page should become the explicit home for:

- housing-payment breakdown questions
- PMI as part of the full monthly housing payment
- users who arrive from a narrow PMI-estimation entry point but really need the broader payment context

Required changes:

- keep `ReviewedByCard`
- keep `References`
- refresh `lastUpdated` to `2026-04-04`
- add a short role section that explicitly explains why PMI estimation belongs inside the full PITI-style housing-payment model

### Source-page behavior

Each of the four source pages should:

- keep the current route
- keep the current `canonicalPath`
- keep the current body content
- keep the current redirect behavior untouched
- add `robots="noindex, follow"` at the `BaseLayout` level

This batch is about final signal alignment, not rewriting these source pages.

### Link-hygiene boundary

Current audit result:

- remaining direct links to these old URLs appear inside pages that are themselves redirect-source pages
- there is no need to expand into unrelated active-page rewrites if the existing global redirected-link regression remains green

This batch should therefore stay small and not spill into broader link rewrites.

### Test strategy

Add a dedicated final-tail regression block in `tests/seo.test.ts` that locks in:

1. the explicit redirect map for the four remaining source pages
2. their sitemap exclusion in `astro.config.mjs`
3. their page-level `robots="noindex, follow"`
4. destination-page trust and absorbed-intent coverage:
   - `extra-payment-calculator` keeps `ReviewedByCard`, `References`, updated `lastUpdated`, and the new absorbed-intent phrase
   - `what-is-piti` keeps `ReviewedByCard`, `References`, matching visible and internal date, and the new PMI-absorption phrase

This test should be the final local guardrail confirming that the redirect-source cleanup is complete across all currently-planned batches.

## Out Of Scope

This batch should not:

- change any redirects
- change any route structure
- rewrite `additional-principal-payment-calculator`
- broaden into more mortgage or refinance pages
- rewrite the source-page body copy beyond the page-level `noindex, follow` signal
- commit or push anything yet
