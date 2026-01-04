import React, { useMemo, useState } from "react";
import { amortizationSchedule } from "../../lib/calc/loan";
import { formatCurrency2 } from "../../lib/format";
import { clamp } from "../../lib/math";

export function AmortizationScheduleCalculator() {
  const [principal, setPrincipal] = useState(360000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const result = useMemo(() => {
    return amortizationSchedule({
      principal: clamp(principal, 0, 1e9),
      aprPercent: clamp(rate, 0, 30),
      termMonths: Math.round(clamp(termYears, 1, 60) * 12)
    });
  }, [principal, rate, termYears]);

  const preview = result.rows.slice(0, 24);

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-3">
            <div className="label">Loan amount</div>
            <input type="number" inputMode="decimal" value={principal} min={0} onChange={(e) => setPrincipal(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Interest rate (APR %)</div>
            <input type="number" inputMode="decimal" value={rate} min={0} step={0.01} onChange={(e) => setRate(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Term (years)</div>
            <input type="number" inputMode="numeric" value={termYears} min={1} step={1} onChange={(e) => setTermYears(+e.target.value)} />
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button className="btn" type="button" onClick={() => { setPrincipal(360000); setRate(6.5); setTermYears(30); }}>
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
            <div className="k">Monthly payment (P&amp;I)</div>
            <div className="v">{formatCurrency2(result.paymentPI)}</div>
          </div>
          <div className="kpi">
            <div className="k">Total interest (est.)</div>
            <div className="v">{formatCurrency2(result.totalInterest)}</div>
          </div>
          <div className="kpi">
            <div className="k">Total paid</div>
            <div className="v">{formatCurrency2(result.totalPaid)}</div>
          </div>
          <div className="kpi">
            <div className="k">Months</div>
            <div className="v">{result.months}</div>
          </div>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Schedule (first {preview.length} months)</summary>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th className="num">Payment</th>
                  <th className="num">Interest</th>
                  <th className="num">Principal</th>
                  <th className="num">Balance</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((r) => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td className="num">{formatCurrency2(r.payment)}</td>
                    <td className="num">{formatCurrency2(r.interest)}</td>
                    <td className="num">{formatCurrency2(r.principal)}</td>
                    <td className="num">{formatCurrency2(r.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
}

