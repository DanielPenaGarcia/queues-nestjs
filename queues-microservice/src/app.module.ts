import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineGateway } from './line/line.gateway';
import { FestivalsModule } from './festivals/festivals.module';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMOptions } from './configurations/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './configurations/jwt.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TurnsModule } from './turns/turns.module';
import { QueuesModule } from './queues/queues.module';
import { ValidationPipeProvider } from './utils/providers/validation-pipe.provider';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMOptions), JwtModule.register(JwtConfig), FestivalsModule, EntitiesModule, EventEmitterModule.forRoot(), TurnsModule, QueuesModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService, LineGateway, ValidationPipeProvider],
})
export class AppModule {}
