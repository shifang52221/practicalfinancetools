# Mortgage Payment Input Support Originality Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the mortgage-payment input-support guides so they use the stronger trust model and clearly distinct originality cues for the four main weak-input questions.

**Architecture:** Keep the current route structure and existing role phrases, but tighten four support guides around their actual decision jobs: rate movement, tax underestimation, insurance placeholder risk, and PMI-driven scenario shifts. Lock the change with one focused SEO regression test that checks strong trust bindings, visible date alignment, and page-specific originality phrases.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-mortgage-payment-input-support-originality-design.md`
- Create: `docs/plans/2026-04-22-mortgage-payment-input-support-originality.md`

**Step 1: Save the approved design**

Document:
- the four target support guides,
- the distinct weak-input role of each page,
- the rule that repeated checklist framing should be reduced.

**Step 2: Save the implementation plan**

Keep this batch narrow, trust-focused, and originality-focused.

### Task 2: Add a failing support-originality regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add one test for the four target pages that checks:
- existing role phrases,
- `ReviewedByCard`,
- `authorProfile={TRUST_PROFILES.siteOwner}`,
- `reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}`,
- matching visible `Last updated`,
- new page-specific originality phrases.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the pages still use the older trust model and do not yet include the new originality cues.

### Task 3: Rewrite the four input-support guides

**Files:**
- Modify: `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- Modify: `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-pmi-thresholds.astro`

**Step 1: Write minimal implementation**

For each page:
- upgrade to the stronger trust model,
- preserve the existing tested role phrase,
- add page-specific originality cues,
- reduce repeated generic checklist framing,
- keep the page noindex and route cleanly to sibling destinations.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new support-originality test passes and the existing mortgage-payment support tests remain green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how each page now owns a distinct weak-input decision,
- which trust gaps were closed,
- how the cluster now reads less like repeated support templates.
