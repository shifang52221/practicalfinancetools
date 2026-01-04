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
  months: number;
  totalInterest: number;
  totalPaid: number;
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

  for (let month = 1; month <= maxMonths && balance > 0.005; month++) {
    const startingBalance = balance;
    const interest = startingBalance * r;
    const minToAvoidGrowth = interest + 0.01;
    const payment = Math.min(startingBalance + interest, Math.max(paymentInput, minToAvoidGrowth));
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
    totalPaid
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
    totalPaid
  };
}

