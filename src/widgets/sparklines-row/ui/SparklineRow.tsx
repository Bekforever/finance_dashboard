import { Card } from "../../../shared/ui/Card";
import { Sparkline } from "../../../shared/ui/Sparkline";
import { fmt } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import { useIsMobile } from "../../../shared/lib/useIsMobile";

interface SparklineRowProps {
  sparkInc: { v: number }[];
  sparkExp: { v: number }[];
  sparkPro: { v: number }[];
  income: number;
  expense: number;
  profit: number;
}

export function SparklineRow({ sparkInc, sparkExp, sparkPro, income, expense, profit }: SparklineRowProps) {
  const isMobile = useIsMobile();
  const items = [
    { label: "Доходы по месяцам",  data: sparkInc, color: C.green, total: fmt(income) },
    { label: "Расходы по месяцам", data: sparkExp, color: C.red,   total: fmt(expense) },
    { label: "Прибыль по месяцам", data: sparkPro, color: C.blue,  total: fmt(Math.max(0, profit)) },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
        gap: 14,
      }}
    >
      {items.map((s, i) => (
        <Card key={i} style={{ padding: "18px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: C.textDim }}>{s.label}</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: s.color }}>{s.total}</div>
          </div>
          <Sparkline data={s.data} color={s.color} />
        </Card>
      ))}
    </div>
  );
}
