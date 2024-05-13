import { MessageAction, MessageActionType, MessageState } from '@/src/compositions/message/types';

export function messageReducer(state: MessageState, action: MessageAction): MessageState {
    switch (action.type) {
        case MessageActionType.MESSAGES_REVALIDATED: {
            // replace messages on revalidation from server
            return {
                ...state,
                messages: action.messages,
                nextUrl: action.nextUrl,
                error: undefined,
            };
        }
        case MessageActionType.MESSAGES_RELOADED: {
            // add messages when user clicks load more messages
            return {
                ...state,
                messages: [...state.messages, ...action.messages],
                nextUrl: action.nextUrl,
            };
        }
        case MessageActionType.MESSAGES_ERROR: {
            // remove messages, add error when error happens
            return {
                ...state,
                messages: [],
                nextUrl: undefined,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
}
