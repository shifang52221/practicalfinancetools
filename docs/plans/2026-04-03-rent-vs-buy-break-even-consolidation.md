# Rent Vs Buy Break-Even Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `rent-vs-buy-break-even` so it can safely absorb the six redirected `rent-vs-buy` support pages, then align those source pages with sitemap exclusion, redirect behavior, and source-page `noindex, follow`.

**Architecture:** Keep the current Astro routes, redirects, and content structure. First add failing regression tests for the break-even destination and its six redirect-source pages, then make the minimum destination-page trust and role upgrade, and finally add page-level `robots="noindex, follow"` to the six source pages.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the rent-vs-buy break-even consolidation batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing source-page consolidation test**

Add a regression block that uses an explicit source-to-destination map for:

- `"/guides/rent-vs-buy-time-horizon"` -> `"/guides/rent-vs-buy-break-even"`
- `"/guides/rent-vs-buy-price-to-rent-ratio"` -> `"/guides/rent-vs-buy-break-even"`
- `"/guides/rent-vs-buy-rent-growth"` -> `"/guides/rent-vs-buy-break-even"`
- `"/guides/rent-vs-buy-home-appreciation"` -> `"/guides/rent-vs-buy-break-even"`
- `"/guides/rent-vs-buy-investment-return"` -> `"/guides/rent-vs-buy-break-even"`
- `"/guides/rent-vs-buy-mortgage-rate-sensitivity"` -> `"/guides/rent-vs-buy-break-even"`

Require for each source page:

- redirect target matches exactly
- sitemap exclusion exists in `astro.config.mjs`
- the page source includes `robots="noindex, follow"`

**Step 2: Write the failing destination-page trust test**

Add a second regression block for:

- `src/pages/guides/rent-vs-buy-break-even.astro`

Require:

- `ReviewedByCard`
- `References`
- matching `lastUpdated` and visible `Last updated:`
- a destination-role phrase that makes the page the clear home for break-even / assumption-testing intent

Use exact phrase checks that reflect the approved design, not vague partial matches.

**Step 3: Run the test suite to verify RED**

Run:

```bash
npm test
```

Expected:

- FAIL
- the source-page test should fail because the six source pages still lack `robots="noindex, follow"`
- the destination-page test should fail because `rent-vs-buy-break-even.astro` still lacks `ReviewedByCard` and the new role-language expectation

**Step 4: Keep the expectations fixed**

Do not weaken the assertions after the red run unless a path or redirect target is factually wrong.

### Task 2: Strengthen the break-even destination page

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-break-even.astro`

**Step 1: Add trust coverage**

Add:

- `ReviewedByCard` import
- `ReviewedByCard` component near the top of the page
- `lastUpdated = "2026-04-03"`
- visible `Last updated: 2026-04-03`

Keep the existing `References` section.

**Step 2: Add the absorbed-intent role section**

Add a short section near the top of the page that clearly says this guide is for:

- users whose main question is how long they need to stay for buying to break even
- users testing assumptions such as rent growth, appreciation, investment return, or mortgage rate
- users using price-to-rent as a quick screen before a full scenario

Keep the copy practical and concise. Do not redesign the page or rewrite the whole article.

**Step 3: Preserve page structure**

Do not change:

- route
- `canonicalPath`
- main content sections that already explain break-even inputs and scenario testing

**Step 4: Re-run tests**

Run:

```bash
npm test
```

Expected:

- the destination-page trust test turns green
- the source-page consolidation test still fails until Task 3 is complete

### Task 3: Add source-page `noindex` to the six break-even redirect-source pages

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-time-horizon.astro`
- Modify: `src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro`
- Modify: `src/pages/guides/rent-vs-buy-rent-growth.astro`
- Modify: `src/pages/guides/rent-vs-buy-home-appreciation.astro`
- Modify: `src/pages/guides/rent-vs-buy-investment-return.astro`
- Modify: `src/pages/guides/rent-vs-buy-mortgage-rate-sensitivity.astro`

**Step 1: Add the minimal source-page guard**

For each page, add `robots="noindex, follow"` to the existing `BaseLayout` call.

**Step 2: Preserve current source-page behavior**

Do not change:

- `canonicalPath`
- redirect behavior
- page body copy
- button destinations

The only intended behavior change in these files is the source-page `noindex` signal.

**Step 3: Re-run tests**

Run:

```bash
npm test
```

Expected:

- PASS

### Task 4: Confirm the batch stays within the intended boundary

**Files:**
- Verify only

**Step 1: Rely on the existing active-link hygiene guard**

Do not add new link rewrites unless the existing global redirected-link test fails.

This batch should not spill into:

- `rent-vs-buy-costs-to-include`
- `rent-vs-buy-down-payment`
- `rent-vs-buy-closing-costs`
- any other future consolidation group

**Step 2: Re-run tests**

Run:

```bash
npm test
```

Expected:

- PASS
- no new failures from the existing `active pages should not link to redirected guide URLs` regression

### Task 5: Verify the full batch locally

**Files:**
- Modify: `tests/seo.test.ts`
- Modify: `src/pages/guides/rent-vs-buy-break-even.astro`
- Modify: the six source pages from Task 3

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

- the intended rent-vs-buy batch files are modified
- previously accepted local work remains untouched

**Step 5: Hold changes locally**

Do not commit or push anything. Keep the batch local for unified review with the rest of the site-quality work.
