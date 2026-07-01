import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

function collectAstroFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...collectAstroFiles(full));
    } else if (st.isFile() && entry.endsWith(".astro")) {
      out.push(full);
    }
  }
  return out;
}

function expectedPathFromFile(pagesRoot: string, filePath: string): string {
  const rel = relative(pagesRoot, filePath).split(sep).join("/");
  const relNoExt = rel.slice(0, -".astro".length);
  if (relNoExt === "index") return "/";
  if (relNoExt.endsWith("/index")) return `/${relNoExt.slice(0, -"\/index".length)}`;
  return `/${relNoExt}`;
}

function getStaticGuideRedirectSources(): Set<string> {
  const vercelConfig = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8")) as {
    redirects?: Array<{ source?: string }>;
  };

  return new Set(
    (vercelConfig.redirects ?? [])
      .map((redirect) => redirect.source)
      .filter(
        (source): source is string =>
          typeof source === "string" &&
          source.startsWith("/guides/") &&
          !source.includes(":") &&
          !source.includes("(.*)") &&
          !source.endsWith("/")
      )
  );
}

function getStaticGuideRedirectMap(): Map<string, string> {
  const vercelConfig = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8")) as {
    redirects?: Array<{ source?: string; destination?: string }>;
  };

  return new Map(
    (vercelConfig.redirects ?? [])
      .filter(
        (redirect): redirect is { source: string; destination: string } =>
          typeof redirect.source === "string" &&
          typeof redirect.destination === "string" &&
          redirect.source.startsWith("/guides/") &&
          !redirect.source.includes(":") &&
          !redirect.source.includes("(.*)") &&
          !redirect.source.endsWith("/")
      )
      .map((redirect) => [redirect.source, redirect.destination])
  );
}

function countOccurrences(source: string, needle: string): number {
  return source.split(needle).length - 1;
}

test("SEO: canonicalPath should match the page route path", () => {
  const pagesRoot = join(process.cwd(), "src", "pages");
  const files = collectAstroFiles(pagesRoot);

  const mismatches: Array<{ file: string; canonical: string; expected: string }> = [];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const m = source.match(/canonicalPath=\"([^\"]+)\"/);
    if (!m) continue;

    const canonical = m[1];
    const expected = expectedPathFromFile(pagesRoot, file);
    if (canonical !== expected) {
      mismatches.push({
        file: relative(process.cwd(), file).split(sep).join("/"),
        canonical,
        expected
      });
    }
  }

  const details = mismatches
    .slice(0, 20)
    .map((m) => `${m.file} => canonical=${m.canonical}, expected=${m.expected}`)
    .join("\n");

  assert.equal(
    mismatches.length,
    0,
    mismatches.length > 0 ? `Found canonical mismatches:\n${details}` : ""
  );
});

test("SEO: visible Last updated dates should match lastUpdated constants when both are present", () => {
  const pagesRoot = join(process.cwd(), "src", "pages");
  const files = collectAstroFiles(pagesRoot);
  const mismatches: Array<{ file: string; lastUpdated: string; visible: string }> = [];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch || !visibleDateMatch) continue;

    const lastUpdated = lastUpdatedMatch[1];
    const visible = visibleDateMatch[1];
    if (lastUpdated !== visible) {
      mismatches.push({
        file: relative(process.cwd(), file).split(sep).join("/"),
        lastUpdated,
        visible
      });
    }
  }

  const details = mismatches
    .slice(0, 20)
    .map((item) => `${item.file} => lastUpdated=${item.lastUpdated}, visible=${item.visible}`)
    .join("\n");

  assert.equal(
    mismatches.length,
    0,
    mismatches.length > 0 ? `Found visible Last updated mismatches:\n${details}` : ""
  );
});

test("SEO: active pages should not link to redirected guide URLs", () => {
  const pagesRoot = join(process.cwd(), "src", "pages");
  const files = collectAstroFiles(pagesRoot);
  const redirectSources = getStaticGuideRedirectSources();
  const hrefPattern = /href="([^"]+)"/g;

  const redirectLinks: Array<{ file: string; href: string }> = [];

  for (const file of files) {
    const route = expectedPathFromFile(pagesRoot, file);
    if (redirectSources.has(route)) continue;

    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(hrefPattern)) {
      const href = match[1];
      if (redirectSources.has(href)) {
        redirectLinks.push({
          file: relative(process.cwd(), file).split(sep).join("/"),
          href
        });
      }
    }
  }

  const details = redirectLinks
    .slice(0, 20)
    .map((item) => `${item.file} -> ${item.href}`)
    .join("\n");

  assert.equal(
    redirectLinks.length,
    0,
    redirectLinks.length > 0 ? `Found links to redirected guide URLs:\n${details}` : ""
  );
});

test("SEO: mortgage extra-payment guides should point to the intended calculator intents", () => {
  const expectedLinks = [
    {
      file: "src/pages/guides/extra-payment-windfall-strategy.astro",
      href: '/calculators/additional-principal-payment-calculator'
    },
    {
      file: "src/pages/guides/principal-only-extra-payments.astro",
      href: '/calculators/additional-principal-payment-calculator'
    },
    {
      file: "src/pages/guides/extra-payment-lump-sum-vs-monthly.astro",
      href: '/calculators/additional-principal-payment-calculator'
    }
  ];

  const missingLinks = expectedLinks.filter((item) => {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    return !source.includes(`href="${item.href}"`);
  });

  const extraMortgagePaymentsSource = readFileSync(
    join(process.cwd(), "src/pages/guides/extra-mortgage-payments.astro"),
    "utf8"
  );
  const extraMortgagePaymentsLinks = [
    '/calculators/extra-payment-calculator',
    '/calculators/additional-principal-payment-calculator'
  ].filter((href) => !extraMortgagePaymentsSource.includes(`href="${href}"`));

  const details = [
    ...missingLinks.map((item) => `${item.file} -> missing ${item.href}`),
    ...extraMortgagePaymentsLinks.map(
      (href) => `src/pages/guides/extra-mortgage-payments.astro -> missing ${href}`
    )
  ].join("\n");

  assert.equal(
    missingLinks.length + extraMortgagePaymentsLinks.length,
    0,
    details.length > 0 ? `Mortgage extra-payment intent links are missing:\n${details}` : ""
  );
});

test("SEO: priority workflow pages should include visible review coverage", () => {
  const expectedReviewedPages = [
    "src/pages/topics/refinance.astro",
    "src/pages/topics/mortgage-payoff.astro",
    "src/pages/topics/apr.astro",
    "src/pages/topics/credit-cards.astro",
    "src/pages/guides/extra-mortgage-payments.astro",
    "src/pages/guides/credit-card-payoff-strategy.astro",
    "src/pages/guides/why-minimum-payments-take-so-long.astro"
  ];

  const missingReviewCoverage = expectedReviewedPages.filter((file) => {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    return !source.includes("ReviewedByCard");
  });

  assert.equal(
    missingReviewCoverage.length,
    0,
    missingReviewCoverage.length > 0
      ? `Priority pages missing ReviewedByCard:\n${missingReviewCoverage.join("\n")}`
      : ""
  );
});

test("SEO: refinance support guides should stay consolidated across redirects, sitemap exclusion, and source-page noindex", () => {
  const expectedConsolidation = new Map<string, string>([
    ["/guides/refinance-offer-comparison-checklist", "/guides/refinance-checklist"],
    ["/guides/refinance-points-break-even", "/guides/refinance-break-even"],
    ["/guides/refinance-rate-lock", "/guides/refinance-checklist"],
    ["/guides/refinance-rate-vs-term-tradeoff", "/guides/refinance-break-even"],
    ["/guides/refinance-reset-amortization", "/guides/refinance-break-even"],
    ["/guides/refinance-rolling-costs-into-loan", "/guides/refinance-closing-costs"],
    ["/guides/refinance-when-not-to-refinance", "/guides/refinance-break-even"],
    ["/guides/refinance-cash-in-lower-rate", "/guides/refinance-break-even"],
    ["/guides/refinance-cash-out-vs-rate-term", "/guides/refinance-checklist"],
    ["/guides/refinance-no-closing-costs-myth", "/guides/refinance-closing-costs"]
  ]);

  const redirectMap = getStaticGuideRedirectMap();
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const [sourcePath, destinationPath] of expectedConsolidation) {
    if (redirectMap.get(sourcePath) !== destinationPath) {
      issues.push(`${sourcePath} -> expected redirect to ${destinationPath}`);
    }
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }

    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");
    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Refinance consolidation drift detected:\n${issues.join("\n")}` : ""
  );
});

test("SEO: refinance consolidation targets should explicitly absorb redirected support topics", () => {
  const expectedCoverage = [
    {
      file: "src/pages/guides/refinance-break-even.astro",
      phrases: ["when not to refinance", "cash-in refinance", "reset amortization"]
    },
    {
      file: "src/pages/guides/refinance-checklist.astro",
      phrases: ["offer comparison", "rate lock"]
    },
    {
      file: "src/pages/guides/refinance-closing-costs.astro",
      phrases: ["rolling costs", "no closing cost"]
    }
  ];

  const missingCoverage: string[] = [];

  for (const item of expectedCoverage) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8").toLowerCase();
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        missingCoverage.push(`${item.file} -> missing "${phrase}"`);
      }
    }
  }

  assert.equal(
    missingCoverage.length,
    0,
    missingCoverage.length > 0
      ? `Refinance destination guides are missing absorbed topics:\n${missingCoverage.join("\n")}`
      : ""
  );
});

test("SEO: refinance parent guides should keep the strongest entry roles and June 24 trust dates", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/refinance-break-even.astro",
      phrase: "Use this guide when break-even timing is the main question"
    },
    {
      file: "src/pages/guides/refinance-closing-costs.astro",
      phrase: "Use this guide when fee treatment changes the answer"
    },
    {
      file: "src/pages/guides/refinance-checklist.astro",
      phrase: "Use this guide when refinance logistics are the main risk"
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes('reviewedOn="2026-06-24"')) {
      issues.push(`${item.file} -> missing reviewedOn="2026-06-24"`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch || lastUpdatedMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected lastUpdated constant 2026-06-24`);
    }
    if (!visibleDateMatch || visibleDateMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected visible Last updated 2026-06-24`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Refinance parent-guide roles are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: selected high-impression support pages should include visible review coverage and references", () => {
  const expectedPages = [
    "src/pages/calculators/extra-payment-calculator.astro",
    "src/pages/calculators/additional-principal-payment-calculator.astro",
    "src/pages/guides/apr-vs-interest-rate.astro",
    "src/pages/guides/apr-by-loan-type.astro"
  ];

  const issues: string[] = [];

  for (const file of expectedPages) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${file} -> missing ReviewedByCard`);
    }
    if (!source.includes(">References<")) {
      issues.push(`${file} -> missing References section`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `High-impression support pages missing trust coverage:\n${issues.join("\n")}` : ""
  );
});

test("SEO: biweekly and credit-card entry pages should clearly signal their intended starting role", () => {
  const expectedPhrases = [
    {
      file: "src/pages/calculators/biweekly-mortgage-payment-calculator.astro",
      phrases: ["Biweekly vs monthly extra"]
    },
    {
      file: "src/pages/calculators/minimum-payment-payoff-calculator.astro",
      phrases: ["statement minimum is the main input"]
    },
    {
      file: "src/pages/calculators/credit-card-payoff-calculator.astro",
      phrases: ["fixed monthly payment is the main input"]
    },
    {
      file: "src/pages/topics/credit-cards.astro",
      phrases: ["Choose your starting point"]
    }
  ];

  const missingPhrases: string[] = [];

  for (const item of expectedPhrases) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        missingPhrases.push(`${item.file} -> missing "${phrase}"`);
      }
    }
  }

  assert.equal(
    missingPhrases.length,
    0,
    missingPhrases.length > 0
      ? `Entry-page role signaling is missing:\n${missingPhrases.join("\n")}`
      : ""
  );
});

test("SEO: selected mortgage and minimum-payment workflow pages should keep trust signals and role cues aligned", () => {
  const expectedPages = [
    {
      file: "src/pages/topics/mortgage-payoff.astro",
      phrase: "Choose your mortgage payoff starting point"
    },
    {
      file: "src/pages/guides/biweekly-vs-extra-principal.astro",
      phrase: "Use this guide when you are deciding between"
    },
    {
      file: "src/pages/guides/biweekly-mortgage-program-fees.astro",
      phrase: "Use this guide when a biweekly program charges fees"
    },
    {
      file: "src/pages/guides/one-extra-mortgage-payment-per-year.astro",
      phrase: "Use this guide when you want the one-extra-payment-per-year effect"
    },
    {
      file: "src/pages/guides/why-minimum-payments-take-so-long.astro",
      phrase: "Choose the calculator that matches your next step"
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0
      ? `Mortgage/minimum workflow trust alignment is missing:\n${issues.join("\n")}`
      : ""
  );
});

test("SEO: support workflow pages should use the stronger trust model and clear support-page cues", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/one-extra-mortgage-payment-per-year.astro",
      phrase: 'support page for the common "one extra payment" payoff pattern'
    },
    {
      file: "src/pages/guides/biweekly-mortgage-program-fees.astro",
      phrase: "support page for the fee-check question"
    },
    {
      file: "src/pages/guides/credit-card-payoff-strategy.astro",
      phrase: "support page for choosing the right payoff path"
    },
    {
      file: "src/pages/guides/debt-snowball-vs-avalanche.astro",
      phrase: "support page for the method-selection question"
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
      issues.push(`${item.file} -> missing authorProfile trust binding`);
    }
    if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
      issues.push(`${item.file} -> missing reviewProfiles trust binding`);
    }
    if (!source.includes("writtenBy={TRUST_PROFILES.siteOwner}")) {
      issues.push(`${item.file} -> missing writtenBy trust identity`);
    }
    if (!source.includes("reviewedBy={TRUST_PROFILES.editorialReview}")) {
      issues.push(`${item.file} -> missing reviewedBy trust identity`);
    }
    if (!source.includes("secondaryReview={TRUST_PROFILES.methodologyReview}")) {
      issues.push(`${item.file} -> missing secondaryReview trust identity`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Support workflow trust alignment is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: credit-card workflow pages should keep distinct decision jobs", () => {
  const pageExpectations = [
    {
      file: "src/pages/guides/credit-card-payoff-strategy.astro",
      phrases: [
        "Choose the payoff bottleneck before you choose the tool",
        "single balance, stable income, fixed payment target",
        "minimum payment warning is the real problem",
        "promo deadline is the real risk",
        "multiple balances and payoff order are the real issue"
      ]
    },
    {
      file: "src/pages/guides/debt-snowball-vs-avalanche.astro",
      phrases: [
        "behavioral fit matters more than theoretical savings",
        "first account closed",
        "interest-gap sanity check",
        "switch methods if motivation collapses"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of pageExpectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Credit-card workflow role separation is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: credit-card explainer pages should keep distinct roles", () => {
  const pageExpectations = [
    {
      file: "src/pages/guides/why-minimum-payments-take-so-long.astro",
      phrases: [
        "minimum payment rule is the bottleneck",
        "shrinking required payment can keep the balance alive",
        "turn the warning into a fixed-payment target"
      ],
      requireStrongTrust: false
    },
    {
      file: "src/pages/guides/how-credit-card-interest-is-calculated.astro",
      phrases: [
        "Use this guide when the statement math looks wrong",
        "average daily balance is usually the main reason",
        "grace-period loss and trailing interest",
        "statement reconciliation checklist"
      ],
      requireStrongTrust: true
    }
  ];

  const issues: string[] = [];

  for (const item of pageExpectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    if (item.requireStrongTrust) {
      if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
        issues.push(`${item.file} -> missing authorProfile trust binding`);
      }
      if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
        issues.push(`${item.file} -> missing reviewProfiles trust binding`);
      }
      if (!source.includes("writtenBy={TRUST_PROFILES.siteOwner}")) {
        issues.push(`${item.file} -> missing writtenBy trust identity`);
      }
      if (!source.includes("reviewedBy={TRUST_PROFILES.editorialReview}")) {
        issues.push(`${item.file} -> missing reviewedBy trust identity`);
      }
      if (!source.includes("secondaryReview={TRUST_PROFILES.methodologyReview}")) {
        issues.push(`${item.file} -> missing secondaryReview trust identity`);
      }
      if (!source.includes("reviewScope=")) {
        issues.push(`${item.file} -> missing reviewScope`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Credit-card explainer differentiation is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: credit-card topic page should behave like a routing tree", () => {
  const file = "src/pages/topics/credit-cards.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the credit-card problem before you choose the tool",
    "one balance with a fixed monthly payment target",
    "minimum payment drag",
    "statement interest or math confusion",
    "promo APR deadline or balance transfer timing",
    "multiple balances and payoff order"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Credit-card topic routing-tree cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payoff topic page should behave like a routing tree", () => {
  const file = "src/pages/topics/mortgage-payoff.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the mortgage-payoff question before you choose the tool",
    "baseline monthly payment or amortization",
    "monthly extra or target-payoff planning",
    "lump sum or one-extra-payment pattern",
    "biweekly versus monthly extra",
    "principal-only posting or servicer handling",
    "extra payment versus refinance, recast, or PMI alternative"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payoff topic routing-tree cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: refinance topic page should behave like a routing tree", () => {
  const file = "src/pages/topics/refinance.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the refinance question before you choose the page",
    "break-even timing or time horizon",
    "closing costs or cash-to-close",
    "rate lock, document prep, or execution checklist",
    "term reset or payment-versus-total-cost tradeoff",
    "points, lender credits, or rolling costs",
    "refinance versus extra payments or other alternatives"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Refinance topic routing-tree cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR topic page should behave like a routing tree", () => {
  const file = "src/pages/topics/apr.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the APR question before you choose the page",
    "APR versus interest rate or fee-heavy offer confusion",
    "origination fees, closing costs, or financed fees",
    "APR comparisons across loan types",
    "short hold period, prepayment, or refinance horizon",
    "where to find the official APR disclosure",
    "promo APR, balance transfer fee, or penalty APR on credit cards"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR topic routing-tree cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR wave-1 pages should emphasize the strongest starting point and boundary guidance", () => {
  const expectations = [
    {
      file: "src/pages/topics/apr.astro",
      phrases: [
        "Best starting point for most APR comparisons",
        "Start with the APR calculator when you already have the rate, term, loan amount, and fee assumptions.",
        "If you still need to locate the disclosed APR before comparing offers"
      ]
    },
    {
      file: "src/pages/calculators/apr-calculator.astro",
      phrases: [
        "Start here when you already have the numbers from a Loan Estimate, statement, or offer sheet.",
        "Do not include taxes, insurance, or escrow in the APR fee field.",
        "If you are still sorting out which APR question you actually have, go back to the APR topic hub first."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR wave-1 starting-point or boundary cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: rent-vs-buy topic page should behave like a routing tree", () => {
  const file = "src/pages/topics/rent-vs-buy.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the rent-versus-buy question before you choose the page",
    "full scenario comparison before deciding whether to buy",
    "break-even timing or holding period",
    "upfront cash, down payment, or closing costs",
    "ownership costs like taxes, insurance, HOA, maintenance, or PMI",
    "monthly affordability or payment fit",
    "assumption sensitivity for rent growth, appreciation, rates, or investment return"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Rent-vs-buy topic routing-tree cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: DTI topic page should behave like a routing tree", () => {
  const file = "src/pages/topics/debt-to-income.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the DTI question before you choose the page",
    "full DTI calculation before applying",
    "what counts in DTI and which debts or income are included",
    "front-end versus back-end DTI",
    "housing payment or how much house/payment fits the ratio",
    "how to improve DTI before applying",
    "threshold ranges or compensating factors"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `DTI topic routing-tree cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: topics index should behave like a site-level decision router", () => {
  const file = "src/pages/topics/index.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the finance decision before you choose the topic",
    "compare loan offers with fees or credits",
    "credit card payoff speed, minimum-payment drag, or payoff strategy",
    "housing affordability, DTI, or payment-fit questions",
    "renting versus buying over a planned hold period",
    "mortgage payoff acceleration with extra principal",
    "refinance break-even, closing costs, or rate-reset decisions"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Topics index decision-router cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: guides index should behave like a strongest-guide-path router", () => {
  const file = "src/pages/guides/index.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the guide job before you choose the article",
    "borrowing cost, fees, or APR comparison",
    "credit-card payoff strategy or minimum-payment drag",
    "DTI rules, affordability inputs, or how to improve the ratio",
    "rent-vs-buy break-even and assumption setup",
    "extra mortgage payments, posting rules, or payoff tradeoffs",
    "refinance break-even and time-horizon tradeoffs"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Guides index strongest-path cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: calculators index should behave like a calculator-job router", () => {
  const file = "src/pages/calculators/index.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Choose the calculator job before you choose the tool",
    "compare loan offers, fees, or borrowing cost",
    "one balance payoff or fixed monthly target",
    "multiple balances and payoff order",
    "housing payment or affordability estimate",
    "rent-vs-buy scenario comparison",
    "extra principal or mortgage payoff acceleration"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${file} -> missing authorProfile trust binding`);
  }
  if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${file} -> missing reviewProfiles trust binding`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Calculators index calculator-job cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: DTI and rent topic workflows should keep trust signals and chooser language aligned", () => {
  const expectedPages = [
    {
      file: "src/pages/topics/debt-to-income.astro",
      phrase: "Choose your DTI starting point",
      requireReferences: true
    },
    {
      file: "src/pages/topics/rent-vs-buy.astro",
      phrase: "Choose your rent vs buy starting point",
      requireReferences: true
    },
    {
      file: "src/pages/guides/dti-credit-card-minimums.astro",
      phrase: "Use this guide when credit card minimum payments are the DTI bottleneck",
      requireReferences: true
    },
    {
      file: "src/pages/guides/rent-vs-buy-price-to-rent-ratio.astro",
      phrase: "Use this guide when you need a quick market screen before the full model",
      requireReferences: true
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (item.requireReferences && !source.includes(">References<")) {
      issues.push(`${item.file} -> missing References section`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0
      ? `DTI/rent topic trust alignment is missing:\n${issues.join("\n")}`
      : ""
  );
});

test("SEO: DTI redirect-source pages should stay consolidated across redirects, sitemap exclusion, and source-page noindex", () => {
  const expectedConsolidation = new Map<string, string>([
    ["/guides/front-end-vs-back-end-dti", "/guides/dti-calculation-step-by-step"],
    ["/guides/dti-thresholds-compensating-factors", "/guides/what-counts-in-dti"],
    ["/guides/dti-income-documentation-checklist", "/guides/what-counts-in-dti"],
    ["/guides/dti-variable-income-averaging", "/guides/what-counts-in-dti"],
    ["/guides/dti-self-employed-income", "/guides/what-counts-in-dti"],
    ["/guides/dti-co-borrower-impacts", "/guides/what-counts-in-dti"],
    ["/guides/dti-and-student-loans", "/guides/what-counts-in-dti"],
    ["/guides/dti-installment-loans-and-leases", "/guides/what-counts-in-dti"],
    ["/guides/dti-credit-card-minimums", "/guides/what-counts-in-dti"],
    ["/guides/dti-when-to-recalculate", "/guides/how-to-improve-dti"]
  ]);

  const redirectMap = getStaticGuideRedirectMap();
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const [sourcePath, destinationPath] of expectedConsolidation) {
    const actualDestination = redirectMap.get(sourcePath);
    if (actualDestination !== destinationPath) {
      issues.push(`${sourcePath} -> expected redirect to ${destinationPath}, found ${actualDestination ?? "none"}`);
    }
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }
    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");
    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `DTI consolidation drift detected:\n${issues.join("\n")}` : ""
  );
});

test("SEO: DTI destination guides should keep trust signals and absorbed-intent coverage aligned", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/dti-calculation-step-by-step.astro",
      phrase: "Use this guide when you need the exact DTI workflow before comparing front-end, back-end, or housing-payment scenarios",
      absorbedPhrases: ["front-end dti", "back-end dti", "housing payment"]
    },
    {
      file: "src/pages/guides/what-counts-in-dti.astro",
      phrase: "Use this guide when you are deciding which debts, income sources, and documentation actually count in DTI",
      absorbedPhrases: ["student loans", "self-employed", "co-borrower", "credit card minimums", "compensating factors"]
    },
    {
      file: "src/pages/guides/how-to-improve-dti.astro",
      phrase: "Use this guide when you need the highest-impact order of operations to lower DTI and know when to rerun it",
      absorbedPhrases: ["statement cycles", "recalculate dti", "required payment"]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    const sourceLower = source.toLowerCase();
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (!source.includes(">References<")) {
      issues.push(`${item.file} -> missing References section`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }

    for (const phrase of item.absorbedPhrases) {
      if (!sourceLower.includes(phrase.toLowerCase())) {
        issues.push(`${item.file} -> missing absorbed intent phrase "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `DTI destination trust alignment is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: rent-vs-buy break-even redirect-source pages should stay consolidated across redirects, sitemap exclusion, and source-page noindex", () => {
  const expectedConsolidation = new Map<string, string>([
    ["/guides/rent-vs-buy-time-horizon", "/guides/rent-vs-buy-break-even"],
    ["/guides/rent-vs-buy-price-to-rent-ratio", "/guides/rent-vs-buy-break-even"],
    ["/guides/rent-vs-buy-rent-growth", "/guides/rent-vs-buy-break-even"],
    ["/guides/rent-vs-buy-home-appreciation", "/guides/rent-vs-buy-break-even"],
    ["/guides/rent-vs-buy-investment-return", "/guides/rent-vs-buy-break-even"],
    ["/guides/rent-vs-buy-mortgage-rate-sensitivity", "/guides/rent-vs-buy-break-even"]
  ]);

  const redirectMap = getStaticGuideRedirectMap();
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const [sourcePath, destinationPath] of expectedConsolidation) {
    const actualDestination = redirectMap.get(sourcePath);
    if (actualDestination !== destinationPath) {
      issues.push(`${sourcePath} -> expected redirect to ${destinationPath}, found ${actualDestination ?? "none"}`);
    }
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }
    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");
    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Rent-vs-buy break-even sources missing "noindex" or redirect hygiene:\n${issues.join("\n")}` : ""
  );
});

test("SEO: rent-vs-buy-break-even should keep destination trust and absorbed-intent coverage", () => {
  const file = "src/pages/guides/rent-vs-buy-break-even.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes(">References<")) {
    issues.push(`${file} -> missing References section`);
  }
  if (!source.includes("Use this guide when break-even timing and assumption sensitivity are the main decision questions")) {
    issues.push(`${file} -> missing absorbed-intent role section`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `rent-vs-buy-break-even trust issues:\n${issues.join("\n")}` : ""
  );
});

test("SEO: rent-vs-buy costs-to-include redirect-source pages should stay consolidated across redirects, sitemap exclusion, and source-page noindex", () => {
  const expectedConsolidation = new Map<string, string>([
    ["/guides/rent-vs-buy-down-payment", "/guides/rent-vs-buy-costs-to-include"],
    ["/guides/rent-vs-buy-maintenance-estimate", "/guides/rent-vs-buy-costs-to-include"],
    ["/guides/rent-vs-buy-closing-costs", "/guides/rent-vs-buy-costs-to-include"],
    ["/guides/rent-vs-buy-hoa-fees", "/guides/rent-vs-buy-costs-to-include"],
    ["/guides/rent-vs-buy-pmi-assumptions", "/guides/rent-vs-buy-costs-to-include"]
  ]);

  const redirectMap = getStaticGuideRedirectMap();
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const [sourcePath, destinationPath] of expectedConsolidation) {
    const actualDestination = redirectMap.get(sourcePath);
    if (actualDestination !== destinationPath) {
      issues.push(`${sourcePath} -> expected redirect to ${destinationPath}, found ${actualDestination ?? "none"}`);
    }
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }
    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");
    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Rent-vs-buy costs-to-include sources missing "noindex" or redirect hygiene:\n${issues.join("\n")}` : ""
  );
});

test("SEO: rent-vs-buy-costs-to-include should keep destination trust and absorbed-intent coverage", () => {
  const file = "src/pages/guides/rent-vs-buy-costs-to-include.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes(">References<")) {
    issues.push(`${file} -> missing References section`);
  }
  if (!source.includes("Use this guide when ownership costs, upfront cash needs, and incomplete assumptions are the main modeling problem")) {
    issues.push(`${file} -> missing absorbed-intent role section`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `rent-vs-buy-costs-to-include trust issues:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payment and extra-payment destination pages should keep trust signals and role coverage aligned", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/how-mortgage-payments-are-calculated.astro",
      phrase: "Use this guide when you need the baseline mortgage payment formula"
    },
    {
      file: "src/pages/guides/what-is-piti.astro",
      phrase: "Use this guide when you need the housing-payment breakdown"
    },
    {
      file: "src/pages/guides/principal-and-interest-vs-escrow.astro",
      phrase: "Use this guide when your statement question is escrow versus principal and interest"
    },
    {
      file: "src/pages/guides/mortgage-payment-affordability-checklist.astro",
      phrase: "Use this guide when affordability is the main decision"
    },
    {
      file: "src/pages/guides/extra-payment-vs-refinance.astro",
      phrase: "Use this guide when you are deciding between faster payoff and refinancing"
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (!source.includes(">References<")) {
      issues.push(`${item.file} -> missing References section`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0
      ? `Mortgage/extra destination trust alignment is missing:\n${issues.join("\n")}`
      : ""
  );
});

test("SEO: mortgage-payment core destination guides should adopt the stronger trust model", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/how-mortgage-payments-are-calculated.astro",
      phrase: "Use this guide when you need the baseline mortgage payment formula"
    },
    {
      file: "src/pages/guides/what-is-piti.astro",
      phrase: "Use this guide when you need the housing-payment breakdown"
    },
    {
      file: "src/pages/guides/principal-and-interest-vs-escrow.astro",
      phrase: "Use this guide when your statement question is escrow versus principal and interest"
    },
    {
      file: "src/pages/guides/mortgage-payment-affordability-checklist.astro",
      phrase: "Use this guide when affordability is the main decision"
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing role cue "${item.phrase}"`);
    }
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
      issues.push(`${item.file} -> missing authorProfile trust binding`);
    }
    if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
      issues.push(`${item.file} -> missing reviewProfiles trust binding`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(`${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payment core-support trust upgrade is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: final extra-payment and PMI redirect-source pages should stay consolidated across redirects, sitemap exclusion, and source-page noindex", () => {
  const expectedConsolidation = new Map<string, string>([
    ["/guides/extra-mortgage-payment-calculator", "/calculators/extra-payment-calculator"],
    ["/guides/calculate-mortgage-payoff-with-additional-principal-payments", "/calculators/extra-payment-calculator"],
    ["/guides/mortgage-extra-principal-calculator", "/calculators/additional-principal-payment-calculator"],
    ["/guides/estimating-pmi-cost", "/guides/what-is-piti"]
  ]);

  const redirectMap = getStaticGuideRedirectMap();
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const [sourcePath, destinationPath] of expectedConsolidation) {
    const actualDestination = redirectMap.get(sourcePath);
    if (actualDestination !== destinationPath) {
      issues.push(`${sourcePath} -> expected redirect to ${destinationPath}, found ${actualDestination ?? "none"}`);
    }
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }
    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");
    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Final tail consolidation drift detected:\n${issues.join("\n")}` : ""
  );
});

test("SEO: extra-payment and PITI destinations should keep final absorbed-intent coverage aligned", () => {
  const calculatorFile = "src/pages/calculators/extra-payment-calculator.astro";
  const calculatorSource = readFileSync(join(process.cwd(), calculatorFile), "utf8");
  const guideFile = "src/pages/guides/what-is-piti.astro";
  const guideSource = readFileSync(join(process.cwd(), guideFile), "utf8");
  const guideSourceLower = guideSource.toLowerCase();
  const issues: string[] = [];

  if (!calculatorSource.includes("ReviewedByCard")) {
    issues.push(`${calculatorFile} -> missing ReviewedByCard`);
  }
  if (!calculatorSource.includes(">References<")) {
    issues.push(`${calculatorFile} -> missing References section`);
  }
  if (!calculatorSource.includes("Use this calculator when you need the broad extra-payment payoff plan before narrowing to principal-only or lump-sum-only moves")) {
    issues.push(`${calculatorFile} -> missing final absorbed-intent role section`);
  }
  if (!calculatorSource.includes('lastUpdated="2026-06-24"')) {
    issues.push(`${calculatorFile} -> missing lastUpdated="2026-06-24"`);
  }
  for (const phrase of ["extra mortgage payment calculator", "additional principal payments"]) {
    if (!calculatorSource.toLowerCase().includes(phrase)) {
      issues.push(`${calculatorFile} -> missing absorbed intent phrase "${phrase}"`);
    }
  }

  if (!guideSource.includes("ReviewedByCard")) {
    issues.push(`${guideFile} -> missing ReviewedByCard`);
  }
  if (!guideSource.includes(">References<")) {
    issues.push(`${guideFile} -> missing References section`);
  }
  if (!guideSource.includes("Use this guide when PMI cost is the missing piece of the full housing-payment estimate")) {
    issues.push(`${guideFile} -> missing final PMI absorbed-intent role section`);
  }
  for (const phrase of ["estimating pmi cost", "monthly pmi", "housing payment"]) {
    if (!guideSourceLower.includes(phrase)) {
      issues.push(`${guideFile} -> missing absorbed intent phrase "${phrase}"`);
    }
  }

  const lastUpdatedMatch = guideSource.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = guideSource.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${guideFile} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${guideFile} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`${guideFile} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Final extra-payment/PITI destination trust alignment is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payment support guides should keep trust signals and role cues aligned", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/mortgage-payment-rate-sensitivity.astro",
      phrase: "Use this guide when rate sensitivity is the main mortgage-payment question"
    },
    {
      file: "src/pages/guides/mortgage-payment-escrow-account.astro",
      phrase: "Use this guide when you need the escrow baseline before troubleshooting payment changes"
    },
    {
      file: "src/pages/guides/mortgage-payment-escrow-shortage.astro",
      phrase: "Use this guide when your payment jumped after an escrow analysis"
    },
    {
      file: "src/pages/guides/mortgage-payment-prepaids-and-reserves.astro",
      phrase: "Use this guide when cash to close is the part of the mortgage payment workflow you need to explain"
    },
    {
      file: "src/pages/guides/mortgage-payment-property-tax-assumptions.astro",
      phrase: "Use this guide when property tax estimates are the weak point in your mortgage payment model"
    },
    {
      file: "src/pages/guides/mortgage-payment-insurance-assumptions.astro",
      phrase: "Use this guide when homeowners insurance assumptions are the weak point in your payment estimate"
    },
    {
      file: "src/pages/guides/mortgage-payment-pmi-thresholds.astro",
      phrase: "Use this guide when PMI is the reason the payment scenario changes"
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (!source.includes(">References<")) {
      issues.push(`${item.file} -> missing References section`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0
      ? `Mortgage-payment support guide trust alignment is missing:\n${issues.join("\n")}`
      : ""
  );
});

test("SEO: mortgage-payment input-support guides should keep strong trust and distinct originality cues", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/mortgage-payment-rate-sensitivity.astro",
      rolePhrase: "Use this guide when rate sensitivity is the main mortgage-payment question",
      originalityPhrases: [
        "keep taxes, insurance, HOA, and PMI fixed while you isolate the rate move",
        "0.125% to 0.500% rate moves",
        "rate lock or buydown question"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-property-tax-assumptions.astro",
      rolePhrase: "Use this guide when property tax estimates are the weak point in your mortgage payment model",
      originalityPhrases: [
        "seller tax bill is not your future tax bill",
        "reassessment after purchase",
        "special assessments or expiring exemptions"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-insurance-assumptions.astro",
      rolePhrase: "Use this guide when homeowners insurance assumptions are the weak point in your payment estimate",
      originalityPhrases: [
        "rebuild cost instead of market value",
        "coverage apples-to-apples",
        "flood, wind, or HOA master-policy gaps"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-pmi-thresholds.astro",
      rolePhrase: "Use this guide when PMI is the reason the payment scenario changes",
      originalityPhrases: [
        "PMI duration matters more than the first monthly payment",
        "faster PMI-removal path",
        "larger down payment, monthly extra, or appraisal strategy"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes(item.rolePhrase)) {
      issues.push(`${item.file} -> missing role cue "${item.rolePhrase}"`);
    }
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
      issues.push(`${item.file} -> missing authorProfile trust binding`);
    }
    if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
      issues.push(`${item.file} -> missing reviewProfiles trust binding`);
    }
    if (!source.includes("writtenBy={TRUST_PROFILES.siteOwner}")) {
      issues.push(`${item.file} -> missing writtenBy trust identity`);
    }
    if (!source.includes("reviewedBy={TRUST_PROFILES.editorialReview}")) {
      issues.push(`${item.file} -> missing reviewedBy trust identity`);
    }
    if (!source.includes("secondaryReview={TRUST_PROFILES.methodologyReview}")) {
      issues.push(`${item.file} -> missing secondaryReview trust identity`);
    }

    for (const phrase of item.originalityPhrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing originality cue "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payment input-support originality coverage is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payment escrow-and-closing support guides should keep strong trust and distinct originality cues", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/mortgage-payment-escrow-account.astro",
      rolePhrase: "Use this guide when you need the escrow baseline before troubleshooting payment changes",
      originalityPhrases: [
        "escrow is a collection system, not a second loan payment",
        "minimum cushion",
        "before you diagnose a payment jump"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-escrow-shortage.astro",
      rolePhrase: "Use this guide when your payment jumped after an escrow analysis",
      originalityPhrases: [
        "separate the shortage repayment from the new ongoing escrow baseline",
        "lump sum versus 12-month spread",
        "taxes, insurance, or both"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-prepaids-and-reserves.astro",
      rolePhrase: "Use this guide when cash to close is the part of the mortgage payment workflow you need to explain",
      originalityPhrases: [
        "monthly payment can look fine while cash to close still breaks the plan",
        "per-diem interest",
        "prepaids are timing-heavy upfront dollars, not recurring budget relief"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes(item.rolePhrase)) {
      issues.push(`${item.file} -> missing role cue "${item.rolePhrase}"`);
    }
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
      issues.push(`${item.file} -> missing authorProfile trust binding`);
    }
    if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
      issues.push(`${item.file} -> missing reviewProfiles trust binding`);
    }
    if (!source.includes("writtenBy={TRUST_PROFILES.siteOwner}")) {
      issues.push(`${item.file} -> missing writtenBy trust identity`);
    }
    if (!source.includes("reviewedBy={TRUST_PROFILES.editorialReview}")) {
      issues.push(`${item.file} -> missing reviewedBy trust identity`);
    }
    if (!source.includes("secondaryReview={TRUST_PROFILES.methodologyReview}")) {
      issues.push(`${item.file} -> missing secondaryReview trust identity`);
    }

    for (const phrase of item.originalityPhrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing originality cue "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payment escrow-and-closing originality coverage is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payment comparison guides should keep strong trust and distinct originality cues", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/mortgage-payment-dti-housing-payment.astro",
      rolePhrase: "Use this guide when your DTI answer depends on the full housing payment",
      originalityPhrases: [
        "underwriting housing number is usually larger than principal and interest alone",
        "front-end pass while back-end fails",
        "PITI, HOA, and PMI all belong in the lender-facing housing number"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-down-payment-impact.astro",
      rolePhrase: "Use this guide when the main tradeoff is down payment versus reserves and PMI",
      originalityPhrases: [
        "20% down is not automatically the smartest use of cash",
        "PMI cliff is only one part of the decision",
        "reserve floor after closing"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-total-cost-vs-payment.astro",
      rolePhrase: "Use this guide when the cheapest monthly payment is not automatically the cheapest loan",
      originalityPhrases: [
        "payment relief is rarely free",
        "compare dollars paid by your real hold period",
        "resetting the amortization clock can hide cost"
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-15-vs-30-year.astro",
      rolePhrase: "Use this guide when term choice is the real mortgage-payment decision",
      originalityPhrases: [
        "forced payoff versus optional prepayment",
        "30-year flexibility only matters if you protect the cash-flow gap",
        "same house can produce two very different required lifestyles"
      ]
    },
    {
      file: "src/pages/guides/hoa-fees-and-mortgage-payment.astro",
      rolePhrase: "Use this guide when HOA dues are the missing part of the housing-payment estimate",
      originalityPhrases: [
        "HOA behaves like housing cost but not loan amortization",
        "special assessment risk can matter more than the base dues",
        "master policy can still leave personal coverage gaps"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes(item.rolePhrase)) {
      issues.push(`${item.file} -> missing role cue "${item.rolePhrase}"`);
    }
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
      issues.push(`${item.file} -> missing authorProfile trust binding`);
    }
    if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
      issues.push(`${item.file} -> missing reviewProfiles trust binding`);
    }
    if (!source.includes("writtenBy={TRUST_PROFILES.siteOwner}")) {
      issues.push(`${item.file} -> missing writtenBy trust identity`);
    }
    if (!source.includes("reviewedBy={TRUST_PROFILES.editorialReview}")) {
      issues.push(`${item.file} -> missing reviewedBy trust identity`);
    }
    if (!source.includes("secondaryReview={TRUST_PROFILES.methodologyReview}")) {
      issues.push(`${item.file} -> missing secondaryReview trust identity`);
    }

    for (const phrase of item.originalityPhrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing originality cue "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payment comparison originality coverage is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payment comparison guides should keep trust signals and decision-role cues aligned", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/mortgage-payment-dti-housing-payment.astro",
      phrase: "Use this guide when your DTI answer depends on the full housing payment"
    },
    {
      file: "src/pages/guides/mortgage-payment-down-payment-impact.astro",
      phrase: "Use this guide when the main tradeoff is down payment versus reserves and PMI"
    },
    {
      file: "src/pages/guides/mortgage-payment-total-cost-vs-payment.astro",
      phrase: "Use this guide when the cheapest monthly payment is not automatically the cheapest loan"
    },
    {
      file: "src/pages/guides/mortgage-payment-15-vs-30-year.astro",
      phrase: "Use this guide when term choice is the real mortgage-payment decision"
    },
    {
      file: "src/pages/guides/hoa-fees-and-mortgage-payment.astro",
      phrase: "Use this guide when HOA dues are the missing part of the housing-payment estimate"
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (!source.includes(">References<")) {
      issues.push(`${item.file} -> missing References section`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0
      ? `Mortgage-payment comparison guide trust alignment is missing:\n${issues.join("\n")}`
      : ""
  );
});

test("SEO: mortgage-payment estimation guides and calculator entry should keep trust signals aligned", () => {
  const guidePages = [
    {
      file: "src/pages/guides/how-to-estimate-homeowners-insurance.astro",
      phrase: "Use this guide when homeowners insurance is the last uncertain input in your mortgage payment estimate"
    },
    {
      file: "src/pages/guides/how-to-estimate-property-taxes.astro",
      phrase: "Use this guide when property taxes are the last uncertain input in your mortgage payment estimate"
    }
  ];

  const calculatorPage = {
    file: "src/pages/calculators/mortgage-payment-calculator.astro",
    phrase: "Use this calculator when you need the full monthly housing payment in one place",
    lastUpdated: "2026-04-22"
  };

  const issues: string[] = [];

  for (const item of guidePages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (!source.includes(">References<")) {
      issues.push(`${item.file} -> missing References section`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  const calculatorSource = readFileSync(join(process.cwd(), calculatorPage.file), "utf8");
  if (!calculatorSource.includes("ReviewedByCard")) {
    issues.push(`${calculatorPage.file} -> missing ReviewedByCard`);
  }
  if (!calculatorSource.includes(calculatorPage.phrase)) {
    issues.push(`${calculatorPage.file} -> missing "${calculatorPage.phrase}"`);
  }
  if (!calculatorSource.includes(">References<")) {
    issues.push(`${calculatorPage.file} -> missing References section`);
  }
  if (!calculatorSource.includes(`lastUpdated="${calculatorPage.lastUpdated}"`)) {
    issues.push(`${calculatorPage.file} -> missing lastUpdated="${calculatorPage.lastUpdated}"`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0
      ? `Mortgage-payment estimation entry trust alignment is missing:\n${issues.join("\n")}`
      : ""
  );
});

test("SEO: mortgage-payment estimation entries should keep strong trust and distinct originality cues", () => {
  const guidePages = [
    {
      file: "src/pages/guides/how-to-estimate-homeowners-insurance.astro",
      rolePhrase: "Use this guide when homeowners insurance is the last uncertain input in your mortgage payment estimate",
      originalityPhrases: [
        "coverage-comparable quotes matter more than random premium samples",
        "replacement-cost logic, not purchase-price logic",
        "quote-first input page"
      ]
    },
    {
      file: "src/pages/guides/how-to-estimate-property-taxes.astro",
      rolePhrase: "Use this guide when property taxes are the last uncertain input in your mortgage payment estimate",
      originalityPhrases: [
        "seller bill is a clue, not a final answer",
        "post-sale reassessment risk",
        "local-tax-input page"
      ]
    }
  ];

  const calculatorPage = {
    file: "src/pages/calculators/mortgage-payment-calculator.astro",
    rolePhrase: "Use this calculator when you need the full monthly housing payment in one place",
    lastUpdated: "2026-04-22",
    originalityPhrases: [
      "use this page as the first full housing-payment draft, not the last underwriting answer",
      "taxes and insurance quality determine whether the calculator is useful",
      "one-page entry into payment, DTI, and affordability checks"
    ]
  };

  const issues: string[] = [];

  for (const item of guidePages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.rolePhrase)) {
      issues.push(`${item.file} -> missing role cue "${item.rolePhrase}"`);
    }
    if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
      issues.push(`${item.file} -> missing authorProfile trust binding`);
    }
    if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
      issues.push(`${item.file} -> missing reviewProfiles trust binding`);
    }
    if (!source.includes("writtenBy={TRUST_PROFILES.siteOwner}")) {
      issues.push(`${item.file} -> missing writtenBy trust identity`);
    }
    if (!source.includes("reviewedBy={TRUST_PROFILES.editorialReview}")) {
      issues.push(`${item.file} -> missing reviewedBy trust identity`);
    }
    if (!source.includes("secondaryReview={TRUST_PROFILES.methodologyReview}")) {
      issues.push(`${item.file} -> missing secondaryReview trust identity`);
    }
    for (const phrase of item.originalityPhrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing originality cue "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  const calculatorSource = readFileSync(join(process.cwd(), calculatorPage.file), "utf8");
  if (!calculatorSource.includes("ReviewedByCard")) {
    issues.push(`${calculatorPage.file} -> missing ReviewedByCard`);
  }
  if (!calculatorSource.includes(calculatorPage.rolePhrase)) {
    issues.push(`${calculatorPage.file} -> missing role cue "${calculatorPage.rolePhrase}"`);
  }
  if (!calculatorSource.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
    issues.push(`${calculatorPage.file} -> missing authorProfile trust binding`);
  }
  if (!calculatorSource.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
    issues.push(`${calculatorPage.file} -> missing reviewProfiles trust binding`);
  }
  if (!calculatorSource.includes("writtenBy={TRUST_PROFILES.siteOwner}")) {
    issues.push(`${calculatorPage.file} -> missing writtenBy trust identity`);
  }
  if (!calculatorSource.includes("reviewedBy={TRUST_PROFILES.editorialReview}")) {
    issues.push(`${calculatorPage.file} -> missing reviewedBy trust identity`);
  }
  if (!calculatorSource.includes("secondaryReview={TRUST_PROFILES.methodologyReview}")) {
    issues.push(`${calculatorPage.file} -> missing secondaryReview trust identity`);
  }
  for (const phrase of calculatorPage.originalityPhrases) {
    if (!calculatorSource.includes(phrase)) {
      issues.push(`${calculatorPage.file} -> missing originality cue "${phrase}"`);
    }
  }
  if (!calculatorSource.includes(`lastUpdated="${calculatorPage.lastUpdated}"`)) {
    issues.push(`${calculatorPage.file} -> missing lastUpdated="${calculatorPage.lastUpdated}"`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payment estimation-entry originality coverage is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: Phase 1 redirect-source clusters should stay consolidated with noindex guards", () => {
  const expectedConsolidation = new Map<string, string>([
    ["/guides/mortgage-payment-15-vs-30-year", "/guides/how-mortgage-payments-are-calculated"],
    ["/guides/mortgage-payment-rate-sensitivity", "/guides/mortgage-payment-affordability-checklist"],
    ["/guides/mortgage-payment-down-payment-impact", "/guides/mortgage-payment-affordability-checklist"],
    ["/guides/mortgage-payment-total-cost-vs-payment", "/guides/mortgage-payment-affordability-checklist"],
    ["/guides/mortgage-payment-property-tax-assumptions", "/guides/what-is-piti"],
    ["/guides/mortgage-payment-insurance-assumptions", "/guides/what-is-piti"],
    ["/guides/mortgage-payment-pmi-thresholds", "/guides/what-is-piti"],
    ["/guides/how-to-estimate-property-taxes", "/guides/what-is-piti"],
    ["/guides/how-to-estimate-homeowners-insurance", "/guides/what-is-piti"],
    ["/guides/hoa-fees-and-mortgage-payment", "/guides/what-is-piti"],
    ["/guides/mortgage-payment-escrow-account", "/guides/principal-and-interest-vs-escrow"],
    ["/guides/mortgage-payment-escrow-shortage", "/guides/principal-and-interest-vs-escrow"],
    ["/guides/mortgage-payment-prepaids-and-reserves", "/guides/principal-and-interest-vs-escrow"],
    ["/guides/mortgage-payment-dti-housing-payment", "/guides/dti-housing-payment-piti-includes"],
    ["/guides/credit-card-balance-transfer-fee", "/guides/how-to-use-apr-for-credit-cards"],
    ["/guides/balance-transfer-payoff-timeline", "/guides/credit-card-payoff-strategy"],
    ["/guides/credit-card-payoff-fixed-vs-minimum", "/guides/credit-card-payoff-strategy"],
    ["/guides/credit-card-payoff-payment-target", "/guides/credit-card-payoff-strategy"],
    ["/guides/credit-card-payoff-timeline", "/guides/credit-card-payoff-strategy"],
    ["/guides/credit-card-payoff-order", "/guides/credit-card-payoff-strategy"],
    ["/guides/credit-card-utilization-payoff", "/guides/credit-card-payoff-strategy"],
    ["/guides/average-daily-balance-interest", "/guides/how-credit-card-interest-is-calculated"],
    ["/guides/credit-card-interest-calculator-payoff", "/guides/how-credit-card-interest-is-calculated"],
    ["/guides/credit-card-minimum-payment-formula", "/guides/why-minimum-payments-take-so-long"],
    ["/guides/calculate-credit-card-payoff", "/guides/credit-card-payoff-strategy"],
    ["/guides/credit-card-payment-payoff-calculator", "/guides/credit-card-payoff-strategy"]
  ]);

  const redirectMap = getStaticGuideRedirectMap();
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const [sourcePath, destinationPath] of expectedConsolidation) {
    const actualDestination = redirectMap.get(sourcePath);
    if (actualDestination !== destinationPath) {
      issues.push(
        `${sourcePath} -> expected redirect to ${destinationPath} but got ${actualDestination ?? "missing"}`
      );
    }
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }
    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");
    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Phase 1 sources missing "noindex" or redirect hygiene:\n${issues.join("\n")}` : ""
  );
});

test("SEO: how-credit-card-interest-is-calculated should keep trust coverage", () => {
  const file = "src/pages/guides/how-credit-card-interest-is-calculated.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  if (!source.includes("ReviewedByCard")) {
    issues.push(`${file} -> missing ReviewedByCard`);
  }
  if (!source.includes(">References<")) {
    issues.push(`${file} -> missing References section`);
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch) {
    issues.push(`${file} -> missing lastUpdated constant`);
  }
  if (!visibleDateMatch) {
    issues.push(`${file} -> missing visible Last updated date`);
  }
  if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
    issues.push(`visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `how-credit-card-interest-is-calculated trust issues:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR redirect-source pages should stay consolidated across redirects, sitemap exclusion, and source-page noindex", () => {
  const expectedConsolidation = new Map<string, string>([
    ["/guides/apr-tool", "/calculators/apr-calculator"],
    ["/guides/apr-calculator-payment", "/calculators/apr-calculator"],
    ["/guides/interest-rate-apr-calculator", "/guides/apr-vs-interest-rate"],
    ["/guides/apr-vs-interest-rate-fees", "/guides/apr-vs-interest-rate"],
    ["/guides/apr-for-refinance-comparison", "/guides/apr-vs-interest-rate"],
    ["/guides/apr-and-closing-costs", "/guides/apr-with-origination-fee"],
    ["/guides/apr-and-fees-origination-vs-closing", "/guides/apr-with-origination-fee"],
    ["/guides/apr-when-fees-are-financed", "/guides/apr-with-origination-fee"],
    ["/guides/apr-and-points-break-even", "/guides/discount-points-vs-lender-credits"],
    ["/guides/apr-and-term-length", "/guides/apr-comparison-checklist"],
    ["/guides/apr-and-prepayment", "/guides/apr-comparison-checklist"],
    ["/guides/credit-card-apr-vs-interest-rate", "/guides/how-to-use-apr-for-credit-cards"],
    ["/guides/credit-card-interest-apr-vs-daily", "/guides/how-to-use-apr-for-credit-cards"],
    ["/guides/credit-card-apr-promo-vs-standard", "/guides/how-to-use-apr-for-credit-cards"],
    ["/guides/credit-card-penalty-apr", "/guides/how-to-use-apr-for-credit-cards"],
    ["/guides/0-apr-credit-card-payoff-plan", "/guides/credit-card-payoff-strategy"],
    ["/guides/personal-loan-apr-comparison", "/guides/apr-by-loan-type"],
    ["/guides/auto-loan-apr-comparison", "/guides/apr-by-loan-type"],
    ["/guides/student-loan-apr-comparison", "/guides/apr-by-loan-type"],
    ["/guides/small-business-loan-apr-comparison", "/guides/apr-by-loan-type"]
  ]);

  const redirectMap = getStaticGuideRedirectMap();
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const [sourcePath, destinationPath] of expectedConsolidation) {
    if (redirectMap.get(sourcePath) !== destinationPath) {
      issues.push(`${sourcePath} -> expected redirect to ${destinationPath}`);
    }
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }

    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");
    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR consolidation drift detected:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR destination guides should keep trust signals and absorbed-intent coverage aligned", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/apr-vs-interest-rate.astro",
      phrase: "Use this guide when fee-heavy offers make APR look different from the stated rate",
      absorbedPhrases: ["refinance comparison", "upfront fees"]
    },
    {
      file: "src/pages/guides/apr-with-origination-fee.astro",
      phrase: "Use this guide when origination fees, closing costs, or financed fees change the real borrowing cost",
      absorbedPhrases: ["closing costs", "financed fees"]
    },
    {
      file: "src/pages/guides/how-to-use-apr-for-credit-cards.astro",
      phrase: "Use this guide when you are comparing credit card APR types, promo windows, or penalty-rate risk",
      absorbedPhrases: ["daily periodic rate", "promo APR", "penalty APR"]
    },
    {
      file: "src/pages/guides/apr-by-loan-type.astro",
      phrase: "Use this guide when you are comparing APR across auto, personal, student, or small-business loans",
      absorbedPhrases: ["auto loan", "personal loan", "student loan", "small business"]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    const sourceLower = source.toLowerCase();
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
    if (!source.includes(">References<")) {
      issues.push(`${item.file} -> missing References section`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }

    for (const phrase of item.absorbedPhrases) {
      if (!sourceLower.includes(phrase.toLowerCase())) {
        issues.push(`${item.file} -> missing absorbed intent phrase "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR destination trust alignment is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR support gate pages should separate discovery from final comparison checks", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/how-to-find-your-apr.astro",
      phrases: [
        "Start here before the APR calculator when the first job is simply locating the disclosed APR.",
        "Once you have the disclosed APR in hand, the next job is usually either calculator math or rate-versus-fee interpretation, not more source-hunting."
      ]
    },
    {
      file: "src/pages/guides/apr-comparison-checklist.astro",
      phrases: [
        "Use this guide as the final apples-to-apples check before you trust APR.",
        "If the main issue is one specific fee structure, move next to APR with origination fee or discount points vs lender credits."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR support-gate routing cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: refreshed APR pages should keep one routing job per page and a shared refresh date", () => {
  const expectedPages = [
    {
      file: "src/pages/topics/apr.astro",
      phrases: [
        "APR: choose the right comparison path",
        "Best starting point for most APR comparisons",
        "Start with the APR calculator when you already have the rate, term, loan amount, and fee assumptions."
      ]
    },
    {
      file: "src/pages/guides/how-to-find-your-apr.astro",
      phrases: [
        "Use this guide when you need to locate the exact APR that belongs in your comparison or payoff decision",
        "Start here before the APR calculator when the first job is simply locating the disclosed APR.",
        "Once you have the disclosed APR in hand, the next job is usually either calculator math or rate-versus-fee interpretation, not more source-hunting."
      ]
    },
    {
      file: "src/pages/guides/apr-vs-interest-rate.astro",
      phrases: [
        "Use this guide when fee-heavy offers make APR look different from the stated rate",
        "If you still need to find the official disclosed APR, go back to the APR source guide first."
      ]
    },
    {
      file: "src/pages/guides/apr-with-origination-fee.astro",
      phrases: [
        "Use this guide when origination fees, closing costs, or financed fees change the real borrowing cost",
        "Use the Loan Estimate to separate lender fees from third-party costs."
      ]
    },
    {
      file: "src/pages/guides/apr-by-loan-type.astro",
      phrases: [
        "Use this guide when you are comparing APR across auto, personal, student, or small-business loans",
        "Use the same loan amount and term for every offer."
      ]
    },
    {
      file: "src/pages/guides/how-to-use-apr-for-credit-cards.astro",
      phrases: [
        "Use this guide when you are comparing credit card APR types, promo windows, or penalty-rate risk",
        "If you are ready to test a payment plan next, move to the credit card payoff calculator."
      ]
    },
    {
      file: "src/pages/guides/apr-comparison-checklist.astro",
      phrases: [
        "Use this guide as the final apples-to-apples check before you trust APR.",
        "If the main issue is one specific fee structure, move next to APR with origination fee or discount points vs lender credits."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-24";

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }

    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(
        `${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`
      );
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR refresh alignment is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR balance-transfer support pages should keep a narrow fee-and-timeline job", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/apr-for-balance-transfers.astro",
      phrases: [
        "Use this guide when a balance-transfer offer looks cheap up front but the APR rules and fee timing may change the real payoff math",
        "If you already know the payment you can sustain and want a payoff answer, move next to the credit card payoff calculator.",
        "If you still need the broader APR-and-fee framework for card offers, go back to the APR-for-credit-cards guide first.",
        "We keep this page actively maintained as the balance-transfer support branch"
      ]
    },
    {
      file: "src/pages/guides/credit-card-balance-transfer-fee.astro",
      phrases: [
        "Use this page when transfer fee, promo length, and post-promo APR are the main decision inputs",
        "Balance transfer fee vs interest savings is the core comparison on this page.",
        "A 0% transfer can help, but the fee can offset the savings.",
        "If you still need the broader APR-and-fee framework for card offers, go back to the APR-for-credit-cards guide first.",
        "If you already know the payment you can sustain and want a payoff answer, move next to the credit card payoff calculator."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-25";

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR balance-transfer support routing cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR noindex source pages should behave like absorbed-intent feeders, not second main pages", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/apr-tool.astro",
      phrases: [
        "Use this support page when you searched for an APR tool but the real next step is the main APR calculator.",
        "If you still need the broader APR question map, go back to the APR topic hub first."
      ]
    },
    {
      file: "src/pages/guides/apr-calculator-payment.astro",
      phrases: [
        "Use this support page when the remaining question is why payment and APR do not move together.",
        "If you still need the broader rate-versus-fee comparison, go back to APR vs interest rate first."
      ]
    },
    {
      file: "src/pages/guides/apr-for-refinance-comparison.astro",
      phrases: [
        "Use this support page when the remaining APR question is refinance-specific fee alignment and break-even timing.",
        "If you still need the broader rate-versus-fee framing, go back to APR vs interest rate first."
      ]
    },
    {
      file: "src/pages/guides/apr-and-prepayment.astro",
      phrases: [
        "Use this support page when the only remaining APR question is how prepayment changes the cost picture.",
        "If you still need the broader final cross-check, go back to the APR comparison checklist first."
      ]
    },
    {
      file: "src/pages/guides/apr-and-term-length.astro",
      phrases: [
        "Use this support page when the only remaining APR question is how term length changes the comparison.",
        "If you still need the broader final cross-check, go back to the APR comparison checklist first."
      ]
    },
    {
      file: "src/pages/guides/apr-vs-interest-rate-fees.astro",
      phrases: [
        "Use this support page when you only need the fee-specific version of the rate-versus-APR question.",
        "If you need the stronger main explanation, go back to APR vs interest rate first."
      ]
    },
    {
      file: "src/pages/guides/apr-and-closing-costs.astro",
      phrases: [
        "Use this support page when the only remaining APR question is which closing costs sit outside the disclosed APR.",
        "If you need the stronger fee-structure guide, go back to APR with origination fee first."
      ]
    },
    {
      file: "src/pages/guides/apr-when-fees-are-financed.astro",
      phrases: [
        "Use this support page when financed-fee treatment is the only remaining origination-fee question.",
        "If you need the stronger fee-structure guide, go back to APR with origination fee first."
      ]
    },
    {
      file: "src/pages/guides/apr-and-fees-origination-vs-closing.astro",
      phrases: [
        "Use this support page when the remaining question is separating lender fees from broader closing costs.",
        "If you need the stronger fee-structure guide, go back to APR with origination fee first."
      ]
    },
    {
      file: "src/pages/guides/apr-and-points-break-even.astro",
      phrases: [
        "Use this support page when points-specific break-even is the only pricing question left.",
        "If you need the stronger points-versus-credits comparison, go back to discount points vs lender credits first."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-25";

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes('robots="noindex, follow"')) {
      issues.push(`${item.file} -> missing noindex guard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR noindex source-page feeder cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: trust registry and review-summary component should support the stronger author-review model", () => {
  const trustFile = join(process.cwd(), "src/config/trust.ts");
  const reviewCardFile = join(process.cwd(), "src/components/ReviewedByCard.astro");
  const issues: string[] = [];

  if (!existsSync(trustFile)) {
    issues.push("src/config/trust.ts -> missing trust registry");
  } else {
    const trustSource = readFileSync(trustFile, "utf8");
    for (const label of [
      "Practical Finance Tools Site Owner",
      "Practical Finance Tools Methodology Review",
      "Practical Finance Tools Editorial Review"
    ]) {
      if (!trustSource.includes(label)) {
        issues.push(`src/config/trust.ts -> missing "${label}"`);
      }
    }
  }

  const reviewCardSource = readFileSync(reviewCardFile, "utf8");
  if (!reviewCardSource.includes("Written by")) {
    issues.push("src/components/ReviewedByCard.astro -> missing Written by support");
  }
  if (!reviewCardSource.includes("Review scope")) {
    issues.push("src/components/ReviewedByCard.astro -> missing Review scope support");
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Trust registry/component support is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: trust pages should expose the shared responsibility model", () => {
  const expectedPages = [
    "src/pages/about.astro",
    "src/pages/editorial-policy.astro",
    "src/pages/methodology.astro",
    "src/pages/contact.astro"
  ];
  const issues: string[] = [];

  for (const file of expectedPages) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    if (!source.includes("TrustRoles")) {
      issues.push(`${file} -> missing TrustRoles`);
    }
    if (!source.includes("TRUST_PROFILES")) {
      issues.push(`${file} -> missing TRUST_PROFILES usage`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Trust-page responsibility coverage is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: site skeleton pages should share the June 24 refresh signal", () => {
  const expectedPages = [
    {
      file: "src/pages/index.astro",
      phrases: ["This homepage is maintained alongside the site-level trust pages", "Site maintenance signal"]
    },
    {
      file: "src/pages/topics/index.astro",
      phrases: ["This page is the top routing layer"]
    },
    {
      file: "src/pages/guides/index.astro",
      phrases: ["This page is the primary guide-entry layer"]
    },
    {
      file: "src/pages/calculators/index.astro",
      phrases: ["This page is the primary calculator-entry layer"]
    },
    {
      file: "src/pages/about.astro",
      phrases: ["This trust page is maintained to keep site-wide trust"]
    },
    {
      file: "src/pages/methodology.astro",
      phrases: ["This methodology page is maintained to keep site-wide methodology notes aligned"]
    },
    {
      file: "src/pages/editorial-policy.astro",
      phrases: ["This policy page is maintained with the rest of the site skeleton"]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch || lastUpdatedMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected lastUpdated constant 2026-06-24`);
    }
    if (!visibleDateMatch || visibleDateMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected visible Last updated 2026-06-24`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Site skeleton pages are not synchronized:\n${issues.join("\n")}` : ""
  );
});

test("SEO: footer should expose the main site-level entry points", () => {
  const source = readFileSync(join(process.cwd(), "src/layouts/BaseLayout.astro"), "utf8");
  const expectedLinks = [
    '/about',
    '/topics',
    '/calculators',
    '/guides',
    '/editorial-policy',
    '/methodology',
    '/contact'
  ];

  const missingLinks = expectedLinks.filter((href) => !source.includes(`href="${href}"`));

  assert.equal(
    missingLinks.length,
    0,
    missingLinks.length > 0 ? `Footer is missing key site-level links:\n${missingLinks.join("\n")}` : ""
  );
});

test("SEO: homepage should expose the trust and methodology entry points", () => {
  const source = readFileSync(join(process.cwd(), "src/pages/index.astro"), "utf8");
  const expectedLinks = [
    '/about',
    '/methodology',
    '/editorial-policy',
    '/contact'
  ];

  const missingLinks = expectedLinks.filter((href) => !source.includes(`href="${href}"`));

  assert.equal(
    missingLinks.length,
    0,
    missingLinks.length > 0 ? `Homepage is missing trust links:\n${missingLinks.join("\n")}` : ""
  );
});

test("SEO: core workflow pages and layouts should adopt the stronger trust model", () => {
  const layoutExpectations = [
    {
      file: "src/layouts/BaseLayout.astro",
      phrases: ["authorProfile", "reviewProfiles", "reviewedBy"]
    },
    {
      file: "src/layouts/CalculatorLayout.astro",
      phrases: ["authorProfile", "reviewProfiles", "reviewedBy"]
    }
  ];

  const corePages = [
    "src/pages/index.astro",
    "src/pages/topics/apr.astro",
    "src/pages/topics/credit-cards.astro",
    "src/pages/topics/mortgage-payoff.astro",
    "src/pages/topics/refinance.astro",
    "src/pages/topics/debt-to-income.astro",
    "src/pages/topics/rent-vs-buy.astro",
    "src/pages/calculators/apr-calculator.astro",
    "src/pages/calculators/credit-card-payoff-calculator.astro",
    "src/pages/calculators/minimum-payment-payoff-calculator.astro",
    "src/pages/calculators/mortgage-payment-calculator.astro",
    "src/pages/calculators/extra-payment-calculator.astro",
    "src/pages/calculators/biweekly-mortgage-payment-calculator.astro",
    "src/pages/calculators/additional-principal-payment-calculator.astro"
  ];

  const issues: string[] = [];

  for (const item of layoutExpectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}" support`);
      }
    }
  }

  for (const file of corePages) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    if (!source.includes("TRUST_PROFILES")) {
      issues.push(`${file} -> missing TRUST_PROFILES usage`);
    }
    if (!source.includes("writtenBy=")) {
      issues.push(`${file} -> missing writtenBy= trust summary`);
    }
    if (!source.includes("reviewScope=")) {
      issues.push(`${file} -> missing reviewScope= trust summary`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Core trust-model rollout is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: indexable extra-payment support guides should not be globally excluded from the sitemap", () => {
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const indexableSupportGuides = [
    "/guides/extra-payment-accelerated-plan",
    "/guides/extra-payment-liquidity-reserve",
    "/guides/extra-payment-lump-sum-vs-monthly",
    "/guides/extra-payment-priority-vs-other-debts",
    "/guides/extra-payment-target-payoff-date",
    "/guides/extra-payment-vs-refinance",
    "/guides/extra-payment-windfall-strategy"
  ];
  const issues: string[] = [];

  if (astroConfigSource.includes("/^\\/guides\\/extra-payment-/")) {
    issues.push("astro.config.mjs -> generic /^\\/guides\\/extra-payment-/ sitemap exclusion still present");
  }

  for (const path of indexableSupportGuides) {
    const routeFile = `src/pages${path}.astro`;
    const pageSource = readFileSync(join(process.cwd(), routeFile), "utf8");

    if (pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${routeFile} -> unexpectedly marked noindex`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Indexable extra-payment support pages are still blocked from sitemap coverage:\n${issues.join("\n")}` : ""
  );
});

test("SEO: indexable extra-payment support guides should keep distinct strategy roles and strong trust coverage", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/extra-payment-target-payoff-date.astro",
      phrases: [
        "reverse-engineer the monthly extra",
        "monthly ceiling",
        "target date can survive a bad month"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-accelerated-plan.astro",
      phrases: [
        "third-party acceleration plan",
        "same annual dollars on your own",
        "fee drag"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-liquidity-reserve.astro",
      phrases: [
        "extra principal is the wrong move",
        "reserve floor",
        "pause the extra payment plan"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-windfall-strategy.astro",
      phrases: [
        "windfall split before it becomes a principal payment",
        "tax bill, reserve rebuild, or near-term spending",
        "lump sum versus staged extra payments"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-priority-vs-other-debts.astro",
      phrases: [
        "mortgage prepayment is not automatically the top priority",
        "Highest guaranteed return is not the only filter",
        "Revolving debt, reserve weakness, or near-term cash risk"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing role cue "${phrase}"`);
      }
    }

    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard`);
    }
    if (!source.includes('authorProfile={TRUST_PROFILES.siteOwner}')) {
      issues.push(`${item.file} -> missing authorProfile trust binding`);
    }
    if (!source.includes('reviewProfiles={[TRUST_PROFILES.editorialReview, TRUST_PROFILES.methodologyReview]}')) {
      issues.push(`${item.file} -> missing reviewProfiles trust binding`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    }
    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    }
    if (lastUpdatedMatch && visibleDateMatch && lastUpdatedMatch[1] !== visibleDateMatch[1]) {
      issues.push(`${item.file} -> visible Last updated date ${visibleDateMatch[1]} does not match lastUpdated ${lastUpdatedMatch[1]}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Extra-payment support originality coverage is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: narrow extra-payment support leaves should stay consolidated as noindex support pages", () => {
  const supportLeaves = [
    "/guides/extra-payment-escrow-not-affected",
    "/guides/extra-payment-tax-deduction-impact",
    "/guides/extra-payment-servicer-posting-rules",
    "/guides/extra-payment-prepayment-penalty-checklist"
  ];
  const astroConfigSource = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf8");
  const issues: string[] = [];

  for (const sourcePath of supportLeaves) {
    if (!astroConfigSource.includes(`"${sourcePath}"`)) {
      issues.push(`${sourcePath} -> missing sitemap exclusion`);
    }

    const filePath = join(process.cwd(), "src", "pages", `${sourcePath.slice(1)}.astro`);
    const pageSource = readFileSync(filePath, "utf8");

    if (!pageSource.includes('robots="noindex, follow"')) {
      issues.push(`${sourcePath} -> missing source-page noindex guard`);
    }
  }

  const roleExpectations = [
    {
      file: "src/pages/guides/extra-payment-escrow-not-affected.astro",
      phrase: "support page for one narrow misunderstanding"
    },
    {
      file: "src/pages/guides/extra-payment-tax-deduction-impact.astro",
      phrase: "support page for a tax-aware edge case"
    },
    {
      file: "src/pages/guides/extra-payment-servicer-posting-rules.astro",
      phrase: "support page for one narrow operational question"
    },
    {
      file: "src/pages/guides/extra-payment-prepayment-penalty-checklist.astro",
      phrase: "support page for one narrow note-review question"
    }
  ];

  for (const item of roleExpectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing support-only role cue "${item.phrase}"`);
    }
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${item.file} -> missing ReviewedByCard trust coverage`);
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch || lastUpdatedMatch[1] !== "2026-06-26") {
      issues.push(`${item.file} -> expected lastUpdated 2026-06-26`);
    }
    if (!visibleDateMatch || visibleDateMatch[1] !== "2026-06-26") {
      issues.push(`${item.file} -> expected visible Last updated 2026-06-26`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Narrow extra-payment leaves are not yet consolidated:\n${issues.join("\n")}` : ""
  );
});

test("SEO: remaining calculators should adopt the phase-2 trust model", () => {
  const remainingCalculators = [
    "src/pages/calculators/debt-snowball-calculator.astro",
    "src/pages/calculators/debt-avalanche-calculator.astro",
    "src/pages/calculators/debt-to-income-calculator.astro",
    "src/pages/calculators/rent-vs-buy-calculator.astro",
    "src/pages/calculators/amortization-schedule-calculator.astro"
  ];
  const issues: string[] = [];

  for (const file of remainingCalculators) {
    const source = readFileSync(join(process.cwd(), file), "utf8");

    if (!source.includes("TRUST_PROFILES")) {
      issues.push(`${file} -> missing TRUST_PROFILES usage`);
    }
    if (!source.includes("writtenBy=")) {
      issues.push(`${file} -> missing writtenBy= trust summary`);
    }
    if (!source.includes("reviewScope=")) {
      issues.push(`${file} -> missing reviewScope= trust summary`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Phase 2 calculator trust deployment is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: calculators/topics/guides index pages should expose the stronger trust navigation model", () => {
  const indexPages = [
    "src/pages/calculators/index.astro",
    "src/pages/topics/index.astro",
    "src/pages/guides/index.astro"
  ];
  const issues: string[] = [];

  for (const file of indexPages) {
    const source = readFileSync(join(process.cwd(), file), "utf8");

    if (!source.includes("TRUST_PROFILES")) {
      issues.push(`${file} -> missing TRUST_PROFILES usage`);
    }
    if (!source.includes("ReviewedByCard")) {
      issues.push(`${file} -> missing ReviewedByCard trust summary`);
    }
    if (!source.includes("authorProfile=")) {
      issues.push(`${file} -> missing authorProfile metadata`);
    }
    if (!source.includes("reviewProfiles=")) {
      issues.push(`${file} -> missing reviewProfiles metadata`);
    }
    if (!source.includes("reviewScope=")) {
      issues.push(`${file} -> missing reviewScope= trust summary`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Index trust navigation coverage is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: skeleton trust and routing pages should show the June 24 site-level refresh", () => {
  const expectations = [
    {
      file: "src/pages/topics/index.astro",
      phrase: "primary topic-entry layer for the active finance clusters"
    },
    {
      file: "src/pages/guides/index.astro",
      phrase: "primary guide-entry layer for the active finance workflows"
    },
    {
      file: "src/pages/calculators/index.astro",
      phrase: "primary calculator-entry layer for the active finance workflows"
    },
    {
      file: "src/pages/about.astro",
      phrase: "site-wide trust, maintenance, and disclosure expectations aligned"
    },
    {
      file: "src/pages/methodology.astro",
      phrase: "site-wide methodology notes aligned with the active calculator workflows"
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch || lastUpdatedMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected lastUpdated constant 2026-06-24`);
    }

    if (!visibleDateMatch || visibleDateMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected visible Last updated 2026-06-24`);
    }

    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Skeleton-page trust refresh is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: high-impression entry pages should show the June 24 entry refresh", () => {
  const expectations = [
    {
      file: "src/pages/calculators/apr-calculator.astro",
      phrase: "actively maintained as a high-impression APR entry page"
    },
    {
      file: "src/pages/calculators/minimum-payment-payoff-calculator.astro",
      phrase: "actively maintained as a high-impression minimum-payment entry page"
    },
    {
      file: "src/pages/calculators/extra-payment-calculator.astro",
      phrase: "actively maintained as a high-impression extra-payment entry page"
    },
    {
      file: "src/pages/calculators/biweekly-mortgage-payment-calculator.astro",
      phrase: "actively maintained as a high-impression biweekly entry page"
    },
    {
      file: "src/pages/guides/how-credit-card-interest-is-calculated.astro",
      phrase: "actively maintained as a high-impression credit-card interest entry page"
    },
    {
      file: "src/pages/guides/extra-mortgage-payments.astro",
      phrase: "actively maintained as a high-impression mortgage-payoff entry page"
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    const lastUpdatedMatch = source.match(/lastUpdated(?:=| = )"(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch || lastUpdatedMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected lastUpdated 2026-06-24`);
    }

    if (!visibleDateMatch || visibleDateMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected visible Last updated 2026-06-24`);
    }

    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `High-impression entry refresh is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: core topic hubs should show the June 24 routing refresh", () => {
  const expectations = [
    {
      file: "src/pages/topics/apr.astro",
      phrase: "actively maintained as the primary APR topic hub for rate-versus-fee, disclosure, and credit-card branch routing"
    },
    {
      file: "src/pages/topics/credit-cards.astro",
      phrase: "actively maintained as the primary credit-card payoff topic hub for statement-math, minimum-payment, promo, and multi-balance routing"
    },
    {
      file: "src/pages/topics/mortgage-payoff.astro",
      phrase: "actively maintained as the primary mortgage-payoff topic hub for baseline payment, extra principal, biweekly, and servicing branches"
    },
    {
      file: "src/pages/topics/rent-vs-buy.astro",
      phrase: "actively maintained as the primary rent-versus-buy topic hub for break-even, affordability, ownership-cost, and sensitivity routing"
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const reviewedOnMatch = source.match(/reviewedOn="(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch || lastUpdatedMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected lastUpdated 2026-06-24`);
    }

    if (!reviewedOnMatch || reviewedOnMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected reviewedOn 2026-06-24`);
    }

    if (!visibleDateMatch || visibleDateMatch[1] !== "2026-06-24") {
      issues.push(`${item.file} -> expected visible Last updated 2026-06-24`);
    }

    if (!source.includes(item.phrase)) {
      issues.push(`${item.file} -> missing "${item.phrase}"`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Core topic-hub June 24 refresh is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: refinance topic hub should align with the June 24 parent-guide refresh", () => {
  const file = "src/pages/topics/refinance.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  const expectedPhrases = [
    "Break-even guide",
    "Closing costs guide",
    "Refinance checklist",
    "The three strongest refinance starting points are now the break-even guide, the closing-costs guide, and the refinance checklist.",
    "We keep this page actively maintained as the primary refinance topic hub for break-even, cost-control, execution, and alternative-path routing"
  ];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing "${phrase}"`);
    }
  }

  const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  const reviewedOnMatch = source.match(/reviewedOn="(\d{4}-\d{2}-\d{2})"/);
  const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

  if (!lastUpdatedMatch || lastUpdatedMatch[1] !== "2026-06-24") {
    issues.push(`${file} -> expected lastUpdated 2026-06-24`);
  }
  if (!reviewedOnMatch || reviewedOnMatch[1] !== "2026-06-24") {
    issues.push(`${file} -> expected reviewedOn 2026-06-24`);
  }
  if (!visibleDateMatch || visibleDateMatch[1] !== "2026-06-24") {
    issues.push(`${file} -> expected visible Last updated 2026-06-24`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Refinance topic-parent refresh is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: rewritten workflow pages should declare distinct page roles", () => {
  const pageExpectations = [
    {
      file: "src/pages/calculators/index.astro",
      phrases: [
        "Start with the question you are trying to answer",
        "I want to compare two loan offers",
        "I want to know whether an extra mortgage payment is realistic"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-accelerated-plan.astro",
      phrases: [
        "third-party acceleration plan",
        "same annual dollars on your own",
        "fee drag"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-liquidity-reserve.astro",
      phrases: [
        "extra principal is the wrong move",
        "reserve floor",
        "pause the extra payment plan"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-target-payoff-date.astro",
      phrases: [
        "reverse-engineer the monthly extra",
        "monthly ceiling",
        "target date can survive a bad month"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-vs-refinance.astro",
      phrases: [
        "same hold period",
        "decision can flip",
        "new loan solves a different problem"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-lump-sum-vs-monthly.astro",
      phrases: [
        "timing of equal dollars",
        "total dollars are already fixed",
        "equal dollars, different posting times, same loan baseline"
      ]
    }
  ];
  const issues: string[] = [];

  for (const item of pageExpectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing page-role cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Workflow pages still read too generically:\n${issues.join("\n")}` : ""
  );
});

test("SEO: extra-payment entry pages should behave like primary workflow hubs", () => {
  const expectedPages = [
    {
      file: "src/pages/calculators/extra-payment-calculator.astro",
      phrases: [
        "Choose the scenario that matches the real decision",
        "I need to know whether extra payments are realistic in my budget",
        "I want to compare extra payments with refinancing or recasting"
      ]
    },
    {
      file: "src/pages/guides/extra-mortgage-payments.astro",
      phrases: [
        "Use this guide when extra principal is the main mortgage decision",
        "Which extra-payment question are you actually trying to answer?",
        "This page should send you to the next best extra-payment page"
      ]
    }
  ];
  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing workflow-hub cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Extra-payment hubs still read like generic support pages:\n${issues.join("\n")}` : ""
  );
});

test("SEO: minimum-payment entry pages should behave like a tool-plus-explainer workflow", () => {
  const expectedPages = [
    {
      file: "src/pages/calculators/minimum-payment-payoff-calculator.astro",
      phrases: [
        "Read these 3 numbers first",
        "Choose the question behind the minimum-payment problem",
        "I need to see why the minimum barely moves the balance",
        "What should you do next?"
      ]
    },
    {
      file: "src/pages/guides/why-minimum-payments-take-so-long.astro",
      phrases: [
        "Use this guide when the minimum-payment warning feels abstract",
        "This page should explain the drag before you set a new payment target",
        "Which minimum-payment question are you really trying to solve?"
      ]
    }
  ];
  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing workflow cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Minimum-payment workflow still reads like disconnected pages:\n${issues.join("\n")}` : ""
  );
});

test("SEO: wave-1 credit-card pages should declare the right starting point and next-step boundaries", () => {
  const expectations = [
    {
      file: "src/pages/calculators/minimum-payment-payoff-calculator.astro",
      phrases: [
        "Use this calculator when the statement minimum is the number driving your plan",
        "If your real problem is why the statement interest charge looks wrong, start with the",
        "If you already know the payment you can commit to each month, go straight to the fixed-payment payoff calculator."
      ]
    },
    {
      file: "src/pages/calculators/credit-card-payoff-calculator.astro",
      phrases: [
        "Start here when you already know the monthly payment you can realistically sustain.",
        "If the statement minimum is still the number driving your plan, go back to the minimum payment calculator first.",
        "If the statement math looks wrong before you even pick a payment, use the interest explainer first."
      ]
    },
    {
      file: "src/pages/guides/how-credit-card-interest-is-calculated.astro",
      phrases: [
        "Use this guide before a payoff calculator when the statement math itself is the confusing part.",
        "Why your statement doesn't match balance x APR / 12",
        "If the statement minimum is the main issue, move next to the minimum payment payoff calculator.",
        "If you already trust the statement math and just need a payoff date, switch to the fixed-payment payoff calculator."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Wave-1 credit-card entry boundaries are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: wave-1 support pages should route APR and credit-card users into the correct next step", () => {
  const expectations = [
    {
      file: "src/pages/guides/credit-card-payoff-strategy.astro",
      phrases: [
        "Use this page when the payoff decision is bigger than one confusing statement line but smaller than a full multi-debt strategy overhaul.",
        "If the statement math itself still looks wrong, go back to the interest explainer before choosing a payoff tactic.",
        "If you already know the fixed payment you can sustain, skip strategy talk and move straight to the payoff calculator."
      ]
    },
    {
      file: "src/pages/guides/how-to-find-your-apr.astro",
      phrases: [
        "Start here before the APR calculator when the first job is simply locating the disclosed APR.",
        "If you already have the disclosed APR, rate, term, and fee assumptions, move next to the APR calculator.",
        "If your real confusion is why the APR is higher than the note rate, switch to APR vs interest rate next."
      ]
    },
    {
      file: "src/pages/guides/apr-vs-interest-rate.astro",
      phrases: [
        "Use this guide when the quote looks cheaper on rate but more expensive once fees are included.",
        "If you still need to find the official disclosed APR, go back to the APR source guide first.",
        "If you already have the rate, term, and fee inputs lined up, move straight to the APR calculator."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing support-page routing cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Wave-1 support pages are not routing tightly enough:\n${issues.join("\n")}` : ""
  );
});

test("SEO: biweekly pages should behave like a comparison workflow, not generic mortgage support", () => {
  const expectedPages = [
    {
      file: "src/pages/calculators/biweekly-mortgage-payment-calculator.astro",
      phrases: [
        "Choose the biweekly comparison you actually need",
        "I need to know if the lender posts every two weeks or only monthly",
        "I just want the simplest no-fee alternative"
      ]
    },
    {
      file: "src/pages/guides/biweekly-vs-extra-principal.astro",
      phrases: [
        "Use this guide when the headline savings claim sounds too neat",
        "Which biweekly question are you actually trying to answer?",
        "This page should send you to the next best biweekly page"
      ]
    }
  ];
  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing workflow cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Biweekly workflow still reads too generically:\n${issues.join("\n")}` : ""
  );
});

test("SEO: biweekly support pages should route fee-check and timing-pattern users into the right next page", () => {
  const expectedPages = [
    {
      file: "src/pages/guides/biweekly-mortgage-program-fees.astro",
      phrases: [
        "Use this support page for the fee-check question.",
        "If you still need the bigger comparison between biweekly timing and plain extra principal, start with biweekly vs extra principal.",
        "If you only need the payoff math, compare the same loan in the biweekly calculator and the extra payment calculator."
      ]
    },
    {
      file: "src/pages/guides/one-extra-mortgage-payment-per-year.astro",
      phrases: [
        "Use this support page for the common \"one extra payment\" payoff pattern.",
        "If you are still deciding whether extra principal fits your plan at all, go back to the main extra mortgage payments guide and then return here when the timing pattern is the real question.",
        "If you are deciding whether a paid biweekly program is worth it, switch to the biweekly mortgage program fees guide.",
        "If you already know the amount and timing you want to test, jump into the extra payment calculator."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectedPages) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing biweekly support cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Biweekly support pages are not routing tightly enough:\n${issues.join("\n")}` : ""
  );
});

test("SEO: credit-card topic hub should declare the strongest starting point and when to branch away from it", () => {
  const file = "src/pages/topics/credit-cards.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const expectedPhrases = [
    "Best starting point for most single-card payoff plans",
    "Start with the credit card payoff calculator when you already know the monthly payment you can sustain.",
    "If the statement minimum is still the main number driving the plan, start with the minimum payment calculator instead.",
    "If the statement interest line itself looks wrong, start with the interest explainer before using a payoff calculator."
  ];

  const issues: string[] = [];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing topic-hub starting-point cue "${phrase}"`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Credit-card topic hub still needs a clearer strongest-start signal:\n${issues.join("\n")}` : ""
  );
});

test("SEO: credit-card cluster consolidation should keep the hub, parent guides, and support pages in distinct roles", () => {
  const expectations = [
    {
      file: "src/pages/topics/credit-cards.astro",
      phrases: [
        "primary credit-card payoff topic hub",
        "Start with the credit card payoff calculator when you already know the monthly payment you can sustain.",
        "If the statement minimum is still the main number driving the plan, start with the minimum payment calculator instead.",
        'const lastUpdated = "2026-06-24"'
      ]
    },
    {
      file: "src/pages/guides/how-credit-card-interest-is-calculated.astro",
      phrases: [
        "high-impression credit-card interest entry page",
        "Use this guide when the statement math looks wrong",
        "Once the statement behavior makes sense, the next step is usually either minimum-rule modeling or fixed-payment planning.",
        'lastUpdated = "2026-06-24"'
      ]
    },
    {
      file: "src/pages/guides/credit-card-payoff-strategy.astro",
      phrases: [
        "main payoff decision hub",
        "Use this page when the payoff decision is bigger than one confusing statement line but smaller than a full multi-debt strategy overhaul.",
        "If the statement math itself still looks wrong, go back to the interest explainer before choosing a payoff tactic.",
        'lastUpdated = "2026-06-24"'
      ]
    },
    {
      file: "src/pages/guides/credit-card-apr-promo-vs-standard.astro",
      phrases: [
        "promo APR vs standard APR",
        "Use this guide when promo APR timing, balance transfer fees, or penalty-rate risk can change which card is actually cheaper.",
        "If you are ready to test a payment plan next, move to the credit card payoff calculator."
      ]
    },
    {
      file: "src/pages/guides/credit-card-balance-transfer-fee.astro",
      phrases: [
        "balance transfer fee vs interest savings",
        "A 0% transfer can help, but the fee can offset the savings.",
        "Use this page when transfer fee, promo length, and post-promo APR are the main decision inputs."
      ]
    },
    {
      file: "src/pages/guides/credit-card-payoff-fixed-vs-minimum.astro",
      phrases: [
        "Fixed payment vs minimum payment payoff",
        "For one balance, fixed payments are simple. For multiple balances, snowball or avalanche can be more effective.",
        "Use this page when the question is whether a fixed amount beats the minimum."
      ]
    },
    {
      file: "src/pages/guides/credit-card-payoff-payment-target.astro",
      phrases: [
        "Set a credit card payoff payment target",
        "A payment target turns a balance into a timeline.",
        "Use this page when the next job is to choose a realistic monthly amount, not a payoff method."
      ]
    },
    {
      file: "src/pages/guides/credit-card-payoff-order.astro",
      phrases: [
        "Credit card payoff order",
        "There are two common payoff orders: highest APR first (avalanche) and smallest balance first (snowball).",
        "Use this page when multiple balances are already competing for the same payoff dollars."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Credit-card cluster role separation is missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: narrower credit-card support pages should keep a single decision job and a clean handoff", () => {
  const expectations = [
    {
      file: "src/pages/guides/credit-card-apr-vs-interest-rate.astro",
      phrases: [
        "Use this guide when the quote looks cheaper on rate but more expensive once fees are included.",
        "If you still need to find the official disclosed APR, go back to the APR source guide first.",
        "If you already have the rate, term, and fee inputs lined up, move straight to the APR calculator."
      ]
    },
    {
      file: "src/pages/guides/credit-card-interest-apr-vs-daily.astro",
      phrases: [
        "Use this guide when monthly APR estimates and daily balance interest do not match.",
        "If you need statement-level accuracy, align the cycle dates and payment posting schedule.",
        "If you need payoff math next, go back to the interest calculation guide first."
      ]
    },
    {
      file: "src/pages/guides/credit-card-interest-calculator-payoff.astro",
      phrases: [
        "Use this guide when interest feels like it is swallowing the payment.",
        "If you need the broader payoff method choice, go back to the payoff strategy guide first.",
        "If you already know the monthly payment you can sustain, go straight to the payoff calculator."
      ]
    },
    {
      file: "src/pages/guides/credit-card-payment-payoff-calculator.astro",
      phrases: [
        "Use this guide when you are trying to choose the monthly payment input for the payoff calculator.",
        "If you already know the payment target, jump straight to the calculator instead of rereading setup steps.",
        "If your real question is method choice, go back to the payoff strategy guide first."
      ]
    },
    {
      file: "src/pages/guides/calculate-credit-card-payoff.astro",
      phrases: [
        "Use this guide when you want the calculation steps, not the payoff method choice.",
        "If you already have the balance, APR, and payment, use the calculator instead of redoing setup math.",
        "If you still need the broader payoff method, go back to the payoff strategy guide first."
      ]
    },
    {
      file: "src/pages/guides/credit-card-payoff-timeline.astro",
      phrases: [
        "Use this guide when the only question left is how long the current payment pattern will take.",
        "If you need a new payoff method, go back to the payoff strategy guide first.",
        "If you need a payment amount, go to the payment target page first."
      ]
    },
    {
      file: "src/pages/guides/0-apr-credit-card-payoff-plan.astro",
      phrases: [
        "Use this guide when the promo deadline is the main risk.",
        "If you still need the broader comparison, go back to the APR promo vs standard guide first.",
        "If you already know the payment target, use the payoff calculator next."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Narrow credit-card support pages are still too broad:\n${issues.join("\n")}` : ""
  );
});

test("SEO: remaining credit-card feeder pages should read like support pages and share the June 26 refresh", () => {
  const expectations = [
    {
      file: "src/pages/guides/credit-card-apr-vs-interest-rate.astro",
      phrases: [
        "Use this support page when fee-heavy card offers need a rate-versus-APR check before payoff math.",
        "If you still need the broader credit-card APR branch, go back to the APR-for-credit-cards guide first."
      ]
    },
    {
      file: "src/pages/guides/credit-card-interest-apr-vs-daily.astro",
      phrases: [
        "Use this support page when monthly APR estimates and daily balance interest do not match.",
        "If you need statement-level accuracy, align the cycle dates and payment posting schedule."
      ]
    },
    {
      file: "src/pages/guides/credit-card-interest-calculator-payoff.astro",
      phrases: [
        "Use this support page when interest feels like it is swallowing the payment.",
        "If you need the broader payoff method choice, go back to the payoff strategy guide first."
      ]
    },
    {
      file: "src/pages/guides/credit-card-payment-payoff-calculator.astro",
      phrases: [
        "Use this support page when you are trying to choose the monthly payment input for the payoff calculator.",
        "If you already know the payment target, jump straight to the calculator instead of rereading setup steps."
      ]
    },
    {
      file: "src/pages/guides/credit-card-payoff-timeline.astro",
      phrases: [
        "Use this support page when the only question left is how long the current payment pattern will take.",
        "If you need a new payoff method, go back to the payoff strategy guide first."
      ]
    },
    {
      file: "src/pages/guides/calculate-credit-card-payoff.astro",
      phrases: [
        "Use this support page when you want the calculation steps, not the payoff method choice.",
        "If you already have the balance, APR, and payment, use the calculator instead of redoing setup math."
      ]
    },
    {
      file: "src/pages/guides/0-apr-credit-card-payoff-plan.astro",
      phrases: [
        "Use this support page when the promo deadline is the main risk.",
        "If you still need the broader comparison, go back to the APR promo vs standard guide first."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-26";

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes('robots="noindex, follow"')) {
      issues.push(`${item.file} -> missing noindex guard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Remaining credit-card feeder cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: extra-mortgage-payments hub should keep its next steps inside the extra-payment decision cluster", () => {
  const file = "src/pages/guides/extra-mortgage-payments.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const issues: string[] = [];

  if (source.includes('/calculators/rent-vs-buy-calculator')) {
    issues.push(`${file} -> next-step cluster is diluted by rent-vs-buy calculator`);
  }
  if (source.includes('/guides/rent-vs-buy-break-even')) {
    issues.push(`${file} -> next-step cluster is diluted by rent-vs-buy break-even guide`);
  }
  if (!source.includes('/guides/one-extra-mortgage-payment-per-year')) {
    issues.push(`${file} -> missing one-extra-payment support path in the extra-payment cluster`);
  }
  if (!source.includes('/guides/extra-payment-vs-refinance')) {
    issues.push(`${file} -> missing extra-payment-vs-refinance path in the extra-payment cluster`);
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Extra-payment hub next steps still leak outside the cluster:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payoff support feeders should hand off cleanly to stronger parent guides", () => {
  const expectations = [
    {
      file: "src/pages/guides/biweekly-mortgage-program-fees.astro",
      phrases: [
        "Use this support page when fee drag or delayed posting is the only biweekly question left.",
        "If you still need the broader no-fee comparison, go back to biweekly vs extra principal first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-accelerated-plan.astro",
      phrases: [
        "Use this support page when a third-party acceleration plan is being sold as a convenience layer.",
        "If you still need the broader same-dollars comparison, go back to biweekly vs extra principal first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-liquidity-reserve.astro",
      phrases: [
        "Use this support page when reserve strength is the only reason an extra-payment plan may fail.",
        "If you still need the main extra-principal framework, go back to extra mortgage payments first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-priority-vs-other-debts.astro",
      phrases: [
        "Use this support page when one extra dollar has to compete across the mortgage, cards, and cash reserves.",
        "If you still need the broader mortgage-payoff-versus-investing frame, go back to pay off mortgage early or invest first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-windfall-strategy.astro",
      phrases: [
        "Use this support page when a one-time windfall is the only extra-payment timing question left.",
        "If you still need the broader timing comparison, go back to lump sum vs monthly first."
      ]
    },
    {
      file: "src/pages/guides/mortgage-payment-affordability-checklist.astro",
      phrases: [
        "Use this support page when the payment formula is already clear and the remaining question is affordability pressure.",
        "If you still need the baseline mortgage math, go back to how mortgage payments are calculated first."
      ]
    },
    {
      file: "src/pages/guides/principal-and-interest-vs-escrow.astro",
      phrases: [
        "Use this support page when the remaining question is whether a payment change came from escrow or from the loan itself.",
        "If you still need the full housing-payment breakdown, go back to What is PITI? first."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing feeder handoff cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payoff support feeders are still acting like peer destinations:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage-payoff parent guides should absorb the feeder decision jobs", () => {
  const expectations = [
    {
      file: "src/pages/guides/biweekly-vs-extra-principal.astro",
      phrases: [
        "third-party acceleration plans should be measured against the same annual dollars sent on your own",
        "program fees and delayed posting can erase most of the claimed biweekly edge"
      ]
    },
    {
      file: "src/pages/guides/extra-mortgage-payments.astro",
      phrases: [
        "set a reserve floor before you lock in an aggressive extra-payment amount",
        "pause the plan when the next bad month would force you back onto higher-cost debt"
      ]
    },
    {
      file: "src/pages/guides/extra-payment-lump-sum-vs-monthly.astro",
      phrases: [
        "Use the windfall page if the cash itself is the decision",
        "Keep the comparison clean: equal dollars, different posting times, same loan baseline"
      ]
    },
    {
      file: "src/pages/guides/pay-off-mortgage-early-or-invest.astro",
      phrases: [
        "mortgage prepayment may lose priority when higher-rate debt or reserve weakness still exists",
        "the best use of the next extra dollar can differ from the best long-run return story"
      ]
    },
    {
      file: "src/pages/guides/how-mortgage-payments-are-calculated.astro",
      phrases: [
        "the formula is only the starting point if the real issue is whether the payment still fits the household budget",
        "use the affordability checklist after the payment math is stable"
      ]
    },
    {
      file: "src/pages/guides/what-is-piti.astro",
      phrases: [
        "principal and interest can stay flat while escrow changes the total payment",
        "use this breakdown before treating a statement increase as a loan-rate problem"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing absorbed-parent cue "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage-payoff parent guides have not absorbed the feeder jobs cleanly:\n${issues.join("\n")}` : ""
  );
});

test("SEO: remaining mortgage support pages should read like narrow feeders and share the June 26 refresh", () => {
  const expectations = [
    {
      file: "src/pages/guides/principal-only-extra-payments.astro",
      phrases: [
        "Use this support page when principal posting is the main question.",
        "If you still need to compare monthly extras, lump sums, or biweekly paths, move next to the extra mortgage payments guide."
      ]
    },
    {
      file: "src/pages/guides/mortgage-recast-vs-extra-payments.astro",
      phrases: [
        "Use this support page when lower required payments matter more than a faster payoff.",
        "If you already want to quantify the extra-principal path, move next to the extra payment calculator for side-by-side modeling."
      ]
    },
    {
      file: "src/pages/guides/one-extra-mortgage-payment-per-year.astro",
      phrases: [
        'Use this support page for the common "one extra payment" payoff pattern.',
        "If you are still deciding whether extra principal fits your plan at all, go back to the main extra mortgage payments guide and then return here when the timing pattern is the real question."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-26";

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes('robots="noindex, follow"')) {
      issues.push(`${item.file} -> missing noindex guard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Remaining mortgage feeder cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: redirected mortgage calculator-intent guides should behave like absorbed tool feeders and share the June 26 refresh", () => {
  const expectations = [
    {
      file: "src/pages/guides/extra-mortgage-payment-calculator.astro",
      phrases: [
        "Use this support page when you searched for an extra mortgage payment calculator and the real next step is the main extra payment calculator.",
        "If you need the broader extra-principal workflow instead of the tool itself, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/calculate-mortgage-payoff-with-additional-principal-payments.astro",
      phrases: [
        "Use this support page when you want the payoff workflow steps before moving into the calculator.",
        "If you already know the extra amount you want to test, go straight to the extra payment calculator instead of rereading the setup."
      ]
    },
    {
      file: "src/pages/guides/mortgage-extra-principal-calculator.astro",
      phrases: [
        "Use this support page when you searched for a mortgage extra principal calculator and need the right calculator branch first.",
        "If the question is a lump sum or principal-only posting, move to the additional principal payment calculator next."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-26";

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes('robots="noindex, follow"')) {
      issues.push(`${item.file} -> missing noindex guard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Redirected mortgage tool feeders still read too broadly:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mortgage amount-template guides should behave like noindex sample branches and share the June 26 refresh", () => {
  const expectations = [
    {
      file: "src/pages/guides/pay-50-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a small-dollar monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/pay-100-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $100 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/mortgage-lump-sum-5000.astro",
      phrases: [
        "Use this support page when you want a $5,000 lump-sum example, not the broader timing or liquidity framework.",
        "If you still need the broader lump-sum-versus-monthly comparison, go back to lump sum vs monthly first."
      ]
    },
    {
      file: "src/pages/guides/mortgage-lump-sum-10000.astro",
      phrases: [
        "Use this support page when you want a $10,000 lump-sum example, not the broader timing or opportunity-cost framework.",
        "If you still need the broader early-payoff-versus-investing frame, go back to pay off mortgage early or invest first."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-26";

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes('robots="noindex, follow"')) {
      issues.push(`${item.file} -> missing noindex guard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mortgage amount-template guides still read too broadly:\n${issues.join("\n")}` : ""
  );
});

test("SEO: mid-range mortgage amount templates should also read like noindex sample branches and share the June 26 refresh", () => {
  const expectations = [
    {
      file: "src/pages/guides/pay-150-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $150 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/pay-200-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $200 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/pay-250-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $250 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-26";

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes('robots="noindex, follow"')) {
      issues.push(`${item.file} -> missing noindex guard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Mid-range mortgage amount templates still read too broadly:\n${issues.join("\n")}` : ""
  );
});

test("SEO: larger mortgage amount templates should also read like noindex sample branches and share the June 26 refresh", () => {
  const expectations = [
    {
      file: "src/pages/guides/pay-300-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $300 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/pay-400-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $400 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/pay-500-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $500 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/pay-1000-extra-on-mortgage.astro",
      phrases: [
        "Use this support page when you want a $1,000 monthly extra example, not the full extra-payment workflow.",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-26";

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    if (!source.includes('robots="noindex, follow"')) {
      issues.push(`${item.file} -> missing noindex guard`);
    }

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Larger mortgage amount templates still read too broadly:\n${issues.join("\n")}` : ""
  );
});

test("SEO: extra-payment support pages should keep the tighter June 26 support-page framing", () => {
  const expectations = [
    {
      file: "src/pages/guides/amortization-with-extra-payments.astro",
      phrases: [
        "Use this support page when you want to see how extra principal changes the amortization table",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-vs-refinance.astro",
      phrases: [
        "Use this support page when you want to compare the same hold period for both options",
        "If you still need the broader extra-principal plan, go back to the extra mortgage payments guide first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-liquidity-reserve.astro",
      phrases: [
        "Use this support page when cash fragility matters more than the interest calculator",
        "If you still need the main extra-principal framework, go back to extra mortgage payments first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-priority-vs-other-debts.astro",
      phrases: [
        "Use this support page when the mortgage is only one of several competing uses for cash",
        "If you still need the broader mortgage-payoff-versus-investing frame, go back to pay off mortgage early or invest first."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-escrow-not-affected.astro",
      phrases: [
        "Use this support page when escrow is the confusing part",
        "If you need the broader payoff plan, keep the principal decision separate from escrow so you do not mix two different payment jobs."
      ]
    },
    {
      file: "src/pages/guides/extra-payment-target-payoff-date.astro",
      phrases: [
        "Use this support page when the calendar matters more than the raw savings figure",
        "If the issue is cash fragility, not target-date math. That belongs to the reserve check."
      ]
    }
  ];

  const issues: string[] = [];
  const expectedUpdated = "2026-06-26";

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");

    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing "${phrase}"`);
      }
    }

    const lastUpdatedMatch = source.match(/const lastUpdated = "(\d{4}-\d{2}-\d{2})"/);
    const visibleDateMatch = source.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);

    if (!lastUpdatedMatch) {
      issues.push(`${item.file} -> missing lastUpdated constant`);
    } else if (lastUpdatedMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> lastUpdated is ${lastUpdatedMatch[1]} instead of ${expectedUpdated}`);
    }

    if (!visibleDateMatch) {
      issues.push(`${item.file} -> missing visible Last updated date`);
    } else if (visibleDateMatch[1] !== expectedUpdated) {
      issues.push(`${item.file} -> visible Last updated date is ${visibleDateMatch[1]} instead of ${expectedUpdated}`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Extra-payment support pages still read too broadly:\n${issues.join("\n")}` : ""
  );
});

test("SEO: APR-for-balance-transfers should declare when to use payoff math versus APR-fee interpretation", () => {
  const file = "src/pages/guides/apr-for-balance-transfers.astro";
  const source = readFileSync(join(process.cwd(), file), "utf8");
  const expectedPhrases = [
    "Use this guide when the transfer fee, promo end date, or post-promo APR could change whether the offer is actually cheaper.",
    "If you already know the payment you can sustain and want a payoff answer, move next to the credit card payoff calculator.",
    "If you still need the broader APR-and-fee framework for card offers, go back to the APR-for-credit-cards guide first."
  ];

  const issues: string[] = [];

  for (const phrase of expectedPhrases) {
    if (!source.includes(phrase)) {
      issues.push(`${file} -> missing balance-transfer routing cue "${phrase}"`);
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `APR-for-balance-transfers still needs sharper routing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: wave-1 routing pages should avoid duplicate strongest-start cues", () => {
  const expectations = [
    {
      file: "src/pages/topics/apr.astro",
      phrases: [
        "Start with the APR calculator when you already have the rate, term, loan amount, and fee assumptions."
      ]
    },
    {
      file: "src/pages/calculators/apr-calculator.astro",
      phrases: [
        "If you are still sorting out which APR question you actually have, go back to the APR topic hub first."
      ]
    },
    {
      file: "src/pages/calculators/minimum-payment-payoff-calculator.astro",
      phrases: [
        "If you already know the payment you can commit to each month, go straight to the fixed-payment payoff calculator."
      ]
    },
    {
      file: "src/pages/calculators/credit-card-payoff-calculator.astro",
      phrases: [
        "If the statement minimum is still the number driving your plan, go back to the minimum payment calculator first."
      ]
    },
    {
      file: "src/pages/guides/how-credit-card-interest-is-calculated.astro",
      phrases: [
        "If the statement minimum is the main issue, move next to the minimum payment payoff calculator.",
        "If you already trust the statement math and just need a payoff date, switch to the fixed-payment payoff calculator."
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      const count = countOccurrences(source, phrase);
      if (count !== 1) {
        issues.push(`${item.file} -> expected 1 occurrence of "${phrase}", found ${count}`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Wave-1 routing cues are being repeated too aggressively:\n${issues.join("\n")}` : ""
  );
});

test("SEO: refreshed credit-card workflow pages should keep sharper decision modules visible", () => {
  const expectations = [
    {
      file: "src/pages/calculators/minimum-payment-payoff-calculator.astro",
      phrases: [
        "Minimum due vs real payoff plan",
        "Pick a target payment, not just a minimum due",
        "This credit card minimum payment calculator is for the moment when the minimum due on your statement is still the number driving your plan."
      ]
    },
    {
      file: "src/pages/guides/how-credit-card-interest-is-calculated.astro",
      phrases: [
        "Why your statement doesn't match balance x APR / 12",
        "How average daily balance actually works",
        "Three common reasons the interest charge looks wrong",
        "Where to go next"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing refreshed workflow phrase "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Refreshed credit-card workflow cues are missing:\n${issues.join("\n")}` : ""
  );
});

test("SEO: refreshed high-impression calculator pages should keep stronger decision modules visible", () => {
  const expectations = [
    {
      file: "src/pages/calculators/apr-calculator.astro",
      phrases: [
        "Map the quote before you calculate APR",
        "APR is not always the cheapest short-hold choice",
        "Which APR decision are you making next?"
      ]
    },
    {
      file: "src/pages/calculators/biweekly-mortgage-payment-calculator.astro",
      phrases: [
        "First verify what biweekly means in your program",
        "Fee-based biweekly service decision check",
        "What should you compare next?"
      ]
    },
    {
      file: "src/pages/calculators/extra-payment-calculator.astro",
      phrases: [
        "Choose monthly, annual, or lump-sum extra payments",
        "Cash-flow fit vs payoff speed",
        "What should you compare after the broad extra-payment plan?"
      ]
    }
  ];

  const issues: string[] = [];

  for (const item of expectations) {
    const source = readFileSync(join(process.cwd(), item.file), "utf8");
    for (const phrase of item.phrases) {
      if (!source.includes(phrase)) {
        issues.push(`${item.file} -> missing refreshed decision phrase "${phrase}"`);
      }
    }
  }

  assert.equal(
    issues.length,
    0,
    issues.length > 0 ? `Refreshed high-impression calculator decision modules are missing:\n${issues.join("\n")}` : ""
  );
});
