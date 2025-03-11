import { Language } from '@entities/classes/language.entity';
import { MovieLanguage } from '@entities/classes/movie-language.entity';
import { Movie } from '@entities/classes/movie.entity';
import { Screen } from '@entities/classes/screen.entity';
import { Seat } from '@entities/classes/seat.entity';
import { Sex } from '@entities/classes/sex.entity';
import { Showing } from '@entities/classes/showing.entity';
import { User } from '@entities/classes/user.entity';
import { MovieLanguageType } from '@entities/enums/movie-language-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Showing) private readonly showingRepository: Repository<Showing>, 
        @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>
) { }

    async seed(): Promise<void> {
        await this.addUser();
        const movie: Movie = await this.addMovie();
        const seats = this.createBasicSeats();
        const screen: Screen = new Screen();
        screen.name = '1';
        screen.seats = seats;
        const showing: Showing = this.showingRepository.create({ movie: movie, screen: screen, language: movie.movieLanguages[0].language, dateTime: new Date() });
        const showingTwo: Showing = this.showingRepository.create({ movie: movie, screen: screen, language: movie.movieLanguages[1].language, dateTime: new Date() });
        await this.showingRepository.save(showing);
        await this.showingRepository.save(showingTwo);
    }

    private async addUser(): Promise<User> {
        const m: Sex = new Sex();
        m.name = 'Male';
        m.abbreviation = 'M';
        m.description = 'Hombre';
        const user: User = this.usersRepository.create({ email: 'dapgpena@gmail.com', password: '12345678', sex: m, names: 'Daniel Armando', lastNames: 'Peña García' });
        await this.usersRepository.save(user);
        return user;
    }

    private async addMovie(): Promise<Movie> {
        const movie: Movie = new Movie();
        movie.name = 'Demon Slayer: Kimetsu no Yaiba Infinity Castle Capítulo 1';
        movie.description = 'Es la primera película de una trilogía que adapta el arco final del manga. En este capítulo, Tanjiro y sus compañeros del Cuerpo de Exterminio de Demonios se enfrentan a Muzan Kibutsuji en la Fortaleza Infinita, el bastión de los demonios.';
        movie.duration = 75;
        movie.isAvailable = true;
        movie.posterUrl = 'https://preview.redd.it/1ms6vl8w22me1.jpeg?auto=webp&s=fc913e982e5c8c5996cd0964efd4c3bf9a377c40';
        const [es, en] = this.createLanguages();
        const esMovie: MovieLanguage = new MovieLanguage();
        esMovie.language = es;
        esMovie.type = MovieLanguageType.DUBBED;
        const enMovie: MovieLanguage = new MovieLanguage();
        enMovie.language = en;
        enMovie.type = MovieLanguageType.SUBTITLED;
        movie.movieLanguages = [esMovie, enMovie];
        return this.moviesRepository.save(movie);
    }

    private createLanguages(): Language[] {
        const es: Language = new Language();
        es.code = 'es';
        es.name = 'Español';
        const en: Language = new Language();
        en.code = 'en';
        en.name = 'Inglés';
        return [es, en];
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
                    seat.value = null;
                } else {
                    seat.value = (pos - 2).toString(); // Ajustamos para que empiecen desde 1 hasta 30
                }
                seat.position = pos;
                seats.push(seat);
            }
        }
        return seats;
    }

}
