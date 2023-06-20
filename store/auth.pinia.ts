import { defineStore } from 'pinia'
import { IUSER } from '../types'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null
  }),
  actions: {
    setUserInfo(info: IUSER) {
      this.user = info
    }
  },
  getters: {
    user: state => state.user,
  }
})