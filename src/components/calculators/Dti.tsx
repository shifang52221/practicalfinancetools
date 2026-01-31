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

  const incomeSafe = clamp(grossIncomeMonthly, 0, 1e8);
  const housingSafe = clamp(housingPayment, 0, 1e8);
  const otherDebtSafe = clamp(otherDebtPayments, 0, 1e8);
  const targetFrontEndSafe = clamp(targetFrontEndPct, 0, 100);
  const targetBackEndSafe = clamp(targetBackEndPct, 0, 100);

  const result = useMemo(() => {
    return calculateDti({
      incomeMonthly: incomeSafe,
      housingMonthly: housingSafe,
      otherDebtMonthly: otherDebtSafe
    });
  }, [incomeSafe, housingSafe, otherDebtSafe]);

  const targets = useMemo(() => {
    const targetFrontEnd = targetFrontEndSafe / 100;
    const targetBackEnd = targetBackEndSafe / 100;

    const maxFrontHousing = maxHousingForFrontEndDti({
      incomeMonthly: result.incomeMonthly,
      targetFrontEndDti: targetFrontEnd
    });
    const maxBackHousing = maxHousingForBackEndDti({
      incomeMonthly: result.incomeMonthly,
      otherDebtMonthly: result.otherDebtMonthly,
      targetBackEndDti: targetBackEnd
    });
    const maxHousing =
      maxFrontHousing === null || maxBackHousing === null ? null : Math.min(maxFrontHousing, maxBackHousing);
    const minIncomeFront = targetFrontEnd > 0 ? result.housingMonthly / targetFrontEnd : null;
    const minIncomeBack = targetBackEnd > 0 ? result.totalDebtMonthly / targetBackEnd : null;
    return { targetFrontEnd, targetBackEnd, maxHousing, maxFrontHousing, maxBackHousing, minIncomeFront, minIncomeBack };
  }, [result.incomeMonthly, result.otherDebtMonthly, targetFrontEndSafe, targetBackEndSafe]);

  const backEndText = result.backEndDti === null ? "N/A" : formatPercent(result.backEndDti);
  const frontEndText = result.frontEndDti === null ? "N/A" : formatPercent(result.frontEndDti);
  const maxHousingText = targets.maxHousing === null ? "N/A" : formatCurrency2(targets.maxHousing);
  const headroomText = targets.maxHousing === null ? "N/A" : formatCurrency2(targets.maxHousing - result.housingMonthly);
  const minIncomeFrontText = targets.minIncomeFront === null ? "N/A" : formatCurrency2(targets.minIncomeFront);
  const minIncomeBackText = targets.minIncomeBack === null ? "N/A" : formatCurrency2(targets.minIncomeBack);
  const maxFrontHousingText = targets.maxFrontHousing === null ? "N/A" : formatCurrency2(targets.maxFrontHousing);
  const maxBackHousingText = targets.maxBackHousing === null ? "N/A" : formatCurrency2(targets.maxBackHousing);

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
            <div className="hint">Use gross income (before taxes).</div>
            <div className="btn-row" style={{ marginTop: 8 }}>
              <button className="btn" type="button" onClick={() => setGrossIncomeMonthly(4000)}>
                $4,000
              </button>
              <button className="btn" type="button" onClick={() => setGrossIncomeMonthly(6500)}>
                $6,500
              </button>
              <button className="btn" type="button" onClick={() => setGrossIncomeMonthly(10000)}>
                $10,000
              </button>
            </div>
          </div>
          <div className="field field-3">
            <div className="label">Monthly housing payment</div>
            <input
              type="number"
              inputMode="decimal"
              value={housingPayment}
              min={0}
              onChange={(e) => setHousingPayment(+e.target.value)}
            />
            <div className="hint">Use PITI + HOA + PMI for mortgages.</div>
            <div className="btn-row" style={{ marginTop: 8 }}>
              <button className="btn" type="button" onClick={() => setHousingPayment(1500)}>
                $1,500
              </button>
              <button className="btn" type="button" onClick={() => setHousingPayment(2200)}>
                $2,200
              </button>
              <button className="btn" type="button" onClick={() => setHousingPayment(3000)}>
                $3,000
              </button>
            </div>
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
            <div className="hint">Use required minimums, not planned payments.</div>
            <div className="btn-row" style={{ marginTop: 8 }}>
              <button className="btn" type="button" onClick={() => setOtherDebtPayments(0)}>
                $0
              </button>
              <button className="btn" type="button" onClick={() => setOtherDebtPayments(300)}>
                $300
              </button>
              <button className="btn" type="button" onClick={() => setOtherDebtPayments(600)}>
                $600
              </button>
            </div>
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
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setTargetFrontEndPct(28);
                  setTargetBackEndPct(36);
                }}
              >
                28/36 targets
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setTargetFrontEndPct(31);
                  setTargetBackEndPct(43);
                }}
              >
                31/43 targets
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  if (targets.maxHousing === null) return;
                  setHousingPayment(Math.max(0, Math.round(targets.maxHousing)));
                }}
                disabled={targets.maxHousing === null}
              >
                Use max housing
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
          <div className="kpi">
            <div className="k">Housing headroom</div>
            <div className="v">{headroomText}</div>
            <div className="hint">Max housing minus current housing</div>
          </div>
          <div className="kpi">
            <div className="k">Max housing (front-end)</div>
            <div className="v">{maxFrontHousingText}</div>
            <div className="hint">Target {formatPercent(targets.targetFrontEnd)}</div>
          </div>
          <div className="kpi">
            <div className="k">Max housing (back-end)</div>
            <div className="v">{maxBackHousingText}</div>
            <div className="hint">Target {formatPercent(targets.targetBackEnd)}</div>
          </div>
          <div className="kpi">
            <div className="k">Income needed (front-end)</div>
            <div className="v">{minIncomeFrontText}</div>
            <div className="hint">To support current housing</div>
          </div>
          <div className="kpi">
            <div className="k">Income needed (back-end)</div>
            <div className="v">{minIncomeBackText}</div>
            <div className="hint">To support total debt</div>
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
