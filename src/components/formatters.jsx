export function formatPrice(v) {
  if (v == null || v === "") return "";
  const n = Number(v);
  if (Number.isFinite(n)) {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "BGN",
      currencyDisplay: "narrowSymbol",
    }).format(n);
  }
  return String(v);
}

export function formatDateLong(d) {
  if (!d) return "";
  try {
    const dt = typeof d === "string" ? new Date(d) : d;
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return String(d);
  }
}
