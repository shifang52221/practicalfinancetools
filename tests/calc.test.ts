import test from "node:test";
import assert from "node:assert/strict";

import { paymentForAmortizedLoan } from "../src/lib/math.ts";
import { estimateApr } from "../src/lib/calc/apr.ts";
import { amortizationSchedule } from "../src/lib/calc/loan.ts";
import { creditCardPayoffSchedule, paymentToPayoffInMonths } from "../src/lib/calc/creditCard.ts";
import { buildDebtPlan, extraMonthlyToDebtFreeInMonths } from "../src/lib/calc/debtPlan.ts";
import { calculateDti, maxHousingForBackEndDti, maxHousingForFrontEndDti } from "../src/lib/calc/dti.ts";
import { rentVsBuy } from "../src/lib/calc/rentBuy.ts";

function approxEqual(actual: number, expected: number, tol = 1e-6) {
  assert.ok(Number.isFinite(actual), `expected finite actual, got ${actual}`);
  assert.ok(Number.isFinite(expected), `expected finite expected, got ${expected}`);
  assert.ok(Math.abs(actual - expected) <= tol, `expected ${actual} close to ${expected} (tol=${tol})`);
}

test("paymentForAmortizedLoan: zero APR is principal/months", () => {
  approxEqual(paymentForAmortizedLoan(1000, 0, 10), 100, 1e-12);
});

test("estimateApr: zero fees close to nominal APR", () => {
  const r = estimateApr({ loanAmount: 15000, nominalRatePercent: 9.99, termMonths: 60, fees: 0 });
  assert.ok(r.aprPercent !== null);
  approxEqual(r.aprPercent, 9.99, 1e-6);
});

test("estimateApr: fees increase APR", () => {
  const noFees = estimateApr({ loanAmount: 15000, nominalRatePercent: 9.99, termMonths: 60, fees: 0 });
  const withFees = estimateApr({ loanAmount: 15000, nominalRatePercent: 9.99, termMonths: 60, fees: 600 });
  assert.ok(noFees.aprPercent !== null && withFees.aprPercent !== null);
  assert.ok(withFees.aprPercent > noFees.aprPercent);
});

test("estimateApr: fees >= loan amount => apr null", () => {
  const r = estimateApr({ loanAmount: 1000, nominalRatePercent: 10, termMonths: 12, fees: 1000 });
  assert.equal(r.aprPercent, null);
});

test("amortizationSchedule: pays off without extras", () => {
  const r = amortizationSchedule({ principal: 360000, aprPercent: 6.5, termMonths: 360 });
  assert.ok(r.months > 0 && r.months <= 360);
  assert.ok(r.rows.at(-1)!.endingBalance <= 0.01);
  assert.ok(r.totalPaid >= 360000);
  assert.ok(r.totalInterest >= 0);
});

test("amortizationSchedule: extra monthly (delayed start) reduces months", () => {
  const base = amortizationSchedule({ principal: 360000, aprPercent: 6.5, termMonths: 360 });
  const extra = amortizationSchedule({
    principal: 360000,
    aprPercent: 6.5,
    termMonths: 360,
    extraMonthly: 150,
    extraMonthlyStartMonth: 13
  });
  assert.ok(extra.months <= base.months);
  assert.ok(extra.totalInterest <= base.totalInterest);
});

test("creditCardPayoffSchedule: basic payoff at 0% APR", () => {
  const r = creditCardPayoffSchedule({ balance: 1000, aprPercent: 0, monthlyPayment: 500 });
  assert.equal(r.months, 2);
  approxEqual(r.totalPaid, 1000, 1e-6);
  approxEqual(r.totalInterest, 0, 1e-6);
});

test("creditCardPayoffSchedule: payment below interest => not paid off", () => {
  const r = creditCardPayoffSchedule({ balance: 1000, aprPercent: 36, monthlyPayment: 10, maxMonths: 24 });
  assert.equal(r.months, null);
  assert.ok(r.endingBalance > 1000);
});

test("paymentToPayoffInMonths: returns a payment that pays off", () => {
  const pay = paymentToPayoffInMonths({ balance: 1000, aprPercent: 24, targetMonths: 12 });
  assert.ok(pay !== null);
  const r = creditCardPayoffSchedule({ balance: 1000, aprPercent: 24, monthlyPayment: pay!, maxMonths: 12 });
  assert.ok(r.months !== null);
});

test("extraMonthlyToDebtFreeInMonths: returns extra that hits target", () => {
  const debts = [
    { id: "a", name: "A", balance: 3200, aprPercent: 24.99, minPayment: 95 },
    { id: "b", name: "B", balance: 7800, aprPercent: 18.99, minPayment: 160 },
    { id: "c", name: "C", balance: 12000, aprPercent: 9.5, minPayment: 260 }
  ];
  const target = 48;
  const extra = extraMonthlyToDebtFreeInMonths({ debts, strategy: "avalanche", targetMonths: target });
  assert.ok(extra !== null);
  const plan = buildDebtPlan({ debts, strategy: "avalanche", extraMonthly: extra!, maxMonths: target });
  assert.ok(plan.paidOff);
  assert.ok(plan.months <= target);
});

test("DTI: compute and reverse targets", () => {
  const r = calculateDti({ incomeMonthly: 6500, housingMonthly: 2200, otherDebtMonthly: 450 });
  assert.ok(r.frontEndDti !== null && r.backEndDti !== null);
  approxEqual(r.frontEndDti, 2200 / 6500, 1e-12);
  approxEqual(r.backEndDti, (2200 + 450) / 6500, 1e-12);

  const maxFront = maxHousingForFrontEndDti({ incomeMonthly: 6500, targetFrontEndDti: 0.28 });
  const maxBack = maxHousingForBackEndDti({ incomeMonthly: 6500, otherDebtMonthly: 450, targetBackEndDti: 0.36 });
  assert.ok(maxFront !== null && maxBack !== null);
  assert.ok(maxFront > 0 && maxBack > 0);
});

test("rentVsBuy: returns series and break-even fields", () => {
  const r = rentVsBuy({
    years: 5,
    monthlyRent: 2000,
    rentGrowthPercent: 3,
    homePrice: 400000,
    downPayment: 80000,
    aprPercent: 6,
    termYears: 30,
    homeAppreciationPercent: 3,
    closingCostsPercent: 3,
    sellingCostsPercent: 6,
    propertyTaxPercent: 1.2,
    insuranceAnnual: 1600,
    hoaMonthly: 0,
    maintenancePercent: 1,
    investmentReturnPercent: 5
  });
  assert.equal(r.series.length, 5);
  assert.equal(r.atHorizon.years, 5);
  assert.ok(typeof r.breakEvenYear === "number" || r.breakEvenYear === null);
  assert.ok(typeof r.breakEvenMonth === "number" || r.breakEvenMonth === null);
  assert.ok(r.series.every((p) => Number.isFinite(p.netWorthRent) && Number.isFinite(p.netWorthBuy)));
});

