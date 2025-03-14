import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { User } from "./user.entity";
import { Showing } from "./showing.entity";
import { Seat } from "./seat.entity";

@Entity({ name: 'tickets' })
export class Ticket extends AbstractEntity {
    
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    token: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    value: string | null;
    
    @Column({ type: 'varchar', length: 255, nullable: false })
    row: string;
    
    @ManyToOne(() => User, user => user.tickets)
    user: User;

    @ManyToOne(() => Seat)
    seat: Seat;

    @ManyToOne(() => Showing, showing => showing.tickets)
    showing: Showing;
}