import { Provider, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

export const ValidationPipeProvider: Provider = {
    provide: APP_PIPE,
    useClass: ValidationPipe
}