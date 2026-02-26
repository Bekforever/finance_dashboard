import type { ReactNode } from "react";
import { C } from "../../lib/theme";

interface SectionTitleProps {
  children: ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div
      style={{
        fontSize: 10,
        fontFamily: "monospace",
        color: C.textDim,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          width: 3,
          height: 12,
          background: C.green,
          borderRadius: 2,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}
