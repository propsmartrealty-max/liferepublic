import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Sovereign Performance Synthesis v6.0
 * Optimized for <1.5s Load Time & 60fps Velocity
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
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-framer';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor';
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
    }
  };
})
