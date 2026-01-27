import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_BASE = "https://practicalfinancetools.com";

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(
    d.getMinutes()
  )}${pad(d.getSeconds())}`;
}

function parseArgs(argv) {
  const args = {
    base: DEFAULT_BASE,
    expectedOrigin: "",
    out: `reports/seo-audit/${nowStamp()}`,
    maxUrls: 400,
    maxDepth: 6
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--base") args.base = argv[++i];
    else if (a === "--expected-origin") args.expectedOrigin = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--max-urls") args.maxUrls = Number(argv[++i]);
    else if (a === "--max-depth") args.maxDepth = Number(argv[++i]);
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

function usage() {
  return [
    "Usage: node scripts/seo/seo-audit.mjs [--base <url>] [--expected-origin <origin>] [--out <dir>] [--max-urls <n>] [--max-depth <n>]",
    "",
    "Defaults:",
    `  --base ${DEFAULT_BASE}`,
    "  --expected-origin <same as --base>",
    "  --out  reports/seo-audit/<timestamp>",
    "  --max-urls 400",
    "  --max-depth 6"
  ].join("\n");
}

function normalizeBase(base) {
  const u = new URL(base);
  if (u.pathname !== "/" && u.pathname !== "") throw new Error(`--base must be an origin URL, got: ${base}`);
  u.pathname = "";
  u.hash = "";
  u.search = "";
  return u.toString().replace(/\/$/, "");
}

function normalizeUrl(url, base) {
  const u = new URL(url, base);
  u.hash = "";
  u.search = "";
  if (u.pathname.length > 1) u.pathname = u.pathname.replace(/\/+$/, "");
  return u.toString();
}

function pathFromUrl(url) {
  const u = new URL(url);
  return u.pathname.length > 1 ? u.pathname.replace(/\/+$/, "") : "/";
}

function classify(url) {
  const p = pathFromUrl(url);
  if (p === "/") return "category";
  if (p === "/calculators" || p === "/guides") return "category";
  if (p.startsWith("/calculators/")) return "calculator";
  if (p.startsWith("/guides/")) return "guide";
  if (["/about", "/privacy-policy", "/terms", "/contact", "/cookie-notice", "/editorial-policy", "/methodology"].includes(p))
    return "static";
  return "resource";
}

function extractAll(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const out = [];
  let m;
  while ((m = re.exec(xml))) out.push(m[1].trim());
  return out;
}

async function fetchText(url) {
  const r = await fetch(url, { redirect: "follow", headers: { "user-agent": "pft-seo-audit/1.0" } });
  const t = await r.text();
  if (!r.ok) throw new Error(`Fetch failed ${r.status} for ${url}`);
  return t;
}

async function fetchSitemapUrls(base) {
  const indexUrl = `${base}/sitemap-index.xml`;
  let xml;
  try {
    xml = await fetchText(indexUrl);
  } catch {
    xml = await fetchText(`${base}/sitemap.xml`);
  }

  const sitemapLocs = extractAll(xml, "loc");
  const urls = new Set();
  if (xml.includes("<sitemapindex")) {
    for (const loc of sitemapLocs) {
      const sm = await fetchText(loc);
      for (const u of extractAll(sm, "loc")) urls.add(normalizeUrl(u, base));
    }
    return { sitemapUrls: urls, sitemapIndex: indexUrl, sitemapFiles: sitemapLocs };
  }

  for (const loc of sitemapLocs) urls.add(normalizeUrl(loc, base));
  return { sitemapUrls: urls, sitemapIndex: `${base}/sitemap.xml`, sitemapFiles: [`${base}/sitemap.xml`] };
}

function extractLinks(html, base) {
  const links = new Set();
  const re = /<a\s[^>]*href=(["'])(.*?)\1/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[2]?.trim();
    if (!raw) continue;
    if (raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) continue;
    if (raw.startsWith("#")) continue;
    try {
      const u = normalizeUrl(raw, base);
      links.add(u);
    } catch {}
  }
  return [...links];
}

async function fetchWithRedirectChain(url, maxHops = 10) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop <= maxHops; hop++) {
    const res = await fetch(current, {
      redirect: "manual",
      headers: { "user-agent": "pft-seo-audit/1.0", accept: "text/html,*/*;q=0.9" }
    });
    const status = res.status;
    const location = res.headers.get("location");
    chain.push({ url: current, status, location });

    if ([301, 302, 303, 307, 308].includes(status) && location) {
      current = normalizeUrl(location, current);
      continue;
    }

    const contentType = res.headers.get("content-type") ?? "";
    const body = contentType.includes("text/html") ? await res.text() : "";
    return { initial_url: url, final_url: current, status, chain, contentType, body };
  }
  return { initial_url: url, final_url: current, status: 0, chain, contentType: "", body: "" };
}

function decodeHtml(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");
}

function extractBetween(html, startTag, endTag) {
  const start = html.toLowerCase().indexOf(startTag);
  if (start === -1) return "";
  const end = html.toLowerCase().indexOf(endTag, start);
  if (end === -1) return "";
  return html.slice(start, end + endTag.length);
}

function extractMeta(html) {
  const pick = (re, groupIndex = 1) => {
    const m = re.exec(html);
    const v = m?.[groupIndex];
    return v ? decodeHtml(String(v).trim()) : "";
  };

  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i, 1);

  const description =
    pick(/<meta[^>]+name=(["'])description\1[^>]*content=(["'])([\s\S]*?)\2[^>]*>/i, 3) ||
    pick(/<meta[^>]+content=(["'])([\s\S]*?)\1[^>]*name=(["'])description\3[^>]*>/i, 2);

  const canonical =
    pick(/<link[^>]+rel=(["'])canonical\1[^>]*href=(["'])([\s\S]*?)\2[^>]*>/i, 3) ||
    pick(/<link[^>]+href=(["'])([\s\S]*?)\1[^>]*rel=(["'])canonical\3[^>]*>/i, 2);

  const robots =
    pick(/<meta[^>]+name=(["'])robots\1[^>]*content=(["'])([\s\S]*?)\2[^>]*>/i, 3) ||
    pick(/<meta[^>]+content=(["'])([\s\S]*?)\1[^>]*name=(["'])robots\3[^>]*>/i, 2);

  const hreflangs = [];
  const hrefRe = /<link\s+[^>]*rel=(["'])alternate\1[^>]*>/gi;
  let m;
  while ((m = hrefRe.exec(html))) {
    const tag = m[0];
    const lang = /hreflang=(["'])(.*?)\1/i.exec(tag)?.[2] ?? "";
    const href = /href=(["'])(.*?)\1/i.exec(tag)?.[2] ?? "";
    if (lang && href) hreflangs.push({ hreflang: lang, href });
  }

  const schema = [];
  const schemaRe = /<script\s+[^>]*type=(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi;
  while ((m = schemaRe.exec(html))) schema.push(m[2].trim());

  return { title, description, canonical, robots, hreflangs, schema };
}

function countWords(text) {
  const words = text.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?/g);
  return words ? words.length : 0;
}

function canonicalNormalize(url) {
  const u = new URL(url);
  u.hash = "";
  u.search = "";
  if (u.pathname === "" || u.pathname === "/") return `${u.origin}/`;
  u.pathname = u.pathname.replace(/\/+$/, "");
  return u.toString();
}

function toCsv(rows, headers) {
  const esc = (v) => {
    const s = v == null ? "" : String(v);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const base = normalizeBase(args.base);
  const expectedOrigin = args.expectedOrigin ? normalizeBase(args.expectedOrigin) : base;
  const outDir = path.resolve(args.out);
  await fs.mkdir(outDir, { recursive: true });

  const runInfo = {
    base,
    expectedOrigin,
    startedAt: new Date().toISOString(),
    maxUrls: args.maxUrls,
    maxDepth: args.maxDepth
  };
  await fs.writeFile(path.join(outDir, "run.json"), JSON.stringify(runInfo, null, 2));

  const { sitemapUrls, sitemapIndex, sitemapFiles } = await fetchSitemapUrls(base);

  // Deep crawl from key entrypoints (kept small; sitemap provides full coverage).
  const seedPaths = ["/", "/calculators", "/guides", "/about", "/privacy-policy", "/terms", "/contact"];
  const queue = seedPaths.map((p) => normalizeUrl(p, base)).filter((u) => u.startsWith(base));
  const seen = new Set(queue);
  const discovered = new Set(queue);
  const edges = [];

  for (let depth = 0; depth < args.maxDepth && discovered.size < args.maxUrls; depth++) {
    const batch = [...queue.splice(0, queue.length)];
    if (batch.length === 0) break;

    for (const url of batch) {
      if (discovered.size >= args.maxUrls) break;
      let res;
      try {
        res = await fetchWithRedirectChain(url);
      } catch {
        continue;
      }
      if (!res.contentType.includes("text/html") || !res.body) continue;
      const links = extractLinks(res.body, base).filter((u) => u.startsWith(base));
      for (const l of links) {
        edges.push({ from: canonicalNormalize(url), to: canonicalNormalize(l) });
        if (!seen.has(l)) {
          seen.add(l);
          discovered.add(l);
          queue.push(l);
        }
      }
    }
  }

  const allUrls = new Set([...sitemapUrls, ...discovered].map((u) => normalizeUrl(u, base)));
  const urlList = [...allUrls].filter((u) => u.startsWith(base)).sort();

  const auditRows = [];
  const inventoryRows = [];
  const inboundCounts = new Map();
  const outboundTargets = new Set();

  for (const e of edges) {
    outboundTargets.add(e.to);
    inboundCounts.set(e.to, (inboundCounts.get(e.to) ?? 0) + 1);
  }

  for (const url of urlList) {
    const crawled = await fetchWithRedirectChain(url);
    const finalUrl = normalizeUrl(crawled.final_url, base);
    const status = crawled.status;
    const redirectHops = Math.max(0, crawled.chain.length - 1);
    const inSitemap = sitemapUrls.has(normalizeUrl(url, base));
    const kind = classify(url);

    inventoryRows.push({
      url,
      classification: kind,
      in_sitemap: inSitemap ? "yes" : "no",
      status,
      final_url: finalUrl,
      redirect_hops: redirectHops
    });

    if (!crawled.contentType.includes("text/html") || !crawled.body) {
      auditRows.push({
        url,
        classification: kind,
        status,
        final_url: finalUrl,
        title: "",
        description: "",
        canonical: "",
        robots: "",
        hreflang: "",
        main_content_words: 0,
        internal_links: 0,
        schema_types: "",
        schema_invalid: ""
      });
      continue;
    }

    const meta = extractMeta(crawled.body);
    const canonical = meta.canonical ? normalizeUrl(meta.canonical, base) : "";
    const robots = meta.robots || "";
    const hreflang = meta.hreflangs.map((h) => `${h.hreflang}:${h.href}`).join(" | ");

    const main = extractBetween(crawled.body, "<main", "</main>") || crawled.body;
    const mainText = decodeHtml(stripTags(main)).replace(/\s+/g, " ").trim();
    const mainWords = countWords(mainText);

    const internalLinks = extractLinks(crawled.body, base).filter((u) => u.startsWith(base)).length;

    const schemaTypes = [];
    let schemaInvalid = false;
    for (const s of meta.schema) {
      try {
        const obj = JSON.parse(s);
        const arr = Array.isArray(obj) ? obj : [obj];
        for (const item of arr) {
          const t = item?.["@type"];
          if (typeof t === "string") schemaTypes.push(t);
          else if (Array.isArray(t)) schemaTypes.push(...t.filter((x) => typeof x === "string"));
        }
      } catch {
        schemaInvalid = true;
      }
    }

    auditRows.push({
      url,
      classification: kind,
      status,
      final_url: finalUrl,
      title: meta.title,
      description: meta.description,
      canonical,
      robots,
      hreflang,
      main_content_words: mainWords,
      internal_links: internalLinks,
      schema_types: [...new Set(schemaTypes)].join(" | "),
      schema_invalid: schemaInvalid ? "yes" : "no"
    });
  }

  const issues = [];
  const byTitle = new Map();
  const byDesc = new Map();

  for (const r of auditRows) {
    const url = r.url;
    const status = Number(r.status) || 0;
    if (status !== 200) {
      issues.push({
        url,
        priority: "P0",
        type: "non200",
        evidence: `status=${status}`,
        fix: "Ensure final URL returns 200, and remove unnecessary redirects."
      });
    }

    const hops = Number(inventoryRows.find((x) => x.url === url)?.redirect_hops ?? 0);
    if (hops >= 2) {
      issues.push({
        url,
        priority: "P1",
        type: "redirect_chain",
        evidence: `redirect_hops=${hops}`,
        fix: "Collapse redirects to a single hop (or none) and keep sitemap URLs canonical."
      });
    }

    if (!r.title) {
      issues.push({ url, priority: "P1", type: "missing_title", evidence: "title empty", fix: "Add a unique <title>." });
    } else {
      const k = r.title.trim().toLowerCase();
      byTitle.set(k, [...(byTitle.get(k) ?? []), url]);
      if (r.title.length < 20 || r.title.length > 65) {
        issues.push({
          url,
          priority: "P2",
          type: "title_length",
          evidence: `len=${r.title.length}`,
          fix: "Keep title ~20–65 chars and match page intent."
        });
      }
    }

    if (!r.description) {
      issues.push({
        url,
        priority: "P2",
        type: "missing_description",
        evidence: "description empty",
        fix: "Add a unique meta description (~70–160 chars)."
      });
    } else {
      const k = r.description.trim().toLowerCase();
      byDesc.set(k, [...(byDesc.get(k) ?? []), url]);
      if (r.description.length < 70 || r.description.length > 170) {
        issues.push({
          url,
          priority: "P3",
          type: "description_length",
          evidence: `len=${r.description.length}`,
          fix: "Keep description ~70–170 chars and unique."
        });
      }
    }

    if (!r.canonical) {
      issues.push({
        url,
        priority: "P1",
        type: "missing_canonical",
        evidence: "canonical missing",
        fix: "Add a canonical link matching the final URL."
      });
    } else {
      const finalPath = pathFromUrl(r.final_url || url);
      const canonicalPath = pathFromUrl(r.canonical);
      if (finalPath !== canonicalPath) {
        issues.push({
          url,
          priority: "P0",
          type: "canonical_path_mismatch",
          evidence: `canonical_path=${canonicalPath} final_path=${finalPath}`,
          fix: "Set canonical to the intended path and ensure redirects/sitemap match."
        });
      }

      const canonicalOrigin = new URL(r.canonical).origin;
      if (canonicalOrigin !== expectedOrigin) {
        issues.push({
          url,
          priority: "P2",
          type: "canonical_origin_mismatch",
          evidence: `canonical_origin=${canonicalOrigin} expected_origin=${expectedOrigin}`,
          fix: "Keep a single canonical origin site-wide (apex vs www) and ensure consistent sitemap URLs."
        });
      }
    }

    if (String(r.robots).toLowerCase().includes("noindex") && inventoryRows.find((x) => x.url === url)?.in_sitemap === "yes") {
      issues.push({
        url,
        priority: "P0",
        type: "noindex_in_sitemap",
        evidence: `robots=${r.robots}`,
        fix: "Remove noindex URLs from sitemap (or remove noindex if it should be indexed)."
      });
    }

    const words = Number(r.main_content_words) || 0;
    if (words < 100 && r.classification !== "static") {
      issues.push({
        url,
        priority: "P0",
        type: "thin_content",
        evidence: `main_content_words=${words}`,
        fix: "Add original, intent-matching content (examples, assumptions, FAQs), or noindex if redundant."
      });
    }

    if (r.schema_invalid === "yes") {
      issues.push({
        url,
        priority: "P2",
        type: "schema_invalid_json",
        evidence: "ld+json parse failed",
        fix: "Fix JSON-LD to valid JSON and match schema to page type."
      });
    }

    const inbound = inboundCounts.get(canonicalNormalize(url)) ?? 0;
    if (inbound === 0 && r.classification !== "category" && url !== `${base}/`) {
      issues.push({
        url,
        priority: "P2",
        type: "orphan_page",
        evidence: "no inbound internal links in crawl graph",
        fix: "Add contextual internal links from category pages and related calculators/guides."
      });
    }
  }

  for (const [k, urls] of byTitle.entries()) {
    if (!k || urls.length < 2) continue;
    for (const url of urls) {
      issues.push({
        url,
        priority: "P1",
        type: "duplicate_title",
        evidence: `same_as=${urls.find((u) => u !== url)}`,
        fix: "Make titles unique and aligned to page intent."
      });
    }
  }

  for (const [k, urls] of byDesc.entries()) {
    if (!k || urls.length < 2) continue;
    for (const url of urls) {
      issues.push({
        url,
        priority: "P2",
        type: "duplicate_description",
        evidence: `same_as=${urls.find((u) => u !== url)}`,
        fix: "Make descriptions unique and match page intent."
      });
    }
  }

  // Sort issues by priority then URL for stable diffs.
  const prioOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
  issues.sort((a, b) => (prioOrder[a.priority] ?? 9) - (prioOrder[b.priority] ?? 9) || a.url.localeCompare(b.url));

  await fs.writeFile(
    path.join(outDir, "url_inventory.csv"),
    toCsv(inventoryRows, ["url", "classification", "in_sitemap", "status", "final_url", "redirect_hops"])
  );
  await fs.writeFile(
    path.join(outDir, "html_audit.csv"),
    toCsv(auditRows, [
      "url",
      "classification",
      "status",
      "final_url",
      "title",
      "description",
      "canonical",
      "robots",
      "hreflang",
      "main_content_words",
      "internal_links",
      "schema_types",
      "schema_invalid"
    ])
  );
  await fs.writeFile(path.join(outDir, "issues.csv"), toCsv(issues, ["url", "priority", "type", "evidence", "fix"]));

  await fs.writeFile(
    path.join(outDir, "sitemap_sources.json"),
    JSON.stringify(
      {
        sitemapIndex,
        sitemapFiles,
        sitemapUrlCount: sitemapUrls.size,
        discoveredUrlCount: discovered.size,
        auditUrlCount: urlList.length
      },
      null,
      2
    )
  );

  process.stdout.write(`SEO audit complete: ${outDir}\n`);
}

await main();
