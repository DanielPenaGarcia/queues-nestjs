import { FindAllQueryDTO } from "@shared/utils/inputs-dto/find-all.query";

export class FindAllMoviesDTO extends FindAllQueryDTO {
    constructor(
        override readonly page: number,
        override readonly count: number,
        override readonly sort: object,
        readonly search: string
    ) {
        super(page, count, sort);
    }
}