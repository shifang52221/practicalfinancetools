# SEO Growth Plan (US market) — 2026-01-27

This plan is designed to improve Google indexing, rankings, and AdSense quality signals without thin content or programmatic spam.

## Inputs (what GSC is already telling us)
Early GSC queries since launch cluster into 3 intents:

1) **APR intent**
   - Example queries: `apr calculator`, `interest rate apr calculator`, `how do i find out my apr`, APR values like `28.99 apr`
2) **Credit-card payoff intent**
   - Example queries: `credit card payoff calculator`, `credit card interest calculator payoff`, `minimum payment payoff`
3) **Mortgage extra-payment intent**
   - Example queries: `extra payment calculator`, `extra principal payment calculator`, `mortgage calculator extra principal payments`

These are extremely competitive head terms. The winning strategy is to:
- keep the core calculator pages strong (purpose + UX + correctness),
- build **topic clusters** that cover long-tail questions with real value,
- link clusters together with clear workflows and consistent assumptions.

## What “Google likes” for this kind of site (practical constraints)
- Clear purpose per page (calculator vs guide vs topic hub).
- Strong E-E-A-T signals without pretending to be licensed advisers.
- Original, scenario-based guidance (not scraped or templated).
- Clean technical foundation (canonical, redirects, sitemap hygiene, noindex discipline).
- Low ad intrusion (ads do not block core function/content).

## 6-week plan (tight, measurable)

### Week 0 (now): ensure stable crawl + measurement
- Deploy the latest canonical/redirect/SEO batch changes.
- In GSC:
  - Submit sitemap: `https://practicalfinancetools.com/sitemap-index.xml`
  - Verify preferred domain is apex (no `www`)
  - Check “Page indexing” for soft-404 / duplicate canonical / excluded reasons
  - Track impressions on these 3 URLs:
    - `/calculators/apr-calculator`
    - `/calculators/credit-card-payoff-calculator`
    - `/calculators/extra-payment-calculator`

### Week 1: make the 3 core calculators “best-in-class”
For each of the 3 calculator pages above:
- Add 1 real numerical example (inputs + key outputs, short).
- Add a dedicated “Assumptions & limitations” section (specific to the calculator).
- Add 6–10 intent-matching FAQ entries (avoid generic fluff).
- Ensure exports/outputs are useful (CSV already supported on many calculators).

Quality gate: each page passes local audit and has no thin content.

### Week 2: build “supporting guide depth” (E-E-A-T + helpfulness)
Upgrade 10 indexable guides to **800–1500+ words** with unique information:
- 4 APR-related guides
- 3 credit-card payoff guides
- 3 mortgage payoff guides

Each upgraded guide must include:
- a worked example,
- a “what to verify” checklist,
- internal links to the exact calculator(s) used.

### Week 3: create 1 new calculator + cluster (avoid thin pages)
Ship **one** high-intent calculator with a clear cluster.
Recommended first: **Refinance break-even calculator** (closing costs + horizon + APR).

Publish alongside it:
- 6 supporting guides (not programmatic), each with a distinct intent.

### Week 4: internal linking + navigation tightening
- Add “related calculators/guides” blocks in each calculator page (2–4 links).
- Add cross-topic “next step” flows (APR → refinance break-even; payoff → DTI; mortgage payment → amortization → extra payments).
- Ensure no new orphan pages after changes.

### Weeks 5–6: distribution + trust reinforcement
- Add a transparent “How we make money / Ads disclosure” section (short; no affiliate claims).
- Add citations/links on guides to reputable sources (CFPB, IRS, Fannie/Freddie, major issuer disclosures).
- Build 20–50 *legitimate* mentions/links (no link farms): product directories, personal finance communities, tool roundups.

## Topic/cluster architecture (do not break this)
For each topic:
- 1 hub (`/topics/...`)
- 1–2 core calculators
- 6–12 supporting guides
- every supporting guide links to the hub + at least one calculator

## Anti-spam rules (hard)
- No mass-generated “$X extra payment” pages in sitemap until the site has strong authority.
- No near-duplicate guides; each page must add ≥ 8 unique information points.
- No keyword stuffing; optimize by matching intent and explaining assumptions.

## QA gates (must pass before every deploy)
- `npm test` passes
- `npm run check` passes (0 errors/warnings/hints)
- `npm run build` succeeds
- Local SEO audit issues = 0 (`npm run seo:audit:local`)
- Sitemap contains only indexable pages (noindex excluded)
