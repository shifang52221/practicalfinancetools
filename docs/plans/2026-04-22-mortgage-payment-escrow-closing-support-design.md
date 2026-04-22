# Mortgage Payment Escrow and Closing Support Design

## Goal

Upgrade the escrow and closing-support guides so they stop reading like overlapping mortgage-support templates and instead behave like three distinct decision pages inside the mortgage-payment workflow.

## Why This Change

The mortgage-payment cluster now has stronger destinations and stronger input-support pages, but the escrow and closing support layer still shows the older pattern:

- older string-only review-card coverage,
- repeated checklist stacks that make different pages sound interchangeable,
- blurred page roles between escrow basics, payment-jump troubleshooting, and cash-to-close planning.

These pages matter because they often absorb "why did my payment change?" and "why is cash to close so high?" questions that sit close to conversion-critical mortgage workflows.

## Target Pages

- `/guides/mortgage-payment-escrow-account`
- `/guides/mortgage-payment-escrow-shortage`
- `/guides/mortgage-payment-prepaids-and-reserves`

## Desired Role by Page

### 1. Mortgage payment escrow account

This page should own the baseline:

- what escrow actually collects,
- why it belongs in the full monthly housing payment,
- when the reader still needs basics before troubleshooting.

### 2. Mortgage payment escrow shortage

This page should own the annual-analysis payment-jump problem:

- why the shortage happens,
- how to separate shortage repayment from the new ongoing escrow baseline,
- what line items to inspect on the servicer notice.

### 3. Mortgage payment prepaids and reserves

This page should own the cash-to-close question:

- why upfront cash can be high even when the monthly payment looks fine,
- how prepaids differ from recurring escrow,
- how closing date, reserve months, and per-diem interest affect the final number.

## Shared Structural Upgrade

All three pages should share:

- stronger `authorProfile` and `reviewProfiles` metadata,
- `ReviewedByCard` with written, editorial, and methodology review identities,
- visible `Last updated` aligned with the page constant,
- one clear "Use this guide when..." role section,
- one section telling the reader when to move to a sibling page,
- a compact References section.

## Content Constraints

- Preserve the existing tested role phrases.
- Keep the pages noindex support leaves.
- Reduce repeated generic "inputs / checklist / mistakes" sections where they do not sharpen the page's own job.
- Avoid redirect-source guide links.

## Test Strategy

Add one regression test that asserts the three pages:

- keep the stronger trust model,
- keep `ReviewedByCard`,
- keep visible freshness alignment,
- include new originality phrases proving each page owns a different escrow-or-closing question.

## Expected Outcome

After this wave, the escrow and closing-support layer should read like a clean handoff chain:

- first understand escrow,
- then diagnose the payment jump,
- then understand why closing cash is still high even if the monthly payment works.
