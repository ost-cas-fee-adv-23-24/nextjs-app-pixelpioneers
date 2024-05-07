import { ErrorType } from '@/src/models/action.model';

export type FollowState = {
    isLoading: boolean;
    isFollowing: boolean;
    isSubmittingFollow: boolean;
    error?: ErrorType;
};

export enum FollowActionType {
    SUBMITTING_FOLLOW = 'submittingFollow',
    SUBMITTED_FOLLOW = 'submittedFollow',
    FOLLOWEES_LOADED = 'followeesLoaded',
    ERROR = 'error',
}

export type FollowAction =
    | {
          type: FollowActionType.SUBMITTING_FOLLOW | FollowActionType.FOLLOWEES_LOADED;
          isFollowing: boolean;
      }
    | { type: FollowActionType.SUBMITTED_FOLLOW }
    | { type: FollowActionType.ERROR; error: ErrorType };
