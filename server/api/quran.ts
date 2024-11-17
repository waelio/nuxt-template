import type { H3Event } from 'h3'
import book from "../data/quran.json";
export default defineEventHandler(async(_event: H3Event) => {
    return {
        data: book
    }
})