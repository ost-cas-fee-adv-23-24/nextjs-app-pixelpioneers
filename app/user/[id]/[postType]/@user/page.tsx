import React, { Suspense } from 'react';
import { getProfileHeader } from '@/app/actions/profile';
import Loading from './loading';
import ProfileHeader from '@/src/compositions/profile-header/profile-header';

export default async function UserProfile({
    params,
}: {
    params: { id: string; postType: string };
}) {
    const { user, isActiveUser } = await getProfileHeader(params.id);

    return (
        <Suspense fallback={<Loading />}>
            <ProfileHeader user={user} activeUser={isActiveUser} />
        </Suspense>
    );
}
