'use client';

import { Tabs } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { ProfilePostType } from '@/src/models/profile.model';

type ProfileTabsProps = {
    activeType: ProfilePostType;
    onChangeTabs: () => void;
};

export default function ProfileTabs({ activeType, onChangeTabs }: ProfileTabsProps) {
    const isLikedBy = activeType === ProfilePostType.LIKED_BY;
    return (
        <Tabs
            activeTabIndex={isLikedBy ? 1 : 0}
            tabs={[
                {
                    label: 'Deine Mumbles',
                    onClick: onChangeTabs,
                },
                {
                    label: 'Deine Likes',
                    onClick: onChangeTabs,
                },
            ]}
        ></Tabs>
    );
}
