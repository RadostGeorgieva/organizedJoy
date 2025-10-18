// pages/CollectionPage.jsx
import React from "react";
import ItemCard from "../components/ItemCard";
import data from "../collection.json";

const CollectionPage = () => {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-10" style={{ fontFamily: '"Playfair Display", serif' }}>
      {/* Title + subtle subhead */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">My Collection</h1>
        <p className="text-neutral-600 mt-1">All your pieces in one place.</p>
      </header>

      {/* Hairline */}
      <div className="border-t border-neutral-200 mb-6" />

      {/* Actions (disabled for now, but neutral styling) */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search items…"
          className="w-64 border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
          disabled
        />
        <button
          className="border border-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition"
          disabled
          title="Filters coming later"
        >
          Filters
        </button>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="border border-dashed border-neutral-300 p-10 text-center text-neutral-500">
          No items yet. Add some later.
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <ItemCard key={it.id} item={it} variant="mono" />
          ))}
        </section>
      )}
    </main>
  );
};

export default CollectionPage;
