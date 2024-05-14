import { Message } from '@/src/models/message.model';
import { ErrorType } from '@/src/models/action.model';

export enum MessageDisplayVariant {
    INLINE = 'inline',
    TIMELINE = 'timeline',
    DETAIL_VIEW = 'detailView',
}

export enum MessageVariant {
    POST = 'post',
    REPLY = 'reply',
}

export type MessageState = {
    messages: Message[];
    nextUrl?: string;
    error?: ErrorType;
};

export enum MessageActionType {
    MESSAGES_RELOADED = 'messagesReloaded',
    MESSAGES_REVALIDATED = 'messagesRevalidated',
    MESSAGES_ERROR = 'messagesError',
}

export type MessageAction =
    | {
          type: MessageActionType.MESSAGES_RELOADED | MessageActionType.MESSAGES_REVALIDATED;
          messages: Message[];
          nextUrl?: string;
      }
    | { type: MessageActionType.MESSAGES_ERROR; error: ErrorType };
