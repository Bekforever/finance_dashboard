import { createContext, useContext, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export type Page = "overview" | "analytics" | "categories" | "history";

const PAGES: Page[] = ["overview", "analytics", "categories", "history"];

function pathToPage(pathname: string): Page {
  const segment = pathname.replace(/^\//, "") as Page;
  return PAGES.includes(segment) ? segment : "overview";
}

interface NavigationContextValue {
  page: Page;
  setPage: (p: Page) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const page = pathToPage(location.pathname);
  const setPage = (p: Page) => navigate(`/${p}`);
  return (
    <NavigationContext.Provider value={{ page, setPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigationContext must be used within NavigationProvider");
  return ctx;
}
