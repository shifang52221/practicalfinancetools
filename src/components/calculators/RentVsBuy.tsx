import React, { useMemo, useState } from "react";
import { rentVsBuy } from "../../lib/calc/rentBuy";
import { formatCurrency2 } from "../../lib/format";
import { clamp } from "../../lib/math";

export function RentVsBuyCalculator() {
  const [years, setYears] = useState(10);
  const [monthlyRent, setMonthlyRent] = useState(2600);
  const [rentGrowth, setRentGrowth] = useState(3);
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [homeApp, setHomeApp] = useState(3);
  const [closingCostsPct, setClosingCostsPct] = useState(3);
  const [sellingCostsPct, setSellingCostsPct] = useState(6);
  const [propertyTaxPct, setPropertyTaxPct] = useState(1.2);
  const [insuranceAnnual, setInsuranceAnnual] = useState(1800);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [maintenancePct, setMaintenancePct] = useState(1);
  const [investReturn, setInvestReturn] = useState(6);

  const result = useMemo(() => {
    return rentVsBuy({
      years: clamp(years, 1, 40),
      monthlyRent: clamp(monthlyRent, 0, 1e8),
      rentGrowthPercent: clamp(rentGrowth, 0, 30),
      homePrice: clamp(homePrice, 0, 1e9),
      downPayment: clamp(downPayment, 0, 1e9),
      aprPercent: clamp(rate, 0, 30),
      termYears: clamp(termYears, 1, 60),
      homeAppreciationPercent: clamp(homeApp, 0, 20),
      closingCostsPercent: clamp(closingCostsPct, 0, 10),
      sellingCostsPercent: clamp(sellingCostsPct, 0, 10),
      propertyTaxPercent: clamp(propertyTaxPct, 0, 10),
      insuranceAnnual: clamp(insuranceAnnual, 0, 1e8),
      hoaMonthly: clamp(hoaMonthly, 0, 1e6),
      maintenancePercent: clamp(maintenancePct, 0, 10),
      investmentReturnPercent: clamp(investReturn, 0, 30)
    });
  }, [
    years,
    monthlyRent,
    rentGrowth,
    homePrice,
    downPayment,
    rate,
    termYears,
    homeApp,
    closingCostsPct,
    sellingCostsPct,
    propertyTaxPct,
    insuranceAnnual,
    hoaMonthly,
    maintenancePct,
    investReturn
  ]);

  const last = result.series[result.series.length - 1];

  return (
    <div className="calc-grid">
      <div className="panel">
        <h3>Inputs</h3>
        <div className="form">
          <div className="field field-3">
            <div className="label">Horizon (years)</div>
            <input type="number" inputMode="numeric" value={years} min={1} step={1} onChange={(e) => setYears(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Monthly rent</div>
            <input type="number" inputMode="decimal" value={monthlyRent} min={0} onChange={(e) => setMonthlyRent(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Rent growth (%)</div>
            <input type="number" inputMode="decimal" value={rentGrowth} min={0} step={0.1} onChange={(e) => setRentGrowth(+e.target.value)} />
          </div>

          <div className="field field-3">
            <div className="label">Home price</div>
            <input type="number" inputMode="decimal" value={homePrice} min={0} onChange={(e) => setHomePrice(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Down payment</div>
            <input type="number" inputMode="decimal" value={downPayment} min={0} onChange={(e) => setDownPayment(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Mortgage rate (APR %)</div>
            <input type="number" inputMode="decimal" value={rate} min={0} step={0.01} onChange={(e) => setRate(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Mortgage term (years)</div>
            <input type="number" inputMode="numeric" value={termYears} min={1} step={1} onChange={(e) => setTermYears(+e.target.value)} />
          </div>

          <div className="field field-3">
            <div className="label">Home appreciation (%)</div>
            <input type="number" inputMode="decimal" value={homeApp} min={0} step={0.1} onChange={(e) => setHomeApp(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Closing costs (%)</div>
            <input type="number" inputMode="decimal" value={closingCostsPct} min={0} step={0.1} onChange={(e) => setClosingCostsPct(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Selling costs (%)</div>
            <input type="number" inputMode="decimal" value={sellingCostsPct} min={0} step={0.1} onChange={(e) => setSellingCostsPct(+e.target.value)} />
          </div>

          <div className="field field-3">
            <div className="label">Property tax (%)</div>
            <input type="number" inputMode="decimal" value={propertyTaxPct} min={0} step={0.1} onChange={(e) => setPropertyTaxPct(+e.target.value)} />
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
            <div className="label">Maintenance (%)</div>
            <input type="number" inputMode="decimal" value={maintenancePct} min={0} step={0.1} onChange={(e) => setMaintenancePct(+e.target.value)} />
          </div>
          <div className="field field-3">
            <div className="label">Investment return (%)</div>
            <input type="number" inputMode="decimal" value={investReturn} min={0} step={0.1} onChange={(e) => setInvestReturn(+e.target.value)} />
          </div>

          <div className="field field-6">
            <div className="btn-row">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setYears(10);
                  setMonthlyRent(2600);
                  setRentGrowth(3);
                  setHomePrice(450000);
                  setDownPayment(90000);
                  setRate(6.5);
                  setTermYears(30);
                  setHomeApp(3);
                  setClosingCostsPct(3);
                  setSellingCostsPct(6);
                  setPropertyTaxPct(1.2);
                  setInsuranceAnnual(1800);
                  setHoaMonthly(0);
                  setMaintenancePct(1);
                  setInvestReturn(6);
                }}
              >
                Reset example
              </button>
            </div>
            <div className="hint" style={{ marginTop: 8 }}>
              This is a simplified scenario model and does not include income taxes, itemized deductions, or opportunity
              costs beyond the assumptions shown.
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Results</h3>
        <div className="kpis">
          <div className="kpi">
            <div className="k">Break-even</div>
            <div className="v">{result.breakEvenYear === null ? "—" : `${result.breakEvenYear} yr`}</div>
            <div className="hint">First year buying ≥ renting (net worth)</div>
          </div>
          <div className="kpi">
            <div className="k">Net worth (rent) at {last?.year} yr</div>
            <div className="v">{formatCurrency2(last?.netWorthRent ?? 0)}</div>
          </div>
          <div className="kpi">
            <div className="k">Net worth (buy) at {last?.year} yr</div>
            <div className="v">{formatCurrency2(last?.netWorthBuy ?? 0)}</div>
          </div>
          <div className="kpi">
            <div className="k">Winner at horizon</div>
            <div className="v">
              {(last?.netWorthBuy ?? 0) >= (last?.netWorthRent ?? 0) ? "Buy" : "Rent"}
            </div>
          </div>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: "pointer", fontWeight: 800 }}>Year-by-year (first 12 years)</summary>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th className="num">Rent net worth</th>
                  <th className="num">Buy net worth</th>
                </tr>
              </thead>
              <tbody>
                {result.series.slice(0, 12).map((p) => (
                  <tr key={p.year}>
                    <td>{p.year}</td>
                    <td className="num">{formatCurrency2(p.netWorthRent)}</td>
                    <td className="num">{formatCurrency2(p.netWorthBuy)}</td>
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

