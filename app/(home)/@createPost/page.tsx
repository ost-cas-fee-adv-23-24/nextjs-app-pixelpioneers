import React from 'react';
import { createPost } from '@/app/actions/message';
import { MessageDisplayVariant, MessageVariant } from '@/src/compositions/message/types';
import { getLoggedInUser } from '@/app/actions/utils';
import MessageForm from '@/src/components/message-form/message-form';
import LoginToProceed from '@/src/components/login/login-to-proceed';

export default async function HomeCreatePostPage() {
    const user = await getLoggedInUser();
    return user ? (
        <MessageForm
            messageVariant={MessageVariant.POST}
            onCreate={createPost}
            user={await getLoggedInUser()}
        />
    ) : (
        <LoginToProceed
            message="um einen Post zu verfassen."
            displayVariant={MessageDisplayVariant.TIMELINE}
        />
    );
}
