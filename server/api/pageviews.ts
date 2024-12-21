import { H3Event } from "h3";
import { c } from "~/constants/global";

export default defineEventHandler(async (Event: H3Event) => {
  const LABEL = 'client:user';
  const startAt = Date.now();

  let count = core.getItem(LABEL).then(v => v)
  if (await count) {
    console.log(count)
  }
  core.setItem(LABEL, 1)



  return {
    pageview: count,
  }
})
