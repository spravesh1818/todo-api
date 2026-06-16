import { Redis, RedisOptions } from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST ?? "localhost",
    port: parseInt(process.env.REDIS_PORT ?? "6379"),
} as RedisOptions);

redis.on("error", (err) => {
    console.error("Redis error:", err);
});

redis.on("connect", () => {
    console.log("Redis connected");
});

export default redis;

