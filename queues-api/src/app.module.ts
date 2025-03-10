import { ShowingsModule } from './showings/showings.module';
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
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ShowingsModule, TypeOrmModule.forRoot(TypeOrmConfig), AuthModule, EntitiesModule, SexesModule, MoviesModule, SharedModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
