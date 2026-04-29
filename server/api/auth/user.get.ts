import { getAll } from './../../db/tokens';
import { H3Event, defineEventHandler } from 'h3'
// import { userTransformer } from "../../transformers/user";

export default defineEventHandler(async (_event: H3Event) => {

    // const user = core.getItem('user')
    // pstore.getAll()

    return {
        // user: userTransformer(user)
    }
})
