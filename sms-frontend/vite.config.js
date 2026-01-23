import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // use IPv4 to avoid ::1 permission errors
    port: 3000,         // same as package.json
    open: true          
  }
});
