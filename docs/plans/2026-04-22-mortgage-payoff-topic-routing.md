# Mortgage Payoff Topic Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the mortgage-payoff topic page into a clearer routing tree that sends readers to the right calculator or guide based on the mortgage-payoff problem they actually have.

**Architecture:** Keep the existing Astro trust model and strengthened mortgage-payoff child pages, but rewrite `src/pages/topics/mortgage-payoff.astro` so it acts like a decision-tree topic hub instead of a broad mixed summary. Use a focused regression test to lock the routing-tree role in place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-mortgage-payoff-topic-routing-design.md`
- Create: `docs/plans/2026-04-22-mortgage-payoff-topic-routing.md`

**Step 1: Save the approved scope**

Document:
- decision-tree role for the mortgage-payoff topic page,
- branch routing for baseline payment, monthly extra, lump sum, biweekly, principal-only, and refinance-alternative questions,
- preservation of the stronger trust model.

**Step 2: Save the plan**

Create this implementation file so the work stays narrow, test-driven, and routing-focused.

### Task 2: Add a failing routing-tree regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts `src/pages/topics/mortgage-payoff.astro` includes:
- a routing-tree chooser phrase,
- a branch for baseline payment / amortization,
- a branch for monthly extra or target-payoff planning,
- a branch for lump sum / one-extra-payment questions,
- a branch for biweekly comparison,
- a branch for principal-only / servicer handling,
- a branch for refinance / recast / PMI alternatives.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because those routing-tree phrases are not all present yet.

### Task 3: Rewrite the topic page

**Files:**
- Modify: `src/pages/topics/mortgage-payoff.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- a top-level chooser,
- branch-specific routing,
- fewer generic stacked sections,
- stronger handoffs into the already-upgraded extra-payment and biweekly pages.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new routing-tree test passes and the existing mortgage workflow tests stay green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how the topic page now routes by mortgage-payoff question type,
- which child pages are emphasized,
- that the cluster now reads more like a decision tree.
