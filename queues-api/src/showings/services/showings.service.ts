import { Showing } from '@entities/classes/showing.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShowingsService {
    constructor(@InjectRepository(Showing) private readonly showingsRepository: Repository<Showing>){}

    async findAllShowings(): Promise<Showing[]> {
        return this.showingsRepository.find({
            relations: {
                screen: true
            }
        });
    }

    async findShowingByMovieIdAndLanguageId(movieId: string, languageId: string): Promise<Showing[]> {
        const showings: Showing[] = await this.showingsRepository.find({
            where: {
                movie: {
                    id: movieId,
                },
                language: {
                    id: languageId
                }
            },
            relations: {
                movie: true,
                language: true
            }
        });
        return showings;
    }
 }
