import { supabase } from "../lib/supabase";

export async function ensureDefaultWishlist(userId: string){
  const { data, error } = await supabase
    .from("wishlists").select("id").eq("user_id", userId).eq("title","Default").maybeSingle();
  if (error) throw error;
  if (data) return data.id;
  const ins = await supabase.from("wishlists").insert({ user_id: userId, title: "Default" }).select().single();
  if (ins.error) throw ins.error;
  return ins.data.id;
}

export async function addWishlistItem(wishlistId: string, item: {
  name: string; link?: string; price?: number; image_url?: string; tags?: string[];
}){
  const { error } = await supabase.from("wishlist_items").insert({ ...item, wishlist_id: wishlistId });
  if (error) throw error;
}
