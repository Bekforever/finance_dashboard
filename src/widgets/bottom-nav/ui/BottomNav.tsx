import { useNavigationContext, type Page } from "../../../app/providers/NavigationContext";
import { C } from "../../../shared/lib/theme";

const NAV: { id: Page; icon: string; label: string }[] = [
  { id: "overview",   icon: "◈", label: "Обзор" },
  { id: "analytics",  icon: "◉", label: "Аналит." },
  { id: "categories", icon: "◫", label: "Катег." },
  { id: "history",    icon: "◷", label: "История" },
];

export function BottomNav() {
  const { page, setPage } = useNavigationContext();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => setPage(n.id)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: page === n.id ? C.green : C.textDim,
            padding: "10px 0 8px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            transition: "color .15s",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontFamily: "monospace",
              lineHeight: 1,
            }}
          >
            {n.icon}
          </span>
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: 0.5,
            }}
          >
            {n.label}
          </span>
        </button>
      ))}
    </div>
  );
}
