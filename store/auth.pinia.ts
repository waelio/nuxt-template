import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {

  state:() =>{
      user: null
  },
})