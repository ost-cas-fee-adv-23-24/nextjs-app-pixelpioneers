import DisplayName from '@/src/compositions/display-name/display-name';
import User from '@/src/compositions/user/user';
import React from 'react';

export default async function Settings() {
    return (
        <>
            Page: Settings
            <DisplayName />
            <User />
        </>
    );
}
