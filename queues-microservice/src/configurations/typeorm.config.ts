import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeORMOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'test',
    synchronize: true,
    autoLoadEntities: true
}