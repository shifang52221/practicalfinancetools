export type ToolCategory = "Debt" | "Mortgage";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
};

export const TOOLS: Tool[] = [
  {
    slug: "credit-card-payoff-calculator",
    title: "Credit Card Payoff Calculator",
    description: "Payoff date, total interest, and a month-by-month payoff schedule.",
    category: "Debt"
  },
  {
    slug: "minimum-payment-payoff-calculator",
    title: "Minimum Payment Payoff Calculator",
    description: "See how long minimum payments can take, and how much interest you pay.",
    category: "Debt"
  },
  {
    slug: "debt-snowball-calculator",
    title: "Debt Snowball Calculator",
    description: "Build a payoff plan by paying smallest balances first.",
    category: "Debt"
  },
  {
    slug: "debt-avalanche-calculator",
    title: "Debt Avalanche Calculator",
    description: "Build a payoff plan by paying highest APR first to reduce interest.",
    category: "Debt"
  },
  {
    slug: "debt-to-income-calculator",
    title: "Debt-to-Income (DTI) Calculator",
    description: "Estimate your DTI ratio and understand where you stand.",
    category: "Debt"
  },
  {
    slug: "apr-calculator",
    title: "APR Calculator",
    description: "Compare loans by including fees to estimate true borrowing cost.",
    category: "Debt"
  },
  {
    slug: "mortgage-payment-calculator",
    title: "Mortgage Payment Calculator",
    description: "Monthly payment estimate with P&I plus taxes, insurance, HOA, and PMI.",
    category: "Mortgage"
  },
  {
    slug: "amortization-schedule-calculator",
    title: "Amortization Schedule Calculator",
    description: "Full payment schedule with principal, interest, and remaining balance.",
    category: "Mortgage"
  },
  {
    slug: "extra-payment-calculator",
    title: "Extra Payment Mortgage Calculator",
    description: "See how extra payments can shorten payoff time and save interest.",
    category: "Mortgage"
  },
  {
    slug: "additional-principal-payment-calculator",
    title: "Additional Principal Payment Calculator",
    description: "Pay extra principal monthly or as a lump sum and see payoff savings.",
    category: "Mortgage"
  },
  {
    slug: "biweekly-mortgage-payment-calculator",
    title: "Biweekly Mortgage Payment Calculator",
    description: "Estimate the impact of biweekly payments and compare to monthly extra.",
    category: "Mortgage"
  },
  {
    slug: "rent-vs-buy-calculator",
    title: "Rent vs Buy Calculator",
    description: "Scenario-based comparison to estimate a break-even time horizon.",
    category: "Mortgage"
  }
];
