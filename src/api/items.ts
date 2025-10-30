// src/api/items.ts
import { supabase } from "../lib/supabase";
import type { Database } from "../types/database";

type ItemRow     = Database["public"]["Tables"]["items"]["Row"];
type ItemInsert  = Database["public"]["Tables"]["items"]["Insert"];
type ItemCategory = Database["public"]["Enums"]["item_category"];

// Extend the shape we return to include image_url
export type ItemView = ItemRow & { image_url?: string | null };

async function signUrl(cover_path?: string | null, expiresIn = 3600) {
  if (!cover_path) return null;
  const { data, error } = await supabase
    .storage
    .from("wardrobe")
    .createSignedUrl(cover_path, expiresIn);
  if (error) return null;
  return data?.signedUrl ?? null;
}

async function enrichItem(it: ItemRow): Promise<ItemView> {
  const image_url = await signUrl(it.cover_path);
  return { ...it, image_url };
}

export async function uploadWardrobeImage(userId: string, file: File): Promise<string> {
  if (!userId) throw new Error("No userId");
  const safeName = file.name.replace(/[^\w.-]/g, "_");
  const path = `${userId}/items/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from("wardrobe").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "application/octet-stream",
  });
  if (error) throw error;
  return path;
}

export async function createItem(
  userId: string,
  item: Omit<ItemInsert, "user_id">
): Promise<ItemView> {
  const payload: ItemInsert = { ...item, user_id: userId };
  const { data, error } = await supabase
    .from("items")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return enrichItem(data!);
}

export async function listMyItems(userId: string): Promise<ItemView[]> {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  const items = data ?? [];
  return Promise.all(items.map(enrichItem));
}

export async function listMyItemsCurrent(): Promise<ItemView[]> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) throw new Error("Not signed in");
  return listMyItems(userId);
}

export async function updateItem(
  itemId: string,
  patch: Partial<ItemInsert>
): Promise<ItemView> {
  // ensure updated_at bumps so consumers can key off it
  const withTimestamp = { ...patch, updated_at: new Date().toISOString() as any };

  const { data, error } = await supabase
    .from("items")
    .update(withTimestamp)
    .eq("id", itemId)
    .select()
    .single();

  if (error) throw error;

  // IMPORTANT: return an enriched row with a **fresh signed URL**
  return enrichItem(data!);
}

export async function deleteItem(itemId: string): Promise<void> {
  const { error } = await supabase.from("items").delete().eq("id", itemId);
  if (error) throw error;
}

export const CATEGORIES: ItemCategory[] = [
  "top","bottom","dress","outerwear","shoes","bag","accessory","beauty","other",
];
