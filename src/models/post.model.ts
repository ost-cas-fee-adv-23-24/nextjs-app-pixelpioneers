import { PublicUser } from './user.model';
import { z } from 'zod';

export const CreatePostSchema = z.union([
    z.object({
        text: z.string().nullish(),
        media: z.string(),
    }),
    z.object({
        text: z.string(),
        media: z.string().nullish(),
    }),
]);

export type Post = {
    id: string;
    created: number;
    creator: PublicUser;
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
