import type { H3Event } from "h3";


export default defineEventHandler((event: H3Event) => {
    let { message } = readBody(event);
    message = "NUXTTT";

    return {
        body: message
    }

})  