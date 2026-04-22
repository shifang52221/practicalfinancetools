# Guides Index Routing Design

## Goal

Turn `/guides` into a stronger guide-entry page that routes readers into the best primary guide path before they browse narrower support pages.

## Why This Change

The current guides index already has trust signals and useful links, but it still reads like a large catalog:

- the page mixes primary guide paths with many support leaves,
- the search/filter block makes the page feel more like a browse tool than an editorial router,
- several sections repeat category lists without clarifying when a reader should stop at a stronger guide versus when they should go deeper.

That keeps the page organized, but it does not fully solve the "template directory" problem.

## Desired Role

`/guides` should answer three questions:

- Which primary guide path should I start with?
- When should I use a topic hub instead of a guide?
- When is a narrower support page actually worth opening?

## Recommended Structure

### 1. Hero reframed around guide-path selection

Lead with the idea that readers should choose the guide job before browsing the library.

### 2. Primary guide-path routing table

Add a compact routing table for the main guide jobs:

- understand borrowing cost, fees, or APR comparison -> APR guide path
- understand credit-card payoff strategy or minimum-payment drag -> Credit-card guide path
- understand DTI rules, affordability inputs, or how to improve the ratio -> DTI guide path
- understand rent-vs-buy break-even and assumptions -> Rent-vs-buy guide path
- understand extra mortgage payments, posting rules, or payoff tradeoffs -> Mortgage-payoff guide path
- understand refinance break-even and horizon tradeoffs -> Refinance guide path

### 3. Clarify topic hubs versus guides

Add a short section explaining that topic hubs are better when the reader does not yet know which sub-question they have, while guides are better when the question is already specific.

### 4. Clarify strongest guide paths versus support leaves

Add a short section that explains when to stay on a primary guide and when to open a narrower support page.

### 5. Simplified strongest-path cards

Keep a compact set of strongest guide-entry cards, but remove the heavy directory feel and repeated long category lists.

### 6. Trust and freshness preserved

Keep:

- `ReviewedByCard`
- stronger author/reviewer metadata
- visible `Last updated`

Refresh `lastUpdated` to the current rewrite batch date.

## Content Constraints

- Remove the search/filter browse block because it reinforces a catalog feeling more than a decision-routing role.
- Reduce repeated long lists of support pages on the index itself.
- Keep the page focused on stronger editorial routing and path selection.
- Avoid linking to redirect-source guide URLs.

## Test Strategy

Add a new SEO regression test asserting that `src/pages/guides/index.astro` behaves like a strongest-guide-path router, with exact phrases for:

- choose the guide job before you choose the article,
- borrowing cost / APR path,
- credit-card payoff path,
- DTI / affordability path,
- rent-vs-buy path,
- extra-mortgage-payment path,
- refinance path,
- trust markers and matching visible `Last updated`.

## Expected Outcome

After this change, `/guides` should feel less like a large list of articles and more like an editorial entry layer that sends readers into the correct primary guide before they browse support content.
