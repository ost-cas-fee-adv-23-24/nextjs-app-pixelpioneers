import DisplayName from '@/src/compositions/display-name/display-name';
import RecommendedUser from '@/src/compositions/recommended-user/recommended-user';
import React from 'react';

export default async function Settings() {
    return (
        <>
            Page: Settings
            <DisplayName />
            <RecommendedUser />
        </>
    );
}
