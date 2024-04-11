export type PaginatedResult<T> = {
    data: T[];
    count: number;
    next?: string;
    previous?: string;
};

export type BaseFilterOptions = Partial<{
    newerThan: string;
    olderThan: string;
    limit: number;
    offset: number;
}>;
