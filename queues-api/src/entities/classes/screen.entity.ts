import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { Showing } from "./showing.entity";

@Entity({ name: 'screens' })
export class Screen extends AbstractEntity {

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'json', nullable: false })
    map: string;

    @OneToMany(() => Showing, screenMovie => screenMovie.screen)
    showings: Showing[]; 
}