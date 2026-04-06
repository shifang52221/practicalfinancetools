# Rent vs Buy Upfront Cash Trust Batch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the final two legacy rent-vs-buy upfront-cash guides to the stronger trust model while preserving their current routes, `noindex` posture, and supporting role in the rent-vs-buy workflow.

**Architecture:** Extend `tests/seo.test.ts` with one focused regression block for the upfront-cash pair, then make the smallest Astro edits needed to normalize trust metadata, visible review coverage, role framing, official references, date alignment, and stronger routing toward current destination pages. Keep the article bodies intact except for the minimum additions needed to make each page read like a reviewed decision-support guide.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the rent-vs-buy upfront-cash batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing regression test**

Cover:

- `src/pages/guides/rent-vs-buy-down-payment.astro`
- `src/pages/guides/rent-vs-buy-closing-costs.astro`

Require for each file:

- `TRUST_PROFILES`
- `authorProfile=`
- `reviewProfiles=`
- `ReviewedByCard`
- `writtenBy=`
- `reviewScope=`
- `>References<`

Also require role phrases:

- `rent-vs-buy-down-payment.astro` includes `Use this guide when the down payment decision is changing both your monthly payment and your opportunity-cost assumptions`
- `rent-vs-buy-closing-costs.astro` includes `Use this guide when upfront and exit costs are the reason a short-horizon buy case stops making sense`

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

### Task 2: Upgrade `rent-vs-buy-down-payment`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-down-payment.astro`

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

- `Use this guide when the down payment decision is changing both your monthly payment and your opportunity-cost assumptions`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- determining an appropriate down payment
- down-payment tradeoffs and mortgage insurance
- upfront cash preparation before buying

**Step 5: Tighten routing**

Where reasonable, route toward current active destination pages in the rent-vs-buy workflow.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 3: Upgrade `rent-vs-buy-closing-costs`

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-closing-costs.astro`

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

- `Use this guide when upfront and exit costs are the reason a short-horizon buy case stops making sense`

**Step 4: Add a short references section**

Use official CFPB sources relevant to:

- Loan Estimate and Closing Disclosure
- reviewing closing documents before closing
- comparing estimated and final closing costs

**Step 5: Tighten routing**

Where reasonable, route toward current active destination pages in the rent-vs-buy workflow.

**Step 6: Align dates**

Set:

- `const lastUpdated = "2026-04-05";`
- visible `Last updated: 2026-04-05`

### Task 4: Verify the targeted regression turns green

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the two guide pages above

**Step 1: Run the targeted SEO test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 5: Verify the full batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: the two guide pages above
- Add: `docs/plans/2026-04-05-rent-vs-buy-upfront-cash-trust-batch-design.md`
- Add: `docs/plans/2026-04-05-rent-vs-buy-upfront-cash-trust-batch.md`

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
