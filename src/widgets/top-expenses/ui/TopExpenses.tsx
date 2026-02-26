import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { fmt } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import { CHART_COLORS } from "../../../shared/config";
import type { Row } from "../../../entities/transaction/model/types";

interface TopExpensesProps {
  topExp: Row[];
  maxExp: number;
}

export function TopExpenses({ topExp, maxExp }: TopExpensesProps) {
  return (
    <Card style={{ padding: "22px 24px" }}>
      <SectionTitle>Топ-5 крупнейших трат</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {topExp.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: C.textDim, width: 18 }}>
              #{i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12 }}>{r.cat}</span>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: C.red }}>{fmt(r.amt)}</span>
              </div>
              <div style={{ height: 3, background: C.border, borderRadius: 2 }}>
                <div
                  style={{
                    height: 3,
                    width: `${maxExp ? (r.amt / maxExp) * 100 : 0}%`,
                    background: CHART_COLORS[i],
                    borderRadius: 2,
                  }}
                />
              </div>
              <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>
                {r.date} · {r.note || r.cat}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
