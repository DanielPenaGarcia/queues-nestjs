import { Provider } from "@nestjs/common";
import { ConnectionConfiguration } from "src/configurations/redis.config";

export const REDIS_OPTIONS = 'REDIS_OPTIONS';

export const BullConnectionProvider: Provider = {
    provide: REDIS_OPTIONS,
    useValue: ConnectionConfiguration
}