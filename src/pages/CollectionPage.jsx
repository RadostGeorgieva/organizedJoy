import React from "react";
import ItemCard from "../components/ItemCard";
import data from "../collection.json";

const CollectionsPage = () => {
    const items = Array.isArray(data?.items) ? data.items : [];
    console.log(items);
    
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pink-700">My Collection</h1>
          <p className="text-gray-600">All your pieces in one place.</p>
        </div>

        {/* Placeholder actions (non-functional for now) */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search items…"
            className="w-56 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            disabled
          />
          <button
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm ring-1 ring-pink-100"
            disabled
            title="Filters coming later"
          >
            Filters
          </button>
        </div>
      </header>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          No items yet. Add some later.
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </section>
      )}
    </main>
  );
};

export default CollectionsPage;
