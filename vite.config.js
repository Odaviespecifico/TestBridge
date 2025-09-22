import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on current mode (development, test, production)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: 'jsdom', // or 'jsdom' if you need DOM APIs
    },
    define: {
      'import.meta.env': process.env,
    },
  }
})