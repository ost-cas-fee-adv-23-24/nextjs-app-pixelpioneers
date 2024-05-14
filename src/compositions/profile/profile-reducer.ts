import { ProfileAction, ProfileActionType, ProfileState } from '@/src/compositions/profile/types';

export function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case ProfileActionType.CHANGE_ACTIVE_TYPE: {
            // switch from your mumbles to your likes or vice versa
            return {
                ...state,
                activeType: action.activeType,
            };
        }
        case ProfileActionType.POSTS_LOADED: {
            // replace posts, reset error
            return {
                ...state,
                posts: action.posts,
                nextUrl: action.nextUrl,
                error: undefined,
            };
        }
        case ProfileActionType.POSTS_RELOADED: {
            // add posts when user clicks on load more posts
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                nextUrl: action.nextUrl,
            };
        }
        case ProfileActionType.POSTS_ERROR: {
            // remove posts, add error when error happens
            return {
                ...state,
                posts: [],
                nextUrl: undefined,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
}
