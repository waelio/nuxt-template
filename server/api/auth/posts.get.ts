import { RequestIPOST, IPOST } from "~/types";

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  
  const POST: Promise<RequestIPOST | IPOST> = await fetch(`${apiBase}/1`)
    .then((response) => response.json())

  return {
    data: POST
  }
})