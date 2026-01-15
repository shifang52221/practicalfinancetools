export const SITE = {
  name: "Practical Finance Tools",
  url: "https://www.practicalfinancetools.com",
  locale: "en-US",
  adsenseClient: "ca-pub-8677561632094995",
  ga4MeasurementId: "G-JVLTPDJCHC", // e.g. "G-XXXXXXXXXX"
  adsenseSlots: {
    homeMid: "5806982486",
    calculatorsListMid: "5806982486",
    calculatorMid: "5806982486",
    calculatorBottom: "5806982486"
  },
  email: "admin@practicalfinancetools.com"
} as const;

export type SiteConfig = typeof SITE;
