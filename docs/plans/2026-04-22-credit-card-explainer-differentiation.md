# Credit Card Explainer Differentiation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Separate the minimum-payment explainer from the interest-mechanics explainer so each page owns a distinct credit-card question.

**Architecture:** Keep the existing Astro layout and credit-card cluster routing, but rewrite page framing so `why-minimum-payments-take-so-long` becomes the rule-drag explainer and `how-credit-card-interest-is-calculated` becomes the statement-math explainer. Use a regression test to lock those page roles in place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-credit-card-explainer-differentiation-design.md`
- Create: `docs/plans/2026-04-22-credit-card-explainer-differentiation.md`

**Step 1: Save the approved scope**

Document:
- stronger rule-drag framing for the minimum-payment page,
- stronger statement-math framing for the interest page,
- trust-model upgrade for the interest page.

**Step 2: Save the plan**

Create this implementation file so the changes stay test-driven and role-specific.

### Task 2: Add a failing explainer-differentiation test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts:
- `why-minimum-payments-take-so-long` contains minimum-rule-drag phrases,
- `how-credit-card-interest-is-calculated` contains statement-reconciliation phrases,
- `how-credit-card-interest-is-calculated` adopts the stronger trust model.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the new role cues and trust bindings are not present yet.

### Task 3: Rewrite the minimum-payment explainer

**Files:**
- Modify: `src/pages/guides/why-minimum-payments-take-so-long.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- minimum-payment rule drag,
- shrinking required payments,
- translating the warning into a fixed-payment target,
- routing away from deeper statement-interest questions.

**Step 2: Run test to verify progress**

Run: `npm test`

Expected: the new test may still fail until the interest page is updated too.

### Task 4: Rewrite the interest explainer

**Files:**
- Modify: `src/pages/guides/how-credit-card-interest-is-calculated.astro`

**Step 1: Write minimal implementation**

Reshape the page around:
- statement reconciliation,
- average daily balance,
- grace-period loss and trailing interest,
- stronger trust/profile bindings.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new explainer-differentiation test passes and existing credit-card tests remain green.

### Task 5: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how the minimum-payment page now owns the warning/rule-drag question,
- how the interest page now owns the statement-math question,
- that the interest page moved onto the stronger trust model.
