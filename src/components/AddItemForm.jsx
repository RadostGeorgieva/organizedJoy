import React, { useState } from "react";

export default function AddItemForm({ onClose }) {
  const [form, setForm] = useState({ title: "", brand: "", category: "", color: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connect to Supabase insert
    console.log("New item:", form);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-xs text-neutral-500 mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="e.g. Black Leather Jacket"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1">Color</label>
        <input name="color" value={form.color} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="px-3 py-2 rounded-xl border">Cancel</button>
        <button type="submit" className="px-3 py-2 rounded-xl bg-black text-white">Save</button>
      </div>
    </form>
  );
}
