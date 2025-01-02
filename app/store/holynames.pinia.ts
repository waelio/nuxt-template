import { defineStore } from 'pinia'
import { getHolyNames } from './services'

export const useHN = defineStore('holynames', {
    state: async () => ({
        names: []
    }),
    actions: {
        getNames() {
            this.names = getHolyNames()
        },
        setNames(payload: { name: string, text: string }) {
            this.names = payload
        }
    },
    getters: {
        gn: (state) => state.names
    }
})
useHN().getNames()