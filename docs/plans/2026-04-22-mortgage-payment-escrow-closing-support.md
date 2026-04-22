# Mortgage Payment Escrow and Closing Support Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the escrow and closing-support guides so they use the stronger trust model and clearly distinct originality cues for escrow basics, shortage troubleshooting, and cash-to-close planning.

**Architecture:** Keep the current routes and existing tested role phrases, but tighten the three pages around separate decision jobs: escrow baseline, payment-jump analysis, and prepaids/reserves cash-to-close logic. Lock the change with one focused SEO regression test that checks strong trust bindings, visible date alignment, and page-specific originality phrases.

**Tech Stack:** Astro, TypeScript, Node test runner, project SEO tests in `tests/seo.test.ts`

---

### Task 1: Save the design and plan

**Files:**
- Create: `docs/plans/2026-04-22-mortgage-payment-escrow-closing-support-design.md`
- Create: `docs/plans/2026-04-22-mortgage-payment-escrow-closing-support.md`

**Step 1: Save the approved design**

Document:
- the three target guides,
- the distinct role of each page,
- the rule that repeated checklist framing should be reduced.

**Step 2: Save the implementation plan**

Keep this batch narrow, trust-focused, and originality-focused.

### Task 2: Add a failing support-originality regression test

**Files:**
- Modify: `tests/seo.test.ts`
- Test: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add one test for the three target pages that checks:
- existing role phrases,
- `ReviewedByCard`,
- `authorProfile={TRUST_PROFILES.siteOwner}`,
- `reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}`,
- matching visible `Last updated`,
- new page-specific originality phrases.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the pages still use the older trust model and do not yet include the new originality cues.

### Task 3: Rewrite the three escrow-and-closing support guides

**Files:**
- Modify: `src/pages/guides/mortgage-payment-escrow-account.astro`
- Modify: `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- Modify: `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`

**Step 1: Write minimal implementation**

For each page:
- upgrade to the stronger trust model,
- preserve the existing tested role phrase,
- add page-specific originality cues,
- reduce repeated generic checklist framing,
- keep the page noindex and route cleanly to sibling destinations.

**Step 2: Run test to verify it passes**

Run: `npm test`

Expected: the new escrow-and-closing originality test passes and the existing mortgage-payment support tests remain green.

### Task 4: Verify the full batch

**Files:**
- Modify: none
- Test: `tests/seo.test.ts`

**Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Summarize impact**

Document:
- how each page now owns a distinct escrow-or-closing decision,
- which trust gaps were closed,
- how the cluster now reads less like repeated support templates.
