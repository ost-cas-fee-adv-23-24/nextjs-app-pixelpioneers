export type FollowState = {
    isLoading: boolean;
    isFollowing: boolean;
    isSubmitting: boolean;
    error?: Error;
};

export enum FollowActionType {
    SUBMITTING = 'submitting',
    SUBMITTED = 'submitted',
    FOLLOWEES_LOADED = 'followeesLoaded',
    ERROR = 'error',
}

export type FollowAction =
    | {
          type: FollowActionType.SUBMITTING | FollowActionType.FOLLOWEES_LOADED;
          isFollowing: boolean;
      }
    | { type: FollowActionType.SUBMITTED }
    | { type: FollowActionType.ERROR; error: Error };
