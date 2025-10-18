// pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import data from "../collection.json";

export default function HomePage() {
  const items = Array.isArray(data?.items) ? data.items.slice(0, 8) : [];

  return (
    <div className="bg-white text-neutral-900" style={{ fontFamily: '"Playfair Display", serif' }}>
      {/* HERO */}
      <section className="max-w-screen-xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Clean color. Personal style.
          <br className="hidden md:block" />
          <span className="block md:inline"> Effortlessly curated.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
          Discover the palette that loves your skin, build a wardrobe that works, and shop with confidence.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition"
          >
            Find My Colors
          </Link>
          <Link
            to="/collection"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium border border-neutral-900 hover:bg-neutral-50 transition"
          >
            View My Collection
          </Link>
        </div>
      </section>

      {/* HAIRLINE */}
      <div className="border-t border-neutral-200" />

      {/* VALUE PROPS */}
      <section className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold">Find Your Season</h3>
            <p className="mt-2 text-neutral-600">Modern color analysis. See what truly flatters you.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Curate with Intention</h3>
            <p className="mt-2 text-neutral-600">Build a focused wardrobe. Kill decision fatigue.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Shop Smarter</h3>
            <p className="mt-2 text-neutral-600">Save favorites, track fits, buy only what earns a place.</p>
          </div>
        </div>
      </section>

      {/* HAIRLINE */}
      <div className="border-t border-neutral-200" />

      {/* PREVIEW GRID using ItemCard */}
      <section className="max-w-screen-xl mx-auto px-6 py-12">
        <h4 className="text-lg font-semibold mb-6">A glimpse of your collection</h4>

        {items.length === 0 ? (
          <div className="border border-dashed border-neutral-300 p-10 text-center text-neutral-500">
            No items yet. Start building your collection.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((it) => (
              <ItemCard key={it.id} item={it} variant="mono" />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/collection"
            className="inline-flex items-center justify-center px-6 py-2 border border-neutral-900 hover:bg-neutral-50 transition"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
