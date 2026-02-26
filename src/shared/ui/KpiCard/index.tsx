import { Card } from "../Card";
import { C } from "../../lib/theme";

interface KpiCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: string;
  trendVal?: number;
  delay?: number;
}

export function KpiCard({ label, value, sub, color, icon, trendVal, delay = 0 }: KpiCardProps) {
  return (
    <Card style={{ padding: "20px 22px", animation: `fadeUp .5s ease ${delay}s both`, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.8 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 20 }}>{icon}</div>
        {trendVal !== undefined && (
          <div
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              padding: "2px 8px",
              borderRadius: 20,
              background: trendVal >= 0 ? C.greenDim : C.redDim,
              color: trendVal >= 0 ? C.green : C.red,
            }}
          >
            {trendVal >= 0 ? "▲" : "▼"} {Math.abs(trendVal)}%
          </div>
        )}
      </div>
      <div
        style={{
          marginTop: 12,
          color: C.textDim,
          fontSize: 9,
          fontFamily: "monospace",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 6,
          color,
          fontSize: 21,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: -0.5,
        }}
      >
        {value}
      </div>
      {sub && <div style={{ marginTop: 4, color: C.textDim, fontSize: 11 }}>{sub}</div>}
    </Card>
  );
}
