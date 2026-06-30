# Mortgage Payoff Support Cluster Consolidation Design

## Goal

Reduce low-value overlap in the mortgage-payoff support layer by folding seven borderline guides into stronger parent pages, while keeping the existing URL structure, trust scaffolding, and general routing framework intact.

The first-batch target pages are:

- `src/pages/guides/biweekly-mortgage-program-fees.astro`
- `src/pages/guides/extra-payment-accelerated-plan.astro`
- `src/pages/guides/extra-payment-liquidity-reserve.astro`
- `src/pages/guides/extra-payment-priority-vs-other-debts.astro`
- `src/pages/guides/extra-payment-windfall-strategy.astro`
- `src/pages/guides/mortgage-payment-affordability-checklist.astro`
- `src/pages/guides/principal-and-interest-vs-escrow.astro`

## Context

Search Console shows the site is being surfaced, but most queries still live far outside the top-20 range. The site-level problem is not only page count; it is topic dilution and a trust surface that still looks older than the strongest calculator and topic pages.

The mortgage-payoff cluster is the clearest place to improve this without harming the framework:

- the cluster already has strong calculators and hubs,
- the remaining support pages are overlapping or too thin to justify first-class status,
- the strongest pages need more room to own the main decision job.

This design keeps the site safe for a unified later push:

- no broad deletion,
- no aggressive redirect wave,
- no sudden collapse of the current URL map,
- no change to the calculator framework itself.

## Design Decisions

### 1. Use soft consolidation first

Each borderline page should be rewritten so it serves as a narrow support page for a stronger parent page rather than trying to compete as an equal destination.

That means:

- preserve the URL for now,
- preserve the existing route and canonical path,
- shrink or simplify any repeated explanation,
- point the reader toward the stronger canonical guide or topic page.

### 2. Keep the strongest parent pages as the real destinations

The parent pages should absorb the decision job:

- `extra-mortgage-payments`
- `biweekly-vs-extra-principal`
- `extra-payment-lump-sum-vs-monthly`
- `pay-off-mortgage-early-or-invest`
- `how-mortgage-payments-are-calculated`
- `what-is-piti`

These pages should become more complete and more intentional, while the weaker leaves become thinner support nodes.

### 3. Delay `noindex` until the content boundary is clear

Do not rush these pages to `noindex` unless a page becomes nearly duplicate content after consolidation.

The first pass should answer:

- can this page still justify a narrow supporting role,
- or is it now just a routing shell?

Only after that do we decide whether to keep indexing or downgrade further.

## Proposed Page Mapping

### Biweekly program fees

- Source: `biweekly-mortgage-program-fees`
- Parent: `biweekly-vs-extra-principal`
- Secondary support: `extra-mortgage-payments`

Keep only:

- fee structure basics,
- held-vs-posted payment behavior,
- whether fees erase the benefit.

### Accelerated payment plans

- Source: `extra-payment-accelerated-plan`
- Parent: `biweekly-vs-extra-principal`
- Secondary support: `extra-mortgage-payments`

Keep only:

- third-party acceleration pitch versus DIY extra payment,
- fee drag,
- the “same annual dollars” benchmark.

### Liquidity reserve

- Source: `extra-payment-liquidity-reserve`
- Parent: `extra-mortgage-payments`

Keep only:

- reserve floor logic,
- bad-month stress test,
- when extra principal should pause.

### Extra payment priority vs other debts

- Source: `extra-payment-priority-vs-other-debts`
- Parent: `pay-off-mortgage-early-or-invest`

Keep only:

- cash allocation priority,
- mortgage prepayment versus other high-value uses of cash,
- reserve and debt-order context.

### Windfall strategy

- Source: `extra-payment-windfall-strategy`
- Parent: `extra-payment-lump-sum-vs-monthly`

Keep only:

- bonus / tax refund / windfall framing,
- lump-sum versus recurring extra comparison,
- cash-flow discipline.

### Mortgage payment affordability checklist

- Source: `mortgage-payment-affordability-checklist`
- Parent: `how-mortgage-payments-are-calculated`

Keep only:

- true monthly affordability checks,
- taxes, insurance, HOA, PMI, buffer,
- payment math versus real household capacity.

### Principal and interest vs escrow

- Source: `principal-and-interest-vs-escrow`
- Parent: `what-is-piti`

Keep only:

- payment breakdown,
- why payment can change without a rate change,
- escrow-shortage interpretation.

## Content Boundary Rules

Each source page should:

- answer one narrow question,
- link back to the stronger parent page,
- avoid repeating the same long-form explanation in multiple places,
- avoid cross-linking into other borderline siblings,
- stay visibly subordinate to the parent page.

The parent pages should:

- carry the full explanation,
- own the main internal links from the home page and topic hubs,
- be the first choice for search and user routing.

## Internal Linking Rules

### Allowed focus for the source pages

- one strong primary CTA to the parent page,
- one calculator CTA when helpful,
- one or two contextual links only if they add real clarity.

### What to remove

- mutual sibling cross-links,
- repeated CTA rows,
- repeated “next steps” blocks that all point to the same thing,
- generic internal-link stacks that compete with the parent page.

## Implementation Strategy

### Phase 1

Rewrite the seven borderline pages so they are concise support pages with clear parent handoffs.

### Phase 2

Update the strongest parent pages so they absorb the content that was removed from the weaker leaves.

### Phase 3

Review whether any source page has become too thin to remain indexable.

### Phase 4

Run SEO and build verification before any push.

## Verification Strategy

Add regression coverage that checks:

- the seven source pages still exist and still route to their intended canonical paths,
- the pages no longer behave like equal siblings,
- the parent pages contain the newly absorbed topic sections,
- the site still passes SEO and build checks.

## Expected Outcome

After this pass:

- the mortgage-payoff cluster should read like a real hierarchy instead of a set of parallel mini-pages,
- the strongest guide pages should carry more of the site’s topical authority,
- the weaker support pages should stop diluting the main decision paths,
- the site will be better prepared for a later unified push without a sudden structure shock.
