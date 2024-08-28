import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";
export default defineConfig({
    base: "/",
    plugins: [preact()],
    server: {
        port: 5173,
        host: true,
    },
    resolve: {
        alias: [
            {
                find: "@assets",
                replacement: path.resolve(path.join(__dirname, "/src/assets")),
            },
            {
                find: "@components",
                replacement: path.resolve(path.join(__dirname, "/src/components")),
            },
            {
                find: "@interfaces",
                replacement: path.resolve(path.join(__dirname, "/src/interfaces")),
            },
            {
                find: "@contexts",
                replacement: path.resolve(path.join(__dirname, "/src/contexts")),
            },
            {
                find: "@pages",
                replacement: path.resolve(path.join(__dirname, "/src/pages")),
            },
            {
                find: "@utils",
                replacement: path.resolve(path.join(__dirname, "/src/utils")),
            },
        ],
    },
});
