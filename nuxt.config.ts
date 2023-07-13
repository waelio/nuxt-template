import { defineNuxtConfig } from 'nuxt/config'
import { QuasarOptions } from './qusarOptions'
import { resolve } from 'path'


export default defineNuxtConfig({
  devtools: { enabled: true },
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
    base: '/',
    mode: 'production',
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
    includeManifestIcons: true,

    manifest: {
      name: 'Nuxt Template',
      lang: 'en',
      display: "standalone",
      scope: "./",
      start_url: "./",
      icons: [
        {
          src: "assets/quasar-logo.png",
          sizes: "48x48",
          type: "image/png",
          purpose: "maskable any"
        }
      ]
    },
  },
  workbox: {
    navigateFallback: '/',
    globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  },
  client: {
    installPrompt: true,
    periodicSyncForUpdates: 3600,
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