# Mortgage Payment Estimation Entry Originality Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the mortgage-payment estimation guides and calculator entry so they use the stronger trust model and clearly distinct originality cues as the top of the mortgage-payment workflow.

**Architecture:** Keep the current routes and existing tested role phrases, but tighten the two guides around estimating the last uncertain input and tighten the calculator around its role as the primary full-payment entry page. Lock the change with one focused SEO regression test that checks strong trust bindings, freshness alignment, and page-specific originality phrases.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-mortgage-payment-estimation-entry-originality-design.md`
- Create: `docs/plans/2026-04-22-mortgage-payment-estimation-entry-originality.md`

**Step 1: Save the approved design**

Document:
- the two target guides and one calculator entry,
- the distinct role of each page,
- the rule that generic explainer structure should be reduced.

**Step 2: Save the implementation plan**

Keep this batch narrow, trust-focused, and originality-focused.

### Task 2: Add a failing estimation-entry originality regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add one test for the three target pages that checks:
- existing role phrases,
- `ReviewedByCard`,
- stronger trust bindings,
- matching freshness signals,
- new page-specific originality phrases.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the pages still use the older trust model or do not yet include the new originality cues.

### Task 3: Rewrite the two guides and calculator entry

**Files:**
- Modify: `src/pages/guides/how-to-estimate-homeowners-insurance.astro`
- Modify: `src/pages/guides/how-to-estimate-property-taxes.astro`
- Modify: `src/pages/calculators/mortgage-payment-calculator.astro`

**Step 1: Write minimal implementation**

For each page:
- upgrade to the stronger trust model,
- preserve the existing tested role phrase,
- add page-specific originality cues,
- reduce repeated generic checklist framing,
- keep routing tight between tax estimate, insurance estimate, full payment estimate, DTI, and affordability pages.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new estimation-entry originality test passes and the existing estimation-entry trust test remains green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how each page now owns a distinct estimation-entry job,
- which trust gaps were closed,
- how the mortgage-payment funnel now has a cleaner entry layer.
