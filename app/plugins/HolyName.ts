import { defineNuxtPlugin, useFetch, useNuxtApp, useState } from "nuxt/app";

export default defineNuxtPlugin(async nuxtApp => {

    const { data } = await useFetch('/api/holynames/', {
        headers: {
            Accept: 'application/json'
        },
        getCachedData(key) {
            return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
        }
    })


    if (data && data.value) {
        useState('HolyNames', () => JSON.stringify(data.value.data))
        nuxtApp.provide('HolyNames', data.value.data)
    }

})
