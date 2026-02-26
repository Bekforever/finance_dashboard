import { useNavigationContext, type Page } from "../../../app/providers/NavigationContext";
import { C } from "../../../shared/lib/theme";

const NAV: { id: Page; icon: string; label: string }[] = [
  { id: "overview",   icon: "◈", label: "Обзор" },
  { id: "analytics",  icon: "◉", label: "Аналитика" },
  { id: "categories", icon: "◫", label: "Категории" },
  { id: "history",    icon: "◷", label: "История" },
];

export function PageNavigation() {
  const { page, setPage } = useNavigationContext();
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {NAV.map((n) => (
        <button
          key={n.id}
          className="nbtn"
          onClick={() => setPage(n.id)}
          style={{
            background: page === n.id ? C.card : "transparent",
            color: page === n.id ? C.green : C.textDim,
            border: page === n.id ? `1px solid ${C.border2}` : "1px solid transparent",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all .15s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 11, fontFamily: "monospace" }}>{n.icon}</span> {n.label}
        </button>
      ))}
    </div>
  );
}
