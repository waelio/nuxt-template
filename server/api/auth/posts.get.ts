import { RequestPostI, PostI } from "~/types";

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  
  const POST: Promise<RequestPostI | PostI> = await fetch(`${apiBase}/1`)
    .then((response) => response.json())

  return {
    data: POST
  }
})