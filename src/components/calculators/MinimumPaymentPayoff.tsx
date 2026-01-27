import React, { useMemo, useState } from "react";
import { minimumPaymentPayoffSchedule } from "../../lib/calc/creditCard";
import { formatCurrency2, formatMonths } from "../../lib/format";
import { clamp } from "../../lib/math";

export function MinimumPaymentPayoff() {
  const [balance, setBalance] = useState(6000);
  const [apr, setApr] = useState(22.99);
  const [minPercent, setMinPercent] = useState(2);
  const [minDollars, setMinDollars] = useState(25);

  const result = useMemo(() => {
    return minimumPaymentPayoffSchedule({
      balance: clamp(balance, 0, 1e9),
      aprPercent: clamp(apr, 0, 200),
      minPercent: clamp(minPercent, 0, 100),
      minDollars: clamp(minDollars, 0, 1e6)
    });
  }, [balance, apr, minPercent, minDollars]);

  const preview = result.rows.slice(0, 18);

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-3">
            <div className="label">Balance</div>
            <input type="number" inputMode="decimal" value={balance} min={0} onChange={(e) => setBalance(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">APR (%)</div>
            <input type="number" inputMode="decimal" value={apr} min={0} step={0.01} onChange={(e) => setApr(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Minimum payment (%)</div>
            <input type="number" inputMode="decimal" value={minPercent} min={0} step={0.1} onChange={(e) => setMinPercent(+e.target.value)} />
            <div className="hint">Example: 2% of balance</div>
          </div>
          <div className="field field-3">
            <div className="label">Minimum payment ($)</div>
            <input type="number" inputMode="decimal" value={minDollars} min={0} onChange={(e) => setMinDollars(+e.target.value)} />
            <div className="hint">Example: $25 minimum</div>
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setBalance(6000);
                  setApr(22.99);
                  setMinPercent(2);
                  setMinDollars(25);
                }}
              >
                Reset example
              </button>
            </div>
            <div className="hint" style={{ marginTop: 8 }}>
              Card issuers can use different minimum-payment rules. This is a simplified estimate.
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Results</h3>
        <div className="kpis">
          <div className="kpi">
            <div className="k">Time to payoff</div>
            <div className="v">{result.months === null ? "Not paid off" : formatMonths(result.months)}</div>
          </div>
          <div className="kpi">
            <div className="k">Total interest</div>
            <div className="v">{formatCurrency2(result.totalInterest)}</div>
          </div>
          <div className="kpi">
            <div className="k">Total paid</div>
            <div className="v">{formatCurrency2(result.totalPaid)}</div>
          </div>
          <div className="kpi">
            <div className="k">Months shown</div>
            <div className="v">{preview.length}</div>
          </div>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Schedule (first {preview.length} months)</summary>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th className="num">Start</th>
                  <th className="num">Interest</th>
                  <th className="num">Payment</th>
                  <th className="num">End</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((r) => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td className="num">{formatCurrency2(r.startingBalance)}</td>
                    <td className="num">{formatCurrency2(r.interest)}</td>
                    <td className="num">{formatCurrency2(r.payment)}</td>
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
