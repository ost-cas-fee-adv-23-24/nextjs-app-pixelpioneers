import Follow from '@/src/compositions/follow/follow';
import { UserState } from '@/src/models/user.model';
import { getProfile } from '@/app/actions/profile';
import ProfileHeader from '@/src/compositions/profile/profile-header';
import { notFound } from 'next/navigation';
import React from 'react';
import LoginToProceed from '@/src/components/login/login-to-proceed';
import { MessageDisplayVariant } from '@/src/compositions/message/types';

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
                <LoginToProceed
                    message={`um ${user.username} zu folgen.`}
                    displayVariant={MessageDisplayVariant.TIMELINE}
                />
            )}
        </>
    );
}
