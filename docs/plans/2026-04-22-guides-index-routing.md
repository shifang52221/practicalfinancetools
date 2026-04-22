# Guides Index Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the guides index so it routes readers into the correct strongest guide path before they browse narrower support pages.

**Architecture:** Keep the stronger trust model already deployed on index pages, but reshape `src/pages/guides/index.astro` into a strongest-path guide router instead of a large guide catalog. Use one focused regression test in `tests/seo.test.ts` to lock the routing language, path coverage, and freshness signals into place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-guides-index-routing-design.md`
- Create: `docs/plans/2026-04-22-guides-index-routing.md`

**Step 1: Save the approved design**

Document:
- the new role of `/guides` as a strongest-guide-path router,
- the primary branches for APR, credit cards, DTI, rent vs buy, mortgage payoff, and refinance,
- the rule that the page should reduce long directory-style lists and remove catalog-like browse blocks.

**Step 2: Save the implementation plan**

Create this implementation file so the rewrite stays narrow, test-driven, and focused on routing rather than catalog expansion.

### Task 2: Add a failing strongest-path regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts `src/pages/guides/index.astro` includes:
- a chooser phrase for selecting the guide job before the article,
- a branch for borrowing cost / APR comparison,
- a branch for credit-card payoff strategy / minimum-payment drag,
- a branch for DTI / affordability inputs / improvement,
- a branch for rent-vs-buy break-even and assumptions,
- a branch for extra mortgage payments / posting / payoff tradeoffs,
- a branch for refinance break-even and time horizon,
- the stronger trust summary and matching visible `Last updated`.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the existing guides index does not yet include the new strongest-path routing cues.

### Task 3: Rewrite the guides index

**Files:**
- Modify: `src/pages/guides/index.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- a hero that frames `/guides` as the strongest-guide-path layer,
- one primary guide-path routing table,
- one section clarifying when to use a topic hub instead,
- one section clarifying when support pages are worth opening,
- a simplified strongest-path card section instead of broad repeated article catalogs.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new guides-index routing test passes and existing index trust tests stay green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how `/guides` now routes by primary guide job,
- how the page distinguishes topic hubs from guide paths,
- that the page now reads like an editorial entry layer rather than a broad catalog.
