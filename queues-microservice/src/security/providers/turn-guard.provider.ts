import { Provider } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TurnGuard } from "../guards/turn.guard";


export const TurnGuardProvider: Provider = {
    provide: APP_GUARD,
    useClass: TurnGuard
}; 