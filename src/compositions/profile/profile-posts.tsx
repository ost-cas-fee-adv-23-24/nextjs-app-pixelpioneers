'use client';
import React, { useEffect, useReducer } from 'react';
import ProfileTabs from '@/src/components/profile-tabs/profile-tabs';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { PaginatedResult, PAGINATION_LIMIT } from '@/src/models/paginate.model';
import { Post } from '@/src/models/message.model';
import { ProfilePostType } from '@/src/models/profile.model';
import { User } from '@/src/models/user.model';
import { getPosts } from '@/app/actions/post';
import MessageContainer from '@/src/compositions/message/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { profilePostsReducer } from '@/src/compositions/profile/profile-posts-reducer';
import { ProfilePostsActionType } from '@/src/compositions/profile/types';

type ProfilePostsProps = {
    isActiveUser?: boolean;
    paginatedPosts: PaginatedResult<Post>;
    user: User;
};

export default function ProfilePosts({ isActiveUser, paginatedPosts, user }: ProfilePostsProps) {
    const [state, dispatch] = useReducer(profilePostsReducer, {
        activeType: ProfilePostType.CREATED_BY,
        posts: paginatedPosts.data,
        nextUrl: paginatedPosts.next,
        error: undefined,
    });

    useEffect(() => {
        const loadProfilePosts = async () => {
            const postsResponse = await getPosts({
                creators: state.activeType === ProfilePostType.LIKED_BY ? undefined : [user.id],
                likedBy: state.activeType === ProfilePostType.LIKED_BY ? [user.id] : undefined,
                limit: PAGINATION_LIMIT,
            });
            if (postsResponse.isError) {
                dispatch({ type: ProfilePostsActionType.POSTS_ERROR, error: postsResponse.error });
                return;
            }
            dispatch({
                type: ProfilePostsActionType.POSTS_LOADED,
                posts: postsResponse.data.data,
                nextUrl: postsResponse.data.next,
            });
        };
        loadProfilePosts().catch(console.error);
    }, [state.activeType, user]);

    return (
        <>
            {isActiveUser && (
                <section className="flex flex-row justify-center md:justify-start">
                    <ProfileTabs
                        activeType={state.activeType}
                        onChangeTabs={() => {
                            dispatch({
                                type: ProfilePostsActionType.CHANGE_ACTIVE_TYPE,
                                activeType:
                                    state.activeType === ProfilePostType.LIKED_BY
                                        ? ProfilePostType.CREATED_BY
                                        : ProfilePostType.LIKED_BY,
                            });
                        }}
                    />
                </section>
            )}
            <section className="flex flex-col gap-s">
                {state.error ? (
                    <ErrorPage
                        errorMessage={state.error.message}
                        errorTitle={`Posts konnten nicht geladen werden.`}
                        fullPage={false}
                    />
                ) : (
                    <MessageContainer
                        messages={state.posts}
                        onLoad={(paginatedMessages) => {
                            dispatch({
                                type: ProfilePostsActionType.POSTS_RELOADED,
                                posts: paginatedMessages.data,
                                nextUrl: paginatedMessages.next,
                            });
                        }}
                        displayVariant={MessageDisplayVariant.TIMELINE}
                        nextUrl={state.nextUrl}
                    />
                )}
            </section>
        </>
    );
}
