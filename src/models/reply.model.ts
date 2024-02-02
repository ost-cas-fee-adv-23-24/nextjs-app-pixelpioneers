import { PublicUser } from './user.model';

export type Reply = {
    id: string;
    creator: PublicUser;
    text: string;
    mediaUrl: string;
    mediaType: string;
    likes: number;
    likedBySelf: boolean;
    parentId: string;
};
