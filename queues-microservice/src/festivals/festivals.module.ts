import { Module } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { FestivalsController } from './festivals.controller';
import { RedisProvider } from 'src/utils/providers/redis.provider';
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [FestivalsController],
  providers: [FestivalsService, RedisProvider],
})
export class FestivalsModule {}
