import { Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { Screen } from "./screen.entity";
import { Movie } from "./movie.entity";
import { Ticket } from "./ticket.entity.entity";

@Entity({ name: 'showings' })
export class Showing extends AbstractEntity {

    @ManyToOne(() => Screen, screen => screen.showings)
    screen: Screen;

    @ManyToOne(() => Movie, movie => movie.showings)
    movie: Movie;

    @OneToMany(() => Ticket, ticket => ticket.showing)
    tickets: Ticket[];
}