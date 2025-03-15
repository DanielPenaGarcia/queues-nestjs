import { RedisOptions } from "bullmq/dist/esm";
import { environment } from "./environment";

export const RedisConfig: RedisOptions = {
    host: environment.redis.host,
    port: environment.redis.port
}