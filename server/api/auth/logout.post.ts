import { removeRefreshToken } from "~~/server/db/refreshTokens"
import { sendRefreshToken } from "~~/server/utils/jwt"

export default defineEventHandler(async (event) => {
    try {
        
        const cookies = useCookie('refresh_token')
        const refreshToken = cookies.value
        // @ts-ignore
        if (refreshToken) await removeRefreshToken(refreshToken)
    } catch (error) { }

    sendRefreshToken(event, 'refresh_token')

    return { message: 'Done' }
})