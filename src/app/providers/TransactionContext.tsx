import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { fetchTransactions } from "../../entities/transaction/api/fetchTransactions";
import type { Row } from "../../entities/transaction/model/types";

interface TransactionContextValue {
  data: Row[];
  loading: boolean;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [data, setData]       = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions().then((rows) => {
      setData(rows);
      setLoading(false);
    });
  }, []);

  return (
    <TransactionContext.Provider value={{ data, loading }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext(): TransactionContextValue {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactionContext must be used within TransactionProvider");
  return ctx;
}
