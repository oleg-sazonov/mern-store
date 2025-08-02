import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    base: "/",
    server: {
        // proxy: {
        //     // Only proxy existing API routes, not all /api/*
        //     "/api/products": {
        //         target: "http://localhost:5000",
        //         changeOrigin: true,
        //         secure: false,
        //     },
        //     "/health": {
        //         target: "http://localhost:5000",
        //         changeOrigin: true,
        //         secure: false,
        //     },
        // },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
