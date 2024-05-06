import Follow from '@/src/compositions/follow/follow';
import { UserState } from '@/src/models/user.model';
import { getProfile } from '@/app/actions/profile';
import ProfileHeader from '@/src/compositions/profile/profile-header';
import { notFound } from 'next/navigation';
import LoginButton from '@/src/components/login/login-button';

export default async function UserPage({ params }: { params: { id: string } }) {
    const profileHeaderResponse = await getProfile(params.id);
    if (profileHeaderResponse.isError) {
        notFound();
    }
    const { user, userState } = profileHeaderResponse.data;
    const isActiveUser = userState === UserState.IS_ACTIVE_USER;
    return (
        <>
            <ProfileHeader user={user} isActiveUser={isActiveUser} />
            {userState === UserState.LOGGED_IN && (
                <section className="mx-m flex flex-row justify-end md:mx-0">
                    <Follow user={user} />
                </section>
            )}
            {userState === UserState.LOGGED_OUT && (
                <div className="flex flex-row items-center gap-xs">
                    <LoginButton isLoggedIn={false} loginLabel="Logge dich jetzt ein" />
                    <span>um {user.username} zu folgen.</span>
                </div>
            )}
        </>
    );
}
