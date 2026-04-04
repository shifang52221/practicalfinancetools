# Author And Review Trust System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the generic page-review pattern on the most important pages with an honest role-based trust system that strengthens accountability, visible review coverage, and structured-data support for AdSense-readiness and Google quality review.

**Architecture:** Add a small trust-profile registry, upgrade the existing review-summary component to support written-by and scoped review roles, extend the layout layer to accept opt-in author/review metadata, then migrate only the trust pages and highest-value workflow pages in this batch. Protect the rollout with source-based SEO regressions so the stronger trust model cannot silently drift back to generic placeholders.

**Tech Stack:** Astro, TypeScript, Node.js built-in test runner

---

### Task 1: Add failing regression coverage for the trust-system rollout

**Files:**
- Modify: `tests/seo.test.ts`

**Step 1: Write the failing trust-registry and component assertions**

Add a regression block that requires:

- `src/config/trust.ts` to exist
- the trust registry to define these labels:
  - `Practical Finance Tools Site Owner`
  - `Practical Finance Tools Methodology Review`
  - `Practical Finance Tools Editorial Review`
- `src/components/ReviewedByCard.astro` to include support for:
  - `Written by`
  - `Review scope`

**Step 2: Write the failing trust-page coverage assertions**

Add a second regression block for:

- `src/pages/about.astro`
- `src/pages/editorial-policy.astro`
- `src/pages/methodology.astro`
- `src/pages/contact.astro`

Require each page to include:

- the shared trust-role section or component
- the expected role labels from the registry

**Step 3: Write the failing core-page adoption assertions**

Add a third regression block for:

- `src/pages/index.astro`
- `src/pages/topics/apr.astro`
- `src/pages/topics/credit-cards.astro`
- `src/pages/topics/mortgage-payoff.astro`
- `src/pages/topics/refinance.astro`
- `src/pages/topics/debt-to-income.astro`
- `src/pages/topics/rent-vs-buy.astro`
- `src/pages/calculators/apr-calculator.astro`
- `src/pages/calculators/credit-card-payoff-calculator.astro`
- `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- `src/pages/calculators/mortgage-payment-calculator.astro`
- `src/pages/calculators/extra-payment-calculator.astro`
- `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- `src/pages/calculators/additional-principal-payment-calculator.astro`

Require these pages to reference the new trust registry or the upgraded card props instead of only the legacy generic reviewer string.

**Step 4: Verify RED**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- FAIL
- failures should identify the missing trust registry, missing component capability, and missing page adoption

### Task 2: Add the trust-profile registry and shared role presentation

**Files:**
- Create: `src/config/trust.ts`
- Create: `src/components/TrustRoles.astro`

**Step 1: Add the trust registry**

Create a small registry that exports the three public responsibility roles:

- site owner
- methodology review
- editorial review

Each role should define:

- display name
- public title
- short scope line
- short description
- anchor or profile path
- schema entity type preference

Keep the wording honest and organization-backed. Do not imply licenses or named professional credentials.

**Step 2: Add a reusable trust-role display component**

Create a shared component that renders the public responsibility model for trust pages.

It should:

- list the roles clearly
- keep the copy compact
- link or anchor to the relevant trust sections where helpful

**Step 3: Run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- still FAIL because `ReviewedByCard`, layouts, and pages are not migrated yet

### Task 3: Upgrade the review-summary component without breaking legacy pages

**Files:**
- Modify: `src/components/ReviewedByCard.astro`

**Step 1: Preserve backward compatibility**

Keep existing prop usage working for untouched pages.

**Step 2: Add the new trust fields**

Add support for:

- optional writer identity
- primary reviewer identity
- optional secondary reviewer identity
- review scope
- responsibility or policy links

Render the new fields only when provided so existing pages do not break.

**Step 3: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- the component-capability block turns green
- trust-page and core-page adoption blocks still fail

### Task 4: Extend layouts to support opt-in author and review metadata

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/layouts/CalculatorLayout.astro`

**Step 1: Add opt-in props for author/review identities**

Add layout props that allow upgraded pages to pass:

- author identity
- reviewed-by identity or identities

Leave the current default organization behavior intact for pages not in this batch.

**Step 2: Add schema support**

Update the generated JSON-LD so upgraded pages can expose:

- `author`
- `reviewedBy`
- existing `publisher`

Do this for:

- the page-level schema in `BaseLayout`
- the `WebPage` and `WebApplication` schema in `CalculatorLayout`

**Step 3: Keep schema serialization simple**

Use a helper shape that serializes cleanly in Astro JSON-LD without introducing unnecessary abstraction.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- layout-support assertions turn green
- page-adoption assertions still fail

### Task 5: Strengthen the public trust pages

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/editorial-policy.astro`
- Modify: `src/pages/methodology.astro`
- Modify: `src/pages/contact.astro`

**Step 1: Add the shared responsibility model**

Use the new trust-role component so each page clearly explains who owns:

- site/product maintenance
- methodology review
- editorial review

**Step 2: Align each page with its trust role**

Keep each page distinct:

- `about` = ownership and purpose
- `editorial-policy` = editorial review boundaries
- `methodology` = formula and assumptions review
- `contact` = corrections, reporting path, and response handling

**Step 3: Refresh timestamps**

Use the current batch date on the pages updated in this batch.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- trust-page coverage assertions pass
- core-page adoption assertions still fail

### Task 6: Migrate the highest-value workflow pages to the stronger trust model

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/topics/apr.astro`
- Modify: `src/pages/topics/credit-cards.astro`
- Modify: `src/pages/topics/mortgage-payoff.astro`
- Modify: `src/pages/topics/refinance.astro`
- Modify: `src/pages/topics/debt-to-income.astro`
- Modify: `src/pages/topics/rent-vs-buy.astro`
- Modify: `src/pages/calculators/apr-calculator.astro`
- Modify: `src/pages/calculators/credit-card-payoff-calculator.astro`
- Modify: `src/pages/calculators/minimum-payment-payoff-calculator.astro`
- Modify: `src/pages/calculators/mortgage-payment-calculator.astro`
- Modify: `src/pages/calculators/extra-payment-calculator.astro`
- Modify: `src/pages/calculators/biweekly-mortgage-payment-calculator.astro`
- Modify: `src/pages/calculators/additional-principal-payment-calculator.astro`

**Step 1: Switch these pages to the trust registry**

For each selected page:

- keep the page role unchanged
- replace the generic review-only wording with the stronger trust model
- provide a clear writer/reviewer split where it helps
- add review scope text that matches the page purpose

**Step 2: Attach layout metadata on the same pages**

Pass the new author/review props into the layout layer on the upgraded pages.

**Step 3: Keep the rollout narrow**

Do not migrate every existing reviewed page in this batch.

This batch should focus on the highest-leverage pages only.

**Step 4: Re-run the targeted test**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected:

- PASS

### Task 7: Verify the full batch locally

**Files:**
- Verify only

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

**Step 3: Run the build**

Run:

```bash
npm run build
```

Expected:

- PASS

**Step 4: Inspect the changed surface**

Run:

```bash
git diff -- src/config/trust.ts src/components/TrustRoles.astro src/components/ReviewedByCard.astro src/layouts/BaseLayout.astro src/layouts/CalculatorLayout.astro src/pages/about.astro src/pages/editorial-policy.astro src/pages/methodology.astro src/pages/contact.astro src/pages/index.astro src/pages/topics/apr.astro src/pages/topics/credit-cards.astro src/pages/topics/mortgage-payoff.astro src/pages/topics/refinance.astro src/pages/topics/debt-to-income.astro src/pages/topics/rent-vs-buy.astro src/pages/calculators/apr-calculator.astro src/pages/calculators/credit-card-payoff-calculator.astro src/pages/calculators/minimum-payment-payoff-calculator.astro src/pages/calculators/mortgage-payment-calculator.astro src/pages/calculators/extra-payment-calculator.astro src/pages/calculators/biweekly-mortgage-payment-calculator.astro src/pages/calculators/additional-principal-payment-calculator.astro tests/seo.test.ts
```

Expected:

- only the intended trust-system files and selected pages appear
