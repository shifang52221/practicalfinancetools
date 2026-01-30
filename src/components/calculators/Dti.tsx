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
  const [useIncomeBreakdown, setUseIncomeBreakdown] = useState(false);
  const [useHousingBreakdown, setUseHousingBreakdown] = useState(true);
  const [useDebtBreakdown, setUseDebtBreakdown] = useState(true);
  const [incomeBase, setIncomeBase] = useState(5200);
  const [incomeVariable, setIncomeVariable] = useState(900);
  const [incomeOther, setIncomeOther] = useState(400);
  const [housingPrincipalInterest, setHousingPrincipalInterest] = useState(1600);
  const [housingTaxes, setHousingTaxes] = useState(350);
  const [housingInsurance, setHousingInsurance] = useState(120);
  const [housingHoa, setHousingHoa] = useState(80);
  const [housingPmi, setHousingPmi] = useState(50);
  const [debtCreditCards, setDebtCreditCards] = useState(120);
  const [debtAutoLoans, setDebtAutoLoans] = useState(250);
  const [debtStudentLoans, setDebtStudentLoans] = useState(80);
  const [debtPersonalLoans, setDebtPersonalLoans] = useState(0);
  const [debtOther, setDebtOther] = useState(0);

  const result = useMemo(() => {
    const incomeMonthly = useIncomeBreakdown ? incomeBase + incomeVariable + incomeOther : grossIncomeMonthly;
    const housingMonthly = useHousingBreakdown
      ? housingPrincipalInterest + housingTaxes + housingInsurance + housingHoa + housingPmi
      : housingPayment;
    const otherDebtMonthly = useDebtBreakdown
      ? debtCreditCards + debtAutoLoans + debtStudentLoans + debtPersonalLoans + debtOther
      : otherDebtPayments;
    return calculateDti({
      incomeMonthly: clamp(incomeMonthly, 0, 1e8),
      housingMonthly: clamp(housingMonthly, 0, 1e8),
      otherDebtMonthly: clamp(otherDebtMonthly, 0, 1e8)
    });
  }, [
    grossIncomeMonthly,
    housingPayment,
    otherDebtPayments,
    useIncomeBreakdown,
    useHousingBreakdown,
    useDebtBreakdown,
    incomeBase,
    incomeVariable,
    incomeOther,
    housingPrincipalInterest,
    housingTaxes,
    housingInsurance,
    housingHoa,
    housingPmi,
    debtCreditCards,
    debtAutoLoans,
    debtStudentLoans,
    debtPersonalLoans,
    debtOther
  ]);

  const targets = useMemo(() => {
    const targetFrontEnd = clamp(targetFrontEndPct, 0, 100) / 100;
    const targetBackEnd = clamp(targetBackEndPct, 0, 100) / 100;

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
  }, [result.incomeMonthly, result.otherDebtMonthly, targetFrontEndPct, targetBackEndPct]);

  const backEndText = result.backEndDti === null ? "N/A" : formatPercent(result.backEndDti);
  const frontEndText = result.frontEndDti === null ? "N/A" : formatPercent(result.frontEndDti);
  const maxHousingText = targets.maxHousing === null ? "N/A" : formatCurrency2(targets.maxHousing);
  const headroomText =
    targets.maxHousing === null ? "N/A" : formatCurrency2(targets.maxHousing - result.housingMonthly);
  const minIncomeFrontText = targets.minIncomeFront === null ? "N/A" : formatCurrency2(targets.minIncomeFront);
  const minIncomeBackText = targets.minIncomeBack === null ? "N/A" : formatCurrency2(targets.minIncomeBack);
  const maxFrontHousingText = targets.maxFrontHousing === null ? "N/A" : formatCurrency2(targets.maxFrontHousing);
  const maxBackHousingText = targets.maxBackHousing === null ? "N/A" : formatCurrency2(targets.maxBackHousing);

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-6">
            <div className="label">Income</div>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <button className="btn" type="button" onClick={() => setUseIncomeBreakdown(!useIncomeBreakdown)}>
                {useIncomeBreakdown ? "Use single income input" : "Use income breakdown"}
              </button>
            </div>
            <div className="hint">Use gross monthly income (before taxes).</div>
          </div>
          <div className="field field-3">
            <div className="label">Gross monthly income</div>
            <input
              type="number"
              inputMode="decimal"
              value={useIncomeBreakdown ? incomeBase + incomeVariable + incomeOther : grossIncomeMonthly}
              min={0}
              onChange={(e) =>
                useIncomeBreakdown ? setIncomeBase(+e.target.value - incomeVariable - incomeOther) : setGrossIncomeMonthly(+e.target.value)
              }
              readOnly={useIncomeBreakdown}
            />
            {useIncomeBreakdown && <div className="hint">Sum of base + variable + other income</div>}
          </div>
          {useIncomeBreakdown && (
            <>
              <div className="field field-3">
                <div className="label">Base income</div>
                <input type="number" inputMode="decimal" value={incomeBase} min={0} onChange={(e) => setIncomeBase(+e.target.value)} />
                <div className="hint">Salary or hourly wages</div>
              </div>
              <div className="field field-3">
                <div className="label">Variable income</div>
                <input
                  type="number"
                  inputMode="decimal"
                  value={incomeVariable}
                  min={0}
                  onChange={(e) => setIncomeVariable(+e.target.value)}
                />
                <div className="hint">Bonuses, commission, overtime</div>
              </div>
              <div className="field field-3">
                <div className="label">Other income</div>
                <input type="number" inputMode="decimal" value={incomeOther} min={0} onChange={(e) => setIncomeOther(+e.target.value)} />
                <div className="hint">Documentable side income</div>
              </div>
            </>
          )}

          <div className="field field-6">
            <div className="label">Housing payment</div>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <button className="btn" type="button" onClick={() => setUseHousingBreakdown(!useHousingBreakdown)}>
                {useHousingBreakdown ? "Use single housing input" : "Use housing breakdown"}
              </button>
            </div>
            <div className="hint">Use PITI + HOA + PMI for mortgage scenarios.</div>
          </div>
          <div className="field field-3">
            <div className="label">Monthly housing payment</div>
            <input
              type="number"
              inputMode="decimal"
              value={
                useHousingBreakdown
                  ? housingPrincipalInterest + housingTaxes + housingInsurance + housingHoa + housingPmi
                  : housingPayment
              }
              min={0}
              onChange={(e) =>
                useHousingBreakdown
                  ? setHousingPrincipalInterest(+e.target.value - housingTaxes - housingInsurance - housingHoa - housingPmi)
                  : setHousingPayment(+e.target.value)
              }
              readOnly={useHousingBreakdown}
            />
            {useHousingBreakdown && <div className="hint">Sum of P&amp;I + taxes + insurance + HOA + PMI</div>}
          </div>
          {useHousingBreakdown && (
            <>
              <div className="field field-3">
                <div className="label">Principal &amp; interest</div>
                <input
                  type="number"
                  inputMode="decimal"
                  value={housingPrincipalInterest}
                  min={0}
                  onChange={(e) => setHousingPrincipalInterest(+e.target.value)}
                />
              </div>
              <div className="field field-3">
                <div className="label">Property taxes</div>
                <input type="number" inputMode="decimal" value={housingTaxes} min={0} onChange={(e) => setHousingTaxes(+e.target.value)} />
              </div>
              <div className="field field-3">
                <div className="label">Homeowners insurance</div>
                <input
                  type="number"
                  inputMode="decimal"
                  value={housingInsurance}
                  min={0}
                  onChange={(e) => setHousingInsurance(+e.target.value)}
                />
              </div>
              <div className="field field-3">
                <div className="label">HOA dues</div>
                <input type="number" inputMode="decimal" value={housingHoa} min={0} onChange={(e) => setHousingHoa(+e.target.value)} />
              </div>
              <div className="field field-3">
                <div className="label">PMI / mortgage insurance</div>
                <input type="number" inputMode="decimal" value={housingPmi} min={0} onChange={(e) => setHousingPmi(+e.target.value)} />
              </div>
            </>
          )}

          <div className="field field-6">
            <div className="label">Other debt payments</div>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <button className="btn" type="button" onClick={() => setUseDebtBreakdown(!useDebtBreakdown)}>
                {useDebtBreakdown ? "Use single debt input" : "Use debt breakdown"}
              </button>
            </div>
            <div className="hint">Use required monthly payments, not planned payments.</div>
          </div>
          <div className="field field-3">
            <div className="label">Other monthly debt payments</div>
            <input
              type="number"
              inputMode="decimal"
              value={useDebtBreakdown ? debtCreditCards + debtAutoLoans + debtStudentLoans + debtPersonalLoans + debtOther : otherDebtPayments}
              min={0}
              onChange={(e) =>
                useDebtBreakdown
                  ? setDebtCreditCards(+e.target.value - debtAutoLoans - debtStudentLoans - debtPersonalLoans - debtOther)
                  : setOtherDebtPayments(+e.target.value)
              }
              readOnly={useDebtBreakdown}
            />
            {useDebtBreakdown && <div className="hint">Sum of required minimums</div>}
          </div>
          {useDebtBreakdown && (
            <>
              <div className="field field-3">
                <div className="label">Credit card minimums</div>
                <input type="number" inputMode="decimal" value={debtCreditCards} min={0} onChange={(e) => setDebtCreditCards(+e.target.value)} />
              </div>
              <div className="field field-3">
                <div className="label">Auto loans or leases</div>
                <input type="number" inputMode="decimal" value={debtAutoLoans} min={0} onChange={(e) => setDebtAutoLoans(+e.target.value)} />
              </div>
              <div className="field field-3">
                <div className="label">Student loans</div>
                <input type="number" inputMode="decimal" value={debtStudentLoans} min={0} onChange={(e) => setDebtStudentLoans(+e.target.value)} />
              </div>
              <div className="field field-3">
                <div className="label">Personal loans</div>
                <input type="number" inputMode="decimal" value={debtPersonalLoans} min={0} onChange={(e) => setDebtPersonalLoans(+e.target.value)} />
              </div>
              <div className="field field-3">
                <div className="label">Other required debts</div>
                <input type="number" inputMode="decimal" value={debtOther} min={0} onChange={(e) => setDebtOther(+e.target.value)} />
              </div>
            </>
          )}

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
                  setIncomeBase(5200);
                  setIncomeVariable(900);
                  setIncomeOther(400);
                  setHousingPrincipalInterest(1600);
                  setHousingTaxes(350);
                  setHousingInsurance(120);
                  setHousingHoa(80);
                  setHousingPmi(50);
                  setDebtCreditCards(120);
                  setDebtAutoLoans(250);
                  setDebtStudentLoans(80);
                  setDebtPersonalLoans(0);
                  setDebtOther(0);
                  setUseIncomeBreakdown(false);
                  setUseHousingBreakdown(true);
                  setUseDebtBreakdown(true);
                }}
              >
                Reset example
              </button>
              <button className="btn" type="button" onClick={() => {
                setTargetFrontEndPct(28);
                setTargetBackEndPct(36);
              }}>
                28/36 targets
              </button>
              <button className="btn" type="button" onClick={() => {
                setTargetFrontEndPct(31);
                setTargetBackEndPct(43);
              }}>
                31/43 targets
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
