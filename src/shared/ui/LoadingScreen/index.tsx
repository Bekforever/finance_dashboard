import { C } from "../../lib/theme";

export function LoadingScreen() {
  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: `3px solid ${C.border2}`,
          borderTop: `3px solid ${C.green}`,
          borderRadius: "50%",
          animation: "spin .8s linear infinite",
        }}
      />
      <div
        style={{
          color: C.textDim,
          fontFamily: "monospace",
          fontSize: 11,
          letterSpacing: 2,
        }}
      >
        ЗАГРУЗКА ДАННЫХ...
      </div>
    </div>
  );
}
