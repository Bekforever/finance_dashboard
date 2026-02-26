import type { ReactNode, CSSProperties } from "react";
import { C } from "../../lib/theme";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Card({ children, style = {} }: CardProps) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
