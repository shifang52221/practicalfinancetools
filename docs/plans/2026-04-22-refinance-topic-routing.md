# Refinance Topic Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the refinance topic page into a clearer routing tree that sends readers to the right guide or tool based on the refinance problem they actually have.

**Architecture:** Keep the existing Astro trust model and stronger refinance child pages, but rewrite `src/pages/topics/refinance.astro` so it acts like a decision-tree topic hub instead of a broad mixed summary. Use a focused regression test to lock the routing-tree role in place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-refinance-topic-routing-design.md`
- Create: `docs/plans/2026-04-22-refinance-topic-routing.md`

**Step 1: Save the approved scope**

Document:
- decision-tree role for the refinance topic page,
- branch routing for timing, cost, execution, term-reset, pricing-structure, and alternative-path questions,
- preservation of the stronger trust model.

**Step 2: Save the plan**

Create this implementation file so the work stays narrow, test-driven, and routing-focused.

### Task 2: Add a failing routing-tree regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts `src/pages/topics/refinance.astro` includes:
- a routing-tree chooser phrase,
- a branch for break-even timing / time horizon,
- a branch for closing costs / cash-to-close,
- a branch for rate lock / document prep / checklist work,
- a branch for term reset / payment-versus-total-cost tradeoffs,
- a branch for points / lender credits / rolling costs,
- a branch for refinance versus extra payments or other alternatives.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because those routing-tree phrases are not all present yet.

### Task 3: Rewrite the topic page

**Files:**
- Modify: `src/pages/topics/refinance.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- a top-level chooser,
- branch-specific routing,
- fewer generic stacked summary sections,
- stronger handoffs into the already-strengthened refinance guides and alternative-decision pages.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new routing-tree test passes and the existing refinance trust tests stay green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how the topic page now routes by refinance question type,
- which child pages are emphasized,
- that the cluster now reads more like a decision tree than a generic overview page.
