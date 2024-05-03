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
        case FollowActionType.SUBMITTING: {
            return {
                ...state,
                isFollowing: action.isFollowing,
                isSubmitting: true,
            };
        }
        case FollowActionType.SUBMITTED: {
            return {
                ...state,
                isSubmitting: false,
            };
        }
    }
}
