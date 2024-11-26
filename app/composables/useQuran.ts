import { useFetch, useState } from "nuxt/app";

export default function useQuran() { 
    const savedBook = useState('book', () => { })
    useFetch('/api/quran', {
        method: 'get',
        pick:[]
    })
}