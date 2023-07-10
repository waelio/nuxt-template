import { defineStore } from 'pinia'
import { TUSER } from '../types'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    _user: {} as TUSER,
    _permissions: [
      { action: 'read', subject: 'books' },
      { action: 'read', subject: 'book' },
    ]
  }),
  getters: {
    user: state => state._user,
    authenticated: state => Boolean(state._user && Object.keys(state._user).length),
    permissions: state => state._permissions
  },
  actions: {
    async setUserInfo(info: TUSER) {
      this._user = info
    }
  },
})