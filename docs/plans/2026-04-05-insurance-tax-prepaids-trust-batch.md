# Insurance Tax Prepaids Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three mortgage-payment support guides covering insurance assumptions, property-tax assumptions, and prepaids/reserves to the stronger trust model while preserving route behavior, `noindex` posture, and existing article structure.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the selected mortgage-payment cluster, then make the smallest Astro edits needed to normalize trust metadata, review coverage, and date alignment. Keep references, links, route behavior, and body structure intact.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the insurance-tax-prepaids trust batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/mortgage-payment-insurance-assumptions.astro`
- `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`
- `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `mortgage-payment-insurance-assumptions.astro` includes `Use this guide when homeowners insurance assumptions are the weak point in your payment estimate`
- `mortgage-payment-property-tax-assumptions.astro` includes `Use this guide when property tax estimates are the weak point in your mortgage payment model`
- `mortgage-payment-prepaids-and-reserves.astro` includes `Use this guide when cash to close is the part of the mortgage payment workflow you need to explain`

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

### Task 2: Upgrade `mortgage-payment-insurance-assumptions`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-insurance-assumptions.astro`

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

### Task 3: Upgrade `mortgage-payment-property-tax-assumptions`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-property-tax-assumptions.astro`

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

### Task 4: Upgrade `mortgage-payment-prepaids-and-reserves`

**Files:**
- Modify: `src/pages/guides/mortgage-payment-prepaids-and-reserves.astro`

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
- Add: `docs/plans/2026-04-05-insurance-tax-prepaids-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-insurance-tax-prepaids-trust-batch.md`

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
