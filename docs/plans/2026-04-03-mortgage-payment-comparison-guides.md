# Mortgage Payment Comparison Guides Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the mortgage-payment comparison guides with visible trust signals, clearer page roles, and tighter calculator-to-decision linking.

**Architecture:** Reuse the existing page structure and the same trust pattern established in earlier April 3 improvements. Add test coverage first in `tests/seo.test.ts`, then update the selected guides in place.

**Tech Stack:** Astro, TypeScript-based Node tests, existing SEO regression suite

---

### Task 1: Add failing regression coverage for the comparison-guide batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a new SEO regression test for:

- `src/pages/guides/mortgage-payment-dti-housing-payment.astro`
- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`
- `src/pages/guides/mortgage-payment-15-vs-30-year.astro`
- `src/pages/guides/hoa-fees-and-mortgage-payment.astro`

Require each page to include:

- `ReviewedByCard`
- a unique `Use this guide when...` phrase
- a `References` section
- matching visible and constant update dates

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL with missing review coverage, chooser language, references, or date alignment on these pages.

### Task 2: Strengthen DTI and payment-composition decision pages

**Files:**
- Modify: `src/pages/guides/mortgage-payment-dti-housing-payment.astro`
- Modify: `src/pages/guides/hoa-fees-and-mortgage-payment.astro`

**Step 1: Add trust structure**

Add `ReviewedByCard`, refresh `lastUpdated`, add role-signaling chooser language, and add `References`.

**Step 2: Clarify ownership**

Make these pages clearly own:

- what belongs in lender housing payment for DTI
- how HOA changes the real housing payment and affordability picture

**Step 3: Verify**

Run: `npm test`

Expected: the related assertions pass.

### Task 3: Strengthen comparison pages for term, cost, and down payment

**Files:**
- Modify: `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- Modify: `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`
- Modify: `src/pages/guides/mortgage-payment-15-vs-30-year.astro`

**Step 1: Add trust structure**

Add `ReviewedByCard`, refresh `lastUpdated`, add chooser language, and add `References`.

**Step 2: Clarify ownership**

Position the pages as distinct decisions:

- down payment vs reserves / PMI
- monthly payment vs total cost
- 15-year vs 30-year term choice

**Step 3: Verify**

Run: `npm test`

Expected: the related assertions pass.

### Task 4: Full verification

**Files:**
- Modify: selected `src/pages/guides/*.astro`
- Modify: `tests/seo.test.ts`

**Step 1: Run project checks**

Run: `npm run check`

Expected: PASS

**Step 2: Run full tests**

Run: `npm test`

Expected: PASS

**Step 3: Run build**

Run: `npm run build`

Expected: PASS, except any already-known non-blocking warnings.

**Step 4: Keep local**

Do not commit or push yet.
