import React, { useMemo, useState } from "react";
import { mortgageMonthlyBreakdown } from "../../lib/calc/loan";
import { formatCurrency2, formatPercent } from "../../lib/format";
import { clamp } from "../../lib/math";

export function MortgagePaymentCalculator() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState(5400);
  const [insuranceAnnual, setInsuranceAnnual] = useState(1800);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [pmiRateAnnual, setPmiRateAnnual] = useState(0.6);

  const result = useMemo(() => {
    return mortgageMonthlyBreakdown({
      homePrice: clamp(homePrice, 0, 1e9),
      downPayment: clamp(downPayment, 0, 1e9),
      aprPercent: clamp(rate, 0, 30),
      termYears: clamp(termYears, 1, 60),
      propertyTaxAnnual: clamp(propertyTaxAnnual, 0, 1e8),
      insuranceAnnual: clamp(insuranceAnnual, 0, 1e8),
      hoaMonthly: clamp(hoaMonthly, 0, 1e6),
      pmiRateAnnual: clamp(pmiRateAnnual, 0, 5)
    });
  }, [homePrice, downPayment, rate, termYears, propertyTaxAnnual, insuranceAnnual, hoaMonthly, pmiRateAnnual]);

  const dpPct = useMemo(() => (homePrice > 0 ? clamp(downPayment, 0, homePrice) / homePrice : 0), [homePrice, downPayment]);

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-3">
            <div className="label">Home price</div>
            <input type="number" inputMode="decimal" value={homePrice} min={0} onChange={(e) => setHomePrice(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Down payment</div>
            <input type="number" inputMode="decimal" value={downPayment} min={0} onChange={(e) => setDownPayment(+e.target.value)} />
            <div className="hint">{formatPercent(dpPct, 1)} of price</div>
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
            <div className="label">Property tax (annual)</div>
            <input type="number" inputMode="decimal" value={propertyTaxAnnual} min={0} onChange={(e) => setPropertyTaxAnnual(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Home insurance (annual)</div>
            <input type="number" inputMode="decimal" value={insuranceAnnual} min={0} onChange={(e) => setInsuranceAnnual(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">HOA (monthly)</div>
            <input type="number" inputMode="decimal" value={hoaMonthly} min={0} onChange={(e) => setHoaMonthly(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">PMI rate (annual %)</div>
            <input type="number" inputMode="decimal" value={pmiRateAnnual} min={0} step={0.01} onChange={(e) => setPmiRateAnnual(+e.target.value)} />
            <div className="hint">Applied if down payment &lt; 20%</div>
          </div>
          <div className="field field-6">
            <div className="btn-row">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setHomePrice(450000);
                  setDownPayment(90000);
                  setRate(6.5);
                  setTermYears(30);
                  setPropertyTaxAnnual(5400);
                  setInsuranceAnnual(1800);
                  setHoaMonthly(0);
                  setPmiRateAnnual(0.6);
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
            <div className="k">Total monthly payment</div>
            <div className="v">{formatCurrency2(result.totalMonthly)}</div>
          </div>
          <div className="kpi">
            <div className="k">Loan amount</div>
            <div className="v">{formatCurrency2(result.loanAmount)}</div>
          </div>
          <div className="kpi">
            <div className="k">Principal + interest</div>
            <div className="v">{formatCurrency2(result.paymentPI)}</div>
          </div>
          <div className="kpi">
            <div className="k">Taxes + insurance + HOA + PMI</div>
            <div className="v">{formatCurrency2(result.taxMonthly + result.insuranceMonthly + result.hoaMonthly + result.pmiMonthly)}</div>
          </div>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Monthly breakdown</summary>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th className="num">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Principal &amp; interest</td><td className="num">{formatCurrency2(result.paymentPI)}</td></tr>
                <tr><td>Property tax</td><td className="num">{formatCurrency2(result.taxMonthly)}</td></tr>
                <tr><td>Home insurance</td><td className="num">{formatCurrency2(result.insuranceMonthly)}</td></tr>
                <tr><td>HOA</td><td className="num">{formatCurrency2(result.hoaMonthly)}</td></tr>
                <tr><td>PMI</td><td className="num">{formatCurrency2(result.pmiMonthly)}</td></tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
}

