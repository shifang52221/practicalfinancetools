import React, { useMemo, useState } from "react";
import { amortizationSchedule } from "../../lib/calc/loan";
import { formatCurrency2, formatMonths } from "../../lib/format";
import { clamp } from "../../lib/math";

export function ExtraPaymentMortgageCalculator() {
  const [principal, setPrincipal] = useState(360000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [extraMonthly, setExtraMonthly] = useState(150);
  const [extraMonthlyStartMonth, setExtraMonthlyStartMonth] = useState(1);
  const [extraMonthlyEndMonth, setExtraMonthlyEndMonth] = useState(0);
  const [extraOneTime, setExtraOneTime] = useState(0);
  const [extraOneTimeMonth, setExtraOneTimeMonth] = useState(1);

  const base = useMemo(() => {
    return amortizationSchedule({
      principal: clamp(principal, 0, 1e9),
      aprPercent: clamp(rate, 0, 30),
      termMonths: Math.round(clamp(termYears, 1, 60) * 12)
    });
  }, [principal, rate, termYears]);

  const withExtra = useMemo(() => {
    return amortizationSchedule({
      principal: clamp(principal, 0, 1e9),
      aprPercent: clamp(rate, 0, 30),
      termMonths: Math.round(clamp(termYears, 1, 60) * 12),
      extraMonthly: clamp(extraMonthly, 0, 1e8),
      extraMonthlyStartMonth: clamp(extraMonthlyStartMonth, 1, 1200),
      extraMonthlyEndMonth: extraMonthlyEndMonth > 0 ? clamp(extraMonthlyEndMonth, 1, 1200) : undefined,
      extraOneTime: clamp(extraOneTime, 0, 1e9),
      extraOneTimeMonth: clamp(extraOneTimeMonth, 1, 1200)
    });
  }, [principal, rate, termYears, extraMonthly, extraMonthlyStartMonth, extraMonthlyEndMonth, extraOneTime, extraOneTimeMonth]);

  const interestSaved = base.totalInterest - withExtra.totalInterest;
  const monthsSaved = base.months - withExtra.months;
  const preview = withExtra.rows.slice(0, 24);
  const extraMonthlyApplies =
    extraMonthly > 0 && (extraMonthlyEndMonth <= 0 || extraMonthlyEndMonth >= extraMonthlyStartMonth);

  function toCsv(rows: typeof withExtra.rows) {
    const header = ["month", "payment", "extra_principal", "interest", "principal", "starting_balance", "ending_balance"];
    const lines = rows.map((r) =>
      [
        r.month,
        r.payment.toFixed(2),
        r.extraPrincipal.toFixed(2),
        r.interest.toFixed(2),
        r.principal.toFixed(2),
        r.startingBalance.toFixed(2),
        r.endingBalance.toFixed(2)
      ].join(",")
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
          <div className="field field-3">
            <div className="label">Extra payment (monthly)</div>
            <input type="number" inputMode="decimal" value={extraMonthly} min={0} onChange={(e) => setExtraMonthly(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Extra starts (month)</div>
            <input
              type="number"
              inputMode="numeric"
              value={extraMonthlyStartMonth}
              min={1}
              step={1}
              onChange={(e) => setExtraMonthlyStartMonth(+e.target.value)}
            />
            <div className="hint">Month 1 = first payment</div>
          </div>
          <div className="field field-3">
            <div className="label">Extra ends (month)</div>
            <input
              type="number"
              inputMode="numeric"
              value={extraMonthlyEndMonth}
              min={0}
              step={1}
              onChange={(e) => setExtraMonthlyEndMonth(+e.target.value)}
            />
            <div className="hint">0 = no end date</div>
          </div>
          <div className="field field-3">
            <div className="label">One-time extra</div>
            <input type="number" inputMode="decimal" value={extraOneTime} min={0} onChange={(e) => setExtraOneTime(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">One-time month</div>
            <input type="number" inputMode="numeric" value={extraOneTimeMonth} min={1} step={1} onChange={(e) => setExtraOneTimeMonth(+e.target.value)} />
            <div className="hint">Month 1 = first payment</div>
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setPrincipal(360000);
                  setRate(6.5);
                  setTermYears(30);
                  setExtraMonthly(150);
                  setExtraMonthlyStartMonth(1);
                  setExtraMonthlyEndMonth(0);
                  setExtraOneTime(0);
                  setExtraOneTimeMonth(1);
                }}
              >
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
            <div className="k">Interest saved (est.)</div>
            <div className="v">{formatCurrency2(interestSaved)}</div>
          </div>
          <div className="kpi">
            <div className="k">Time saved</div>
            <div className="v">{formatMonths(monthsSaved)}</div>
          </div>
          <div className="kpi">
            <div className="k">New payoff time</div>
            <div className="v">{formatMonths(withExtra.months)}</div>
          </div>
          <div className="kpi">
            <div className="k">New monthly P&amp;I</div>
            <div className="v">{formatCurrency2(withExtra.paymentPI + (extraMonthlyApplies ? extraMonthly : 0))}</div>
            <div className="hint">Required P&amp;I stays the same; extra is added when active</div>
          </div>
        </div>

        <div className="btn-row" style={{ marginTop: 12 }}>
          <button
            className="btn"
            type="button"
            onClick={() => downloadCsv("mortgage-extra-payment-schedule.csv", toCsv(withExtra.rows))}
          >
            Download schedule (CSV)
          </button>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Schedule (first {preview.length} months)</summary>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th className="num">Payment</th>
                  <th className="num">Extra</th>
                  <th className="num">Interest</th>
                  <th className="num">Balance</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((r) => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td className="num">{formatCurrency2(r.payment)}</td>
                    <td className="num">{formatCurrency2(r.extraPrincipal)}</td>
                    <td className="num">{formatCurrency2(r.interest)}</td>
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
