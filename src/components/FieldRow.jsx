import React from "react";

export default function FieldRow({ label, value, swatch }) {
  if (!value && !swatch) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs text-neutral-500 w-24">{label}</div>
      <div className="text-sm text-neutral-900 flex items-center gap-2">
        {swatch && (
          <span
            className="inline-block h-3 w-3 rounded-full ring-1 ring-black/10"
            style={{ backgroundColor: swatch }}
          />
        )}
        <span>{value}</span>
      </div>
    </div>
  );
}
