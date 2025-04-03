import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/register": "http://localhost:3000",
      "/login": "http://localhost:3000",
    },
    historyApiFallback: true, // Ajoutez cette ligne pour gérer les routes côté client
  },
});
