import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { fmt, fmtK } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import { CHART_COLORS } from "../../../shared/config";
import type { CatData } from "../../../entities/transaction/model/types";

interface IncomeCategoriesProps {
  incCats: CatData[];
}

export function IncomeCategories({ incCats }: IncomeCategoriesProps) {
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Доходы по категориям</SectionTitle>
      <ResponsiveContainer width="100%" height={190}>
        <BarChart data={incCats} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: C.textDim, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtK}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: C.textDim, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip
            formatter={(v: number) => fmt(v)}
            contentStyle={{ background: C.card, border: `1px solid ${C.border2}`, borderRadius: 8, color: C.text }}
          />
          <Bar dataKey="value" name="Доход" radius={[0, 6, 6, 0]}>
            {incCats.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {incCats.map((c, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11 }}>{c.name}</span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: C.green }}>{fmt(c.value)}</span>
            </div>
            <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
              <div
                style={{
                  height: 4,
                  width: `${incCats[0] ? (c.value / incCats[0].value) * 100 : 0}%`,
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
