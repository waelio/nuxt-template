import { defineStore } from 'pinia'
import { TUSER } from '../types'
export const useAuthStore = defineStore('auth', {
  state: () => ({ _user: {} as TUSER }),
  getters: {
    user: state => state._user,
    authenticated: state => Boolean(state._user && Object.keys(state._user).length),
  },
  actions: {
    async setUserInfo(info: TUSER) {
      this._user = info
      console.assert(info);

    }
  },
})