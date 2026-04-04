# Rent Vs Buy Break-Even Consolidation Design

## Goal

Strengthen the `rent-vs-buy-break-even` destination page so it can safely absorb the highest-signal `rent-vs-buy` support intents, then align the six already-redirected source pages with the same redirect, sitemap, and source-page `noindex, follow` pattern used in the safer refinance, APR, mortgage-payment, and credit-card cleanups.

## Context

The `rent-vs-buy` cluster is now split into two redirect groups:

- six source pages redirect to `src/pages/guides/rent-vs-buy-break-even.astro`
- five source pages redirect to `src/pages/guides/rent-vs-buy-costs-to-include.astro`

The `break-even` group is the safer next batch because the destination page already covers most of the absorbed intent at a content level:

- holding period / time horizon
- price-to-rent as a quick screen
- mortgage-rate sensitivity
- rent growth assumptions
- home appreciation assumptions
- investment return assumptions

However, the destination page is still weaker than the clusters we have already consolidated:

- `src/pages/guides/rent-vs-buy-break-even.astro` still lacks `ReviewedByCard`
- its `lastUpdated` is still `2026-02-17`
- it does not yet have a strong "use this guide when..." section that explicitly absorbs the redirected intents

At the same time, the six redirected source pages are already excluded from the sitemap in `astro.config.mjs` and already redirected in `vercel.json`, but they still do not carry page-level `robots="noindex, follow"`.

That means the cluster still sends mixed signals:

- redirect exists
- sitemap exclusion exists
- source-page noindex is still missing

This is the same structural problem we already fixed successfully in earlier clusters.

## Options

### Option 1: Add `noindex` to the six source pages only

Pros:

- smallest edit surface
- fastest to complete

Cons:

- destination page still looks weaker than the mature consolidation targets
- does not fully explain to Google why `rent-vs-buy-break-even` is the best page to rank for the absorbed intents
- leaves the cluster less defensible for future quality review

### Option 2: Strengthen `rent-vs-buy-break-even` first, then align the six source pages

Pros:

- matches our standing rule: destination first, source cleanup second
- keeps the batch small and reviewable
- improves user routing and trust while also cleaning up crawl/index signals
- safest path for a site still working through low-value signals

Cons:

- slightly more work than a noindex-only sweep

### Option 3: Consolidate both `break-even` and `costs-to-include` groups in one pass

Pros:

- larger cleanup in one round
- removes more duplicate support-page signals quickly

Cons:

- expands the batch from six redirected sources to eleven
- increases review risk
- `rent-vs-buy-costs-to-include` still needs the same trust refresh work before it should absorb its redirected source pages

## Recommendation

Choose **Option 2**.

This keeps the batch aligned with the principles we have used throughout this recovery:

- do not collapse a cluster before the destination page is ready
- do not do a site-wide sweep when a safer phased path exists
- strengthen page role clarity, trust signals, and redirect hygiene together
- keep every batch small enough to verify thoroughly before unified submission

## Design

### Scope

#### Destination page to strengthen

- `src/pages/guides/rent-vs-buy-break-even.astro`

This page should become the explicit destination for the six redirected support intents in this batch.

#### Redirect-source pages to align

- `src/pages/guides/rent-vs-buy-time-horizon.astro`
- `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`
- `src/pages/guides/rent-vs-buy-rent-growth.astro`
- `src/pages/guides/rent-vs-buy-home-appreciation.astro`
- `src/pages/guides/rent-vs-buy-investment-return.astro`
- `src/pages/guides/rent-vs-buy-mortgage-rate-sensitivity.astro`

All six already redirect to:

- `src/pages/guides/rent-vs-buy-break-even.astro`

### Destination-page reinforcement

`src/pages/guides/rent-vs-buy-break-even.astro` should receive a focused trust and role upgrade, not a redesign.

Required additions:

- add `ReviewedByCard`
- refresh `lastUpdated` to `2026-04-03`
- keep the visible `Last updated:` line aligned with the constant
- preserve the existing `References`
- add a short "Use this guide when..." section that explicitly absorbs the redirected intents

That new role section should make three things obvious:

- use this page when the main question is how long you need to stay for buying to break even
- use this page when you want to pressure-test assumptions like rent growth, appreciation, investment return, or mortgage rate
- use this page when a quick screen such as price-to-rent needs to lead into a full scenario

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

- no active non-redirect pages are currently linking to these six redirected URLs
- the remaining cross-links appear inside redirect-source pages, including pages from the future `costs-to-include` batch

Because those pages are either part of this batch or part of the next redirect-source batch, they should not be rewritten now unless a new failing test surfaces. This keeps the scope tight and avoids accidental overreach into the `costs-to-include` group.

### Test strategy

Add a dedicated regression block in `tests/seo.test.ts` that locks in:

1. the explicit redirect map for the six `rent-vs-buy` source pages
2. their sitemap exclusion in `astro.config.mjs`
3. their page-level `robots="noindex, follow"`
4. `rent-vs-buy-break-even` destination trust coverage:
   - `ReviewedByCard`
   - `References`
   - matching `lastUpdated` and visible `Last updated:`
   - explicit absorbed-intent / role language

The existing global redirected-link test should remain unchanged and continue acting as the cross-cluster guardrail.

## Out Of Scope

This batch should not:

- change redirects
- change route structure
- noindex the `rent-vs-buy-costs-to-include` source pages yet
- rewrite `rent-vs-buy-costs-to-include`
- redesign the `rent-vs-buy` topic hub
- remove or collapse source-page content beyond adding page-level noindex
- commit or push anything yet
