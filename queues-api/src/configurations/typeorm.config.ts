import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { environment } from "./environment";

export const TypeOrmConfig: TypeOrmModuleOptions = {
   type: 'mysql',
   host: environment.db.host,
   port: environment.db.port,
   password: environment.db.password,
   username: environment.db.username,
   database: environment.db.database,
   autoLoadEntities: true,
   synchronize: true
}