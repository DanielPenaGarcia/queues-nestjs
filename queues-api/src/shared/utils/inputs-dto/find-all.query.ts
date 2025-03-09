export class FindAllQueryDTO {
    constructor(page: number, count: number, sort: object) {
        this.count = count;
        this.page = page;
        this.sort = sort;
    }
    count: number;
    page: number;
    get skip(): number { return this.count * this.page; }
    isPaging() { return (this.count != undefined && this.page != undefined); }
    sort: object;
}