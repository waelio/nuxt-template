import { defineNuxtPlugin } from "nuxt/app";
// @ts-ignore
import { abilitiesPlugin } from '@casl/vue';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(abilitiesPlugin)
})