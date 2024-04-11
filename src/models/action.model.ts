export type ActionResponse<T> = DataResponse<T> | ErrorResponse;

export type DataResponse<T> = {
    data: T;
    isError: false;
};

export type ErrorResponse = {
    error: Error;
    isError: true;
};
