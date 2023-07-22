import { Ability } from "@casl/ability";
import { abilitiesPlugin } from '@casl/vue';
import { useAuthStore } from '~/store/auth.pinia'


export default defineNuxtPlugin((nuxtApp) => {
  const ability = new Ability();
  const { can, cannot } = ability

  const _auth = useAuthStore()
  ability.update(_auth._permissions);

  _auth.$subscribe((actions: { type: any; }, _state: any) => {
    switch (actions.type) {
      case 'resetPermistions':
        ability.update(_auth._permissions);
        inject('ability', ability);
        break;
    }
  });
  nuxtApp.vueApp.use(abilitiesPlugin, ability, {
    useGlobalProperties: true

  })


  return {
    provide: {
      ability,
      can,
      cannot
    }
  }


})