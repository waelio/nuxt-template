import { abilitiesPlugin } from '@casl/vue';
import { createMongoAbility } from '@casl/ability';

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {

  var ability = createMongoAbility()
  nuxtApp.vueApp.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
  })

  return {
    ability
  }
})
