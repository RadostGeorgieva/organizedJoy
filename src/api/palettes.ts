import { supabase } from "../lib/supabase";

export async function createPalette(userId: string, season: "spring"|"summer"|"autumn"|"winter", subtype?: string){
  const { data, error } = await supabase
    .from("palettes")
    .insert({ user_id: userId, season, subtype })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function addSwatches(paletteId: string, swatches: Array<{name?: string; hex: string; rank?: number}>){
  const rows = swatches.map(s => ({ ...s, palette_id: paletteId }));
  const { error } = await supabase.from("palette_swatches").insert(rows);
  if (error) throw error;
}

export async function getMyPalettes(){
  const { data, error } = await supabase
    .from("palettes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
