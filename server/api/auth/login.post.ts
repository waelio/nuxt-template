import { defineEventHandler, sendError, H3Event } from "h3"
import { IUSER } from "../../../types"
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt"
// @ts-ignore
import { getUserByUsername } from '@server/db/users'
// @ts-ignore
import { userTransformer } from '@server/transformers/user'
// @ts-ignore
import { createRefreshToken } from '@server/db/refreshTokens'
// @ts-ignore
import bcrypt from "bcrypt"

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  //@ts-ignore
  const { username, password } = body

  if (!username || !password) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Ivalid params'
    }))
  }

  const user = await getUserByUsername(username)
  if (!user) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Username or password is invalid'
    }))
  }
  event.context.nuxtState = { user }
  // const role = user.role as string

  const doesThePasswordMatch = await bcrypt.compare(password, user.password)

  if (!doesThePasswordMatch) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Username or password is invalid'
    }))
  }
  
  const { accessToken, refreshToken } = generateTokens(user as unknown as IUSER)

  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  sendRefreshToken(event, refreshToken)

  return {
    access_token: accessToken,
    user: userTransformer(user as unknown as IUSER),
    auth: event.context.nuxtState
  }

})