import type { H3Event } from 'h3'
interface hnames {
    name: string
    text: string
}
import hnames from "../data/gnames.json" assert {type: 'json'}

export default defineEventHandler(async (_event: H3Event) => {
    return {
        data: hnames
    }
})