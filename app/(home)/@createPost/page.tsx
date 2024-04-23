import React from 'react';
import { createPost } from '@/app/actions/post';
import { MessageVariant } from '@/src/compositions/message/types';
import MessageFormLogin from '@/src/compositions/message/message-form-login';
import { getLoggedInUser } from '@/app/actions/utils';

export default async function HomeCreatePostPage() {
    return (
        <MessageFormLogin
            messageVariant={MessageVariant.POST}
            onCreate={createPost}
            user={await getLoggedInUser()}
        />
    );
}
