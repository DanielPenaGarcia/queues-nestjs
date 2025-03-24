import { ConnectionOptions } from "bullmq";
import { environment } from "./environment.config";

export const ConnectionConfiguration: ConnectionOptions = {
    host: environment.redis.host,
    port: environment.redis.port,
    password: environment.redis.password,
    username: 'default'
}