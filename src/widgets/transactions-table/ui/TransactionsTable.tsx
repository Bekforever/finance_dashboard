import { Card } from "../../../shared/ui/Card";
import { SectionTitle } from "../../../shared/ui/SectionTitle";
import { fmt } from "../../../shared/lib/formatters";
import { C } from "../../../shared/lib/theme";
import type { Row } from "../../../entities/transaction/model/types";

interface TransactionsTableProps {
  recent: Row[];
  totalRows: number;
  income: number;
  expense: number;
}

export function TransactionsTable({ recent, totalRows, income, expense }: TransactionsTableProps) {
  return (
    <Card>
      <div
        style={{
          padding: "16px 24px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SectionTitle>История операций</SectionTitle>
        <div style={{ display: "flex", gap: 20, fontSize: 12, fontFamily: "monospace" }}>
          <span style={{ color: C.textDim }}>
            Всего: <span style={{ color: C.text }}>{totalRows}</span>
          </span>
          <span style={{ color: C.green }}>+ {fmt(income)}</span>
          <span style={{ color: C.red }}>− {fmt(expense)}</span>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: C.surface }}>
            {["Дата", "Тип", "Категория", "Сумма", "Комментарий"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "10px 20px",
                  textAlign: "left",
                  color: C.textDim,
                  fontSize: 9,
                  fontFamily: "monospace",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recent.map((r, i) => (
            <tr
              key={i}
              className="rh"
              style={{ borderBottom: `1px solid ${C.border}`, transition: "background .1s" }}
            >
              <td style={{ padding: "12px 20px", fontFamily: "monospace", fontSize: 11, color: C.textDim }}>
                {r.date}
              </td>
              <td style={{ padding: "12px 20px" }}>
                <span
                  style={{
                    background: r.type === "Доход" ? C.greenDim : C.redDim,
                    color: r.type === "Доход" ? C.green : C.red,
                    borderRadius: 6,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {r.type}
                </span>
              </td>
              <td style={{ padding: "12px 20px", fontSize: 13 }}>{r.cat}</td>
              <td
                style={{
                  padding: "12px 20px",
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 600,
                  color: r.type === "Доход" ? C.green : C.red,
                }}
              >
                {r.type === "Расход" ? "−" : "+"}
                {fmt(r.amt)}
              </td>
              <td style={{ padding: "12px 20px", fontSize: 12, color: C.textDim }}>{r.note || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
