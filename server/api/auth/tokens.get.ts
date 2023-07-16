import { H3Event } from "h3";
import { getAll } from "../../db/tokens";

export default defineEventHandler(async (_event: H3Event) => {
  const getAllTokens = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getAll()
        resolve(await data)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    tokens: await getAllTokens()
  }
})