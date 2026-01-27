# SEO audit scripts

Run a full crawl + metadata audit (live site):

```bash
node scripts/seo/seo-audit.mjs --base https://practicalfinancetools.com
```

Outputs CSV files under `reports/seo-audit/<timestamp>/`:

- `url_inventory.csv`
- `html_audit.csv`
- `issues.csv`

