import { H3Event , sendError } from "h3"
import { getRefreshTokenByToken } from "~/server/db/refreshTokens"
import { userTransformer } from "~/server/transformers/user"
import { getUserById } from "~/server/db/users"
import { decodeRefreshToken, generateTokens } from "../../utils/jwt"
import type { TToken, IUSER } from "~/types"
import { useStorage } from '@vueuse/core'
import { core } from '~/utils/core'

// @ts-ignore
export default defineEventHandler(async (event: H3Event) => {

    

    const cookies = parseCookies(event)

    const refreshToken = cookies.refresh_token as unknown as string
    // console.assert(cookies.refresh_token, '17:cookies.refresh_token');
    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 200,
            statusMessage: 'No refreshToken!'
        }))
    }
    // @ts-ignore
    const rToken:TToken = await getRefreshTokenByToken(refreshToken)
 
    if (!rToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh rToken is invalid'
        }))
    }
    const token = decodeRefreshToken(rToken) as TToken
     
    if (!token) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    
    const { userId } = token as TToken

    if (!userId) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token lacks userId'
        }))
    }
    const dbUser = await getUserById(userId);

    if (!dbUser || typeof dbUser === null) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'user not found'
        }))
    }    
    const { username } = dbUser as unknown as IUSER;

    if (!username) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'user is malformed!'
        }))
    }
    // @ts-ignore
    const rUser = userTransformer(dbUser)

    core.setItem('user', dbUser )
    


    // @ts-ignore
    event.context.auth = {user: rUser}
    


    const { accessToken } = generateTokens(dbUser as unknown as IUSER);
    
    return {
        user: event.context.auth.user,
        access_token: accessToken
    }
       
});