import { Post } from './post.model';

export type Reply = Omit<Post, 'replies'> & {
    parentId: string;
};
