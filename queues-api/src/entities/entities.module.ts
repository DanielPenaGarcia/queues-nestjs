import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './classes/user.entity';
import { Sex } from './classes/sex.entity';
import { Movie } from './classes/movie.entity';
import { Screen } from './classes/screen.entity';
import { Showing } from './classes/showing.entity';
import { Ticket } from './classes/ticket.entity.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Sex, Movie, Screen, Showing, Ticket])],
    exports: [TypeOrmModule]
})
export class EntitiesModule {}
