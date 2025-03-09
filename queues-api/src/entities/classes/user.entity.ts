import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractUser } from "./abstract-user.abstract";
import { Ticket } from "./ticket.entity.entity";
import { Sex } from "./sex.entity";

@Entity({ name: 'users' })
export class User extends AbstractUser {
    @Column({ type: 'varchar', length: 255, nullable: false })
    names: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    lastNames: string;

    @ManyToOne(() => Sex)
    sex: Sex;

    @OneToMany(() => Ticket, ticket => ticket.user)
    tickets: Ticket[];
}