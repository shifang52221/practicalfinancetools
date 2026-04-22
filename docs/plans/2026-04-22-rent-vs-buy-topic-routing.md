# Rent vs Buy Topic Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the rent-vs-buy topic page into a clearer routing tree that sends readers to the right guide or tool based on the rent-versus-buy problem they actually have.

**Architecture:** Keep the existing Astro trust model and stronger rent-vs-buy child pages, but rewrite `src/pages/topics/rent-vs-buy.astro` so it acts like a decision-tree topic hub instead of a broad mixed summary. Use a focused regression test to lock the routing-tree role in place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-rent-vs-buy-topic-routing-design.md`
- Create: `docs/plans/2026-04-22-rent-vs-buy-topic-routing.md`

**Step 1: Save the approved scope**

Document:
- decision-tree role for the rent-vs-buy topic page,
- branch routing for full-scenario, break-even, upfront-cash, ownership-cost, affordability, and sensitivity questions,
- preservation of the stronger trust model.

**Step 2: Save the plan**

Create this implementation file so the work stays narrow, test-driven, and routing-focused.

### Task 2: Add a failing routing-tree regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts `src/pages/topics/rent-vs-buy.astro` includes:
- a routing-tree chooser phrase,
- a branch for full scenario comparison,
- a branch for break-even timing / holding period,
- a branch for upfront cash / down payment / closing costs,
- a branch for ownership costs like taxes / insurance / HOA / maintenance / PMI,
- a branch for monthly affordability / payment fit,
- a branch for assumption sensitivity across rent growth / appreciation / rates / investment returns.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because those routing-tree phrases are not all present yet.

### Task 3: Rewrite the topic page

**Files:**
- Modify: `src/pages/topics/rent-vs-buy.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- a top-level chooser,
- branch-specific routing,
- fewer generic stacked summary sections,
- stronger handoffs into the already-strengthened rent-vs-buy guides, calculator, and affordability tools.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new routing-tree test passes and the existing rent-vs-buy trust tests stay green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how the topic page now routes by rent-versus-buy question type,
- which child pages are emphasized,
- that the cluster now reads more like a decision tree than a generic overview page.
