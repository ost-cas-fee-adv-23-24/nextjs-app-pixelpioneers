import { PostBase } from './post.model';

export type Reply = Omit<
    PostBase,
    'id' | 'text' | 'creator' | 'mediaUrl' | 'mediaType' | 'likes' | 'likedBySelf'
> & {
    parentId: string;
};
