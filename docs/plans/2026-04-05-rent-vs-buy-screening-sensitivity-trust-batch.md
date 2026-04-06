# Rent vs Buy Screening Sensitivity Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three rent-vs-buy support guides to the stronger trust model while preserving current routes, `noindex` posture, and their supporting role around the break-even workflow.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the rent-vs-buy screening-and-sensitivity trio, then make the smallest Astro edits needed to normalize trust metadata, visible review coverage, role framing, date alignment, and destination routing. Keep the articles intact except for the minimum additions needed to make each page read like a reviewed decision-support guide.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the rent-vs-buy screening-and-sensitivity batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`
- `src/pages/guides/rent-vs-buy-investment-return.astro`
- `src/pages/guides/rent-vs-buy-mortgage-rate-sensitivity.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `rent-vs-buy-price-to-rent-ratio.astro` includes `Use this guide when you need a quick market screen before the full model`
- `rent-vs-buy-investment-return.astro` includes `Use this guide when investment return assumptions are the least certain part of your rent-vs-buy comparison`
- `rent-vs-buy-mortgage-rate-sensitivity.astro` includes `Use this guide when rate volatility is the reason your rent-vs-buy answer keeps changing`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust metadata, legacy review-card props, missing role sections, or stale dates

### Task 2: Upgrade `rent-vs-buy-price-to-rent-ratio`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`

**Step 1: Add trust imports and layout metadata**

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

**Step 3: Preserve the role section and references**

Keep:

- the current role phrase
- the current references section

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `rent-vs-buy-investment-return`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-investment-return.astro`

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

- `Use this guide when investment return assumptions are the least certain part of your rent-vs-buy comparison`

**Step 4: Add a short references section**

Use official sources relevant to:

- investing basics and risk/return framing
- compound growth and opportunity cost

**Step 5: Replace redirected guide links with active destinations**

Update any links that still point to redirected rent-vs-buy support URLs so the page routes users to the current active destination pages instead.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `rent-vs-buy-mortgage-rate-sensitivity`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-mortgage-rate-sensitivity.astro`

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

- `Use this guide when rate volatility is the reason your rent-vs-buy answer keeps changing`

**Step 4: Add a short references section**

Use official sources relevant to:

- mortgage rate shopping
- interpreting and stress-testing mortgage rate scenarios

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
- Add: `docs/plans/2026-04-05-rent-vs-buy-screening-sensitivity-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-rent-vs-buy-screening-sensitivity-trust-batch.md`

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
