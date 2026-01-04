export function formatCurrency(value: number, currency: string = "USD"): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatCurrency2(value: number, currency: string = "USD"): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatPercent(value: number, digits: number = 2): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: digits }).format(value);
}

export function formatNumber(value: number, digits: number = 0): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export function formatMonths(totalMonths: number): string {
  if (!Number.isFinite(totalMonths) || totalMonths < 0) return "—";
  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);
  if (years <= 0) return `${months} mo`;
  if (months <= 0) return `${years} yr`;
  return `${years} yr ${months} mo`;
}

