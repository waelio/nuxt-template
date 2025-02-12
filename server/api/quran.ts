import type { H3Event } from 'h3'
import { defineEventHandler, getRouterParams } from 'h3'
import hdetails from "../data/chapters/en.json" assert {type: 'json'}
import hbook from '../data/quran.json' assert { type: 'json' }
import type { QDBI } from "../../shared/types";
import { _sniffId, _resetString } from "waelio-utils"
import _ from "lodash"
import { log } from 'node:console'
type QSDT = {
    chapter: number
    verse: number
    text: string[]
}
type IDT = {
    id: number
    name: string
    transliteration: string,
    translation: string,
    type: string
    total_verses: number
}
export default defineEventHandler((event: H3Event) => {
    const params = getQuery(event);
    const { s } = params;
    let ready = [];
    hdetails.forEach((item: IDT) => {
        const qr: QSDT = hbook[item.id];
        qr.find((v, index) => v[index] === item.id);
        ready.push({
            id: item.id,
            name: item.name,
            e_name: item.translation,
            type: item.type,
            total_verses: item.total_verses,
            ayat: qr,
        })
    })
    return s ? ready[s] : ready as QDBI
})