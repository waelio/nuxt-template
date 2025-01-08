import { useLazyFetch } from 'nuxt/app';
import { useHN } from '../store/holynames.pinia';
export function useNames() {
    const holynames = useHN()
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await useLazyFetch('/api/holynames')
            holynames.setNames(JSON.stringify(data.value?.data))
            resolve(holynames.gn)
        } catch (error) {
            reject(error)
        }

    })
}

export default useNames