import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { SavingsGauge } from "../../../shared/ui/SavingsGauge";
import { fmt } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";

interface SavingsCardProps {
  savingsRate: number;
  profit: number;
  income: number;
  expense: number;
}

export function SavingsCard({ savingsRate, profit, income, expense }: SavingsCardProps) {
  return (
    <Card style={{ padding: "20px 24px" }}>
      <SectionTitle>Норма сбережений</SectionTitle>
      <SavingsGauge rate={savingsRate} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
        <div style={{ background: C.greenDim, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ color: C.green, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>
            {fmt(profit)}
          </div>
          <div style={{ color: C.textDim, fontSize: 10, marginTop: 2 }}>Сохранено</div>
        </div>
        <div style={{ background: C.redDim, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ color: C.red, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>
            {income > 0 ? ((expense / income) * 100).toFixed(1) : 0}%
          </div>
          <div style={{ color: C.textDim, fontSize: 10, marginTop: 2 }}>Потрачено</div>
        </div>
      </div>
    </Card>
  );
}
