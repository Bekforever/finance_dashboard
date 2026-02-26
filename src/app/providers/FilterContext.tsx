import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import type { Row } from "../../entities/transaction/model/types";

interface FilterContextValue {
  month: string;
  setMonth: (m: string) => void;
  months: string[];
  rows: Row[];
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ data, children }: { data: Row[]; children: ReactNode }) {
  const [month, setMonth] = useState("all");

  const months = useMemo(
    () => [...new Set(data.map((r) => r.date.slice(0, 7)))].sort(),
    [data]
  );
  const rows = useMemo(
    () => (month === "all" ? data : data.filter((r) => r.date.startsWith(month))),
    [data, month]
  );

  return (
    <FilterContext.Provider value={{ month, setMonth, months, rows }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within FilterProvider");
  return ctx;
}
