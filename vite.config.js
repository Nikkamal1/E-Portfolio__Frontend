import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    hmr: true,
    historyApiFallback: true, // ✅ ใช้ให้รองรับการเรียก URL ด้วย HTML5 History API
  },
  build: {
    outDir: "dist",
  },
  preview: {
    strictPort: true,
    historyApiFallback: true, // ✅ เพิ่ม fallback ในการ preview เช่นกัน
  },
});
