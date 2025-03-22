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

  @Post('take-turn')
  async takeTurn(@Body() body: any): Promise<Job> {
    return this.festivalsService.takeTurn(body.festivalId);
  }

  @Post(':id/jobs/:jobId/minute')
  async addMinute(@Param() params: any): Promise<Job> {
    return this.festivalsService.addMinute(params.jobId, params.id);
  }
}
