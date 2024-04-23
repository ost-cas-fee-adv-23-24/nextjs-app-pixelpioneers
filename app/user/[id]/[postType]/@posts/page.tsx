import React from 'react';
import { getProfilePosts } from '@/app/actions/profile';
import { ProfilePostType } from '@/src/models/profile.model';
import ErrorPage from '@/src/compositions/error-page/error-page';
import ProfileTabs from '@/src/components/profile-tabs/profile-tabs';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import MessageContainer from '@/src/compositions/message/message-container';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import MessageLoader from '@/src/compositions/message/message-loader';
import { loadPaginatedMessages } from '@/app/actions/post';

export default async function UserPostsPage({
    params,
}: {
    params: { id: string; postType: string };
}) {
    const profilePostResponse = await getProfilePosts(
        params.id,
        params.postType === 'likes' ? ProfilePostType.LIKED_BY : ProfilePostType.CREATED_BY,
    );
    if (profilePostResponse.isError) {
        return (
            <ErrorPage
                errorMessage={profilePostResponse.error.message}
                errorTitle="Posts konnten nicht geladen werden."
                fullPage={false}
            />
        );
    }
    const { paginatedPosts, user, isActiveUser, type } = profilePostResponse.data;
    return (
        <>
            {isActiveUser && (
                <section className="flex flex-row justify-center md:justify-start">
                    <ProfileTabs
                        activeType={type}
                        postsRoute={getRoute(APP_ROUTES.USER, user.id)}
                        likesRoute={getRoute(APP_ROUTES.USER_LIKES, user.id)}
                    />
                </section>
            )}
            <section className="flex flex-col gap-s">
                <MessageContainer
                    messages={paginatedPosts.data}
                    displayVariant={MessageDisplayVariant.TIMELINE}
                />
                {paginatedPosts.next && (
                    <MessageLoader
                        onLoad={loadPaginatedMessages}
                        displayVariant={MessageDisplayVariant.TIMELINE}
                        nextRoute={paginatedPosts.next}
                    />
                )}
            </section>
        </>
    );
}
