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
  const diffAtHorizon = (last?.netWorthBuy ?? 0) - (last?.netWorthRent ?? 0);

  const breakEvenYearText = result.breakEvenYear === null ? "—" : `${result.breakEvenYear} yr`;
  const breakEvenMonthText = result.breakEvenMonth === null ? "—" : `${result.breakEvenMonth} mo`;

  function toCsv(rows: typeof result.series) {
    const header = [
      "year",
      "net_worth_rent",
      "net_worth_buy",
      "rent_monthly",
      "owner_monthly_cash_cost",
      "home_value",
      "loan_balance"
    ];
    const lines = rows.map((r) =>
      [
        r.year,
        r.netWorthRent.toFixed(2),
        r.netWorthBuy.toFixed(2),
        r.rentMonthly.toFixed(2),
        r.ownerMonthlyCashCost.toFixed(2),
        r.homeValue.toFixed(2),
        r.loanBalance.toFixed(2)
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
              This is a simplified scenario model and does not include income taxes or itemized deductions. It assumes leftover monthly cash is invested at the
              rate shown.
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Results</h3>
        <div className="kpis">
          <div className="kpi">
            <div className="k">Break-even (year)</div>
            <div className="v">{breakEvenYearText}</div>
            <div className="hint">First year buying ≥ renting (net worth)</div>
          </div>
          <div className="kpi">
            <div className="k">Break-even (month)</div>
            <div className="v">{breakEvenMonthText}</div>
            <div className="hint">First month buying ≥ renting</div>
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
            <div className="k">Difference at horizon</div>
            <div className="v">{formatCurrency2(diffAtHorizon)}</div>
            <div className="hint">Buy − rent</div>
          </div>
          <div className="kpi">
            <div className="k">Winner at horizon</div>
            <div className="v">{diffAtHorizon >= 0 ? "Buy" : "Rent"}</div>
          </div>
        </div>

        <div className="btn-row" style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={() => downloadCsv("rent-vs-buy.csv", toCsv(result.series))}>
            Download (CSV)
          </button>
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
                  <th className="num">Rent/mo</th>
                  <th className="num">Own/mo</th>
                </tr>
              </thead>
              <tbody>
                {result.series.slice(0, 12).map((p) => (
                  <tr key={p.year}>
                    <td>{p.year}</td>
                    <td className="num">{formatCurrency2(p.netWorthRent)}</td>
                    <td className="num">{formatCurrency2(p.netWorthBuy)}</td>
                    <td className="num">{formatCurrency2(p.rentMonthly)}</td>
                    <td className="num">{formatCurrency2(p.ownerMonthlyCashCost)}</td>
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

