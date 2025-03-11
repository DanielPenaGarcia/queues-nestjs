import { MovieLanguageType } from "@entities/enums/movie-language-type.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { Language } from "./language.entity";
import { Movie } from "./movie.entity";
import { AbstractEntity } from "./abstract-entity.abstract";

@Entity({ name: 'movie_languages' })
export class MovieLanguage extends AbstractEntity {

    @ManyToOne(() => Movie, movie => movie.movieLanguages)
    movie: Movie;

    @ManyToOne(() => Language, language => language.movieLanguages, { cascade: ['insert'] })
    language: Language;

    @Column({ type: 'enum', enum: MovieLanguageType, default: MovieLanguageType.DUBBED })
    type: MovieLanguageType;
}