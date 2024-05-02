import { ProfilePostType } from '@/src/models/profile.model';
import { Message } from '@/src/models/message.model';

export type ProfilePostsState = {
    activeType: ProfilePostType;
    posts: Message[];
    nextUrl?: string;
    error?: Error;
};

export enum ProfilePostsActionType {
    CHANGE_ACTIVE_TYPE = 'changeActiveType',
    POSTS_LOADED = 'postsLoaded',
    POSTS_RELOADED = 'postsReloaded',
    POSTS_ERROR = 'postsError',
}

export type ProfilePostsAction =
    | { type: ProfilePostsActionType.CHANGE_ACTIVE_TYPE; activeType: ProfilePostType }
    | {
          type: ProfilePostsActionType.POSTS_LOADED | ProfilePostsActionType.POSTS_RELOADED;
          posts: Message[];
          nextUrl?: string;
      }
    | {
          type: ProfilePostsActionType.POSTS_ERROR;
          error: Error;
      };
