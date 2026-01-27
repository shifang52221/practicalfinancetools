# SEO audit scripts

Run a full crawl + metadata audit (live site):

```bash
node scripts/seo/seo-audit.mjs --base https://practicalfinancetools.com
```

Run a full local preview crawl audit (build + preview + crawl):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/seo/run-local-preview-audit.ps1
```

Outputs CSV files under `reports/seo-audit/<timestamp>/`:

- `url_inventory.csv`
- `html_audit.csv`
- `issues.csv`
