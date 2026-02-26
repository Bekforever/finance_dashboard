import { useTransactionContext } from "../../../app/providers/TransactionContext";
import { useFilterContext } from "../../../app/providers/FilterContext";
import { useTransactionStats } from "../../../entities/transaction/model/useTransactionStats";
import { KpiGrid } from "../../../widgets/kpi-grid/ui/KpiGrid";
import { IncomeExpenseChart } from "../../../widgets/income-expense-chart/ui/IncomeExpenseChart";
import { SavingsCard } from "../../../widgets/savings-card/ui/SavingsCard";
import { CumulativeChart } from "../../../widgets/cumulative-chart/ui/CumulativeChart";
import { TopExpenses } from "../../../widgets/top-expenses/ui/TopExpenses";

export function OverviewPage() {
  const { data } = useTransactionContext();
  const { rows } = useFilterContext();
  const stats = useTransactionStats(rows, data);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <KpiGrid
        income={stats.income}
        expense={stats.expense}
        profit={stats.profit}
        rows={rows}
        expRows={stats.expRows}
        incRows={stats.incRows}
        avgExp={stats.avgExp}
        maxExp={stats.maxExp}
        maxExpRow={stats.maxExpRow}
      />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
        <IncomeExpenseChart monthly={stats.monthly} />
        <SavingsCard
          savingsRate={stats.savingsRate}
          profit={stats.profit}
          income={stats.income}
          expense={stats.expense}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 18 }}>
        <CumulativeChart cumulative={stats.cumulative} />
        <TopExpenses topExp={stats.topExp} maxExp={stats.maxExp} />
      </div>
    </div>
  );
}
