import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // --- TAMBAHKAN BARIS INI ---
  base: '/', 
  // -------------------------

  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    // Pastikan ini disetel ke 'dist', bukan 'dist/spa'
    outDir: "dist", 
  },
  plugins: [react(), expressPlugin()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
    },
  },
}));

// ... sisa fungsi expressPlugin Anda
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", 
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}