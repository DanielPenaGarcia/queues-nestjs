import { LineModule } from './line/line.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineGateway } from './line/line.gateway';
import { FestivalsModule } from './festivals/festivals.module';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMOptions } from './configurations/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './configurations/jwt.config';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { TurnsModule } from './turns/turns.module';
import { QueuesModule } from './queues/queues.module';
import { ValidationPipeProvider } from './utils/providers/validation-pipe.provider';
import { UtilsModule } from './utils/utils.module';
import { QueuesService } from './queues/queues.service';
import { TURN_STARTED } from './line/events/turn-started.event';

@Module({
  imports: [
    LineModule, TypeOrmModule.forRoot(TypeORMOptions), JwtModule.register(JwtConfig), FestivalsModule, EntitiesModule, EventEmitterModule.forRoot(), TurnsModule, QueuesModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService, ValidationPipeProvider],
})
export class AppModule implements OnModuleInit {

  constructor(private readonly queuesService: QueuesService, private readonly eventEmitter: EventEmitter2) { }

  onModuleInit() {
    this.queuesService.initWorkers();
    console.log(`Número de listeners para TURN_STARTED: ${this.eventEmitter.listeners(TURN_STARTED).length}`);
  }
}
