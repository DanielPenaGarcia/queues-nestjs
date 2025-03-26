import { Column, Entity, ManyToOne } from "typeorm";
import { QueueEntity } from "./queue.entity";
import { AbstractEntity } from "./abstract.entity";

@Entity('workers')
export class WorkerEntity extends AbstractEntity {

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false})
    expiresIn: string;

    @Column({ type: 'varchar', length: 255, nullable: true})
    additionalTime: string | undefined;

    @Column({ type: 'int', nullable: false})
    concurrency: number;

    @ManyToOne(() => QueueEntity, queue => queue.workers)
    queue: QueueEntity;
}