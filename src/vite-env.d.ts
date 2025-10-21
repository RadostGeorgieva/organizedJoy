/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // add more if you have them
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
