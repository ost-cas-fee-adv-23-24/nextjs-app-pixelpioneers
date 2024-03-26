import { PaginatedResult } from '@/src/models/paginate.model';
import { Post } from '@/src/models/post.model';
import { FollowingType, User } from './user.model';

export enum ProfilePostType {
    CREATED_BY = 'createdBy',
    LIKED_BY = 'likedBy',
}

export type Profile = {
    user: User;
    isActiveUser?: boolean;
};

export type ProfileHeader = Profile & {
    followedByActiveUser: FollowingType;
};

export type ProfilePosts = Profile & {
    posts: PaginatedResult<Post>;
    type: ProfilePostType;
};
