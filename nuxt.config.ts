import { defineNuxtConfig } from "nuxt/config";
import { pwa } from './app/config/pwa'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt', // required
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    "@nuxt/fonts",
    "@nuxt/scripts",
    'nuxt-og-image',
    '@vite-pwa/nuxt',
  ],
  // @ts-ignore
  tailwindcss: {
    cssPath: '~/assets/globals.css'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        style: ''
      },
      meta: [
        { name: "description", content: "nuxt4 typescript quasar" },
        { name: 'keywords', content: "nuxt4,tempate,typescript,peace2074,waelio" }
      ]
    }
  },
  plugins: [
    '~/plugins/storage.server.ts'
  ],
  vite: {

    build: {
      minify: false
    }
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  nitro: {
    minify: false,
    rollupConfig: {
      external: ['bcrypt', 'waelio-utils', 'jsonwebtoken'],
    },
    experimental: {
      websocket: true
    },
    imports: {
      autoImport: true,
      dirs: [
        '~~/shared',
        '~/constants',      ]
    },
  },
  imports: {
    autoImport: true,
    dirs: [
      '../app/constants',
      '../app/layouts',
      '../app/store',
      '../app/composables',
      '../shared',
      '../server/uils'
    ]
  },
  css: [
    '@quasar/extras/material-icons/material-icons.css',
    "~/assets/styles/quasar.css"
  ],
  // @ts-ignore
  quasar: {
    // Configurable Component Defaults
    components: {
      defaults: {
        QBtn: {
          dense: true,
          flat: true,
        },
      }
    }
  },
  experimental: {
    componentIslands: true,
    sharedPrerenderData: true,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    buildCache: true,
    relativeWatchPaths: true,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },
  pwa,
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },
  runtimeConfig: {
    "app": {
      // Auth
      authSecret: process.env.NUXT_AUTH_SECRET,
      authKey: process.env.NUXT_AUTH_KEY,
      jwtAccessSecret: process.env.NUXT_JWT_ACCESS_TOKEN_SECRET,
      jwtRefreshSecret: process.env.NUXT_JWT_REFRESH_TOKEN_SECRET,
      // Cloudinary
      cloudinaryCloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME,
      cloudinaryApiKey: process.env.NUXT_CLOUDINARY_API_KEY,
      cloudinaryApiSecret: process.env.NUXT_CLOUDINARY_API_SECRET,
      // EmailJS
      emailPrivateKey: process.env.NUXT_EMAIL_PRIVATE_KEY,
      // Root User
      rootEmail: process.env.NUXT_ROOT_USER,
      // Mongo DB
      mongoose: process.env.NUXT_MONGODB_URI,
      mongo: process.env.NUXT_MONGODB_URI,
      //Deno JS
      deno: process.env.NUXT_DENO_ID,
      denoToken: process.env.NUXT_DENO_TOKEN,
    },
    "public": {
      // EmailJS
      EMAIL_SERVICE: process.env.NUXT_PUBLIC_EMAIL_PUBLIC_KEY,
      EMAIL_TEMPLATE: process.env.NUXT_PUBLIC_EMAIL_TEMPLATE,
      EMAIL_USER: process.env.NUXT_PUBLIC_EMAIL_USER,
      // JSON place Holder
      apiBase: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  compatibilityDate: '2024-10-03',
})