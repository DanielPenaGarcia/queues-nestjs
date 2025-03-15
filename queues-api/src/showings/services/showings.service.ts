import { Showing } from '@entities/classes/showing.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueuesService } from '@queues/services/queues.service';
import { Repository } from 'typeorm';

@Injectable()
export class ShowingsService {
    constructor(@InjectRepository(Showing) private readonly showingsRepository: Repository<Showing>, private readonly queuesService: QueuesService){}

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

    async findShowingById(showingId: string): Promise<Showing> {
        const showing : Showing | null = await this.showingsRepository.findOne({
            where: {
                id: showingId
            },
            order: {
                screen: {
                    seats: {
                        row: {
                            direction: 'ASC'
                        },
                        position: {
                            direction: 'ASC'
                        }
                    }
                }
            },
            relations: {
                movie: true,
                screen: {
                    seats: {
                        tickets: true
                    }
                },
                tickets: {
                    user: true,
                }
            },
            select: {
                tickets: {
                    user: {
                        id: true
                    }
                }
            }
        });
        if (!showing) {
            throw new NotFoundException(`Showing with id ${showingId} does not exist`);
        }
        showing.screen.seats.map(seat => seat.tickets.find(ticket => ticket.showing.id === showingId));
        this.queuesService.createQueue(showing.id);
        return showing;
    }
 }
