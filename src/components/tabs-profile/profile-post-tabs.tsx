'use client';

import { Tabs } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { ProfilePostType } from '@/src/models/profile.model';
import { useRouter } from 'next/navigation';

type ProfilePostTabsProps = {
    activeType: ProfilePostType;
    postsRoute: string;
    likesRoute: string;
};

export default function ProfilePostTabs({
    activeType,
    postsRoute,
    likesRoute,
}: ProfilePostTabsProps) {
    const router = useRouter();
    const isLikedBy = activeType === ProfilePostType.LIKED_BY;
    return (
        <Tabs
            activeTabIndex={isLikedBy ? 1 : 0}
            tabs={[
                {
                    label: 'Deine Mumbles',
                    onClick: () => isLikedBy && router.push(postsRoute),
                },
                {
                    label: 'Deine Likes',
                    onClick: () => !isLikedBy && router.push(likesRoute),
                },
            ]}
        ></Tabs>
    );
}
