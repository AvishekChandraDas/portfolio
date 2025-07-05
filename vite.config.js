import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          framer: ['framer-motion'],
          vendor: ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // SEO and Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for better debugging
    sourcemap: false,
    // Optimize assets
    assetsInlineLimit: 4096,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
  // Server configuration for development
  server: {
    host: true,
    port: 3000,
    open: true,
  },
  // Preview configuration
  preview: {
    port: 3000,
    open: true,
  },
})
