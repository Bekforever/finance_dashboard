export const fmt = (n: number): string =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n || 0) + " UZS";

export const fmtK = (n: number): string =>
  n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + "М"
    : n >= 1_000
    ? (n / 1_000).toFixed(0) + "к"
    : String(n);

export const monthLabel = (ym: string): string => {
  const M = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
  const [y, m] = ym.split("-");
  return M[parseInt(m) - 1] + " " + y.slice(2);
};
