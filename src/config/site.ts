export const SITE = {
  name: "Practical Finance Tools",
  url: "https://www.practicalfinancetools.com",
  locale: "en-US",
  adsenseClient: "ca-pub-8677561632094995",
  ga4MeasurementId: "G-JVLTPDJCHC", // e.g. "G-XXXXXXXXXX"
  adsenseSlots: {
    homeMid: "6492559957",
    calculatorsListMid: "3594933876",
    calculatorMid: "2824777686",
    calculatorBottom: "4716443856"
  },
  email: "admin@practicalfinancetools.com"
} as const;

export type SiteConfig = typeof SITE;
