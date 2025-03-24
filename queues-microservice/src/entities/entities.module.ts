import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Festival } from './classes/festival.entity';
import { QueueEntity } from './classes/queue.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Festival, QueueEntity])],
    exports: [TypeOrmModule]
})
export class EntitiesModule {}
