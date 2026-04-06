# Indexable Decision Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three indexable decision-support guides to the stronger trust model while keeping their structure and user flow intact.

**Architecture:** Add one focused SEO regression block for the selected pages, then make the smallest possible Astro changes to normalize trust metadata, review coverage, and visible freshness. Keep all role sections, references, and route behavior intact.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the indexable decision batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/extra-payment-vs-refinance.astro`
- `src/pages/guides/dti-calculation-step-by-step.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `biweekly-mortgage-program-fees.astro` includes `Use this guide when a biweekly program charges fees or controls payment posting`
- `extra-payment-vs-refinance.astro` includes `Use this guide when you are deciding between faster payoff and refinancing`
- `dti-calculation-step-by-step.astro` includes `Use this guide when you need the exact DTI workflow before comparing front-end, back-end, or housing-payment scenarios`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust metadata or stale dates

### Task 2: Upgrade `biweekly-mortgage-program-fees`

**Files:**
- Modify: `src/pages/guides/biweekly-mortgage-program-fees.astro`

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

Keep the current role section intact.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `extra-payment-vs-refinance`

**Files:**
- Modify: `src/pages/guides/extra-payment-vs-refinance.astro`

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

Keep the current role section intact.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `dti-calculation-step-by-step`

**Files:**
- Modify: `src/pages/guides/dti-calculation-step-by-step.astro`

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

Keep the current role section intact.

**Step 4: Align dates**

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
- Add: `docs/plans/2026-04-05-indexable-decision-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-indexable-decision-trust-batch.md`

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
