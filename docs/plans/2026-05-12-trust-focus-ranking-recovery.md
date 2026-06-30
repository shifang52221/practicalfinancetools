# Practical Finance Tools Trust Focus Ranking Recovery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the current trust-focused ranking recovery strategy into a concrete execution sequence that strengthens the site's highest-potential clusters without expanding scope or diluting topical authority.

**Architecture:** The work should proceed in controlled waves. First classify sitemap URLs by role and cluster. Then deepen trust, originality, and decision-support value on the strongest calculator-led clusters. Topic hubs and supporting guides should be improved only in ways that strengthen a designated primary page. Weak overlap pages should be reviewed after the strongest clusters are upgraded.

**Tech Stack:** Astro, TypeScript, React, Node test runner, Astro check, Astro build, Search Console export analysis

---

## Scope Rules

The following rules apply throughout implementation:

- Do not expand into new topic families.
- Do not launch a broad noindex or deletion wave in the first execution batch.
- Do not treat every page equally.
- Do not update timestamps mechanically without real editorial changes.
- Do not add trust modules unless they improve actual decision usefulness.

## URL Role Model

All live sitemap URLs should be classified into one of four operational roles.

### Role A: Core Asset

Definition:

- already receives meaningful impressions
- supports a primary query family
- has realistic potential to move ranking in the next 30-60 days

Priority:

- highest editorial, UX, and trust investment

### Role B: Cluster Support

Definition:

- supports one designated Core Asset page
- strengthens interpretation, edge cases, or comparison paths
- should not compete with the primary page for the same intent

Priority:

- medium

### Role C: Authority Infrastructure

Definition:

- helps support YMYL trust, publisher clarity, and policy readiness

Priority:

- high for review readiness, lower for search growth

### Role D: Merge or De-prioritize Candidate

Definition:

- low visibility
- weak standalone value
- overlap with stronger assets
- unclear cluster contribution

Priority:

- review later, do not act impulsively

## Cluster Priorities

### Priority Cluster 1: Biweekly Mortgage

Primary Core Asset:

- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`

Primary Support Pages:

- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`

Why first:

- strongest current ranking proximity
- best chance for earlier movement
- clearer intent than larger mixed mortgage clusters

### Priority Cluster 2: Minimum Payment and Credit Card Payoff

Primary Core Assets:

- `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- `src/pages/calculators/credit-card-payoff-calculator.astro`

Primary Support Pages:

- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`

Why second:

- highest visibility cluster
- strong user intent
- major opportunity if content becomes more decision-oriented and less templated

### Priority Cluster 3: APR

Primary Core Assets:

- `src/pages/calculators/apr-calculator.astro`
- `src/pages/topics/apr.astro`

Primary Support Pages:

- `src/pages/guides/how-to-find-your-apr.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/apr-for-balance-transfers.astro`

Why third:

- clear authority-building potential
- topic hub already has early ranking signs
- can become a model for future topic-led trust strengthening

## Task 1: Build the Sitemap Role Inventory

**Files:**
- Create: `docs/plans/2026-05-12-sitemap-role-inventory.md`
- Review: `src/pages/**/*.astro`
- Review: `src/pages/**/*.tsx`

**Step 1: Enumerate current sitemap URLs**

Use the live sitemap and map each URL to its source file.

**Step 2: Assign one role per URL**

Each URL must receive:

- role
- cluster
- primary page relationship
- action status

Use action status values:

- strengthen now
- support only
- observe
- review for overlap

**Step 3: Note overlap risks**

Mark pages that appear to target the same search intent or offer only thin differentiation.

**Step 4: Save the inventory**

The output should be easy to scan and usable as the control sheet for all later work.

**Step 5: Verify**

Cross-check that all 70 sitemap URLs are accounted for.

## Task 2: Define the Trust Upgrade Template for Core Asset Pages

**Files:**
- Create: `docs/plans/2026-05-12-core-asset-trust-checklist.md`
- Review: `src/pages/calculators/*.astro`
- Review: `src/pages/topics/*.astro`
- Review: `src/pages/guides/*.astro`

**Step 1: Define required trust elements for Core Asset pages**

Checklist categories:

- page purpose clarity
- user suitability and limitations
- decision guidance after calculation
- realistic examples
- common mistakes or misuse prevention
- methodology explanation
- review clarity
- internal next-step pathing

**Step 2: Separate required vs optional elements**

Not every page should receive the same blocks. The checklist must distinguish:

- mandatory trust blocks
- cluster-specific trust blocks
- optional blocks only when useful

**Step 3: Define what counts as meaningful originality**

Examples:

- scenario-based interpretation
- edge-case handling
- finance-rule nuance
- stronger comparison framing
- advice on when output should not be used directly

**Step 4: Save the checklist**

This document becomes the editorial standard for core-page revisions.

## Task 3: Define Topic Hub Strengthening Rules

**Files:**
- Create: `docs/plans/2026-05-12-topic-hub-strengthening-checklist.md`
- Review: `src/pages/topics/index.astro`
- Review: `src/pages/topics/apr.astro`
- Review: `src/pages/topics/credit-cards.astro`
- Review: `src/pages/topics/mortgage-payoff.astro`

**Step 1: Define what a topic page must do**

Each topic hub should:

- define the user problem space
- identify the main calculator entry
- identify key support guides
- present a decision path
- explain how pages within the topic differ

**Step 2: Define anti-patterns**

Topic hubs should not behave like:

- flat link farms
- generic summaries
- weak duplicate introductions

**Step 3: Identify the first topic page to improve**

Start with `src/pages/topics/apr.astro`.

**Step 4: Save the checklist**

## Task 4: Execute Primary Cluster Wave 1 Planning

**Files:**
- Create: `docs/plans/2026-05-12-cluster-wave-1-priority-pages.md`
- Review:
  - `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
  - `src/pages/calculators/minimum-payment-payoff-calculator.astro`
  - `src/pages/calculators/credit-card-payoff-calculator.astro`
  - `src/pages/calculators/apr-calculator.astro`
  - `src/pages/topics/apr.astro`
  - `src/pages/guides/how-credit-card-interest-is-calculated.astro`

**Step 1: Confirm the first wave page set**

Wave 1 should contain only pages with both:

- ranking potential
- cluster centrality

Recommended Wave 1:

- biweekly mortgage calculator
- minimum payment payoff calculator
- credit card payoff calculator
- APR calculator
- APR topic
- how credit card interest is calculated

**Step 2: For each page, list the exact upgrade intent**

Each page needs:

- trust gap summary
- originality gap summary
- pathing gap summary
- desired post-upgrade role

**Step 3: Assign supporting pages**

Each wave-1 page should list which support pages it depends on or should pull authority from.

**Step 4: Save the wave-1 page brief**

## Task 5: Define Deferred Pages and Non-Goals

**Files:**
- Create: `docs/plans/2026-05-12-deferred-pages-and-non-goals.md`
- Review: full sitemap list

**Step 1: List pages intentionally deferred**

These include:

- low-impression pages outside the three focus clusters
- support pages with no current execution priority
- topic pages without present momentum

**Step 2: List explicit non-goals for this wave**

Examples:

- expanding refinance again
- broad DTI expansion
- large-scale page creation
- whole-site redesign
- mass noindexing

**Step 3: Save the defer list**

This protects the project from scope creep.

## Task 6: Implementation Readiness Review

**Files:**
- Review:
  - `docs/plans/2026-05-12-trust-focus-ranking-recovery-design.md`
  - `docs/plans/2026-05-12-sitemap-role-inventory.md`
  - `docs/plans/2026-05-12-core-asset-trust-checklist.md`
  - `docs/plans/2026-05-12-topic-hub-strengthening-checklist.md`
  - `docs/plans/2026-05-12-cluster-wave-1-priority-pages.md`
  - `docs/plans/2026-05-12-deferred-pages-and-non-goals.md`

**Step 1: Re-read all planning documents together**

Check for conflicts, scope drift, and pages assigned to too many priorities.

**Step 2: Confirm wave order**

Implementation should begin with:

1. sitemap role inventory
2. trust checklist
3. wave-1 page upgrades

**Step 3: Confirm verification commands**

Required commands after future code changes:

- `npm test`
- `npm run check`
- `npm run build`

**Step 4: Confirm success criteria**

The work is ready for implementation only when:

- each live URL has a role
- each primary cluster has a declared center
- wave-1 pages are fixed
- deferred work is clearly marked

## First-Wave Page Decisions

### Strengthen Now

- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- `src/pages/calculators/credit-card-payoff-calculator.astro`
- `src/pages/calculators/apr-calculator.astro`
- `src/pages/topics/apr.astro`
- `src/pages/guides/how-credit-card-interest-is-calculated.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`
- `src/pages/guides/why-minimum-payments-take-so-long.astro`
- `src/pages/guides/how-to-find-your-apr.astro`
- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/biweekly-vs-extra-principal.astro`

### Support Only for This Wave

- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/one-extra-mortgage-payment-per-year.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/apr-for-balance-transfers.astro`
- `src/pages/calculators/extra-payment-calculator.astro`
- `src/pages/guides/extra-mortgage-payments.astro`

### Observe or Review Later

- refinance cluster pages
- debt-to-income cluster pages
- rent-vs-buy cluster pages
- low-visibility mortgage support pages
- low-visibility exact-match payment variant pages

## Verification Standard

Planning output should be treated as complete only when:

- documents are saved
- page selections are explicit
- role mapping is complete
- no high-priority page is missing a cluster or action label
- later implementation files are traceable to this plan

## Recommended Immediate Follow-Up

Create the sitemap role inventory first. It is the control document that prevents future trust work from drifting into low-impact pages.
