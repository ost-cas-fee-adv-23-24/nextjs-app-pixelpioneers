import { FollowAction, FollowActionType, FollowState } from '@/src/compositions/follow/types';

export function followReducer(state: FollowState, action: FollowAction): FollowState {
    switch (action.type) {
        case FollowActionType.FOLLOWEES_LOADED: {
            return {
                ...state,
                isFollowing: action.isFollowing,
                isLoading: false,
            };
        }
        case FollowActionType.SUBMITTING_FOLLOW: {
            return {
                ...state,
                isFollowing: action.isFollowing,
                isSubmittingFollow: true,
            };
        }
        case FollowActionType.SUBMITTED_FOLLOW: {
            return {
                ...state,
                isSubmittingFollow: false,
            };
        }
        case FollowActionType.ERROR: {
            return {
                ...state,
                error: action.error,
            };
        }
        default: {
            return state;
        }
    }
}
