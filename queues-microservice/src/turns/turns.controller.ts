import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { TurnsService } from './turns.service';
import { TurnDTO } from './inputs/create-job.model';
import { TurnGuard } from '../security/guards/turn.guard';

@Controller('turns')
export class TurnsController {
  constructor(private readonly turnsService: TurnsService) {}

  @Post()
  async takeTurn(@Body() turn: TurnDTO) {
    return await this.turnsService.takeTurn(turn);
  }

  @UseGuards(TurnGuard)
  @Post('validate')
  async validateToken(@Req() req: Request) {
    const data = req['turn'];
    return data;
  }
}
