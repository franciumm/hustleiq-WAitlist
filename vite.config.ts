import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 70 },
      jpeg: { quality: 70 },
      webp: { quality: 70 },
      svg: { multipass: true },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});