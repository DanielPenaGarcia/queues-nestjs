import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { Screen } from "./screen.entity";
import { Ticket } from "./ticket.entity.entity";

@Entity({ name: 'seats' })
export class Seat extends AbstractEntity {
    @Column({ type: 'varchar', length: 10, nullable: false })
    row: string;

    @Column({ type: 'varchar', nullable: true })
    value: string | null;

    @Column({ type: 'int', nullable: false })
    position: number;

    @ManyToOne(() => Screen, screen => screen.seats, { cascade: ['insert']})
    screen: Screen;

    @OneToMany(() => Ticket, ticket => ticket.seat)
    tickets: Ticket[]
}