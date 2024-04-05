import ProfileHeaderSkeleton from '@/src/compositions/profile-header/profile-header-skeleton';
import React from 'react';

export default async function Loading() {
    return <ProfileHeaderSkeleton classNames="h-[400px] w-full" />;
}
