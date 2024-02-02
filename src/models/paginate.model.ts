export type PaginatedResult<TData> = {
    data: TData[];
    count: number;
    next?: string;
    previous?: string;
};
