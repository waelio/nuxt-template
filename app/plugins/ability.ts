import { abilitiesPlugin } from '@casl/vue';
import { createMongoAbility } from '@casl/ability';
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin(nuxtApp => {

  var ability = createMongoAbility()
  nuxtApp.vueApp.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
  })

})
