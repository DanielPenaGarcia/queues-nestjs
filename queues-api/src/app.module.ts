import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '@configurations/typeorm.config';
import { SexesModule } from './sexes/sexes.module';
import { MoviesModule } from './movies/movies.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), AuthModule, EntitiesModule, SexesModule, MoviesModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
