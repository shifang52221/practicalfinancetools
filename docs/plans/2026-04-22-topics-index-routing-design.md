# Topics Index Routing Design

## Goal

Turn `/topics` into a genuine site-level decision router instead of a broad catalog page, so the page helps readers choose the right finance workflow before they click into a topic hub.

## Why This Change

The current topics index has stronger trust signals than before, but it still reads like a layered directory:

- multiple sections repeat the same topic set in slightly different formats,
- several blocks feel interchangeable with generic category pages,
- the page explains "topics" more than it routes real decision intent.

That is the kind of page that can look organized internally while still feeling low-value or templated to search engines and users.

## Desired Role

`/topics` should become the top-of-site routing page for finance decision clusters. It should answer:

- Which major problem am I trying to solve?
- Which topic hub should I open first?
- When do similar-looking topics overlap, and how do I avoid starting in the wrong place?

## Recommended Structure

### 1. Hero reframed around decision selection

Lead with the idea that readers should choose the finance decision before choosing the topic page.

### 2. Primary routing table

Add a compact routing table that maps real question types to the right topic hub:

- compare loan offers with fees or credits -> APR
- credit card payoff speed, minimum-payment drag, or payoff strategy -> Credit cards
- housing affordability, DTI, or payment-fit questions -> Debt-to-income
- renting versus buying over a planned hold period -> Rent vs buy
- mortgage payoff acceleration with extra principal -> Mortgage payoff
- refinance break-even, closing costs, or rate-reset decisions -> Refinance

### 3. Topic overlap clarifier

Add a short section explaining where readers often choose the wrong cluster:

- DTI vs rent-vs-buy
- mortgage payoff vs refinance
- APR vs refinance

This keeps the page useful as an editorial judgment layer, not just a link directory.

### 4. Simplified topic cards

Keep a compact set of topic entry cards, but make them secondary to the decision-routing content. The cards should reinforce each topic's role, not duplicate every earlier section.

### 5. Trust and freshness preserved

Keep:

- `ReviewedByCard`
- stronger author/reviewer metadata
- visible `Last updated`

Refresh `lastUpdated` to reflect the rewrite batch.

## Content Constraints

- Reduce repeated generic "how to compare scenarios" copy that already appears on other indexes.
- Prefer direct routing language over abstract "workflow" language.
- Avoid adding broad educational filler that belongs on topic pages or guides.
- Keep links pointed at real topic destinations, not redirect-source guide URLs.

## Test Strategy

Add a new SEO regression test asserting that `src/pages/topics/index.astro` behaves like a site-level decision router, with exact routing cues for:

- choose the finance decision before you choose the topic,
- APR cluster,
- credit-card cluster,
- DTI cluster,
- rent-vs-buy cluster,
- mortgage-payoff cluster,
- refinance cluster,
- trust markers and matching visible `Last updated`.

## Expected Outcome

After this change, `/topics` should look less like a template category page and more like an editorially useful route selector for the whole site's highest-value search journeys.
