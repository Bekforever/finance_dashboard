import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { fmt } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import { CHART_COLORS } from "../../../shared/config";
import { useIsMobile } from "../../../shared/lib/useIsMobile";
import type { CatData } from "../../../entities/transaction/model/types";

interface ExpenseCategoriesProps {
  expCats: CatData[];
  totalExpense: number;
}

export function ExpenseCategories({ expCats, totalExpense }: ExpenseCategoriesProps) {
  const isMobile = useIsMobile();
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Расходы по категориям</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12,
          alignItems: "center",
        }}
      >
        <ResponsiveContainer width="100%" height={190}>
          <PieChart>
            <Pie
              data={expCats}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={86}
              dataKey="value"
              paddingAngle={3}
              strokeWidth={0}
            >
              {expCats.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number | undefined) => fmt(v ?? 0)}
              contentStyle={{ background: C.card, border: `1px solid ${C.border2}`, borderRadius: 8, color: C.text }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {expCats.slice(0, 7).map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: CHART_COLORS[i % CHART_COLORS.length],
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: 11 }}>{c.name}</span>
              </div>
              <span style={{ fontSize: 10, color: C.textDim, fontFamily: "monospace" }}>
                {totalExpense ? ((c.value / totalExpense) * 100).toFixed(0) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {expCats.map((c, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11 }}>{c.name}</span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: C.red }}>{fmt(c.value)}</span>
            </div>
            <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
              <div
                style={{
                  height: 4,
                  width: `${expCats[0] ? (c.value / expCats[0].value) * 100 : 0}%`,
                  background: CHART_COLORS[i % CHART_COLORS.length],
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
