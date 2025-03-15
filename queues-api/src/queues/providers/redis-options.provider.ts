import { RedisConfig } from "@configurations/redis.config";
import { Provider } from "@nestjs/common";

export const REDIS_OPTIONS = 'REDIS_OPTIONS';

export const RedisProvider: Provider = {
    provide: REDIS_OPTIONS,
    useValue: RedisConfig
}