export type ActionResponse<T> = DataResponse<T> | ErrorResponse;

export type DataResponse<T> = {
    data: T;
    isError: false;
};

export type ErrorResponse = {
    error: Error;
    isError: true;
};

export enum RevalidationTime {
    INSTANT = 0,
    SHORT = 15,
    MEDIUM = 60,
    LONG = 3600,
}
