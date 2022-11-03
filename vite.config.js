import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 12345,
    proxy: {
      "/api": "http://localhost:4000",
    },
    base: "/shopping-cart-siete-oro-frontend/",
  },
});
