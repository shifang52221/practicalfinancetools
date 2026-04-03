import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
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
