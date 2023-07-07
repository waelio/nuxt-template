
import { H3Event, defineEventHandler } from 'h3'
import { userTransformer } from "~/server/transformers/user"
import { core } from '~/utils/core'

export default defineEventHandler(async (_event: H3Event) => {

    const user = core.getItem('user')
    
    return {
        user: userTransformer(user)
    }        
})
