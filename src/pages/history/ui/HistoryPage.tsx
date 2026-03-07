import { useMemo } from "react";
import { useTransactionContext } from "../../../app/providers/TransactionContext";
import { useFilterContext } from "../../../app/providers/FilterContext";
import { useTransactionStats } from "../../../entities/transaction/model/useTransactionStats";
import { TransactionsTable } from "../../../widgets/transactions-table/ui/TransactionsTable";

export function HistoryPage() {
  const { data } = useTransactionContext();
  const { rows } = useFilterContext();
  const stats = useTransactionStats(rows, data);

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const da = a.date + (a.time ? " " + a.time : "");
        const db = b.date + (b.time ? " " + b.time : "");
        return db.localeCompare(da);
      }),
    [rows]
  );

  return (
    <TransactionsTable
      recent={sorted}
      totalRows={rows.length}
      income={stats.income}
      expense={stats.expense}
    />
  );
}
