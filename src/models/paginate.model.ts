export type PaginatedResult<T> = {
    data: T[];
    count: number;
    next?: string;
    previous?: string;
};

export type PaginationOptions = Partial<{
    limit: number;
    offset: number;
}>;

export const PAGINATION_LIMIT = 15;
