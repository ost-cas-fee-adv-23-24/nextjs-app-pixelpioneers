'use client';
import React, { useEffect, useState } from 'react';
import ProfileTabs from '@/src/components/profile-tabs/profile-tabs';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { PaginatedResult, PAGINATION_LIMIT } from '@/src/models/paginate.model';
import { Message, Post } from '@/src/models/message.model';
import { ProfilePostType } from '@/src/models/profile.model';
import { User } from '@/src/models/user.model';
import { getPosts } from '@/app/actions/post';
import MessageContainer from '@/src/compositions/message/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';

type ProfilePostsProps = {
    isActiveUser?: boolean;
    paginatedPosts: PaginatedResult<Post>;
    user: User;
};

export default function ProfilePosts({ isActiveUser, paginatedPosts, user }: ProfilePostsProps) {
    const [activeType, setActiveType] = useState(ProfilePostType.CREATED_BY);
    const [posts, setPosts] = useState<Message[]>(paginatedPosts.data);
    const [nextUrl, setNextUrl] = useState(paginatedPosts.next);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
        const loadProfilePosts = async () => {
            const postsResponse = await getPosts({
                creators: activeType === ProfilePostType.LIKED_BY ? undefined : [user.id],
                likedBy: activeType === ProfilePostType.LIKED_BY ? [user.id] : undefined,
                limit: PAGINATION_LIMIT,
            });
            if (postsResponse.isError) {
                setError(postsResponse.error);
                setPosts([]);
                return;
            }
            setError(undefined);
            setPosts(postsResponse.data.data);
            setNextUrl(postsResponse.data.next);
        };
        loadProfilePosts().catch(console.error);
    }, [activeType, user]);

    return (
        <>
            {isActiveUser && (
                <section className="flex flex-row justify-center md:justify-start">
                    <ProfileTabs
                        activeType={activeType}
                        onChangeTabs={() => {
                            setActiveType(
                                activeType === ProfilePostType.LIKED_BY
                                    ? ProfilePostType.CREATED_BY
                                    : ProfilePostType.LIKED_BY,
                            );
                        }}
                    />
                </section>
            )}
            <section className="flex flex-col gap-s">
                {error ? (
                    <ErrorPage
                        errorMessage={error.message}
                        errorTitle={`Posts konnten nicht geladen werden.`}
                        fullPage={false}
                    />
                ) : (
                    <MessageContainer
                        messages={posts}
                        onLoad={(paginatedMessages) => {
                            setPosts((prevState) => [...prevState, ...paginatedMessages.data]);
                            setNextUrl(paginatedMessages.next);
                        }}
                        displayVariant={MessageDisplayVariant.TIMELINE}
                        nextUrl={nextUrl}
                    />
                )}
            </section>
        </>
    );
}
