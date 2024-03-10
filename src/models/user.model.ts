import { z } from 'zod';

export type User = {
    id: string;
    username: string;
    avatarUrl?: string;
    firstname?: string;
    lastname?: string;
};

export const UpdateAvatarSchema = z.object({
    media: z.string(),
});

export type AvatarValidationResult = { text?: string[]; media?: string[] };
