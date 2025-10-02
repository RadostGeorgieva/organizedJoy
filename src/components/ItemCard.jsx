import React from "react";

const ItemCard = ({ item }) => {
  const { image, name, category, color, season, brand } = item;
  console.log(item);
  

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
      {/* Image */}
      <div className="relative">
        {/* Use aspect ratio to keep cards tidy */}
        <div className="aspect-[4/5] w-full overflow-hidden bg-pink-50">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
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
            <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
              {brand}
            </span>
          )}
          {season && (
            <span className="rounded-full bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-100">
              {season}
            </span>
          )}
          {color && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
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
