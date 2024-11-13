import type { H3Event } from 'h3'
export default defineEventHandler((event: H3Event) => {
    const  mongo  = useRuntimeConfig().auth?.mongo
    const { url } = event.node.req
   if(mongo) mongo?.exclude.forEach((item: any) => {
        if (`/api/auth/${item}` === url) {
            throw createError({
                statusCode: 404,
                statusMessage: `Page not found: ${url}`
            })
        }
    })

})

