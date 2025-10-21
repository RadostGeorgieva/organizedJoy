// components/ItemCard.jsx
import React from "react";

const ItemCard = ({ item, variant = "default" }) => {
  const mono = variant === "mono";

  // --- map both shapes (DB + old JSON) ---
  const imageUrl = item.image_url || item.image || null;   // API should attach image_url
  const title    = item.title || item.name || "Untitled";
  const brand    = item.brand || null;
  const category = item.category || "";
  const colorHex = item.color_hex || item?.color?.hex || null;
  const colorName = item?.color?.name || null;
  const season   = item.season || null;

  return (
    <article
      className={
        mono
          ? "overflow-hidden bg-white border border-neutral-200"
          : "group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
      }
    >
      {/* Image */}
      <div className="relative">
        <div className={mono ? "aspect-[4/5] w-full overflow-hidden bg-neutral-50" : "aspect-[4/5] w-full overflow-hidden bg-pink-50"}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className={
                mono
                  ? "h-full w-full object-cover transition duration-300 hover:scale-105"
                  : "h-full w-full object-cover transition duration-300 group-hover:scale-105"
              }
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-neutral-300">
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1 p-4">
        <h3 className="truncate text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{category}</p>

        {/* Meta row */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {brand && (
            <span
              className={
                mono
                  ? "rounded-none bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 border border-neutral-200"
                  : "rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200"
              }
            >
              {brand}
            </span>
          )}

          {season && (
            <span
              className={
                mono
                  ? "rounded-none bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 border border-neutral-200"
                  : "rounded-full bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-100"
              }
            >
              {season}
            </span>
          )}

          {(colorHex || colorName) && (
            <span
              className={
                mono
                  ? "inline-flex items-center gap-2 rounded-none bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 border border-neutral-200"
                  : "inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200"
              }
            >
              <span
                className="inline-block h-3 w-3 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: colorHex || "#eee" }}
                aria-hidden
              />
              {colorName || colorHex}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
