# Credit Card Topic Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the credit-card topic page into a clearer routing tree that sends readers to the right guide or calculator based on the problem they actually have.

**Architecture:** Keep the existing Astro trust model and credit-card cluster pages, but rewrite `src/pages/topics/credit-cards.astro` so it acts like a decision-tree topic hub instead of a broad mixed summary. Use a focused regression test to lock the routing-tree role in place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-credit-card-topic-routing-design.md`
- Create: `docs/plans/2026-04-22-credit-card-topic-routing.md`

**Step 1: Save the approved scope**

Document:
- decision-tree role for the credit-card topic page,
- branch routing for fixed payment, minimum payment, statement math, promo timing, and multi-balance order,
- preservation of the stronger trust model.

**Step 2: Save the plan**

Create this implementation file so the work stays narrow, test-driven, and routing-focused.

### Task 2: Add a failing routing-tree regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts `src/pages/topics/credit-cards.astro` includes:
- a routing-tree chooser phrase,
- a branch for fixed-payment payoff,
- a branch for minimum-payment drag,
- a branch for statement-math confusion,
- a branch for promo deadline / transfer timing,
- a branch for multi-balance payoff order.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because those routing-tree phrases are not all present yet.

### Task 3: Rewrite the topic page

**Files:**
- Modify: `src/pages/topics/credit-cards.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- a top-level chooser,
- clean branch-specific routing,
- fewer generic stacked checklist sections,
- stronger handoffs into the recently differentiated guide pages.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new routing-tree test passes and existing credit-card tests stay green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how the topic page now routes by question type,
- which guide and calculator paths are emphasized,
- that the credit-card cluster now reads more like a decision tree.
