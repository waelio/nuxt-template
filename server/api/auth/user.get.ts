
import { H3Event } from "h3";
import { useStorage } from '@vueuse/core'
// @ts-ignore
import { userTransformer } from "~/server/transformers/user"
import { defineEventHandler } from '#imports'
import { core } from '~/utils/core'

export default defineEventHandler(async (event: H3Event) => {

    const user = core.getItem('user')

    
    return {
        user: userTransformer(user)
    }        
})
