import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity('festivals')
export class Festival extends AbstractEntity {

    @Column()
    name: string;

    @Column({ default: 0 })
    tickets: number;
}