# Extra Payment Support Originality Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the key indexable extra-payment support guides so each page owns a distinct decision job, stronger trust coverage, and less template-style repetition.

**Architecture:** Keep the existing extra-payment cluster structure and routing, but tighten five indexable support guides around clearly different decision roles. Use one focused regression test in `tests/seo.test.ts` to lock role differentiation, trust bindings, and visible freshness signals into place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-extra-payment-support-originality-design.md`
- Create: `docs/plans/2026-04-22-extra-payment-support-originality.md`

**Step 1: Save the approved design**

Document:
- the five target support pages,
- the distinct decision job for each page,
- the rule that repetitive checklist stacks should be reduced in favor of stronger routing and scenario judgment.

**Step 2: Save the implementation plan**

Create this implementation file so the work stays narrow, test-driven, and originality-focused.

### Task 2: Add a failing differentiation regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts the five target pages include:
- page-specific role phrases that distinguish each decision job,
- `ReviewedByCard`,
- stronger author/reviewer metadata,
- matching visible `Last updated`.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because at least the windfall and priority pages do not yet expose the stronger trust model or distinct role cues.

### Task 3: Rewrite the five support guides

**Files:**
- Modify: `src/pages/guides/extra-payment-target-payoff-date.astro`
- Modify: `src/pages/guides/extra-payment-accelerated-plan.astro`
- Modify: `src/pages/guides/extra-payment-liquidity-reserve.astro`
- Modify: `src/pages/guides/extra-payment-windfall-strategy.astro`
- Modify: `src/pages/guides/extra-payment-priority-vs-other-debts.astro`

**Step 1: Write minimal implementation**

For each page:
- keep the page's narrow decision role explicit,
- remove repeated generic support-page stacks where they do not help,
- add stronger routing and "wrong move" guidance,
- add the stronger trust model if missing,
- ensure visible `Last updated` matches the page constant.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new differentiation test passes and existing extra-payment role tests remain green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how each page now owns a distinct decision job,
- which trust gaps were closed,
- how the cluster now looks less template-driven.
