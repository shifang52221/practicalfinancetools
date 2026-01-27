import { clamp, paymentForAmortizedLoan } from "../math";

export type RentBuyResult = {
  breakEvenMonth: number | null;
  breakEvenYear: number | null;
  atHorizon: {
    years: number;
    netWorthRent: number;
    netWorthBuy: number;
  };
  series: Array<{
    year: number;
    netWorthRent: number;
    netWorthBuy: number;
    rentMonthly: number;
    ownerMonthlyCashCost: number;
    homeValue: number;
    loanBalance: number;
  }>;
};

export function rentVsBuy(opts: {
  years: number;
  monthlyRent: number;
  rentGrowthPercent: number;
  homePrice: number;
  downPayment: number;
  aprPercent: number;
  termYears: number;
  homeAppreciationPercent: number;
  closingCostsPercent: number;
  sellingCostsPercent: number;
  propertyTaxPercent: number;
  insuranceAnnual: number;
  hoaMonthly: number;
  maintenancePercent: number;
  investmentReturnPercent: number;
}): RentBuyResult {
  const years = Math.floor(clamp(opts.years, 1, 40));
  const months = years * 12;

  let rent = clamp(opts.monthlyRent, 0, Number.MAX_SAFE_INTEGER);
  const rentGrowth = clamp(opts.rentGrowthPercent, 0, 30) / 100;

  const homePrice0 = clamp(opts.homePrice, 0, Number.MAX_SAFE_INTEGER);
  const downPayment = clamp(opts.downPayment, 0, homePrice0);
  const loanAmount0 = Math.max(0, homePrice0 - downPayment);
  const termMonths = Math.max(1, Math.round(clamp(opts.termYears, 1, 60) * 12));
  const paymentPI = paymentForAmortizedLoan(loanAmount0, clamp(opts.aprPercent, 0, 30), termMonths);

  const homeApp = clamp(opts.homeAppreciationPercent, 0, 20) / 100;
  const closePct = clamp(opts.closingCostsPercent, 0, 10) / 100;
  const sellPct = clamp(opts.sellingCostsPercent, 0, 10) / 100;
  const taxPct = clamp(opts.propertyTaxPercent, 0, 10) / 100;
  const insAnnual = clamp(opts.insuranceAnnual, 0, Number.MAX_SAFE_INTEGER);
  const hoaMonthly = clamp(opts.hoaMonthly, 0, Number.MAX_SAFE_INTEGER);
  const maintPct = clamp(opts.maintenancePercent, 0, 10) / 100;

  const investR = clamp(opts.investmentReturnPercent, 0, 30) / 100 / 12;

  // Renter invests the upfront cash (down payment + closing costs) and any monthly savings vs owning.
  // Buyer "invests" any monthly savings vs renting.
  let renterInvest = downPayment + homePrice0 * closePct;
  let ownerInvest = 0;
  const buyerSunkCosts = homePrice0 * closePct;
  let homeValue = homePrice0;
  let loanBalance = loanAmount0;

  const series: RentBuyResult["series"] = [];
  let breakEvenMonth: number | null = null;

  function stepMonth(month: number) {
    // Yearly growth applied monthly (approx)
    const homeGrowthMonthly = Math.pow(1 + homeApp, 1 / 12) - 1;
    const rentGrowthMonthly = Math.pow(1 + rentGrowth, 1 / 12) - 1;

    homeValue *= 1 + homeGrowthMonthly;
    rent *= 1 + rentGrowthMonthly;

    // Mortgage amortization (principal becomes equity).
    const monthlyRate = clamp(opts.aprPercent, 0, 30) / 100 / 12;
    const interest = loanBalance * monthlyRate;
    const principal = Math.min(Math.max(0, paymentPI - interest), loanBalance);
    loanBalance = Math.max(0, loanBalance - principal);

    const taxMonthly = homeValue * taxPct / 12;
    const insMonthly = insAnnual / 12;
    const maintMonthly = homeValue * maintPct / 12;
    const ownerCashCost = paymentPI + taxMonthly + insMonthly + hoaMonthly + maintMonthly;

    const rentCashCost = rent;
    const diff = ownerCashCost - rentCashCost;

    renterInvest = renterInvest * (1 + investR) + Math.max(0, diff);
    ownerInvest = ownerInvest * (1 + investR) + Math.max(0, -diff);

    if (month % 12 === 0) {
      const year = month / 12;
      const proceeds = homeValue * (1 - sellPct);
      const equity = Math.max(0, proceeds - loanBalance);
      const netWorthBuy = equity + ownerInvest - buyerSunkCosts;
      const netWorthRent = renterInvest;
      series.push({ year, netWorthRent, netWorthBuy, rentMonthly: rentCashCost, ownerMonthlyCashCost: ownerCashCost, homeValue, loanBalance });
    }

    if (breakEvenMonth === null) {
      const proceeds = homeValue * (1 - sellPct);
      const equity = Math.max(0, proceeds - loanBalance);
      const netWorthBuy = equity + ownerInvest - buyerSunkCosts;
      const netWorthRent = renterInvest;
      if (netWorthBuy >= netWorthRent) breakEvenMonth = month;
    }
  }

  for (let m = 1; m <= months; m++) stepMonth(m);

  const atHorizon = series[series.length - 1]!;
  const breakEven = series.find((p) => p.netWorthBuy >= p.netWorthRent)?.year ?? null;

  return {
    breakEvenMonth,
    breakEvenYear: breakEven,
    atHorizon: { years: atHorizon.year, netWorthRent: atHorizon.netWorthRent, netWorthBuy: atHorizon.netWorthBuy },
    series
  };
}
