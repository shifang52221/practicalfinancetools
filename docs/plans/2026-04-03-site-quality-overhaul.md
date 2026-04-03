# Site Quality Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve user experience, reduce low-quality site signals, and strengthen SEO by upgrading core workflows, expanding trust cues, and consolidating overlapping guide intent into fewer stronger pages.

**Architecture:** Keep the current Astro framework and URL structure. Strengthen shared trust/navigation scaffolding, promote topic hubs into real cluster centers, upgrade the highest-impression calculator clusters, and demote or selectively noindex overlapping thin guides only after stronger pages absorb their value.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner, CSS

---

### Task 1: Add regression coverage for the new cluster hierarchy

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing test**

Add focused assertions for the new core hierarchy:

- priority pages should be self-canonical
- refinance topic and selected priority guides should link to their intended consolidated pages
- priority pages chosen for trust expansion should include `ReviewedByCard` or an equivalent visible trust block if that becomes part of the implementation

Suggested priority pages:

- `src/pages/topics/refinance.astro`
- `src/pages/topics/mortgage-payoff.astro`
- `src/pages/topics/apr.astro`
- `src/pages/topics/credit-cards.astro`
- `src/pages/guides/extra-mortgage-payments.astro`
- `src/pages/guides/credit-card-payoff-strategy.astro`

**Step 2: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failure should identify missing hierarchy or trust expectations

**Step 3: Keep the test durable**

Use small file-content assertions, not snapshots.

### Task 2: Strengthen shared trust and layout scaffolding

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/layouts/CalculatorLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/ReviewedByCard.astro`

**Step 1: Improve visible trust framing**

Update shared layout areas so priority pages can more clearly surface:

- editorial review
- methodology
- update date
- educational-use framing

Do not add fake authority claims.

**Step 2: Improve trust-first UX**

Refine the visual hierarchy so pages feel less like a generic dark template and more like an intentional finance tool product.

Likely changes:

- clearer page headers
- stronger typography hierarchy
- calmer trust sections
- reduced visual ambiguity around navigation and utility links

**Step 3: Keep ad placement conservative**

Do not increase ad density. Preserve or improve readability around calculator and content blocks.

**Step 4: Re-run targeted tests**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL until content pages are updated

### Task 3: Rebuild top-level entry pages around the new hierarchy

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/topics/index.astro`

**Step 1: Reduce catalog feel**

Reorder the home page, guides index, and topics index so they emphasize:

- minimum payment / credit-card payoff workflow
- APR comparison workflow
- mortgage payoff / biweekly workflow

**Step 2: Promote cluster centers**

Make the topic hubs and strongest calculators more prominent than thin guide variants.

**Step 3: Remove weak link duplication**

Trim repeated or redundant internal links where the same destination is presented multiple times with similar wording.

**Step 4: Keep the framework intact**

Do not redesign the whole site architecture. Improve hierarchy within the existing structure.

**Step 5: Re-run targeted tests**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- may still FAIL until topic and guide cluster pages are updated

### Task 4: Upgrade the minimum-payment and credit-card cluster

**Files:**
- Modify: `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- Modify: `src/pages/calculators/credit-card-payoff-calculator.astro`
- Modify: `src/pages/topics/credit-cards.astro`
- Modify: `src/pages/guides/credit-card-payoff-strategy.astro`
- Modify: `src/pages/guides/why-minimum-payments-take-so-long.astro`

**Step 1: Clarify page roles**

Ensure each page has a distinct role:

- minimum-payment calculator = minimum-payment query target
- credit-card payoff calculator = fixed-payment modeling page
- credit-cards topic = workflow hub
- two guides = deep support pages, not duplicate mini-hubs

**Step 2: Add visible trust and references where missing**

Use the stronger reviewed-and-referenced pattern on the pages that matter most.

**Step 3: Tighten internal linking**

Point related copy back to the right calculator or topic page instead of letting every page act like a general catalog.

**Step 4: Re-run targeted tests**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- cluster-specific assertions should begin to pass

### Task 5: Upgrade the APR cluster

**Files:**
- Modify: `src/pages/calculators/apr-calculator.astro`
- Modify: `src/pages/topics/apr.astro`
- Modify: `src/pages/guides/apr-vs-interest-rate.astro`
- Modify: `src/pages/guides/apr-by-loan-type.astro`

**Step 1: Make APR page roles sharper**

Ensure:

- calculator page is the main comparison tool
- topic page is the hub
- supporting guides are deep explanations, not shallow variants

**Step 2: Improve authority cues**

Strengthen references and trust signals where needed.

**Step 3: Reduce cluster ambiguity**

Use linking and copy to make the strongest APR pages clearly more important than thin APR variants.

**Step 4: Re-run targeted tests**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- no regressions

### Task 6: Upgrade the mortgage-payoff and biweekly cluster

**Files:**
- Modify: `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Modify: `src/pages/calculators/additional-principal-payment-calculator.astro`
- Modify: `src/pages/topics/mortgage-payoff.astro`
- Modify: `src/pages/guides/extra-mortgage-payments.astro`

**Step 1: Keep intent separation**

Preserve the existing broad-vs-principal-only split between:

- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`

**Step 2: Make biweekly the fast-win page**

Improve the biweekly page's clarity, trust, and supporting comparisons since it is the closest cluster to stronger rankings.

**Step 3: Promote the mortgage-payoff topic hub**

Use the topic page as the cluster center that routes users into the right mortgage workflow.

**Step 4: Re-run targeted tests**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS for intended cluster-link assertions

### Task 7: Consolidate refinance intent and demote thin overlaps

**Files:**
- Modify: `src/pages/topics/refinance.astro`
- Modify: `src/pages/guides/refinance-break-even.astro`
- Modify: `src/pages/guides/refinance-closing-costs.astro`
- Modify: `src/pages/guides/refinance-checklist.astro`
- Modify: `src/pages/guides/refinance-offer-comparison-checklist.astro`
- Modify: `src/pages/guides/refinance-points-break-even.astro`
- Modify: `src/pages/guides/refinance-rate-lock.astro`
- Modify: `src/pages/guides/refinance-rate-vs-term-tradeoff.astro`
- Modify: `src/pages/guides/refinance-reset-amortization.astro`
- Modify: `src/pages/guides/refinance-rolling-costs-into-loan.astro`
- Modify: `src/pages/guides/refinance-when-not-to-refinance.astro`
- Modify: `src/pages/guides/refinance-cash-in-lower-rate.astro`
- Modify: `src/pages/guides/refinance-cash-out-vs-rate-term.astro`
- Modify: `src/pages/guides/refinance-no-closing-costs-myth.astro`

**Step 1: Promote three refinance winners**

Strengthen these pages as the long-term refinance entry set:

- `refinance-break-even`
- `refinance-closing-costs`
- `refinance-checklist`

**Step 2: Make the topic page explicitly consolidated**

`src/pages/topics/refinance.astro` should clearly present these stronger pages as the main deep dives.

**Step 3: Demote overlapping support pages**

For the thin refinance support pages:

- absorb any critical insight into stronger pages where needed
- tighten internal links toward the stronger pages
- add `robots="noindex, follow"` only where overlap is clear and the parent page already covers the job well

Do not mass-redirect in this pass.

**Step 4: Re-run the targeted tests**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 8: Final verification and release preparation

**Files:**
- Verify only

**Step 1: Run type and lint-style checks**

Run:

```bash
npm run check
```

Expected:

- PASS

**Step 2: Run full tests**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 3: Run production build**

Run:

```bash
npm run build
```

Expected:

- PASS

**Step 4: Review diff boundaries**

Confirm the diff is limited to:

- layout and trust components
- top-level entry pages
- priority calculators
- priority topics
- selected guide clusters
- SEO tests
- plan docs

**Step 5: Push as one batch**

Use one final review pass, then create a single cohesive push for the overhaul work.
