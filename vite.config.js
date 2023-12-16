// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Minha Aplicação PWA',
        short_name: 'MeuApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        "display": "standalone",
        icons: [
          {
            src: '/images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        "screenshots": [
          {
            "src": "/images/screenshot1.png",
            "type": "image/png",
            "sizes": "540x720",
            "form_factor": "narrow"
          },
          {
            "src": "/images/screenshot2.jpg",
            "type": "image/jpg",
            "sizes": "720x540",
            "form_factor": "wide"
          }
        ]
      }
    }),
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
