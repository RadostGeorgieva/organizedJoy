import React from "react";
import AddItemForm from "./AddItemForm";
import ExistingItemDetails from "./ExistingItemDetails";

export default function DetailsModal({ item, onClose }) {
  const isNew = item?.isNew;
  const title = isNew
    ? "Add New Item"
    : (item.title || item.name || "Item");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-0 sm:p-6 flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-2xl leading-none px-2"
          >
            ×
          </button>
        </div>

        {/* Body */}
        {isNew ? (
          <AddItemForm onClose={onClose}
          onCreated={(newItem) => {
    // lift this up however you structure DetailsModal
  }} />
        ) : (
          <ExistingItemDetails item={item} />
        )}

        {/* Footer only for existing items */}
        {!isNew && (
          <div className="px-4 pb-4 flex justify-end gap-2">
            <button className="px-3 py-2 rounded-xl border">✏️ Edit</button>
            <button className="px-3 py-2 rounded-xl border text-red-600 border-red-200">
              🗑️ Delete
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl border"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
