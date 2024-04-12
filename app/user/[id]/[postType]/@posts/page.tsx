import React from 'react';
import { getProfilePosts } from '@/app/actions/profile';
import { ProfilePostType } from '@/src/models/profile.model';
import ErrorPage from '@/src/compositions/error-page/error-page';
import ProfilePostTabs from '@/src/components/tabs-profile/profile-post-tabs';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import MessageContainer from '@/src/compositions/post/message-container';
import { PostVariant } from '@/src/compositions/post/types';
import InfiniteMessages from '@/src/compositions/post/infinite-messages';
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
                    <ProfilePostTabs
                        activeType={type}
                        postsRoute={getRoute(APP_ROUTES.USER, user.id)}
                        likesRoute={getRoute(APP_ROUTES.USER_LIKES, user.id)}
                    />
                </section>
            )}
            <section className="flex flex-col gap-s">
                <MessageContainer messages={paginatedPosts.data} variant={PostVariant.TIMELINE} />
                {paginatedPosts.next && (
                    <InfiniteMessages
                        loadMessages={loadPaginatedMessages}
                        variant={PostVariant.TIMELINE}
                        nextRoute={paginatedPosts.next}
                    />
                )}
            </section>
        </>
    );
}
