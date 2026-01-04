import React, { useMemo, useState } from "react";
import { creditCardPayoffSchedule } from "../../lib/calc/creditCard";
import { formatCurrency2, formatMonths } from "../../lib/format";
import { clamp } from "../../lib/math";

export function CreditCardPayoff() {
  const [balance, setBalance] = useState(6000);
  const [apr, setApr] = useState(22.99);
  const [payment, setPayment] = useState(250);

  const result = useMemo(() => {
    return creditCardPayoffSchedule({
      balance: clamp(balance, 0, 1e9),
      aprPercent: clamp(apr, 0, 200),
      monthlyPayment: clamp(payment, 0, 1e7)
    });
  }, [balance, apr, payment]);

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
            <div className="label">Monthly payment</div>
            <input type="number" inputMode="decimal" value={payment} min={0} onChange={(e) => setPayment(+e.target.value)} />
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button className="btn" type="button" onClick={() => { setBalance(6000); setApr(22.99); setPayment(250); }}>
                Reset example
              </button>
            </div>
            <div className="hint" style={{ marginTop: 8 }}>
              Estimates assume a fixed APR and that you make the same payment each month.
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Results</h3>
        <div className="kpis">
          <div className="kpi">
            <div className="k">Time to payoff</div>
            <div className="v">{result.months ? formatMonths(result.months) : "—"}</div>
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
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Payoff schedule (first {preview.length} months)</summary>
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

