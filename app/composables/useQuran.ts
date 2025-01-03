import { useQ2P } from "../store/q2p.pinia";
export function useQuran() {
    const q2p = useQ2P()
    return new Promise(async (resolve, reject) => {

        try {
            const { data} = await $fetch('/api/quran')

            q2p.setQuran(await data)
            resolve(await data)
        } catch (error) {
            reject(error)
        }

    })
}

export default useQuran