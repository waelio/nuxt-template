import { useFetch, useLazyFetch } from 'nuxt/app'
import { defineStore } from 'pinia'

type HolyNameI = {
  name: string,
  text: string
}
export const useHN = defineStore('holynames', {
  state: async () => ({
    names: []
  }),
  actions: {
    getNames: async function () {
      const { data } = await useFetch('/api/holynames')
      if (data && data.value) {
        this.setNames(data.value.data)
      }
    },
    setNames: function (payload: { name: string, text: string }) {
      this.names = payload
    }
  },
  getters: {
    gn: (state) => state.names
  }
})
