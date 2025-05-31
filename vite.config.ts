/// <reference types="node" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pkg from './package.json'

// Determine whether we’re in production (i.e. `npm run build`) or dev:
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProduction ? `/${pkg.name}/` : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
})
