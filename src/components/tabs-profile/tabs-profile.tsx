'use client';

import { Tabs } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

const onTabClick = (value: string) => {
    alert(value);
};

export default function TabsProfile() {
    return (
        <Tabs
            activeTabIndex={0}
            tabs={[
                {
                    label: 'Deine Mumbles',
                    onClick: () => {
                        onTabClick('Deine Mumbles');
                    },
                },
                {
                    label: 'Deine Likes',
                    onClick: () => {
                        onTabClick('Deine Likes');
                    },
                },
            ]}
        ></Tabs>
    );
}
