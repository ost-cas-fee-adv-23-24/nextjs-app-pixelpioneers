'use client';

import { Tabs } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type ProfilePostTabsType = {
    activeTabIndex: number;
    onPosts: () => void;
    onLikes: () => void;
};

export default function ProfilePostTabs({ activeTabIndex, onPosts, onLikes }: ProfilePostTabsType) {
    return (
        <Tabs
            activeTabIndex={activeTabIndex}
            tabs={[
                {
                    label: 'Deine Mumbles',
                    onClick: onPosts,
                },
                {
                    label: 'Deine Likes',
                    onClick: onLikes,
                },
            ]}
        ></Tabs>
    );
}
