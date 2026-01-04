export const SITE = {
  name: "Practical Finance Tools",
  url: "https://practicalfinancetools.com",
  locale: "en-US",
  adsenseClient: "", // e.g. "ca-pub-1234567890123456"
  ga4MeasurementId: "", // e.g. "G-XXXXXXXXXX"
  adsenseSlots: {
    homeMid: "", // e.g. "1234567890"
    calculatorsListMid: "",
    calculatorMid: "",
    calculatorBottom: ""
  },
  email: "admin@practicalfinancetools.com"
} as const;

export type SiteConfig = typeof SITE;
