import { useFetch } from "nuxt/app";

export async function getHolyNames() {
    const { data, error, clear } = useFetch('/api/holynames')
    if (error) {
        console.log(error)
        clear()
    }
    return data
}

export async function getHolyBook() {
    const { data, error, clear } = useFetch('/api/quran')
    if (error) {
        console.log(error)
        clear()
    }
    return data
}
