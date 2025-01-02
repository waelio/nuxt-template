import { useFetch } from "nuxt/app";

export async function getHolyNames() {
    const { data, error, clear } = useFetch('/api/holynames')
    if (error) {
        console.log(error)
        clear()
    }
    return data
}