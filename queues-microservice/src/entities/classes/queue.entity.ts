import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { WorkerEntity } from "./worker.entity";

@Entity('queues')
export class QueueEntity extends AbstractEntity {

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @OneToMany(() => WorkerEntity, worker => worker.queue, { cascade: ['insert'], eager: true })
    workers: WorkerEntity[];

    @Column({ type: 'datetime', nullable: false })
    expires: Date;
}