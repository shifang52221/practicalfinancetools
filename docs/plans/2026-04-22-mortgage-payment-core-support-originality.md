# Mortgage Payment Core Support Originality Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the core mortgage-payment support guides so they use the stronger trust model and more clearly distinct decision roles.

**Architecture:** Keep the current mortgage-payment cluster and existing role cues, but upgrade the four main destination guides to the stronger author/reviewer model and tighten each page around a more original decision job. Use one focused regression test in `tests/seo.test.ts` to lock trust bindings, role coverage, and visible freshness signals into place.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-mortgage-payment-core-support-originality-design.md`
- Create: `docs/plans/2026-04-22-mortgage-payment-core-support-originality.md`

**Step 1: Save the approved design**

Document:
- the four target destination guides,
- the distinct decision role of each page,
- the rule that old checklist repetition should be reduced while keeping existing role cues.

**Step 2: Save the implementation plan**

Create this implementation file so the work stays narrow, test-driven, and trust/originality-focused.

### Task 2: Add a failing trust-and-role regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a test that asserts the four target guides include:
- their existing role phrase,
- `ReviewedByCard`,
- `authorProfile={TRUST_PROFILES.siteOwner}`,
- `reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}`,
- matching visible `Last updated`.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the pages still use the older review-card pattern and weaker metadata bindings.

### Task 3: Rewrite the four destination guides

**Files:**
- Modify: `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- Modify: `src/pages/guides/what-is-piti.astro`
- Modify: `src/pages/guides/principal-and-interest-vs-escrow.astro`
- Modify: `src/pages/guides/mortgage-payment-affordability-checklist.astro`

**Step 1: Write minimal implementation**

For each page:
- upgrade to the stronger trust model,
- preserve the tested role phrase,
- tighten the page around its own decision job,
- keep sibling-page routing clear,
- ensure the visible `Last updated` matches the page constant.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new mortgage-payment core-support test passes and the existing mortgage-payment role tests remain green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how each page now owns a clearer role,
- which trust gaps were closed,
- how the set now reads less like an older support-template batch.
