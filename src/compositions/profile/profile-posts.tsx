'use client';
import React, { useState } from 'react';
import ProfileTabs from '@/src/components/profile-tabs/profile-tabs';
import MessageContainer from '@/src/compositions/message/message-container';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import MessageLoader from '@/src/compositions/message/message-loader';
import { PaginatedResult } from '@/src/models/paginate.model';
import { Post } from '@/src/models/message.model';
import { ProfilePostType } from '@/src/models/profile.model';
import { User } from '@/src/models/user.model';

type ProfilePostsProps = {
    isActiveUser?: boolean;
    paginatedPosts: PaginatedResult<Post>;
    user: User;
};
export default function ProfilePosts({ isActiveUser, paginatedPosts, user }: ProfilePostsProps) {
    const [activeType, setActiveType] = useState(ProfilePostType.CREATED_BY);
    const [posts, setPosts] = useState<Post[]>(paginatedPosts.data);
    const [nextRoute, setNextRoute] = useState(paginatedPosts.next);
    console.info(setPosts, setNextRoute, user);
    return (
        <>
            {isActiveUser && (
                <section className="flex flex-row justify-center md:justify-start">
                    <ProfileTabs
                        activeType={activeType}
                        onChangeTabs={() => {
                            // TODO: call LIKED_BY
                            activeType === ProfilePostType.CREATED_BY
                                ? setActiveType(ProfilePostType.LIKED_BY)
                                : setActiveType(ProfilePostType.CREATED_BY);
                        }}
                    />
                </section>
            )}
            <section className="flex flex-col gap-s">
                <MessageContainer
                    messages={posts}
                    displayVariant={MessageDisplayVariant.TIMELINE}
                />
                {nextRoute && (
                    <MessageLoader
                        displayVariant={MessageDisplayVariant.TIMELINE}
                        nextRoute={nextRoute}
                    />
                )}
            </section>
        </>
    );
}
