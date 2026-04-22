# Topics Index Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the topics index so it routes readers into the correct major finance topic based on the decision they are actually making.

**Architecture:** Keep the stronger trust model already deployed on index pages, but reshape `src/pages/topics/index.astro` around a site-level decision router. Use one focused regression test in `tests/seo.test.ts` to lock the routing language, topic coverage, and freshness signals into place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-topics-index-routing-design.md`
- Create: `docs/plans/2026-04-22-topics-index-routing.md`

**Step 1: Save the approved design**

Document:
- the new role of `/topics` as a site-level decision router,
- the primary branches for APR, credit cards, DTI, rent vs buy, mortgage payoff, and refinance,
- the rule that the page should reduce duplicated directory-style sections.

**Step 2: Save the implementation plan**

Create this implementation file so the rewrite stays narrow, test-driven, and focused on routing rather than generic catalog expansion.

### Task 2: Add a failing decision-router regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts `src/pages/topics/index.astro` includes:
- a chooser phrase for selecting the finance decision before the topic,
- a branch for loan offers with fees or credits,
- a branch for credit card payoff speed / minimum-payment drag / payoff strategy,
- a branch for housing affordability / DTI / payment-fit questions,
- a branch for renting versus buying over a planned hold period,
- a branch for mortgage payoff acceleration with extra principal,
- a branch for refinance break-even / closing costs / rate-reset decisions,
- the stronger trust summary and matching visible `Last updated`.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the existing topics index does not yet include the new decision-router cues.

### Task 3: Rewrite the topics index

**Files:**
- Modify: `src/pages/topics/index.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- a hero that frames `/topics` as the top routing layer,
- one primary decision-routing table,
- one overlap-clarification section,
- a simplified topic-card section that supports the routing role without repeating the same directory copy.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new topics-index routing test passes and existing index trust tests stay green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how `/topics` now routes by major finance decision,
- how overlap between nearby clusters is clarified,
- that the page now reads like a decision layer instead of a repeated category directory.
