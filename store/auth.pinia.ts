import { defineStore } from 'pinia'
import { TUSER,eCaslAction, eCaslSubject } from '../types'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    _user: {} as TUSER,
    _permissions: [
      { action: eCaslAction.READ, subject: eCaslSubject.CATEGORY },
      { action: eCaslAction.UPDATE, subject: eCaslSubject.CATEGORY },
      { action: eCaslAction.CREATE, subject: eCaslSubject.CATEGORY },
      // POST

      { action: eCaslAction.READ, subject: eCaslSubject.POST },
      { action: eCaslAction.UPDATE, subject: eCaslSubject.POST },
      { action: eCaslAction.CREATE, subject: eCaslSubject.POST },

      // User Permissions
      { action: eCaslAction.CREATE, subject: eCaslSubject.USER },
      { action: eCaslAction.UPDATE, subject: eCaslSubject.USER },
      { action: eCaslAction.READ, subject: eCaslSubject.USER },
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