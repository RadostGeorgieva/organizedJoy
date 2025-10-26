// pages/CollectionPage.jsx
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import DetailsModal from "../components/DetailsModal";
import { listMyItemsCurrent } from "../api/items"; // <- single API import

export default function CollectionPage() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("loading"); // "loading" | "ready" | "anon" | "error"
  const [selected, setSelected] = useState(null); // modal target

  useEffect(() => {
    (async () => {
      try {
        const rows = await listMyItemsCurrent(); // <- ONE call
        setItems(rows);
        setState("ready");
      } catch (e) {
        if ((e?.message || "").includes("Not signed in")) {
          setState("anon");
        } else {
          console.error(e);
          setState("error");
        }
      }
    })();
  }, []);

  // Reusable CTA button (black by default, invert on hover)
  function AddButton({ label }) {
    return (
      <button
        onClick={() => setSelected({ isNew: true })}
        className="
          inline-flex items-center gap-2
          px-4 py-2 text-sm font-medium
          rounded-lg border border-neutral-900
          bg-neutral-900 text-white
          hover:bg-white hover:text-neutral-900
          transition
        "
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full border border-neutral-400 text-lg leading-none">
          ＋
        </span>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <main
      className="max-w-screen-xl mx-auto px-6 pt-12 pb-20"
      style={{ fontFamily: '"Playfair Display", serif' }}
    >
      {/* header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-neutral-900">
          My Collection
        </h1>
        <p className="text-neutral-600 mt-2 text-sm md:text-base leading-relaxed max-w-lg">
          All your pieces in one place.
        </p>
      </header>

      {/* status messages */}
      {state === "loading" && (
        <div className="text-neutral-600 text-sm">Loading…</div>
      )}
      {state === "anon" && (
        <div className="text-neutral-600 text-sm">
          Please sign in to view your collection.
        </div>
      )}
      {state === "error" && (
        <div className="text-red-600 text-sm">Couldn’t load items.</div>
      )}

      {state === "ready" && (
        <>
          {/* CASE 1: no items yet */}
          {items.length === 0 && (
            <section className="mb-10 flex justify-center">
              <div className="border border-neutral-200 rounded-xl p-10 text-center max-w-md bg-neutral-50/50 shadow-sm">
                <h2 className="text-xl font-medium text-neutral-900 mb-2">
                  Your wardrobe is empty
                </h2>

                <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                  Add your first item to start tracking what you own.
                </p>

                <AddButton label="Add first item" />
              </div>
            </section>
          )}

          {/* CASE 2: user already has items */}
          {items.length > 0 && (
            <>
              {/* items grid */}
              <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
                {items.map((it) => (
                  <div key={it.id} className="relative">
                    <ItemCard
                      item={it}
                      variant="mono"
                      onClick={() => setSelected(it)}
                    />
                  </div>
                ))}
              </section>

              {/* centered CTA under the grid */}
              <div className="flex justify-center">
                <AddButton label="Add another treasure" />
              </div>
            </>
          )}
        </>
      )}

      {/* Modal */}
      {selected && (
        <DetailsModal item={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
