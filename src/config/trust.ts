export type TrustProfile = {
  id: string;
  name: string;
  title: string;
  scope: string;
  description: string;
  path: string;
  schemaType?: "Organization" | "Person";
};

export const TRUST_PROFILES = {
  siteOwner: {
    id: "site-owner",
    name: "Practical Finance Tools Site Owner",
    title: "Site owner and product editor",
    scope: "Owns workflow design, site maintenance priorities, and correction triage.",
    description:
      "Responsible for product direction, workflow clarity, and deciding how major calculator and content updates are rolled out across the site.",
    path: "/about#site-owner",
    schemaType: "Organization"
  },
  methodologyReview: {
    id: "methodology-review",
    name: "Practical Finance Tools Methodology Review",
    title: "Formula and assumptions review",
    scope: "Reviews formulas, assumptions, scenario boundaries, and regression fit.",
    description:
      "Reviews calculation logic, assumptions, and result interpretation so updated tools stay aligned with the formulas and guardrails described on the site.",
    path: "/methodology#methodology-review",
    schemaType: "Organization"
  },
  editorialReview: {
    id: "editorial-review",
    name: "Practical Finance Tools Editorial Review",
    title: "Editorial standards review",
    scope: "Reviews clarity, source use, educational framing, and correction readiness.",
    description:
      "Reviews whether pages explain the right decision, use plain language, and give readers a clear correction path when assumptions or wording need adjustment.",
    path: "/editorial-policy#editorial-review",
    schemaType: "Organization"
  }
} as const satisfies Record<string, TrustProfile>;

export const TRUST_ROLE_LIST = [
  TRUST_PROFILES.siteOwner,
  TRUST_PROFILES.methodologyReview,
  TRUST_PROFILES.editorialReview
] satisfies TrustProfile[];

export function getTrustSchemaEntity(profile: TrustProfile, siteUrl: string) {
  const url = new URL(profile.path, siteUrl).toString();
  return {
    "@context": "https://schema.org",
    "@type": profile.schemaType ?? "Organization",
    "@id": url,
    name: profile.name,
    description: profile.description,
    url
  };
}
