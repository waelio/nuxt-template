import { defineNuxtPlugin } from "nuxt/app";
import { abilitiesPlugin } from '@casl/vue';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(abilitiesPlugin)
})