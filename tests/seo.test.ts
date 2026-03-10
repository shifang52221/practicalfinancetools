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

