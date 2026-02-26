import { SHEET_CSV_URL } from "../../../shared/config";
import { parseCSV } from "../lib/parseCSV";
import { DEMO } from "../lib/demo";
import type { Row } from "../model/types";

export async function fetchTransactions(): Promise<Row[]> {
  if (!SHEET_CSV_URL) return DEMO;
  try {
    const r = await fetch(SHEET_CSV_URL);
    const t = await r.text();
    return parseCSV(t);
  } catch {
    return DEMO;
  }
}
