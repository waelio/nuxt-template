import { getUserByUsername } from "~~/server/db/users"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt"
import { userTransformer } from "~~/server/transformers/user"
import { createRefreshToken } from "~~/server/db/refreshTokens"
import { sendError } from "h3"
import { IUSER } from "~~/types"
import { getRoleByName } from "../../db/roles"

export default defineEventHandler(async (event) => {
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
    


    
    const role = user.role as string
    console.log(role);
        
    getRoleByName(role)


        


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




// import {
    //     defineAbilitiesFor,
    // } from './services/authmanagement/authentication.abilities'
