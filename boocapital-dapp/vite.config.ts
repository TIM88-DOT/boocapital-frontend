import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from "rollup-plugin-polyfill-node";

const production = process.env.NODE_ENV === "production";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    !production &&
    nodePolyfills({
      include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
    })],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        }),
        
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        // ↓ Needed for build
        nodePolyfills()
      ]
    },
    // ↓ Needed for build if using WalletConnect and other providers
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})


