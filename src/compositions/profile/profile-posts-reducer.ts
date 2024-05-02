import {
    ProfilePostsAction,
    ProfilePostsActionType,
    ProfilePostsState,
} from '@/src/compositions/profile/types';

export function profilePostsReducer(
    state: ProfilePostsState,
    action: ProfilePostsAction,
): ProfilePostsState {
    switch (action.type) {
        case ProfilePostsActionType.CHANGE_ACTIVE_TYPE: {
            return {
                ...state,
                activeType: action.activeType,
            };
        }
        case ProfilePostsActionType.POSTS_LOADED: {
            return {
                ...state,
                posts: action.posts,
                nextUrl: action.nextUrl,
                error: undefined,
            };
        }
        case ProfilePostsActionType.POSTS_ERROR: {
            return {
                ...state,
                posts: [],
                nextUrl: undefined,
                error: action.error,
            };
        }
        case ProfilePostsActionType.POSTS_RELOADED: {
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                nextUrl: action.nextUrl,
            };
        }
        default: {
            return state;
        }
    }
}
