# Rent Vs Buy Costs-To-Include Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `rent-vs-buy-costs-to-include` so it can safely absorb the five redirected ownership-cost support pages, then align those source pages with sitemap exclusion, redirect behavior, and source-page `noindex, follow`.

**Architecture:** Keep the current Astro routes, redirects, and content structure. First add failing regression tests for the costs-to-include destination and its five redirect-source pages, then make the minimum destination-page trust and role upgrade, and finally add page-level `robots="noindex, follow"` to the five source pages.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the rent-vs-buy costs-to-include consolidation batch

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing source-page consolidation test**

Add a regression block that uses an explicit source-to-destination map for:

- `"/guides/rent-vs-buy-down-payment"` -> `"/guides/rent-vs-buy-costs-to-include"`
- `"/guides/rent-vs-buy-maintenance-estimate"` -> `"/guides/rent-vs-buy-costs-to-include"`
- `"/guides/rent-vs-buy-closing-costs"` -> `"/guides/rent-vs-buy-costs-to-include"`
- `"/guides/rent-vs-buy-hoa-fees"` -> `"/guides/rent-vs-buy-costs-to-include"`
- `"/guides/rent-vs-buy-pmi-assumptions"` -> `"/guides/rent-vs-buy-costs-to-include"`

Require for each source page:

- redirect target matches exactly
- sitemap exclusion exists in `astro.config.mjs`
- the page source includes `robots="noindex, follow"`

**Step 2: Write the failing destination-page trust test**

Add a second regression block for:

- `src/pages/guides/rent-vs-buy-costs-to-include.astro`

Require:

- `ReviewedByCard`
- `References`
- matching `lastUpdated` and visible `Last updated:`
- a destination-role phrase that makes the page the clear home for ownership-cost and upfront-cash modeling questions

Use exact phrase checks that reflect the approved design, not vague partial matches.

**Step 3: Run the test suite to verify RED**

Run:

```bash
npm test
```

Expected:

- FAIL
- the source-page test should fail because the five source pages still lack `robots="noindex, follow"`
- the destination-page test should fail because `rent-vs-buy-costs-to-include.astro` still lacks `ReviewedByCard` and the new role-language expectation

**Step 4: Keep the expectations fixed**

Do not weaken the assertions after the red run unless a path or redirect target is factually wrong.

### Task 2: Strengthen the costs-to-include destination page

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-costs-to-include.astro`

**Step 1: Add trust coverage**

Add:

- `ReviewedByCard` import
- `ReviewedByCard` component near the top of the page
- `lastUpdated = "2026-04-04"`
- visible `Last updated: 2026-04-04`

Keep the existing `References` section.

**Step 2: Add the absorbed-intent role section**

Add a short section near the top of the page that clearly says this guide is for:

- users comparing upfront cash, down payment tradeoffs, or closing costs
- users pressure-testing maintenance, HOA, insurance, taxes, or PMI assumptions
- users whose break-even result looks wrong because ownership costs are incomplete

Keep the copy practical and concise. Do not redesign the page or rewrite the whole article.

**Step 3: Preserve page structure**

Do not change:

- route
- `canonicalPath`
- main content sections that already explain one-time and ongoing ownership costs

**Step 4: Re-run tests**

Run:

```bash
npm test
```

Expected:

- the destination-page trust test turns green
- the source-page consolidation test still fails until Task 3 is complete

### Task 3: Add source-page `noindex` to the five costs-to-include redirect-source pages

**Files:**
- Modify: `src/pages/guides/rent-vs-buy-down-payment.astro`
- Modify: `src/pages/guides/rent-vs-buy-maintenance-estimate.astro`
- Modify: `src/pages/guides/rent-vs-buy-closing-costs.astro`
- Modify: `src/pages/guides/rent-vs-buy-hoa-fees.astro`
- Modify: `src/pages/guides/rent-vs-buy-pmi-assumptions.astro`

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

- `rent-vs-buy-break-even`
- the `rent-vs-buy` topic hub
- other active rent-vs-buy pages that already point to the live destination page

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
- Modify: `src/pages/guides/rent-vs-buy-costs-to-include.astro`
- Modify: the five source pages from Task 3

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
