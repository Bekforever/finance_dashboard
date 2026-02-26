import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { ChartTooltip } from "../../../shared/ui/ChartTooltip";
import { fmtK } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";

interface CumulativeChartProps {
  cumulative: { label: string; bal: number }[];
}

export function CumulativeChart({ cumulative }: CumulativeChartProps) {
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Накопительный баланс</SectionTitle>
      <ResponsiveContainer width="100%" height={170}>
        <AreaChart data={cumulative}>
          <defs>
            <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={C.blue} stopOpacity={0.35} />
              <stop offset="95%" stopColor={C.blue} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
          <XAxis dataKey="label" tick={{ fill: C.textDim, fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="bal" name="Баланс" stroke={C.blue} fill="url(#gB)" strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
