# Cross-Topic Guide Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade three still-legacy high-value guides to the stronger trust model and clearer decision-role pattern without changing site structure.

**Architecture:** Keep the existing Astro routes and main article structure intact. First add a failing SEO regression for the selected pages, then apply the minimum trust and role edits needed to make the tests pass, and finally run full local verification.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the next guide trust batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/rent-vs-buy-checklist.astro`
- `src/pages/guides/amortization-with-extra-payments.astro`
- `src/pages/guides/pay-off-mortgage-early-or-invest.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`

Also require role phrases:

- `rent-vs-buy-checklist.astro` includes `Use this guide when your rent-vs-buy assumptions still need to be pressure-tested`
- `amortization-with-extra-payments.astro` includes `Use this guide when you want to see how extra principal changes the amortization table`
- `pay-off-mortgage-early-or-invest.astro` includes `Use this guide when you are comparing guaranteed mortgage savings with uncertain investment returns`

**Step 2: Lock date alignment**

Require each file's `lastUpdated` and visible `Last updated:` line to equal `2026-04-05`.

**Step 3: Run the targeted SEO test to verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should be caused by missing trust fields, missing role sections, or stale dates

### Task 2: Upgrade `rent-vs-buy-checklist`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-checklist.astro`

**Step 1: Add trust imports and metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the review card**

Add `ReviewedByCard` near the top of the page using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add a concise role section**

Add a short "Use this guide when..." section near the top with the exact role phrase from Task 1 and supporting bullets about weak assumptions, suspicious break-even results, and gathering realistic inputs before using the calculator.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `amortization-with-extra-payments`

**Files:**
- Modify: `src/pages/guides/amortization-with-extra-payments.astro`

**Step 1: Add trust imports and metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the review card**

Add `ReviewedByCard` near the top of the page using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add a concise role section**

Add a short "Use this guide when..." section near the top with the exact role phrase from Task 1 and supporting bullets about understanding the amortization table, comparing monthly extra versus lump sum timing, and choosing between the schedule tool and the extra payment calculator.

**Step 4: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Upgrade `pay-off-mortgage-early-or-invest`

**Files:**
- Modify: `src/pages/guides/pay-off-mortgage-early-or-invest.astro`

**Step 1: Add trust imports and metadata**

Add:

- `ReviewedByCard` import
- `TRUST_PROFILES` import
- `authorProfile`
- `reviewProfiles`

**Step 2: Add the review card**

Add `ReviewedByCard` near the top of the page using:

- `writtenBy`
- `reviewedBy`
- `secondaryReview`
- `reviewScope`
- `reviewedOn="2026-04-05"`

**Step 3: Add a concise role section**

Add a short "Use this guide when..." section near the top with the exact role phrase from Task 1 and supporting bullets about taxes, liquidity, risk tolerance, and routing into the extra-payment calculator when the user needs numbers next.

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
- Add: `docs/plans/2026-04-05-cross-topic-guide-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-cross-topic-guide-trust-batch.md`

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
