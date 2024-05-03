import { Message } from '../models/message.model';
import { PaginatedResult } from '../models/paginate.model';
import { decodeTime } from 'ulid';

export function messageHydrator<T extends Message>(message: T): T {
    return { ...message, created: decodeTime(message.id) };
}

export function messagesHydrator<T extends Message>(
    paginatedMessages: PaginatedResult<T>,
): PaginatedResult<T> {
    return {
        ...paginatedMessages,
        data: paginatedMessages.data.map((message) => messageHydrator(message)),
    };
}
