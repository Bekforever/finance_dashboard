import { PageNavigation } from "../../../features/page-navigation/ui/PageNavigation";
import { MonthFilter } from "../../../features/month-filter/ui/MonthFilter";
import { C } from "../../../shared/lib/theme";
import { SHEET_CSV_URL } from "../../../shared/config";
import { useIsMobile } from "../../../shared/lib/useIsMobile";

export function Header() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 52,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: `linear-gradient(135deg,${C.green},${C.blue})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            UZS
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 13,
              fontWeight: 600,
              color: C.textBold,
              letterSpacing: -0.5,
            }}
          >
            Finance_2026
          </div>
        </div>
        <MonthFilter />
      </div>
    );
  }

  return (
    <div
      style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 58,
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: `linear-gradient(135deg,${C.green},${C.blue})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          UZS
        </div>
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 14,
              fontWeight: 600,
              color: C.textBold,
              letterSpacing: -0.5,
            }}
          >
            Finance_2026
          </div>
          <div
            style={{
              fontSize: 9,
              color: !SHEET_CSV_URL ? C.amber : C.green,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {!SHEET_CSV_URL ? "● DEMO MODE" : "● LIVE — Google Sheets"}
          </div>
        </div>
      </div>

      <PageNavigation />
      <MonthFilter />
    </div>
  );
}
