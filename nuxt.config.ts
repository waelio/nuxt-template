import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    "@nuxt/fonts",
    "@nuxt/scripts",
    'nuxt-og-image'
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
  routeRules: {
    '/api/quran': {
      cache: {
        maxAge: 31536000000,
        swr: true
      }
    },
    '/api/holynames': {
      cache: {
        maxAge: 31536000000,
        swr: true
      }
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
    imports: {
      autoImport: true,
      dirs: [
        '../shared',
        '../app/constants',
      ]
    }
  },
  imports: {
    autoImport: true,
    dirs: [
      '../app/constants',
      '../app/layouts',
      '../app/store/',
      '../app/composables',
      '../shared/',
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
    sharedPrerenderData: true,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },
  runtimeConfig: {
    "app": {
      // Auth
      authSecret: process.env.AUTH_SECRET,
      authKey: process.env.AUTH_KEY,
      jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
      jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
      // Cloudinary
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
      cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
      // EmailJS
      emailPrivateKey: process.env.EMAIL_PRIVATE_KEY,
      // Root User
      rootEmail: process.env.ROOT_USER,
      // Mongo DB
      mongoose: process.env.MONGODB_URI,
      mongo: process.env.MONGODB_URI,
      //Deno JS
      deno: process.env.DENO_ID,
      denoToken: process.env.DENO_TOKEN,
    },
    "public": {
      // EmailJS
      EMAIL_SERVICE: process.env.EMAIL_PUBLIC_KEY,
      EMAIL_TEMPLATE: process.env.EMAIL_TEMPLATE,
      EMAIL_USER: process.env.EMAIL_USER,
      // JSON place Holder
      apiBase: process.env.API_URL,
    },
  },
  compatibilityDate: '2024-10-03',
})