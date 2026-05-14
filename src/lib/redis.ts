import Redis from "ioredis"

const redisUrl = process.env.REDIS_URL as string
const redis = new Redis(redisUrl)

export default redis
