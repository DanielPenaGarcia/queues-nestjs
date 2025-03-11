import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { Showing } from "./showing.entity";
import { MovieLanguage } from "./movie-language.entity";

@Entity({ name: 'movies' })
export class Movie extends AbstractEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'int', nullable: false })
    duration: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    isAvailable: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    posterUrl: string

    @OneToMany(() => Showing, screenMovie => screenMovie.movie)
    showings: Showing[];

    @OneToMany(() => MovieLanguage, movieLanguage => movieLanguage.movie, { cascade: ['insert'] })
    movieLanguages: MovieLanguage[];
}