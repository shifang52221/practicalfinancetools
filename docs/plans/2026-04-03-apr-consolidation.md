# APR Consolidation And Destination Strengthening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce low-value APR cluster risk by adding `noindex, follow` guards to APR redirect-source pages and strengthening the core APR destination guides with clearer trust and intent coverage.

**Architecture:** Keep the Astro routing and Vercel redirect structure intact. First add failing APR-specific SEO regression tests, then implement the smallest page changes needed to make redirect-source behavior and destination-page trust signals consistent across the cluster.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite, Vercel redirect configuration

---

### Task 1: Add failing regression coverage for APR source-page and destination-page behavior

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add APR-specific regression blocks that verify:

- selected APR redirect-source pages keep redirect map + sitemap exclusion + `robots="noindex, follow"` aligned
- selected APR destination pages include `ReviewedByCard`
- selected APR destination pages include required chooser phrases
- selected APR destination pages include `References`
- selected APR destination pages keep visible `Last updated:` aligned with `lastUpdated`
- selected APR destination pages mention the redirected intents they should absorb

Use these source pages for the structural assertions:

- `/guides/apr-vs-interest-rate-fees`
- `/guides/apr-for-refinance-comparison`
- `/guides/apr-and-closing-costs`
- `/guides/apr-when-fees-are-financed`
- `/guides/credit-card-apr-vs-interest-rate`
- `/guides/credit-card-apr-promo-vs-standard`
- `/guides/personal-loan-apr-comparison`
- `/guides/auto-loan-apr-comparison`
- `/guides/student-loan-apr-comparison`
- `/guides/small-business-loan-apr-comparison`

Use these destination pages for the trust-and-intent assertions:

- `src/pages/guides/apr-vs-interest-rate.astro`
- `src/pages/guides/apr-with-origination-fee.astro`
- `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- `src/pages/guides/apr-by-loan-type.astro`

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL with missing `noindex` on APR source pages and missing trust or intent assertions on one or more destination pages.

**Step 3: Lock the expectations**

Do not weaken the new assertions after the red run unless one phrase proves unrealistic compared with the approved design.

**Step 4: Re-run later**

Run: `npm test`

Expected: PASS once Tasks 2-4 are complete.

### Task 2: Add `noindex, follow` guards to APR redirect-source pages

**Files:**
- Modify: `src/pages/guides/apr-vs-interest-rate-fees.astro`
- Modify: `src/pages/guides/apr-for-refinance-comparison.astro`
- Modify: `src/pages/guides/apr-and-closing-costs.astro`
- Modify: `src/pages/guides/apr-when-fees-are-financed.astro`
- Modify: `src/pages/guides/credit-card-apr-vs-interest-rate.astro`
- Modify: `src/pages/guides/credit-card-apr-promo-vs-standard.astro`
- Modify: `src/pages/guides/personal-loan-apr-comparison.astro`
- Modify: `src/pages/guides/auto-loan-apr-comparison.astro`
- Modify: `src/pages/guides/student-loan-apr-comparison.astro`
- Modify: `src/pages/guides/small-business-loan-apr-comparison.astro`

**Step 1: Apply the minimal source-page guard**

For each selected APR redirect-source page, add `robots="noindex, follow"` to the `BaseLayout` call without changing the canonical path or route.

**Step 2: Preserve source-page usefulness**

Do not redesign these pages. Keep them stable as source files that can still pass users through the redirect map and provide fallback page context if fetched directly.

**Step 3: Run tests**

Run: `npm test`

Expected: the APR source-page assertions move from red to green, while destination-page assertions may still fail.

### Task 3: Strengthen `apr-vs-interest-rate` and `apr-with-origination-fee`

**Files:**
- Modify: `src/pages/guides/apr-vs-interest-rate.astro`
- Modify: `src/pages/guides/apr-with-origination-fee.astro`

**Step 1: Add or align trust bundle**

For each page:

- ensure `ReviewedByCard` is present
- refresh `lastUpdated` to `2026-04-03`
- ensure the visible `Last updated:` line matches
- ensure a `References` section is present

**Step 2: Strengthen chooser language**

Add explicit role language beginning with:

- `Use this guide when fee-heavy offers make APR look different from the stated rate`
- `Use this guide when origination fees, closing costs, or financed fees change the real borrowing cost`

Adjust wording only as needed to fit the page naturally.

**Step 3: Absorb redirected intents**

Ensure the body clearly covers:

- APR differences caused by fees
- refinance-comparison framing on `apr-vs-interest-rate`
- closing-cost and financed-fee framing on `apr-with-origination-fee`
- strong links to the final destination pages instead of redirect-source URLs

**Step 4: Run tests**

Run: `npm test`

Expected: the trust and absorbed-intent assertions for these two pages pass.

### Task 4: Strengthen `how-to-use-apr-for-credit-cards` and `apr-by-loan-type`

**Files:**
- Modify: `src/pages/guides/how-to-use-apr-for-credit-cards.astro`
- Modify: `src/pages/guides/apr-by-loan-type.astro`

**Step 1: Add or align trust bundle**

For each page:

- ensure `ReviewedByCard` is present
- refresh `lastUpdated` to `2026-04-03`
- ensure the visible `Last updated:` line matches
- ensure a `References` section is present

**Step 2: Strengthen chooser language**

Add explicit role language beginning with:

- `Use this guide when you are comparing credit card APR types, promo windows, or penalty-rate risk`
- `Use this guide when you are comparing APR across auto, personal, student, or small-business loans`

Adjust wording only as needed to fit the page naturally.

**Step 3: Absorb redirected intents**

Ensure the body clearly covers:

- daily-interest vs APR, promo vs standard APR, and penalty APR framing on the credit-card guide
- personal, auto, student, and small-business loan comparison framing on the loan-type guide
- final-destination links only

**Step 4: Run tests**

Run: `npm test`

Expected: the APR destination-guide assertions move fully green.

### Task 5: Verify the whole local APR batch

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: selected `src/pages/guides/*.astro` files from Tasks 2-4

**Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 2: Run static checks**

Run: `npm run check`

Expected: PASS

**Step 3: Run a production build**

Run: `npm run build`

Expected: PASS, with only any already-known non-blocking warnings.

**Step 4: Review working tree**

Run: `git status --short`

Expected: only the intended local APR-batch files plus previously accepted local work.

**Step 5: Hold the batch locally**

Do not commit or push. Save the verification results for the later unified review and submission decision.
