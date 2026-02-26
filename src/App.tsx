import { TransactionProvider, useTransactionContext } from "./app/providers/TransactionContext";
import { FilterProvider } from "./app/providers/FilterContext";
import { NavigationProvider, useNavigationContext } from "./app/providers/NavigationContext";
import { GlobalStyles } from "./app/styles/GlobalStyles";
import { LoadingScreen } from "./shared/ui/LoadingScreen";
import { Header } from "./widgets/header/ui/Header";
import { OverviewPage } from "./pages/overview/ui/OverviewPage";
import { AnalyticsPage } from "./pages/analytics/ui/AnalyticsPage";
import { CategoriesPage } from "./pages/categories/ui/CategoriesPage";
import { HistoryPage } from "./pages/history/ui/HistoryPage";
import { C } from "./shared/lib/theme";

function AppContent() {
  const { page } = useNavigationContext();
  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.text,
        fontFamily: "'Outfit','DM Sans',sans-serif",
      }}
    >
      <GlobalStyles />
      <Header />
      <div style={{ padding: "24px 28px", maxWidth: 1400, margin: "0 auto" }}>
        {page === "overview"   && <OverviewPage />}
        {page === "analytics"  && <AnalyticsPage />}
        {page === "categories" && <CategoriesPage />}
        {page === "history"    && <HistoryPage />}
      </div>
    </div>
  );
}

function AppInner() {
  const { data, loading } = useTransactionContext();
  if (loading) return <LoadingScreen />;
  return (
    <FilterProvider data={data}>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </FilterProvider>
  );
}

export default function App() {
  return (
    <TransactionProvider>
      <AppInner />
    </TransactionProvider>
  );
}
