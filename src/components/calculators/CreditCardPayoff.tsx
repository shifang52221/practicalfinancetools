import React, { useMemo, useState } from "react";
import { creditCardPayoffSchedule, paymentToPayoffInMonths } from "../../lib/calc/creditCard";
import { formatCurrency2, formatMonths } from "../../lib/format";
import { clamp } from "../../lib/math";

export function CreditCardPayoff() {
  const [balance, setBalance] = useState(6000);
  const [apr, setApr] = useState(22.99);
  const [payment, setPayment] = useState(250);
  const [targetMonths, setTargetMonths] = useState(24);

  const balanceSafe = clamp(balance, 0, 1e9);
  const aprSafe = clamp(apr, 0, 200);
  const paymentSafe = clamp(payment, 0, 1e7);
  const targetMonthsSafe = Math.max(1, Math.floor(clamp(targetMonths, 1, 600)));

  const result = useMemo(() => {
    return creditCardPayoffSchedule({
      balance: balanceSafe,
      aprPercent: aprSafe,
      monthlyPayment: paymentSafe
    });
  }, [balanceSafe, aprSafe, paymentSafe]);

  const suggestedPayment = useMemo(() => {
    return paymentToPayoffInMonths({
      balance: balanceSafe,
      aprPercent: aprSafe,
      targetMonths: targetMonthsSafe
    });
  }, [balanceSafe, aprSafe, targetMonthsSafe]);

  const preview = result.rows.slice(0, 18);
  const notPayingOff = result.months === null && balanceSafe > 0.005;

  function toCsv(rows: typeof result.rows) {
    const header = ["month", "starting_balance", "interest", "payment", "principal", "ending_balance"];
    const lines = rows.map((r) =>
      [r.month, r.startingBalance.toFixed(2), r.interest.toFixed(2), r.payment.toFixed(2), r.principal.toFixed(2), r.endingBalance.toFixed(2)].join(
        ","
      )
    );
    return [header.join(","), ...lines].join("\n");
  }

  function downloadCsv(filename: string, csv: string) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

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
          <div className="field field-3">
            <div className="label">Target payoff (months)</div>
            <input type="number" inputMode="numeric" value={targetMonths} min={1} step={1} onChange={(e) => setTargetMonths(+e.target.value)} />
            <div className="hint">Used to estimate required payment</div>
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setBalance(6000);
                  setApr(22.99);
                  setPayment(250);
                  setTargetMonths(24);
                }}
              >
                Reset example
              </button>
            </div>
            <div className="hint" style={{ marginTop: 8 }}>
              Estimates assume a fixed APR and a fixed payment each month. Many cards accrue interest daily; this is a monthly approximation.
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
            <div className="k">Payment to avoid growth</div>
            <div className="v">{formatCurrency2(result.minPaymentToAvoidGrowth)}</div>
            <div className="hint">Based on month-1 interest</div>
          </div>
          <div className="kpi">
            <div className="k">Payment to payoff in {targetMonthsSafe} months</div>
            <div className="v">{suggestedPayment === null ? "—" : formatCurrency2(suggestedPayment)}</div>
          </div>
          <div className="kpi">
            <div className="k">Months shown</div>
            <div className="v">{preview.length}</div>
          </div>
        </div>

        {notPayingOff ? (
          <div className="hint" style={{ marginTop: 12, lineHeight: 1.5 }}>
            Your payment is too low to pay off the balance under this model. Increase the payment above the interest amount (or set a target payoff).
          </div>
        ) : null}

        <div className="btn-row" style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={() => downloadCsv("credit-card-payoff-schedule.csv", toCsv(result.rows))}>
            Download schedule (CSV)
          </button>
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

