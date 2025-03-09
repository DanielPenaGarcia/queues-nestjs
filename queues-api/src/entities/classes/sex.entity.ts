import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";

@Entity({ name: 'sexes' })
export class Sex extends AbstractEntity {

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    abbreviation: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;
}