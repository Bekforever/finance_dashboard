import { useFilterContext } from "../../../app/providers/FilterContext";
import { monthLabel } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";

export function MonthFilter() {
  const { month, setMonth, months } = useFilterContext();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
      <span style={{ color: C.textDim, fontSize: 12 }}>📅</span>
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{
          background: C.card,
          color: C.text,
          border: `1px solid ${C.border2}`,
          borderRadius: 8,
          padding: "5px 12px",
          fontSize: 12,
          fontFamily: "'JetBrains Mono',monospace",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="all">Все месяцы</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {monthLabel(m)}
          </option>
        ))}
      </select>
    </div>
  );
}
