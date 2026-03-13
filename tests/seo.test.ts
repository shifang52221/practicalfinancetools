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
