# Extra Payment Cluster Tightening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the extra-payment cluster so the two main entry pages stay dominant, the five indexable support pages each own one distinct decision job, and the remaining noindex support pages stay aligned with the same trust and routing model.

**Architecture:** Keep the existing URL structure and indexability strategy. Refine only page-role boundaries, cross-links, trust/date consistency, and stale support-page copy so the cluster reads like a deliberate decision tree rather than overlapping alternatives.

**Tech Stack:** Astro pages, static HTML content, local SEO regression tests, Vercel sitemap integration.

---

### Task 1: Narrow the two overlap-prone indexable support pages

**Files:**
- Modify: `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro`
- Modify: `src/pages/guides/extra-payment-priority-vs-other-debts.astro`

**Step 1: Inspect the current role boundary**

Review each page for overlap with `extra-payment-windfall-strategy`, `pay-off-mortgage-early-or-invest`, and `extra-payment-vs-refinance`.

**Step 2: Rewrite only the page-intent framing**

Make `lump-sum-vs-monthly` stay focused on timing comparison between equal dollars.
Make `priority-vs-other-debts` stay focused on competing uses of cash and reserve pressure, not broad long-run investing comparisons.

**Step 3: Tighten internal links**

Keep the links that route to the next decision, but remove any wording that makes the pages sound like alternate main entries.

**Step 4: Preserve trust metadata and indexability**

Do not add `noindex` to either page. Keep the existing review model and visible last-updated date aligned.

### Task 2: Bring older noindex support pages up to the current support-page trust standard

**Files:**
- Modify: `src/pages/guides/extra-payment-servicer-posting-rules.astro`
- Modify: `src/pages/guides/extra-payment-prepayment-penalty-checklist.astro`
- Modify: `src/pages/guides/extra-payment-tax-deduction-impact.astro`
- Modify: `src/pages/guides/extra-payment-escrow-not-affected.astro`

**Step 1: Refresh the support-page voice**

Rewrite intro and routing copy so each page clearly owns one narrow operational question.

**Step 2: Add or normalize trust coverage where missing**

Where appropriate, add `ReviewedByCard` and the stronger trust bindings used by the newer support pages.

**Step 3: Normalize freshness signals**

Update `lastUpdated` and visible `Last updated` text so they reflect the current support-page refresh, without changing the noindex policy.

**Step 4: Avoid broadening the scope**

Do not turn these into general-purpose guide pages. Keep them as operational edge-case support leaves.

### Task 3: Extend regression coverage for the tightened cluster

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Add or adjust role assertions**

Add assertions that the two indexable support pages keep their narrow decision jobs and that the noindex support pages still read like absorbed support leaves.

**Step 2: Preserve indexability rules**

Keep the existing sitemap and noindex policy tests aligned with the final page roles.

**Step 3: Verify the exact copy**

Check the strongest routing phrases and visible dates so future edits do not drift the cluster back into overlap.

### Task 4: Verify the cluster end to end

**Files:**
- Verify: `tests/seo.test.ts`
- Verify: `astro.config.mjs`
- Verify: all modified `src/pages/guides/extra-payment-*.astro`

**Step 1: Run targeted SEO tests**

Run `npm test -- tests/seo.test.ts` and confirm all SEO assertions pass.

**Step 2: Run Astro diagnostics**

Run `npm run check` and confirm there are no warnings or errors.

**Step 3: Run a production build**

Run `npm run build` and confirm the site still builds cleanly.

