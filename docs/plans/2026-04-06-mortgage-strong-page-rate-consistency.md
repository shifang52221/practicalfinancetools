# Mortgage Strong-Page Rate Consistency Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify modeled mortgage-rate wording across the remaining strong mortgage guides and remove one off-topic CTA leak from the core extra-payment workflow page.

**Architecture:** This is a content-only hardening batch. Extend the existing SEO regression in `tests/seo.test.ts` to cover the remaining strong mortgage guides, verify the new assertions fail, then make the minimum copy and CTA updates required to pass. No routes, redirects, sitemap rules, or indexability settings change.

**Tech Stack:** Astro, TypeScript-based Node test runner, existing SEO regression suite

---

### Task 1: Expand regression coverage for the remaining mortgage strong pages

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Extend `SEO: mortgage scenario examples should describe modeled rates without calling them APR` so it also covers:

- `src/pages/guides/amortization-with-extra-payments.astro`
- `src/pages/guides/biweekly-vs-extra-principal.astro`
- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/extra-mortgage-payments.astro`
- `src/pages/guides/mortgage-recast-vs-extra-payments.astro`
- `src/pages/guides/pmi-removal-vs-extra-principal.astro`

Each should require `note rate` wording and reject `% APR`.

Also add a small targeted assertion that `src/pages/guides/extra-mortgage-payments.astro` does not include:

- `href="/calculators/rent-vs-buy-calculator"`
- `href="/guides/rent-vs-buy-break-even"`

**Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL on the newly added mortgage guide terminology assertions
- FAIL on the off-topic rent-vs-buy routing assertion for `extra-mortgage-payments`

**Step 3: Do not change production files yet**

Confirm the failure is for the intended reasons before touching guide files.

### Task 2: Make the minimum guide-copy fixes

**Files:**
- Modify: `src/pages/guides/amortization-with-extra-payments.astro`
- Modify: `src/pages/guides/biweekly-vs-extra-principal.astro`
- Modify: `src/pages/guides/biweekly-mortgage-program-fees.astro`
- Modify: `src/pages/guides/extra-mortgage-payments.astro`
- Modify: `src/pages/guides/mortgage-recast-vs-extra-payments.astro`
- Modify: `src/pages/guides/pmi-removal-vs-extra-principal.astro`

**Step 1: Update mortgage example wording**

Replace the worked-example mortgage phrasing from `% APR` to `% note rate` in each target guide.

**Step 2: Tighten the final CTA cluster in `extra-mortgage-payments`**

Remove:

- `href="/calculators/rent-vs-buy-calculator"`
- `href="/guides/rent-vs-buy-break-even"`

Do not replace them with new off-topic links. Keep the cluster mortgage-payoff-focused.

**Step 3: Keep scope tight**

Do not:

- change layout structure
- add new sections
- rewrite unrelated copy
- touch routes, canonicals, or robots directives

### Task 3: Verify GREEN on the targeted regression

**Files:**
- Test: `tests/seo.test.ts`

**Step 1: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS
- the mortgage terminology regression stays green
- the noindex-edge cleanup regression stays green

**Step 2: Refactor only if needed**

If the test shape is repetitive, do only minimal cleanup while keeping behavior unchanged.

### Task 4: Run full verification for the current local worktree state

**Files:**
- Verify whole worktree

**Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- PASS with zero failing tests

**Step 2: Run Astro checks**

Run:

```bash
npm run check
```

Expected:

- `0 errors`
- `0 warnings`
- `0 hints`

**Step 3: Run production build**

Run:

```bash
npm run build
```

Expected:

- successful static build

### Task 5: Review the resulting local state

**Files:**
- Review only

**Step 1: Inspect worktree status**

Run:

```bash
git status --short
```

Expected:

- only additive local changes
- no revert of unrelated accepted work

**Step 2: Summarize without pushing**

Report:

- which strong mortgage pages were tightened
- which regression was extended
- fresh verification evidence

Do not commit, push, or deploy in this batch.
