import { Provider } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ApiGuard } from "../guards/api.guard";

export const ApiGuardProvider: Provider = {
    provide: APP_GUARD,
    useClass: ApiGuard
}