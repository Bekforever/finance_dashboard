import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { ChartTooltip } from "../../../shared/ui/ChartTooltip";
import { fmtK } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import type { MonthlyData } from "../../../entities/transaction/model/types";

interface IncomeExpenseChartProps {
  monthly: MonthlyData[];
}

export function IncomeExpenseChart({ monthly }: IncomeExpenseChartProps) {
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Динамика доходов и расходов</SectionTitle>
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={monthly}>
          <defs>
            <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={C.green} stopOpacity={0.3} />
              <stop offset="95%" stopColor={C.green} stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={C.red} stopOpacity={0.3} />
              <stop offset="95%" stopColor={C.red} stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
          <XAxis dataKey="label" tick={{ fill: C.textDim, fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ color: C.textDim, fontSize: 12, paddingTop: 8 }} />
          <Area type="monotone" dataKey="income"  name="Доход"  stroke={C.green} fill="url(#gI)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="expense" name="Расход" stroke={C.red}   fill="url(#gE)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
