import { Body, Controller, Post } from '@nestjs/common';
import { TurnsService } from './turns.service';
import { TakeTurnDTO } from './inputs/create-job.model';

@Controller('turns')
export class TurnsController {
  constructor(private readonly turnsService: TurnsService) {}

  @Post()
  async takeTurn(@Body() body: TakeTurnDTO) {
    return await this.turnsService.takeTurn(body);
  }
}
