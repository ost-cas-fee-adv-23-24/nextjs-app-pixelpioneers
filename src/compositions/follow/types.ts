export type FollowState = {
    isLoading: boolean;
    isFollowing: boolean;
    isSubmitting: boolean;
};

export enum FollowActionType {
    SUBMITTING = 'submitting',
    SUBMITTED = 'submitted',
    FOLLOWEES_LOADED = 'followeesLoaded',
}

export type FollowAction =
    | {
          type: FollowActionType.SUBMITTING | FollowActionType.FOLLOWEES_LOADED;
          isFollowing: boolean;
      }
    | { type: FollowActionType.SUBMITTED };
