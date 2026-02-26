import { useTransactionContext } from "../../../app/providers/TransactionContext";
import { useFilterContext } from "../../../app/providers/FilterContext";
import { useTransactionStats } from "../../../entities/transaction/model/useTransactionStats";
import { TransactionsTable } from "../../../widgets/transactions-table/ui/TransactionsTable";

export function HistoryPage() {
  const { data } = useTransactionContext();
  const { rows } = useFilterContext();
  const stats = useTransactionStats(rows, data);

  return (
    <TransactionsTable
      recent={stats.recent}
      totalRows={rows.length}
      income={stats.income}
      expense={stats.expense}
    />
  );
}
