import { Message } from '../models/message.model';
import { PaginatedResult } from '../models/paginate.model';
import { decodeTime } from 'ulid';
import { User } from '../models/user.model';

export function messageReducer<T extends Message>(message: T): T {
    return { ...message, created: decodeTime(message.id) };
}

export function messagesReducer<T extends Message>(
    paginatedMessages: PaginatedResult<T>,
): PaginatedResult<T> {
    return {
        ...paginatedMessages,
        data: paginatedMessages.data.map((message) => messageReducer(message)),
    };
}

function userMessageHydrator<T extends Message>(message: T, user: User): T {
    return {
        ...message,
        creator: {
            ...message.creator,
            firstname: user.firstname,
            lastname: user.lastname,
        },
    };
}

export function userMessagesHydrator<T extends Message>(
    paginatedMessages: PaginatedResult<T>,
    user: User,
): PaginatedResult<T> {
    return {
        ...paginatedMessages,
        data: paginatedMessages.data.map((post) => userMessageHydrator(post, user)),
    };
}
