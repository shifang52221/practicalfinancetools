import React, { useMemo, useState } from "react";
import { calculateDti, maxHousingForBackEndDti, maxHousingForFrontEndDti } from "../../lib/calc/dti";
import { formatCurrency2, formatPercent } from "../../lib/format";
import { clamp } from "../../lib/math";

function labelForDti(dti: number): string {
  if (!Number.isFinite(dti)) return "N/A";
  if (dti < 0.2) return "Low";
  if (dti < 0.36) return "Moderate";
  if (dti < 0.43) return "Higher";
  return "High";
}

export function DtiCalculator() {
  const [grossIncomeMonthly, setGrossIncomeMonthly] = useState(6500);
  const [housingPayment, setHousingPayment] = useState(2200);
  const [otherDebtPayments, setOtherDebtPayments] = useState(450);
  const [targetFrontEndPct, setTargetFrontEndPct] = useState(28);
  const [targetBackEndPct, setTargetBackEndPct] = useState(36);

  const result = useMemo(() => {
    return calculateDti({
      incomeMonthly: clamp(grossIncomeMonthly, 0, 1e8),
      housingMonthly: clamp(housingPayment, 0, 1e8),
      otherDebtMonthly: clamp(otherDebtPayments, 0, 1e8)
    });
  }, [grossIncomeMonthly, housingPayment, otherDebtPayments]);

  const targets = useMemo(() => {
    const targetFrontEnd = clamp(targetFrontEndPct, 0, 100) / 100;
    const targetBackEnd = clamp(targetBackEndPct, 0, 100) / 100;

    const maxFront = maxHousingForFrontEndDti({
      incomeMonthly: result.incomeMonthly,
      targetFrontEndDti: targetFrontEnd
    });
    const maxBack = maxHousingForBackEndDti({
      incomeMonthly: result.incomeMonthly,
      otherDebtMonthly: result.otherDebtMonthly,
      targetBackEndDti: targetBackEnd
    });
    const maxHousing = maxFront === null || maxBack === null ? null : Math.min(maxFront, maxBack);
    return { targetFrontEnd, targetBackEnd, maxHousing };
  }, [result.incomeMonthly, result.otherDebtMonthly, targetFrontEndPct, targetBackEndPct]);

  const backEndText = result.backEndDti === null ? "N/A" : formatPercent(result.backEndDti);
  const frontEndText = result.frontEndDti === null ? "N/A" : formatPercent(result.frontEndDti);
  const maxHousingText = targets.maxHousing === null ? "N/A" : formatCurrency2(targets.maxHousing);

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-3">
            <div className="label">Gross monthly income</div>
            <input
              type="number"
              inputMode="decimal"
              value={grossIncomeMonthly}
              min={0}
              onChange={(e) => setGrossIncomeMonthly(+e.target.value)}
            />
          </div>
          <div className="field field-3">
            <div className="label">Monthly housing payment</div>
            <input type="number" inputMode="decimal" value={housingPayment} min={0} onChange={(e) => setHousingPayment(+e.target.value)} />
            <div className="hint">Mortgage or rent + required fees</div>
          </div>
          <div className="field field-3">
            <div className="label">Other monthly debt payments</div>
            <input
              type="number"
              inputMode="decimal"
              value={otherDebtPayments}
              min={0}
              onChange={(e) => setOtherDebtPayments(+e.target.value)}
            />
            <div className="hint">Auto loans, student loans, cards (minimums)</div>
          </div>
          <div className="field field-3">
            <div className="label">Target front-end DTI (%)</div>
            <input
              type="number"
              inputMode="decimal"
              value={targetFrontEndPct}
              min={0}
              step={0.1}
              onChange={(e) => setTargetFrontEndPct(+e.target.value)}
            />
            <div className="hint">Housing-only target</div>
          </div>
          <div className="field field-3">
            <div className="label">Target back-end DTI (%)</div>
            <input
              type="number"
              inputMode="decimal"
              value={targetBackEndPct}
              min={0}
              step={0.1}
              onChange={(e) => setTargetBackEndPct(+e.target.value)}
            />
            <div className="hint">Total debt target</div>
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setGrossIncomeMonthly(6500);
                  setHousingPayment(2200);
                  setOtherDebtPayments(450);
                  setTargetFrontEndPct(28);
                  setTargetBackEndPct(36);
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
            <div className="k">Back-end DTI</div>
            <div className="v">{backEndText}</div>
            <div className="hint">{result.backEndDti === null ? "Enter income" : labelForDti(result.backEndDti)}</div>
          </div>
          <div className="kpi">
            <div className="k">Front-end DTI</div>
            <div className="v">{frontEndText}</div>
            <div className="hint">Housing only</div>
          </div>
          <div className="kpi">
            <div className="k">Total monthly debt</div>
            <div className="v">{formatCurrency2(result.totalDebtMonthly)}</div>
            <div className="hint">Housing + other debt</div>
          </div>
          <div className="kpi">
            <div className="k">Gross monthly income</div>
            <div className="v">{formatCurrency2(result.incomeMonthly)}</div>
            <div className="hint">Before taxes</div>
          </div>
          <div className="kpi">
            <div className="k">Max housing (targets)</div>
            <div className="v">{maxHousingText}</div>
            <div className="hint">
              Uses min(front-end {formatPercent(targets.targetFrontEnd)}, back-end {formatPercent(targets.targetBackEnd)})
            </div>
          </div>
        </div>

        <div className="hint" style={{ marginTop: 12, lineHeight: 1.5 }}>
          Lenders may calculate DTI differently and use additional rules (credit score, reserves, employment history, property type). This
          calculator is educational.
        </div>
      </div>
    </div>
  );
}
