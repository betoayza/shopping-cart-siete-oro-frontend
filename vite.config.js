import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: {
      type: string | boolean,
      default: '127.0.0.1'
    },
    port: {
      type: number,
      default: 12345
    }
  }
})
