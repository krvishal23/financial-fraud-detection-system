import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.GITHUB_ACTIONS ? '/fraudshield/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: { outDir: 'dist', sourcemap: true },
  server: { port: 3000, host: true }
})
