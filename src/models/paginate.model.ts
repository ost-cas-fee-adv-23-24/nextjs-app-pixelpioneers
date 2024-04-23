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

export const PAGINATION_LIMIT = 15;
