# Rent Vs Buy Costs-To-Include Consolidation Design

## Goal

Strengthen the `rent-vs-buy-costs-to-include` destination page so it can safely absorb the remaining `rent-vs-buy` ownership-cost support intents, then align the five already-redirected source pages with the same redirect, sitemap, and source-page `noindex, follow` pattern used in the earlier refinance, APR, mortgage-payment, credit-card, and rent-vs-buy break-even batches.

## Context

The `rent-vs-buy` cluster now has two redirect groups:

- the `break-even` group, which was just strengthened and aligned
- the `costs-to-include` group, which is the next safest batch

This second group contains five redirected source pages:

- down payment
- maintenance estimate
- closing costs
- HOA fees
- PMI assumptions

All five already redirect to:

- `src/pages/guides/rent-vs-buy-costs-to-include.astro`

All five are also already excluded from the sitemap in `astro.config.mjs`.

That means the same structural cleanup rule now applies here:

- redirect exists
- sitemap exclusion exists
- source-page `noindex, follow` is still missing

At a content level, `rent-vs-buy-costs-to-include` is already a plausible destination page for these intents because it covers:

- one-time buyer costs
- opportunity cost of the down payment
- ongoing homeowner costs
- maintenance vs improvements
- down payment and PMI notes
- holding-period sensitivity and selling costs

However, it is still weaker than the destination pages we have already consolidated:

- it does not yet include `ReviewedByCard`
- its `lastUpdated` is still `2026-02-17`
- it does not yet have a strong role section that clearly says this is the destination for ownership-cost modeling questions

So the page is conceptually ready, but its trust layer still needs the same reinforcement we added in the previous batches.

## Options

### Option 1: Add `noindex` to the five source pages only

Pros:

- smallest edit surface
- fastest possible cleanup

Cons:

- destination page remains weaker than the stronger consolidation targets
- does not clearly explain why this page should rank for the absorbed ownership-cost intents
- leaves the cluster less defensible in a future quality review

### Option 2: Strengthen `rent-vs-buy-costs-to-include` first, then align the five source pages

Pros:

- follows our standing rule: destination first, source cleanup second
- keeps the batch small and reviewable
- improves both user routing and quality signals
- safely completes the second half of the `rent-vs-buy` consolidation without expanding scope

Cons:

- slightly more work than a noindex-only pass

### Option 3: Expand the batch to rewrite additional `rent-vs-buy` active pages and source-page cross-links

Pros:

- more visible cluster cleanup in one round

Cons:

- raises review risk
- breaks the rule of keeping this batch narrowly scoped
- invites unnecessary rewrites in pages that are not the problem right now

## Recommendation

Choose **Option 2**.

This keeps the work aligned with the principles we have followed throughout the site-quality recovery:

- strengthen destination pages before collapsing source-page signals
- do not broaden a safe batch into a cluster-wide rewrite
- align trust, page role, redirect hygiene, and indexing signals together
- keep each batch small enough to verify thoroughly and hold locally

## Design

### Scope

#### Destination page to strengthen

- `src/pages/guides/rent-vs-buy-costs-to-include.astro`

This page should become the explicit destination for the five redirected ownership-cost support intents in this batch.

#### Redirect-source pages to align

- `src/pages/guides/rent-vs-buy-down-payment.astro`
- `src/pages/guides/rent-vs-buy-maintenance-estimate.astro`
- `src/pages/guides/rent-vs-buy-closing-costs.astro`
- `src/pages/guides/rent-vs-buy-hoa-fees.astro`
- `src/pages/guides/rent-vs-buy-pmi-assumptions.astro`

All five already redirect to:

- `src/pages/guides/rent-vs-buy-costs-to-include.astro`

### Destination-page reinforcement

`src/pages/guides/rent-vs-buy-costs-to-include.astro` should receive a focused trust and role upgrade, not a redesign.

Required additions:

- add `ReviewedByCard`
- refresh `lastUpdated` to `2026-04-04`
- keep the visible `Last updated:` line aligned with the constant
- preserve the existing `References`
- add a short "Use this guide when..." section that explicitly absorbs the redirected ownership-cost intents

That role section should make three things obvious:

- use this page when upfront cash, down payment tradeoffs, or closing costs are the main rent-vs-buy modeling question
- use this page when maintenance, HOA, taxes, insurance, or PMI assumptions are the weak point in the ownership-cost model
- use this page when the break-even result looks wrong because ownership costs were incomplete or unrealistic

This is the minimum reinforcement needed to justify the consolidation safely.

### Source-page behavior

Every source page in this batch should:

- keep the current route
- keep the current `canonicalPath`
- keep the existing content structure
- keep the redirect relationship untouched
- add `robots="noindex, follow"` at the `BaseLayout` level

This batch is about signal alignment, not rewriting source pages.

### Link-hygiene boundary

The existing global regression already checks that active pages do not link to redirected guide URLs.

Current audit result:

- active pages are linking to the live destination page `rent-vs-buy-costs-to-include`, which is correct
- the remaining links to redirected source URLs appear inside redirect-source pages

Because those links live inside pages that are themselves part of the redirect-source cleanup, they should not be rewritten now unless the existing global redirected-link regression fails. This keeps the scope tight and avoids unnecessary churn.

### Test strategy

Add a dedicated regression block in `tests/seo.test.ts` that locks in:

1. the explicit redirect map for the five `rent-vs-buy` ownership-cost source pages
2. their sitemap exclusion in `astro.config.mjs`
3. their page-level `robots="noindex, follow"`
4. `rent-vs-buy-costs-to-include` destination trust coverage:
   - `ReviewedByCard`
   - `References`
   - matching `lastUpdated` and visible `Last updated:`
   - explicit absorbed-intent / role language

The existing global redirected-link test should remain unchanged and continue acting as the cross-cluster guardrail.

## Out Of Scope

This batch should not:

- change redirects
- change route structure
- rewrite `rent-vs-buy-break-even`
- redesign the `rent-vs-buy` topic hub
- rewrite active cluster pages just because they mention the destination page
- rewrite source-page body copy beyond any minimal role-language needed on the destination page
- commit or push anything yet
