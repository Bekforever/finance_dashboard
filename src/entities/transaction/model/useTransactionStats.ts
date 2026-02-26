import { useMemo } from "react";
import { monthLabel } from "../../../shared/lib/formatters";
import type { Row, MonthlyData, CatData, TransactionStats } from "./types";

export function useTransactionStats(rows: Row[], allData: Row[]): TransactionStats {
  const expRows = useMemo(() => rows.filter((r) => r.type === "Расход"), [rows]);
  const incRows = useMemo(() => rows.filter((r) => r.type === "Доход"), [rows]);

  const income  = useMemo(() => incRows.reduce((s, r) => s + r.amt, 0), [incRows]);
  const expense = useMemo(() => expRows.reduce((s, r) => s + r.amt, 0), [expRows]);

  const profit      = income - expense;
  const savingsRate = income > 0 ? (profit / income) * 100 : 0;
  const avgExp      = expRows.length ? expense / expRows.length : 0;
  const maxExp      = expRows.length ? Math.max(...expRows.map((r) => r.amt)) : 0;
  const maxExpRow   = expRows.find((r) => r.amt === maxExp);

  const expCats = useMemo<CatData[]>(() => {
    const m: Record<string, number> = {};
    expRows.forEach((r) => { m[r.cat] = (m[r.cat] || 0) + r.amt; });
    return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [expRows]);

  const incCats = useMemo<CatData[]>(() => {
    const m: Record<string, number> = {};
    incRows.forEach((r) => { m[r.cat] = (m[r.cat] || 0) + r.amt; });
    return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [incRows]);

  const monthly = useMemo<MonthlyData[]>(() => {
    const m: Record<string, MonthlyData> = {};
    allData.forEach((r) => {
      const k = r.date.slice(0, 7);
      if (!m[k]) m[k] = { label: monthLabel(k), ym: k, income: 0, expense: 0, profit: 0 };
      if (r.type === "Доход") m[k].income += r.amt;
      else m[k].expense += r.amt;
    });
    return Object.values(m)
      .sort((a, b) => a.ym.localeCompare(b.ym))
      .map((d) => ({ ...d, profit: d.income - d.expense }));
  }, [allData]);

  const cumulative = useMemo(() => {
    let bal = 0;
    return monthly.map((d) => { bal += d.profit; return { label: d.label, bal }; });
  }, [monthly]);

  const byWeekday = useMemo(() => {
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const m: Record<string, number> = {};
    expRows.forEach((r) => {
      const wd = days[new Date(r.date).getDay()];
      m[wd] = (m[wd] || 0) + r.amt;
    });
    return days.map((d) => ({ day: d, amt: m[d] || 0 }));
  }, [expRows]);

  const recent = useMemo(
    () => [...rows].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15),
    [rows]
  );
  const topExp = useMemo(
    () => [...expRows].sort((a, b) => b.amt - a.amt).slice(0, 5),
    [expRows]
  );

  const sparkInc = useMemo(() => monthly.map((d) => ({ v: d.income })), [monthly]);
  const sparkExp = useMemo(() => monthly.map((d) => ({ v: d.expense })), [monthly]);
  const sparkPro = useMemo(() => monthly.map((d) => ({ v: Math.max(0, d.profit) })), [monthly]);

  return {
    income, expense, profit, savingsRate,
    expRows, incRows, avgExp, maxExp, maxExpRow,
    expCats, incCats, monthly, cumulative, byWeekday,
    recent, topExp, sparkInc, sparkExp, sparkPro,
  };
}
