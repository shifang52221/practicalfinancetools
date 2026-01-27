import { clamp } from "../math";

export type PayoffRow = {
  month: number;
  startingBalance: number;
  interest: number;
  payment: number;
  principal: number;
  endingBalance: number;
};

export type PayoffResult = {
  rows: PayoffRow[];
  months: number | null;
  totalInterest: number;
  totalPaid: number;
  endingBalance: number;
  minPaymentToAvoidGrowth: number;
};

export function creditCardPayoffSchedule(opts: {
  balance: number;
  aprPercent: number;
  monthlyPayment: number;
  maxMonths?: number;
}): PayoffResult {
  const maxMonths = opts.maxMonths ?? 1200;
  let balance = clamp(opts.balance, 0, Number.MAX_SAFE_INTEGER);
  const r = clamp(opts.aprPercent, 0, 500) / 100 / 12;
  const paymentInput = clamp(opts.monthlyPayment, 0, Number.MAX_SAFE_INTEGER);

  const rows: PayoffRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  const minPaymentToAvoidGrowth = balance > 0 ? balance * r + 0.01 : 0;

  for (let month = 1; month <= maxMonths && balance > 0.005; month++) {
    const startingBalance = balance;
    const interest = startingBalance * r;
    const payment = Math.min(startingBalance + interest, paymentInput);
    const principal = Math.max(0, payment - interest);
    const endingBalance = Math.max(0, startingBalance + interest - payment);

    rows.push({ month, startingBalance, interest, payment, principal, endingBalance });
    totalInterest += interest;
    totalPaid += payment;
    balance = endingBalance;
  }

  return {
    rows,
    months: balance <= 0.005 ? rows.length : null,
    totalInterest,
    totalPaid,
    endingBalance: balance,
    minPaymentToAvoidGrowth
  };
}

export function minimumPaymentPayoffSchedule(opts: {
  balance: number;
  aprPercent: number;
  minPercent: number;
  minDollars: number;
  maxMonths?: number;
}): PayoffResult {
  const maxMonths = opts.maxMonths ?? 1200;
  let balance = clamp(opts.balance, 0, Number.MAX_SAFE_INTEGER);
  const r = clamp(opts.aprPercent, 0, 500) / 100 / 12;
  const minPercent = clamp(opts.minPercent, 0, 100) / 100;
  const minDollars = clamp(opts.minDollars, 0, Number.MAX_SAFE_INTEGER);

  const rows: PayoffRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  const minPaymentToAvoidGrowth = balance > 0 ? balance * r + 0.01 : 0;

  for (let month = 1; month <= maxMonths && balance > 0.005; month++) {
    const startingBalance = balance;
    const interest = startingBalance * r;
    const computedMin = Math.max(minDollars, startingBalance * minPercent);
    const minToAvoidGrowth = interest + 0.01;
    const payment = Math.min(startingBalance + interest, Math.max(computedMin, minToAvoidGrowth));
    const principal = Math.max(0, payment - interest);
    const endingBalance = Math.max(0, startingBalance - principal);

    rows.push({ month, startingBalance, interest, payment, principal, endingBalance });
    totalInterest += interest;
    totalPaid += payment;
    balance = endingBalance;
  }

  return {
    rows,
    months: rows.length,
    totalInterest,
    totalPaid,
    endingBalance: balance,
    minPaymentToAvoidGrowth
  };
}

export function paymentToPayoffInMonths(opts: {
  balance: number;
  aprPercent: number;
  targetMonths: number;
}): number | null {
  const balance0 = clamp(opts.balance, 0, Number.MAX_SAFE_INTEGER);
  const targetMonths = Math.max(1, Math.floor(opts.targetMonths));
  const r = clamp(opts.aprPercent, 0, 500) / 100 / 12;
  if (balance0 <= 0.005) return 0;

  const remainingAfterMonths = (payment: number) => {
    let balance = balance0;
    const pay = clamp(payment, 0, Number.MAX_SAFE_INTEGER);
    for (let m = 1; m <= targetMonths && balance > 0.005; m++) {
      const interest = balance * r;
      const applied = Math.min(balance + interest, pay);
      balance = Math.max(0, balance + interest - applied);
      if (applied <= interest + 1e-12 && balance > 0.005) return Number.POSITIVE_INFINITY;
    }
    return balance;
  };

  let lo = 0;
  let hi = Math.max(1, balance0 / targetMonths);
  let attempts = 0;
  while (attempts < 60 && remainingAfterMonths(hi) > 0.005) {
    hi *= 2;
    attempts++;
    if (hi > balance0 * 1000) return null;
  }

  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const rem = remainingAfterMonths(mid);
    if (rem <= 0.005) hi = mid;
    else lo = mid;
  }

  return hi;
}
