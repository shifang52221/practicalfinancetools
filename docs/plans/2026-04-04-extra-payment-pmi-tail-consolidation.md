# Extra Payment And PMI Tail Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Finish the remaining redirect-source cleanup by strengthening the two live destination pages that still need clearer absorbed-intent signaling, then add source-page `noindex, follow` to the final four redirected source pages.

**Architecture:** Keep the current Astro routes, redirects, sitemap exclusions, and content structure. First add failing regression tests for the four remaining source pages and the two destination pages that still need reinforcement, then make the minimum destination-page trust/role upgrades, and finally add page-level `robots="noindex, follow"` to the four source pages.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the final extra-payment and PMI tail batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing source-page consolidation test**

Add a regression block that uses an explicit source-to-destination map for:

- `"/guides/extra-mortgage-payment-calculator"` -> `"/calculators/extra-payment-calculator"`
- `"/guides/calculate-mortgage-payoff-with-additional-principal-payments"` -> `"/calculators/extra-payment-calculator"`
- `"/guides/mortgage-extra-principal-calculator"` -> `"/calculators/additional-principal-payment-calculator"`
- `"/guides/estimating-pmi-cost"` -> `"/guides/what-is-piti"`

Require for each source page:

- redirect target matches exactly
- sitemap exclusion exists in `astro.config.mjs`
- the page source includes `robots="noindex, follow"`

**Step 2: Write the failing destination-page trust test**

Add expectations for:

- `src/pages/calculators/extra-payment-calculator.astro`
- `src/pages/guides/what-is-piti.astro`

Require:

- `ReviewedByCard`
- `References`
- refreshed update date
- explicit absorbed-intent phrases that reflect the approved design

For the calculator page, follow the existing calculator test style and check its inline `lastUpdated="2026-04-04"` attribute.

For the guide page, require matching `const lastUpdated = "2026-04-04"` and visible `Last updated: 2026-04-04`.

**Step 3: Run the full test suite to verify RED**

Run:

```bash
npm test
```

Expected:

- FAIL
- the source-page test should fail because the four source pages still lack `robots="noindex, follow"`
- the destination-page test should fail because the two destination pages still lack the new absorbed-intent expectations and refreshed dates

**Step 4: Keep the expectations fixed**

Do not weaken the assertions after the red run unless a path or redirect target is factually wrong.

### Task 2: Strengthen the two destination pages that still need absorbed-intent reinforcement

**Files:**
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Modify: `src/pages/guides/what-is-piti.astro`

**Step 1: Refresh update dates**

Update:

- `src/pages/calculators/extra-payment-calculator.astro` to `lastUpdated="2026-04-04"`
- `src/pages/guides/what-is-piti.astro` to `const lastUpdated = "2026-04-04"` and visible `Last updated: 2026-04-04`

**Step 2: Add concise absorbed-intent role language**

Add a short section or sub-section near the top of each page:

- `extra-payment-calculator` should explicitly say this is the broad extra-payment planning page before a user narrows into principal-only or lump-sum-only workflows
- `what-is-piti` should explicitly say PMI estimation belongs inside the full housing-payment breakdown, not as a separate monthly-payment concept

Keep the copy concise and consistent with the current editorial tone.

**Step 3: Preserve existing trust signals**

Do not remove or weaken:

- `ReviewedByCard`
- `References`
- existing differentiated role language already on the page

**Step 4: Re-run tests**

Run:

```bash
npm test
```

Expected:

- the destination-page trust test turns green
- the source-page consolidation test still fails until Task 3 is complete

### Task 3: Add source-page `noindex` to the final four redirected source pages

**Files:**
- Modify: `src/pages/guides/extra-mortgage-payment-calculator.astro`
- Modify: `src/pages/guides/calculate-mortgage-payoff-with-additional-principal-payments.astro`
- Modify: `src/pages/guides/mortgage-extra-principal-calculator.astro`
- Modify: `src/pages/guides/estimating-pmi-cost.astro`

**Step 1: Add the minimal source-page guard**

For each page, add `robots="noindex, follow"` to the existing `BaseLayout` call.

**Step 2: Preserve current source-page behavior**

Do not change:

- `canonicalPath`
- redirect behavior
- body copy
- CTA destinations

The only intended behavior change in these files is the source-page `noindex` signal.

**Step 3: Re-run tests**

Run:

```bash
npm test
```

Expected:

- PASS

### Task 4: Verify the full batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Modify: `src/pages/guides/what-is-piti.astro`
- Modify: the four source pages from Task 3

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

- the intended tail-batch files are modified
- previously accepted local work remains untouched

**Step 5: Hold changes locally**

Do not commit or push anything. Keep the batch local for unified review with the rest of the site-quality work.
