// pages/CollectionPage.jsx
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { listMyItemsCurrent } from "../api/items"; // <- single API import

export default function CollectionPage() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("loading"); // "loading" | "ready" | "anon" | "error"

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
              <ItemCard key={it.id} item={it} variant="mono" />
            ))}
          </section>
        )
      )}
    </main>
  );
}
