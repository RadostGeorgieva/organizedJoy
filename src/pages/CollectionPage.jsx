// pages/CollectionPage.jsx
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { listMyItemsCurrent } from "../api/items"; // <- single API import

export default function CollectionPage() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("loading"); // "loading" | "ready" | "anon" | "error"
  const [selected, setSelected] = useState(null); // <- NEW

  useEffect(() => {
    (async () => {
      try {
        const rows = await listMyItemsCurrent(); // <- ONE call
        setItems(rows);
        setState("ready");
      } catch (e) {
        if ((e?.message || "").includes("Not signed in")) setState("anon");
        else { console.error(e); setState("error"); }
      }
    })();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-10" style={{ fontFamily: '"Playfair Display", serif' }}>
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">My Collection</h1>
        <p className="text-neutral-600 mt-1">All your pieces in one place.</p>
      </header>

      <div className="border-t border-neutral-200 mb-6" />

      {state === "loading" && <div className="text-neutral-600">Loading…</div>}
      {state === "anon"    && <div className="text-neutral-600">Please sign in to view your collection.</div>}
      {state === "error"   && <div className="text-red-600">Couldn’t load items.</div>}

      {state === "ready" && (
        items.length === 0 ? (
          <div className="border border-dashed border-neutral-300 p-10 text-center text-neutral-500">
            No items yet.
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((it) => (
              <div key={it.id} className="relative">
                <ItemCard item={it} variant="mono" onClick={() => setSelected(it)} />
              </div>
            ))}
          </section>
        )
      )}

      {/* Minimal detail modal */}
      {selected && (
        <DetailModal item={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

/** Lightweight detail modal that just *shows* more fields if they exist. */
function DetailModal({ item, onClose }) {
  const title       = item.title || item.name || "Item";
  const imageUrl    = item.image_url || item.image || null;
  const brand       = item.brand || "";
  const category    = item.category || "";
  const colorHex    = item.color_hex || item?.color?.hex || null;
  const colorName   = item?.color?.name || item.color || null;
  const season      = item.season || "";
  const size        = item.size ?? item.size_label ?? "";
  const price       = item.price ?? item.cost ?? "";
  const purchasedAt = item.purchased_at ?? item.purchaseDate ?? "";
  const notes       = item.notes ?? "";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-0 sm:p-6 flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-2xl leading-none px-2">×</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-6 p-4">
          {/* Left: image */}
          <div className="aspect-[4/5] bg-neutral-50 overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300 text-sm">No image</div>
            )}
          </div>

          {/* Right: details */}
          <div className="space-y-3">
            <Row label="Brand" value={brand} />
            <Row label="Category" value={category} />
            <Row label="Color" value={colorName || colorHex} swatch={colorHex} />
            <Row label="Season" value={season} />
            <Row label="Size" value={size} />
            <Row label="Price" value={formatPrice(price)} />
            <Row label="Purchased" value={formatDateLong(purchasedAt)} />
            {notes && (
              <div>
                <div className="text-xs text-neutral-500 mb-1">Notes</div>
                <p className="text-sm text-neutral-800 whitespace-pre-wrap">{notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 pb-4 flex justify-end gap-2">
          {/* Placeholder for later actions; safe to leave now or wire later */}
           <button className="px-3 py-2 rounded-xl border">✏️ Edit</button>
          <button className="px-3 py-2 rounded-xl border text-red-600 border-red-200">🗑️ Delete</button> 
          <button onClick={onClose} className="px-3 py-2 rounded-xl border">Close</button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, swatch }) {
  if (!value && !swatch) return null;
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs text-neutral-500 w-24">{label}</div>
      <div className="text-sm text-neutral-900 flex items-center gap-2">
        {swatch && <span className="inline-block h-3 w-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: swatch }} />}
        <span>{value}</span>
      </div>
    </div>
  );
}

function formatPrice(v) {
  if (v == null || v === "") return "";
  const n = Number(v);
  if (Number.isFinite(n)) return new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR", currencyDisplay: "narrowSymbol" }).format(n);
  return String(v);
}
function formatDateLong(d) {
  if (!d) return "";
  try {
    const dt = typeof d === "string" ? new Date(d) : d;
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  } catch { return String(d); }
}
