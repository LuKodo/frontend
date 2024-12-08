import { defineConfig } from "vite";
import solid from 'vite-plugin-solid'

export default defineConfig({
  base: "/",
  plugins: [solid()],
  build: {
    outDir: "C:/laragon/www/market",
  },
  server: {
    port: 5174,
  },
});
