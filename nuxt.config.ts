import { defineNuxtConfig } from 'nuxt/config'
import { QuasarOptions } from './qusarOptions'
import { resolve } from 'path'


export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'manifest', content: './manifest.json' }
    ],
  },
  alias: {
    '@server': resolve(__dirname, './server'),
    '@sages': resolve(__dirname, './pages'),
    '@composables': resolve(__dirname, './composables'),
    '~': resolve(__dirname, '.'),
  },
  css: [
    '@quasar/extras/material-icons/material-icons.css',
    'quasar/dist/quasar.prod.css',
    '~/assets/styles/quasar.scss',
  ],
  imports: {
    autoImport: true,
  },
  ssr: false,
  runtimeConfig: {
    // Auth
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    // Cloudinary
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    // EmailJS
    emailPrivateKey: process.env.EMAIL_PRIVATE_KEY,
    public: {
      // EmailJS
      EMAIL_SERVICE: process.env.EMAIL_PUBLIC_KEY,
      EMAIL_TEMPLATE: process.env.EMAIL_TEMPLATE,
      EMAIL_USER: process.env.EMAIL_USER,
      // JSON place Holder
      apiBase: process.env.API_URL,
    }
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  // @ts-ignore
  quasar: QuasarOptions,
  pwa: {
    manifest: {
      "name": "Peace Nuxt3 Template",
      "short_name": "Peace2074",
      "theme_color": "#1976d2",
      "background_color": "#fafafa",
      "display": "standalone",
      "scope": "./",
      "start_url": "./",
      "icons": [
        {
          "src": "icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-48x48.png",
          "sizes": "48x48",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/assets/icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/assets/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/assets/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/assets/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/assets/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/assets/icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/assets/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable any"
        }
      ]
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    }
  },

})