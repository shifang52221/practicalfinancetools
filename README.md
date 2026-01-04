# Finance Calculators (US)

Fast, SEO-friendly, low-maintenance finance calculators focused on the US market.

## Quickstart

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## AdSense setup (required before production)

- Set your AdSense client ID and ad unit slots in `src/config/site.ts` (`adsenseClient`, `adsenseSlots.*`).
- Add your real `ads.txt` to `public/ads.txt`.
- If you serve EU/UK traffic, use a certified CMP. This project includes a basic consent banner (not a certified CMP); ads may be limited in EEA/UK/CH.

## Pages

- `/calculators` lists tools
- Each calculator page includes: inputs, results, how it works, FAQ, disclaimer
- Compliance pages: `/privacy-policy`, `/terms`, `/cookie-notice`, `/about`, `/contact`
