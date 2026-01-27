import { clamp, monthlyRateFromApr, paymentForAmortizedLoan } from "../math";

export type AmortRow = {
  month: number;
  startingBalance: number;
  payment: number;
  interest: number;
  principal: number;
  extraPrincipal: number;
  endingBalance: number;
};

export type AmortResult = {
  paymentPI: number;
  rows: AmortRow[];
  months: number;
  totalInterest: number;
  totalPaid: number;
};

export function amortizationSchedule(opts: {
  principal: number;
  aprPercent: number;
  termMonths: number;
  extraMonthly?: number;
  extraMonthlyStartMonth?: number;
  extraMonthlyEndMonth?: number;
  extraOneTime?: number;
  extraOneTimeMonth?: number;
  maxMonths?: number;
}): AmortResult {
  const maxMonths = opts.maxMonths ?? Math.max(1200, opts.termMonths + 12);
  let balance = clamp(opts.principal, 0, Number.MAX_SAFE_INTEGER);
  const months = Math.max(1, Math.floor(opts.termMonths));
  const paymentPI = paymentForAmortizedLoan(balance, opts.aprPercent, months);
  const r = monthlyRateFromApr(opts.aprPercent);
  const extraMonthly = clamp(opts.extraMonthly ?? 0, 0, Number.MAX_SAFE_INTEGER);
  const extraMonthlyStartMonth = Math.max(1, Math.floor(opts.extraMonthlyStartMonth ?? 1));
  const extraMonthlyEndMonthRaw = opts.extraMonthlyEndMonth ?? Number.POSITIVE_INFINITY;
  const extraMonthlyEndMonth = Number.isFinite(extraMonthlyEndMonthRaw)
    ? Math.max(extraMonthlyStartMonth, Math.floor(extraMonthlyEndMonthRaw))
    : Number.POSITIVE_INFINITY;
  const extraOneTime = clamp(opts.extraOneTime ?? 0, 0, Number.MAX_SAFE_INTEGER);
  const extraOneTimeMonth = Math.floor(opts.extraOneTimeMonth ?? -1);

  const rows: AmortRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;

  for (let month = 1; month <= maxMonths && balance > 0.005; month++) {
    const startingBalance = balance;
    const interest = startingBalance * r;
    const payment = Math.min(paymentPI, startingBalance + interest);
    const principal = Math.max(0, payment - interest);
    let extraPrincipal = month >= extraMonthlyStartMonth && month <= extraMonthlyEndMonth ? extraMonthly : 0;
    if (month === extraOneTimeMonth) extraPrincipal += extraOneTime;
    extraPrincipal = Math.min(extraPrincipal, Math.max(0, startingBalance - principal));
    const endingBalance = Math.max(0, startingBalance - principal - extraPrincipal);

    rows.push({
      month,
      startingBalance,
      payment,
      interest,
      principal,
      extraPrincipal,
      endingBalance
    });

    totalInterest += interest;
    totalPaid += payment + extraPrincipal;
    balance = endingBalance;
  }

  return { paymentPI, rows, months: rows.length, totalInterest, totalPaid };
}

export function mortgageMonthlyBreakdown(opts: {
  homePrice: number;
  downPayment: number;
  aprPercent: number;
  termYears: number;
  propertyTaxAnnual: number;
  insuranceAnnual: number;
  hoaMonthly: number;
  pmiRateAnnual?: number;
}): {
  loanAmount: number;
  paymentPI: number;
  taxMonthly: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  pmiMonthly: number;
  totalMonthly: number;
} {
  const homePrice = clamp(opts.homePrice, 0, Number.MAX_SAFE_INTEGER);
  const downPayment = clamp(opts.downPayment, 0, homePrice);
  const loanAmount = Math.max(0, homePrice - downPayment);
  const termMonths = Math.max(1, Math.round(clamp(opts.termYears, 1, 60) * 12));
  const paymentPI = paymentForAmortizedLoan(loanAmount, opts.aprPercent, termMonths);
  const taxMonthly = clamp(opts.propertyTaxAnnual, 0, Number.MAX_SAFE_INTEGER) / 12;
  const insuranceMonthly = clamp(opts.insuranceAnnual, 0, Number.MAX_SAFE_INTEGER) / 12;
  const hoaMonthly = clamp(opts.hoaMonthly, 0, Number.MAX_SAFE_INTEGER);

  const dpPct = homePrice > 0 ? downPayment / homePrice : 0;
  const pmiRateAnnual = clamp(opts.pmiRateAnnual ?? 0, 0, 10) / 100;
  const pmiMonthly = dpPct < 0.2 ? loanAmount * pmiRateAnnual / 12 : 0;

  const totalMonthly = paymentPI + taxMonthly + insuranceMonthly + hoaMonthly + pmiMonthly;
  return { loanAmount, paymentPI, taxMonthly, insuranceMonthly, hoaMonthly, pmiMonthly, totalMonthly };
}
