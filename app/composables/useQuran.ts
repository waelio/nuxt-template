import { useState } from "nuxt/app";
export function useQuran() {
    const savedBook = useState('book', () => { })
    return new Promise(async (resolve, reject) => {

        try {
            const data = await $fetch('/api/quran', {
                method: 'get',
                pick: ['text']
            })

            savedBook.value = data.data
            resolve(data.data)
        } catch (error) {
            reject(error)
        }

    })
}

export default useQuran