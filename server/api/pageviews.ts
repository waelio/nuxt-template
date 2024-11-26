import { conf } from "~~/shared/utils/conf";

const LABEL = 'server:pageview'
const startAt = Date.now()
// core.setItem(LABEL, 0)

let count = conf.getItem(LABEL) || 0;
export default defineEventHandler(() => {
  count = conf.getItem(LABEL) || 0
  conf.set(LABEL, count++)
  count = conf.getItem(LABEL)
  console.log('count', count)
  return {
    pageview: count as number,
    startAt,
  }
})
