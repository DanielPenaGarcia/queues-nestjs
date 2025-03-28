import { LineModule } from './line/line.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    LineModule, TypeOrmModule.forRoot(TypeORMOptions), JwtModule.register(JwtConfig), EntitiesModule, EventEmitterModule.forRoot(), TurnsModule, QueuesModule, UtilsModule, SecurityModule],
  controllers: [AppController],
  providers: [AppService, ValidationPipeProvider],
})
export class AppModule implements OnModuleInit {

  constructor(private readonly queuesService: QueuesService, private readonly eventEmitter: EventEmitter2) { }

  onModuleInit() {
    this.queuesService.initWorkers();
  }
}
