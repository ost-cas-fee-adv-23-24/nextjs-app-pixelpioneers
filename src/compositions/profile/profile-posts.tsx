'use client';
import React, { useEffect, useReducer } from 'react';
import ProfileTabs from '@/src/components/profile-tabs/profile-tabs';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { PaginatedResult, PAGINATION_LIMIT } from '@/src/models/paginate.model';
import { Message, Post } from '@/src/models/message.model';
import { ProfilePostType } from '@/src/models/profile.model';
import { UserState } from '@/src/models/user.model';
import { getPosts, loadPaginatedMessages } from '@/app/actions/message';
import MessageContainer from '@/src/compositions/message/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { profileReducer } from '@/src/compositions/profile/profile-reducer';
import { ProfileActionType } from '@/src/compositions/profile/types';
import { ActionResponse, getErrorMessage } from '@/src/models/action.model';

type ProfilePostsProps = {
    userState: UserState;
    paginatedPosts: PaginatedResult<Post>;
    userId: string;
};

export default function ProfilePosts({ userState, paginatedPosts, userId }: ProfilePostsProps) {
    const [state, dispatch] = useReducer(profileReducer, {
        activeType: ProfilePostType.CREATED_BY,
        posts: paginatedPosts.data,
        nextUrl: paginatedPosts.next,
        error: undefined,
    });

    // check on revalidated posts from server if activeType CREATED_BY
    useEffect(() => {
        if (state.activeType === ProfilePostType.CREATED_BY) {
            dispatch({
                type: ProfileActionType.POSTS_LOADED,
                posts: paginatedPosts.data,
                nextUrl: paginatedPosts.next,
            });
        }
    }, [paginatedPosts, state.activeType]);

    // load posts on tab switch
    useEffect(() => {
        const loadProfilePosts = async () => {
            const postsResponse = await getPosts({
                creators: state.activeType === ProfilePostType.LIKED_BY ? undefined : [userId],
                likedBy: state.activeType === ProfilePostType.LIKED_BY ? [userId] : undefined,
                limit: PAGINATION_LIMIT,
            });
            if (postsResponse.isError) {
                dispatch({ type: ProfileActionType.POSTS_ERROR, error: postsResponse.error });
                return;
            }
            dispatch({
                type: ProfileActionType.POSTS_LOADED,
                posts: postsResponse.data.data,
                nextUrl: postsResponse.data.next,
            });
        };
        loadProfilePosts().catch(console.error);
    }, [state.activeType, userId]);

    return (
        <>
            {userState === UserState.IS_ACTIVE_USER && (
                <section className="flex flex-row justify-center md:justify-start">
                    <ProfileTabs
                        activeType={state.activeType}
                        onChangeTabs={() => {
                            dispatch({
                                type: ProfileActionType.CHANGE_ACTIVE_TYPE,
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
                        errorMessage={getErrorMessage(state.error)}
                        errorTitle={`Posts konnten nicht geladen werden.`}
                        fullPage={false}
                    />
                ) : (
                    <MessageContainer
                        messages={state.posts}
                        onLoad={async (formData) => {
                            const messageResponse = JSON.parse(
                                await loadPaginatedMessages(formData),
                            ) as ActionResponse<PaginatedResult<Message>>;

                            if (messageResponse.isError) {
                                dispatch({
                                    type: ProfileActionType.POSTS_ERROR,
                                    error: messageResponse.error,
                                });
                                return;
                            }

                            const paginatedMessages = messageResponse.data;
                            dispatch({
                                type: ProfileActionType.POSTS_RELOADED,
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
