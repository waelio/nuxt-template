import type { H3Event } from 'h3'
import hnames from "../data/gnames.json";

export default defineEventHandler(async(_event: H3Event) => {
    return {
        names: hnames
    }
})