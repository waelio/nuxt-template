import { defineNuxtPlugin } from "nuxt/app";
import { abilitiesPlugin } from '@casl/vue';
// @ts-ignore
import _ from 'lodash'




export default defineNuxtPlugin(nuxtApp => {

  // @ts-ignore
  nuxtApp.vueApp.use(abilitiesPlugin)

  return {
    provide: {
      _: () => _

    }
  }
})