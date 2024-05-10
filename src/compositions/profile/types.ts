import { ProfilePostType } from '@/src/models/profile.model';
import { Message } from '@/src/models/message.model';
import { ErrorType } from '@/src/models/action.model';

export type ProfileState = {
    activeType: ProfilePostType;
    posts: Message[];
    nextUrl?: string;
    error?: ErrorType;
};

export enum ProfileActionType {
    CHANGE_ACTIVE_TYPE = 'changeActiveType',
    POSTS_LOADED = 'postsLoaded',
    POSTS_RELOADED = 'postsReloaded',
    POSTS_ERROR = 'postsError',
}

export type ProfileAction =
    | { type: ProfileActionType.CHANGE_ACTIVE_TYPE; activeType: ProfilePostType }
    | {
          type: ProfileActionType.POSTS_LOADED | ProfileActionType.POSTS_RELOADED;
          posts: Message[];
          nextUrl?: string;
      }
    | { type: ProfileActionType.POSTS_ERROR; error: ErrorType };
