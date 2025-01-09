import { defineNuxtPlugin, useFetch, useNuxtApp, useState } from "nuxt/app";

export default defineNuxtPlugin(async _nuxtApp => {

  const { data } = await useFetch('/api/quran/', {
    headers: {
      Accept: 'application/json'
    },
    getCachedData(key) {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
    }
  })


  if (data && data.value) {
    useState('Quran', () => JSON.stringify(data.value.data))
  }

})
