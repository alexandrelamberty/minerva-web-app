/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ["default", "html"],
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./tests/setup.ts"],
    // testMatch: ["./tests/**/*.test.tsx"],
  },
});
