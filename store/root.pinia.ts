import { defineStore } from 'pinia'
import { projects as importedProjects } from '../statics'
import { IUSER } from '../types'

export const userStore = defineStore({
  id: 'root',
  state: () => ({
    id: 'com.waelio.app',
    projects: importedProjects,
    userInfo: {},
    currencies: {}
  }),
  actions: {
    setUserInfo(info: IUSER & { currency: string, ip: string }) {
      this.userInfo = info
    },
    setUserCurrencies(currencies: string[]) {
      this.currencies = currencies
    }
  },
  getters: {
    Projects: state => state.projects,
    user: state => state.userInfo,
    // @ts-ignore
    iP: state => state.userInfo ? state.userInfo['ip'] : '0.0.0.0',
    fiat: state => state.currencies,
    // @ts-ignore
    localCurrency: state => state.userInfo ? state.userInfo['currency'] : {},
  }
})