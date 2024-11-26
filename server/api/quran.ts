import type { H3Event } from 'h3'
import hbook from "../data/quran.json"
import details from "../data/chapters/en.json"
import { _sniffId, _resetString } from "waelio-utils"
// @ts-ignore
import _ from "lodash"
import { SuraI } from '~~/shared/types'
type FIL = {
    chapter: number
    verse: number
    text: string[]
}


export default defineEventHandler(async (event: H3Event) => {
    const params = getRouterParams(event);
    const book = Object.values(hbook) as unknown as FIL[]
    const I = _sniffId(params) as number | false
    const info = Object.values(details)

    const ready = info.map(detail => {
        const prep: FIL = book[detail.id - 1]
        let V = _.flattenDeep(prep).map((v: FIL) => v.text)
        V = decodeURI(V)
        return !!I ? {
            params: I,
            Index: detail.id as number,
            Name: detail.name as string,
            Location: detail.type as string,
            TotalVerses: detail.total_verses as number,
            Verses: V
        } : {
            Index: detail.id as number,
            Name: detail.name as string,
            Location: detail.type as string,
            TotalVerses: detail.total_verses as number,
            Verses: V
        }
    })


    return {
        data: I ? ready[I] : ready
    }

})