# Calculators Index Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the calculators index so it routes readers into the correct first calculator based on the calculation job they are actually trying to run.

**Architecture:** Keep the stronger trust model already deployed on index pages, but reshape `src/pages/calculators/index.astro` into a calculator-job router instead of a broad tool-first catalog. Use one focused regression test in `tests/seo.test.ts` to lock the routing language, calculator-job coverage, and freshness signals into place while preserving older role cues already covered by existing tests.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-calculators-index-routing-design.md`
- Create: `docs/plans/2026-04-22-calculators-index-routing.md`

**Step 1: Save the approved design**

Document:
- the new role of `/calculators` as a calculator-job router,
- the primary branches for APR, one-balance payoff, multi-balance payoff order, affordability, rent vs buy, and mortgage payoff acceleration,
- the rule that the full tool library stays accessible but becomes clearly secondary.

**Step 2: Save the implementation plan**

Create this implementation file so the rewrite stays narrow, test-driven, and routing-focused.

### Task 2: Add a failing calculator-job regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts `src/pages/calculators/index.astro` includes:
- a chooser phrase for selecting the calculator job before the tool,
- a branch for loan offers / fees / borrowing cost,
- a branch for one balance payoff / fixed monthly target,
- a branch for multiple balances / payoff order,
- a branch for housing payment / affordability estimate,
- a branch for rent-vs-buy scenario comparison,
- a branch for extra principal / mortgage payoff acceleration,
- the stronger trust summary and matching visible `Last updated`.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the existing calculators index does not yet include the new calculator-job routing cues.

### Task 3: Rewrite the calculators index

**Files:**
- Modify: `src/pages/calculators/index.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- a hero that frames `/calculators` as the calculator-job layer,
- one primary routing table,
- one section clarifying calculators versus topics and guides,
- one compact set of strongest calculator-entry cards,
- the grouped full library as a secondary browse layer.

Preserve the older role-cue phrases required by existing tests.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new calculators-index routing test passes and existing index trust tests stay green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how `/calculators` now routes by calculator job,
- how it distinguishes calculators from topics and guides,
- that the page now reads like an entry layer instead of a tool shelf.
