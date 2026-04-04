# DTI Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the three live DTI destination guides so they can safely absorb the remaining DTI support intents, then align the ten redirected source pages with sitemap exclusion, redirect behavior, and source-page `noindex, follow`.

**Architecture:** Keep the current Astro routes, redirects, and content structure. First add failing regression tests for the DTI destination pages and their ten redirect-source pages, then make the minimum destination-page trust and role upgrade, and finally add page-level `robots="noindex, follow"` to the source pages.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the DTI consolidation batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing source-page consolidation test**

Add a regression block that uses an explicit source-to-destination map for:

- `"/guides/front-end-vs-back-end-dti"` -> `"/guides/dti-calculation-step-by-step"`
- `"/guides/dti-thresholds-compensating-factors"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-income-documentation-checklist"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-variable-income-averaging"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-self-employed-income"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-co-borrower-impacts"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-and-student-loans"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-installment-loans-and-leases"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-credit-card-minimums"` -> `"/guides/what-counts-in-dti"`
- `"/guides/dti-when-to-recalculate"` -> `"/guides/how-to-improve-dti"`

Require for each source page:

- redirect target matches exactly
- sitemap exclusion exists in `astro.config.mjs`
- the page source includes `robots="noindex, follow"`

**Step 2: Write the failing destination-page trust test**

Add a second regression block for:

- `src/pages/guides/dti-calculation-step-by-step.astro`
- `src/pages/guides/what-counts-in-dti.astro`
- `src/pages/guides/how-to-improve-dti.astro`

Require:

- `ReviewedByCard`
- matching `lastUpdated` and visible `Last updated:`
- explicit role-language phrases that reflect the approved design
- `References` on the pages where the section already exists or is added during the batch

Use exact phrase checks that represent the intended page roles, not vague partial matches.

**Step 3: Run the test suite to verify RED**

Run:

```bash
npm test
```

Expected:

- FAIL
- the source-page test should fail because the DTI source pages still lack `robots="noindex, follow"`
- the destination-page test should fail because the three destination pages still lack `ReviewedByCard` and the new role-language expectations

**Step 4: Keep the expectations fixed**

Do not weaken the assertions after the red run unless a path or redirect target is factually wrong.

### Task 2: Strengthen the three DTI destination pages

**Files:**
- Modify: `src/pages/guides/dti-calculation-step-by-step.astro`
- Modify: `src/pages/guides/what-counts-in-dti.astro`
- Modify: `src/pages/guides/how-to-improve-dti.astro`

**Step 1: Add trust coverage**

Add on each page:

- `ReviewedByCard` import
- `ReviewedByCard` component near the top of the page
- `lastUpdated = "2026-04-04"`
- visible `Last updated: 2026-04-04`

Keep existing references where already present.

**Step 2: Add the absorbed-intent role sections**

Add concise role sections that clearly make each page the destination for its absorbed intents:

- `dti-calculation-step-by-step` = front-end vs back-end DTI, formula workflow, housing-payment treatment
- `what-counts-in-dti` = included debts, documentation, variable income, self-employed income, co-borrowers, student loans, installment loans, credit card minimums, thresholds context
- `how-to-improve-dti` = action plan, timing, statement-cycle reality, and when to rerun the ratio

Keep the copy practical and concise. Do not redesign the pages or rewrite the whole articles.

**Step 3: Add or preserve reference coverage**

If a destination page is missing a `References` section, add one using high-quality primary finance sources already used elsewhere in the site.

**Step 4: Re-run tests**

Run:

```bash
npm test
```

Expected:

- the destination-page trust test turns green
- the source-page consolidation test still fails until Task 3 is complete

### Task 3: Add source-page `noindex` to the ten DTI redirect-source pages

**Files:**
- Modify: `src/pages/guides/front-end-vs-back-end-dti.astro`
- Modify: `src/pages/guides/dti-thresholds-compensating-factors.astro`
- Modify: `src/pages/guides/dti-income-documentation-checklist.astro`
- Modify: `src/pages/guides/dti-variable-income-averaging.astro`
- Modify: `src/pages/guides/dti-self-employed-income.astro`
- Modify: `src/pages/guides/dti-co-borrower-impacts.astro`
- Modify: `src/pages/guides/dti-and-student-loans.astro`
- Modify: `src/pages/guides/dti-installment-loans-and-leases.astro`
- Modify: `src/pages/guides/dti-credit-card-minimums.astro`
- Modify: `src/pages/guides/dti-when-to-recalculate.astro`

**Step 1: Add the minimal source-page guard**

For each page, add `robots="noindex, follow"` to the existing `BaseLayout` call.

**Step 2: Preserve current source-page behavior**

Do not change:

- `canonicalPath`
- redirect behavior
- page body copy
- button destinations

The only intended behavior change in these files is the source-page `noindex` signal.

**Step 3: Re-run tests**

Run:

```bash
npm test
```

Expected:

- PASS

### Task 4: Confirm the batch stays within the intended boundary

**Files:**
- Verify only

**Step 1: Rely on the existing active-link hygiene guard**

Do not add cross-cluster link rewrites unless the existing global redirected-link test fails.

This batch should not spill into:

- the extra-payment cluster
- the PMI one-off page
- the DTI topic hub
- unrelated active guides

**Step 2: Re-run tests**

Run:

```bash
npm test
```

Expected:

- PASS
- no new failures from the existing `active pages should not link to redirected guide URLs` regression

### Task 5: Verify the full batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `src/pages/guides/dti-calculation-step-by-step.astro`
- Modify: `src/pages/guides/what-counts-in-dti.astro`
- Modify: `src/pages/guides/how-to-improve-dti.astro`
- Modify: the ten source pages from Task 3

**Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 2: Run static checks**

Run:

```bash
npm run check
```

Expected:

- PASS

**Step 3: Run a production build**

Run:

```bash
npm run build
```

Expected:

- PASS, with only any already-known non-blocking warnings

**Step 4: Review the working tree**

Run:

```bash
git status --short
```

Expected:

- the intended DTI batch files are modified
- previously accepted local work remains untouched

**Step 5: Hold changes locally**

Do not commit or push anything. Keep the batch local for unified review with the rest of the site-quality work.
