import React from 'react';
import { createPost } from '@/app/actions/message';
import { MessageVariant } from '@/src/compositions/message/types';
import { getLoggedInUser } from '@/app/actions/utils';
import MessageForm from '@/src/components/message-form/message-form';
import LoginToCreate from '@/src/components/login/login-to-create';

export default async function HomeCreatePostPage() {
    const user = await getLoggedInUser();
    return user ? (
        <MessageForm
            messageVariant={MessageVariant.POST}
            onCreate={createPost}
            user={await getLoggedInUser()}
        />
    ) : (
        <LoginToCreate messageVariant={MessageVariant.POST} />
    );
}
