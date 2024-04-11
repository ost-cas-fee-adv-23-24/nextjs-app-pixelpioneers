export type PaginatedResult<T> = {
    data: T[];
    count: number;
    next?: string;
    previous?: string;
};

export type FilterOptions = Partial<{
    limit: number;
    offset: number;
}>;
