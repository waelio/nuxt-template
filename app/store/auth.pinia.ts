import { defineStore } from 'pinia'
import type { UserT, } from '../../shared/types'
import  { CaslActionE, CaslSubjectE } from '../../shared/types'
import { createMongoAbility } from '@casl/ability';


const ability = createMongoAbility()
export const useAuthStore = defineStore('auth', {
  state: () => ({
    _user: {} as UserT,
    _permissions: [
      { action: CaslActionE.READ, subject: CaslSubjectE.CATEGORY },
      { action: CaslActionE.READ, subject: CaslSubjectE.POST },
      { action: CaslActionE.CREATE, subject: CaslSubjectE.USER },
      { action: CaslActionE.READ, subject: CaslSubjectE.USER },
      { action: CaslActionE.UPDATE, subject: CaslSubjectE.USER },
      { action: CaslActionE.MANAGE, subject: CaslSubjectE.ADMIN },
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
    },
    setPermission(s: Record<CaslSubjectE,string>, a: CaslActionE) {
      this._permissions.push({
        subject: s, action: a
      })
      this.SetAbilities()
    },
    resetPermistions(d: object) { 
      // @ts-ignore
      this._permissions = [d]
      this.SetAbilities()
    },
    SetAbilities() {
      ability.update(this._permissions);
      return this._permissions
    }
  },

})