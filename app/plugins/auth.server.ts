import { defineNuxtPlugin } from "nuxt/app"
import { useAuth } from "../composables/useAuth"

export default defineNuxtPlugin({
  name: 'mongoose-auth-plugin',
  async setup() {
    await useAuth().me()
  },
})
