import { createStorage } from "unstorage";
import mongodbDriver from "unstorage/drivers/mongodb";
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(async()=> {
    const storage = createStorage({
        driver: mongodbDriver({
            connectionString: process.env.NUXT_MONGODB_URI as string,
            databaseName: "apiDatabase",
            collectionName: "local",
        }),
    });
    
    return {
        provide: {
            storage: await storage
        }
    }
  
})