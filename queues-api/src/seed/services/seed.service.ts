import { Movie } from '@entities/classes/movie.entity';
import { Screen } from '@entities/classes/screen.entity';
import { Seat } from '@entities/classes/seat.entity';
import { Showing } from '@entities/classes/showing.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Showing) private readonly showingRepository: Repository<Showing>, 
        @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>
) { }

    async seed(): Promise<void> {
        const seats = this.createBasicSeats();
        const screen: Screen = new Screen();
        screen.name = '1';
        screen.seats = seats;
        const movie: Movie = (await this.moviesRepository.findOneBy({ id: '1' }))!;
        const showing: Showing = this.showingRepository.create({ movie: movie, screen: screen });
        await this.showingRepository.save(showing);
    }

    private createBasicSeats(): Seat[] {
        const seats: Seat[] = [];
        const rows = ['A', 'B', 'C', 'D'];
        const positions = 34;
        for (const row of rows) {
            for (let pos = 1; pos <= positions; pos++) {
                const seat = new Seat();
                seat.row = row;

                // Asignar null a las primeras dos y últimas dos posiciones
                if (pos <= 2 || pos > positions - 2) {
                    seat.position = null;
                } else {
                    seat.position = pos - 2; // Ajustamos para que empiecen desde 1 hasta 30
                }

                seats.push(seat);
            }
        }
        return seats;
    }

}
