// components/ItemCard.jsx
import React from "react";

const ItemCard = ({ item, variant = "default" }) => {
  const { image, name, category, color, season, brand } = item;

  const mono = variant === "mono";

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
          <img
            src={image}
            alt={name}
            className={
              mono
                ? "h-full w-full object-cover transition duration-300 hover:scale-105"
                : "h-full w-full object-cover transition duration-300 group-hover:scale-105"
            }
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1 p-4">
        <h3 className="truncate text-base font-semibold text-gray-900">{name}</h3>
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
          {color && (
            <span
              className={
                mono
                  ? "inline-flex items-center gap-2 rounded-none bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 border border-neutral-200"
                  : "inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200"
              }
            >
              <span
                className="inline-block h-3 w-3 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: color.hex || "#eee" }}
                aria-hidden
              />
              {color.name || "Color"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
