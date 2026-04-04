# DTI Consolidation Design

## Goal

Strengthen the three active DTI destination guides so they can safely absorb the remaining DTI support intents, then align the ten already-redirected source pages with the same redirect, sitemap, and source-page `noindex, follow` pattern used in the refinance, APR, mortgage-payment, credit-card, and rent-vs-buy cleanup batches.

## Context

The DTI cluster still has ten static guide routes that already redirect in [`vercel.json`](/f:/www/www.practicalfinancetools.com/vercel.json) but have not yet been fully aligned at the page level:

- `/guides/front-end-vs-back-end-dti` -> `/guides/dti-calculation-step-by-step`
- `/guides/dti-thresholds-compensating-factors` -> `/guides/what-counts-in-dti`
- `/guides/dti-income-documentation-checklist` -> `/guides/what-counts-in-dti`
- `/guides/dti-variable-income-averaging` -> `/guides/what-counts-in-dti`
- `/guides/dti-self-employed-income` -> `/guides/what-counts-in-dti`
- `/guides/dti-co-borrower-impacts` -> `/guides/what-counts-in-dti`
- `/guides/dti-and-student-loans` -> `/guides/what-counts-in-dti`
- `/guides/dti-installment-loans-and-leases` -> `/guides/what-counts-in-dti`
- `/guides/dti-credit-card-minimums` -> `/guides/what-counts-in-dti`
- `/guides/dti-when-to-recalculate` -> `/guides/how-to-improve-dti`

These routes are already excluded from the sitemap in [`astro.config.mjs`](/f:/www/www.practicalfinancetools.com/astro.config.mjs), so the remaining structural gap is the same one we solved in the earlier batches:

- redirect exists
- sitemap exclusion exists
- source-page `noindex, follow` is still missing

At the same time, the three live destination pages are not yet fully reinforced as consolidation targets:

- [`dti-calculation-step-by-step.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-calculation-step-by-step.astro)
- [`what-counts-in-dti.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/what-counts-in-dti.astro)
- [`how-to-improve-dti.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/how-to-improve-dti.astro)

All three already have usable content and appropriate route roles, but they are weaker than the destination pages we have already consolidated:

- none of the three currently include `ReviewedByCard`
- all three still use `lastUpdated = "2026-02-17"`
- none of the three clearly state which absorbed DTI intents they are now meant to own

So the DTI cluster is ready for the same destination-first cleanup pattern we have already used successfully elsewhere.

## Options

### Option 1: Add `noindex` to the ten source pages only

Pros:

- smallest edit surface
- quickest structural cleanup

Cons:

- does not make the destination pages stronger
- leaves Google with weaker evidence about why the destination pages should rank for the absorbed intents
- leaves the cluster less defensible in a future quality review

### Option 2: Strengthen the destination pages first, then align the ten source pages

Pros:

- follows our standing rule: destination first, source cleanup second
- improves user routing, trust signals, and indexing hygiene together
- keeps the batch narrowly scoped and easy to verify
- matches the pattern already used in the successful rent-vs-buy and mortgage-related batches

Cons:

- slightly more work than a noindex-only pass

### Option 3: Expand into a broader DTI cluster rewrite

Pros:

- could make the cluster feel more comprehensive in a single round

Cons:

- too much churn for one batch
- risks breaking our "do not disturb the framework or route structure" rule
- makes verification and rollback reasoning harder

## Recommendation

Choose **Option 2**.

This is the safest high-leverage move because it fixes the real problem, not just one symptom. The DTI cleanup should make the live guides more obviously useful, trustworthy, and role-specific before we suppress source-page indexing signals. That keeps the cluster consistent for both users and Google without broad rewrites.

## Design

### Scope

#### Destination pages to strengthen

- [`dti-calculation-step-by-step.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-calculation-step-by-step.astro)
- [`what-counts-in-dti.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/what-counts-in-dti.astro)
- [`how-to-improve-dti.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/how-to-improve-dti.astro)

#### Redirect-source pages to align

- [`front-end-vs-back-end-dti.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/front-end-vs-back-end-dti.astro)
- [`dti-thresholds-compensating-factors.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-thresholds-compensating-factors.astro)
- [`dti-income-documentation-checklist.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-income-documentation-checklist.astro)
- [`dti-variable-income-averaging.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-variable-income-averaging.astro)
- [`dti-self-employed-income.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-self-employed-income.astro)
- [`dti-co-borrower-impacts.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-co-borrower-impacts.astro)
- [`dti-and-student-loans.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-and-student-loans.astro)
- [`dti-installment-loans-and-leases.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-installment-loans-and-leases.astro)
- [`dti-credit-card-minimums.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-credit-card-minimums.astro)
- [`dti-when-to-recalculate.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/dti-when-to-recalculate.astro)

### Destination-page reinforcement

Each of the three live destination pages should receive a focused trust and role upgrade, not a redesign.

Required additions on every destination page:

- add `ReviewedByCard`
- refresh `lastUpdated` to `2026-04-04`
- keep the visible `Last updated:` line aligned with the constant
- preserve existing references and add a `References` section only where one is missing

#### `dti-calculation-step-by-step`

This page should become the explicit home for:

- front-end vs back-end DTI questions
- formula and workflow questions
- users who need to understand how the housing payment enters the ratio

It should include a concise role section that makes those absorbed intents explicit and route users onward to the DTI calculator and the broader DTI content set.

#### `what-counts-in-dti`

This page should become the explicit home for:

- which debts count in DTI
- how minimum payments are treated
- how student loans, installment debt, co-borrowers, self-employed income, and documentation fit into underwriting inputs
- how threshold and compensating-factor conversations relate to included debts and income treatment

Because this is the largest absorption target, it should carry the clearest consolidated-intent language in the batch.

#### `how-to-improve-dti`

This page should become the explicit home for:

- ways to reduce DTI
- when it makes sense to rerun the ratio
- how statement cycles and updated documentation affect the timing of a real improvement

Its role section should make it obvious that this is the action-and-timing page, not the page for raw formula questions.

### Source-page behavior

Every redirect-source page in this batch should:

- keep the current route
- keep the current `canonicalPath`
- keep the existing redirect relationship untouched
- keep the existing body content
- add `robots="noindex, follow"` at the `BaseLayout` level

This batch is about signal alignment, not rewriting the source pages.

### Link-hygiene boundary

The existing global regression already checks that active pages do not link to redirected guide URLs.

Current audit result:

- remaining links to these DTI redirect-source URLs are inside redirect-source pages
- the known examples are pages like [`mortgage-payment-dti-housing-payment.astro`](/f:/www/www.practicalfinancetools.com/src/pages/guides/mortgage-payment-dti-housing-payment.astro), which are themselves already redirect-source pages and already carry `robots="noindex, follow"`

Because those references sit inside the redirect-source layer, they should not be rewritten in this batch unless the existing global redirected-link regression fails. This keeps scope tight and avoids unnecessary churn.

### Test strategy

Add dedicated DTI regression coverage in [`seo.test.ts`](/f:/www/www.practicalfinancetools.com/tests/seo.test.ts) that locks in:

1. the explicit redirect map for all ten DTI source pages
2. their sitemap exclusion in `astro.config.mjs`
3. their page-level `robots="noindex, follow"`
4. destination-page trust coverage on the three live DTI pages:
   - `ReviewedByCard`
   - matching `lastUpdated` and visible `Last updated:`
   - explicit absorbed-intent / role language
   - `References` where appropriate

The existing global redirected-link test should remain unchanged and continue acting as the cross-cluster guardrail.

## Out Of Scope

This batch should not:

- change any redirects
- change any route structure
- redesign the DTI topic hub
- broaden into the extra-payment cluster
- pull in the PMI one-off page
- rewrite the bodies of the redirect-source pages beyond the page-level `noindex, follow` signal
- commit or push anything yet
