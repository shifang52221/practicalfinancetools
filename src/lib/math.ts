export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function monthlyRateFromApr(aprPercent: number): number {
  return Math.max(0, aprPercent) / 100 / 12;
}

export function paymentForAmortizedLoan(principal: number, aprPercent: number, months: number): number {
  if (months <= 0) return 0;
  const r = monthlyRateFromApr(aprPercent);
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function solveBisection(opts: {
  f: (x: number) => number;
  lo: number;
  hi: number;
  maxIter?: number;
  tol?: number;
}): number | null {
  const { f, lo, hi, maxIter = 80, tol = 1e-10 } = opts;
  let a = lo;
  let b = hi;
  let fa = f(a);
  let fb = f(b);
  if (!Number.isFinite(fa) || !Number.isFinite(fb)) return null;
  if (fa === 0) return a;
  if (fb === 0) return b;
  if (fa * fb > 0) return null;

  for (let i = 0; i < maxIter; i++) {
    const mid = (a + b) / 2;
    const fm = f(mid);
    if (!Number.isFinite(fm)) return null;
    if (Math.abs(fm) < tol) return mid;
    if (fa * fm < 0) {
      b = mid;
      fb = fm;
    } else {
      a = mid;
      fa = fm;
    }
  }
  return (a + b) / 2;
}
