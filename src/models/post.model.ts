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

export type CreatePost = z.infer<typeof CreatePostSchema>;

export const PostSchema = z.object({
    id: z.string(),
    //creator: UserPublicSchema;
    text: z.string().optional(),
    mediaUrl: z.string().optional(),
    mediaType: z.string().optional(),
    likes: z.number(),
    likedBySelf: z.boolean().optional(),
    replies: z.number(),
}); // TODO: Necessary?

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

export type DeletedPost = {
    id: string;
};

export type UpdatePostData = Omit<
    Post,
    'id' | 'creator' | 'mediaUrl' | 'mediaType' | 'likes' | 'likedBySelf' | 'replies'
>;

export type Reply = Omit<Post, 'replies'> & {
    parentId: string;
};
