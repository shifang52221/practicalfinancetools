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
  const [downPaymentMode, setDownPaymentMode] = useState<"amount" | "percent">("amount");
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
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

  const homePriceSafe = clamp(homePrice, 0, 1e9);
  const downPaymentPercentSafe = clamp(downPaymentPercent, 0, 100);
  const downPaymentEffective =
    downPaymentMode === "percent" ? (homePriceSafe * downPaymentPercentSafe) / 100 : clamp(downPayment, 0, 1e9);
  const downPaymentCapped = clamp(downPaymentEffective, 0, homePriceSafe);

  const result = useMemo(() => {
    return rentVsBuy({
      years: clamp(years, 1, 40),
      monthlyRent: clamp(monthlyRent, 0, 1e8),
      rentGrowthPercent: clamp(rentGrowth, 0, 30),
      homePrice: homePriceSafe,
      downPayment: downPaymentCapped,
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
    downPaymentCapped,
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
  const cashToClose = downPaymentCapped + (homePriceSafe * clamp(closingCostsPct, 0, 10)) / 100;
  const initialOwnerCost = result.series[0]?.ownerMonthlyCashCost ?? 0;

  const breakEvenYearText = result.breakEvenYear === null ? "N/A" : `${result.breakEvenYear} yr`;
  const breakEvenMonthText = result.breakEvenMonth === null ? "N/A" : `${result.breakEvenMonth} mo`;

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
            <label className="label" htmlFor="rentbuy-years">Horizon (years)</label>
            <input id="rentbuy-years" type="number" inputMode="numeric" value={years} min={1} step={1} onChange={(e) => setYears(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-monthly-rent">Monthly rent</label>
            <input id="rentbuy-monthly-rent" type="number" inputMode="decimal" value={monthlyRent} min={0} onChange={(e) => setMonthlyRent(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-rent-growth">Rent growth (%)</label>
            <input id="rentbuy-rent-growth" type="number" inputMode="decimal" value={rentGrowth} min={0} step={0.1} onChange={(e) => setRentGrowth(+e.target.value)} />
          </div>

          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-home-price">Home price</label>
            <input id="rentbuy-home-price" type="number" inputMode="decimal" value={homePrice} min={0} onChange={(e) => setHomePrice(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-down-payment">Down payment</label>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <button
                className={`btn ${downPaymentMode === "amount" ? "btn-primary" : ""}`}
                type="button"
                onClick={() => {
                  setDownPaymentMode("amount");
                  setDownPayment(downPaymentCapped);
                }}
              >
                Amount ($)
              </button>
              <button
                className={`btn ${downPaymentMode === "percent" ? "btn-primary" : ""}`}
                type="button"
                onClick={() => {
                  setDownPaymentMode("percent");
                  setDownPaymentPercent(homePriceSafe > 0 ? (downPaymentCapped / homePriceSafe) * 100 : 0);
                }}
              >
                Percent (%)
              </button>
            </div>
            {downPaymentMode === "amount" ? (
              <input
                id="rentbuy-down-payment"
                style={{ marginTop: 10 }}
                type="number"
                inputMode="decimal"
                value={downPayment}
                min={0}
                onChange={(e) => setDownPayment(+e.target.value)}
              />
            ) : (
              <input
                id="rentbuy-down-payment"
                style={{ marginTop: 10 }}
                type="number"
                inputMode="decimal"
                value={downPaymentPercent}
                min={0}
                step={0.1}
                onChange={(e) => setDownPaymentPercent(+e.target.value)}
              />
            )}
            <div className="hint">{formatCurrency2(downPaymentCapped)} of price</div>
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-rate">Mortgage rate (APR %)</label>
            <input id="rentbuy-rate" type="number" inputMode="decimal" value={rate} min={0} step={0.01} onChange={(e) => setRate(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-term-years">Mortgage term (years)</label>
            <input id="rentbuy-term-years" type="number" inputMode="numeric" value={termYears} min={1} step={1} onChange={(e) => setTermYears(+e.target.value)} />
          </div>

          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-home-app">Home appreciation (%)</label>
            <input id="rentbuy-home-app" type="number" inputMode="decimal" value={homeApp} min={0} step={0.1} onChange={(e) => setHomeApp(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-closing-costs">Closing costs (%)</label>
            <input id="rentbuy-closing-costs" type="number" inputMode="decimal" value={closingCostsPct} min={0} step={0.1} onChange={(e) => setClosingCostsPct(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-selling-costs">Selling costs (%)</label>
            <input id="rentbuy-selling-costs" type="number" inputMode="decimal" value={sellingCostsPct} min={0} step={0.1} onChange={(e) => setSellingCostsPct(+e.target.value)} />
          </div>

          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-property-tax">Property tax (%)</label>
            <input id="rentbuy-property-tax" type="number" inputMode="decimal" value={propertyTaxPct} min={0} step={0.1} onChange={(e) => setPropertyTaxPct(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-insurance">Home insurance (annual)</label>
            <input id="rentbuy-insurance" type="number" inputMode="decimal" value={insuranceAnnual} min={0} onChange={(e) => setInsuranceAnnual(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-hoa">HOA (monthly)</label>
            <input id="rentbuy-hoa" type="number" inputMode="decimal" value={hoaMonthly} min={0} onChange={(e) => setHoaMonthly(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-maintenance">Maintenance (%)</label>
            <input id="rentbuy-maintenance" type="number" inputMode="decimal" value={maintenancePct} min={0} step={0.1} onChange={(e) => setMaintenancePct(+e.target.value)} />
          </div>
          <div className="field field-3">
            <label className="label" htmlFor="rentbuy-invest-return">Investment return (%)</label>
            <input id="rentbuy-invest-return" type="number" inputMode="decimal" value={investReturn} min={0} step={0.1} onChange={(e) => setInvestReturn(+e.target.value)} />
          </div>

          <div className="field field-6">
            <div className="label">Quick scenarios</div>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <button className="btn" type="button" onClick={() => setYears(5)}>
                5-year horizon
              </button>
              <button className="btn" type="button" onClick={() => setYears(10)}>
                10-year horizon
              </button>
              <button className="btn" type="button" onClick={() => setYears(15)}>
                15-year horizon
              </button>
            </div>
            <div className="btn-row" style={{ marginTop: 8 }}>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setRentGrowth(2);
                  setHomeApp(2);
                  setInvestReturn(5);
                }}
              >
                Conservative
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setRentGrowth(3);
                  setHomeApp(3);
                  setInvestReturn(6);
                }}
              >
                Balanced
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setRentGrowth(4);
                  setHomeApp(4);
                  setInvestReturn(7);
                }}
              >
                Aggressive
              </button>
            </div>
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
                  setDownPaymentMode("amount");
                  setDownPaymentPercent(20);
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
            <div className="hint">First year buying &gt;= renting (net worth)</div>
          </div>
          <div className="kpi">
            <div className="k">Break-even (month)</div>
            <div className="v">{breakEvenMonthText}</div>
            <div className="hint">First month buying &gt;= renting</div>
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
            <div className="hint">Buy - rent</div>
          </div>
          <div className="kpi">
            <div className="k">Winner at horizon</div>
            <div className="v">{diffAtHorizon >= 0 ? "Buy" : "Rent"}</div>
          </div>
          <div className="kpi">
            <div className="k">Cash to close (est.)</div>
            <div className="v">{formatCurrency2(cashToClose)}</div>
            <div className="hint">Down payment + closing costs</div>
          </div>
          <div className="kpi">
            <div className="k">Initial owner cost (mo.)</div>
            <div className="v">{formatCurrency2(initialOwnerCost)}</div>
            <div className="hint">Year 1 monthly cash cost</div>
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
