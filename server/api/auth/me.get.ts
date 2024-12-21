import type { H3Event } from 'h3'
export default defineEventHandler((event: H3Event) => {
    const user = event.context.sessions
    return {
        data: { user }
    }
})