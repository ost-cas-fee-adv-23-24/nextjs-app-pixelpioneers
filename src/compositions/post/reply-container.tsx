import { PaginatedResult } from '@/src/models/paginate.model';
import { Reply } from '@/src/models/post.model';
import { PostVariant } from '@/src/compositions/post/types';
import Post from './post';
import React from 'react';

type ReplyContainerProps = {
    paginatedReplies: PaginatedResult<Reply>;
};
export default function ReplyContainer({ paginatedReplies }: ReplyContainerProps) {
    const replies = paginatedReplies.data;
    return (
        <div className="flex flex-col gap-m md:gap-l">
            {replies.map((reply, index) => {
                return (
                    <div key={reply.id} className="flex flex-col gap-m md:gap-l">
                        {index > 0 && (
                            <hr className="mx-[-24px] text-secondary-100 md:mx-[-48px]" />
                        )}
                        <Post message={reply} variant={PostVariant.INLINE} />
                    </div>
                );
            })}
        </div>
    );
}
