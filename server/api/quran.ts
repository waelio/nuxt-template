import type { H3Event } from 'h3'
import hbook from "../data/quran.json"
import details from "../data/chapters/en.json"
// @ts-ignore
import _ from "lodash"
import { c } from '~/constants/global'
// import { SuraI } from '~~/shared/types'
type FIL = {
    chapter: number
    verse: number
    text: string[]
}


export default defineEventHandler(async (_event: H3Event) => {
    const book = Object.values(hbook) as unknown as FIL[]

    const info = Object.values(details)

    const ready = info.map(detail => {
        const prep: FIL = book[detail.id - 1]
        const V = _.flattenDeep(prep).map((v: FIL) => v.text)
        return {
            Index: detail.id as number,
            Name: detail.name as string,
            Location: detail.type as string,
            TotalVerses: detail.total_verses as number,
            Verses: V
        }
    })


    return {
        data: ready[0]
    }

})