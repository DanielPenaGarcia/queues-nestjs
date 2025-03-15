import { BullRootModuleOptions } from "@nestjs/bullmq/dist";
import { environment } from "./environment";
import { RedisConfig } from "./redis.config";

export const BullMQConfig: BullRootModuleOptions = {
    connection: RedisConfig
}