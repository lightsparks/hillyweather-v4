/// <reference types="vite/client" />

// Expose __APP_VERSION__ (already there)
declare const __APP_VERSION__: string

// Add your own VITE_… env vars so TS knows they exist
interface ImportMetaEnv {
  readonly VITE_FALLBACK_LAT: string
  readonly VITE_FALLBACK_LON: string
  readonly VITE_FALLBACK_CITY: string
  readonly VITE_FALLBACK_COUNTRY: string

  readonly VITE_OPENWEATHER_BASE: string
  readonly VITE_OPENWEATHER_EXCLUDE: string
  readonly VITE_OPENWEATHER_API_KEY: string

  // If you add more VITE_… keys, add them here!
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
