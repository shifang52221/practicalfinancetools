import { clamp, paymentForAmortizedLoan, solveBisection } from "../math";

export function estimateApr(opts: {
  loanAmount: number;
  nominalRatePercent: number;
  termMonths: number;
  fees: number;
}): { payment: number; aprPercent: number | null } {
  const loanAmount = clamp(opts.loanAmount, 0, Number.MAX_SAFE_INTEGER);
  const termMonths = Math.max(1, Math.floor(opts.termMonths));
  const fees = clamp(opts.fees, 0, Number.MAX_SAFE_INTEGER);
  const net = Math.max(0.01, loanAmount - fees);

  const payment = paymentForAmortizedLoan(loanAmount, clamp(opts.nominalRatePercent, 0, 200), termMonths);

  const root = solveBisection({
    lo: 0,
    hi: 1, // 100% monthly rate upper bound
    f: (r) => {
      let pv = 0;
      for (let i = 1; i <= termMonths; i++) pv += payment / Math.pow(1 + r, i);
      return pv - net;
    }
  });

  const aprPercent = root === null ? null : root * 12 * 100;
  return { payment, aprPercent };
}

