import { abilitiesPlugin } from '@casl/vue';
import { useAuthStore } from '../store/auth.pinia'
import { defineNuxtPlugin, NuxtApp } from "nuxt/app";
import { AbilityTuple, createMongoAbility, MongoAbility, MongoQuery, Subject } from '@casl/ability';

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  let ability: MongoAbility<AbilityTuple, MongoQuery>
  let can: (action: string, subject: Subject, field?: string | undefined) => boolean
  let cannot: (action: string, subject: Subject, field?: string | undefined) => boolean

  nuxtApp.hook('app:mounted', () => {
    if (import.meta.client) {
       ability = createMongoAbility()
      const cb = () => null
      const _auth = useAuthStore()
      _auth.$onAction(cb, true)
      can=ability.can
      cannot = ability.cannot
      _auth.$subscribe((actions: { type: string }, _state: any) => {

        switch (actions.type) {
          case 'resetPermistions':
            ability.update(_auth._permissions);
            break;
        }
      });
    }
    return {
      can,
      cannot
    }
  })
 
  
})
