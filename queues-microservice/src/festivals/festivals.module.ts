import { Module } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { FestivalsController } from './festivals.controller';
import { BullConnectionProvider } from 'src/utils/providers/redis.provider';
import { EntitiesModule } from 'src/entities/entities.module';
import { LineGateway } from 'src/line/line.gateway';

@Module({
  imports: [EntitiesModule],
  controllers: [FestivalsController],
  providers: [FestivalsService, BullConnectionProvider],
})
export class FestivalsModule {}
