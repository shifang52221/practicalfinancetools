import React, { useMemo, useState } from "react";
import { formatPercent } from "../../lib/format";
import { clamp } from "../../lib/math";

function labelForDti(dti: number): string {
  if (!Number.isFinite(dti)) return "—";
  if (dti < 0.2) return "Low";
  if (dti < 0.36) return "Moderate";
  if (dti < 0.43) return "Higher";
  return "High";
}

export function DtiCalculator() {
  const [grossIncomeMonthly, setGrossIncomeMonthly] = useState(6500);
  const [housingPayment, setHousingPayment] = useState(2200);
  const [otherDebtPayments, setOtherDebtPayments] = useState(450);

  const result = useMemo(() => {
    const income = clamp(grossIncomeMonthly, 0, 1e8);
    const housing = clamp(housingPayment, 0, 1e8);
    const other = clamp(otherDebtPayments, 0, 1e8);
    const totalDebt = housing + other;
    const backEnd = income > 0 ? totalDebt / income : Number.NaN;
    const frontEnd = income > 0 ? housing / income : Number.NaN;
    return { income, housing, other, totalDebt, frontEnd, backEnd };
  }, [grossIncomeMonthly, housingPayment, otherDebtPayments]);

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-3">
            <div className="label">Gross monthly income</div>
            <input type="number" inputMode="decimal" value={grossIncomeMonthly} min={0} onChange={(e) => setGrossIncomeMonthly(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Monthly housing payment</div>
            <input type="number" inputMode="decimal" value={housingPayment} min={0} onChange={(e) => setHousingPayment(+e.target.value)} />
            <div className="hint">Mortgage or rent + required fees</div>
          </div>
          <div className="field field-3">
            <div className="label">Other monthly debt payments</div>
            <input type="number" inputMode="decimal" value={otherDebtPayments} min={0} onChange={(e) => setOtherDebtPayments(+e.target.value)} />
            <div className="hint">Auto loans, student loans, cards (minimums)</div>
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button className="btn" type="button" onClick={() => { setGrossIncomeMonthly(6500); setHousingPayment(2200); setOtherDebtPayments(450); }}>
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
            <div className="k">Back-end DTI</div>
            <div className="v">{formatPercent(result.backEnd)}</div>
            <div className="hint">{labelForDti(result.backEnd)}</div>
          </div>
          <div className="kpi">
            <div className="k">Front-end DTI</div>
            <div className="v">{formatPercent(result.frontEnd)}</div>
            <div className="hint">Housing only</div>
          </div>
          <div className="kpi">
            <div className="k">Total monthly debt</div>
            <div className="v">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(result.totalDebt)}</div>
            <div className="hint">Housing + other debt</div>
          </div>
          <div className="kpi">
            <div className="k">Gross monthly income</div>
            <div className="v">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(result.income)}</div>
            <div className="hint">Before taxes</div>
          </div>
        </div>

        <div className="hint" style={{ marginTop: 12, lineHeight: 1.5 }}>
          Lenders may calculate DTI differently and use additional rules (credit score, reserves, employment history,
          property type). This calculator is educational.
        </div>
      </div>
    </div>
  );
}

