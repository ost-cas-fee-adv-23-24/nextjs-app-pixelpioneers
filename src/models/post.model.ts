import { User } from './user.model';
import { z } from 'zod';

export const CreatePostSchema = z.union([
    z.object({
        text: z.string().nullish(),
        media: z.instanceof(File),
    }),
    z.object({
        text: z.string(),
        media: z.instanceof(File).nullish(),
    }),
]);

export type Post = {
    id: string;
    created: number;
    creator: User;
    text?: string;
    mediaUrl?: string;
    mediaType?: string;
    likes: number;
    likedBySelf?: boolean;
    replies: number;
};

export type PostValidationResult = { text?: string[]; media?: string[] };

export type Reply = Omit<Post, 'replies'> & {
    parentId: string;
};

/**
 * Message is used as a supertype of post and reply.
 * It contains all attributes, but is optional on Posts' replies and Replies' parentId.
 */
export type Message = Omit<Post, 'replies'> &
    Omit<Reply, 'parentId'> &
    Partial<Pick<Post, 'replies'>> &
    Partial<Pick<Reply, 'parentId'>>;
