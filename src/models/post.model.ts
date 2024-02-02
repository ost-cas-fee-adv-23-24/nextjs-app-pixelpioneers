type PostBase = {
    id: string;
    text?: string;
    mediaUrl?: string;
    mediaType?: string;
    likes: number;
    likedBySelf?: boolean;
};

export type Post = PostBase & {
    replies: number;
};
