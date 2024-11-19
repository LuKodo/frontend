import { defineConfig } from "vite";
import solid from 'vite-plugin-solid'
import { fileURLToPath } from "url";

export default defineConfig({
  base: "/market/",
  plugins: [solid()],
  build: {
    outDir: "C:/laragon/www/market",
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    port: 5174,
  },
});
