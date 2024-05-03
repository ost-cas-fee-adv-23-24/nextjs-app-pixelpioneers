import { PaginatedResult } from '@/src/models/paginate.model';
import { Post } from '@/src/models/message.model';
import { User, UserState } from './user.model';

export enum ProfilePostType {
    CREATED_BY = 'createdBy',
    LIKED_BY = 'likedBy',
}

export type Profile = {
    user: User;
    userState: UserState;
};

export type ProfileFollowing = {
    isFollowing: boolean;
};

export type ProfilePosts = {
    userState: UserState;
    paginatedPosts: PaginatedResult<Post>;
};
