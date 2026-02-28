import { PageNavigation } from "../../../features/page-navigation/ui/PageNavigation";
import { MonthFilter } from "../../../features/month-filter/ui/MonthFilter";
import { C } from "../../../shared/lib/theme";
import { SHEET_CSV_URL } from "../../../shared/config";
import { useIsMobile } from "../../../shared/lib/useIsMobile";
import { useTransactionContext } from "../../../app/providers/TransactionContext";

function RefreshButton({ loading, refetch }: { loading: boolean; refetch: () => void }) {
  return (
    <button
      onClick={refetch}
      disabled={loading}
      title="Обновить данные"
      style={{
        background: "none",
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        padding: 0,
        color: loading ? C.textMuted : C.textBold,
        flexShrink: 0,
        transition: "border-color 0.15s, color 0.15s",
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          animation: loading ? "spin 0.8s linear infinite" : "none",
        }}
      >
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    </button>
  );
}

export function Header() {
  const isMobile = useIsMobile();
  const { loading, refetch } = useTransactionContext();

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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MonthFilter />
          <RefreshButton loading={loading} refetch={refetch} />
        </div>
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
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <MonthFilter />
        <RefreshButton loading={loading} refetch={refetch} />
      </div>
    </div>
  );
}
