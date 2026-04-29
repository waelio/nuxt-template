import { createStorage } from "unstorage";
import mongodbDriver from "unstorage/drivers/mongodb";

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()

    const storage = createStorage({
        driver: mongodbDriver({
            connectionString: config.NUXT_MONGODB_URI as string,
            databaseName: "apiDatabase",
            collectionName: "local",
        }),
    });

    return {
        provide: {
            pstore: storage
        }
    }

})