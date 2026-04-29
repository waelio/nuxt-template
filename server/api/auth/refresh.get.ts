import { H3Event, sendError } from "h3"
import { getRefreshTokenByToken } from "../../db/refreshTokens";
import { getUserById } from "../../db/users";
import { decodeRefreshToken, generateTokens } from "../../utils/jwt";
import { userTransformer } from "../../transformers/user";
import type { TokenT, UserI } from "../../shared/types";


export default defineEventHandler(async (event: H3Event) => {
    const cookies = parseCookies(event)
    const refreshToken = cookies.refresh_token as unknown as string
    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 200,
            statusMessage: 'No refreshToken!'
        }))
    }
    // @ts-ignore
    const rToken: TokenT = await getRefreshTokenByToken(refreshToken)

    if (!rToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh rToken is invalid'
        }))
    }
    const token = decodeRefreshToken(rToken) as TokenT

    if (!token) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }


    const { userId } = token as TokenT

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
    const { username } = dbUser as unknown as UserI;

    if (!username) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'user is malformed!'
        }))
    }
    // @ts-ignore
    const rUser = userTransformer(dbUser)




    // @ts-ignore
    event.context.auth = { user: rUser }


    const { accessToken } = generateTokens(dbUser as unknown as UserI);

    const getAllTokens = () => { }


    return {
        user: event.context.auth.user,
        access_token: accessToken
    }

});