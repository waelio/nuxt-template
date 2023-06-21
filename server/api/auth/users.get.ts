import { userTransformer } from "~~/server/transformers/user"

export default defineEventHandler((event) => {

  return {
    users: event.context.auth.users.map(userTransformer)
  }

})