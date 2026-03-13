# SEO Redirect Internal Link Cleanup Design

## Goal

Stop active pages from linking to guide URLs that now permanently redirect, so internal link equity and topical signals flow directly to the intended destination pages.

## Scope

This cleanup only covers active pages that still reference redirected guide URLs.

Current confirmed cases:

- `src/pages/guides/pay-1000-extra-on-mortgage.astro` links to `/guides/calculate-mortgage-payoff-with-additional-principal-payments`
- `src/pages/guides/pay-150-extra-on-mortgage.astro` links to `/guides/extra-mortgage-payment-calculator`
- `src/pages/guides/pay-250-extra-on-mortgage.astro` links to `/guides/calculate-mortgage-payoff-with-additional-principal-payments`

Redirect targets already defined in `vercel.json`:

- `/guides/calculate-mortgage-payoff-with-additional-principal-payments` -> `/calculators/extra-payment-calculator`
- `/guides/extra-mortgage-payment-calculator` -> `/calculators/extra-payment-calculator`

## Approach

Add a regression test in `tests/seo.test.ts` that:

- loads static redirect source paths from `vercel.json`
- scans Astro pages under `src/pages`
- skips pages whose own route is itself a redirect source
- fails if an active page contains an `href` pointing to a redirect source URL

Then update the three active pages so they link directly to `/calculators/extra-payment-calculator`.

## Why This Approach

- Low risk: no URL strategy changes, only direct-link cleanup
- High confidence: behavior is deterministic and easy to test
- Reusable: the test protects future SEO consolidation work from reintroducing redirect-hop links

## Out of Scope

- removing redirected source files
- changing redirect rules in `vercel.json`
- consolidating overlapping calculator pages
- broader content or title rewrites
