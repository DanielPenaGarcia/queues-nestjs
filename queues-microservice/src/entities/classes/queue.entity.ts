import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity('queues')
export class QueueEntity extends AbstractEntity {

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @Column({ type: 'int', nullable: true })
    workers: number;

    @Column({ type: 'datetime', nullable: false })
    expires: Date;
}