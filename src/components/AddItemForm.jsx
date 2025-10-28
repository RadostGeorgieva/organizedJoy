import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { createItem, updateItem, uploadWardrobeImage, CATEGORIES } from "../api/items";

export default function AddItemForm({ onClose, onCreated, onUpdated, initialItem }) {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "top",
    color_hex: "",
    size: "",
    price: "",
    purchase_date: "",
    notes: "",
    is_public: false,
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // prefill on open (edit mode)
  useEffect(() => {
    if (!initialItem) return;
    setForm({
      title: initialItem.title || "",
      brand: initialItem.brand || "",
      category: initialItem.category || "",
      color_hex: initialItem.color_hex || "",
      size: initialItem.size || "",
      price: initialItem.price != null ? String(initialItem.price) : "",
      purchase_date: initialItem.purchase_date || "",
      notes: initialItem.notes || "",
      is_public: !!initialItem.is_public,
    });
    if (initialItem.image_url) setPreviewUrl(initialItem.image_url);
  }, [initialItem]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    // get logged in user for create case
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      setSaving(false);
      setErrorMsg("Not signed in.");
      return;
    }

     try {
      let cover_path = initialItem?.cover_path || null;

      // ⬇️ Upload image if chosen
      if (file) {
        cover_path = await uploadWardrobeImage(user.id, file);
      }


    const payload = {
      user_id: user.id,
      title: form.title || null,
      brand: form.brand || null,
      category: form.category || null,
      color_hex: form.color_hex || null,
      size: form.size || null,
      price: form.price === "" ? null : Number(form.price),
      purchase_date: form.purchase_date || null,
      notes: form.notes || null,
      is_public: form.is_public,
      cover_path,
    };

      let saved;
      if (initialItem && initialItem.id) {
        // EDIT EXISTING
        saved = await updateItem(initialItem.id, payload);
        if (onUpdated) onUpdated(saved);
      } else {
        // CREATE NEW
        saved = await createItem(user.id, payload);
        if (onCreated) onCreated(saved);
      }

      setSaving(false);
      onClose();
    } catch (err) {
      console.error(err);
      setSaving(false);
      setErrorMsg("Could not save item.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs text-neutral-500 mb-1">
          Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Black Leather Jacket"
          required
        />
      </div>

      {/* Brand + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-neutral-500 mb-1">
            Brand
          </label>
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="ZARA"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-500 mb-1">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Color picker + Size */}
      <div className="grid grid-cols-2 gap-4">
        {/* Color block */}
        <div>
          <label className="block text-xs text-neutral-500 mb-1">
            Color
          </label>

          <div className="flex items-center gap-3">
            {/* Visual picker */}
            <input
              type="color"
              name="color_hex_picker"
              value={form.color_hex || "#000000"}
              onChange={(e) => {
                const val = e.target.value;
                setForm((prev) => ({ ...prev, color_hex: val }));
              }}
              className="h-10 w-10 rounded-lg border border-neutral-300 p-0 cursor-pointer"
              title="Pick color"
            />

            {/* Hex text */}
            <input
              name="color_hex"
              value={form.color_hex}
              onChange={(e) => {
                let val = e.target.value.trim();
                if (val && !val.startsWith("#")) {
                  val = "#" + val;
                }
                if (
                  val === "" ||
                  /^#[0-9a-fA-F]{0,6}$/.test(val)
                ) {
                  setForm((prev) => ({ ...prev, color_hex: val }));
                }
              }}
              className="flex-1 border rounded-lg px-3 py-2 text-sm font-mono"
              placeholder="#2b1b18"
              maxLength={7}
            />
          </div>

          <p className="text-[10px] text-neutral-400 mt-1">
            Use picker or paste hex (#RRGGBB).
          </p>
        </div>

        {/* Size */}
        <div>
          <label className="block text-xs text-neutral-500 mb-1">
            Size
          </label>
          <input
            name="size"
            value={form.size}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="S / 38 / 28W"
          />
        </div>
      </div>

      {/* Price + Purchase Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-neutral-500 mb-1">
            Price
          </label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="59.99"
            inputMode="decimal"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-500 mb-1">
            Purchase Date
          </label>
          <input
            type="date"
            name="purchase_date"
            value={form.purchase_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs text-neutral-500 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px]"
          placeholder="Fits amazing with the brown boots / dry clean only / etc"
        />
      </div>

      {/* Image Upload */}
 <div>
        <label className="block text-xs text-neutral-500 mb-1">
          Item Photo
        </label>

        <div className="flex items-start gap-4">
          {/* Preview (if any) */}
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Item preview"
              className="h-32 w-24 rounded-lg border border-neutral-200 object-cover bg-neutral-50 flex-shrink-0"
            />
          ) : (
            <div className="h-32 w-24 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-[11px] text-neutral-400 flex items-center justify-center flex-shrink-0">
              No photo
            </div>
          )}

          <div className="flex flex-col gap-2">
            {/* Fake button -> triggers hidden file input */}
            <button
              type="button"
              onClick={() => {
                // click the hidden file input
                document.getElementById("file-input-hidden")?.click();
              }}
              className="px-3 py-2 rounded-xl border text-sm hover:bg-neutral-50"
            >
              {previewUrl ? "Change photo" : "Add photo"}
            </button>

            <p className="text-[11px] text-neutral-400 leading-snug">
              This will be the cover image in your wardrobe.
            </p>

            {/* Real hidden input */}
            <input
              id="file-input-hidden"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

        {/* Public toggle */}
      <div className="flex items-center gap-2">
        <input
          id="is_public"
          name="is_public"
          type="checkbox"
          checked={form.is_public}
          onChange={handleChange}
          className="h-4 w-4 rounded border-neutral-300 text-black"
        />
        <label
          htmlFor="is_public"
          className="text-xs text-neutral-600 select-none"
        >
          Public (others can see this item)
        </label>
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="text-sm text-red-600">{errorMsg}</div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="px-3 py-2 rounded-xl border"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-3 py-2 rounded-xl bg-black text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
