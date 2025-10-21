import { supabase } from "../lib/supabase";

export async function createOutfit(userId: string, name: string){
  const { data, error } = await supabase
    .from("outfits").insert({ user_id: userId, name }).select().single();
  if (error) throw error;
  return data;
}

export async function addItemsToOutfit(outfitId: string, itemIds: string[]){
  const rows = itemIds.map(id => ({ outfit_id: outfitId, item_id: id }));
  const { error } = await supabase.from("outfit_items").insert(rows);
  if (error) throw error;
}
