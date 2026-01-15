export const SITE = {
  name: "Practical Finance Tools",
  url: "https://www.practicalfinancetools.com",
  locale: "en-US",
  adsenseClient: "ca-pub-8677561632094995",
  ga4MeasurementId: "G-JVLTPDJCHC", // e.g. "G-XXXXXXXXXX"
  adsenseSlots: {
    homeMid: "", // e.g. "1234567890"
    calculatorsListMid: "",
    calculatorMid: "",
    calculatorBottom: ""
  },
  email: "admin@practicalfinancetools.com"
} as const;

export type SiteConfig = typeof SITE;
