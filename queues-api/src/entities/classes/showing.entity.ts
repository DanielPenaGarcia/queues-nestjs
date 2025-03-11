import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { Screen } from "./screen.entity";
import { Movie } from "./movie.entity";
import { Ticket } from "./ticket.entity.entity";
import { ShowingStatus } from "@entities/enums/showing-status.type.enum";
import { Language } from "./language.entity";

@Entity({ name: 'showings' })
export class Showing extends AbstractEntity {

    @ManyToOne(() => Screen, screen => screen.showings, { cascade: ['insert'] })
    screen: Screen;

    @ManyToOne(() => Movie, movie => movie.showings)
    movie: Movie;

    @OneToMany(() => Ticket, ticket => ticket.showing)
    tickets: Ticket[];

    @Column({ type: 'timestamp' })
    dateTime: Date;

    @Column({ type: 'int' })
    availableSeats: number;

    @Column({ type: 'enum', enum: ShowingStatus, default: ShowingStatus.AVAILABLE })
    status: ShowingStatus;

    @ManyToOne(() => Language)
    language: Language;

    @BeforeInsert()
    beforeInsert() {
        this.availableSeats = this.screen.seats.filter((seat) => seat.value != null).length;
    }

    @BeforeUpdate()
    beforUpdate() {
        if(this.availableSeats > 0) {
            this.availableSeats -= this.tickets.filter((ticket) => ticket.seat != null).length;
        }
    }
}
