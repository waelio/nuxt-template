import { defineEventHandler, EventHandler } from 'h3'
// @ts-ignore
import { getUserByUsername } from "../../db/users"



export default defineEventHandler(async (_event: EventHandler) => {
  const username = 'waelio'
  const dbUser = await getUserByUsername(username)
  return {
    data: dbUser
  }
})