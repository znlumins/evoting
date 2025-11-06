import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Pastikan path './server' ini benar menunjuk ke file server express Anda
import { createServer } from "./server"; 

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', 
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist", 
  },
  plugins: [react(), expressPlugin()],
  
  resolve: {
    alias: {
      // Alias ini berarti '@/' akan menunjuk ke folder 'client/'
      '@': path.resolve(__dirname, './client'), 
    },
  },
}));

/**
 * Plugin kustom untuk menjalankan server Express di dalam server Vite
 * Ini adalah alasan mengapa Anda tidak memerlukan 'proxy'
 */
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Hanya berlaku saat 'npm run dev' (serve)
    configureServer(server) {
      // Membuat server Express Anda
      const app = createServer(); 
      // Menggunakannya sebagai middleware di dalam Vite
      server.middlewares.use(app);
    },
  };
}