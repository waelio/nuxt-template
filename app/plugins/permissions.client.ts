import { abilitiesPlugin } from '@casl/vue';
import { AbilityTuple, createMongoAbility, MongoAbility, MongoQuery, Subject } from '@casl/ability';
import type {  NuxtApp } from "nuxt/app";

enum ActionEnum {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  if (!import.meta.client) return; // Ensure this plugin runs only on the client side

  let ability: MongoAbility<AbilityTuple, MongoQuery>;
  let can: (action: string, subject: Subject, field?: string | undefined) => boolean;
  let cannot: (action: string, subject: Subject, field?: string | undefined) => boolean;

  nuxtApp.hook('app:mounted', () => {
    ability = createMongoAbility();
    const cb = () => null;
    const _auth = useAuthStore();
    _auth.$onAction(cb, true);
    can = ability.can;
    cannot = ability.cannot;

    _auth.$subscribe((actions: { type: string }, _state: any) => {
      switch (actions.type) {
        case 'resetPermistions':
          ability.update(_auth._permissions);
          break;
      }
    });
  });

  return {
    can,
    cannot
  };
});
