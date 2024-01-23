import * as redis from 'redis'
import { RedisConfig } from './environment'

const REDIS_URL = `redis://${RedisConfig.REDIS_HOST}:${RedisConfig.REDIS_PORT}`
console.log(RedisConfig.REDIS_HOST)

const redisClient = redis.createClient({
    url: REDIS_URL,
    password: RedisConfig.REDIS_PASS
})

redisClient.connect().catch((error) => {
    console.log(`Error Connecting Redis Server.\n${error?.message}`)
    process.exit(0)
})

redisClient.on('connect', () => {
    console.log(`Application Connected to Redis Server.`)
})

redisClient.on('end', () => {
    console.log(`Application Disconnected from Redis Server.`)
})

process.on('SIGINT', async () => {
    await redisClient.quit().catch((error) => {
        console.log(error.message)
    })
})

export { redisClient }