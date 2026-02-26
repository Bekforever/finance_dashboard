import { useTransactionContext } from "../../../app/providers/TransactionContext";
import { useFilterContext } from "../../../app/providers/FilterContext";
import { useTransactionStats } from "../../../entities/transaction/model/useTransactionStats";
import { SparklineRow } from "../../../widgets/sparklines-row/ui/SparklineRow";
import { ProfitBarChart } from "../../../widgets/profit-bar-chart/ui/ProfitBarChart";
import { WeekdayChart } from "../../../widgets/weekday-chart/ui/WeekdayChart";
import { GroupedBarChart } from "../../../widgets/grouped-bar-chart/ui/GroupedBarChart";

export function AnalyticsPage() {
  const { data } = useTransactionContext();
  const { rows } = useFilterContext();
  const stats = useTransactionStats(rows, data);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <SparklineRow
        sparkInc={stats.sparkInc}
        sparkExp={stats.sparkExp}
        sparkPro={stats.sparkPro}
        income={stats.income}
        expense={stats.expense}
        profit={stats.profit}
      />

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 18 }}>
        <ProfitBarChart monthly={stats.monthly} />
        <WeekdayChart byWeekday={stats.byWeekday} />
      </div>

      <GroupedBarChart monthly={stats.monthly} />
    </div>
  );
}
