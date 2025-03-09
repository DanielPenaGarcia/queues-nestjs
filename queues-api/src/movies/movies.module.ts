import { Module } from '@nestjs/common';
import { MoviesController } from './controller/movies.controller';
import { MoviesService } from './services/movies.service';
import { EntitiesModule } from '@entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
