export type LoginError = { login?: string };

export type RequestError = { request?: string };

export type Response<T> = {
    data?: T;
    error?: RequestError;
};

export type ActionError = RequestError & LoginError;

export type CreatePostError = ActionError & { media?: string[]; text?: string[] };
