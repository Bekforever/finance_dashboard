import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { ChartTooltip } from "../../../shared/ui/ChartTooltip";
import { fmtK } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import type { MonthlyData } from "../../../entities/transaction/model/types";

interface ProfitBarChartProps {
  monthly: MonthlyData[];
}

export function ProfitBarChart({ monthly }: ProfitBarChartProps) {
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Чистая прибыль по месяцам</SectionTitle>
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={monthly}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
          <XAxis dataKey="label" tick={{ fill: C.textDim, fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="profit" name="Прибыль" radius={[6, 6, 0, 0]}>
            {monthly.map((d, i) => (
              <Cell key={i} fill={d.profit >= 0 ? C.green : C.red} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
