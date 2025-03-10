import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { Screen } from "./screen.entity";

@Entity({ name: 'seats' })
export class Seat extends AbstractEntity {
    @Column({ type: 'varchar', length: 10, nullable: false })
    row: string;

    @Column({ type: 'int', nullable: true })
    position: number | null;

    @ManyToOne(() => Screen, screen => screen.seats, { cascade: ['insert']})
    screen: Screen;
}