import { z } from 'zod';

export type User = {
    id: string;
    username: string;
    avatarUrl?: string;
    firstname?: string;
    lastname?: string;
};

export enum FollowType {
    FOLLOW = 'follow',
    UNFOLLOW = 'unfollow',
}

export enum FollowingType {
    FOLLOWING = 'following',
    NOT_FOLLOWING = 'notFollowing',
}

export enum UserState {
    LOGGED_IN = 'loggedIn',
    LOGGED_OUT = 'loggedOut',
    IS_ACTIVE_USER = 'isActiveUser',
}

export const UpdateAvatarSchema = z.object({
    media: z.instanceof(File),
});

export type AvatarValidationResult = { text?: string[]; media?: string[] };
