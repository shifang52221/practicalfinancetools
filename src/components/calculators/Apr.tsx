import React, { useMemo, useState } from "react";
import { estimateApr } from "../../lib/calc/apr";
import { formatCurrency2 } from "../../lib/format";
import { clamp } from "../../lib/math";

export function AprCalculator() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [nominalRate, setNominalRate] = useState(9.99);
  const [termMonths, setTermMonths] = useState(60);
  const [fees, setFees] = useState(600);

  const result = useMemo(() => {
    return estimateApr({
      loanAmount: clamp(loanAmount, 0, 1e9),
      nominalRatePercent: clamp(nominalRate, 0, 200),
      termMonths: clamp(termMonths, 1, 600),
      fees: clamp(fees, 0, 1e8)
    });
  }, [loanAmount, nominalRate, termMonths, fees]);

  const aprText =
    result.aprPercent === null ? "-" : new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(result.aprPercent) + "%";

  const loanAmountSafe = clamp(loanAmount, 0, 1e9);
  const feesSafe = clamp(fees, 0, 1e8);
  const termMonthsSafe = Math.max(1, Math.floor(clamp(termMonths, 1, 600)));
  const netReceived = Math.max(0, loanAmountSafe - feesSafe);
  const totalPaid = result.payment * termMonthsSafe;
  const totalInterest = Math.max(0, totalPaid - loanAmountSafe);
  const feePct = loanAmountSafe > 0 ? (feesSafe / loanAmountSafe) * 100 : 0;
  const hasInvalidFee = loanAmountSafe > 0 && feesSafe >= loanAmountSafe;

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-3">
            <div className="label">Loan amount</div>
            <input type="number" inputMode="decimal" value={loanAmount} min={0} onChange={(e) => setLoanAmount(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Nominal interest rate (%)</div>
            <input type="number" inputMode="decimal" value={nominalRate} min={0} step={0.01} onChange={(e) => setNominalRate(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Term (months)</div>
            <input type="number" inputMode="numeric" value={termMonths} min={1} step={1} onChange={(e) => setTermMonths(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Upfront fees</div>
            <input type="number" inputMode="decimal" value={fees} min={0} onChange={(e) => setFees(+e.target.value)} />
            <div className="hint">Origination and similar fees</div>
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button className="btn" type="button" onClick={() => { setLoanAmount(15000); setNominalRate(9.99); setTermMonths(60); setFees(600); }}>
                Reset example
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Results</h3>
        <div className="kpis">
          <div className="kpi">
            <div className="k">Monthly payment (est.)</div>
            <div className="v">{formatCurrency2(result.payment)}</div>
            <div className="hint">Based on the nominal rate</div>
          </div>
          <div className="kpi">
            <div className="k">Estimated APR</div>
            <div className="v">{aprText}</div>
            <div className="hint">Includes fees</div>
          </div>
          <div className="kpi">
            <div className="k">Net received</div>
            <div className="v">{formatCurrency2(netReceived)}</div>
            <div className="hint">Loan amount minus fees</div>
          </div>
          <div className="kpi">
            <div className="k">Total paid (est.)</div>
            <div className="v">{formatCurrency2(totalPaid)}</div>
            <div className="hint">{termMonthsSafe} payments</div>
          </div>
          <div className="kpi">
            <div className="k">Total interest (est.)</div>
            <div className="v">{formatCurrency2(totalInterest)}</div>
            <div className="hint">Excludes fees</div>
          </div>
          <div className="kpi">
            <div className="k">Fees (% of amount)</div>
            <div className="v">{new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(feePct)}%</div>
          </div>
        </div>
        <div className="hint" style={{ marginTop: 12, lineHeight: 1.5 }}>
          {hasInvalidFee
            ? "If fees are greater than or equal to the loan amount, APR can't be estimated meaningfully. Reduce the fee amount."
            : "APR calculations can vary by lender and product type. This estimate treats fees as reducing the amount you effectively receive upfront."}
        </div>
      </div>
    </div>
  );
}
