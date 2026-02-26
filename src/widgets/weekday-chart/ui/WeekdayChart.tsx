import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { ChartTooltip } from "../../../shared/ui/ChartTooltip";
import { fmtK } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";

interface WeekdayChartProps {
  byWeekday: { day: string; amt: number }[];
}

export function WeekdayChart({ byWeekday }: WeekdayChartProps) {
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Расходы по дням недели</SectionTitle>
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={byWeekday} layout="vertical">
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
            dataKey="day"
            tick={{ fill: C.textDim, fontSize: 12, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            width={26}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="amt" name="Расход" fill={C.purple} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
