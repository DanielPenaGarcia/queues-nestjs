import { Controller } from '@nestjs/common';
import { TurnsService } from './turns.service';

@Controller('turns')
export class TurnsController {
  constructor(private readonly turnsService: TurnsService) {}
}
