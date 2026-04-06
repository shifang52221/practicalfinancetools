# PMI Sensitivity Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three PMI and payment-sensitivity support guides to the stronger trust model while preserving route behavior, `noindex` posture, and existing content structure.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the selected PMI-plus-rate cluster, then make the smallest Astro edits needed to normalize trust metadata, review coverage, and date alignment. Keep references, links, route behavior, and body structure intact except for the minimum additions needed on `estimating-pmi-cost`.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the PMI sensitivity trust batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/mortgage-payment-pmi-thresholds.astro`
- `src/pages/guides/mortgage-payment-rate-sensitivity.astro`
- `src/pages/guides/estimating-pmi-cost.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `mortgage-payment-pmi-thresholds.astro` includes `Use this guide when PMI is the reason the payment scenario changes`
- `mortgage-payment-rate-sensitivity.astro` includes `Use this guide when rate sensitivity is the main mortgage-payment question`
- `estimating-pmi-cost.astro` includes `Use this guide when PMI cost is the missing piece of the full housing-payment estimate`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust metadata, missing review card on `estimating-pmi-cost`, missing role section on `estimating-pmi-cost`, or stale dates

### Task 2: Upgrade `mortgage-payment-pmi-thresholds`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-pmi-thresholds.astro`

**Step 1: Add trust imports and metadata**

Add:

- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Replace legacy review-card props**

Keep `ReviewedByCard`, but switch to:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Preserve the role section**

Keep the current top role section intact.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `mortgage-payment-rate-sensitivity`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-rate-sensitivity.astro`

**Step 1: Add trust imports and metadata**

Add:

- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Replace legacy review-card props**

Keep `ReviewedByCard`, but switch to:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Preserve the role section**

Keep the current top role section intact.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `estimating-pmi-cost`

**Files:**
- Modify: `src/pages/guides/estimating-pmi-cost.astro`

**Step 1: Add trust imports and metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the visible review summary**

Add a `ReviewedByCard` using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add the role section**

Add a top support-page section that includes:

- `Use this guide when PMI cost is the missing piece of the full housing-payment estimate`

**Step 4: Add a short references section**

Keep it small and use primary sources already consistent with surrounding PMI pages.

**Step 5: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 5: Verify the targeted regression turns green

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the three guide pages above

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 6: Verify the full batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the three guide pages above
- Add: `docs/plans/2026-04-05-pmi-sensitivity-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-pmi-sensitivity-trust-batch.md`

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

- this batch's files are modified
- prior local work remains untouched

**Step 5: Hold changes locally**

Do not commit or push anything.
