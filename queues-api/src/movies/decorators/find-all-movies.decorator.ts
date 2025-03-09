import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { parsePage } from "@shared/utils/requests/parse-page";
import { parseCount } from "@shared/utils/requests/parse-count";
import { parseSort } from "@shared/utils/requests/parse-sort";
import { FindAllMoviesDTO } from "../inputs/find-all-movies.query";

const sortFields = ['createdAt', 'name'];

export const FindAllMoviesQuery = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const pageString = request.query.page;
    const page = parsePage(pageString);
    const countString = request.query.count;
    const count = parseCount(countString);
    const sortString = request.query.sort;
    const sort = parseSort(sortString, sortFields);
    const search = request.query.search || '';
    const query: FindAllMoviesDTO = new FindAllMoviesDTO(page, count, sort, search);
    return query; 
})