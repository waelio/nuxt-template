import { useAuth } from "../composables/useAuth"

export default defineNuxtPlugin({
  name: 'mongoose-auth-plugin',
  async setup() {
    return await useAuth().me()
  },
})
