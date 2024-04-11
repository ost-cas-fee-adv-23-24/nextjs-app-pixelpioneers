import React from 'react';
import { createPost } from '@/app/actions/post';
import { MessageVariant } from '@/src/compositions/post/types';
import PostFormOrLogin from '@/src/compositions/post-form-or-login/post-form-or-login';
import { getLoggedInUser } from '@/app/actions/utils';

export default async function CreatePost() {
    return (
        <PostFormOrLogin
            messageVariant={MessageVariant.POST}
            onCreate={createPost}
            user={await getLoggedInUser()}
        />
    );
}
