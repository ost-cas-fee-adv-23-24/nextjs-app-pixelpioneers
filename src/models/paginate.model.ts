export type PaginatedResult<T> = {
    data: T[];
    count: number;
    next?: string;
    previous?: string;
};
