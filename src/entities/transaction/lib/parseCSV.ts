import type { Row } from "../model/types";

function parseDatetime(raw: string): { date: string; time?: string } {
  // "23.02.2026 10:51:15" → { date: "2026-02-23", time: "10:51" }
  const [datePart, timePart] = raw.split(" ");
  let date: string;
  if (datePart.includes(".")) {
    const [d, m, y] = datePart.split(".");
    date = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  } else {
    date = datePart; // уже YYYY-MM-DD
  }
  const time = timePart ? timePart.slice(0, 5) : undefined;
  return { date, time };
}

export function parseCSV(text: string): Row[] {
  return text
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const c = line.split(",").map((x) => x.trim().replace(/^"|"$/g, ""));
      const { date, time } = parseDatetime(c[0]);
      return {
        date,
        time,
        type: c[1],
        cat: c[2],
        amt: parseFloat(c[3]) || 0,
        note: c[4] || "",
      };
    })
    .filter((r) => r.date && r.amt > 0);
}
