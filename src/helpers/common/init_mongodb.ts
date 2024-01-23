import { connect, connection } from "mongoose"
import { MongoDBConfig } from "./environment"


connect(`mongodb://${MongoDBConfig.MONGODB_HOST}:${MongoDBConfig.MONGODB_PORT}`, {
    dbName: MongoDBConfig.MONGODB_DB_NAME,
    user: MongoDBConfig.MONGODB_USER,
    pass: MongoDBConfig.MONGODB_PASS,
}).catch(() => {
    process.exit(0)
})

const mongoConnection = connection

mongoConnection.on('connected', () => {
    console.log('Application Connected to MongoDB Server.')
})

mongoConnection.on('disconnected', () => {
    console.log('Application Disconnected from MongoDB Server.')
})

// Disconnect MongoDB Server before quitting Application
process.on('SIGINT', async () => {
    await mongoConnection.close().catch(error => {
        console.log(error.message)
    })
})

export { mongoConnection }