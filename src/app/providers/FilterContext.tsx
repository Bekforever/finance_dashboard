import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from "react";
import type { Row } from "../../entities/transaction/model/types";

interface FilterContextValue {
  month: string;
  setMonth: (m: string) => void;
  months: string[];
  rows: Row[];
}

const FilterContext = createContext<FilterContextValue | null>(null);

const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

export function FilterProvider({ data, children }: { data: Row[]; children: ReactNode }) {
  const [month, setMonth] = useState(currentMonth);

  const months = useMemo(
    () => [...new Set(data.map((r) => r.date.slice(0, 7)))].sort(),
    [data]
  );

  // Если текущий месяц отсутствует в данных — переключаемся на последний доступный
  useEffect(() => {
    if (months.length > 0 && month !== "all" && !months.includes(month)) {
      setMonth(months[months.length - 1]);
    }
  }, [months]);

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
