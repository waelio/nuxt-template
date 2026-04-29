import { getUserByUsername } from "../../db/users"
// @ts-ignore
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt"
import { userTransformer } from "../../transformers/user"
import { createRefreshToken } from "../../db/refreshTokens"
import { sendError } from "h3"
import type { UserI } from "../../..shared/types"
import { getPermissionsByRoleByName } from "../../db/roles"
import { _to } from 'waelio-utils'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    let myPermissions = {}


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
    event.context = { user }

    const role = user.role as string

    const getDbRole = async (role: string) =>
        new Promise(async (resolve, reject) => {
            try {
                const dbr = await getPermissionsByRoleByName(role)
                const { data } = dbr
                Object.assign(myPermissions, data)
                resolve(data)

            } catch (error) {
                reject(error)
            }
        })

    getDbRole(role)

    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    const { accessToken, refreshToken } = generateTokens(user as unknown as UserI)

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)

    return {
        access_token: accessToken,
        user: userTransformer(user as unknown as UserI),
        permissions: myPermissions
    }

})
