export interface Row {
  date: string;
  type: string;
  cat: string;
  amt: number;
  note: string;
}

export interface MonthlyData {
  label: string;
  ym: string;
  income: number;
  expense: number;
  profit: number;
}

export interface CatData {
  name: string;
  value: number;
}

export interface TransactionStats {
  income: number;
  expense: number;
  profit: number;
  savingsRate: number;
  expRows: Row[];
  incRows: Row[];
  avgExp: number;
  maxExp: number;
  maxExpRow: Row | undefined;
  expCats: CatData[];
  incCats: CatData[];
  monthly: MonthlyData[];
  cumulative: { label: string; bal: number }[];
  byWeekday: { day: string; amt: number }[];
  recent: Row[];
  topExp: Row[];
  sparkInc: { v: number }[];
  sparkExp: { v: number }[];
  sparkPro: { v: number }[];
}
