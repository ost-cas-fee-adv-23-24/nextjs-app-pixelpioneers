import { ProfileAction, ProfileActionType, ProfileState } from '@/src/compositions/profile/types';

export function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case ProfileActionType.CHANGE_ACTIVE_TYPE: {
            return {
                ...state,
                activeType: action.activeType,
            };
        }
        case ProfileActionType.POSTS_LOADED: {
            return {
                ...state,
                posts: action.posts,
                nextUrl: action.nextUrl,
                error: undefined,
            };
        }
        case ProfileActionType.POSTS_ERROR: {
            return {
                ...state,
                posts: [],
                nextUrl: undefined,
                error: action.error,
            };
        }
        case ProfileActionType.POSTS_RELOADED: {
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
