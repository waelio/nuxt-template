import { defineStore } from 'pinia'
import { TUSER, eCaslAction, eCaslSubject } from '../types'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    _user: {} as TUSER,
    _permissions: [
      // Categoty
      { action: eCaslAction.CREATE, subject: eCaslSubject.CATEGORY },
      { action: eCaslAction.READ, subject: eCaslSubject.CATEGORY },
      { action: eCaslAction.UPDATE, subject: eCaslSubject.CATEGORY },
      { action: eCaslAction.DELETE, subject: eCaslSubject.CATEGORY },
      // POST
      { action: eCaslAction.CREATE, subject: eCaslSubject.POST },
      { action: eCaslAction.READ, subject: eCaslSubject.POST },
      { action: eCaslAction.UPDATE, subject: eCaslSubject.POST },
      { action: eCaslAction.DELETE, subject: eCaslSubject.POST },

      // Refresh_Token
      { action: eCaslAction.CREATE, subject: eCaslSubject.REFRESH_TOKEN },
      { action: eCaslAction.READ, subject: eCaslSubject.REFRESH_TOKEN },
      { action: eCaslAction.UPDATE, subject: eCaslSubject.REFRESH_TOKEN },
      { action: eCaslAction.DELETE, subject: eCaslSubject.REFRESH_TOKEN },

      // User Permissions
      { action: eCaslAction.CREATE, subject: eCaslSubject.USER },
      { action: eCaslAction.READ, subject: eCaslSubject.USER },
      { action: eCaslAction.UPDATE, subject: eCaslSubject.USER },
      { action: eCaslAction.DELETE, subject: eCaslSubject.USER },

      // Admin Page
      { action: eCaslAction.MANAGE, subject: eCaslSubject.ADMIN }
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