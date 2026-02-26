import { useTransactionContext } from "../../../app/providers/TransactionContext";
import { useFilterContext } from "../../../app/providers/FilterContext";
import { useTransactionStats } from "../../../entities/transaction/model/useTransactionStats";
import { ExpenseCategories } from "../../../widgets/expense-categories/ui/ExpenseCategories";
import { IncomeCategories } from "../../../widgets/income-categories/ui/IncomeCategories";

export function CategoriesPage() {
  const { data } = useTransactionContext();
  const { rows } = useFilterContext();
  const stats = useTransactionStats(rows, data);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <ExpenseCategories expCats={stats.expCats} totalExpense={stats.expense} />
      <IncomeCategories incCats={stats.incCats} />
    </div>
  );
}
