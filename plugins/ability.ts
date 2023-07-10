// @ts-ignore
import { Ability } from "@casl/ability";
// @ts-ignore
import { abilitiesPlugin } from '@casl/vue';

import { useAuthStore } from '~/store/auth.pinia'


export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore()
  let ability = new Ability();
  
  ability.update(auth.permissions);
  if (process.client) {
    if (auth.permissions && auth.permissions.length) {
      localStorage.setItem('permissions', JSON.stringify(auth.permissions));
    } else {
      localStorage.removeItem('permissions');
    }
  }
  auth.$subscribe((actions: { type: any; }, _state: any) => {
    switch (actions.type) {
      case 'setUserInfo':
        ability.update(auth.permissions);
        inject('ability', ability);
        break;
    }
  });
  nuxtApp.vueApp.use(abilitiesPlugin, ability)

  
  return {
    provide: {
      ability,
    }
  }


})