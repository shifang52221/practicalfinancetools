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
  if (!calculatorSource.includes('lastUpdated="2026-04-04"')) {
    issues.push(`${calculatorFile} -> missing lastUpdated="2026-04-04"`);
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
  if (lastUpdatedMatch && lastUpdatedMatch[1] !== "2026-04-04") {
    issues.push(`${guideFile} -> expected lastUpdated 2026-04-04, found ${lastUpdatedMatch[1]}`);
  }
  if (visibleDateMatch && visibleDateMatch[1] !== "2026-04-04") {
    issues.push(`${guideFile} -> expected visible Last updated 2026-04-04, found ${visibleDateMatch[1]}`);
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
    lastUpdated: "2026-04-03"
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
