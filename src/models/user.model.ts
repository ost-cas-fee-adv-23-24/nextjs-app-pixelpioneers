import { z } from 'zod';

export type User = {
    id: string;
    username: string;
    avatarUrl?: string;
    firstName: string;
    lastname: string;
};

export type PublicUser = Omit<User, 'firstname' | 'lastname'>;

export const UpdateAvatarSchema = z.object({
    media: z.string(),
});

export type AvatarValidationResult = { text?: string[]; media?: string[] };
