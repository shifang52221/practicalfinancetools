# Rent vs Buy Ownership Cost Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three rent-vs-buy ownership-cost support guides to the stronger trust model while preserving current routes, `noindex` posture, and their supporting role around the costs workflow.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the rent-vs-buy ownership-cost trio, then make the smallest Astro edits needed to normalize trust metadata, visible review coverage, role framing, official references, date alignment, and destination routing. Keep the article bodies intact except for the minimum additions needed to make each page read like a reviewed decision-support guide.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the rent-vs-buy ownership-cost batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/rent-vs-buy-maintenance-estimate.astro`
- `src/pages/guides/rent-vs-buy-hoa-fees.astro`
- `src/pages/guides/rent-vs-buy-pmi-assumptions.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also require role phrases:

- `rent-vs-buy-maintenance-estimate.astro` includes `Use this guide when maintenance reserves are the least certain part of your ownership-cost estimate`
- `rent-vs-buy-hoa-fees.astro` includes `Use this guide when HOA dues or special assessments are the ownership cost most likely to be missed or double counted`
- `rent-vs-buy-pmi-assumptions.astro` includes `Use this guide when PMI is the hidden ownership cost changing the low-down-payment comparison`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust metadata, missing review cards, missing role sections, missing references, or stale dates

### Task 2: Upgrade `rent-vs-buy-maintenance-estimate`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-maintenance-estimate.astro`

**Step 1: Add trust imports and layout metadata**

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

- `Use this guide when maintenance reserves are the least certain part of your ownership-cost estimate`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- budgeting for home maintenance and repairs
- total home payment inputs

**Step 5: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `rent-vs-buy-hoa-fees`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-hoa-fees.astro`

**Step 1: Add trust imports and layout metadata**

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

- `Use this guide when HOA dues or special assessments are the ownership cost most likely to be missed or double counted`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- HOA dues as part of affordability planning
- HOA dues usually not being included in the mortgage-servicer payment

**Step 5: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `rent-vs-buy-pmi-assumptions`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-pmi-assumptions.astro`

**Step 1: Add trust imports and layout metadata**

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

- `Use this guide when PMI is the hidden ownership cost changing the low-down-payment comparison`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- what PMI is
- how PMI is paid
- when PMI can be removed

**Step 5: Tighten routing**

Where reasonable, replace support-page routing with current active destination pages in the rent-vs-buy workflow.

**Step 6: Align dates**

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
- Add: `docs/plans/2026-04-05-rent-vs-buy-ownership-cost-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-rent-vs-buy-ownership-cost-trust-batch.md`

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
