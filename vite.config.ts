import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Sovereign Performance Synthesis v7.0
 * Optimized for <1.5s Load Time, Zero Circular Chunks & 60fps Velocity
 */

export default defineConfig(({ command, ssrBuild }: any) => {
  const isSsr = ssrBuild || (command === 'build' && process.argv.includes('--ssr'));
  
  return {
    plugins: [
      react()
    ],
    ssr: {
      noExternal: ['react-helmet-async', 'react-router-dom', 'react-router', 'lucide-react', 'framer-motion'],
    },
    build: {
      target: 'esnext',
      minify: 'terser' as const,
      cssCodeSplit: true,
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug']
        },
      },
      rollupOptions: {
        output: isSsr ? {} : {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('/react/') || 
                id.includes('/react-dom/') || 
                id.includes('/react-router/') || 
                id.includes('/react-router-dom/') ||
                id.includes('/scheduler/')
              ) {
                return 'vendor-react';
              }
              if (id.includes('/framer-motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) {
                return 'vendor-framer';
              }
              if (id.includes('/lucide-react/')) {
                return 'vendor-icons';
              }
              if (id.includes('/leaflet/') || id.includes('/react-leaflet/')) {
                return 'vendor-maps';
              }
              if (id.includes('/canvas-confetti/')) {
                return 'vendor-effects';
              }
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1200,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
    }
  };
})
