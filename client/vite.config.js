import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      //eslint-disable-next-line no-under
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
