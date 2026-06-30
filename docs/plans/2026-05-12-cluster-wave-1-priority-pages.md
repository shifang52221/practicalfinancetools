# Practical Finance Tools Cluster Wave 1 Priority Pages

**Date:** 2026-05-12

## Purpose

This document defines the first implementation wave for ranking recovery. It does not list every good page on the site. It lists the pages that should receive the next concentrated trust, originality, and pathing improvements because they combine current visibility with cluster centrality.

## Wave 1 Goals

Wave 1 should prove three things:

1. the site can turn a tested calculator page into a stronger decision page
2. the site can turn a topic page into a true authority hub
3. the site can make support guides feel necessary rather than templated

## Wave 1 Page Set

### Primary pages

- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- `src/pages/calculators/credit-card-payoff-calculator.astro`
- `src/pages/calculators/apr-calculator.astro`
- `src/pages/topics/apr.astro`
- `src/pages/guides/how-credit-card-interest-is-calculated.astro`

### Secondary support pages in the same wave

- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`
- `src/pages/guides/how-to-find-your-apr.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/biweekly-vs-extra-principal.astro`

## Page Briefs

### 1. Biweekly Mortgage Calculator

**File**

- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`

**Current role**

- Core Asset
- Primary page for the biweekly mortgage cluster

**Why this page is in wave 1**

- It has the best current ranking proximity in the project.
- It already carries trust sections, examples, and comparison framing.
- It is the clearest candidate for an early ranking win if the page becomes more decisively useful than a generic competitor tool.

**Current strengths**

- strong trust and methodology presentation
- multiple examples and case studies
- useful next-step links to extra-payment content
- visible caution around fee programs and posting method

**Trust gap**

- the page still needs a clearer "who should start here first" statement
- it should make the boundary between true biweekly, accelerated biweekly, and plain monthly-extra even more explicit
- it should do more to help a user decide whether this page or the extra-payment calculator is the better starting point

**Originality gap**

- the current case studies are good, but still need a more direct "decision outcome" framing
- more emphasis is needed on how servicer behavior changes the real-world value of the plan
- the page should feel less like a detailed explanation of a calculator and more like a practical screening tool

**Pathing gap**

- next-step branches can be made tighter
- support-page routes should be more deliberate:
  - paid program concern -> `biweekly-mortgage-program-fees`
  - no-fee alternative -> `extra-payment-calculator`
  - payment-frequency comparison -> `biweekly-vs-extra-principal`

**Desired post-upgrade role**

- best first stop for users comparing biweekly payment behavior against simpler alternatives

**Primary support pages**

- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`

### 2. Minimum Payment Payoff Calculator

**File**

- `src/pages/calculators/minimum-payment-payoff-calculator.astro`

**Current role**

- Core Asset
- Primary page for statement-minimum modeling

**Why this page is in wave 1**

- highest-visibility page in the current dataset
- clearly tested by Google across multiple close-intent queries
- directly relevant to user pain and commercial value

**Current strengths**

- strong explanation of simplified issuer minimum rules
- good tables and examples
- clear links to fixed-payment and snowball/avalanche paths
- realistic warning about statement differences and fees

**Trust gap**

- the page should define more sharply when the model is useful and when users must defer to issuer rules
- it should do more to explain the difference between "statement minimum due" and a user's self-chosen payment
- it should reinforce that this is a planning model, not a statement reconstruction tool

**Originality gap**

- the page can offer stronger guidance around what users should do after seeing a very slow payoff result
- it should more clearly translate outputs into practical payment decisions and fallback strategies
- it should explain the most common issuer rule patterns in a more actionable way

**Pathing gap**

- the path from minimum-payment shock to next-step planning can be stronger
- support-page roles should be more explicit:
  - statement math confusion -> `how-credit-card-interest-is-calculated`
  - behavior/strategy question -> `credit-card-payoff-strategy`
  - fixed payment target -> `credit-card-payoff-calculator`

**Desired post-upgrade role**

- the clearest planning page for users trying to understand the cost of paying only the statement minimum

**Primary support pages**

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`

### 3. Credit Card Payoff Calculator

**File**

- `src/pages/calculators/credit-card-payoff-calculator.astro`

**Current role**

- Core Asset
- fixed-payment planning page within the same cluster

**Why this page is in wave 1**

- meaningful visibility already exists
- it is essential to the minimum-payment cluster path
- it can become the "solution page" once users move beyond minimum-only modeling

**Current strengths**

- clear distinction from the minimum-payment calculator
- good example tables
- strong explanation of payment-to-interest dynamics
- useful pathing to payoff order tools

**Trust gap**

- the page should more clearly explain when fixed-payment planning is more appropriate than minimum-rule modeling
- it should better explain how statement-cycle timing and changing APRs affect real outcomes
- it should include a more explicit warning for users with promo APRs, fees, or active new purchases

**Originality gap**

- the page should do more to help users choose a realistic payment target
- it can better show the tradeoff between timeline realism and monthly affordability
- it should feel more like a payment-decision page than just an amortization page for cards

**Pathing gap**

- the links to minimum-payment, snowball, avalanche, and interest-explainer pages should reflect clearer use-case branches
- the guide relationship with `how-credit-card-interest-is-calculated` should be more deliberate

**Desired post-upgrade role**

- best single-card payoff planning page once the user knows the monthly payment they can sustain

**Primary support pages**

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/calculators/minimum-payment-payoff-calculator.astro`

### 4. APR Calculator

**File**

- `src/pages/calculators/apr-calculator.astro`

**Current role**

- Core Asset
- primary APR calculation page

**Why this page is in wave 1**

- strong visibility already exists
- APR is one of the best candidates for a full calculator + topic + guide authority cluster
- the page already has credible examples but still has room to become more decision-led

**Current strengths**

- explains APR conceptually and numerically
- includes fee examples and comparison framing
- already carries strong trust presentation
- directly addresses a long-tail monthly-rate conversion query

**Trust gap**

- the page should more clearly define when it is the correct starting point and when the user should begin on the topic page instead
- it should make official-disclosure limitations even more explicit
- it should explain more clearly which fee types users should exclude from the input

**Originality gap**

- the page can do more to compare "APR usefulness" vs "total dollars over my real horizon"
- it should better separate installment-loan use cases from card APR use cases
- it can provide stronger offer-screening logic for users comparing two quotes

**Pathing gap**

- APR topic and calculator should behave as a pair, not two pages that happen to link to each other
- guide links should reflect decision branches more clearly:
  - disclosure location -> `how-to-find-your-apr`
  - rate-vs-fee confusion -> `apr-vs-interest-rate`
  - fee-heavy quote -> `apr-with-origination-fee`

**Desired post-upgrade role**

- default calculation page for users who already have numbers and need a fair-cost estimate

**Primary support pages**

- `src/pages/topics/apr.astro`
- `src/pages/guides/how-to-find-your-apr.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/apr-for-balance-transfers.astro`

### 5. APR Topic Hub

**File**

- `src/pages/topics/apr.astro`

**Current role**

- Core Asset
- primary topic hub for APR

**Why this page is in wave 1**

- best current topic-hub opportunity in the site
- already ranking better than most topics
- directly supports one of the site's strongest calculation themes

**Current strengths**

- strong routing-tree concept
- good grouping by user question
- clear links to APR calculator and support guides
- includes caution about short-horizon comparisons

**Trust gap**

- the page needs a clearer "best starting point for most users" hierarchy
- the page should better explain when APR alone is not the best comparison metric
- it should reinforce the boundary between credit-card APR behavior and installment-loan APR comparison

**Originality gap**

- it can feel like a high-quality routing page but still not fully like a topic authority center
- it needs more judgment, not just more branch logic
- it should explain the "why" behind page ordering more strongly

**Pathing gap**

- page branches are already good, but the reading order can be more explicit
- the relationship between `apr-calculator`, `apr-vs-interest-rate`, and `how-to-find-your-apr` should be visually and conceptually sharper

**Desired post-upgrade role**

- the strongest topic hub on the site and the model for all later hub upgrades

**Primary support pages**

- `src/pages/calculators/apr-calculator.astro`
- `src/pages/guides/how-to-find-your-apr.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/apr-comparison-checklist.astro`

### 6. How Credit Card Interest Is Calculated

**File**

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`

**Current role**

- Core Asset
- primary educational explainer for the minimum-payment and payoff cluster

**Why this page is in wave 1**

- strongest current guide asset in the project
- directly supports two primary calculator pages
- already receives meaningful impressions

**Current strengths**

- good explanation of daily balance and statement-cycle logic
- useful differentiation from payoff calculators
- strong practical framing around statement reconciliation
- good CTA set into the two core card calculators

**Trust gap**

- the guide should say more clearly what it does not solve
- it should distinguish more sharply between "statement reconciliation", "minimum-payment modeling", and "fixed-payment planning"
- it should better flag when multiple APR buckets make the simple model weaker

**Originality gap**

- the guide can do more to help users map confusing statement behavior to the exact next tool
- it should extract more decision value from common statement problems such as trailing interest and promo transitions
- it can make its examples more problem-driven and less textbook-like

**Pathing gap**

- the route from this guide into the right calculator should be more explicit by use case
- the relationship with the credit-cards topic page is still weaker than it should be

**Desired post-upgrade role**

- best educational bridge page between confusing statement math and the correct card-payoff tool

**Primary support pages**

- `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- `src/pages/calculators/credit-card-payoff-calculator.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`

## Support Pages to Upgrade Within the Same Wave

These pages should be edited in support of the primary pages above, not treated as independent ranking centers.

### Credit-card support pages

- `src/pages/guides/credit-card-payoff-strategy.astro`
  - strengthen the bridge from confusion to concrete payoff action
  - clearly separate single-card payoff, minimum-only modeling, and multi-balance ordering

- `src/pages/guides/why-minimum-payments-take-so-long.astro`
  - support the minimum-payment calculator with stronger interpretation and behavioral framing

### APR support pages

- `src/pages/guides/how-to-find-your-apr.astro`
  - focus on disclosure sourcing and when to move into the calculator

- `src/pages/guides/apr-vs-interest-rate.astro`
  - sharpen the rate-vs-fee confusion branch for the APR topic and calculator

### Biweekly support page

- `src/pages/guides/biweekly-vs-extra-principal.astro`
  - become the clearest comparison page supporting the biweekly calculator's main choice point

## Wave 1 Editing Order

Recommended order:

1. `src/pages/topics/apr.astro`
2. `src/pages/calculators/apr-calculator.astro`
3. `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
4. `src/pages/calculators/minimum-payment-payoff-calculator.astro`
5. `src/pages/calculators/credit-card-payoff-calculator.astro`
6. `src/pages/guides/how-credit-card-interest-is-calculated.astro`
7. support pages tied to those six assets

This order improves the strongest topic hub first, then tightens its calculator pair, then improves the strongest calculator opportunity, then deepens the strongest credit-card cluster.

## Acceptance Standard for Wave 1

Wave 1 is ready for implementation when each target page has:

- a clear trust gap summary
- a clear originality gap summary
- a clear pathing gap summary
- named supporting pages
- a defined post-upgrade role

If any target page lacks those five items, wave 1 planning is incomplete.
