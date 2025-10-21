// src/api/items.ts
import { supabase } from "../lib/supabase";
import type { Database } from "../types/database";

type ItemRow     = Database["public"]["Tables"]["items"]["Row"];
type ItemInsert  = Database["public"]["Tables"]["items"]["Insert"];
type ItemCategory = Database["public"]["Enums"]["item_category"];

export async function uploadWardrobeImage(userId: string, file: File): Promise<string> {
  if (!userId) throw new Error("No userId");
  const safeName = file.name.replace(/[^\w.-]/g, "_"); // sanitize
  const path = `${userId}/items/${crypto.randomUUID()}-${safeName}`; // <- auto “folder”
  const { error } = await supabase.storage.from("wardrobe").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "application/octet-stream",
  });
  if (error) throw error;
  return path; // save this into items.cover_path
}
export async function createItem(
  userId: string,
  item: Omit<ItemInsert, "user_id"> // <-- use generated Insert type
): Promise<ItemRow> {
  const payload: ItemInsert = { ...item, user_id: userId }; // <-- now typed correctly
  const { data, error } = await supabase
    .from("items")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data!;
}

export async function listMyItems(userId: string): Promise<ItemRow[]> {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  const items = data ?? [];

  const enriched = await Promise.all(
    items.map(async (it) => {
      if (!it.cover_path) return it;
      const { data: signed } = await supabase
        .storage
        .from("wardrobe")
        .createSignedUrl(it.cover_path, 3600); // valid 1h
      return { ...it, image_url: signed?.signedUrl ?? null };
    })
  );
  return enriched;
}

export async function listMyItemsCurrent(): Promise<ItemRow[]> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) throw new Error("Not signed in");
  return listMyItems(userId); // single DB request
}



// Optional helper: constrain category literals in your UI
export const CATEGORIES: ItemCategory[] = [
  "top","bottom","dress","outerwear","shoes","bag","accessory","beauty","other",
];
