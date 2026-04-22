# Mortgage Payment Core Support Originality Design

## Goal

Strengthen the originality, trust model, and role clarity of the core mortgage-payment support guides so they read like distinct decision pages instead of older checklist-style support articles.

## Why This Change

The mortgage-payment cluster already has stronger routing than before, but four key destination guides still show signs of an older style:

- trust coverage uses the older review-card pattern,
- sections lean heavily on repeated checklist stacks,
- the page roles are present but not yet fully expressed as clear editorial decision jobs.

Because these pages sit close to high-intent mortgage-payment searches, upgrading them has more value than spending the same effort on smaller noindex support leaves.

## Target Pages

- `/guides/how-mortgage-payments-are-calculated`
- `/guides/what-is-piti`
- `/guides/principal-and-interest-vs-escrow`
- `/guides/mortgage-payment-affordability-checklist`

## Desired Role by Page

### 1. How mortgage payments are calculated

This page should own the baseline payment formula:

- what inputs create principal and interest,
- how term and rate change the fixed payment,
- when the reader is still too early for escrow/PITI detail.

### 2. What is PITI

This page should own the housing-payment breakdown:

- principal, interest, taxes, insurance,
- where HOA and PMI fit,
- when the missing issue is composition, not math.

### 3. Principal and interest vs escrow

This page should own statement interpretation:

- why a payment changes even when the rate is fixed,
- which part belongs to the loan itself versus escrow,
- how to trace payment changes back to the statement.

### 4. Mortgage payment affordability checklist

This page should own sustainability:

- whether the payment still works after DTI, buffers, and stress tests,
- when a payment estimate is technically correct but still too fragile,
- which affordability checks must happen before commitment.

## Shared Structural Upgrade

Each page should keep its own role, but share a stronger trust-and-routing frame:

- stronger `authorProfile` and `reviewProfiles`,
- `ReviewedByCard` with written/reviewed scope,
- visible `Last updated`,
- one clear "Use this guide when..." entry role,
- one section clarifying when the reader should move to a sibling page,
- a compact References section.

## Content Constraints

- Preserve the existing role phrases already required by current tests.
- Reduce repetitive checklist layers where they do not advance the page's specific decision job.
- Keep page-to-page routing tight so the four pages feel like a clean support system, not overlapping summaries.
- Avoid redirect-source guide links.

## Test Strategy

Add one regression test that asserts these four destination guides:

- keep their distinct role phrases,
- use the stronger author/reviewer trust bindings,
- include `ReviewedByCard`,
- keep visible `Last updated` aligned with the page constant.

## Expected Outcome

After this change, the mortgage-payment core support set should look like a coordinated cluster of distinct decision pages rather than a set of older support templates with similar section stacks.
