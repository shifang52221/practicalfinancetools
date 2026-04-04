# Mortgage Payment Support Guides Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the remaining high-risk mortgage-payment support guides with clearer page roles, visible review coverage, references, and regression tests.

**Architecture:** Keep the existing Astro page structure and routing intact. Add one small test-first regression layer in `tests/seo.test.ts`, then strengthen the selected mortgage-payment guides in place using the same trust-and-role pattern already used on stronger destination pages.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Add failing regression coverage for the mortgage-payment support batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add a new SEO regression block that requires these pages to include `ReviewedByCard`, a page-role phrase, a `References` section, and matching visible update dates:

- `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- `src/pages/guides/mortgage-payment-escrow-account.astro`
- `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-pmi-thresholds.astro`

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL with missing `ReviewedByCard`, missing chooser phrases, missing `References`, or update-date mismatches for the selected pages.

**Step 3: Write minimal implementation**

Do not change the test expectations after the failure unless the wording proves unrealistic. Keep the assertions aligned with the approved page-role language.

**Step 4: Run test to verify it passes later**

Run: `npm test`

Expected: PASS for the new regression once the page updates are complete.

### Task 2: Strengthen the escrow workflow support pages

**Files:**
- Modify: `src/pages/guides/mortgage-payment-escrow-account.astro`
- Modify: `src/pages/guides/mortgage-payment-escrow-shortage.astro`
- Modify: `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`

**Step 1: Add trust and chooser structure**

For each page:

- import `ReviewedByCard`
- set `lastUpdated` to `2026-04-03`
- add a visible chooser section beginning with `Use this guide when...`
- add `ReviewedByCard` directly below the hero

**Step 2: Deepen the core workflow**

Adjust the body so each page clearly owns a distinct question:

- escrow-account: baseline escrow mechanics and payment composition
- escrow-shortage: post-closing payment jump and shortage response workflow
- prepaids-and-reserves: cash-to-close and year-one reserve planning

**Step 3: Add references and next-step links**

Add a `References` section with primary sources such as CFPB home-buying or escrow guidance, then tighten the `Next steps` links back to the mortgage calculator, PITI or escrow explainer, and the topic hub.

**Step 4: Re-run tests**

Run: `npm test`

Expected: the selected assertions for these three pages move from red to green.

### Task 3: Strengthen the mortgage-payment assumption pages

**Files:**
- Modify: `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- Modify: `src/pages/guides/mortgage-payment-pmi-thresholds.astro`

**Step 1: Add trust and chooser structure**

For each page:

- import `ReviewedByCard`
- set `lastUpdated` to `2026-04-03`
- add a `Use this guide when...` section that distinguishes the page from nearby support guides
- add a visible `References` section

**Step 2: Tighten page ownership**

Make the content explicitly answer:

- tax assumptions for realistic payment modeling
- insurance assumptions for realistic escrow modeling
- PMI thresholds and removal planning for payment scenarios

**Step 3: Improve internal linking**

Ensure these pages link naturally to:

- `src/pages/guides/how-mortgage-payments-are-calculated.astro`
- `src/pages/guides/what-is-piti.astro`
- `src/pages/guides/principal-and-interest-vs-escrow.astro`
- `src/pages/guides/mortgage-payment-affordability-checklist.astro`
- relevant neighboring support pages without redirect drift

**Step 4: Re-run tests**

Run: `npm test`

Expected: the selected assertions for the assumption pages pass.

### Task 4: Strengthen the rate-sensitivity support page

**Files:**
- Modify: `src/pages/guides/mortgage-payment-rate-sensitivity.astro`

**Step 1: Add trust and chooser structure**

- import `ReviewedByCard`
- set `lastUpdated` to `2026-04-03`
- add a `Use this guide when...` section
- add a `References` section

**Step 2: Clarify role**

Position the page as the scenario-testing guide for rate changes, distinct from:

- baseline payment math
- affordability checklist
- APR explainer content

**Step 3: Strengthen workflow links**

Link back to the mortgage payment calculator, affordability checklist, and the mortgage math / PITI explainers.

**Step 4: Re-run tests**

Run: `npm test`

Expected: the rate-sensitivity assertions pass.

### Task 5: Full verification for the local review batch

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: selected `src/pages/guides/*.astro` files from Tasks 2-4

**Step 1: Run project checks**

Run: `npm run check`

Expected: PASS

**Step 2: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 3: Run a production build**

Run: `npm run build`

Expected: PASS, with only any already-known non-blocking warnings.

**Step 4: Review working tree**

Run: `git status --short`

Expected: only the intended local batch changes plus any previously accepted local plan files.

**Step 5: Hold changes locally**

Do not commit or push in this batch. Save the verification results for the later unified review and submission decision.
