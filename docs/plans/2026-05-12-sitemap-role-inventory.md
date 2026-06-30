# Practical Finance Tools Sitemap Role Inventory

**Date:** 2026-05-12

## Purpose

This document is the control sheet for the current ranking-recovery phase. Every live sitemap URL must have one role, one cluster, one primary relationship, and one action status so later trust work does not drift into low-impact pages.

## Role Definitions

- `Core Asset`: already receives meaningful impressions or shows strong ranking potential
- `Cluster Support`: exists mainly to strengthen a Core Asset page or support a clear decision path
- `Authority Infrastructure`: helps establish YMYL trust, publisher clarity, or review readiness
- `Merge or De-prioritize`: currently weaker, more overlapping, or less clearly useful than stronger pages in the same theme

## Action Status Definitions

- `strengthen now`: first-wave execution priority
- `support only`: keep and align around a stronger page, but do not make it the center of this wave
- `observe`: retain and monitor, but do not invest in the first wave
- `review for overlap`: keep live for now, but reassess later for consolidation or downgrade

## Summary

- Sitemap URL count reviewed: `70`
- Core Asset URLs: `11`
- Cluster Support URLs: `50`
- Authority Infrastructure URLs: `5`
- Merge or De-prioritize URLs: `4`

## Out-of-Sitemap URLs With Impressions

These URLs appeared in the 2026-05-12 Search Console export but are not in the current sitemap. They should be reviewed separately after the live sitemap inventory is complete.

| URL | Impressions | Avg. position | Note |
| --- | ---: | ---: | --- |
| `/guides/rent-vs-buy-time-horizon` | 13 | 7.54 | Strong long-tail signal despite being outside the current sitemap |
| `/guides/mortgage-extra-principal-calculator` | 5 | 83.2 | Low-priority visibility, but still worth understanding later |

## Inventory

| URL | Source file | Role | Cluster | Primary page relationship | Action | Evidence or note |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | `src/pages/index.astro` | Cluster Support | Sitewide entry | Supports all major calculator and topic entry paths | support only | 68 impressions; useful as a trust and navigation distributor, not a ranking center |
| `/about` | `src/pages/about.astro` | Authority Infrastructure | Publisher trust | Supports the whole site | support only | 5 impressions; important for trust, not a primary search-growth page |
| `/calculators` | `src/pages/calculators/index.astro` | Cluster Support | Sitewide entry | Supports major calculator pages | support only | Directory page with some visibility; should remain a structured discovery page |
| `/calculators/additional-principal-payment-calculator` | `src/pages/calculators/additional-principal-payment-calculator.astro` | Core Asset | Extra payment | Self; secondary to broader extra-payment cluster | observe | 465 impressions; real testing exists, but this cluster is not wave-1 priority |
| `/calculators/amortization-schedule-calculator` | `src/pages/calculators/amortization-schedule-calculator.astro` | Cluster Support | Mortgage payment | Supports mortgage payment and extra-payment understanding | observe | 17 impressions; useful support page, but not yet a first-wave target |
| `/calculators/apr-calculator` | `src/pages/calculators/apr-calculator.astro` | Core Asset | APR | Self; primary page for APR calculator intent | strengthen now | 725 impressions; one of the main tested assets |
| `/calculators/biweekly-mortgage-payment-calculator` | `src/pages/calculators/biweekly-mortgage-payment-calculator.astro` | Core Asset | Biweekly mortgage | Self; primary page for the cluster | strengthen now | 437 impressions; strongest ranking proximity in current data |
| `/calculators/credit-card-payoff-calculator` | `src/pages/calculators/credit-card-payoff-calculator.astro` | Core Asset | Minimum payment and credit-card payoff | Shares cluster center with minimum-payment page | strengthen now | 482 impressions; commercially useful intent, needs stronger decision support |
| `/calculators/debt-avalanche-calculator` | `src/pages/calculators/debt-avalanche-calculator.astro` | Cluster Support | Debt payoff | Supports debt-snowball and payoff-strategy comparison | support only | No current impression momentum in this export; still a valid support concept |
| `/calculators/debt-snowball-calculator` | `src/pages/calculators/debt-snowball-calculator.astro` | Core Asset | Debt payoff | Self; deferred cluster center | observe | 285 impressions; tested, but not a first-wave cluster |
| `/calculators/debt-to-income-calculator` | `src/pages/calculators/debt-to-income-calculator.astro` | Cluster Support | DTI | Supports DTI topic and guides | observe | DTI cluster is not a current priority despite some supporting visibility elsewhere |
| `/calculators/extra-payment-calculator` | `src/pages/calculators/extra-payment-calculator.astro` | Core Asset | Extra payment | Self; deferred cluster center | observe | 1,041 impressions; strong signal, but this cluster stays behind the first three priorities |
| `/calculators/minimum-payment-payoff-calculator` | `src/pages/calculators/minimum-payment-payoff-calculator.astro` | Core Asset | Minimum payment and credit-card payoff | Self; primary page for minimum-payment intent | strengthen now | 1,419 impressions; highest-visibility page on the site |
| `/calculators/mortgage-payment-calculator` | `src/pages/calculators/mortgage-payment-calculator.astro` | Cluster Support | Mortgage payment | Supports mortgage-payment guide family | support only | Important long-term asset, but not showing first-wave momentum now |
| `/calculators/rent-vs-buy-calculator` | `src/pages/calculators/rent-vs-buy-calculator.astro` | Cluster Support | Rent vs buy | Supports topic and guide family | observe | Useful cluster anchor, but current site focus should stay narrower |
| `/editorial-policy` | `src/pages/editorial-policy.astro` | Authority Infrastructure | Publisher trust | Supports the whole site | support only | Key for YMYL review clarity and editorial credibility |
| `/guides` | `src/pages/guides/index.astro` | Cluster Support | Sitewide entry | Supports topic and calculator discovery through guide paths | support only | 39 impressions; useful navigation page, but not a primary ranking target |
| `/guides/amortization-with-extra-payments` | `src/pages/guides/amortization-with-extra-payments.astro` | Cluster Support | Extra payment | Supports extra-payment calculators | support only | Supports real user questions within the extra-payment family |
| `/guides/apr-by-loan-type` | `src/pages/guides/apr-by-loan-type.astro` | Cluster Support | APR | Supports APR topic and calculator intent | review for overlap | Helpful concept, but may overlap with other APR comparison pages |
| `/guides/apr-comparison-checklist` | `src/pages/guides/apr-comparison-checklist.astro` | Cluster Support | APR | Supports APR calculator and topic hub | support only | Good decision-support fit if kept pointed at primary APR pages |
| `/guides/apr-for-balance-transfers` | `src/pages/guides/apr-for-balance-transfers.astro` | Cluster Support | APR | Supports APR calculator and topic hub | support only | Cluster-relevant support page for wave-1 APR work |
| `/guides/apr-vs-apy-loans` | `src/pages/guides/apr-vs-apy-loans.astro` | Merge or De-prioritize | APR | Weakly supports APR cluster | review for overlap | Distinct idea, but weaker alignment with the main APR calculator path |
| `/guides/apr-vs-interest-rate` | `src/pages/guides/apr-vs-interest-rate.astro` | Cluster Support | APR | Direct support for APR calculator and topic hub | strengthen now | 8 impressions at 42.12 average position; useful early signal |
| `/guides/apr-with-origination-fee` | `src/pages/guides/apr-with-origination-fee.astro` | Cluster Support | APR | Supports APR calculator and topic hub | support only | Strong fit for interpretation depth around APR |
| `/guides/biweekly-mortgage-program-fees` | `src/pages/guides/biweekly-mortgage-program-fees.astro` | Cluster Support | Biweekly mortgage | Supports biweekly calculator | support only | Good support path for user caution and real-world edge cases |
| `/guides/biweekly-vs-extra-principal` | `src/pages/guides/biweekly-vs-extra-principal.astro` | Cluster Support | Biweekly mortgage | Direct support for biweekly calculator | strengthen now | Key comparative support page for the strongest active cluster |
| `/guides/credit-card-payoff-strategy` | `src/pages/guides/credit-card-payoff-strategy.astro` | Cluster Support | Minimum payment and credit-card payoff | Supports minimum-payment and payoff calculators | strengthen now | 58 impressions; strong cluster support with clear decision value |
| `/guides/debt-snowball-vs-avalanche` | `src/pages/guides/debt-snowball-vs-avalanche.astro` | Cluster Support | Debt payoff | Supports debt-snowball and debt-avalanche calculators | support only | Good comparison support for a deferred but still viable cluster |
| `/guides/discount-points-vs-lender-credits` | `src/pages/guides/discount-points-vs-lender-credits.astro` | Merge or De-prioritize | Refinance | Weak support fit until refinance becomes a focus cluster | review for overlap | Useful topic, but current cluster priority is too low |
| `/guides/dti-calculation-step-by-step` | `src/pages/guides/dti-calculation-step-by-step.astro` | Cluster Support | DTI | Supports DTI calculator and topic page | support only | Solid explanation page, but outside the first-wave focus |
| `/guides/dti-housing-payment-piti-includes` | `src/pages/guides/dti-housing-payment-piti-includes.astro` | Cluster Support | DTI | Supports DTI and mortgage-payment guidance | support only | Valid support content, but not currently central to ranking recovery |
| `/guides/extra-mortgage-payments` | `src/pages/guides/extra-mortgage-payments.astro` | Cluster Support | Extra payment | Supports extra-payment calculator | support only | 296 impressions; useful support page in a strong deferred cluster |
| `/guides/extra-payment-accelerated-plan` | `src/pages/guides/extra-payment-accelerated-plan.astro` | Merge or De-prioritize | Extra payment | Weak support fit relative to stronger extra-payment pages | review for overlap | Likely overlaps with broader extra-payment strategy pages |
| `/guides/extra-payment-liquidity-reserve` | `src/pages/guides/extra-payment-liquidity-reserve.astro` | Merge or De-prioritize | Extra payment | Weak support fit relative to stronger extra-payment pages | review for overlap | Specific but narrow; may not deserve equal sitemap weight later |
| `/guides/extra-payment-lump-sum-vs-monthly` | `src/pages/guides/extra-payment-lump-sum-vs-monthly.astro` | Cluster Support | Extra payment | Supports extra-payment calculator | support only | Strong comparison intent if kept subordinate to the main calculator |
| `/guides/extra-payment-priority-vs-other-debts` | `src/pages/guides/extra-payment-priority-vs-other-debts.astro` | Cluster Support | Extra payment | Supports extra-payment strategy interpretation | review for overlap | Valuable concept, but may need later consolidation with other strategy pages |
| `/guides/extra-payment-target-payoff-date` | `src/pages/guides/extra-payment-target-payoff-date.astro` | Cluster Support | Extra payment | Supports extra-payment calculator | support only | Good practical companion page for a tested calculator cluster |
| `/guides/extra-payment-vs-refinance` | `src/pages/guides/extra-payment-vs-refinance.astro` | Cluster Support | Extra payment | Supports extra-payment and refinance decision path | support only | Useful bridge page between two related clusters |
| `/guides/extra-payment-windfall-strategy` | `src/pages/guides/extra-payment-windfall-strategy.astro` | Merge or De-prioritize | Extra payment | Weak support fit relative to broader extra-payment pages | review for overlap | Narrow variation that may later be absorbed by stronger support content |
| `/guides/how-credit-card-interest-is-calculated` | `src/pages/guides/how-credit-card-interest-is-calculated.astro` | Core Asset | Minimum payment and credit-card payoff | Self; primary educational asset for the cluster | strengthen now | 605 impressions; strongest guide asset in the current data |
| `/guides/how-mortgage-payments-are-calculated` | `src/pages/guides/how-mortgage-payments-are-calculated.astro` | Cluster Support | Mortgage payment | Supports mortgage-payment calculator and related guides | support only | Good explainer page for a deferred cluster |
| `/guides/how-to-find-your-apr` | `src/pages/guides/how-to-find-your-apr.astro` | Cluster Support | APR | Supports APR calculator and topic hub | strengthen now | Strong fit for a focused APR cluster path |
| `/guides/how-to-improve-dti` | `src/pages/guides/how-to-improve-dti.astro` | Cluster Support | DTI | Supports DTI calculator and topic page | support only | Useful but outside the first-wave effort |
| `/guides/how-to-use-apr-for-credit-cards` | `src/pages/guides/how-to-use-apr-for-credit-cards.astro` | Cluster Support | APR | Supports APR cluster in card-specific scenarios | support only | Can reinforce APR nuance if clearly tied to APR primary pages |
| `/guides/mortgage-payment-affordability-checklist` | `src/pages/guides/mortgage-payment-affordability-checklist.astro` | Cluster Support | Mortgage payment | Supports mortgage-payment calculator | support only | Valid support page for a non-priority cluster |
| `/guides/mortgage-recast-vs-extra-payments` | `src/pages/guides/mortgage-recast-vs-extra-payments.astro` | Cluster Support | Extra payment | Supports extra-payment calculator | support only | Strong support concept within a deferred cluster |
| `/guides/one-extra-mortgage-payment-per-year` | `src/pages/guides/one-extra-mortgage-payment-per-year.astro` | Cluster Support | Biweekly mortgage | Supports biweekly calculator | support only | Relevant support page because users compare payment-frequency shortcuts |
| `/guides/pay-off-mortgage-early-or-invest` | `src/pages/guides/pay-off-mortgage-early-or-invest.astro` | Cluster Support | Extra payment | Supports extra-payment strategy pages | review for overlap | Important topic, but may need later consolidation with stronger payoff pages |
| `/guides/pmi-removal-vs-extra-principal` | `src/pages/guides/pmi-removal-vs-extra-principal.astro` | Cluster Support | Extra payment | Supports extra-payment and mortgage-payment decisions | support only | Specific but useful support content |
| `/guides/principal-and-interest-vs-escrow` | `src/pages/guides/principal-and-interest-vs-escrow.astro` | Cluster Support | Mortgage payment | Supports mortgage-payment interpretation | support only | Supports user understanding, but not part of the first-wave push |
| `/guides/principal-only-extra-payments` | `src/pages/guides/principal-only-extra-payments.astro` | Cluster Support | Extra payment | Supports extra-payment calculator | support only | Good operational support page |
| `/guides/refinance-break-even` | `src/pages/guides/refinance-break-even.astro` | Core Asset | Refinance | Self; current refinance cluster center | observe | 28 impressions; worth preserving, but refinance is deferred |
| `/guides/refinance-checklist` | `src/pages/guides/refinance-checklist.astro` | Cluster Support | Refinance | Supports refinance-break-even and refinance topic | support only | Good support concept for a deferred cluster |
| `/guides/refinance-closing-costs` | `src/pages/guides/refinance-closing-costs.astro` | Cluster Support | Refinance | Supports refinance-break-even and refinance topic | support only | Useful support page, but not a current ranking-recovery target |
| `/guides/rent-vs-buy-break-even` | `src/pages/guides/rent-vs-buy-break-even.astro` | Cluster Support | Rent vs buy | Supports rent-vs-buy calculator and topic | support only | Relevant, but current focus should remain narrower |
| `/guides/rent-vs-buy-checklist` | `src/pages/guides/rent-vs-buy-checklist.astro` | Cluster Support | Rent vs buy | Supports rent-vs-buy calculator and topic | support only | Useful support path for a deferred cluster |
| `/guides/rent-vs-buy-costs-to-include` | `src/pages/guides/rent-vs-buy-costs-to-include.astro` | Cluster Support | Rent vs buy | Supports rent-vs-buy calculator and topic | support only | Good support page once the cluster becomes active again |
| `/guides/what-counts-in-dti` | `src/pages/guides/what-counts-in-dti.astro` | Cluster Support | DTI | Supports DTI calculator and topic | support only | Cluster-valid, but not in the current push |
| `/guides/what-is-piti` | `src/pages/guides/what-is-piti.astro` | Cluster Support | Mortgage payment | Supports mortgage-payment and DTI support content | support only | 2 impressions; small signal, but still a useful explanatory page |
| `/guides/why-minimum-payments-take-so-long` | `src/pages/guides/why-minimum-payments-take-so-long.astro` | Cluster Support | Minimum payment and credit-card payoff | Supports minimum-payment and payoff calculators | strengthen now | Directly supports the strongest performing calculator cluster |
| `/methodology` | `src/pages/methodology.astro` | Authority Infrastructure | Publisher trust | Supports the whole site | support only | 9 impressions; important for trust and review readiness |
| `/privacy-policy` | `src/pages/privacy-policy.astro` | Authority Infrastructure | Publisher trust | Supports the whole site | support only | Required trust infrastructure for finance and AdSense readiness |
| `/terms` | `src/pages/terms.astro` | Authority Infrastructure | Publisher trust | Supports the whole site | support only | Required trust infrastructure for finance and AdSense readiness |
| `/topics` | `src/pages/topics/index.astro` | Cluster Support | Sitewide entry | Supports topic discovery and cluster pathing | support only | 14 impressions; useful, but not a ranking center |
| `/topics/apr` | `src/pages/topics/apr.astro` | Core Asset | APR | Self; primary topic hub for the APR cluster | strengthen now | 15 impressions at 31.53 average position; best current topic-hub opportunity |
| `/topics/credit-cards` | `src/pages/topics/credit-cards.astro` | Cluster Support | Minimum payment and credit-card payoff | Supports card-related calculators and guides | observe | 3 impressions; useful, but APR topic is the stronger hub candidate right now |
| `/topics/debt-to-income` | `src/pages/topics/debt-to-income.astro` | Cluster Support | DTI | Supports DTI calculator and guides | observe | 8 impressions; cluster is currently deferred |
| `/topics/mortgage-payoff` | `src/pages/topics/mortgage-payoff.astro` | Core Asset | Extra payment | Self; current topic hub for mortgage payoff and extra-payment intent | observe | 70 impressions; relevant, but extra-payment remains behind the first-wave clusters |
| `/topics/refinance` | `src/pages/topics/refinance.astro` | Cluster Support | Refinance | Supports refinance guide cluster | observe | Topic exists, but lacks current evidence strong enough for first-wave work |
| `/topics/rent-vs-buy` | `src/pages/topics/rent-vs-buy.astro` | Cluster Support | Rent vs buy | Supports rent-vs-buy calculator and guides | observe | Cluster has isolated long-tail promise, but not enough breadth for first-wave focus |

## Immediate First-Wave Execution Set

These are the inventory items marked `strengthen now` and should receive the next trust and originality upgrades.

- `/calculators/apr-calculator`
- `/calculators/biweekly-mortgage-payment-calculator`
- `/calculators/credit-card-payoff-calculator`
- `/calculators/minimum-payment-payoff-calculator`
- `/guides/apr-vs-interest-rate`
- `/guides/biweekly-vs-extra-principal`
- `/guides/credit-card-payoff-strategy`
- `/guides/how-credit-card-interest-is-calculated`
- `/guides/how-to-find-your-apr`
- `/guides/why-minimum-payments-take-so-long`
- `/topics/apr`

## Notes for Later Review

- The extra-payment cluster has strong visibility but should remain behind the first three focus clusters for now.
- The refinance cluster still has enough signal to preserve, but not enough current momentum to take first-wave effort.
- The DTI and rent-vs-buy clusters should be kept stable and revisited only after the first three focus clusters are upgraded.
- Several narrow extra-payment and APR support pages may later be merged, downgraded, or removed from the sitemap if stronger parent pages absorb their user value.
