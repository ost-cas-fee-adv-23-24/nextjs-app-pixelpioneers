import {
    Avatar,
    AvatarSize,
    ButtonSize,
    IconSettingsAnimated,
    LogoMumbleHorizontal,
    NaviButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import LoginButton from '../login/login-button';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export default async function Navigation() {
    // TODO: is this the best way, calling session in every component?
    const session = await auth();
    return (
        <nav className="flex h-[80px] w-full items-center justify-around bg-primary-600 md:content-center">
            <div className="flex w-[680px] flex-row">
                <section className="flex items-center">
                    <LogoMumbleHorizontal
                        titleClasses="fill-white"
                        iconClasses="fill-white"
                        sizeWidth="235"
                        sizeHeight="34"
                        className="hidden md:ml-[-24px] md:flex"
                    />
                </section>
                <section className="flex flex-1 flex-row-reverse items-center">
                    <LoginButton session={session} />
                    <NaviButton
                        size={ButtonSize.L}
                        className="bg-primary-600 text-white hover:bg-primary-700"
                        label={'Settings'}
                        Icon={IconSettingsAnimated}
                    />
                    <div className="p-xs" title={session?.user?.name || ''}>
                        <Avatar
                            size={AvatarSize.S}
                            src={session?.user?.image || ''}
                            alt={session?.user?.name || ''}
                        />
                    </div>
                </section>
            </div>
        </nav>
    );
}
