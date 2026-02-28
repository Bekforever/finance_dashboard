import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { fetchTransactions } from "../../entities/transaction/api/fetchTransactions";
import type { Row } from "../../entities/transaction/model/types";

interface TransactionContextValue {
  data: Row[];
  loading: boolean;
  refetch: () => void;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [data, setData]       = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick]       = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchTransactions().then((rows) => {
      setData(rows);
      setLoading(false);
    });
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return (
    <TransactionContext.Provider value={{ data, loading, refetch }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext(): TransactionContextValue {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactionContext must be used within TransactionProvider");
  return ctx;
}
