# Rent vs Buy Assumptions Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three legacy rent-vs-buy assumption guides to the stronger trust model while preserving current routes, `noindex` posture, and calculator/topic routing.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the rent-vs-buy assumption cluster, then make the smallest Astro edits needed to normalize trust metadata, visible review coverage, role framing, and date alignment. Keep the article bodies intact except for the minimum additions needed to make each page read like a reviewed decision-support guide.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the rent-vs-buy assumptions batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/rent-vs-buy-time-horizon.astro`
- `src/pages/guides/rent-vs-buy-rent-growth.astro`
- `src/pages/guides/rent-vs-buy-home-appreciation.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `rent-vs-buy-time-horizon.astro` includes `Use this guide when holding period uncertainty is the main rent-vs-buy decision risk`
- `rent-vs-buy-rent-growth.astro` includes `Use this guide when rent growth assumptions are the weakest part of your rent-vs-buy model`
- `rent-vs-buy-home-appreciation.astro` includes `Use this guide when appreciation assumptions are doing too much work in the buy case`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should come from missing trust metadata, missing review cards, missing role sections, or stale dates on the three target pages

### Task 2: Upgrade `rent-vs-buy-time-horizon`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-time-horizon.astro`

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

- `Use this guide when holding period uncertainty is the main rent-vs-buy decision risk`

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `rent-vs-buy-rent-growth`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-rent-growth.astro`

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

- `Use this guide when rent growth assumptions are the weakest part of your rent-vs-buy model`

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `rent-vs-buy-home-appreciation`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-home-appreciation.astro`

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

- `Use this guide when appreciation assumptions are doing too much work in the buy case`

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
- Add: `docs/plans/2026-04-05-rent-vs-buy-assumptions-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-rent-vs-buy-assumptions-trust-batch.md`

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
