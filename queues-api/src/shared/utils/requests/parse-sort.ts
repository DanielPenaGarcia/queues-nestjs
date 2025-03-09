export function parseSort(sort: string, validSortFields: Array<string>): object {
    if (!sort) return [];
    const allSortsSplitted = sort.split(",");
    const sorts:Record<string,number> = {};
    allSortsSplitted.forEach((s) => {
        let sortFieldSplitted = s.split("-");
        if (sortFieldSplitted.length == 2) {
            let sortField = sortFieldSplitted[1];
            if (validSortFields.includes(sortField)) {
               sorts[sortField] = -1
            }
        } else {
            if (validSortFields.includes(sortFieldSplitted[0])) {
                let sortField = sortFieldSplitted[0];
                sorts[sortField] = 1
            }
        }
    });
    return sorts;
}