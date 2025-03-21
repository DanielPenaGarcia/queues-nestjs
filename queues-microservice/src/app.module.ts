import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TurnsGateway } from './turns/turns.gateway';
import { FestivalsModule } from './festivals/festivals.module';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMOptions } from './configurations/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMOptions), FestivalsModule, EntitiesModule],
  controllers: [AppController],
  providers: [AppService, TurnsGateway],
})
export class AppModule {}
