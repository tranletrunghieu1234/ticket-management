// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'      // ← here!
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') }
    ],
  },
  test: {
    environment: "jsdom",
  }

})