import { KpiCard } from "../../../shared/ui/KpiCard";
import { fmt } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import type { Row } from "../../../entities/transaction/model/types";

interface KpiGridProps {
  income: number;
  expense: number;
  profit: number;
  rows: Row[];
  expRows: Row[];
  incRows: Row[];
  avgExp: number;
  maxExp: number;
  maxExpRow: Row | undefined;
}

export function KpiGrid({ income, expense, profit, rows, expRows, incRows, avgExp, maxExp, maxExpRow }: KpiGridProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
      <KpiCard delay={0}    label="Общий доход"    value={fmt(income)}  icon="📈" color={C.green}  trendVal={8} />
      <KpiCard delay={0.05} label="Общий расход"   value={fmt(expense)} icon="📉" color={C.red}    trendVal={-3} />
      <KpiCard delay={0.1}  label="Чистая прибыль" value={fmt(profit)}  icon="💎" color={profit >= 0 ? C.green : C.red} />
      <KpiCard delay={0.15} label="Операций"       value={rows.length}  icon="🔢" color={C.blue}   sub={`${expRows.length} расх / ${incRows.length} дох`} />
      <KpiCard delay={0.2}  label="Средний расход" value={fmt(avgExp)}  icon="📐" color={C.purple} />
      <KpiCard delay={0.25} label="Макс. трата"    value={fmt(maxExp)}  icon="🔥" color={C.amber}  sub={maxExpRow?.cat} />
    </div>
  );
}
