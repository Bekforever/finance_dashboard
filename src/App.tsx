import { Routes, Route, Navigate } from "react-router-dom";
import { TransactionProvider, useTransactionContext } from "./app/providers/TransactionContext";
import { FilterProvider } from "./app/providers/FilterContext";
import { NavigationProvider } from "./app/providers/NavigationContext";
import { GlobalStyles } from "./app/styles/GlobalStyles";
import { LoadingScreen } from "./shared/ui/LoadingScreen";
import { Header } from "./widgets/header/ui/Header";
import { BottomNav } from "./widgets/bottom-nav/ui/BottomNav";
import { OverviewPage } from "./pages/overview/ui/OverviewPage";
import { AnalyticsPage } from "./pages/analytics/ui/AnalyticsPage";
import { CategoriesPage } from "./pages/categories/ui/CategoriesPage";
import { HistoryPage } from "./pages/history/ui/HistoryPage";
import { useIsMobile } from "./shared/lib/useIsMobile";
import { C } from "./shared/lib/theme";

function AppContent() {
  const isMobile = useIsMobile();
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
      <div
        style={{
          padding: isMobile ? "16px 12px" : "24px 28px",
          maxWidth: 1400,
          margin: "0 auto",
          paddingBottom: isMobile ? 80 : undefined,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </div>
      {isMobile && <BottomNav />}
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
