import DisplayName from '@/src/compositions/display-name/display-name';
import React from 'react';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';

const mockUserData = {
    id: '179944860378202369',
    username: 'max_muster',
    avatarUrl: 'string',
    firstName: 'string',
    lastName: 'string',
};

// TODO: settings
export default async function Settings() {
    return (
        <>
            Page: Settings
            <DisplayName user={mockUserData} variant={DisplayNameVariant.PROFILE} />
        </>
    );
}
