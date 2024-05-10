export type ActionResponse<T> = DataResponse<T> | ErrorResponse;

export type DataResponse<T> = {
    data: T;
    isError: false;
};

export type ErrorResponse = {
    error: ErrorType;
    isError: true;
};

export enum ErrorType {
    AUTHORIZATION = 'authorization error',
    FETCH = 'fetching error',
    VALIDATION = 'validation error',
    EXECUTION = 'execution error',
}

export enum RevalidationTime {
    SHORT = 15,
    MEDIUM = 60,
    LONG = 3600,
}
