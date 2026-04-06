# Mortgage Payment Decision Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three mortgage-payment decision guides to the stronger trust model without changing page structure or route behavior.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block, then make the minimum Astro page changes needed to satisfy it. Keep each page's current references, role section, and `robots` settings intact while normalizing trust metadata and dates.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the mortgage-payment decision batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/mortgage-payment-15-vs-30-year.astro`
- `src/pages/guides/mortgage-payment-down-payment-impact.astro`
- `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `mortgage-payment-15-vs-30-year.astro` includes `Use this guide when term choice is the real mortgage-payment decision`
- `mortgage-payment-down-payment-impact.astro` includes `Use this guide when the main tradeoff is down payment versus reserves and PMI`
- `mortgage-payment-total-cost-vs-payment.astro` includes `Use this guide when the cheapest monthly payment is not automatically the cheapest loan`

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

### Task 2: Upgrade `mortgage-payment-15-vs-30-year`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-15-vs-30-year.astro`

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

### Task 3: Upgrade `mortgage-payment-down-payment-impact`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-down-payment-impact.astro`

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

### Task 4: Upgrade `mortgage-payment-total-cost-vs-payment`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-total-cost-vs-payment.astro`

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
- Add: `docs/plans/2026-04-05-mortgage-payment-decision-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-mortgage-payment-decision-trust-batch.md`

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
