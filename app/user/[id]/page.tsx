import React from 'react';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import TabsProfile from '@/src/components/tabs-profile/tabs-profile';
import User from '@/src/compositions/user/user';
import FollowStatus from '@/src/components/follow-status/follow-status';
import clsx from 'clsx';
import PostSkeleton from '@/src/compositions/post/post-skeleton';
import UserSkeleton from '@/src/compositions/user/user-skeleton';
import { followUser, getFollowees, getUser, unfollowUser } from '@/app/actions/user';
import ProfileHeader from '@/src/compositions/profile-header/profile-header';

export default async function Profile({ params }: { params: { id: string } }) {
    //const session = await auth();
    const user = await getUser(params.id);
    // TODO: fix activeUser ID
    const activeUser = await getUser('245808067160180753');
    // TODO: check session user ID
    //const isActiveUser = session?.user?.id === user.id;
    const isActiveUser = '245808067160180753' === user.id;
    // TODO: check pagination here
    const paginatedFollowees = await getFollowees(activeUser.id);
    const followedByActiveUser = !!paginatedFollowees.data.find(
        (follower) => follower.id === user.id,
    );

    const sectionClasses = 'flex flex-col w-full';
    return (
        <section className="flex w-full flex-col items-center gap-l md:w-[680px]">
            <ProfileHeader user={user} activeUser={isActiveUser} />
            <section className={clsx('flex w-full flex-col', !isActiveUser && 'items-end')}>
                {isActiveUser ? (
                    <TabsProfile />
                ) : (
                    <FollowStatus
                        user={user}
                        onFollow={followedByActiveUser ? unfollowUser : followUser}
                        followedByActiveUser={followedByActiveUser}
                    />
                )}
            </section>
            <Heading className="w-full py-s text-slate-600 md:w-[680px]" variant={HeadingLevel.H3}>
                Empfohlene User
            </Heading>
            <section className="flex w-full flex-row flex-wrap gap-s py-s md:w-[680px]">
                <User />
                <User />
                <User />

                <User />
                <User />
                <User />

                <User />
                <User />
                <User />

                <UserSkeleton />
                <UserSkeleton />
                <UserSkeleton />
            </section>
            <section className={sectionClasses}>
                <PostSkeleton />
                <PostSkeleton />
            </section>
        </section>
    );
}
