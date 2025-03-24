import { JwtModuleOptions } from "@nestjs/jwt";
import { environment } from "./environment.config";

export const JwtConfig: JwtModuleOptions = {
    secret: environment.jwt.secret,
    global: true
}