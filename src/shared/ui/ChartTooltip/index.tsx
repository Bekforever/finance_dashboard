import { C } from "../../lib/theme";
import { fmt } from "../../lib/formatters";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ color?: string; name?: string; value?: number }>;
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border2}`,
        borderRadius: 10,
        padding: "10px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.6)",
      }}
    >
      <div
        style={{
          color: C.textDim,
          fontSize: 11,
          fontFamily: "monospace",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{
            color: p.color || C.text,
            fontSize: 12,
            fontFamily: "monospace",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: p.color,
              display: "inline-block",
            }}
          />
          <span style={{ color: C.textDim }}>{p.name}:</span> {fmt(p.value ?? 0)}
        </div>
      ))}
    </div>
  );
}
