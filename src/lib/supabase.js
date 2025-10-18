import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY

);

console.log("✅ Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("✅ Supabase Key (short):", import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 8) + "...");
