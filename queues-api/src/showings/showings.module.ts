import { ShowingsService } from './services/showings.service';
import { ShowingsController } from './controllers/showings.controller';
import { Module } from '@nestjs/common';
import { EntitiesModule } from '@entities/entities.module';

@Module({
    imports: [EntitiesModule],
    controllers: [ShowingsController],
    providers: [ShowingsService],
})
export class ShowingsModule { }
