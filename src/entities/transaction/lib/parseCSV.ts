import type { Row } from "../model/types";

function normalizeDate(raw: string): string {
  // "23.02.2026 10:51:15" → "2026-02-23"
  const datePart = raw.split(" ")[0];
  if (datePart.includes(".")) {
    const [d, m, y] = datePart.split(".");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return datePart; // уже YYYY-MM-DD
}

export function parseCSV(text: string): Row[] {
  return text
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const c = line.split(",").map((x) => x.trim().replace(/^"|"$/g, ""));
      return {
        date: normalizeDate(c[0]),
        type: c[1],
        cat: c[2],
        amt: parseFloat(c[3]) || 0,
        note: c[4] || "",
      };
    })
    .filter((r) => r.date && r.amt > 0);
}
