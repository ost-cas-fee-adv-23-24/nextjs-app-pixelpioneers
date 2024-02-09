import { PublicUser } from './user.model';

export type PostBase = {
    id: string;
    creator: PublicUser;
    text?: string;
    mediaUrl?: string;
    mediaType?: string;
    likes: number;
    likedBySelf?: boolean;
};

export type Post = PostBase & {
    replies: number;
};

export type DeletedPost = {
    id: string;
};

export type UpdatePostData = Omit<
    PostBase,
    'id' | 'creator' | 'mediaUrl' | 'mediaType' | 'likes' | 'likedBySelf'
>;
