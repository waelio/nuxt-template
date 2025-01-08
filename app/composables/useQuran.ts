import { useQ2P } from "../store/q2p.pinia";
import { useAsyncData, useFetch, useNuxtApp, useState } from "nuxt/app";

export default async function useQuran() {
  const nuxtApp = useNuxtApp()
  const q2p = useQ2P()

  const { data } = await useFetch('/api/quran/', {
    headers: {
      Accept: 'application/json'
    },
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    }
  })

  q2p.setQuran(await data.value.data)




  if (data && data.value) {
    useState('Quran', () => q2p.GetQ)
  }

  return useState('Quran', () => q2p.GetQ)
}

export { useQuran }