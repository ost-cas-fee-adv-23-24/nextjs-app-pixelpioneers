import {
    Avatar as AvatarElement,
    AvatarSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type AvatarProps = {
    desktopSize: AvatarSize;
    mobileSize?: AvatarSize;
    avatarUrl?: string;
    username?: string;
};

export default function Avatar({ desktopSize, mobileSize, avatarUrl, username }: AvatarProps) {
    const alt = `Avatar von ${username || 'user'}`;
    return (
        <>
            <div className="hidden md:block">
                <AvatarElement src={avatarUrl} alt={alt} size={desktopSize} />
            </div>
            <div className="block md:hidden">
                <AvatarElement src={avatarUrl} alt={alt} size={mobileSize || desktopSize} />
            </div>
        </>
    );
}
