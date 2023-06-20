import { defineStore } from 'pinia'

export default defineNuxtPlugin(() => {

  const store = defineStore('waelio_store', {
    state: () => ({
      name: 'Waelio.com'
    }),
    getters: {
      name: (state) => state.name,
    }
  });

  return {
    provide: {
      store
    }
  }

})