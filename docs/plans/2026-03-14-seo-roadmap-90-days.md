# 90-Day SEO Roadmap Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve ranking quality and click potential for Practical Finance Tools by stabilizing site structure, sharpening search intent alignment, and concentrating authority in the mortgage payoff, credit card payoff, and APR clusters over the next 90 days.

**Architecture:** The roadmap is deliberately conservative: protect existing indexation signals first, then strengthen exact-intent pages and internal linking, then scale only within proven topic clusters. The site should evolve as a tool-first finance property, where each calculator has a clear role, a small set of tightly aligned supporting guides, and a topic hub that distributes relevance without creating duplicate intent.

**Tech Stack:** Astro, Node.js test runner, Google Search Console, Vercel

---

### Task 1: Freeze structural churn and establish a stable SEO baseline

**Files:**
- Review: `vercel.json`
- Review: `tests/seo.test.ts`
- Review: `docs/seo/growth-plan.md`
- Review: `src/pages/guides`
- Review: `src/pages/calculators`

**Step 1: Avoid new URL consolidations for 30 days**

Do not add new redirects, canonical merges, or slug changes unless there is a clear technical error.

**Step 2: Keep regression checks active**

Maintain and extend `tests/seo.test.ts` so redirect-hop links and intent-link drift are caught before deploy.

**Step 3: Verify current baseline**

Run:

```bash
npm test
```

Expected:

- PASS

**Step 4: Record baseline metrics**

In Search Console, export and log for each primary URL:

- clicks
- impressions
- average position
- top queries

Core pages:

- `/calculators/extra-payment-calculator`
- `/calculators/additional-principal-payment-calculator`
- `/calculators/minimum-payment-payoff-calculator`
- `/calculators/credit-card-payoff-calculator`
- `/calculators/apr-calculator`
- `/calculators/biweekly-mortgage-payment-calculator`

**Step 5: Commit only if baseline artifacts changed**

```bash
git add tests/seo.test.ts docs/seo/growth-plan.md
git commit -m "chore: lock seo baseline and guardrails"
```

### Task 2: Win the easiest near-term rankings in the mortgage payoff cluster

**Files:**
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Modify: `src/pages/calculators/additional-principal-payment-calculator.astro`
- Modify: `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- Modify: `src/pages/topics/mortgage-payoff.astro`
- Modify: selected guides under `src/pages/guides/extra-*`, `src/pages/guides/pay-*-extra-on-mortgage.astro`, `src/pages/guides/principal-only-extra-payments.astro`
- Test: `tests/seo.test.ts`

**Step 1: Keep the current intent split**

Maintain:

- broad monthly extra-payment intent on `/calculators/extra-payment-calculator`
- additional principal / lump-sum / principal-only intent on `/calculators/additional-principal-payment-calculator`

**Step 2: Push “biweekly” harder**

Because biweekly queries are already materially closer to page-1/page-2 territory than other clusters, strengthen:

- title support
- opening copy
- internal links from mortgage payoff hub and related guides

without broadening the page away from its exact query family.

**Step 3: Tighten guide-to-tool routing**

Guide families should route like this:

- monthly extra / payoff acceleration -> `/calculators/extra-payment-calculator`
- lump sum / windfall / principal-only -> `/calculators/additional-principal-payment-calculator`
- biweekly comparison -> `/calculators/biweekly-mortgage-payment-calculator`

**Step 4: Run test suite**

```bash
npm test
```

Expected:

- PASS

**Step 5: Measure after 10 to 21 days**

Watch whether mortgage payoff queries start separating by URL instead of competing across multiple pages.

### Task 3: Upgrade the credit-card payoff cluster around exact-intent queries

**Files:**
- Modify: `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- Modify: `src/pages/calculators/credit-card-payoff-calculator.astro`
- Modify: `src/pages/calculators/debt-snowball-calculator.astro`
- Modify: `src/pages/topics/credit-cards.astro`
- Modify: `src/pages/guides/why-minimum-payments-take-so-long.astro`
- Review: `src/pages/guides/credit-card-minimum-payment-formula.astro`
- Test: `tests/seo.test.ts`

**Step 1: Protect minimum-payment intent**

Keep `/calculators/minimum-payment-payoff-calculator` focused on:

- minimum payment calculator
- credit card minimum payment calculator
- how long minimum payments take

**Step 2: Separate fixed-payment intent**

Keep `/calculators/credit-card-payoff-calculator` centered on:

- fixed monthly payment payoff
- payoff date
- total interest

**Step 3: Use guides to capture exact questions**

Do not over-merge exact-intent support pages when they map closely to distinct queries such as:

- minimum payment formula
- why minimum payments take so long
- statement calculation questions

**Step 4: Improve query-to-page matching**

Adjust intros, FAQ ordering, and CTA labels so:

- formula/explanation queries flow to guides
- calculation queries flow to calculators

**Step 5: Run test suite**

```bash
npm test
```

Expected:

- PASS

### Task 4: Keep APR as a focused comparison cluster, not a generic finance topic

**Files:**
- Modify: `src/pages/calculators/apr-calculator.astro`
- Modify: `src/pages/topics/apr.astro`
- Modify: `src/pages/guides/apr-vs-interest-rate.astro`
- Review: `src/pages/guides/apr-calculator-payment.astro`
- Review: `src/pages/guides/apr-by-loan-type.astro`
- Test: `tests/seo.test.ts`

**Step 1: Keep the calculator practical**

Make `/calculators/apr-calculator` primarily about comparing rate + fees + term, not about every possible APR education query.

**Step 2: Let guides answer conceptual questions**

Push explanatory queries such as:

- APR vs interest rate
- APR and fees
- loan type comparisons

toward guide pages, while keeping direct calculator intent on the calculator page.

**Step 3: Avoid generic APR sprawl**

Only create or expand pages that map to real search behavior already appearing in Search Console.

**Step 4: Run test suite**

```bash
npm test
```

Expected:

- PASS

### Task 5: Use topic hubs as distribution layers, not ranking targets for broad money terms

**Files:**
- Modify: `src/pages/topics/index.astro`
- Modify: `src/pages/topics/mortgage-payoff.astro`
- Modify: `src/pages/topics/credit-cards.astro`
- Modify: `src/pages/topics/apr.astro`

**Step 1: Keep hubs tightly scoped**

Each topic page should:

- explain the user journey
- point to the right calculator first
- link to a small set of best support guides

**Step 2: Remove “directory for its own sake” behavior**

If a hub section does not help Google or users understand which URL solves which intent, trim it.

**Step 3: Make hubs reinforce specialization**

Each hub should clearly teach:

- what the main calculator is
- when to use it
- which guide answers adjacent questions

### Task 6: Establish a lightweight content creation rule for future pages

**Files:**
- Modify: `docs/seo/growth-plan.md`
- Optionally create: `docs/seo/content-rules.md`

**Step 1: Add a page creation rule**

Only create a new SEO page if it meets at least one of these:

- it solves a query already showing impressions in Search Console
- it expresses a materially different calculator intent
- it supports an existing calculator with a precise adjacent question

**Step 2: Add a page rejection rule**

Do not create a page if it would:

- substantially overlap an existing calculator
- only restate a broader guide
- require a redirect or merge within 30 days to fix overlap

### Task 7: Run a recurring measurement loop every two weeks

**Files:**
- Update repeatedly: `docs/seo/growth-plan.md`

**Step 1: Every 14 days, record**

For the core URLs:

- impressions
- clicks
- average position
- top gaining queries
- top losing queries

**Step 2: Classify outcomes**

Use three buckets:

- structural issue
- intent mismatch
- insufficient authority / needs more support

**Step 3: Only act on one cluster at a time**

Do not launch major changes in mortgage payoff, credit cards, and APR all at once.

### Task 8: 90-day success criteria

**Files:**
- Update repeatedly: `docs/seo/growth-plan.md`

**Step 1: Define realistic targets**

Reasonable 90-day signals:

- mortgage payoff cluster starts earning consistent clicks
- biweekly page moves materially closer to top 20
- minimum-payment and credit-card pages begin earning first clicks from exact-intent terms
- impressions become more concentrated in the intended URL for each query family

**Step 2: Avoid vanity success metrics**

Do not judge success by total impressions alone.

Use:

- better average position in target query families
- clearer query-to-page matching
- first-click wins on exact-intent queries

**Step 3: Reassess expansion only after cluster stability**

Only after at least one cluster is clearly working should the site expand into a fourth major finance topic.
