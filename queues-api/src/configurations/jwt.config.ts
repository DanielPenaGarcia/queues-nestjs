import { JwtModuleOptions } from "@nestjs/jwt";
import { environment } from "./environment";

export const JwtConfiguration: JwtModuleOptions = {
    global: true,
    secret: environment.jwt.secret,
    signOptions: {
        expiresIn: environment.jwt.expiresIn
    }
}