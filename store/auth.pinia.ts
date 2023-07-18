import { defineStore } from 'pinia'
import { UserT, CaslActionE, CaslSubjectE } from '../types'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    _user: {} as UserT,
    _permissions: [
      // Categoty
      { action: CaslActionE.CREATE, subject: CaslSubjectE.CATEGORY },
      { action: CaslActionE.READ, subject: CaslSubjectE.CATEGORY },
      { action: CaslActionE.UPDATE, subject: CaslSubjectE.CATEGORY },
      { action: CaslActionE.DELETE, subject: CaslSubjectE.CATEGORY },
      // POST
      { action: CaslActionE.CREATE, subject: CaslSubjectE.POST },
      { action: CaslActionE.READ, subject: CaslSubjectE.POST },
      { action: CaslActionE.UPDATE, subject: CaslSubjectE.POST },
      { action: CaslActionE.DELETE, subject: CaslSubjectE.POST },

      // Refresh_Token
      { action: CaslActionE.CREATE, subject: CaslSubjectE.REFRESH_TOKEN },
      { action: CaslActionE.READ, subject: CaslSubjectE.REFRESH_TOKEN },
      { action: CaslActionE.UPDATE, subject: CaslSubjectE.REFRESH_TOKEN },
      { action: CaslActionE.DELETE, subject: CaslSubjectE.REFRESH_TOKEN },

      // User Permissions
      { action: CaslActionE.CREATE, subject: CaslSubjectE.USER },
      { action: CaslActionE.READ, subject: CaslSubjectE.USER },
      { action: CaslActionE.UPDATE, subject: CaslSubjectE.USER },
      { action: CaslActionE.DELETE, subject: CaslSubjectE.USER },

      // Admin Page
      { action: CaslActionE.MANAGE, subject: CaslSubjectE.ADMIN }
    ]
  }),
  getters: {
    user: state => state._user,
    authenticated: state => Boolean(state._user && Object.keys(state._user).length),
    permissions: state => state._permissions
  },
  actions: {
    async setUserInfo(info: UserT) {
      this._user = info
    }
  },
})