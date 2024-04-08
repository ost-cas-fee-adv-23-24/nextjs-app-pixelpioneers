import FollowStatus from '@/src/components/follow-status/follow-status';
import { followUser } from '@/app/actions/user';
import { FollowingType, FollowType } from '@/src/models/user.model';
import { getProfileHeader } from '@/app/actions/profile';
import ProfileHeader from '@/src/compositions/profile-header/profile-header';

export default async function User({ params }: { params: { id: string } }) {
    // TODO: try catch, stream
    const { user, followedByActiveUser, isActiveUser } = await getProfileHeader(params.id);

    const hydratedFollowUser = followUser.bind(
        null,
        user.id,
        followedByActiveUser === FollowingType.FOLLOWING ? FollowType.UNFOLLOW : FollowType.FOLLOW,
    );

    // TODO: redirect when likes instead of posts?

    return (
        <>
            <ProfileHeader user={user} activeUser={isActiveUser} />
            {!isActiveUser && (
                <section className="flex w-full flex-col items-end">
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
