import { useHN } from '../store/holynames.pinia';
import { h, reactive, ref } from "vue";

export function useNames() {
    const holynames = useHN()
    return new Promise(async (resolve, reject) => {
        try {
            const { data }: Promise<{ name: string, text: string }> = await $fetch('/api/holynames')
            holynames.setNames(data)
            resolve(holynames.gn)
        } catch (error) {
            reject(error)
        } 0

    })
}

export default useNames