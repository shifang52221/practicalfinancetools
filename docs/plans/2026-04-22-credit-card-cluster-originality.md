# Credit Card Cluster Originality Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Differentiate the strongest credit-card payoff pages so they stop overlapping and behave like distinct workflow pages.

**Architecture:** Keep the existing Astro trust and layout system, but rewrite page framing and routing so `credit-card-payoff-strategy` becomes a payoff-decision hub and `debt-snowball-vs-avalanche` becomes a narrower method-selection page. Use regression tests to lock those page roles in place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-credit-card-cluster-originality-design.md`
- Create: `docs/plans/2026-04-22-credit-card-cluster-originality.md`

**Step 1: Save the approved design scope**

Document:
- stronger routing-hub role for `credit-card-payoff-strategy`,
- narrower method-selection role for `debt-snowball-vs-avalanche`,
- light-touch alignment only for `why-minimum-payments-take-so-long`.

**Step 2: Save the plan**

Create this implementation file so the work stays test-driven and role-specific.

### Task 2: Add a failing role-differentiation regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a new test that asserts:
- `credit-card-payoff-strategy` contains unique bottleneck-routing language,
- `debt-snowball-vs-avalanche` contains unique method-selection language,
- both pages keep trust bindings and visible `Last updated`.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the new originality phrases are not present yet.

### Task 3: Rewrite the strategy hub

**Files:**
- Modify: `src/pages/guides/credit-card-payoff-strategy.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- identifying the reader's real bottleneck,
- separating one-balance, minimum-payment, promo-transfer, and multi-balance paths,
- a stronger next-step chooser instead of broad generic advice.

**Step 2: Run test to verify progress**

Run: `npm test`

Expected: the new test may still fail until the method-selection page is updated too.

### Task 4: Rewrite the method-selection page

**Files:**
- Modify: `src/pages/guides/debt-snowball-vs-avalanche.astro`
- Optionally modify: `src/pages/guides/why-minimum-payments-take-so-long.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- motivation vs interest savings,
- first-account momentum,
- interest-gap sanity checks,
- when to switch methods,
- cleaner routing back to calculators and the broader payoff hub.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new role-differentiation test passes and existing cluster tests remain green.

### Task 5: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how the main strategy page now routes by bottleneck,
- how the snowball-vs-avalanche page now owns the method-choice question,
- any light routing alignment made on the minimum-payment explainer.
