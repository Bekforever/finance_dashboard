import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { C } from "../../lib/theme";

interface SavingsGaugeProps {
  rate: number;
}

export function SavingsGauge({ rate }: SavingsGaugeProps) {
  const v   = Math.max(0, Math.min(100, rate));
  const col = v >= 30 ? C.green : v >= 10 ? C.amber : C.red;
  return (
    <div style={{ textAlign: "center" }}>
      <ResponsiveContainer width="100%" height={130}>
        <RadialBarChart
          innerRadius="60%"
          outerRadius="100%"
          data={[{ value: v, fill: col }]}
          startAngle={220}
          endAngle={-40}
        >
          <RadialBar dataKey="value" cornerRadius={8} background={{ fill: C.border }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div
        style={{
          marginTop: -18,
          fontFamily: "monospace",
          fontSize: 26,
          fontWeight: 700,
          color: col,
        }}
      >
        {v.toFixed(1)}%
      </div>
      <div style={{ color: C.textDim, fontSize: 11, marginTop: 4 }}>Норма сбережений</div>
    </div>
  );
}
