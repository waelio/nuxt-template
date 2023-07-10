import { getUserByUsername } from "~~/server/db/users"
// @ts-ignore
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt"
import { userTransformer } from "~~/server/transformers/user"
import { createRefreshToken } from "~~/server/db/refreshTokens"
import { sendError } from "h3"
import { IUSER } from "~~/types"
import { getPermissionsByRoleByName } from "../../db/roles"
import { _to } from 'waelio-utils'
import { defineAbility } from '@casl/ability';

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


    const getDbRole = async (role: string) =>
        new Promise((resolve, reject) => {

            const dbr = getPermissionsByRoleByName(role)
            try {
                resolve(dbr)

            } catch (error) {
                reject(error)
            }
        })

    const permissions = getDbRole(role)
    console.log(permissions);





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




