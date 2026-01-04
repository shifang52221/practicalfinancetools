import React, { useMemo, useState } from "react";
import { buildDebtPlan, type DebtInput } from "../../lib/calc/debtPlan";
import { formatCurrency2, formatMonths } from "../../lib/format";
import { clamp } from "../../lib/math";

function uid() {
  return Math.random().toString(16).slice(2);
}

function sanitizeDebt(d: DebtInput): DebtInput {
  return {
    ...d,
    name: d.name || "Debt",
    balance: clamp(d.balance, 0, 1e9),
    aprPercent: clamp(d.aprPercent, 0, 200),
    minPayment: clamp(d.minPayment, 0, 1e8)
  };
}

export function DebtSnowballCalculator() {
  const [extraMonthly, setExtraMonthly] = useState(150);
  const [debts, setDebts] = useState<DebtInput[]>([
    { id: uid(), name: "Card A", balance: 3200, aprPercent: 24.99, minPayment: 95 },
    { id: uid(), name: "Card B", balance: 7800, aprPercent: 18.99, minPayment: 160 },
    { id: uid(), name: "Loan", balance: 12000, aprPercent: 9.5, minPayment: 260 }
  ]);

  const plan = useMemo(() => {
    return buildDebtPlan({
      debts: debts.map(sanitizeDebt),
      extraMonthly: clamp(extraMonthly, 0, 1e8),
      strategy: "snowball"
    });
  }, [debts, extraMonthly]);

  const payoffPreview = plan.payoffs.slice(0, 8);
  const timelinePreview = plan.rows.slice(0, 24);

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-6">
            <div className="label">Extra payment (monthly)</div>
            <input type="number" inputMode="decimal" value={extraMonthly} min={0} onChange={(e) => setExtraMonthly(+e.target.value)} />
            <div className="hint">Extra amount added on top of all minimum payments.</div>
          </div>

          <div className="field field-6" style={{ marginTop: 4 }}>
            <div className="label">Debts</div>
            <div style={{ display: "grid", gap: 10 }}>
              {debts.map((d) => (
                <div key={d.id} className="card2" style={{ padding: 12 }}>
                  <div className="form" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
                    <div className="field field-2">
                      <div className="label">Name</div>
                      <input value={d.name} onChange={(e) => setDebts((prev) => prev.map((x) => (x.id === d.id ? { ...x, name: e.target.value } : x)))} />
                    </div>
                    <div className="field field-2">
                      <div className="label">Balance</div>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={d.balance}
                        min={0}
                        onChange={(e) => setDebts((prev) => prev.map((x) => (x.id === d.id ? { ...x, balance: +e.target.value } : x)))}
                      />
                    </div>
                    <div className="field field-1">
                      <div className="label">APR (%)</div>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={d.aprPercent}
                        min={0}
                        step={0.01}
                        onChange={(e) => setDebts((prev) => prev.map((x) => (x.id === d.id ? { ...x, aprPercent: +e.target.value } : x)))}
                      />
                    </div>
                    <div className="field field-1">
                      <div className="label">Min/mo</div>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={d.minPayment}
                        min={0}
                        onChange={(e) => setDebts((prev) => prev.map((x) => (x.id === d.id ? { ...x, minPayment: +e.target.value } : x)))}
                      />
                    </div>
                    <div className="field field-6">
                      <div className="btn-row">
                        <button
                          className="btn"
                          type="button"
                          onClick={() => setDebts((prev) => prev.filter((x) => x.id !== d.id))}
                          style={{ borderColor: "rgba(255,107,107,.35)" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="btn-row" style={{ marginTop: 10 }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  setDebts((prev) => [
                    ...prev,
                    { id: uid(), name: `Debt ${prev.length + 1}`, balance: 1000, aprPercent: 19.99, minPayment: 35 }
                  ])
                }
              >
                Add debt
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setExtraMonthly(150);
                  setDebts([
                    { id: uid(), name: "Card A", balance: 3200, aprPercent: 24.99, minPayment: 95 },
                    { id: uid(), name: "Card B", balance: 7800, aprPercent: 18.99, minPayment: 160 },
                    { id: uid(), name: "Loan", balance: 12000, aprPercent: 9.5, minPayment: 260 }
                  ]);
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
            <div className="k">Time to debt-free</div>
            <div className="v">{formatMonths(plan.months)}</div>
          </div>
          <div className="kpi">
            <div className="k">Total interest (est.)</div>
            <div className="v">{formatCurrency2(plan.totalInterest)}</div>
          </div>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Payoff order</summary>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Debt</th>
                  <th className="num">Payoff time</th>
                  <th className="num">Interest</th>
                </tr>
              </thead>
              <tbody>
                {payoffPreview.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="num">{formatMonths(p.payoffMonth)}</td>
                    <td className="num">{formatCurrency2(p.totalInterest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Timeline (first {timelinePreview.length} months)</summary>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th className="num">Balance</th>
                  <th className="num">Payment</th>
                  <th className="num">Interest</th>
                </tr>
              </thead>
              <tbody>
                {timelinePreview.map((r) => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td className="num">{formatCurrency2(r.totalBalance)}</td>
                    <td className="num">{formatCurrency2(r.payment)}</td>
                    <td className="num">{formatCurrency2(r.interest)}</td>
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

