import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { Showing } from "./showing.entity";
import { Seat } from "./seat.entity";

@Entity({ name: 'screens' })
export class Screen extends AbstractEntity {

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @OneToMany(() => Seat, seat => seat.screen, { cascade: ['insert']})
    seats: Seat[];

    @OneToMany(() => Showing, screenMovie => screenMovie.screen)
    showings: Showing[]; 
}