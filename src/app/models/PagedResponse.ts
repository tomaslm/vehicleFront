export class PagedResponse<T> {
    content: T[];
    pageable: {
        sort: {
            sorted: boolean;
            unsorted: boolean
        };
        offset: number;
        pageSize: number;
        pageNumber: number;
        paged: boolean;
        unpaged: boolean
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    sort: {
        sorted: boolean;
        unsorted: boolean
    };
    first: boolean
}