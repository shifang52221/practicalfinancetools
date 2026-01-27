import { clamp } from "../math";

export type DtiResult = {
  incomeMonthly: number;
  housingMonthly: number;
  otherDebtMonthly: number;
  totalDebtMonthly: number;
  frontEndDti: number | null;
  backEndDti: number | null;
};

export function calculateDti(opts: {
  incomeMonthly: number;
  housingMonthly: number;
  otherDebtMonthly: number;
}): DtiResult {
  const incomeMonthly = clamp(opts.incomeMonthly, 0, Number.MAX_SAFE_INTEGER);
  const housingMonthly = clamp(opts.housingMonthly, 0, Number.MAX_SAFE_INTEGER);
  const otherDebtMonthly = clamp(opts.otherDebtMonthly, 0, Number.MAX_SAFE_INTEGER);
  const totalDebtMonthly = housingMonthly + otherDebtMonthly;

  const frontEndDti = incomeMonthly > 0 ? housingMonthly / incomeMonthly : null;
  const backEndDti = incomeMonthly > 0 ? totalDebtMonthly / incomeMonthly : null;

  return { incomeMonthly, housingMonthly, otherDebtMonthly, totalDebtMonthly, frontEndDti, backEndDti };
}

export function maxHousingForBackEndDti(opts: {
  incomeMonthly: number;
  otherDebtMonthly: number;
  targetBackEndDti: number;
}): number | null {
  const incomeMonthly = clamp(opts.incomeMonthly, 0, Number.MAX_SAFE_INTEGER);
  const otherDebtMonthly = clamp(opts.otherDebtMonthly, 0, Number.MAX_SAFE_INTEGER);
  const target = clamp(opts.targetBackEndDti, 0, 10);
  if (incomeMonthly <= 0) return null;
  return Math.max(0, incomeMonthly * target - otherDebtMonthly);
}

export function maxHousingForFrontEndDti(opts: {
  incomeMonthly: number;
  targetFrontEndDti: number;
}): number | null {
  const incomeMonthly = clamp(opts.incomeMonthly, 0, Number.MAX_SAFE_INTEGER);
  const target = clamp(opts.targetFrontEndDti, 0, 10);
  if (incomeMonthly <= 0) return null;
  return Math.max(0, incomeMonthly * target);
}

