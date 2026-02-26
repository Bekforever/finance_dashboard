import { createContext, useContext, useState, type ReactNode } from "react";

export type Page = "overview" | "analytics" | "categories" | "history";

interface NavigationContextValue {
  page: Page;
  setPage: (p: Page) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("overview");
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
