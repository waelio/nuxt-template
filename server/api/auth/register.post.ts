import { sendError } from "h3"
import { createUser } from "../../db/users.js"
import { userTransformer } from "~~/server/transformers/user.js"
import { IUSER } from "~~/types"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, user_email, password, repeatPassword, first_name, last_name } = body
    const role = "user"

    if (!username || !user_email || !password || !repeatPassword || !first_name || !last_name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }    
    const userData = {
        username,
        email: user_email,
        password,
        first_name,
        last_name,
        role,
        profileImage: 'https://picsum.photos/200/200',
        authId: undefined
    }

    try {

        // @ts-ignore
        const user: IUSER = await createUser(userData)

        return {
            body: user && userTransformer(user)
        }
    } catch (error) {
        return {
            body: "Please validate username & user_email are not registered already!"
        }
    }

})