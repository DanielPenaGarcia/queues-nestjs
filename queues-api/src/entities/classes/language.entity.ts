import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity.abstract";
import { MovieLanguage } from "./movie-language.entity";

@Entity({ name: 'languages' })
export class Language extends AbstractEntity {

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    code: string;

    @OneToMany(() => MovieLanguage, movieLanguage => movieLanguage.language)
    movieLanguages: MovieLanguage[];
}