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
    AUTHORIZATION = 'authorization',
    FETCH = 'fetching',
    VALIDATION = 'validation',
    EXECUTION = 'execution',
}

export const getErrorMessage = (type: ErrorType, clickToReload = false) => {
    const reload = clickToReload ? ' Klicke um neu zu laden.' : '';
    switch (type) {
        case ErrorType.AUTHORIZATION:
            return `Bitte melde dich an, um fortzufahren.`;
        case ErrorType.VALIDATION:
            return `Daten sind invalid.`;
        case ErrorType.EXECUTION:
            return `Deine Daten konnten nicht hochgeladen werden.${reload}`;
        case ErrorType.FETCH:
            return `Daten konnten nicht geladen werden.${reload}`;
        default:
            return `Es ist ein Fehler unterlaufen.${reload}`;
    }
};

export enum RevalidationTime {
    SHORT = 15,
    MEDIUM = 60,
    LONG = 3600,
}
