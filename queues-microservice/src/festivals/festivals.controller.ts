import { Body, Controller, Param, Post } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { Festival } from 'src/entities/classes/festival.entity';
import { Job } from 'bullmq';

@Controller('festivals')
export class FestivalsController {
  constructor(private readonly festivalsService: FestivalsService) {}

  @Post()
  async createFestival(@Body() body: any): Promise<Festival> {
    return await this.festivalsService.createFestival(body.name);
  }
}
