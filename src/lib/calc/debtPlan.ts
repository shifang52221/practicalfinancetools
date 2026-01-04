import { clamp } from "../math";

export type DebtInput = {
  id: string;
  name: string;
  balance: number;
  aprPercent: number;
  minPayment: number;
};

export type DebtPayoff = {
  id: string;
  name: string;
  payoffMonth: number;
  totalInterest: number;
};

export type DebtPlanResult = {
  months: number;
  totalInterest: number;
  payoffs: DebtPayoff[];
  rows: Array<{
    month: number;
    totalBalance: number;
    payment: number;
    interest: number;
  }>;
};

type Strategy = "snowball" | "avalanche";

export function buildDebtPlan(opts: {
  debts: DebtInput[];
  extraMonthly: number;
  strategy: Strategy;
  maxMonths?: number;
}): DebtPlanResult {
  const maxMonths = opts.maxMonths ?? 600;
  const extraMonthly = clamp(opts.extraMonthly, 0, Number.MAX_SAFE_INTEGER);

  const debts = opts.debts
    .map((d) => ({
      ...d,
      balance: clamp(d.balance, 0, Number.MAX_SAFE_INTEGER),
      aprPercent: clamp(d.aprPercent, 0, 200),
      minPayment: clamp(d.minPayment, 0, Number.MAX_SAFE_INTEGER),
      totalInterest: 0,
      payoffMonth: 0
    }))
    .filter((d) => d.balance > 0.005);

  const rows: DebtPlanResult["rows"] = [];
  let totalInterest = 0;

  for (let month = 1; month <= maxMonths; month++) {
    const active = debts.filter((d) => d.balance > 0.005);
    if (active.length === 0) break;

    // Order target
    const ordered = [...active].sort((a, b) => {
      if (opts.strategy === "snowball") return a.balance - b.balance;
      if (b.aprPercent !== a.aprPercent) return b.aprPercent - a.aprPercent;
      return b.balance - a.balance;
    });
    const targetId = ordered[0]?.id;

    let monthInterest = 0;
    let monthPayment = 0;
    let extraLeft = extraMonthly;

    // First pay minimums
    for (const d of active) {
      const r = d.aprPercent / 100 / 12;
      const interest = d.balance * r;
      monthInterest += interest;
      d.totalInterest += interest;
      totalInterest += interest;

      const minToAvoidGrowth = interest + 0.01;
      const minPay = Math.max(d.minPayment, minToAvoidGrowth);
      const pay = Math.min(d.balance + interest, minPay);
      const principal = Math.max(0, pay - interest);
      d.balance = Math.max(0, d.balance - principal);
      monthPayment += pay;
    }

    // Then allocate extra to the target, cascading as debts close
    while (extraLeft > 0.005) {
      const active2 = debts.filter((d) => d.balance > 0.005);
      if (active2.length === 0) break;
      const ordered2 = [...active2].sort((a, b) => {
        if (opts.strategy === "snowball") return a.balance - b.balance;
        if (b.aprPercent !== a.aprPercent) return b.aprPercent - a.aprPercent;
        return b.balance - a.balance;
      });
      const target = ordered2.find((d) => d.id === targetId) ?? ordered2[0];
      const payExtra = Math.min(extraLeft, target.balance);
      target.balance = Math.max(0, target.balance - payExtra);
      monthPayment += payExtra;
      extraLeft -= payExtra;
    }

    for (const d of debts) {
      if (d.payoffMonth === 0 && d.balance <= 0.005) d.payoffMonth = month;
    }

    rows.push({
      month,
      totalBalance: debts.reduce((s, d) => s + d.balance, 0),
      payment: monthPayment,
      interest: monthInterest
    });
  }

  const months = rows.length;
  const payoffs: DebtPayoff[] = debts
    .map((d) => ({
      id: d.id,
      name: d.name || "Debt",
      payoffMonth: d.payoffMonth || months,
      totalInterest: d.totalInterest
    }))
    .sort((a, b) => a.payoffMonth - b.payoffMonth);

  return { months, totalInterest, payoffs, rows };
}

