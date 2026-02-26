import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { ChartTooltip } from "../../../shared/ui/ChartTooltip";
import { fmtK } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import type { MonthlyData } from "../../../entities/transaction/model/types";

interface GroupedBarChartProps {
  monthly: MonthlyData[];
}

export function GroupedBarChart({ monthly }: GroupedBarChartProps) {
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Доход vs Расход по месяцам</SectionTitle>
      <ResponsiveContainer width="100%" height={190}>
        <BarChart data={monthly} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
          <XAxis dataKey="label" tick={{ fill: C.textDim, fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ color: C.textDim, fontSize: 12 }} />
          <Bar dataKey="income"  name="Доход"  fill={C.green} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Расход" fill={C.red}   radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
