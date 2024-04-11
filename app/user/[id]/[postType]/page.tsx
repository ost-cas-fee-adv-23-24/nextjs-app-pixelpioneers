import FollowStatus from '@/src/components/follow-status/follow-status';
import { followUser } from '@/app/actions/user';
import { FollowingType, FollowType } from '@/src/models/user.model';
import { getProfileHeader } from '@/app/actions/profile';
import ProfileHeader from '@/src/compositions/profile-header/profile-header';
import { notFound } from 'next/navigation';

export default async function UserPage({ params }: { params: { id: string } }) {
    const profileHeaderResponse = await getProfileHeader(params.id);
    if (profileHeaderResponse.isError) {
        notFound();
    }
    const { user, followedByActiveUser, isActiveUser } = profileHeaderResponse.data;
    const hydratedFollowUser = followUser.bind(
        null,
        user.id,
        followedByActiveUser === FollowingType.FOLLOWING ? FollowType.UNFOLLOW : FollowType.FOLLOW,
    );
    return (
        <>
            <ProfileHeader user={user} activeUser={isActiveUser} />
            {!isActiveUser && (
                <section className="mx-m flex flex-row justify-end md:mx-0">
                    <FollowStatus
                        user={user}
                        onFollow={hydratedFollowUser}
                        followedByActiveUser={followedByActiveUser}
                    />
                </section>
            )}
        </>
    );
}
